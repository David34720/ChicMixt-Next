import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const subscribers = await prisma.subscriber.findMany();
      res.status(200).json(subscribers);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des abonnés." });
      console.log(error);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
