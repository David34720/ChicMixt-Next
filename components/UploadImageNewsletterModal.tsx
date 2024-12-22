import multer from "multer";
import path from "path";
import { promises as fs } from "fs";
import prisma from "../prisma/client"; // Assurez-vous que ce chemin est correct
import sharp from "sharp";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

// Configurer le dossier de destination
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), "public/uploads/newsletter");
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non autorisé."));
    }
  },
});

// Middleware pour gérer l'upload avec Next.js
const uploadMiddleware = upload.single("image");

// Configuration de Next.js pour désactiver le body parser pour l'upload
export const config = {
  api: {
    bodyParser: false, // Désactiver le bodyParser pour Multer
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Vérifier la session (authentification de l'utilisateur)
    const session = await getSession({ req });

    if (!session || session.user?.role !== "admin") {
      return res.status(401).json({ error: "Non autorisé" });
    }

    if (req.method === "POST") {
      // Utiliser Multer pour traiter le fichier uploadé
      await new Promise<void>((resolve, reject) => {
        uploadMiddleware(req as any, res as any, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      const file = (req as any).file; // Multer attache `file` à l'objet `req`

      if (!file) {
        return res.status(400).json({ error: "Aucun fichier uploadé." });
      }

      // Réduire et optimiser l'image avec Sharp
      const optimizedPath = path.join(
        process.cwd(),
        "public/uploads/newsletter",
        `optimized-${file.filename}`
      );

      await sharp(file.path)
        .resize(800) // Largeur maximale
        .jpeg({ quality: 80 }) // Compression JPEG
        .toFile(optimizedPath);

      // Supprimer l'image originale
      await fs.unlink(file.path);

      // Enregistrer les métadonnées dans la table ImageNewsletter
      const newImage = await prisma.imageNewsLetter.create({
        data: {
          url: `/uploads/newsletter/optimized-${file.filename}`,
        },
      });

      res.status(201).json(newImage);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
  } catch (error) {
    console.error("Erreur lors de l'upload :", error);
    res.status(500).json({ error: "Erreur lors de l'upload." });
  }
}
