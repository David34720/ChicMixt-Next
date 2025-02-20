"use client";
import React, { useRef, useState } from "react";
import styles from "./ImageFullWidth.module.scss";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
  };

  return (
    <div ref={containerRef} className={styles.sliderScroll}>
      <div className={styles.sliderContainer}>
        <section className={styles.slide}>
          <div className={styles.imageWrapper}>
            <img src={slidesData[currentIndex].image} alt={slidesData[currentIndex].title} />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>{slidesData[currentIndex].title}</h2>
            <h3 className={styles.slogan2}>{slidesData[currentIndex].slogan2}</h3>
            <p className={styles.slogan}>{slidesData[currentIndex].slogan}</p>
          </div>
        </section>
      </div>
      <button className={styles.prevButton} onClick={handlePrev}>❮</button>
      <button className={styles.nextButton} onClick={handleNext}>❯</button>
      <div
        className="sliderOverlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fff",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 50000,
        }}
      />
    </div>
  );
};

export default SliderFullWidth;
