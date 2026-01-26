import { motion } from "framer-motion";
import { Phone, MessageCircle, Clock } from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { useLanguage } from "@/lib/i18n";

export default function ConsultationSection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 pb-32 bg-background relative overflow-hidden">
      {/* Background Pattern removed */}

      <div className="container-main relative z-10">
        {/* Centered Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              {t('consultation.title')}
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary/80 text-lg mb-8">
              {t('consultation.description')}
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-accent">{t('consultation.quickResponse')}</h4>
                  <p className="text-accent/70 text-sm">{t('consultation.quickResponseDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-accent">{t('consultation.freeAdvice')}</h4>
                  <p className="text-accent/70 text-sm">{t('consultation.freeAdviceDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-accent">{t('consultation.support247')}</h4>
                  <p className="text-accent/70 text-sm">{t('consultation.support247Desc')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 shadow-strong"
          >
            <h3 className="font-heading font-bold text-2xl mb-2 text-foreground">
              {t('consultation.formTitle')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('consultation.formDesc')}
            </p>
              <ConsultationForm />
            </motion.div>
        </div>
      </div>
    </section>
  );
}
