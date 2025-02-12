import styles from './Section1Content.module.scss'
import { useRef } from 'react'

interface Section1ContentProps {
  isMobile: boolean,
  handleSectionClickPlus: () => void
}

const Section1Content = ({ isMobile, handleSectionClickPlus }: Section1ContentProps) => {
  const section1Content = useRef<HTMLDivElement | null>(null);


  return (  
    <>
      <div ref={section1Content} className={styles.section1Content}>
        <h1 className={styles.section1Title}>Shopping Live</h1>
        <p className={styles.section1Description}>
          Tendance & Offres Exclusives !
        </p>
        {!isMobile && <button
          onClick={handleSectionClickPlus}
          aria-label="Aller à la section suivante, découvrir Chic'mixt"
          className={styles.button}
        >
          Découvrir
        </button> }
      </div>
      <div
          className="section1overlay"
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

export default Section1Content;
