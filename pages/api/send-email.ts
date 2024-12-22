import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import sanitizeHtml from "sanitize-html";

// Schéma de validation avec Yup
const schema = yup.object().shape({
  name: yup.string().required("Le nom est requis").min(2, "Nom trop court"),
  email: yup
    .string()
    .email("Adresse email invalide")
    .required("L'adresse email est requise"),
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  try {
    // Validation des données reçues
    const validatedData = await schema.validate(req.body);

    const { name, email, phone, subject, message } = validatedData;

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeHtml(name),
      email: sanitizeHtml(email),
      phone: sanitizeHtml(phone),
      subject: sanitizeHtml(subject || ""),
      message: sanitizeHtml(message),
    };

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Adresse email
        pass: process.env.GMAIL_PASSWORD, // Mot de passe ou App Password
      },
    });

      // Email à l'administrateur
      const adminMailOptions = {
        from: process.env.GMAIL_USER,
        to: "david.falcioni34@gmail.com", // Adresse email de réception (admin)
        subject: `Nouveau message sur Chic'mixt.fr de ${sanitizedData.name} - ${sanitizedData.subject || "Sans sujet"}`,
        html: `
          <div>
            <h2>Nouveau message de ${sanitizedData.name}</h2>
            <p><strong>Email :</strong> ${sanitizedData.email}</p>
            <p><strong>Téléphone :</strong>${sanitizedData.phone}</p>
            <p><strong>Sujet :</strong> ${sanitizedData.subject || "Sans sujet"}</p>
            <p><strong>Message :</strong></p>
            <p>${sanitizedData.message}</p>
          </div>
        `,
      };

      // Email de confirmation à l'utilisateur
      const userMailOptions = {
        from: process.env.GMAIL_USER,
        to: email, // Adresse email du client
        subject: "Confirmation de votre message à Chic'mixt",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; color: #333; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #de277b; text-align: center; font-size: 24px;">Bonjour ${sanitizedData.name},</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Merci pour votre message ! Nous avons bien reçu votre demande :
            </p>
            <div style="background-color: #fff; border: 1px solid #eee; padding: 15px; margin: 20px 0; border-radius: 6px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
              <p style="margin: 0; font-size: 16px; font-weight: bold; color: #333;">Objet :</p>
              <p style="margin: 0 0 10px; font-size: 16px; color: #555;">${sanitizedData.subject || "Sans sujet"}</p>
              <p style="margin: 0; font-size: 16px; font-weight: bold; color: #333;">Message :</p>
              <p style="margin: 0; font-size: 16px; color: #555;">${sanitizedData.message}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555; margin-top: 20px; text-align: center;">
              À bientôt, <br>
              <h1 style="font-family: 'Aboreto', cursive; color: rgba(0, 0, 0, 0.8); font-size: 32px; text-align: center; position: relative; margin: 0 0 20px;">
              CHIC'MIXT
              <span style="display: block; font-size: 16px; font-style: italic; color: #de277b; margin-top: -20px;">BY Fanny</span>
            </h1>
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://www.facebook.com/profile.php?id=61555657774462" style="display: inline-block; text-decoration: none; background-color: #3b5998; color: #fff; padding: 10px 20px; font-size: 16px; border-radius: 5px;">
                Suivez-nous sur Facebook
              </a>
            </div>
          </div>

        `,
      };

      // Envoyer les deux emails en parallèle
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);

      res.status(200).json({ message: "Emails envoyés avec succès !" });
    } catch (error) {
      console.error("Erreur d'envoi d'email :", error);
      res.status(500).json({ error: "Erreur d'envoi d'email." });
    }
  
}
