"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Définition du type du formulaire
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

// Schéma de validation Yup
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

export default function ContactForm() {
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
        setStatus("Email envoyé avec succès !");
        reset(); // réinitialise les champs
      } else {
        setStatus("Erreur lors de l'envoi de l'email.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setStatus("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <Box
      component="section"
      sx={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#fff",
      }}
    >
      {/* Court texte (avec mots-clés) au-dessus du formulaire */}
      <Typography variant="h5" align="center" gutterBottom>
        Contactez-nous pour vos <em>vêtements de mode en live</em> et vos <em>accessoires tendances</em>
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        Une question sur nos <strong>ventes en direct</strong> ? Sur nos <strong>collections</strong> ou
        <strong> promotions hebdomadaires</strong>? Remplissez ce formulaire et notre équipe vous
        répondra rapidement !
      </Typography>

      {/* Formulaire */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Nom */}
        <TextField
          fullWidth
          label="Votre nom"
          variant="outlined"
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name")}
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Votre email"
          type="email"
          variant="outlined"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        {/* Téléphone */}
        <TextField
          fullWidth
          label="Votre N° téléphone"
          type="tel"
          variant="outlined"
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          {...register("phone")}
        />

        {/* Sujet (optionnel) */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="subject-label">Sujet</InputLabel>
          <Select
            labelId="subject-label"
            label="Sujet"
            defaultValue=""
            {...register("subject")}
          >
            <MenuItem value="">(Choisir un sujet)</MenuItem>
            <MenuItem value="femme">
              Vêtements Femme en Live
            </MenuItem>
            <MenuItem value="homme">
              Vêtements Homme en Live
            </MenuItem>
            <MenuItem value="accessoires">
              Accessoires mode tendance
            </MenuItem>
            <MenuItem value="special">
              Autre demande
            </MenuItem>
          </Select>
        </FormControl>

        {/* Message */}
        <TextField
          fullWidth
          label="Votre message"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          error={!!errors.message}
          helperText={errors.message?.message}
          {...register("message")}
        />

        {/* Bouton d'envoi */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: "#de277b" }}
          className="w-full text-white py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </button>
        {/* <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </Button> */}
      </Box>

      {/* Message de statut (succès/erreur) */}
      {status && (
        <Alert
          severity={status.includes("succès") ? "success" : "error"}
          sx={{ mt: 3 }}
        >
          {status}
        </Alert>
      )}

      {/* Liens sociaux (exemple) */}
      <Box textAlign="center" marginTop={4}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Suivez-nous sur Facebook
        </Typography>
        <Button
          component="a"
          href="https://www.facebook.com/profile.php?id=61555657774462"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          sx={{ backgroundColor: "#1877F2", ":hover": { backgroundColor: "#166FE0" } }}
        >
          Page Facebook
        </Button>
      </Box>
    </Box>
  );
}
