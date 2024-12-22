"use client";

import React from "react";

interface FacebookLiveVideoProps {
  videoUrl?: string; // URL de la vidéo Facebook
  width?: number; // Largeur de la vidéo
  height?: number; // Hauteur de la vidéo
}

const FacebookLiveVideo: React.FC<FacebookLiveVideoProps> = ({
  
}) => {
  return (    
    <iframe
      src="https://www.facebook.com/plugins/video.php?height=476&href=https://www.facebook.com/61555657774462/videos/1112119453970907/&show_text=false&width=267&t=0"
      width="330" height="476"
      style={{
        border: 'none',
        overflow: 'hidden'
      }}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      allowFullScreen={false}
    ></iframe>
  );
};


export default FacebookLiveVideo;
