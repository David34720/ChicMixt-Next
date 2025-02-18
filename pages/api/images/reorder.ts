import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  try {
    // Vérifier la session côté serveur
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== "admin") {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const { orderedIds } = req.body;
     const reversedOrderedIds = [...orderedIds].reverse() as (number | string)[];

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: "Le corps de la requête doit contenir un tableau 'orderedIds'." });
    }

    // Mises à jour transactionnelles
    const updates = reversedOrderedIds.map((id, index) => {
      const numericId = parseInt(id as string, 10); // Assurez-vous que l'id est un entier
      if (isNaN(numericId)) {
        throw new Error(`L'ID ${id} est invalide`);
      }
      console.log(`ID: ${numericId}, Nouvelle position: ${index}`);
      return prisma.image.update({
        where: { id: numericId },
        data: { position: index },
      });
    });

    await prisma.$transaction(updates);

    res.status(200).json({ message: "Ordre mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des positions :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour des positions." });
  }
}
