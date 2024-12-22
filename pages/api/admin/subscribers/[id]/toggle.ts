import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Récupérer l'ID du paramètre dynamique [id]
  const { id } = req.query;

  // Vérifier si la méthode HTTP est correcte
  if (req.method === "PUT") {
    try {
      // Récupérer l'abonné correspondant à l'ID
      const subscriber = await prisma.subscriber.findUnique({
        where: { id: String(id) },
      });

      // Vérifier si l'abonné existe
      if (!subscriber) {
        return res.status(404).json({ error: "Abonné introuvable." });
      }

      // Basculer le statut `subscribed` (true <-> false)
      const updatedSubscriber = await prisma.subscriber.update({
        where: { id: String(id) },
        data: { subscribed: !subscriber.subscribed },
      });

      // Retourner les informations mises à jour
      res.status(200).json(updatedSubscriber);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du statut." });
    }
  } else {
    // Si la méthode HTTP n'est pas autorisée
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
