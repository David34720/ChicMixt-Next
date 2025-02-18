"use client";
// /hooks/useScrollEnterAnimation.ts
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollEnterOptions {
  y?: number;          // valeur de décalage pour l'entrée (ex: 50, l'élément part de 50px en dessous)
  enterY?: number;     // optionnel, par défaut égale à y ou 50
  exitY?: number;      // optionnel, par défaut égale à -y ou -50
  start?: string;
  end?: string;
  duration?: number; 
  ease?: string;
  stagger?: number;    // délai (en secondes) de décalage entre les éléments
  markers?: boolean;
}

export function useScrollEnterAnimation(
  selector: string,
  options: ScrollEnterOptions = {}
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Sélection de tous les éléments correspondant au sélecteur
    const elements = document.querySelectorAll(selector);
    const total = elements.length;

    // Valeurs par défaut pour l'animation
    const enterY = options.enterY !== undefined ? options.enterY : (options.y !== undefined ? options.y : 50);
    const exitY = options.exitY !== undefined ? options.exitY : (options.y !== undefined ? -options.y : -50);

    // Pour chaque élément, on crée un ScrollTrigger avec des délais calculés pour simuler le stagger
    elements.forEach((element, index) => {
      gsap.set(element, {
        opacity: 0,
        y: enterY,
        immediateRender: true,
      });

      ScrollTrigger.create({
        trigger: element,
        markers: options.markers || false,
        start: options.start || "top 80%",
        end: options.end || "top 20%",
        onEnter: () => {
          gsap.fromTo(
            element,
            { opacity: 0, y: enterY },
            {
              opacity: 1,
              y: 0,
              duration: options.duration ?? 0.8,
              ease: options.ease || "power2.out",
              delay: (options.stagger || 0) * index,
            }
          );
        },
        onLeave: () => {
          gsap.to(element, {
            opacity: 0,
            y: exitY,
            duration: options.duration ?? 0.8,
            ease: options.ease || "power2.in",
            delay: (options.stagger || 0) * (total - 1 - index),
          });
        },
        onEnterBack: () => {
          gsap.fromTo(
            element,
            { opacity: 0, y: exitY },
            {
              opacity: 1,
              y: 0,
              duration: options.duration ?? 0.8,
              ease: options.ease || "power2.out",
              delay: (options.stagger || 0) * (total - 1 - index),
            }
          );
        },
        onLeaveBack: () => {
          gsap.to(element, {
            opacity: 0,
            y: enterY,
            duration: options.duration ?? 0.8,
            ease: options.ease || "power2.in",
            delay: (options.stagger || 0) * index,
          });
        },
      });
    });

    // Rafraîchit les ScrollTriggers pour s'assurer que les positions sont correctes
    ScrollTrigger.refresh();

    // Cleanup lors du démontage
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [selector, options]);
}
