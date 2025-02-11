"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MobileRefs {
  section1M: React.RefObject<HTMLDivElement | null>;
  section2M: React.RefObject<HTMLDivElement | null>;
  section3M: React.RefObject<HTMLDivElement | null>;
  section4M: React.RefObject<HTMLDivElement | null>;
  section5M: React.RefObject<HTMLDivElement | null>;
  section51M: React.RefObject<HTMLDivElement | null>;
}

export function useMobileAnimations(
  refs: MobileRefs,
  setShowMasonry: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(max-width: 769px)", () => {

      const stMasonry = ScrollTrigger.create({
          trigger: refs.section4M.current,
          start: "top bottom", // => Le bas de section4 à 100px avant le bas du viewport
          onEnter: () => setShowMasonry(true),
        });
        

      // Fonction d'animation simple pour une section
      const animateSection = (
        ref: React.RefObject<HTMLDivElement | null>,
        delay = 0
      ) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay }
          );
        }
      };

      // Animation de chaque section avec un léger décalage
      // animateSection(refs.section1M, 0);
      // animateSection(refs.section2M, 0.2);
      // animateSection(refs.section3M, 0.4);
      // animateSection(refs.section4M, 0.6);
      // animateSection(refs.section5M, 0.8);
      // animateSection(refs.section51M, 1);

      // Optionnel : si tu souhaites réagir au scroll, tu peux décommenter et ajuster
      /*
      [refs.section1M, refs.section2M, refs.section3M, refs.section4M, refs.section5M, refs.section51M].forEach((ref) => {
        if (ref.current) {
          ScrollTrigger.create({
            trigger: ref.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
            },
          });
        }
      });
      */
    });

    // Cleanup lors du démontage du composant
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [refs]);
}
