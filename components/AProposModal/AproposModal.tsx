
import React from "react";

export default function AproposModal() {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
  
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Découvrez Chic&#39;Mixt votre boutique de mode en live
              créée par Fanny dans l&#39;Hérault (34)
        </h1>
        <p className="text-gray-700 mb-4 text-lg">
          Chic&#39;Mixt, c&#39;est plus qu&#39;une boutique en ligne. C&#39;est un univers dédié aux passionnés de mode, où chaque lundi soir à 20h30, nous vous proposons des ventes en live remplies de joie, de bonne humeur et des dernières tendances.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Notre mission :</strong> vous offrir des vêtements et accessoires de qualité à des prix imbattables, tout en rendant votre expérience d&#39;achat mémorable grâce à nos interactions en direct.
        </p>
        <div className="bg-pink-100 p-4 rounded-lg mb-4">
          <p className="text-pink-700 font-semibold text-lg">
            Chic&#39;Mixt, c&#39;est un mélange de passion, de mode et de moments partagés avec vous.
          </p>
        </div>
        <div className="text-gray-700 mb-4">
          <strong>Ce que nous proposons :</strong>
          <ul className="list-disc pl-6 mt-2">
            <li>Des collections pour femmes, hommes et enfants.</li>
            <li>Des accessoires uniques pour compléter votre style.</li>
            <li>Un moment de convivialité chaque semaine lors de nos lives Facebook.</li>
          </ul>
        </div>
        <p>
          Sur ce site, vous trouverez les derniers produits ajoutés,
          des conseils de mode, des actualités et des lives à venir.
        </p>
        <p>
          N&#39;hésitez pas à nous contacter si vous avez des questions ou
          des remarques.
        </p>
        <div className="text-center">
          <a href="https://www.facebook.com/profile.php?id=61555657774462" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-pink-500 text-white py-2 px-4 rounded-lg shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition">
            Rejoignez nos lives
          </a>
        </div>
      </div>
    </>
    
  );
}
