"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface DesktopRefs {
  section1: React.RefObject<HTMLDivElement | null>;
  section2: React.RefObject<HTMLDivElement | null>;
  section3: React.RefObject<HTMLDivElement | null>;
  section4: React.RefObject<HTMLDivElement | null>;
}

export function useDesktopAnimations(refs: DesktopRefs) {
  const animationsInitialized = useRef(false);

  useEffect(() => {
    if (animationsInitialized.current) return; 
    
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const scrollTriggers: ScrollTrigger[] = [];
    const { section1, section2, section3, section4 } = refs;

    mm.add("(min-width: 769px)", () => {
      // Animations pour la transition section 1 -> 2
      if (section1.current && section2.current) {
        const overlay2 = section2.current.querySelector(".section2-overlay");
        const overlay1 = section1.current.querySelector(".section1overlay");
        // Animation overlay2 (première transition)
        if (overlay2) {
          const tl1 = gsap.timeline({
            scrollTrigger: {
              trigger: section1.current,
              start: "bottom bottom",
              end: "bottom 70%",
              markers: true,
              scrub: 0.5,
              onEnterBack: self => {
                gsap.to(overlay2, { opacity: 1, duration: 0.5 });
              },
              onLeave: self => {
                gsap.to(overlay2, { opacity: 0, duration: 0.5 });
              },
              invalidateOnRefresh: false,
            }
          });
          
          if (tl1.scrollTrigger) {
            scrollTriggers.push(tl1.scrollTrigger);
          }
        }

        // Animation overlay1
        if (overlay1) {
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: section2.current,
              start: "top 30%",
              end: "top 10%",
              scrub: 0.5,
              onLeaveBack: self => {
                gsap.to(overlay1, { opacity: 0, duration: 0.5 });
              },
              onEnter: self => {
                gsap.to(overlay1, { opacity: 1, duration: 0.5 });
              },
              invalidateOnRefresh: false,
            }
          });
          
          if (tl2.scrollTrigger) {
            scrollTriggers.push(tl2.scrollTrigger);
          }
        }
      }

      // Animations pour la transition section 2 -> 3
      if (section2.current && section3.current) {
        const overlay2 = section2.current.querySelector(".section2-overlay");
        const overlay3 = section3.current.querySelector(".section3-overlay");
        const overlaySlider = document.querySelector(".sliderOverlay");
        
        // Animation overlay2 (deuxième transition)
        if (overlay2) {
          const tl4 = gsap.timeline({
            scrollTrigger: {
              trigger: section3.current,
              start: "top 30%",
              end: "top 10%",
              scrub: 0.5,
              onLeaveBack: self => {
                gsap.to(overlay2, { opacity: 0, duration: 0.5 });
              },
              onEnter: self => {
                gsap.to(overlay2, { opacity: 1, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
            
          });
          const tl4b = gsap.timeline({
            scrollTrigger: {
              trigger: section3.current,
              start: "bottom 70%",
              end: "bottom center",
              scrub: 0.5,
              onLeaveBack: self => {
                gsap.to(overlaySlider, { opacity: 1, duration: 0.5 });
              },
              onEnter: self => {
                gsap.to(overlaySlider, { opacity: 0, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
            
          });
          
          if (tl4.scrollTrigger && tl4b.scrollTrigger) {
            scrollTriggers.push(tl4.scrollTrigger);
            scrollTriggers.push(tl4b.scrollTrigger);
          }
        }

        // Animation overlay3
        if (overlay3) {
          const tl3 = gsap.timeline({
            scrollTrigger: {
              trigger: section2.current,
              start: "bottom 80%",
              end: "bottom center",
              scrub: 0.5,
              onEnterBack: self => {
                gsap.to(overlay3, { opacity: 1, duration: 0.5 });
              },
              onLeave: self => {
                gsap.to(overlay3, { opacity: 0, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
          });

          if (tl3.scrollTrigger) {
            scrollTriggers.push(tl3.scrollTrigger);
          }
        }
      }
     
      // Animation de l'overlay du slider
      if (section4.current) {
        const overlaySlider = document.querySelector(".sliderOverlay");
        if (overlaySlider) {
          const tl5 = gsap.timeline({
            scrollTrigger: {
              trigger: section4.current,
              start: "top 30%",
              end: "top 10%",
              scrub: 0.5,
              onLeaveBack: self => {
                gsap.to(overlaySlider, { opacity: 0, duration: 0.5 });
              },
              onEnter: self => {
                gsap.to(overlaySlider, { opacity: 1, duration: 0.5 });
              },
              invalidateOnRefresh: true,
            }
          });

          if (tl5.scrollTrigger) {
            scrollTriggers.push(tl5.scrollTrigger);
          }
        }
      }
    });

    animationsInitialized.current = true;

    // Cleanup function
    return () => {
      scrollTriggers.forEach(st => {
        if (st && st.kill) st.kill();
      });
      mm.revert();
    };
  }, [refs]);
}