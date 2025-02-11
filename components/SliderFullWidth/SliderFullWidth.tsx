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
  // Ref sur le container de scroll (outer)
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    // Définir la hauteur minimale du container de scroll pour générer le scroll (4 fois la hauteur de la fenêtre)
    container.style.minHeight = `${window.innerHeight * slidesData.length}px`;

    // Attendre le chargement de toutes les images
    const imgs = container.querySelectorAll("img");
    const imgPromises = Array.from(imgs).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve());
        img.addEventListener("error", () => resolve());
      });
    });

    Promise.all(imgPromises).then(() => {
      createTimeline();
    });

    const createTimeline = () => {
      // Le container à pinner est l'élément interne (sliderContainer)
      const sliderContainer = container.querySelector(`.${styles.sliderContainer}`);
      if (!sliderContainer) return;
      
      const slides = gsap.utils.toArray<HTMLElement>(
        sliderContainer.querySelectorAll(`.${styles.slide}`)
      );
      const totalUnits = slides.length; // ici 4 slides
      const fadeDuration = 0.5;
      const holdDuration = 1 - fadeDuration; // 0.5

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container, // container de scroll
          pin: sliderContainer, // on pin le container interne
          pinSpacing: true,
          anticipatePin: 1,
          start: "top top",
          end: () => "+=" + window.innerHeight * (totalUnits - 1),
          markers: false,
          scrub: 8,
          snap: {
            snapTo: 1 / (totalUnits - 1),
            duration: 1.5,
            inertia: false,
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const currentIndex = Math.min(
              Math.round(progress * totalUnits),
              totalUnits - 1
            );
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

      // Initialisation des slides
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          autoAlpha: i === 0 ? 1 : 0,
          filter: i === 0 ? "blur(0px)" : "blur(8px)",
          zIndex: 5000 + totalUnits - i,
        });
      });

      // Animation de chaque slide
      slides.forEach((slide, i) => {
        const slogan2El = slide.querySelector(`.${styles.slogan2}`);
        const sloganEl = slide.querySelector(`.${styles.slogan}`);

        tl.fromTo(
          [slogan2El, sloganEl],
          { y: 200, autoAlpha: 0 },
          {
            y: -250,
            autoAlpha: 1,
            ease: "none",
            duration: holdDuration,
          },
          i
        ).to(
          [slogan2El, sloganEl],
          { autoAlpha: 0 },
          i + holdDuration
        );

        if (i !== 0) {
          tl.to(
            slides[i - 1],
            {
              autoAlpha: 0,
              y: -200,
              filter: "blur(8px)",
              duration: fadeDuration,
              ease: "power2.inOut",
            },
            i - fadeDuration
          ).fromTo(
            slides[i],
            { autoAlpha: 0, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: fadeDuration,
              ease: "power2.inOut",
            },
            i - fadeDuration
          );
        }
      });

      // Verrouiller l'état final du dernier slide
      tl.addLabel("final", totalUnits);
      tl.to(
        slides[totalUnits - 1],
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.1 },
        "final"
      );

      // Rafraîchir ScrollTrigger
      ScrollTrigger.refresh();
    };

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    // Container de scroll (outer)
    <div ref={containerRef} className={styles.sliderScroll}>
      {/* Container à pinner (inner) */}
      <div className={styles.sliderContainer}>
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
            <div key={index} className={`${styles.dot} ${index === 0 ? styles.active : ""}`} />
          ))}
        </div>
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
    </div>
  );
};

export default SliderFullWidth;
