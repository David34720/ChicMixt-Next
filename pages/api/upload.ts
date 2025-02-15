// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import prisma from '../../prisma/client';
import sharp from 'sharp';
import { getSession } from "next-auth/react";

// Types
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface CustomNextApiRequest extends NextApiRequest {
  file?: MulterFile;
}

// Fonction pour sanitiser le nom de fichier
const sanitizeFilename = (filename: string): string => {
  return filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");
};

// Fonction pour obtenir le chemin d'upload
const getUploadPath = (): string => {
  return process.env.NODE_ENV === 'production'
    ? 'public/uploads/gallery'
    : path.join(process.cwd(), 'public/uploads/gallery');
};

// Configurer le stockage
const storage = multer.diskStorage({
  destination: async (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const uploadPath = getUploadPath();
    console.log("Process CWD :", process.cwd());
    console.log("Chemin d'upload :", uploadPath);

    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (err) {
      console.error("Erreur lors de la création du dossier :", err);
      if (process.env.NODE_ENV !== 'production') {
        const devPath = path.join(process.cwd(), 'public/uploads/gallery');
        try {
          await fs.mkdir(devPath, { recursive: true });
          cb(null, devPath);
        } catch (devErr) {
          cb(devErr as Error, devPath);
        }
      } else {
        cb(err as Error, uploadPath);
      }
    }
  },
  filename: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const sanitizedOriginalName = sanitizeFilename(file.originalname);
    const uniqueName = `${Date.now()}-${sanitizedOriginalName}`;
    cb(null, uniqueName);
  },
});

// Configurer l'upload
const upload = multer({
  storage: storage,
  fileFilter: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/webp' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/svg+xml'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé.'));
    }
  },
});

// Middleware pour gérer l'upload avec Next.js
const uploadMiddleware = upload.single('image');

// Désactivation du body parser pour Multer
export const config = {
  api: {
    bodyParser: false,
  },
};

interface SessionUser {
  role?: string;
}

interface Session {
  user: SessionUser;
}

export default async function handler(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {
  // Vérifier la session (authentification)
  const session = await getSession({ req }) as Session | null;
  
  if (!session || session.user.role !== "admin") {
    return res.status(401).json({ error: "Non autorisé" });
  }

  if (req.method === "POST") {
    try {
      // Traiter le fichier uploadé avec Multer
      await new Promise<void>((resolve, reject) => {
        uploadMiddleware(req as any, res as any, (err: any) => {
          if (err) {
            console.error("Erreur lors de l'upload avec Multer :", err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // Récupérer le fichier uploadé
      const { file } = req;
      if (!file) {
        return res.status(400).json({ error: 'Aucun fichier uploadé.' });
      }

      // Convertir le fichier en JPEG et forcer l'extension .jpg
      const baseName = file.filename.replace(/\.[^.]+$/, "");
      const optimizedFilename = `optimized-${baseName}.jpg`;
      const optimizedPath = path.join(
        process.cwd(),
        'public/uploads/gallery',
        optimizedFilename
      );

      await sharp(file.path)
        .resize(800)
        .jpeg({ quality: 80 })
        .toFile(optimizedPath);

      // Supprimer le fichier original
      await fs.unlink(file.path);

      // Déterminer la position pour la nouvelle image
      const lastImage = await prisma.image.findFirst({
        orderBy: { position: 'desc' },
      });
      const newPosition = lastImage ? lastImage.position + 1 : 0;

      // Enregistrer les métadonnées en base
      const newImage = await prisma.image.create({
        data: {
          title: (req.body?.title as string) || 'Sans titre',
          description: (req.body?.description as string) || '',
          url: `/uploads/gallery/${optimizedFilename}`,
          position: newPosition,
          price: req.body?.price ? parseFloat(req.body.price as string) : 0,
          reference: (req.body?.reference as string) || '',
          promotion: req.body?.promotion === "true" || req.body?.promotion === true,
          nouveaute: req.body?.nouveaute === "true" || req.body?.nouveaute === true,
        },
      });

      // Retourner toutes les images mises à jour
      const updatedImages = await prisma.image.findMany({
        orderBy: { position: "desc" }
      });

      res.status(201).json({
        newImage,
        allImages: updatedImages
      });
    } catch (error) {
      console.error('Erreur lors de l\'upload :', error);
      res.status(500).json({ error: 'Erreur lors de l\'upload.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}