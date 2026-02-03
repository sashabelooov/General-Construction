import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    // Don't show loading on initial render
    if (displayLocation.pathname !== location.pathname) {
      setIsLoading(true);
    }
  }, [location, displayLocation]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setDisplayLocation(location);
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            isPageTransition={true}
            onLoadingComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>

      <div
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
