import { motion } from "framer-motion";
import { Phone, MessageCircle, Clock } from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";

export default function ConsultationSection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              Bepul konsultatsiya
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Mutaxassis konsultatsiyasini oling
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Professional mutaxassislarimiz sizga mos uy tanlashda yordam beradi. 
              Bepul konsultatsiya olish uchun formani to'ldiring yoki qo'ng'iroq qiling.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground">Tez javob</h4>
                  <p className="text-primary-foreground/70 text-sm">15 daqiqa ichida qo'ng'iroq</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground">Bepul maslahat</h4>
                  <p className="text-primary-foreground/70 text-sm">Hech qanday to'lovsiz</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground">24/7 qo'llab-quvvatlash</h4>
                  <p className="text-primary-foreground/70 text-sm">Har doim aloqadamiz</p>
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
              So'rov qoldiring
            </h3>
            <p className="text-muted-foreground mb-6">
              Ma'lumotlaringizni qoldiring, tez orada bog'lanamiz
            </p>
            <ConsultationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
