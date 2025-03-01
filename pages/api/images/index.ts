// api/images/index.ts
import path from "path";
import { promises as fs } from "fs"; 
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
            select: {
              id: true,
              title: true,
              url: true,
              description: true,
              position: true,
              createdAt: true,
              reference: true,
              promotion: true,
              nouveaute: true,
              price: true, // <--- Assure-toi que ce champ est bien sélectionné
            },
            orderBy: { position: "desc" }, // Tri par position
          });
          const sanitizedImages = images.map((image) => ({
            ...image,
            price: image.price !== undefined && image.price !== null && image.price > 0 
              ? image.price.toString() 
              : "", 
          }));
          res.status(200).json(sanitizedImages);
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
          
          const { title, description, url, price, reference, promotion, nouveaute } = req.body;

          if (!title || !url) {
            return res.status(400).json({ error: 'Titre et URL obligatoires.' });
          }

          const newImage = await prisma.image.create({
            data: {
              title,
              description: description || "",
              url,
              price: price ? parseFloat(price) : 0,
              reference: reference || "",
              promotion: promotion === true || promotion === "false",
              nouveaute: nouveaute === true || nouveaute === "false",
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
         
          if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
            return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
          }

          // Récupérer l'id, le title, et la description depuis req.body
          const { id, title, description, price, reference, promotion, nouveaute } = req.body;
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

      case 'DELETE': 
        try {
          const session = await getSession({ req });
          if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
            return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
          }

          let imageToDelete;
          const { id } = req.query;

          if (id && !Array.isArray(id) && !isNaN(parseInt(id, 10))) {
            imageToDelete = await prisma.image.delete({
              where: { id: parseInt(id, 10) },
            });
          } else {
            const lastImage = await prisma.image.findFirst({
              orderBy: { id: "desc" },
            });
            if (!lastImage) {
              return res.status(404).json({ error: 'Aucune image trouvée à supprimer.' });
            }
            imageToDelete = await prisma.image.delete({
              where: { id: lastImage.id },
            });
            console.log(`La dernière image avec ID ${lastImage.id} a été supprimée.`);
          }

          // ICI on supprime physiquement le fichier
          const { url } = imageToDelete;
          if (url) {
            const absolutePath = path.join(process.cwd(), "public", url);
            try {
              await fs.unlink(absolutePath);
              console.log(`Fichier supprimé : ${absolutePath}`);
            } catch (err) {
              console.error(`Impossible de supprimer le fichier : ${absolutePath}`, err);
            }
          }

          // Puis on renvoie un statut vide ou un message de succès
          return res.status(204).end(); 
        } catch (error) {
          console.log(error);
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
