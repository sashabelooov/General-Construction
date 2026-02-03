import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isPageLoading: boolean;
  setIsPageLoading: (loading: boolean) => void;
  showPageLoading: () => void;
  hidePageLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isPageLoading, setIsPageLoading] = useState(false);

  const showPageLoading = () => setIsPageLoading(true);
  const hidePageLoading = () => setIsPageLoading(false);

  return (
    <LoadingContext.Provider
      value={{
        isPageLoading,
        setIsPageLoading,
        showPageLoading,
        hidePageLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
