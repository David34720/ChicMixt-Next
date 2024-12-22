"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schéma de validation avec Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Adresse email invalide") // Validation par défaut
    .required("L'adresse email est requise")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "L'adresse email doit contenir un format valide (ex: exemple@domaine.fr)"
    ),
});

// Types pour les données du formulaire
type FormData = yup.InferType<typeof schema>;

export default function SubscriberForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [status, setStatus] = useState("");

  // Fonction d'envoi des données
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("Abonnement enregistré avec succès !");
        reset(); // Réinitialiser le formulaire
      } else {
        setStatus("Erreur lors de l'abonnement.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setStatus("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg news-form-M">
      <h2 className="text-2xl text-center font-bold mb-4 text-gray-800 enter-animation">
        Devenez VIP ! <br />Abonnez-vous à notre newsletter
      </h2>
      <p className="text-gray-700 font-medium mb-1 enter-animation">
        Soyez informé des nouveautés et des offres exclusives
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 enter-animation"
        noValidate
      >
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Votre adresse e-mail :
          </label>
          <input
            type="email"
            placeholder="exemple@domaine.fr"
            id="email"
            {...register("email")}
            aria-describedby="emailHelp" // Lier l'aide au champ
            aria-invalid={!!errors.email} // Indiquer si le champ est invalide
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.email ? (
            <p
              id="emailHelp" // Lier le message d'erreur au champ
              className="text-red-500 text-sm mt-1"
            >
              {errors.email.message}
            </p>
          ) : (
            <p id="emailHelp" className="text-gray-500 text-sm mt-1"></p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: "#de277b" }}
          className="w-full text-white py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
      {status && (
        <div
          className={`mt-4 text-center ${
            status.includes("succès") ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </div>
      )}
      <div className="mt-6 text-center">
        <a
          href="https://www.facebook.com/profile.php?id=61555657774462"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 enter-animation"
        >
          Suivez-nous sur Facebook
        </a>
      </div>
    </div>
  );
}
