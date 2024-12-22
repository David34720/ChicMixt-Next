import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

// Schéma de validation avec Yup
const schema = yup.object().shape({
  name: yup.string().required("Le nom est requis").min(2, "Nom trop court"),
  email: yup
    .string()
    .email("Adresse email invalide")
    .required("L'adresse email est requise")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "L'adresse email doit contenir un format valide (ex: exemple@domaine.fr)"
    ),
  phone: yup
    .string()
    .required("Le numéro de téléphone est requis")
    .matches(/^[0-9]{10}$/, "Le numéro doit contenir 10 chiffres"),
  subject: yup.string().optional(),
  message: yup
    .string()
    .required("Le message est requis")
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

export default function ContactModal() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [status, setStatus] = useState("");

  // Fonction d'envoi des données
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("Email envoyé avec succès !");
        reset(); // Réinitialiser le formulaire
      } else {
        setStatus("Erreur lors de l'envoi de l'email.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setStatus("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Contactez-nous</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Votre nom
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Votre adresse e-mail
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
            Votre N° téléphone
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
            Votre message
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={5}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.message ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: "#de277b" }}
          className="w-full text-white py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
      {status && (
        <div className={`mt-4 text-center ${status.includes("succès") ? "text-green-500" : "text-red-500"}`}>
          {status}
        </div>
      )}
      <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Suivez-nous sur Facebook</p>
          <a
            href="https://www.facebook.com/profile.php?id=61555657774462"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Page Facebook
          </a>
        </div>
    </div>
  );
}
