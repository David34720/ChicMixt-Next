import styles from './NewsletterSectionFront.module.scss'
import { useRef, useCallback, useContext } from 'react'
import Image from "next/image";

import { ModalActionsContext } from "../../contexts/ModalContext";

import { useSectionRefs } from '../../hooks/useSectionRefs';


import SubscriberForm from "./SubscriberForm";
import UnsubscribeModal from "./UnsubscribeModal";


export default function NewsletterSectionFront() {
  const { openModal, closeModal } = useContext(ModalActionsContext);
  const { desktopRefs, mobileRefs } = useSectionRefs();
  
  // Gestion de la modale
    const handleCloseModal = useCallback(() => {
      closeModal();
    }, [closeModal]);
  
    const handleUnsubscribeModal = () => {
      openModal(<UnsubscribeModal onClose={handleCloseModal} />);
    };

  return (
    <>
      <div className={styles.section7Left}>
        <Image
          src="/images/boutique-live-chicmixt-vetement-herault-34-newsletter.png"
          alt="Meilleure boutique de mode en ligne"
          width={400}
          height={400}
          quality={80}
          onLoad={(e) => {
            if (e.target instanceof HTMLImageElement) {
              e.target.dataset.loaded = 'true';
            }
          }}
          loading="eager"
        />
      </div>
      <div className={styles.section7Right}>
        <SubscriberForm />
        <p
          style={{ cursor: "pointer", fontStyle: "italic", marginTop: "10px", opacity: "0.6" }}
          onClick={handleUnsubscribeModal}
        >
          Se désabonner de la newsletter
        </p>
      </div>
    </>
  );
}