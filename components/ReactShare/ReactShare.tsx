//https://github.com/nygardk/react-share#readme
"use client"
import styles from './ReactShare.module.scss'
import React, { useState } from 'react';
import { FaCopy } from "react-icons/fa";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

const exampleImage = '/images/boutique-live-chicmixt-facebook-vente-vetement-fanny-herault-34.webp';

export interface ReactShareProps {
  iconSize: number;
}

export function ReactShare({iconSize}: ReactShareProps) {
  const shareUrl = 'https://www.facebook.com/profile.php?id=61555657774462';
  const title = 'La meilleure boutique de mode en live Facebook';

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Masquer le message après 2s
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (

    <div className={styles.RSContainer}>

      {/* Bouton personnalisé pour copier le lien */}
      <div className={styles.network}>
        <button onClick={handleCopy} aria-label="Copier le lien de cette page" className={styles.shareButton} style={{ color: 'deeppink', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <FaCopy size={iconSize} />
        </button>
        {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Lien copié!</span>}
      </div>

      {/* <div className="network enter-animation">
        <FacebookShareButton url={shareUrl} className={styles.shareButton}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
      </div> */}


      <div className={styles.network}>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className={styles.shareButton}
        >
          <XIcon size={iconSize} round />
        </TwitterShareButton>
      </div>

      <div className={styles.network}>
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className={styles.shareButton}
        >
          <TelegramIcon size={iconSize} round />
        </TelegramShareButton>
      </div>

      <div className={styles.network}>
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className={styles.shareButton}
        >
          <WhatsappIcon size={iconSize} round />
        </WhatsappShareButton>
      </div>

      <div className={styles.network}>
        <LinkedinShareButton url={shareUrl} className={styles.shareButton}>
          <LinkedinIcon size={iconSize} round />
        </LinkedinShareButton>
      </div>

      <div className={styles.network}>
        <PinterestShareButton
          url={shareUrl}
          media={`${exampleImage}`}
          className={styles.shareButton}
        >
          <PinterestIcon size={iconSize} round />
        </PinterestShareButton>
      </div>


      <div className={styles.network}>
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

      <div className={styles.network}>
        <TumblrShareButton
          url={shareUrl}
          title={title}
          className={styles.shareButton}
        >
          <TumblrIcon size={iconSize} round />
        </TumblrShareButton>

      </div>

      <div className={styles.network}>
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body={title}
          className={styles.shareButton}
        >
          <EmailIcon size={iconSize} round />
        </EmailShareButton>
      </div>
    </div>
  );
}
