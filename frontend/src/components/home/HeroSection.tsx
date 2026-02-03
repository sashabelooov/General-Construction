import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

// About images for carousel
import aboutImage1 from "@/assets/about_1.jpg";
import aboutImage2 from "@/assets/about_2.jpg";
import aboutImage3 from "@/assets/about_3.jpg";
import aboutImage5 from "@/assets/about_5.jpg";
import aboutImage9 from "@/assets/about_9.jpg";

const heroImages = [aboutImage1, aboutImage2, aboutImage3, aboutImage5, aboutImage9];

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function HeroSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Static slides using about images
  const slides: Slide[] = heroImages.map((image, index) => ({
    id: index + 1,
    image: image,
    title: t('hero.slide1.title'),
    subtitle: t('hero.slide1.subtitle'),
    description: t('hero.slide1.description'),
  }));

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
            src={slides[currentSlide]?.image}
            alt={slides[currentSlide]?.title || "General Construction"}
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
                {slides[currentSlide]?.title || ""}
                <span className="block text-accent">{slides[currentSlide]?.subtitle || ""}</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-lg">
                {slides[currentSlide]?.description || ""}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="btn-beige flex items-center gap-2">
                  {t('hero.viewProjects')}
                  <ArrowRight className="w-5 h-5" />
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
                className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
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