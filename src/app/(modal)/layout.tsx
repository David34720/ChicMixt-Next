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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
        <button
          onClick={() => router.back()}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
