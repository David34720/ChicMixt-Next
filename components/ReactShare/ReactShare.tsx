"use client";
import React, { useState } from "react";
import styles from "./ReactShare.module.scss";
import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";
import { FaCopy } from "react-icons/fa";

// Importation centralisée des boutons wrapper
import {
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  EmailShareButton,
} from "./WrappedShareButtons"; // ! remettre juste react-share à la 5.3

// Importation des icônes depuis react-share
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";

const exampleImage = "/images/boutique-live-chicmixt-facebook-vente-vetement-fanny-herault-34.webp";

export interface ReactShareProps {
  iconSize: number;
  classAnimation?: string;
  onceAnimation?: boolean;
}

export function ReactShare({ iconSize, classAnimation = "", onceAnimation }: ReactShareProps) {
  const shareUrl = "https://www.chicmixt.fr/";
  const title = "La meilleure boutique de mode en live Facebook";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy text: ", err));
  };

  if (classAnimation) {
    useScrollEnterAnimation(`.${classAnimation}`, {
      duration: 0.8,
      y: 50,
      start: "bottom 100%",
      end: "top 10%",
      ease: "power2.out",
      stagger: 0.2,
      markers: false,
    });
  }

  return (
    <div className={styles.RSContainer}>
      {/* Bouton personnalisé pour copier le lien */}
      {/* <div className={`${styles.network} ${classAnimation} ${styles.tooltip}`}>
        <button
          onClick={handleCopy}
          title={title}
          aria-label="Copier le lien de cette page"
          className={`${styles.shareButton}  `}
          style={{ color: "deeppink", border: "none", background: "transparent", cursor: "pointer" }}
        >
          <FaCopy size={iconSize} />
        </button>
        {copied && <span style={{ marginLeft: "10px", color: "green" }}>Lien copié!</span>}
        <span className={styles.tooltipText}>Copier le lien</span>
      </div> */}

      {/* Facebook */}
      <div className={`${styles.network} ${classAnimation}  ${styles.tooltip}`}>
        <FacebookShareButton url={shareUrl} title={title} className={styles.shareButton}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
        <span className={styles.tooltipText}>Partager sur Facebook</span>
      </div>

      {/* Twitter */}
      <div className={`${styles.network} ${classAnimation} ${styles.tooltip}`}>
        <TwitterShareButton url={shareUrl} title={title} className={styles.shareButton}>
          <XIcon size={iconSize} round />
        </TwitterShareButton>
        <span className={styles.tooltipText}>Partager sur X</span>
      </div>

      {/* Telegram
      <div className={`${styles.network} ${classAnimation} ${styles.tooltip}`}>
        <TelegramShareButton url={shareUrl} title={title} className={styles.shareButton}>
          <TelegramIcon size={iconSize} round />
        </TelegramShareButton>
        <span className={styles.tooltipText}>Partager sur Telegram</span>
      </div> */}

      {/* Whatsapp */}
      <div className={`${styles.network} ${classAnimation} ${styles.tooltip}`}>
        <WhatsappShareButton url={shareUrl} title={title} separator=":: " className={styles.shareButton}>
          <WhatsappIcon size={iconSize} round />
        </WhatsappShareButton>
        <span className={styles.tooltipText}>Partager sur Whatsapp</span>
      </div>

      {/* Linkedin */}
      <div className={`${styles.network} ${classAnimation} ${styles.tooltip}`}>
        <LinkedinShareButton url={shareUrl} title={title} className={styles.shareButton}>
          <LinkedinIcon size={iconSize} round />
        </LinkedinShareButton>
        <span className={styles.tooltipText}>Partager sur Linkendin</span>
      </div>

      {/* Pinterest */}
      <div className={`${styles.network} ${classAnimation} ${styles.tooltip}`}>
        <PinterestShareButton url={shareUrl} title={title} media={exampleImage} className={styles.shareButton}>
          <PinterestIcon size={iconSize} round />
        </PinterestShareButton>
        <span className={styles.tooltipText}>Partager sur Pinterest</span>
      </div>

      {/* Reddit
      <div className={`${styles.network} ${classAnimation} ${styles.tooltip}`}>
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className={styles.shareButton}
        >
          <RedditIcon size={iconSize} round />
        </RedditShareButton>
        <span className={styles.tooltipText}>Partager sur Reddit</span>
      </div>

      {/* Tumblr */}
      {/* <div className={`${styles.network} ${classAnimation} ${styles.tooltip}`}>
        <TumblrShareButton url={shareUrl} title={title} className={styles.shareButton}>
          <TumblrIcon size={iconSize} round />
        </TumblrShareButton>
        <span className={styles.tooltipText}>Partager sur Tumblr</span>
      </div>  */}

      {/* Email
      <div className={`${styles.network} ${classAnimation}`}>
        <EmailShareButton url={shareUrl} subject={title} body={title} className={styles.shareButton}>
          <EmailIcon size={iconSize} round />
        </EmailShareButton>
      </div> */}
    </div>
  );
}
