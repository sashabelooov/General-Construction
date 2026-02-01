import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, Award, Lightbulb, HeartHandshake, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationSection from "@/components/home/ConsultationSection";
import { useLanguage } from "@/lib/i18n";
import heroImage1 from "@/assets/hero-building-1.jpg";
import heroImage2 from "@/assets/hero-building-2.jpg";
import heroImage3 from "@/assets/hero-building-3.jpg";

// About carousel images
import aboutImage1 from "@/assets/about_1.jpg";
import aboutImage2 from "@/assets/about_2.jpg";
import aboutImage3 from "@/assets/about_3.jpg";
import aboutImage4 from "@/assets/about_4.jpg";
import aboutImage5 from "@/assets/about_5.jpg";
import aboutImage6 from "@/assets/about_6.jpg";
import aboutImage7 from "@/assets/about_7.jpg";
import aboutImage8 from "@/assets/about_8.jpg";
import aboutImage9 from "@/assets/about_9.jpg";
import aboutImage10 from "@/assets/about_10.jpg";
import aboutImage11 from "@/assets/about_11.jpg";

// Stat icons
import { Building2, Users, Clock, MapPin } from "lucide-react";

const aboutCarouselImages = [
  aboutImage1, aboutImage2, aboutImage3, aboutImage4, aboutImage5,
  aboutImage6, aboutImage7, aboutImage8, aboutImage9, aboutImage10, aboutImage11
];

export default function About() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide for carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % aboutCarouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + aboutCarouselImages.length) % aboutCarouselImages.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % aboutCarouselImages.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const stats = [
    { icon: Building2, value: "50+", label: t('about.stats.projects') },
    { icon: Users, value: "5000+", label: t('about.stats.families') },
    { icon: Clock, value: "10+", label: t('about.stats.experience') },
    { icon: MapPin, value: "1M+", label: t('about.stats.area') },
  ];

  const values = [
    {
      title: t('about.values.quality'),
      description: t('about.values.qualityDesc'),
      icon: Award,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: t('about.values.trust'),
      description: t('about.values.trustDesc'),
      icon: Handshake,
      color: "bg-green-100 text-green-600",
    },
    {
      title: t('about.values.innovation'),
      description: t('about.values.innovationDesc'),
      icon: Lightbulb,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: t('about.values.customer'),
      description: t('about.values.customerDesc'),
      icon: HeartHandshake,
      color: "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="bg-primary pt-6 pb-16 lg:pt-8 lg:pb-20">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
                  {t('about.subtitle')}
                </span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                  General Construction
                </h1>
                <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                  {t('about.description')}
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
                      <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center overflow-hidden">
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
                {/* Carousel */}
                <div className="aspect-square rounded-2xl overflow-hidden relative">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={currentSlide}
                      src={aboutCarouselImages[currentSlide]}
                      alt={`About General Construction ${currentSlide + 1}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-colors z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-colors z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {aboutCarouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "w-6 bg-accent"
                            : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl bg-accent flex items-center justify-center">
                  <span className="font-heading font-bold text-4xl text-primary">10+</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values - with icons instead of numbers */}
        <section className="py-20">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-3 block">
                {t('about.values.subtitle')}
              </span>
              <h2 className="section-title">{t('about.values.title')}</h2>
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
                  {/* Icon instead of number */}
                  <div className={`w-20 h-20 rounded-full ${value.color} flex items-center justify-center mx-auto mb-6`}>
                    <value.icon className="w-10 h-10" />
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
                <h2 className="section-title mb-6">{t('about.mission.title')}</h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {t('about.mission.text')}
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
