import prisma from '../../prisma/client';
import sanitizeHtml from "sanitize-html"; // Importation pour nettoyer les données
import type { NextApiRequest, NextApiResponse } from 'next';


type Data = {
  message?: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  let { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Adresse e-mail manquante." });
  }

  // Nettoyage de l'entrée utilisateur
  email = sanitizeHtml(email);

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return res.status(404).json({ error: "Adresse e-mail introuvable." });
    }

    await prisma.subscriber.update({
      where: { email },
      data: { subscribed: false },
    });

    res.status(200).json({ message: "Désabonnement réussi." });

    // Facultatif : envoyer un e-mail de confirmation
  } catch (error) {
    console.error("Erreur de désabonnement :", error);
    res.status(500).json({ error: "Erreur lors du désabonnement." });
  }
}
