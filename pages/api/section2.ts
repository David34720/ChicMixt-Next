import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';



const prisma = new PrismaClient() as PrismaClient & { section2: any };


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  // Pour simplifier, nous travaillons sur une seule entrée de la section (id = 1).
  // Si aucune entrée n'existe, nous en créons une par défaut.
  // console.log(Prisma);
  if (req.method === 'GET') {
    try {
      let sectionData = await prisma.section2.findFirst();
      if (!sectionData) {
        sectionData = await prisma.section2.create({
          data: {
            videoUrl: 'https://fb.watch/xgvTdqbHcb/',
            liveDate: new Date(),
          },
        });
      }
      res.status(200).json(sectionData);
    } catch (error: unknown) {
      console.error('Erreur GET /api/section2:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { videoUrl, liveDate } = req.body;
      if (!videoUrl || !liveDate) {
        return res.status(400).json({ error: 'Les champs videoUrl et liveDate sont obligatoires.' });
      }
      
      // On met à jour l'entrée ayant id=1 (on part du principe qu'elle existe)
      const updatedSection = await prisma.section2.update({
        where: { id: 1 },
        data: {
          videoUrl,
          liveDate: new Date(liveDate),
        },
      });
      res.status(200).json(updatedSection);
    } catch (error: unknown) {
      console.error('Erreur PUT /api/section2:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour des données.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
