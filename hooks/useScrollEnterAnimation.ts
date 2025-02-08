"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollEnterOptions {
  y?: number;
  start?: string;
  end?: string;
  duration?: number;
  ease?: string;
  stagger?: number; // délai de décalage entre les éléments
  markers?: boolean;
}

export function useScrollEnterAnimation(
  selector: string ,
  options: ScrollEnterOptions = {}
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Sélection de tous les éléments correspondant au sélecteur
    const elements = document.querySelectorAll(selector);
    console.log(`Elements trouvés pour "${selector}": ${elements.length}`);

    if (options.stagger) {
      // Si un stagger est défini, on anime le groupe d'éléments ensemble via un timeline
      const elementsArray = Array.from(elements);
      gsap.set(elementsArray, {
        opacity: 0,
        y: options.y ?? 50,
        immediateRender: true,
      });
      
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: options.duration ?? 0.8,
          ease: options.ease || "power2.out",
        },
      });
      
      tl.to(elementsArray, { opacity: 1, y: 0, stagger: options.stagger });
      
      ScrollTrigger.create({
        // Utilise le premier élément du groupe comme trigger
        trigger: elementsArray[0],
        markers: options.markers || false,
        start: options.start || "top 80%",
        toggleActions: "play reverse play reverse",
        animation: tl,
      });
    } else {
      // Sinon, on anime chaque élément individuellement
      elements.forEach((element, index) => {
        gsap.set(element, {
          opacity: 0,
          y: options.y ?? 50,
          immediateRender: true,
        });

        ScrollTrigger.create({
          trigger: element,
          markers: options.markers || false,
          start: options.start || "top 80%",
          end: options.end || "top 20%",
          onEnter: () => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: options.duration ?? 0.8,
              ease: options.ease || "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(element, {
              opacity: 0,
              y: -50,
              duration: options.duration ?? 0.8,
              ease: options.ease || "power2.out",
            });
          },
          onLeave: () => {
            gsap.to(element, {
              opacity: 0,
              y: options.y ?? 50,
              duration: options.duration ?? 0.8,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(element, {
              opacity: 0,
              y: options.y ?? 50,
              duration: options.duration ?? 0.8,
              ease: "power2.in",
            });
          },
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: options.duration ?? 0.8,
                ease: options.ease || "power2.out",
              });
            } else {
              gsap.to(element, {
                opacity: 0,
                y: options.y ?? 50,
                duration: options.duration ?? 0.8,
                ease: "power2.in",
              });
            }
          },
        });
      });
    }

    // Rafraîchit les ScrollTriggers
    ScrollTrigger.refresh();

    // Cleanup lors du démontage
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [selector, options]);
}
