import styles from './Section3Content.module.scss';
import { useSectionRefs } from "../../hooks/useSectionRefs";
import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";
import { FcCalendar } from "react-icons/fc";



interface Section3ContentProps {
  
}

const Section3Content = ({  }: Section3ContentProps) => {
   
  const { desktopRefs } = useSectionRefs();

  useScrollEnterAnimation(".section3Animation", {
    duration: 0.8,
    y: 50,
    start: "top 80%",
    end: "top 10%",
    ease: "power2.out",
    stagger: 0.2,
    markers: false
  })
  return (  
    <>
      <div ref={desktopRefs.section3Title1} className={styles.section3Left}>
          <div className={`${styles.infoCard}`}>
            <h2 className={`${styles.section3Title} section3Animation`}>
              Tous les lundis soirs 
            </h2>
            <p className={`${styles.section3Text} section3Animation`}>
              <br />
              Venez vous détendre et découvrez notre sélection mode à tout petit prix !
            </p>
            <p className={`${styles.section3Text} section3Animation`}>
              Suivez-nous sur{" "}
              <a
                href="https://www.facebook.com/profile.php?id=61555657774462"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.textLink}
              >
                Facebook 
              </a>{" "}
              et activez les notifications pour ne rien manquer.
            </p>
            
          </div>
          <div className={`${styles.ctaArea} `}>
            <p className={`${styles.section3TextCta} section3Animation`}>Prochain Live : lundi 20h30 !</p>
            <a className={`${styles.calendarLink} section3Animation`} href="/calendrier.ics" download>
              <span className={`${styles.calendarIconWrapper} `}>
                <FcCalendar className={`${styles.calendarIcon} `} />
              </span>
              Ajouter à mon calendrier
            </a>
          </div>
        </div>
        <div
          className={`${styles.section3Right}`}
          style={{ backgroundImage: "url('/images/hook2/hook2-2.png')" }}
        ></div>
      {/* Overlay qui masque la section quand nécessaire */}
      <div
        className="section3-overlay"
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

export default Section3Content;
