// pages/api/comments.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      // Récupérer les commentaires depuis la base de données
      const comments = await prisma.comment.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.status(200).json(comments);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur :", error);
        if (error.name === "ValidationError") {
          res.status(400).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Erreur lors la récupération des commentaires." });
        }
      } else {
        console.error("Erreur inconnue :", error);
        res.status(500).json({ error: "Erreur inconnue." });
      }
    }
  } else if (method === 'POST') {
    try {
      const { commentorId, commentorName, message } = req.body;

      // Validation des champs reçus
      if (!commentorId || !commentorName || !message) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
      }

      // Créer un nouveau commentaire dans la base de données
      const newComment = await prisma.comment.create({
        data: {
          commentorId,
          commentorName,
          message,
          facebookId: "comment_id", // ID fictif pour l'instant
        },
      });

      res.status(201).json(newComment); // Retourner le nouveau commentaire
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur lors de l'ajout du commentaire :", error.message);
        res.status(500).json({ error: error.message });
      } else {
        console.error("Erreur inconnue :", error);
        res.status(500).json({ error: "Erreur inconnue." });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Méthode ${method} non autorisée`);
  }
}
