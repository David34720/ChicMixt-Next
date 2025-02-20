"use client"
import React from 'react';
import { FacebookEmbed, InstagramEmbed } from 'react-social-media-embed';

interface SocialMediaEmbedProps {
  network: 'facebook' | 'instagram'; // Ajouter d'autres réseaux si besoin
  url: string;
  width?: number;
  height?: number;
}

const SocialMediaEmbed: React.FC<SocialMediaEmbedProps> = ({ network, url, width, height }) => {
  switch (network) {
    case 'facebook':
      return (
        <div className="social-media-embed">
          <FacebookEmbed url={url}  />
        </div>
      );
    case 'instagram':
      return (
        <div className="social-media-embed">
          <InstagramEmbed url={url} width={500} height={280} />
        </div>
      );
    default:
      return <div>Réseau social non supporté</div>;
  }
};

export default SocialMediaEmbed;