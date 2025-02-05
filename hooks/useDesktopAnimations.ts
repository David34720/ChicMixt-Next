// hooks/useDesktopAnimations.ts
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface DesktopRefs {
  section1: React.RefObject<HTMLDivElement | null>;
  section2: React.RefObject<HTMLDivElement | null>;
  section3: React.RefObject<HTMLDivElement | null>;
  section4: React.RefObject<HTMLDivElement | null>;
  // ...
}

export function useDesktopAnimations(
  refs: DesktopRefs,
  setShowMasonry: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // On se crée un tableau pour stocker les triggers créés
    const scrollTriggers: ScrollTrigger[] = [];

    const { section1, section2, section3, section4 } = refs;

    mm.add("(min-width: 769px)", () => {
      // Section2 apparaît, Section1 disparaît
      if (section1.current && section2.current) {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section1.current,
            start: "bottom bottom",
            end: "bottom 200px",
            scrub: true,
          },
        })
          .fromTo(section2.current, { opacity: 0.7 }, { opacity: 1, duration: 1 });

        // On push le scrollTrigger associé
        if (tl1.scrollTrigger) {
          scrollTriggers.push(tl1.scrollTrigger);
        }

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section2.current,
            start: "top center",
            end: "top 200px",
            scrub: true,
          },
        })
          .to(section1.current, { opacity: 0, duration: 1 });

        if (tl2.scrollTrigger) {
          scrollTriggers.push(tl2.scrollTrigger);
        }
      }

      // Section3 apparaît, Section2 disparaît
      if (section2.current && section3.current) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: section2.current,
            start: "bottom bottom",
            end: "bottom 200px",
            scrub: true,
          },
        })
          .fromTo(section3.current, { opacity: 0 }, { opacity: 1, duration: 1 });

        if (tl3.scrollTrigger) {
          scrollTriggers.push(tl3.scrollTrigger);
        }

        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: section3.current,
            start: "top center",
            end: "top 200px",
            scrub: true,
          },
        })
          .to(section2.current, { opacity: 0, duration: 1 });

        if (tl4.scrollTrigger) {
          scrollTriggers.push(tl4.scrollTrigger);
        }
      }

      // ... Idem pour Section4 ...
      if (section3.current && section4.current) {
        const tl5 = gsap.timeline({
          scrollTrigger: {
            trigger: section3.current,
            start: "bottom bottom",
            end: "bottom 200px",
            scrub: true,
          },
        })
          .fromTo(section4.current, { opacity: 0 }, { opacity: 1, duration: 1 });

        if (tl5.scrollTrigger) {
          scrollTriggers.push(tl5.scrollTrigger);
        }

        if (section3.current) {
        // Timeline (ou direct) pour déclencher showMasonry = true quand top de section3 arrive au center
        const tlShowMasonry = gsap.timeline({
          scrollTrigger: {
            trigger: section3.current,
            start: "top center",   // ou "center center", selon la zone souhaitée
            onEnter: () => {
              // On set showMasonry à true
              setShowMasonry(true);
            },
            // Optionnel: si tu veux que showMasonry repasse à false quand on remonte tout en haut
            onLeaveBack: () => {
              setShowMasonry(false);
            },
          },
        });

        if (tlShowMasonry.scrollTrigger) {
          scrollTriggers.push(tlShowMasonry.scrollTrigger);
        }
      }

        const tl6 = gsap.timeline({
          scrollTrigger: {
            trigger: section4.current,
            start: "top center",
            end: "top 200px",
            scrub: true,
          },
        })
          .to(section3.current, { opacity: 0, duration: 1 });

        if (tl6.scrollTrigger) {
          scrollTriggers.push(tl6.scrollTrigger);
        }
      }
    });

    return () => {
      // On tue juste nos triggers et on revert le matchMedia
      scrollTriggers.forEach((st) => st.kill());
      mm.revert();
    };
  }, [refs]);
}
