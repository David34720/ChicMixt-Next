"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MobileRefs {
  section1M: React.RefObject<HTMLDivElement | null>;
  section2M: React.RefObject<HTMLDivElement | null>;
  section3M: React.RefObject<HTMLDivElement | null>;
  section4M: React.RefObject<HTMLDivElement | null>;
  section5M?: React.RefObject<HTMLDivElement | null>;
  section51M?: React.RefObject<HTMLDivElement | null>;
}

export function useMobileAnimations(refs: MobileRefs) {
  const animationsInitialized = useRef(false); 

  useEffect(() => {
    if (animationsInitialized.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const scrollTriggers: ScrollTrigger[] = [];
    const { section1M, section2M, section3M, section4M } = refs;

    mm.add("(max-width: 768px)", () => {
      // Réinitialisation de l'overlay de la section 1 lorsque l'on remonte
      // if (section1M.current) {
      //   const overlay1 = section1M.current.querySelector(".section1overlay");
      //   if (overlay1) {
      //     gsap.set(overlay1, { opacity: 0 });
      //     const tlReset = gsap.timeline({
      //       scrollTrigger: {
      //         trigger: section2M.current,
      //         start: "top top",
      //         end: "top top",
      //         onEnterBack: () => {
      //           gsap.to(overlay1, { opacity: 0, duration: 0.5 });
      //         },
      //         invalidateOnRefresh: true,
      //       }
      //     });
      //     if (tlReset.scrollTrigger) scrollTriggers.push(tlReset.scrollTrigger);
      //   }
      // }

      // Transition Section 1 -> Section 2
      if (section1M.current && section2M.current) {
        const overlay2 = section2M.current.querySelector(".section2-overlay");
        const overlay1 = section1M.current.querySelector(".section1overlay");

        // Animation pour overlay2 (première transition)
        if (overlay2) {
          const tl1 = gsap.timeline({
            scrollTrigger: {
              trigger: section1M.current,
              start: "bottom bottom",
              end: "bottom 70%",
              scrub: 0.5,
              onEnterBack: () => {
                gsap.to(overlay2, { opacity: 0, duration: 0.5 });
              },
              onLeave: () => {
                gsap.to(overlay2, { opacity: 0, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
          });
          if (tl1.scrollTrigger) scrollTriggers.push(tl1.scrollTrigger);
        }

        // Animation pour overlay1 (sur la transition via section 2)
        if (overlay1) {
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: section2M.current,
              start: "top 30%",
              end: "top 10%",
              scrub: 0.5,
              markers: false,
              onLeaveBack: () => {
                gsap.to(overlay1, { opacity: 0, duration: 0.5 });
              },
              onEnter: () => {
                gsap.to(overlay1, { opacity: 1, duration: 0.5 });
              },
              onEnterBack: () => {
                gsap.to(overlay1, { opacity: 0, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
          });
          if (tl2.scrollTrigger) scrollTriggers.push(tl2.scrollTrigger);
        }
      }

      // Transition Section 2 -> Section 3
      if (section2M.current && section3M.current) {
        const overlay2 = section2M.current.querySelector(".section2-overlay");
        const overlay3 = section3M.current.querySelector(".section3-overlay");
        const overlaySlider = document.querySelector(".sliderOverlay");

        // Animation pour overlay2 (deuxième transition)
        if (overlay2) {
          const tl3 = gsap.timeline({
            scrollTrigger: {
              trigger: section3M.current,
              start: "top 30%",
              end: "top 10%",
              scrub: 0.5,
              onLeaveBack: () => {
                gsap.to(overlay2, { opacity: 0, duration: 0.5 });
              },
              onEnter: () => {
                gsap.to(overlay2, { opacity: 0, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
          });
          if (tl3.scrollTrigger) scrollTriggers.push(tl3.scrollTrigger);
        }

        // Animation pour overlay3
        if (overlay3) {
          const tl4 = gsap.timeline({
            scrollTrigger: {
              trigger: section2M.current,
              start: "bottom 80%",
              end: "bottom center",
              scrub: 0.5,
              onEnterBack: () => {
                gsap.to(overlay3, { opacity: 0, duration: 0.5 });
              },
              onLeave: () => {
                gsap.to(overlay3, { opacity: 0, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
          });
          if (tl4.scrollTrigger) scrollTriggers.push(tl4.scrollTrigger);
        }

        // Animation pour l'overlay du slider
        if (overlaySlider) {
          const tl5 = gsap.timeline({
            scrollTrigger: {
              trigger: section3M.current,
              start: "bottom 70%",
              end: "bottom center",
              scrub: 0.5,
              onLeaveBack: () => {
                gsap.to(overlaySlider, { opacity: 1, duration: 0.5 });
              },
              onEnter: () => {
                gsap.to(overlaySlider, { opacity: 0, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
          });
          if (tl5.scrollTrigger) scrollTriggers.push(tl5.scrollTrigger);
        }
      }

      // Animation de l'overlay du slider sur la Section 4
      if (section4M.current) {
        const overlaySlider = document.querySelector(".sliderOverlay");
        if (overlaySlider) {
          const tl6 = gsap.timeline({
            scrollTrigger: {
              trigger: section4M.current,
              start: "top 30%",
              end: "top 10%",
              scrub: 0.5,
              onLeaveBack: () => {
                gsap.to(overlaySlider, { opacity: 0, duration: 0.5 });
              },
              onEnter: () => {
                gsap.to(overlaySlider, { opacity: 1, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
          });
          if (tl6.scrollTrigger) scrollTriggers.push(tl6.scrollTrigger);
        }
      }
    });

    animationsInitialized.current = true;
    return () => {
      scrollTriggers.forEach(st => st?.kill());
      mm.revert();
    };
  }, [refs]);
}
