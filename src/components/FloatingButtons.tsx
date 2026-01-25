import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConsultationForm from "@/components/forms/ConsultationForm";

export default function FloatingButtons() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formType, setFormType] = useState<"phone" | "message">("phone");

  const handleOpenForm = (type: "phone" | "message") => {
    setFormType(type);
    setShowContactForm(true);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => handleOpenForm("message")}
          className="floating-btn bg-primary text-primary-foreground"
          aria-label="Xabar yuborish"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => handleOpenForm("phone")}
          className="floating-btn bg-accent text-accent-foreground"
          aria-label="Telefon qilish"
        >
          <Phone className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Contact Form Dialog */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              {formType === "phone" ? "Qayta qo'ng'iroq so'rash" : "Xabar yuborish"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm mb-4">
            {formType === "phone" 
              ? "Telefon raqamingizni qoldiring, biz sizga tez orada qo'ng'iroq qilamiz." 
              : "Savolingizni yozing, biz sizga tez orada javob beramiz."}
          </p>
          <ConsultationForm onSuccess={() => setShowContactForm(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}