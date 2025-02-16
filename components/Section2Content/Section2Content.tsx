import styles from './Section2Content.module.scss'
import { useState, useEffect } from 'react'
import Image from "next/image";

import { useSectionRefs } from "../../hooks/useSectionRefs";
import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";

import Section2AdminForm from './Section2AdminForm';
import FacebookLiveVideo from "./FacebookLiveVideo";
import FacebookLiveVideoMobile from '@components/Section2Content/FacebookLiveVideoMobile';
import { ReactShare } from "../ReactShare/ReactShare";

interface Section2ContentProps {
   isMobile: boolean,
   isAdmin: boolean
}
interface Section2Data {
  videoUrl: string;
  liveDate: string;
}
const Section2Content = ({ isMobile, isAdmin }: Section2ContentProps) => {
   
  const [sectionData, setSectionData] = useState<Section2Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const facebookVideoUrl = "https://fb.watch/xgvTdqbHcb/";

   // 🟢 Charger les données depuis l'API
    const fetchSection2Data = async () => {
      try {
        const res = await fetch("/api/section2");
        if (!res.ok) throw new Error("Erreur lors du chargement des données.");
        const result = await res.json();
        setSectionData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {

      fetchSection2Data();
    }, []);
    useEffect(() => {
      const handleUpdate = () => {
        setTimeout(() => {
          fetchSection2Data(); // Recharge les données
        }, 2000);
      };

      window.addEventListener("section2Updated", handleUpdate);

      return () => {
        window.removeEventListener("section2Updated", handleUpdate);
      };
    }, []);



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
  
  const liveDateLocal = sectionData?.liveDate
    ? new Date(sectionData.liveDate).toLocaleString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
  : "Aucune donnée disponible.";
  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">Erreur: {error}</div>;
  if (!sectionData) return <div>Aucune donnée disponible.</div>;

  return (  
    <>
      <div className={`${styles.leftCol} section2AnimationContainer`}>
        {!isMobile && (
          <div className={styles.imageWrapper}>
            <FacebookLiveVideo videoUrl={sectionData.videoUrl} />
          <p className="text-sm text-gray-500 mt-2">
            📅  live du  {liveDateLocal}
          </p>
          </div>
        )}
      </div>
      <div className={`${styles.rightCol} section2AnimationContainer`}>
        {isAdmin ? (<Section2AdminForm /> ) : 
        ( 
          <>
            <a href={sectionData.videoUrl} target="_blank" rel="noopener noreferrer">
              <div className={styles.contentBox} >
                    <div className={styles.logoFbContainer}>
                      <Image
                        className={styles.logoFbImg}
                        src="/images/Facebook-logo-chicMixt.jpeg"
                        alt="Facebook Vêtements en ligne Live Chic'mixt"
                        width={200}
                        height={200}
                        loading="eager"
                        />
                    </div>
                    <div className="section2Animation">
                      <h2>
                        RETROUVEZ-NOUS EN LIVE SUR FACEBOOK
                      </h2>
                      <p>
                        Rejoignez-nous lors de nos lives shopping Facebook pour découvrir en exclusivité nos nouveautés et profiter d'offres spéciales.
                      </p>
                    </div>
              </div>  
            </a>
          </>
        )}
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
