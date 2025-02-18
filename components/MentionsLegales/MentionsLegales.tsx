"use client";
import React from "react";
import Link from "next/link";

export default function MentionsLegales() {
  return (
    <>
      <section className="px-6 py-8 max-w-4xl mx-auto text-gray-800">
          <h1 className="text-3xl font-bold mb-6">Mentions Légales & Politique de Confidentialité</h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
            <p><strong>Nom :</strong> Chic&#39;Mixt</p>
            <p><strong>Raison sociale :</strong> CAMPLONG Stéphanie</p>
            <p><strong>Adresse du siège social :</strong> 6 Avenue du Stade, 34140 Mèze</p>
            <p><strong>Forme juridique :</strong> EI </p>
            <p><strong>Numéro RCS / SIRET :</strong> 98438883500014</p>
            <p><strong>Contact :</strong> <Link href="/contact-chicmixt-herault-mode-tendance">Formulaire de contact</Link></p>
            <p><strong>Directeur de la publication :</strong> CAMPLONG Stéphanie</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Conception du site</h2>
            <p><strong>Conception :</strong> <a href="https://www.okiweb.fr" target="_blank" rel="noopener noreferrer">Okiweb</a></p>
          </div>
          

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Hébergeur</h2>
            <p><strong>Dénomination :</strong> OVH</p>
            <p><strong>Adresse :</strong> 2 rue Kellermann - 59100 Roubaix - France</p>
            <p><strong>Site web :</strong> https://www.ovhcloud.com/fr/</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Propriété Intellectuelle</h2>
            <p>
              Les contenus présents sur ce site (textes, images, vidéos, logos, graphiques, etc.) 
              sont, sauf mention contraire, la propriété exclusive de Chic&#39;Mixt. 
              Toute reproduction, distribution ou modification, sans autorisation écrite préalable, est interdite.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Responsabilité</h2>
            <p>
              Les informations fournies sur ce site sont à titre indicatif. Chic&#39;Mixt
              s’efforce de les maintenir à jour, mais ne saurait être tenue responsable des 
              omissions ou inexactitudes. L’utilisation des informations se fait sous la seule 
              responsabilité de l’utilisateur.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Protection des Données Personnelles (RGPD)</h2>
            <p className="mb-4">
              Aucune autre donnée personnelle n’est collectée à des fins de marketing ou de profilage des visiteurs. 
              Seul un cookie interne (JWT - JSON Web Token) est utilisé afin de permettre à 
              l’administrateur du site de gérer le contenu. Ce cookie est strictement nécessaire 
              au fonctionnement interne et n’est pas utilisé pour analyser le comportement des visiteurs 
              ou pour fournir des contenus personnalisés.
            </p>
            <p className="mb-4">
              Le traitement des données d’authentification de l’administrateur repose sur l’intérêt légitime 
              de Chic&#39;Mixt à sécuriser le site (Article 6(1)(f) du RGPD). Aucune autre 
              donnée personnelle n’est traitée sans votre consentement explicite.
            </p>
            <p className="mb-4">
              Vous disposez, le cas échéant, d’un droit d’accès, de rectification, d’effacement, 
              de limitation, d’opposition et de portabilité de vos données. Pour exercer ces droits, 
              contactez-nous à l’adresse suivante : contact@chicmixt.fr.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une 
              réclamation auprès de l’autorité de contrôle (ex. CNIL en France : <a href="https://www.cnil.fr" className="text-blue-600 underline">www.cnil.fr</a>).
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p>
              Le site n’utilise qu’un cookie JWT destiné à l’authentification interne de l’administrateur. 
              Ce cookie ne suit pas votre navigation et n’est pas partagé avec des tiers. 
              Vous pouvez configurer votre navigateur pour le bloquer, mais certaines fonctionnalités 
              réservées à l’administration du site pourraient ne pas être disponibles.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Liens Externes</h2>
            <p>
              Le site peut contenir des liens vers des sites externes. 
              Chic&#39;Mixt n’exerce aucun contrôle sur ces sites tiers et 
              décline toute responsabilité quant à leur contenu et à leurs politiques de confidentialité.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Modification des Mentions Légales</h2>
            <p>
              Nous nous réservons le droit de modifier à tout moment les présentes mentions légales. 
              Les modifications prendront effet dès leur publication sur le site.
            </p>
          </div>

          <p className="text-sm text-gray-500">Dernière mise à jour : 18-02-2025</p>
        </section>
    </>
  );
}