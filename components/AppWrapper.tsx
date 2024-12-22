"use client";

import React, { Suspense, createContext, useContext, useRef, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import Modal from "./Modal";
import Header from "./Header";
import Footer from "./Footer";

const SectionContext = createContext<{
  navigateToSection: (index: number) => void;
  setSectionRef: (index: number, ref: HTMLElement | null) => void;
} | null>(null);

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSectionContext must be used within SectionContext.Provider");
  }
  return context;
};

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const navigateToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const setSectionRef = (index: number, ref: HTMLElement | null) => {
    sectionsRef.current[index] = ref;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).fbAsyncInit = function () {
        (window as any).FB.init({
          xfbml: true,
          version: "v21.0",
        });
      };
    }
  }, []);

  return (
    <SessionProvider>
      <SectionContext.Provider value={{ navigateToSection, setSectionRef }}>
        <Header isScrolled={false} />
        <main className="container mx-auto">
          <Suspense fallback={<div>Chargement...</div>}>
            {children}
          </Suspense>
          <Modal />
        </main>
        <Footer />
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v21.0"
        />
      </SectionContext.Provider>
    </SessionProvider>
  );
}
