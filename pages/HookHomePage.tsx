import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HookHomePage.module.scss';

export default function HookHomePage() {
  // État pour le décalage de la BG (parallaxe)
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  // État pour l’inclinaison du smartphone
  const [phoneRotation, setPhoneRotation] = useState({ x: 0, y: 0 });
  // État pour le scale (zoom arrière initial)
  const [bgScale, setBgScale] = useState(1.4);
  // État pour le blur (flou au démarrage)
  const [bgBlur, setBgBlur] = useState(5); // 10 = 10px de flou initial

  // === 1) Animer le scale de l’image de fond et le blur sur 2s au chargement ===
  useEffect(() => {
    let startTime = 0;
    const duration = 1500; // 2 secondes

    function animateZoom(timestamp: number) {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // entre 0 et 1

      // De scale(3.4) à scale(1.0) => écart de 2.4
      const newScale = 3.4 - 2.4 * progress;
      setBgScale(newScale);

      // De blur(10px) à blur(0px)
      const newBlur = 5 - 5 * progress;
      setBgBlur(newBlur);

      if (progress < 1) {
        requestAnimationFrame(animateZoom);
      }
    }

    requestAnimationFrame(animateZoom);
  }, []);

  // === 2) Gérer la parallaxe / rotation au mouvement de la souris ===
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { innerWidth, innerHeight } = window;
    const x = e.clientX - innerWidth / 2;
    const y = e.clientY - innerHeight / 2;

    const bgX = -x / 10;
    const bgY = -y / 10;

    const rotateX = y / 10;
    const rotateY = -x / 60;

    setBgOffset({ x: bgX, y: bgY });
    setPhoneRotation({ x: rotateX, y: rotateY });
  }

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      {/* L’image de fond qui se "zoom out", se translate et passe de blur(10px) à blur(0px) */}
      <Image
        src="/images/HookHomePage/DALL·E2025-02-0120.42.17-Showroom-Next_Chicmixt.webp"
        alt="Showroom"
        fill
        priority
        className={styles.bgImage}
        style={{
          transform: `translate(${bgOffset.x}px, ${bgOffset.y}px) scale(${bgScale})`,
          filter: `blur(${bgBlur}px)`,
        }}
      />

      {/* Le smartphone qui s’incline légèrement */}
      <div
        className={styles.phoneWrapper}
        style={{
          transform: `
            translate(-50%, 0) 
            rotateX(${phoneRotation.x}deg) 
            rotateY(${phoneRotation.y}deg)
          `,
        }}
      >
        <div className={styles.phoneContainer}>
          {/* PNG transparent du smartphone */}
          <Image
            src="/images/HookHomePage/mochup_Chicmixt-live.png"
            alt="Smartphone mockup"
            width={300}
            height={600}
            className={styles.phoneImg}
          />
          
          {/* GIF (ou vidéo) dans l’écran du smartphone */}
          <Image
            src="/images/HookHomePage/Live-mockup-Chicmixt-Hook-3.gif"
            alt="GIF in phone screen"
            width={300}
            height={600}
            className={styles.phoneScreen}
          />
        </div>
      </div>
    </div>
  );
}
