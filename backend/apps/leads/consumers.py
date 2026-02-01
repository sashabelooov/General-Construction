import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Conversation, Message


class ChatConsumer(AsyncWebsocketConsumer):
    """WebSocket consumer for real-time chat messaging."""

    async def connect(self):
        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.room_group_name = f'chat_{self.conversation_id}'

        # Verify conversation exists
        conversation = await self.get_conversation()
        if not conversation:
            await self.close()
            return

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        # Send chat history
        messages = await self.get_messages()
        await self.send(text_data=json.dumps({
            'type': 'history',
            'messages': messages
        }))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """Receive message from WebSocket."""
        try:
            data = json.loads(text_data)
            message_text = data.get('message', '').strip()
            sender_type = data.get('sender_type', 'customer')

            if not message_text:
                return

            # Save message to database
            message = await self.save_message(message_text, sender_type)

            # Broadcast message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message_text,
                    'sender_type': sender_type,
                    'timestamp': message['timestamp'],
                    'id': message['id'],
                }
            )
        except json.JSONDecodeError:
            pass

    async def chat_message(self, event):
        """Send message to WebSocket."""
        await self.send(text_data=json.dumps({
            'type': 'message',
            'id': event['id'],
            'message': event['message'],
            'sender_type': event['sender_type'],
            'timestamp': event['timestamp'],
        }))

    @database_sync_to_async
    def get_conversation(self):
        """Get conversation from database."""
        try:
            return Conversation.objects.get(id=self.conversation_id)
        except Conversation.DoesNotExist:
            return None

    @database_sync_to_async
    def get_messages(self):
        """Get all messages for the conversation."""
        messages = Message.objects.filter(
            conversation_id=self.conversation_id
        ).order_by('created_at')[:50]  # Last 50 messages

        return [
            {
                'id': msg.id,
                'message': msg.text,
                'sender_type': msg.sender_type,
                'timestamp': msg.created_at.isoformat(),
            }
            for msg in messages
        ]

    @database_sync_to_async
    def save_message(self, text, sender_type):
        """Save message to database."""
        message = Message.objects.create(
            conversation_id=self.conversation_id,
            text=text,
            sender_type=sender_type,
        )
        return {
            'id': message.id,
            'timestamp': message.created_at.isoformat(),
        }
