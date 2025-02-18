// chicmixt/src/app/(modal)/layout.tsx

"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ferme la modale si le clic est sur le fond (et non sur le contenu)
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 p-4 mb-10"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[70vh] mt-20 mb-24 overflow-y-auto">
        <button
          onClick={() => router.back()}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          ✖
        </button>
        <a onClick={() => router.back()} className="hover:underline text-center text-gray-700 mb-" >
              ← Retour à la page d'accueil
          </a>
        {children}
      </div>
    </div>
  );
}
