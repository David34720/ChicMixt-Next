import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Importation dynamique avec le bon chemin selon votre configuration
const MasonryGridGalery = dynamic(
  () => import('@components/MasonryGridGalery/MasonryGridGalery').catch(err => {
    console.error('Error loading MasonryGridGalery:', err);
    return () => <div>Error loading gallery</div>;
  }),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }
);

const MasonryGridLoader = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const loadedRef = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadedRef.current) {
          loadedRef.current = true;
          
          try {
            const timer = setTimeout(() => {
              setShouldLoad(true);
              setIsVisible(true);
            }, 100);

            observer.disconnect();
            return () => clearTimeout(timer);
          } catch (error) {
            console.error('Error in intersection observer:', error);
            setHasError(true);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    try {
      observer.observe(containerRef.current);
    } catch (error) {
      console.error('Error observing container:', error);
      setHasError(true);
    }
 
    return () => {
      try {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      } catch (error) {
        console.error('Error cleaning up observer:', error);
      }
    };
  }, []); 

  if (hasError) {
    return (
      <div className="w-full py-4 text-center text-gray-600">
        Unable to load gallery content
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad && (
        <div 
          className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          onError={(e) => {
            console.error('Error in MasonryGridGalery:', e);
            setHasError(true);
          }}
        >
          <MasonryGridGalery />
        </div>
      )}
    </div>
  );
};

export default MasonryGridLoader;