"use client";
import React, { useEffect, useState } from "react";

interface FacebookLiveVideoProps {
  videoUrl: string; // URL de la vidéo Facebook
  fallbackImageUrl?: string; // URL de l'image de fallback
}

declare global {
  interface Window {
    FB: any;
  }
}

export default function FacebookLiveVideo({
  videoUrl,
  fallbackImageUrl = "/images/hook2/hook2-1.png",
}: FacebookLiveVideoProps) {
  const [isSafari, setIsSafari] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Le composant est monté côté client
    setIsClient(true);

    // Détecter Safari au montage client
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent;
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(ua);
      setIsSafari(isSafariBrowser);
    }

    // Initialiser le plugin Facebook si présent et pas Safari
    if (typeof window !== "undefined" && window.FB && !isSafari) {
      window.FB.XFBML.parse();
    }
  }, [isSafari]);
  useEffect(() => {
    window.FB.XFBML.parse();
  }, [isClient]);

  // Avant que isClient soit true, on retourne un placeholder pour avoir un rendu stable.
  if (!isClient) {
    return (
      <div
        style={{
          width: "100%",
          height: "90%",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#f0f0f0"
        }}
      >
        Chargement...
      </div>
    );
  }

  // Côté client, on peut désormais afficher la vidéo ou l'image selon le navigateur
  return (
    <>
      {!isSafari ? (
        <div
          className="fb-video"
          data-href={videoUrl}
          data-allowfullscreen="true"
          style={{
            width: "100%",
            height: "90%",
            border: "none",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        ></div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "90%",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <img
            src={fallbackImageUrl}
            alt="Image de remplacement si la vidéo ne fonctionne pas"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
              objectPosition: "top",
            
            }}
          />
        </div>
      )}
    </>
  );
}
