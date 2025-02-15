"use client";
import { useState, useContext } from "react";
import { useSession, signIn } from "next-auth/react";
import { ModalActionsContext } from "../../contexts/ModalContext";

interface User {
  role?: string;
}

interface UploadFormProps {
  refreshImages: () => void;
}

export default function UploadForm({ refreshImages }: UploadFormProps) {
  const { closeModal } = useContext(ModalActionsContext);
  const { data: session } = useSession();

  const user = session?.user as User | undefined;

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("0");
  const [reference, setReference] = useState("");
  const [promotion, setPromotion] = useState<boolean>(false);
  const [nouveaute, setNouveaute] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState("");

  if (!session) {
    return (
      <div>
        <p>Vous devez être connecté pour uploader des images.</p>
        <button onClick={() => signIn()}>Se connecter</button>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return <p>Vous n'avez pas les permissions pour uploader des images.</p>;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      setUploadStatus("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("reference", reference);
    formData.append("promotion", String(promotion));
    formData.append("nouveaute", String(nouveaute));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("📡 Réponse reçue :", response.status);

      if (response.ok) {
        const result = await response.json();
        closeModal();
        refreshImages();
        setUploadStatus("Image uploadée avec succès !");
        console.log("Résultat :", result);
      } else {
        setUploadStatus("Erreur lors de l'upload.");
        console.error("❌ Erreur API :", response.status);
      }
    } catch (error) {
      console.error("Erreur :", error);
      setUploadStatus("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full"
          ></textarea>
        </div>

        <div>
          <label htmlFor="price">Prix :</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="reference">Référence :</label>
          <input
            id="reference"
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="promotion"
            type="checkbox"
            checked={promotion}
            onChange={(e) => setPromotion(e.target.checked)}
            className="border rounded p-2"
          />
          <label htmlFor="promotion">En promotion</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="nouveaute"
            type="checkbox"
            checked={nouveaute}
            onChange={(e) => setNouveaute(e.target.checked)}
            className="border rounded p-2"
          />
          <label htmlFor="nouveaute">Nouveauté</label>
        </div>

        <div>
          <label htmlFor="image">Image :</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>

      {uploadStatus && (
        <div className="mt-4 text-center text-red-500">{uploadStatus}</div>
      )}
    </div>
  );
}
