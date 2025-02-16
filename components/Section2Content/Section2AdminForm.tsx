"use client";

import React, { useState, useEffect } from "react";

interface Section2Data {
  videoUrl: string;
  liveDate: string; // format adapté pour datetime-local
}

const Section2AdminForm: React.FC = () => {
  const [data, setData] = useState<Section2Data>({ videoUrl: "", liveDate: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // 🟢 Récupérer les données de la DB au chargement
  useEffect(() => {
    const fetchSection2Data = async () => {
      try {
        const res = await fetch("/api/section2");
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const result = await res.json();

        // Convertir `liveDate` pour le champ `datetime-local`
        const liveDateLocal = new Date(result.liveDate).toISOString().slice(0, 16);
        setData({ videoUrl: result.videoUrl, liveDate: liveDateLocal });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSection2Data();
  }, []);

  // 🟢 Gérer la mise à jour des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // 🟢 Soumission du formulaire (mise à jour de la DB)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/section2", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: data.videoUrl,
          liveDate: new Date(data.liveDate).toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Message disparaît après 3 sec
       // 🟢 Recharger la vidéo en mettant à jour le state global
      window.dispatchEvent(new Event("section2Updated"));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">Erreur: {error}</div>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold mb-2">Modifier la vidéo Facebook</h3>

      <form onSubmit={handleSubmit}>
        {/* 🟢 Champ URL vidéo */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">URL de la vidéo Facebook :</label>
          <input
            type="text"
            name="videoUrl"
            value={data.videoUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 🟢 Champ date du live */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Date du live :</label>
          <input
            type="datetime-local"
            name="liveDate"
            value={data.liveDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 🟢 Boutons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={saving}
          >
            {saving ? "Enregistrement..." : "Sauvegarder"}
          </button>

          <button
            type="reset"
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => setData({ videoUrl: "", liveDate: "" })}
          >
            Annuler
          </button>
        </div>

        {/* 🟢 Message de confirmation */}
        {success && <p className="text-green-600 mt-2">Mise à jour réussie !</p>}
      </form>
    </div>
  );
};

export default Section2AdminForm;
