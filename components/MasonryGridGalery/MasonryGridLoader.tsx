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

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadedRef.current) {
          // On charge la galerie qu’une fois
          loadedRef.current = true;
          setShouldLoad(true);
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  if (hasError) {
    // En cas d’erreur, on peut décider d’afficher la galerie directement
    return <MasonryGridGalery onImageUploaded={handleImageUploaded} />;
  }

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad && (
        <div className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <MasonryGridGalery key={key} onImageUploaded={handleImageUploaded} />
        </div>
      )}
    </div>
  );
};

export default MasonryGridLoader;
