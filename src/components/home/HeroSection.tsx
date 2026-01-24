import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage1 from "@/assets/hero-building-1.jpg";
import heroImage2 from "@/assets/hero-building-2.jpg";
import heroImage3 from "@/assets/hero-building-3.jpg";

const slides = [
  {
    id: 1,
    image: heroImage1,
    title: "Kelajak uyingiz",
    subtitle: "bugun boshlanadi",
    description:
      "Premium sifatli turar-joy majmualari. Zamonaviy dizayn, qulay to'lov shartlari va ishonchli quruvchi.",
  },
  {
    id: 2,
    image: heroImage2,
    title: "Hashamatli hayot",
    subtitle: "eng yaxshi manzilda",
    description:
      "Shahar markazida joylashgan zamonaviy uy-joy majmualari. Barcha qulayliklar bir joyda.",
  },
  {
    id: 3,
    image: heroImage3,
    title: "Sifat va ishonch",
    subtitle: "bizning ustuvorligimiz",
    description:
      "10+ yillik tajriba, 50+ muvaffaqiyatli loyihalar. Oilangiz uchun eng yaxshi tanlov.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
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

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container-main relative z-10 h-full flex items-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-4">
                {slides[currentSlide].title}
                <span className="block text-accent">{slides[currentSlide].subtitle}</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-lg">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="btn-gold flex items-center gap-2">
                  Loyihalarni ko'rish
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline-gold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Bog'lanish
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="flex gap-3 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-12 bg-accent"
                    : "w-6 bg-primary-foreground/40 hover:bg-primary-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
