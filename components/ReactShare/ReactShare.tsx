"use client";
import React, { useState } from "react";
import styles from "./ReactShare.module.scss";
import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";
import { FaCopy } from "react-icons/fa";

// Importation centralisée des boutons wrapper
import {
  TwitterShareButton,
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
  const shareUrl = "https://www.facebook.com/profile.php?id=61555657774462";
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
      <div className={`${styles.network} ${classAnimation}`}>
        <button
          onClick={handleCopy}
          aria-label="Copier le lien de cette page"
          className={styles.shareButton}
          style={{ color: "deeppink", border: "none", background: "transparent", cursor: "pointer" }}
        >
          <FaCopy size={iconSize} />
        </button>
        {copied && <span style={{ marginLeft: "10px", color: "green" }}>Lien copié!</span>}
      </div>

      {/* Twitter */}
      <div className={`${styles.network} ${classAnimation}`}>
        <TwitterShareButton url={shareUrl} title={title} className={styles.shareButton}>
          <XIcon size={iconSize} round />
        </TwitterShareButton>
      </div>

      {/* Telegram */}
      <div className={`${styles.network} ${classAnimation}`}>
        <TelegramShareButton url={shareUrl} title={title} className={styles.shareButton}>
          <TelegramIcon size={iconSize} round />
        </TelegramShareButton>
      </div>

      {/* Whatsapp */}
      <div className={`${styles.network} ${classAnimation}`}>
        <WhatsappShareButton url={shareUrl} title={title} separator=":: " className={styles.shareButton}>
          <WhatsappIcon size={iconSize} round />
        </WhatsappShareButton>
      </div>

      {/* Linkedin */}
      <div className={`${styles.network} ${classAnimation}`}>
        <LinkedinShareButton url={shareUrl} className={styles.shareButton}>
          <LinkedinIcon size={iconSize} round />
        </LinkedinShareButton>
      </div>

      {/* Pinterest */}
      <div className={`${styles.network} ${classAnimation}`}>
        <PinterestShareButton url={shareUrl} media={exampleImage} className={styles.shareButton}>
          <PinterestIcon size={iconSize} round />
        </PinterestShareButton>
      </div>

      {/* Reddit */}
      <div className={`${styles.network} ${classAnimation}`}>
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className={styles.shareButton}
        >
          <RedditIcon size={iconSize} round />
        </RedditShareButton>
      </div>

      {/* Tumblr */}
      <div className={`${styles.network} ${classAnimation}`}>
        <TumblrShareButton url={shareUrl} title={title} className={styles.shareButton}>
          <TumblrIcon size={iconSize} round />
        </TumblrShareButton>
      </div>

      {/* Email */}
      <div className={`${styles.network} ${classAnimation}`}>
        <EmailShareButton url={shareUrl} subject={title} body={title} className={styles.shareButton}>
          <EmailIcon size={iconSize} round />
        </EmailShareButton>
      </div>
    </div>
  );
}
