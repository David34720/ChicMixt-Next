"use client"; 

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query; // Récupère l'erreur passée dans l'URL

  useEffect(() => {
    console.error("Error during authentication:", error); // Log l'erreur pour le debugging
  }, [error]);

  return (
    <div>
      <h1>Erreur de connexion</h1>
      <p>Une erreur est survenue : {error}</p>
    </div>
  );
}
