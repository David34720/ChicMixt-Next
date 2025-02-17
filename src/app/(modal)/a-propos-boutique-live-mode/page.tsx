"use client";

import React from "react";
import AproposModal from "@components/AProposModal/AproposModal";
import { NextSeo } from "next-seo";
import { useRouter } from "next/navigation";

export default function AproposBoutiqueLiveMode() {
  const router = useRouter();

  return (
    <>
      {/* ✅ SEO optimisé */}
      <NextSeo
        title="À propos de Chic'Mixt – Boutique Live Mode"
        description="Découvrez Chic'Mixt, votre boutique de mode en live, animée par Fanny. Collections femmes, hommes et enfants, lives hebdomadaires et bonne humeur !"
        canonical="https://chicmixt.fr/a-propos-boutique-live-mode"
        openGraph={{
          url: "https://chicmixt.fr/a-propos-boutique-live-mode",
          title: "À propos de Chic'Mixt",
          description: "Chic'Mixt est une boutique de mode en live, animée par Fanny. Découvrez nos collections tendances et nos moments conviviaux chaque semaine.",
          images: [
            {
              url: "https://chicmixt.fr/images/hook2/hook2-1.png",
              width: 1200,
              height: 630,
              alt: "Chic'Mixt | Boutique de mode en Live",
            },
          ],
          siteName: "Chic'Mixt",
        }}
      />

      {/* ✅ Modale avec bouton de fermeture */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg">
          <button
            onClick={() => router.back()}  // 🔹 Ferme la modale
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          >
            ✖
          </button>
          <AproposModal />
        </div>
      </div>
    </>
  );
}
