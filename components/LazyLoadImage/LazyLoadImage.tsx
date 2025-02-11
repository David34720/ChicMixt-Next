"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface LazyLoadImageProps {
  placeholderSrc: string;
  actualSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  delay?: number; // délai en ms avant de charger l'image lourde (ex: 2000 = 2 sec)
}

export default function LazyLoadImage({
  placeholderSrc,
  actualSrc,
  alt,
  width,
  height,
  className,
  delay,
}: LazyLoadImageProps) {
  const [src, setSrc] = useState(placeholderSrc);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrc(actualSrc);
    }, delay);

    return () => clearTimeout(timer);
  }, [actualSrc, delay]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      // N'utilisez pas "priority" pour les images lourdes afin de ne pas forcer leur préchargement
    />
  );
}
