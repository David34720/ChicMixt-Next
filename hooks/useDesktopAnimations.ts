// hooks/useDesktopAnimations.ts
import { useEffect, useRef } from "react";
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

    const scrollTriggers: ScrollTrigger[] = [];
    const { section1, section2, section3, section4 } = refs;

    mm.add("(min-width: 769px)", () => {
      // Animations existantes pour les sections 1 et 2
      if (section1.current && section2.current) {
        const overlay2 = section2.current.querySelector(".section2-overlay");
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section1.current,
            start: "bottom bottom",
            end: "bottom 40%",
            scrub: true,
          },
        }).fromTo(overlay2, { opacity: 1 }, { opacity: 0 });

        if (tl1.scrollTrigger) {
          scrollTriggers.push(tl1.scrollTrigger);
        }

        const overlay1 = section1.current.querySelector(".section1overlay");
        if (overlay1) {
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: section2.current,
              start: "top center",
              end: "top 200px",
              scrub: true,
            },
          }).to(overlay1, { opacity: 1, duration: 1 });
          
          if (tl2.scrollTrigger) {
            scrollTriggers.push(tl2.scrollTrigger);
          }
        }
      }

      // Animations pour les sections 2 et 3
      if (section2.current && section3.current) {
        const overlay2 = section2.current.querySelector(".section2-overlay");
        const overlay3 = section3.current.querySelector(".section3-overlay");
        
        if (overlay2) {
          const tl4 = gsap.timeline({
            scrollTrigger: {
              trigger: section3.current,
              start: "top center",
              end: "top 200px",
              scrub: true,
            },
          }).to(overlay2, { opacity: 1, duration: 1 });
          
          if (tl4.scrollTrigger) {
            scrollTriggers.push(tl4.scrollTrigger);
          }
        }

        if (overlay3) {
          const tl3 = gsap.timeline({
            scrollTrigger: {
              trigger: section2.current,
              start: "bottom 80%",
              end: "bottom 20%",
              scrub: true,
            },
          }).fromTo(overlay3, { opacity: 1 }, { opacity: 0, duration: 1 });

          if (tl3.scrollTrigger) {
            scrollTriggers.push(tl3.scrollTrigger);
          }
        }
      }


     
      if (section4.current) {
        const overlaySlider = document.querySelector(".slider-overlay");

        // Timeline pour l’overlay
        const tl5 = gsap.timeline({
          scrollTrigger: {
            trigger: section4.current,
            start: "top center",
            end: "top 200px",
            scrub: true
          }
        })
        .fromTo(
          overlaySlider,
          { opacity: 0 },
          { opacity: 0.7, duration: 1 }
        );

        if (tl5.scrollTrigger) {
          scrollTriggers.push(tl5.scrollTrigger);
        }

        // ScrollTrigger distinct uniquement pour déclencher le masonry
        const stMasonry = ScrollTrigger.create({
          trigger: section4.current,
          start: "top bottom-=100px", // => Le bas de section4 à 100px avant le bas du viewport
          onEnter: () => setShowMasonry(true),
        });
        scrollTriggers.push(stMasonry);
      }
    });

    return () => {
      scrollTriggers.forEach((st) => st.kill());
      mm.revert();
    };
  }, [refs]);
}