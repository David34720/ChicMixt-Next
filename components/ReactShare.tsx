//https://github.com/nygardk/react-share#readme
"use client"
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

    <div className="Demo__container">

      {/* Bouton personnalisé pour copier le lien */}
      <div className="network enter-animation">
        <button onClick={handleCopy} aria-label="Copier le lien de cette page" className="network__share-button" style={{ color: 'deeppink', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <FaCopy size={iconSize} />
        </button>
        {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Lien copié!</span>}
      </div>

      {/* <div className="network enter-animation">
        <FacebookShareButton url={shareUrl} className="network__share-button">
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
      </div> */}


      <div className="network enter-animation">
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="network__share-button"
        >
          <XIcon size={iconSize} round />
        </TwitterShareButton>
      </div>

      <div className="network enter-animation">
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="network__share-button"
        >
          <TelegramIcon size={iconSize} round />
        </TelegramShareButton>
      </div>

      <div className="network enter-animation">
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="network__share-button"
        >
          <WhatsappIcon size={iconSize} round />
        </WhatsappShareButton>
      </div>

      <div className="network enter-animation">
        <LinkedinShareButton url={shareUrl} className="network__share-button">
          <LinkedinIcon size={iconSize} round />
        </LinkedinShareButton>
      </div>

      <div className="network enter-animation">
        <PinterestShareButton
          url={shareUrl}
          media={`${exampleImage}`}
          className="network__share-button"
        >
          <PinterestIcon size={iconSize} round />
        </PinterestShareButton>
      </div>


      <div className="network enter-animation">
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="network__share-button"
        >
          <RedditIcon size={iconSize} round />
        </RedditShareButton>
      </div>

      <div className="network enter-animation">
        <TumblrShareButton
          url={shareUrl}
          title={title}
          className="network__share-button"
        >
          <TumblrIcon size={iconSize} round />
        </TumblrShareButton>

      </div>

      <div className="network enter-animation">
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body={title}
          className="network__share-button"
        >
          <EmailIcon size={iconSize} round />
        </EmailShareButton>
      </div>
    </div>
  );
}
