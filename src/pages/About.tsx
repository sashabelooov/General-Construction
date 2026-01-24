import { motion } from "framer-motion";
import { Building2, Users, Award, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationSection from "@/components/home/ConsultationSection";

const stats = [
  { icon: Building2, value: "50+", label: "Topshirilgan loyihalar" },
  { icon: Users, value: "5000+", label: "Baxtli oilalar" },
  { icon: Award, value: "10+", label: "Yillik tajriba" },
  { icon: MapPin, value: "1M+", label: "Kv.m qurilgan maydon" },
];

const values = [
  {
    title: "Sifat",
    description: "Biz har bir loyihada eng yuqori sifat standartlariga rioya qilamiz. Eng yaxshi materiallar va zamonaviy texnologiyalardan foydalanamiz.",
  },
  {
    title: "Ishonch",
    description: "10 yillik tajriba davomida minglab oilalarning ishonchini qozondik. Har bir va'damizni bajaramiz.",
  },
  {
    title: "Innovatsiya",
    description: "Zamonaviy me'morchilik yechimlari va aqlli uy texnologiyalarini joriy etamiz.",
  },
  {
    title: "Mijoz uchun",
    description: "Mijozlarimizning qulayligi va mamnuniyati bizning asosiy maqsadimiz. 24/7 qo'llab-quvvatlash xizmati.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="bg-primary py-20 lg:py-32">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
                  Kompaniya haqida
                </span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                  General Construction
                </h1>
                <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                  2014-yildan beri O'zbekiston qurilish bozorida faoliyat yuritayotgan yetakchi kompaniya. 
                  Biz zamonaviy turar-joy majmualari qurish va oilalarga orzularidagi uyni taqdim etish bilan shug'ullanamiz.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                        <stat.icon className="w-7 h-7 text-accent" />
                      </div>
                      <div>
                        <span className="block font-heading font-bold text-2xl text-primary-foreground">
                          {stat.value}
                        </span>
                        <span className="text-primary-foreground/70 text-sm">{stat.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Building2 className="w-48 h-48 text-accent/50" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl bg-accent flex items-center justify-center">
                  <span className="font-heading font-bold text-4xl text-primary">10+</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-3 block">
                Bizning qadriyatlarimiz
              </span>
              <h2 className="section-title">Nima uchun bizni tanlashadi?</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-shadow text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <span className="font-heading font-bold text-2xl text-accent">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-secondary">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-6">Bizning missiyamiz</h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Har bir oilaga qulay va sifatli turar-joy taqdim etish. Biz zamonaviy qurilish texnologiyalari 
                  va innovatsion yechimlardan foydalanib, mijozlarimizga eng yaxshi natijalarni kafolatlaymiz.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Kompaniyamiz jamoasi 200 dan ortiq malakali mutaxassislardan iborat bo'lib, 
                  ular o'z sohasida keng tajribaga ega. Biz har bir loyihaga mas'uliyat bilan yondashamiz.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <span className="font-heading font-bold text-4xl text-accent block mb-2">200+</span>
                  <span className="text-muted-foreground">Mutaxassislar</span>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <span className="font-heading font-bold text-4xl text-accent block mb-2">15+</span>
                  <span className="text-muted-foreground">Joriy loyihalar</span>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <span className="font-heading font-bold text-4xl text-accent block mb-2">99%</span>
                  <span className="text-muted-foreground">Mijoz mamnuniyati</span>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <span className="font-heading font-bold text-4xl text-accent block mb-2">24/7</span>
                  <span className="text-muted-foreground">Qo'llab-quvvatlash</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ConsultationSection />
      </main>

      <Footer />
    </div>
  );
}
