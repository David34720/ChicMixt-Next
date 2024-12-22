// pages/api/images/initPositions.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

type Data = {
  message?: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
 
  try {
    // Récupérer toutes les images triées par createdAt (ou tout autre critère)
    const images = await prisma.image.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Assigner une position basée sur l'ordre
    const updatePromises = images.map((image: { id: number; createdAt: Date; position: number }, index: number) => {
      return prisma.image.update({
        where: { id: image.id },
        data: { position: index },
      });
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Positions initialized successfully.' });
  } catch (error) {
    console.error('Error initializing positions:', error);
    res.status(500).json({ error: 'Error initializing positions.' });
  }
}
