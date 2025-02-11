'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './HookHomePage.module.scss';
import { gsap } from 'gsap';

interface Slide {
  id: number;
  title: string;
  slogan: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'FEMME',
    slogan: 'L\'élégance à l\'état pur',
    image: '/images/diaporamaDressing/diapo-femme-ia-2.jpeg',
    link: '#femme'
  },
  {
    id: 2,
    title: 'ENFANT',
    slogan: 'Le style dès le plus jeune âge',
    image: '/images/diaporamaDressing/diapo-enfant-ia.jpeg',
    link: '#enfant'
  },
  {
    id: 3,
    title: 'HOMME',
    slogan: 'Le raffinement au masculin',
    image: '/images/diaporamaDressing/diapo-homme-ia.jpeg',
    link: '#homme'
  },
  {
    id: 4,
    title: 'ACCESSOIRES',
    slogan: 'Les détails qui font la différence',
    image: '/images/diaporamaDressing/diapo-accessoire-ia.jpeg',
    link: '#accessoires'
  }
];

const Slider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef<boolean>(false);
  const gsapInstance = useRef<typeof gsap | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const animateSlide = (index: number, isInitial: boolean = false): void => {
    if (!gsapInstance.current || !sliderRef.current) return;
    const gsap = gsapInstance.current;

    const currentSlide = sliderRef.current.children[index] as HTMLElement;
    const title = currentSlide.querySelector(`.${styles.title}`) as HTMLElement;
    const slogan = currentSlide.querySelector(`.${styles.slogan}`) as HTMLElement;
    const image = currentSlide.querySelector(`.${styles.imageWrapper}`) as HTMLElement;

    if (timeline.current) {
      timeline.current.kill();
    }

    timeline.current = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });

    // Reset autres slides
    slides.forEach((_, i) => {
      if (i !== index) {
        const slide = sliderRef.current?.children[i] as HTMLElement;
        gsap.set(slide, { display: 'none' });
      }
    });

    // Afficher slide active
    gsap.set(currentSlide, { display: 'block' });

    if (isInitial) {
      timeline.current
        .fromTo(image, 
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1 }
        )
        .fromTo(title,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.3'
        )
        .fromTo(slogan,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        );
    } else {
      timeline.current
        .fromTo(image,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 0.8 }
        )
        .fromTo([title, slogan],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.4'
        );
    }
  };

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      gsapInstance.current = gsap;
      
      ctx = gsap.context(() => {
        animateSlide(0, true);
      }, sliderRef);
    };

    initGSAP();
    
    return () => {
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();
      
      if (isAnimating.current) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = activeIndex + direction;
      
      if (nextIndex >= 0 && nextIndex < slides.length) {
        isAnimating.current = true;
        setActiveIndex(nextIndex);
        animateSlide(nextIndex);
      }
    };

    const container = sliderRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeIndex]);

  return (
    <div ref={sliderRef} className={styles.sliderContainer}>
      {slides.map((slide, index) => (
        <section
          key={slide.id}
          className={styles.slide}
          style={{ display: index === 0 ? 'block' : 'none' }}
        >
          <a href={slide.link} className="block w-full h-full">
            <div className={styles.imageWrapper}>
              <img 
                src={slide.image} 
                alt={slide.title}
              />
            </div>
            
            <div className={styles.content}>
              <h2 className={styles.title}>
                {slide.title}
              </h2>
              <p className={styles.slogan}>
                {slide.slogan}
              </p>
            </div>
          </a>
        </section>
      ))}
    </div>
  );
};

export default Slider;