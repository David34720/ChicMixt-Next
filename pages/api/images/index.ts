// api/images/index.ts
import prisma from '../../../prisma/client';
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': // Récupérer toutes les images
        try {
          const images = await prisma.image.findMany({
            orderBy: { position: "asc" }, // Tri par position
          });
          res.status(200).json(images);
        } catch (error) {
          if (error instanceof Error) {
            console.error("Erreur lors de la récupération des images :", error.message);
            res.status(500).json({ error: 'Erreur lors de la récupération des images.' });
          } else {
            console.error("Erreur inconnue :", error);
            res.status(500).json({ error: 'Erreur inconnue.' });
          }
        }
        break;

      case 'POST': // Ajouter une nouvelle image
        try {
          const session = await getServerSession(req, res, authOptions);
          if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
            return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
          }

          const { title, description, url } = req.body;

          if (!title || !url) {
            return res.status(400).json({ error: 'Titre et URL obligatoires.' });
          }

          const newImage = await prisma.image.create({
            data: {
              title,
              description: description || "",
              url,
            },
          });

          res.status(201).json(newImage);
        } catch (error) {
          if (error instanceof Error) {
            console.error("Erreur lors de l'ajout de l'image :", error.message);
            res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'image.' });
          } else {
            console.error("Erreur inconnue :", error);
            res.status(500).json({ error: 'Erreur inconnue.' });
          }
        }
        break;

      case 'PUT': {
        // Nouveau handler PUT pour mettre à jour (title, description)
        try {
          const session = await getServerSession(req, res, authOptions);
          console.log("session", session);
          if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
            return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
          }

          // Récupérer l'id, le title, et la description depuis req.body
          const { id, title, description } = req.body;

          if (!id || !title) {
            return res.status(400).json({ error: "ID et Titre obligatoires pour la mise à jour." });
          }

          // Convertir l'id en number
          const numericId = parseInt(id, 10);
          if (isNaN(numericId)) {
            return res.status(400).json({ error: "ID invalide" });
          }

          // Mettre à jour l'image en base
          const updatedImage = await prisma.image.update({
            where: { id: numericId },
            data: {
              title,
              description: description || "",
            },
          });

          return res.status(200).json(updatedImage);
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'image :", error);
          return res.status(500).json({ error: "Erreur lors de la mise à jour de l'image." });
        }
      }

      case 'DELETE': // Supprimer une image
        try {
          const session = await getSession({ req });
          console.log("session", session);
          if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
            return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
          }

          // Récupérer l'ID à partir de req.query
          const { id } = req.query;

          if (!id || Array.isArray(id) || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: 'ID valide obligatoire pour supprimer une image.' });
          }

          await prisma.image.delete({
            where: { id: parseInt(id, 10) },
          });

          res.status(204).end(); // Pas de contenu, suppression réussie
        } catch (error) {
          if (error instanceof Error) {
            console.error("Erreur lors de la suppression de l'image :", error.message);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'image.' });
          } else {
            console.error("Erreur inconnue :", error);
            res.status(500).json({ error: 'Erreur inconnue.' });
          }
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Méthode ${method} non autorisée`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erreur globale :", error.message);
      res.status(500).json({ error: "Erreur serveur." });
    } else {
      console.error("Erreur inconnue :", error);
      res.status(500).json({ error: "Erreur inconnue." });
    }
  }
}
