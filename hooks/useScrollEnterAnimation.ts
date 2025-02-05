// hooks/useScrollEnterAnimation.ts
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollEnterAnimation() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.toArray(".enter-animation") as HTMLElement[];
    const scrollTriggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      // Position de départ
      gsap.set(el, { opacity: 0, y: 90 });

      // Crée le timeline avec toggleActions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",    // Quand le haut de l'élément touche le bas de la fenêtre
          end: "top 80%",      // ou ce que tu souhaites
          toggleActions: "restart none none none",
          scrub: false, // si tu veux une animation non liée au défilement
        },
      });

      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // On stocke le ScrollTrigger pour le cleanup
      if (tl.scrollTrigger) {
        scrollTriggers.push(tl.scrollTrigger);
      }
    });

    return () => {
      scrollTriggers.forEach((st) => st.kill());
    };
  }, []);
}
