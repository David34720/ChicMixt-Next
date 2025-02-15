"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SliderFullWidth.module.scss";

interface SlideProps {
  id: number;
  title: string;
  slogan2: string;
  slogan: string;
  image: string;
}

const slidesData: SlideProps[] = [
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
    const sliderContainer = container.querySelector(`.${styles.sliderContainer}`);
    if (!sliderContainer) return;

    // Récupération de tous les slides
    const slides = gsap.utils.toArray<HTMLElement>(
      sliderContainer.querySelectorAll(`.${styles.slide}`)
    );
    const totalSlides = slides.length; // ici 4
    // On initialise : la 1ère diapo est visible, les autres sont masquées
    slides.forEach((slide, i) => {
      gsap.set(slide, { opacity: i === 0 ? 1 : 0 });
    });

    // Création d'une timeline pour animer les transitions entre diapos
    // La timeline se déclenche lorsque le container atteint le centre du viewport,
    // se pinne pendant un scroll (ici, 3 fois la hauteur du container pour 3 transitions),
    // puis se dépinn pour reprendre le scroll normal.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "center center", // quand le centre du container est au centre du viewport
        end: () => "+=" + container.clientHeight * 3, // 3 transitions : ajustez cette valeur si nécessaire
        pin: true,
        scrub: true,
        markers: false, // passez à true pour débuguer
      },
    });

    // Pour 4 diapos, il y a 3 transitions.
    // On divise la timeline en 3 segments égaux.
    const segment = 1 / (totalSlides - 1);
    for (let i = 0; i < totalSlides - 1; i++) {
      tl.to(
        slides[i],
        {
          opacity: 0,
          ease: "power1.inOut",
          duration: segment,
        },
        i * segment
      ).to(
        slides[i + 1],
        {
          opacity: 1,
          ease: "power1.inOut",
          duration: segment,
        },
        i * segment
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.sliderScroll}>
      <div className={styles.sliderContainer}>
        {slidesData.map((slide) => (
          <section key={slide.id} className={styles.slide}>
            <div className={styles.imageWrapper}>
              <img src={slide.image} alt={slide.title} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{slide.title}</h2>
              <h3 className={styles.slogan2}>{slide.slogan2}</h3>
              <p className={styles.slogan}>{slide.slogan}</p>
            </div>
          </section>
        ))}
      </div>
      <div
          className="sliderOverlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff", // ou la couleur de fond souhaitée
            opacity: 0,
            pointerEvents: "none",
            zIndex: 50000,
          }}
        />
    </div>
  );
};

export default SliderFullWidth;
