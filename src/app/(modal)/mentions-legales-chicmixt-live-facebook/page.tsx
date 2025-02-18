"use client";

import React from "react";
import MentionsLegales from "@components/MentionsLegales/MentionsLegales";
import { NextSeo } from "next-seo";
import { useRouter } from "next/navigation";

export default function MentionsLegalesModale() {
  const router = useRouter();

  return (
    <>
      {/* ✅ SEO optimisé */}
      <NextSeo
        title="Mentions légales de Chic'Mixt – Boutique Live Mode"
        description="Mentions légales de Chic'Mixt, vente sur Facebook mode et tendance"
        canonical="https://chicmixt.fr/mentions-legales-chicmixt-live-facebook"
        openGraph={{
          url: "https://chicmixt.fr/mentions-legales-chicmixt-live-facebook",
          title: "Mentions légales de Chic'Mixt",
          description: "Mentions légales de Chic'Mixt, vente sur Facebook mode et tendance",
          images: [
            {
              url: "https://chicmixt.fr/images/hook2/hook2-1.png",
              width: 1200,
              height: 630,
              alt: "Mentions légales Chic'Mixt | Boutique de mode en Live",
            },
          ],
          siteName: "Chic'Mixt",
        }}
      />

      {/* ✅ Modale avec bouton de fermeture */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 p-4 mb-10">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[70vh] mt-20 mb-24 overflow-y-auto">
          <button
            onClick={() => router.back()}  // 🔹 Ferme la modale
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          >
            ✖
          </button>
          <a onClick={() => router.back()} className="hover:underline text-center text-gray-700 mb-" >
              ← Retour à la page d'accueil
          </a>
          <MentionsLegales />
        </div>
      </div>
    </>
  );
}
