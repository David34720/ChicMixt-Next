"use client"; // Assurez-vous que le composant est client-side

import { useState } from "react";
import sanitizeHtml from "sanitize-html"; // Importation pour nettoyer les données

interface UnsubscribeModalProps {
  onClose: () => void;
}

export default function UnsubscribeModal({ onClose }: UnsubscribeModalProps) {
  const [notification, setNotification] = useState<string | null>(null);

  const handleUnsubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Nettoyage de l'email avant envoi
    const email = sanitizeHtml((e.target as HTMLFormElement).email.value);

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setNotification("Votre désabonnement a été confirmé.");
      } else {
        const { error } = await response.json();
        setNotification(error || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur de désabonnement :", error);
      setNotification("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="modal-content">
      <h2>Se désabonner</h2>
      <p>Veuillez entrer votre adresse e-mail pour confirmer votre désabonnement :</p>
      <form className="flex flex-row" onSubmit={handleUnsubscribe}>
        <input
          type="email"
          name="email"
          placeholder="Votre adresse e-mail"
          required
          className="border rounded px-3 h-10 focus:outline-none focus:ring-2 focus:ring-red-500 "
        />
        <button
          style={{ marginLeft: "20px" }}
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Confirmer le désabonnement
        </button>
      </form>
      {notification && (
        <p
          className={`mt-4 ${
            notification.includes("Erreur") ? "text-red-500" : "text-green-500"
          }`}
        >
          {notification}
        </p>
      )}
      <button
        onClick={onClose}
        className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Fermer
      </button>
    </div>
  );
}
