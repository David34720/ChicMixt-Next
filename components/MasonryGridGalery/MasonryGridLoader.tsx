import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const MasonryGridGalery = dynamic(() => import("./MasonryGridGalery"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ),
});

const MasonryGridLoader = () => {
  const [key, setKey] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const loadedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Callback quand une image a été uploadée
   */
  const handleImageUploaded = useCallback(() => {
    // On va juste forcer un petit refresh
    setKey((prev) => prev + 1);
  }, []);

  /**
   * Intersection observer : charger la galerie seulement
   * si elle est visible à l’écran, pour lazy-loading
   */
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || loadedRef.current) return;
    const targetElement = document.querySelector(".slider-container");
    if (!targetElement) {
      console.warn("⚠️ .slider-container non trouvé !");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadedRef.current) {
          console.log("🔄 Chargement de la galerie déclenché par .slider-container !");
          loadedRef.current = true;
          setShouldLoad(true);
          observer.disconnect(); // Stopper l'observation après activation
        }
      },
      {
        root: null, // Observer par rapport au viewport
        rootMargin: "200px", // Déclenche 200px avant que `.slider-container` ne soit visible
        threshold: 0.2, // Déclenche lorsque 20% de `.slider-container` est visible
      }
    );

    observer.observe(targetElement);


    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, []);
  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined" || loadedRef.current) {
      console.warn("⚠️ container masonry non trouvé !");
      return;
    }

    const observer2 = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // On charge la galerie qu’une fois
          setIsVisible(true);
          observer2.disconnect();
          console.log("trigger image")
        }
      },
      { threshold: 0.1, rootMargin: "-150px" }
    );

    observer2.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer2.unobserve(containerRef.current);
      }
    };
  }, []);

  if (hasError) {
    // En cas d’erreur, on peut décider d’afficher la galerie directement
    return <MasonryGridGalery onImageUploaded={handleImageUploaded} isVisible />;
  }

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad && (
        // <div className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className={` duration-500 `}>
          <MasonryGridGalery key={key} onImageUploaded={handleImageUploaded} isVisible/>
        </div>
      )}
    </div>
  );
};

export default MasonryGridLoader;
