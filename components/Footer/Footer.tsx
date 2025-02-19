"use client";
import styles from "./Footer.module.scss";
import React from "react";
import { useRouter } from "next/navigation";
import { ReactShare } from "../ReactShare/ReactShare";
// import { ModalActionsContext } from "../../contexts/ModalContext";

const Footer: React.FC = () => {
  // const { openModal } = useContext(ModalActionsContext);
  const router = useRouter();

  const handleLegalModal = () => {
    router.push("/mentions-legales-chicmixt-live-facebook");  // 🔹 Redirige vers la page overlay
  };

  return (
    <footer className={`${styles.footer} text-center`}>
      <div>
        © 2025 Chic&#39;Mixt - Tous droits réservés 
        <button className="button-legal" onClick={handleLegalModal} style={{ paddingLeft: '10px' }}>
          - Mentions légales
        </button>
      </div>

      <ReactShare iconSize={30} />
    
      <div className="okiweb">
        Site créé avec &nbsp;<span role="img" aria-label="heart">❤️ Okiweb</span>&nbsp; 
        {/* <a href="https://www.okiweb.fr" target="_blank" rel="noopener">
          Okiweb.fr
        </a> */}
      </div>
    </footer>
  );
};

export default Footer;
