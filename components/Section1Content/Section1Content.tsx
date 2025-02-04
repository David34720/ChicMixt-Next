import styles from './Section1Content.module.scss'
import { useRef } from 'react'

interface Section1ContentProps {
  handleSectionClickPlus: () => void
}

const Section1Content = ({ handleSectionClickPlus }: Section1ContentProps) => {
  const section1Content = useRef<HTMLDivElement | null>(null);
  console.log('styles', styles);


  return (  
    <>
      <div ref={section1Content} className={styles.section1Content}>
        <h1 className={styles.section1Title}>Shopping Live</h1>
        <p className={styles.section1Description}>
          Tendance & Offres Exclusives !
        </p>
        <button
          onClick={handleSectionClickPlus}
          aria-label="Aller à la section suivante, découvrir Chic'mixt"
          className={styles.button}
        >
          Découvrir
        </button>
      </div>
    </>
  )
}

export default Section1Content;
