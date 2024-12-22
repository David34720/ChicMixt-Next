import React, { createContext, useContext, useState, useRef } from "react";

interface SectionContextProps {
  navigateToSection: (sectionNumber: number) => void;
}

const SectionContext = createContext<SectionContextProps | undefined>(undefined);

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const navigateToSection = (sectionNumber: number) => {
    const targetSection = sectionsRef.current[sectionNumber - 1];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <SectionContext.Provider value={{ navigateToSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSectionContext must be used within a SectionProvider");
  }
  return context;
};
