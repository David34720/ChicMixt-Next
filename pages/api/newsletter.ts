import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import sanitizeHtml from "sanitize-html";
import  {PrismaClient}  from "@prisma/client";

// Initialiser Prisma
const prisma = new PrismaClient();

// Schéma de validation avec Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Adresse email invalide")
    .required("L'adresse email est requise"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  try {
    // Validation des données reçues
    const validatedData = await schema.validate(req.body);
    const { email } = validatedData;

    // Sanitize inputs
    const sanitizedEmail = sanitizeHtml(email);

    // Vérifier si l'utilisateur est déjà abonné
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: sanitizedEmail },
    });

    if (existingSubscriber) {
      return res.status(200).json({ message: "Vous êtes déjà abonné à la newsletter." });
    }

    // Ajouter l'utilisateur dans la base de données
    await prisma.subscriber.create({
      data: { email: sanitizedEmail },
    });

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
      subject: `Nouvel abonnement à la newsletter sur Chic'mixt.fr de ${sanitizedEmail}`,
      html: `
        <div>
          <h2>Nouvel abonnement à la newsletter</h2>
          <p><strong>Email :</strong> ${sanitizedEmail}</p>
        </div>
      `,
    };

    // Email de confirmation à l'utilisateur
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: sanitizedEmail, // Adresse email du client
      subject: "Confirmation de votre abonnement à la newsletter de Chic'mixt",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; color: #333; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #de277b; text-align: center; font-size: 24px;">Bonjour,</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Merci pour votre abonnement à notre newsletter !
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Pour vous désabonner, <a href="${process.env.NEXTAUTH_URL}?showUnsubscribeModal=true">cliquez ici</a>.
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

    res.status(200).json({ message: "Abonnement enregistré avec succès !" });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
}
