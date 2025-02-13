import prisma from '../../../prisma/client';
import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        try {
          const images = await prisma.image.findMany({
            orderBy: { position: "desc" },
          });
          return res.status(200).json(images);
        } catch (error) {
          console.error("Erreur lors de la récupération des images :", error);
          return res.status(500).json({ error: "Erreur lors de la récupération des images." });
        }
      }

      case 'POST': {
        try {
          const session = await getServerSession(req, res, authOptions);
          if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
            return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
          }

          const { title, description, url, price, reference, promotion, nouveaute } = req.body;

          if (!title || !url) {
            return res.status(400).json({ error: "Titre et URL obligatoires." });
          }

          const newImage = await prisma.image.create({
            data: {
              title,
              description: description || "",
              url,
              price: price ? parseFloat(price) : 0,
              reference: reference || "",
              promotion: promotion === true || promotion === "true",
              nouveaute: nouveaute === true || nouveaute === "true",
            },
          });

          return res.status(201).json(newImage);
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'image :", error);
          return res.status(500).json({ error: "Erreur lors de l'ajout de l'image." });
        }
      }

      case 'PUT': {
        try {
          const session = await getServerSession(req, res, authOptions);
          console.log("session", session);
          if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
            return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
          }

          const { id, title, description, price, reference, promotion, nouveaute } = req.body;

          if (!id || !title) {
            return res.status(400).json({ error: "ID et Titre obligatoires pour la mise à jour." });
          }

          const numericId = parseInt(id, 10);
          if (isNaN(numericId)) {
            return res.status(400).json({ error: "ID invalide" });
          }

          const updatedImage = await prisma.image.update({
            where: { id: numericId },
            data: {
              title,
              description: description || "",
              price: price ? parseFloat(price) : 0,
              reference: reference || "",
              promotion: promotion === true || promotion === "true",
              nouveaute: nouveaute === true || nouveaute === "true",
            },
          });

          return res.status(200).json(updatedImage);
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'image :", error);
          return res.status(500).json({ error: "Erreur lors de la mise à jour de l'image." });
        }
      }

      case 'DELETE': {
        try {
          const session = await getServerSession(req, res, authOptions);
          if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
            return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
          }

          const { id } = req.query;
          if (!id || Array.isArray(id) || isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: "ID valide obligatoire pour supprimer une image." });
          }

          await prisma.image.delete({
            where: { id: parseInt(id, 10) },
          });

          return res.status(204).end();
        } catch (error) {
          console.error("Erreur lors de la suppression de l'image :", error);
          return res.status(500).json({ error: "Erreur lors de la suppression de l'image." });
        }
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Méthode ${method} non autorisée`);
      }
    }
  } catch (error) {
    console.error("Erreur globale :", error);
    return res.status(500).json({ error: "Erreur serveur." });
  }
}
