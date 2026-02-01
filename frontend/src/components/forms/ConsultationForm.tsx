import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/i18n";
import { api } from "@/lib/api";

// Uzbekistan operator codes
const UZBEKISTAN_OPERATOR_CODES = [
  '90', '91', '93', '94', '95', '97', '98', '99',  // Mobile operators
  '33', '55', '71', '78',  // Other operators
];

// Custom Uzbekistan phone validation
const uzbekPhoneRegex = /^\+998(90|91|93|94|95|97|98|99|33|55|71|78)\d{7}$/;

const formSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
  phone: z.string()
    .transform((val) => val.replace(/[\s\-\(\)]/g, '')) // Remove spaces, dashes, parentheses
    .refine((val) => val.startsWith('+998'), {
      message: "Telefon raqami +998 bilan boshlanishi kerak",
    })
    .refine((val) => val.length === 13, {
      message: "Telefon raqami +998 dan keyin 9 ta raqamdan iborat bo'lishi kerak",
    })
    .refine((val) => {
      const operatorCode = val.slice(4, 6);
      return UZBEKISTAN_OPERATOR_CODES.includes(operatorCode);
    }, {
      message: "Noto'g'ri operator kodi. To'g'ri kodlar: 90, 91, 93, 94, 95, 97, 98, 99, 33, 55, 71, 78",
    }),
});

type FormData = z.infer<typeof formSchema>;

interface ConsultationFormProps {
  onSuccess?: () => void;
  variant?: "default" | "hero";
  apartmentId?: number;
  type?: "consultation" | "contact";
}

export default function ConsultationForm({
  onSuccess,
  variant = "default",
  apartmentId,
  type = "consultation"
}: ConsultationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "+998",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.leads.create({
        type,
        name: data.name,
        phone: data.phone,
        source_page: window.location.pathname,
      });

      setIsSubmitted(true);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
        onSuccess?.();
      }, 2000);
    } catch (err: any) {
      console.error("Failed to submit form:", err);
      if (err.response?.data?.phone) {
        setError(err.response.data.phone[0]);
      } else if (err.response?.data?.name) {
        setError(err.response.data.name[0]);
      } else {
        setError(t('common.error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-success" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">{t('consultation.successTitle')}</h3>
        <p className="text-muted-foreground">
          {t('consultation.success')}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">
          {t('consultation.name')}
        </label>
        <Input
          {...register("name")}
          placeholder={t('consultation.name')}
          className={`input-field ${variant === "hero" ? "bg-card/80 backdrop-blur" : ""}`}
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">
          {t('consultation.phone')}
        </label>
        <Input
          {...register("phone")}
          placeholder="+998 __ ___ __ __"
          className={`input-field ${variant === "hero" ? "bg-card/80 backdrop-blur" : ""}`}
        />
        {errors.phone && (
          <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {error && (
        <p className="text-destructive text-sm text-center">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="btn-gold w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {t('consultation.sending')}
          </>
        ) : (
          t('consultation.submit')
        )}
      </Button>
    </form>
  );
}
