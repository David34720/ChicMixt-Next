"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollEnterAnimation() {
  const animationsSetup = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || animationsSetup.current) return;

    // Enregistrement du plugin
    gsap.registerPlugin(ScrollTrigger);

    const setupAnimations = () => {
      // Sélection des éléments
      const elements = document.querySelectorAll('.enter-animation');
      console.log('Elements trouvés:', elements.length);

      // Configuration initiale
      elements.forEach((element, index) => {
        console.log(`Configuration d l'élément ${index}:`, element);
        console.log(`Configuration d l'élément ${index}:`, element);
        
        // Reset initial forcé
        gsap.set(element, {
          opacity: 0,
          y: 50,
          immediateRender: true
        });

        // Création du ScrollTrigger avec plus de contrôle
        const trigger = ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reset",
          onEnter: () => {
            console.log(`Animation déclenchée pour l'élément ${index}`);
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => console.log(`Animation terminée pour l'élément ${index}`)
            });
          },
          onEnterBack: () => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(element, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power2.in"
            });
          }
        });

        console.log(`ScrollTrigger créé pour l'élément ${index}:`, trigger);
      });

      // Force un refresh pour s'assurer que tout est bien calculé
      ScrollTrigger.refresh();
    };

    // Initialisation avec un délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      setupAnimations();
      animationsSetup.current = true;
    }, 100);

    // Ajout d'un listener pour le scroll
    const handleScroll = () => {
      if (!animationsSetup.current) {
        setupAnimations();
        animationsSetup.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { once: true });

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(st => st.kill());
      animationsSetup.current = false;
    };
  }, []);
}