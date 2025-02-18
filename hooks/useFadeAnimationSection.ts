"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollFadeOptions {
  start?: string;
  end?: string;
  markers?: boolean;
  duration?: number; // Durée de l'animation
}

export function useFadeAnimation(
  selectorFade: string,
  options: ScrollFadeOptions = {}
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Sélection de tous les éléments correspondant au sélecteur
    const elementsFade = document.querySelectorAll(selectorFade);
    if (elementsFade.length === 0) {
      return;
    }

    const duration = options.duration || 0.7; // Durée par défaut à 0.5 s

    // Pour chaque élément, on crée un ScrollTrigger individuel
    elementsFade.forEach((element) => {
      gsap.set(element, {
        opacity: 1,
        immediateRender: true,
      });

      ScrollTrigger.create({
        trigger: element,
        markers: options.markers || false,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        scrub: 1,
        onEnter: () => {
          gsap.to(element, { opacity: 0, ease: "power1.inOut", duration });
        },
        onLeave: () => {
          gsap.to(element, { opacity: 1, ease: "power1.inOut", duration });
        },
        onEnterBack: () => {
          gsap.to(element, { opacity: 0, ease: "power1.inOut", duration });
        },
        onLeaveBack: () => {
          gsap.to(element, { opacity: 1, ease: "power1.inOut", duration });
        },
      });
    });

    // Rafraîchit les ScrollTriggers pour s'assurer que les positions sont correctes
    ScrollTrigger.refresh();

    // Cleanup lors du démontage
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [selectorFade, options]);
}
