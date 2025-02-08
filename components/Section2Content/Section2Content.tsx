import styles from './Section2Content.module.scss'
import { useRef } from 'react'
import Image from "next/image";

import { useSectionRefs } from "../../hooks/useSectionRefs";

import FacebookLiveVideo from "../../components/FacebookLiveVideo";
import { ReactShare } from "../../components/ReactShare";

interface Section2ContentProps {
   
}
const Section2Content = ({  }: Section2ContentProps) => {
   
  const { desktopRefs } = useSectionRefs();

  const facebookVideoUrl = "https://fb.watch/xgvTdqbHcb/";

  return (  
    <>
      <div className={styles.leftCol}>
          <div className={styles.imageWrapper} ref={desktopRefs.imageRef1}>
            <FacebookLiveVideo videoUrl={facebookVideoUrl} />
          </div>
      </div>
      <div className={`${styles.rightCol} enter-animation`}>
        <a href="https://fb.watch/xgvTdqbHcb/" target="_blank" rel="noopener noreferrer">
          <div className={styles.contentBox} ref={desktopRefs.contentBox}>
            <div className={styles.logoFbContainer} ref={desktopRefs.imageRefFB}>
              <Image
                className={styles.logoFbImg} // Retirez enter-animation d'ici
                src="/images/Facebook-logo-chicMixt.jpeg"
                alt="Facebook Vêtements en ligne Live Chic'mixt"
                width={200}
                height={200}
                loading="eager"
              />
            </div>
            <div className="enter-animation"> {/* Ajoutez un conteneur pour l'animation */}
              <h2 ref={desktopRefs.section2Title1}>
                RETROUVEZ-NOUS EN LIVE SUR FACEBOOK
              </h2>
              <p>
                Rejoignez-nous lors de nos lives shopping Facebook pour découvrir en exclusivité nos nouveautés et profiter d'offres spéciales.
              </p>
            </div>
          </div>
        </a>
        <div className={styles.share}>
          <div className={`${styles.share} enter-animation`}>
            <span className={styles.shareText}>
              Partagez à vos amis et profitez des bons plans Mode Chic'Mixt sur vos réseaux préférés !
            </span>
            <ReactShare iconSize={40} />
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
