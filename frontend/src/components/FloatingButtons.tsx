import { useState, useEffect, useRef } from "react";
import { Phone, MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { api } from "@/lib/api";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: string;
}

// Phone number validation regex (Uzbekistan and international formats)
const phoneRegex = /(\+?998|0)?[\s-]?(9[0-9]|3[3]|7[1-9])[\s-]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})|(\+?\d{10,15})/;

const getCurrentTime = () => {
  return new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
};

export default function FloatingButtons() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasProvidedPhone, setHasProvidedPhone] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Assalomu alaykum! 👋\n\nSiz bilan bog'lanishimiz uchun, iltimos, ismingiz va telefon raqamingizni qoldiring.\n\nMasalan: Alisher, +998901234567",
      sender: "agent",
      timestamp: getCurrentTime()
    }
  ]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const extractPhoneNumber = (text: string): string | null => {
    const match = text.match(phoneRegex);
    return match ? match[0] : null;
  };

  const extractName = (text: string): string | null => {
    // Remove phone number from text to get potential name
    const textWithoutPhone = text.replace(phoneRegex, '').trim();
    // Clean up commas, extra spaces
    const cleanedText = textWithoutPhone.replace(/[,،]/g, ' ').trim();
    // Get first word as name if it's at least 2 characters
    const words = cleanedText.split(/\s+/).filter(w => w.length >= 2);
    return words.length > 0 ? words[0] : null;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");
    setIsSending(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    let agentResponse: string;

    if (!hasProvidedPhone) {
      const phone = extractPhoneNumber(currentMessage);
      const name = extractName(currentMessage);

      if (phone) {
        setUserPhone(phone);
        if (name) setUserName(name);
        setHasProvidedPhone(true);

        // Send lead to backend
        try {
          await api.leads.create({
            type: "contact",
            name: name || "Chat foydalanuvchisi",
            phone: phone,
            source_page: "online_chat"
          });
        } catch (error) {
          console.error("Failed to save lead:", error);
        }

        agentResponse = `Rahmat${name ? `, ${name}` : ""}! 🙏\n\nMa'lumotlaringiz qabul qilindi. Mutaxassislarimiz tez orada siz bilan bog'lanadi.`;
      } else {
        agentResponse = "Iltimos, telefon raqamingizni yuboring, shunda biz siz bilan bog'lana olamiz.\n\nMasalan: +998901234567";
      }
    } else {
      // User already provided phone, just acknowledge their message
      try {
        await api.leads.create({
          type: "contact",
          name: userName || "Chat foydalanuvchisi",
          phone: userPhone,
          source_page: `online_chat: ${currentMessage}`
        });
      } catch (error) {
        console.error("Failed to save message:", error);
      }

      agentResponse = "Xabaringiz uchun rahmat! ✅\n\nMutaxassislarimiz tez orada javob berishadi.";
    }

    const agentMessage: ChatMessage = {
      id: messages.length + 2,
      text: agentResponse,
      sender: "agent",
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, agentMessage]);
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset chat when closed and reopened
  const handleOpenChat = () => {
    if (!showChatBox) {
      // Reset chat state
      setMessages([
        {
          id: 1,
          text: "Assalomu alaykum! 👋\n\nSiz bilan bog'lanishimiz uchun, iltimos, ismingiz va telefon raqamingizni qoldiring.\n\nMasalan: Alisher, +998901234567",
          sender: "agent",
          timestamp: getCurrentTime()
        }
      ]);
      setHasProvidedPhone(false);
      setUserName("");
      setUserPhone("");
    }
    setShowChatBox(!showChatBox);
    setShowContactForm(false);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleOpenChat}
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
              <div>
                <h3 className="font-heading font-semibold text-xl">Onlayn Chat</h3>
                <p className="text-primary-foreground/70 text-sm">Biz yordam berishga tayyormiz</p>
              </div>
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
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
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
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={hasProvidedPhone ? "Xabaringizni kiriting..." : "Ism va telefon raqam..."}
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
