// api/upload.js
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import prisma from '../../prisma/client';
import sharp from 'sharp';
import { getSession } from "next-auth/react";

// Fonction pour sanitiser le nom de fichier
const sanitizeFilename = (filename) => {
  return filename
    .normalize("NFD") // décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // supprime les diacritiques
    .replace(/\s+/g, "-") // remplace les espaces par des tirets
    .replace(/[^a-zA-Z0-9.\-_]/g, ""); // retire les caractères spéciaux
};

// Configurer le dossier de destination
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), 'public/uploads/gallery');
      console.log("Process CWD :", process.cwd());
      console.log("Chemin d'upload :", uploadPath);
      try {
        await fs.mkdir(uploadPath, { recursive: true });
        cb(null, uploadPath);
      } catch (err) {
        console.error("Erreur lors de la création du dossier :", err);
        cb(err, uploadPath);
      }
    },
    filename: (req, file, cb) => {
      const sanitizedOriginalName = sanitizeFilename(file.originalname);
      const uniqueName = `${Date.now()}-${sanitizedOriginalName}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
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

export default async function handler(req, res) {
  // Vérifier la session (authentification)
  const session = await getSession({ req });
  if (!session || session.user.role !== "admin") {
    return res.status(401).json({ error: "Non autorisé" });
  }

  if (req.method === "POST") {
    try {
      // Traiter le fichier uploadé avec Multer
      await new Promise((resolve, reject) => {
        uploadMiddleware(req, res, (err) => {
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
      const baseName = file.filename.replace(/\.[^.]+$/, ""); // retire l'extension d'origine
      const optimizedFilename = `optimized-${baseName}.jpg`;
      const optimizedPath = path.join(
        process.cwd(),
        'public/uploads/gallery',
        optimizedFilename
      );

      await sharp(file.path)
        .resize(800) // largeur maximale
        .jpeg({ quality: 80 }) // conversion en JPEG
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
          title: req.body.title || 'Sans titre',
          description: req.body.description || '',
          url: `/uploads/gallery/${optimizedFilename}`,
          position: newPosition,
          price: req.body.price ? parseFloat(req.body.price) : 0,
          reference: req.body.reference || '',
          promotion: req.body.promotion === "true" || req.body.promotion === true,
          nouveaute: req.body.nouveaute === "true" || req.body.nouveaute === true,
        },
      });

      res.status(201).json(newImage);
    } catch (error) {
      console.error('Erreur lors de l\'upload :', error);
      res.status(500).json({ error: 'Erreur lors de l\'upload.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
