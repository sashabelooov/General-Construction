import { useState } from "react";
import { Phone, MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConsultationForm from "@/components/forms/ConsultationForm";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: string;
}

export default function FloatingButtons() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Assalomu alaykum! Mening ismim Malika. Sizga qanday yordam bera olaman?",
      sender: "agent",
      timestamp: "Hozir"
    }
  ]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: "Hozir"
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsSending(true);

    // Simulate agent response (you can replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const agentMessage: ChatMessage = {
      id: messages.length + 2,
      text: "Rahmat! Xabaringizni oldik. Tez orada mutaxassislarimiz siz bilan bog'lanadi.",
      sender: "agent",
      timestamp: "Hozir"
    };

    setMessages(prev => [...prev, agentMessage]);
    setIsSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            setShowChatBox(!showChatBox);
            setShowContactForm(false);
          }}
          className="floating-btn bg-primary text-primary-foreground"
          aria-label="Xabar yuborish"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => {
            setShowContactForm(true);
            setShowChatBox(false);
          }}
          className="floating-btn bg-accent text-accent-foreground"
          aria-label="Telefon qilish"
        >
          <Phone className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Online Chat Box */}
      <AnimatePresence>
        {showChatBox && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-32 right-8 z-50 w-[420px] max-w-[calc(100vw-2rem)] bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ height: "500px" }}
          >
            {/* Chat Header */}
            <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="font-heading font-semibold text-xl">Onlayn Chat</h3>
              <button
                onClick={() => setShowChatBox(false)}
                className="hover:bg-primary-foreground/10 p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-muted/20 to-background space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted/60 text-foreground rounded-bl-sm"
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${msg.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                        }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-muted/60 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Xabaringizni kiriting..."
                  className="flex-1 bg-background border-2 border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  disabled={isSending}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isSending}
                  className="bg-primary text-primary-foreground p-3.5 rounded-full hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone Contact Form Dialog */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              Qayta qo'ng'iroq so'rash
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm mb-4">
            Telefon raqamingizni qoldiring, biz sizga tez orada qo'ng'iroq qilamiz.
          </p>
          <ConsultationForm onSuccess={() => setShowContactForm(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}