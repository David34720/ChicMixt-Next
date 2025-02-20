"use client"
import { ModalActionsContext } from "../../contexts/ModalContext";
import { useContext, useState } from 'react'
import styles from './Section2Content.module.scss'
import Image from "next/image";

import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";
import {useFadeAnimation} from '../../hooks/useFadeAnimationSection'

import Section2AdminForm from "./Section2AdminForm";

import { ReactShare } from "../ReactShare/ReactShare";
import dynamic from 'next/dynamic';

// Import dynamique du composant avec SSR désactivé
const SocialMediaEmbedNoSSR = dynamic(
  () => import('@components/SocialMediaEmbed/SocialMediaEmbed'),
  { ssr: false }
);


interface Section2ContentProps {
   isMobile: boolean,
   isAdmin: boolean,
   liveDate?: string,
   facebookVideoUrl: string
}
const Section2Content = ({ isMobile, isAdmin, liveDate, facebookVideoUrl: facebookVideoUrlProp }: Section2ContentProps) => {
  const { openModal, closeModal } = useContext(ModalActionsContext);
  const [facebookVideoUrl, setFacebookVideoUrl] = useState(facebookVideoUrlProp);

  
  

  useFadeAnimation(".section2-overlay", {
    markers: false
  });
  useFadeAnimation(".facebookLeftAnimation", {
    markers: false,
    inverse: true
  });
  useFadeAnimation(".facebookRightAnimation", {
    markers: false,
    inverse: true
  });
  useScrollEnterAnimation(".section2Animation", {
    duration: 0.8,
    y: 50,
    ease: "power2.out",
    markers: false
  });

  return (  
    <>
      
      <div className={`${styles.leftCol} `}>
        {/* {!isMobile && (
          <div className={styles.imageWrapper}>
            <FacebookLiveVideo videoUrl={facebookVideoUrl} />
          </div>
        )} */}
        <div className={`${styles.imageWrapper} facebookLeftAnimation`}>
            <SocialMediaEmbedNoSSR network="facebook" url={facebookVideoUrl} width={500} height={800}/>
        </div>
      </div>
      <div className={`${styles.rightCol} `}>
        {isAdmin && (
          <div className="admin-comment-form admin-section2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() =>
                openModal(<Section2AdminForm onClose={() => closeModal()} />)
              }
            >
              Mettre à jour le live
            </button>
          </div>
        )}
        <a href={facebookVideoUrl} className={"facebookRightAnimation"} target="_blank" rel="noopener noreferrer">
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
          <div className={styles.share} >
            <span className={`${styles.shareText} section2Animation`}>
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
            height: "100%",
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