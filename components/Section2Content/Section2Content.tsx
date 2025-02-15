import styles from './Section2Content.module.scss'
import { useRef } from 'react'
import Image from "next/image";

import { useSectionRefs } from "../../hooks/useSectionRefs";
import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";

import FacebookLiveVideo from "./FacebookLiveVideo";
import FacebookLiveVideoMobile from '@components/Section2Content/FacebookLiveVideoMobile';
import { ReactShare } from "../ReactShare/ReactShare";

interface Section2ContentProps {
   isMobile: boolean
}
const Section2Content = ({ isMobile }: Section2ContentProps) => {
   
  const { desktopRefs } = useSectionRefs();

  const facebookVideoUrl = "https://fb.watch/xgvTdqbHcb/";

  useScrollEnterAnimation(".section2Animation", {
    duration: 0.8,
    y: 50,
    start: "top 80%",
    end: "top 10%",
    ease: "power2.out",
    markers: false
  });
  useScrollEnterAnimation(".section2AnimationContainer", {
    duration: 0.8,
    y: 50,
    start: "top 80%",
    end: "80% 20%",
    ease: "power2.out",
    markers: false
  });

  return (  
    <>
      <div className={`${styles.leftCol} section2AnimationContainer`}>
        {!isMobile && (
          <div className={styles.imageWrapper}>
            <FacebookLiveVideo videoUrl={facebookVideoUrl} />
          </div>
        )}
      </div>
      <div className={`${styles.rightCol} section2AnimationContainer`}>
        <a href="https://fb.watch/xgvTdqbHcb/" target="_blank" rel="noopener noreferrer">
          <div className={styles.contentBox} >
            <div className={styles.logoFbContainer}>
              <Image
                className={styles.logoFbImg} // Retirez enter-animation d'ici
                src="/images/Facebook-logo-chicMixt.jpeg"
                alt="Facebook Vêtements en ligne Live Chic'mixt"
                width={200}
                height={200}
                loading="eager"
              />
            </div>
            <div className="section2Animation"> {/* Ajoutez un conteneur pour l'animation */}
              <h2>
                RETROUVEZ-NOUS EN LIVE SUR FACEBOOK
              </h2>
              <p>
                Rejoignez-nous lors de nos lives shopping Facebook pour découvrir en exclusivité nos nouveautés et profiter d'offres spéciales.
              </p>
            </div>
          </div>
        </a>
        <div className={styles.share}>
          <div className={`${styles.share} section2Animation`}>
            <span className={styles.shareText}>
              Partagez à vos amis et profitez des bons plans Mode Chic'Mixt sur vos réseaux préférés !
            </span>
            <ReactShare iconSize={40} classAnimation="section2ShareAnimation" />
          </div>
        </div>
      </div>
        {/* Overlay qui masque la section quand nécessaire */}
        <div

          className="section2-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff", // ou la couleur de fond souhaitée
            opacity: 0,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
    </>
  )
} 

export default Section2Content;
