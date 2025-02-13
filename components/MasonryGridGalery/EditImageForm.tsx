"use client";
import React, { FormEvent, useState } from "react";
import { useSession, signIn } from "next-auth/react";

interface EditImageFormProps {
  image: {
    id: number;
    url: string;
    title: string;
    description: string;
    price: string;
    reference: string;
    promotion: boolean;
    nouveaute: boolean;
  };
  onSuccess: () => void; // callback pour rafraîchir la liste ou fermer la modale
}

export default function EditImageForm({ image, onSuccess }: EditImageFormProps) {
  const { data: session } = useSession();
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [price, setPrice] = useState(String(image.price));
  const [reference, setReference] = useState(image.reference);
  const [promotion, setPromotion] = useState(image.promotion);
  const [nouveaute, setNouveaute] = useState(image.nouveaute);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    try {
      const response = await fetch("/api/images", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: image.id,
          title,
          description,
          price,
          reference,
          promotion,
          nouveaute,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la mise à jour.");
      }
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

        <div>
          <label htmlFor="price" className="block font-medium">Prix</label>
          <input
            id="price"
            name="price"
            type="number"
            className="border border-gray-300 rounded w-full px-2 py-1"
            value={price}
            onChange={(e) => setPrice(String(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="reference" className="block font-medium">Référence</label>
          <input
            id="reference"
            name="reference"
            type="text"
            className="border border-gray-300 rounded w-full px-2 py-1"
            value={reference}
            onChange={(e) => setReference((e.target.value))}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="promotion"
            type="checkbox"
            checked={promotion}
            onChange={(e) => setPromotion(e.target.checked)}
            className="border border-gray-300 rounded"
          />
          <label htmlFor="promotion">En promotion</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="nouveaute"
            type="checkbox"
            checked={nouveaute}
            onChange={(e) => setNouveaute(e.target.checked)}
            className="border border-gray-300 rounded"
          />
          <label htmlFor="nouveaute">Nouveauté</label>
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
