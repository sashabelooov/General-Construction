from django.conf import settings
from django.db import models

from apps.content.models import Apartment


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Lead(TimeStampedModel):
    class LeadType(models.TextChoices):
        CONSULTATION = "consultation", "Consultation"
        CONTACT = "contact", "Contact"

    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_PROGRESS = "in_progress", "In progress"
        DONE = "done", "Done"

    type = models.CharField(max_length=16, choices=LeadType.choices, default=LeadType.CONSULTATION)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=64)
    apartment = models.ForeignKey(Apartment, on_delete=models.SET_NULL, blank=True, null=True)
    source_page = models.CharField(max_length=255, blank=True, default="")
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.NEW)
    note = models.TextField(blank=True, default="")

    class Meta:
        verbose_name = "So'rov"
        verbose_name_plural = "So'rovlar"

    def __str__(self) -> str:
        return f"{self.name} ({self.phone})"


class Conversation(TimeStampedModel):
    class Status(models.TextChoices):
        OPEN = "open", "Open"
        CLOSED = "closed", "Closed"

    lead = models.OneToOneField(Lead, on_delete=models.CASCADE, related_name="conversation")
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.OPEN)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="assigned_conversations",
    )
    customer_name = models.CharField(max_length=255, blank=True, default="")
    customer_phone = models.CharField(max_length=64, blank=True, default="")

    class Meta:
        verbose_name = "Suhbat"
        verbose_name_plural = "Suhbatlar"

    def __str__(self) -> str:
        return f"Conversation #{self.pk} ({self.lead.name})"


class Message(TimeStampedModel):
    class SenderType(models.TextChoices):
        CUSTOMER = "customer", "Customer"
        CONSULTANT = "consultant", "Consultant"
        SYSTEM = "system", "System"

    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender_type = models.CharField(max_length=16, choices=SenderType.choices)
    sender_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True, related_name="sent_messages"
    )
    text = models.TextField()

    class Meta:
        ordering = ["created_at", "id"]
        verbose_name = "Xabar"
        verbose_name_plural = "Xabarlar"

    def __str__(self) -> str:
        return f"{self.sender_type}: {self.text[:40]}"

