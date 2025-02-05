import styles from './Section2Content.module.scss'
import { useRef } from 'react'
import Image from "next/image";

import { useSectionRefs } from "../../hooks/useSectionRefs";

import FacebookLiveVideo from "../../components/FacebookLiveVideo";
import { ReactShare } from "../../components/ReactShare";

interface Section2ContentProps {
  handleSectionClickPlus: () => void
}

const Section2Content = ({ handleSectionClickPlus }: Section2ContentProps) => {
  const section2Content = useRef<HTMLDivElement | null>(null);
  const { desktopRefs } = useSectionRefs();

  const facebookVideoUrl = "https://fb.watch/xgvTdqbHcb/";


  return (  
    <>
      <div className="left-col enter-animation">
          <div className="image-wrapper" ref={desktopRefs.imageRef1}>
            <FacebookLiveVideo videoUrl={facebookVideoUrl} />
          </div>
        </div>
        <div className="right-col">
          <a href="https://fb.watch/xgvTdqbHcb/" target="_blank" rel="noopener noreferrer">
            <div className="content-box enter-animation" ref={desktopRefs.contentBox}>
              <div className="logo-fb-container" ref={desktopRefs.imageRefFB}>
                <Image
                  className="logo-fb-img enter-animation"
                  src="/images/Facebook-logo-chicMixt.jpeg"
                  alt="Facebook Vêtements en ligne Live Chic'mixt"
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
              <h2 ref={desktopRefs.section2Title1} className="enter-animation">
                RETROUVEZ-NOUS EN LIVE SUR FACEBOOK
              </h2>
              <p className="enter-animation">
                Rejoignez-nous lors de nos lives shopping Facebook pour découvrir en exclusivité nos nouveautés et profiter d’offres spéciales.
              </p>
            </div>
          </a>
          <div className="share enter-animation">
            <span className="share-text enter-animation">
              Partagez à vos amis et profitez des bons plans Mode Chic'Mixt sur vos réseaux préférés !
            </span>
            <ReactShare iconSize={40} />
          </div>
        </div>
    </>
  )
}

export default Section2Content;
