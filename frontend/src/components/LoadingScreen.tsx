import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  isPageTransition?: boolean;
}

const taglines = {
  uz: "Orzularni haqiqatga aylantirish",
  ru: "Воплощаем мечты в реальность",
  en: "Building Dreams Into Reality",
};

export default function LoadingScreen({
  onLoadingComplete,
  isPageTransition = false
}: LoadingScreenProps) {
  const { language } = useLanguage();
  // Shorter duration for page transitions
  const loadingDuration = isPageTransition ? 0.8 : 2;
  const initialDelay = isPageTransition ? 0 : 0.2;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen min-h-[100dvh] z-[9999] flex items-center justify-center bg-white overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >

      {/* Center content - Logo and text */}
      <div className="relative flex flex-col items-center px-4 w-full max-w-xl sm:max-w-2xl md:max-w-3xl">
        {/* Logo container with animations */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: isPageTransition ? 0.4 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: initialDelay
          }}
        >
          {/* Animated ring around logo */}
          <motion.div
            className="absolute inset-0 -m-4 sm:-m-6 md:-m-8 rounded-3xl border-2 border-accent/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.15, opacity: [0, 1, 0] }}
            transition={{
              duration: isPageTransition ? 1 : 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: isPageTransition ? 0.2 : 0.5
            }}
          />

          {/* Second animated ring */}
          {!isPageTransition && (
            <motion.div
              className="absolute inset-0 -m-8 sm:-m-12 md:-m-16 rounded-3xl border border-primary/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.3, opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8
              }}
            />
          )}

          {/* Logo image - much larger and wider */}
          <motion.img
            src="/General_Logo.png"
            alt="General Construction"
            className="w-[280px] h-auto sm:w-[380px] md:w-[480px] lg:w-[550px] max-w-[90vw] relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: isPageTransition ? 0.3 : 0.6,
              ease: "easeOut",
              delay: isPageTransition ? 0.1 : 0.4
            }}
          />
        </motion.div>

        {/* Company name - larger and bolder */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isPageTransition ? 0.2 : 0.6 }}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-widest text-primary text-center"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: isPageTransition ? 0.3 : 0.6,
              ease: "easeOut",
              delay: isPageTransition ? 0.2 : 0.7
            }}
          >
            GENERAL CONSTRUCTION
          </motion.h1>
        </motion.div>

        {/* Tagline - responsive text, hidden on page transitions */}
        {!isPageTransition && (
          <motion.p
            className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-muted-foreground tracking-widest uppercase text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {taglines[language]}
          </motion.p>
        )}

        {/* Loading indicator - responsive spacing */}
        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isPageTransition ? 0.1 : 1.2 }}
        >
          {/* Animated dots */}
          <div className="flex gap-2 sm:gap-2.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-accent"
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: isPageTransition ? 0.6 : 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress bar - wider */}
        <motion.div
          className="mt-6 sm:mt-8 w-48 sm:w-56 md:w-64 lg:w-72 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: isPageTransition ? 0.1 : 1, duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: loadingDuration,
              delay: isPageTransition ? 0.2 : 1.2,
              ease: "easeInOut"
            }}
            onAnimationComplete={onLoadingComplete}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
