"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";
import styles from "./HookHomePage.module.scss";
import { gsap } from "gsap";

export default function HookHomePage() {
  // Références pour l'image de fond, le container et le bloc du smartphone
  const bgImageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Contrôle du rendu du smartphone (retardé)
  const [showPhone, setShowPhone] = useState(false);

  // Animation de l'image de fond : zoom et déflout progressif
  useEffect(() => {
    if (bgImageRef.current) {
      gsap.fromTo(
        bgImageRef.current,
        { scale: 3.4, filter: "blur(5px)" },
        { scale: 1.2, filter: "blur(0px)", duration: 2.5, ease: "power2.out" }
      );
    }
  }, []);
  

  // Retarder le rendu du smartphone après 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPhone(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animation d'apparition du smartphone (smooth, remontée + fondu + perspective)
  useEffect(() => {
    if (showPhone && phoneRef.current) {
      gsap.fromTo(
        phoneRef.current,
        {
          y: 100,             // L'élément part de 100px en dessous
          opacity: 0,         // Transparence initiale
          scale: 0.95,        // Un léger scale pour renforcer l'effet
          rotationX: 15,      // Une légère rotation sur l'axe X pour un effet de perspective
          transformPerspective: 800
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power2.out"
        }
      );
    }
  }, [showPhone]);

  // Parallaxe pour l'image de fond (mouvement réactif à la souris)
  useEffect(() => {
    if (!containerRef.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX - innerWidth / 2;
      const y = e.clientY - innerHeight / 2;
      const bgX = -x / 10;
      const bgY = -y / 10;
      gsap.to(bgImageRef.current, {
        x: bgX,
        y: bgY,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parallaxe pour le smartphone : effet inverse et légère inclinaison lors du mouvement de la souris
  useEffect(() => {
    if (!showPhone || !phoneRef.current) return;
    const handlePhoneMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX - innerWidth / 2;
      const y = e.clientY - innerHeight / 2;
      // Calculer un décalage et une rotation plus discrets pour le smartphone
      const offsetX = x / 20; // décalage moins prononcé que pour le fond
      const offsetY = y / 20;
      const rotateX = -y / 100; // rotation inversée pour un effet réaliste
      const rotateY = x / 100;
      gsap.to(phoneRef.current, {
        x: offsetX,
        y: offsetY,
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handlePhoneMouseMove);
    return () => window.removeEventListener("mousemove", handlePhoneMouseMove);
  }, [showPhone]);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Image de fond animée directement par GSAP */}
      <Image
        ref={bgImageRef as any} // Next.js Image n'accepte pas toujours la ref directement
        src="/images/HookHomePage/webpeditor_DALL·E2025-02-0120.42.17-Showroom-Next_Chicmixt.webp"
        placeholder="blur"
        blurDataURL="/images/HookHomePage/webpeditor_DALL·E2025-02-0120.42.17-Showroom-Next_Chicmixt-PH.webp"
        alt="Showroom"
        fill
        priority
        className={styles.bgImage}
      />

      {/* Le smartphone (mockup + GIF) ne s'affiche qu'après le délai */}
      {showPhone && (
        <div ref={phoneRef} className={styles.phoneWrapper}>
          <div className={styles.phoneContainer}>
            <Image
              src="/images/HookHomePage/mochup_Chicmixt-live.webp"
              alt="Smartphone mockup"
              width={400}
              height={600}
              className={styles.phoneImg}
              priority
            />
            <LazyLoadImage
              placeholderSrc="/images/HookHomePage/webpeditor_placeHolderHook-ChicMixt-mode-live.webp"
              actualSrc="/images/HookHomePage/Live-mockup-Chicmixt-Hook-3.gif"
              alt="GIF in phone screen"
              width={400}
              height={600}
              className={styles.phoneScreen}
              delay={2000} // Le GIF est chargé avec un délai supplémentaire
            />
          </div>
        </div>
      )}
    </div>
  );
}
