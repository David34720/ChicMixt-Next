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
  const [key, setKey] = useState(0); // 🟢 Ajout d'une clé unique pour forcer le re-render

  useEffect(() => {
    setIsClient(true);

    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent;
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(ua);
      setIsSafari(isSafariBrowser);
    }

    // 🟢 Vérifier si le SDK Facebook est chargé et reparser
    if (typeof window !== "undefined" && window.FB && !isSafari) {
      window.FB.XFBML.parse();
    }
  }, []);

  // 🟢 Déclencher un re-render lorsque `videoUrl` change
  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Change la clé pour forcer le re-render

    // 🟢 Forcer le re-parsing du widget Facebook après une courte attente
    setTimeout(() => {
      if (typeof window !== "undefined" && window.FB) {
        window.FB.XFBML.parse();
      }
    }, 500);
  }, [videoUrl]);

  if (!isClient) {
    return (
      <div
        style={{
          width: "100%",
          height: "80%",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Chargement...
      </div>
    );
  }

  return (
    <>
      {!isSafari ? (
        <div
          key={key} // 🟢 Change la clé pour forcer le re-render quand `videoUrl` change
          className="fb-video"
          data-href={videoUrl}
          data-allowfullscreen="true"
          style={{
            width: "100%",
            height: "80%",
            border: "none",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        ></div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "80%",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <img
            src={fallbackImageUrl}
            alt="Image de remplacement si la vidéo ne fonctionne pas"
            style={{
              width: "100%",
              height: "80%",
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
