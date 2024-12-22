"use client";

import React, { FormEvent, useState } from "react";
import { useSession, signIn } from "next-auth/react";

interface EditImageFormProps {
  image: {
    id: number;
    url: string;
    title: string;
    description: string;
  };
  onSuccess: () => void; // callback pour rafraîchir la liste, ou fermer la modale
}

export default function EditImageForm({ image, onSuccess }: EditImageFormProps) {
  const { data: session } = useSession();
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Vérifiez la session avant de permettre la soumission
  if (!session) {
    return (
      <div>
        <p>Vous devez être connecté pour modifier les images.</p>
        <button onClick={() => signIn()}>Se connecter</button>
      </div>
    );
  }

  const user = session.user as { role?: string };

  if (user?.role !== "admin") {
    return <p>Vous n'avez pas les permissions pour modifier les images.</p>;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("session", session);

    try {
      const response = await fetch("/api/images", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", // Ajout de ce header pour éviter les conflits
      },
        credentials: "include", // Assurez-vous que le cookie de session est envoyé
        body: JSON.stringify({
          id: image.id,
          title,
          description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la mise à jour.");
      }

      // Success => on peut éventuellement fermer la modale ou rafraîchir la liste
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      <img
        src={image.url}
        alt={`edit-image-${image.id}`}
        className="rounded mb-4"
        style={{ maxWidth: "200px", height: "auto" }}
      />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label htmlFor="title" className="block font-medium">Titre</label>
          <input
            id="title"
            name="title"
            className="border border-gray-300 rounded w-full px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            className="border border-gray-300 rounded w-full px-2 py-1"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
}
