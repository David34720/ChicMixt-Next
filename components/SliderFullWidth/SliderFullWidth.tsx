"use client";

import React, { useEffect, useRef } from "react";
import styles from "./SliderFullWidth.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SliderFullWidthProps {
  id: number;
  title: string;
  slogan2: string;
  slogan: string;
  image: string;
}

const slidesData: SliderFullWidthProps[] = [
  {
    id: 1,
    title: "FEMME",
    slogan2: "Mode, Chic & Exclusif",
    slogan: "Robes, tops, pantalons pour sublimer votre style.",
    image: "/images/diaporamaDressing/diapo-femme-ia-2.jpeg",
  },
  {
    id: 2,
    title: "ENFANT",
    slogan2: "Fun, Coloré & Pratique",
    slogan: "Grandir avec style.",
    image: "/images/diaporamaDressing/diapo-enfant-ia.jpeg",
  },
  {
    id: 3,
    title: "HOMME",
    slogan2: "Streetwear & Casual Chic",
    slogan: "Un look moderne et élégant.",
    image: "/images/diaporamaDressing/diapo-homme-ia.jpeg",
  },
  {
    id: 4,
    title: "ACCESSOIRES",
    slogan2: "Sacs, Bijoux & Fantaisies",
    slogan: "Les détails qui font la différence",
    image: "/images/diaporamaDressing/diapo-accessoire-ia.jpeg",
  },
];

const SliderFullWidth: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const slides = gsap.utils.toArray<HTMLElement>(
      container.querySelectorAll(`.${styles.slide}`)
    );

    // Paramètres de timeline
    const holdPercent = 0.9; // Augmentez ce pourcentage pour allonger le temps de maintien d'une diapositive
    const transitionPercent = 1 - holdPercent; // 0.2

    // Timeline principale
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: true,
        start: "top top",
        // end: "100%", // À ajuster si besoin, ex: end: () => "+=" + slides.length * 100 + "%"
        end: "100%",
        scrub: 4, // on veut un contrôle pixel-perfect avec le scroll
        snap: {
          snapTo: 1 / (slides.length - 1),
          duration: 1, 
          inertia: false
        },
        onUpdate: (self) => {
          // Mise à jour de l'indicateur "dot" en fonction de la progression
          const progress = self.progress;
          const currentIndex = Math.round(progress * (slides.length - 1));
          document.querySelectorAll(`.${styles.dot}`).forEach((dot, index) => {
            if (index === currentIndex) {
              dot.classList.add(styles.active);
            } else {
              dot.classList.remove(styles.active);
            }
          });
        },
      },
    });

    // Initialisation des slides (la première est visible, les autres masquées / floues)
    slides.forEach((slide, i) => {
      gsap.set(slide, {
        autoAlpha: i === 0 ? 1 : 0,
        filter: i === 0 ? "blur(0px)" : "blur(8px)",
        zIndex: slides.length - i,
      });
    });

    // Construction de l'animation
    slides.forEach((slide, i) => {
      const slogan2El = slide.querySelector(`.${styles.slogan2}`);
      const sloganEl = slide.querySelector(`.${styles.slogan}`);

      // Animation des slogans : de y=80 à y=-80 (scrub: true), sur la durée holdPercent
      tl.fromTo(
        [slogan2El, sloganEl],
        { y: 200, autoAlpha: 0 },
        {
          y: -250,
          autoAlpha: 1,
          ease: "none", // pas d'easing, le scroll contrôle entièrement le mouvement
          duration: holdPercent,
        },
        i // début à i
      ).to(
        [slogan2El, sloganEl],
        { autoAlpha: 0 },
        i + holdPercent // on les masques avant la transition
      );

      // Transition slide précédente -> slide actuelle
      if (i !== 0) {
        tl.to(
          slides[i - 1],
          {
            autoAlpha: 0,
            y: -200,
            filter: "blur(8px)",
            duration: transitionPercent,
            ease: "power2.inOut", 
          },
          i - transitionPercent
        ).fromTo(
          slides[i],
          { autoAlpha: 0, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: transitionPercent,
            ease: "power2.inOut",
          },
          i - transitionPercent
        );
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className={`${styles.sliderContainer} sliderContainer`}>
        {slidesData.map((slide, index) => (
          <section key={slide.id} data-slide={index} className={styles.slide}>
            <div className={styles.imageWrapper}>
              <img src={slide.image} alt={slide.title} />
            </div>
            <h2 className={styles.title}>{slide.title}</h2>
            <div className={styles.content}>
              <h3 className={styles.slogan2}>{slide.slogan2}</h3>
              <p className={styles.slogan}>{slide.slogan}</p>
            </div>
          </section>
        ))}
        <div className={styles.progress}>
          {slidesData.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index === 0 ? styles.active : ""}`}
            />
          ))}
        </div>
        {/* Overlay qui masque la section si besoin */}
        <div
          className="slider-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            opacity: 1,
            pointerEvents: "none",
            zIndex: 500,
          }}
        />
      </div>
    </>
  );
};

export default SliderFullWidth;
