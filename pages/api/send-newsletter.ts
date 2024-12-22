import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";
import sanitizeHtml from "sanitize-html";
import {load} from "cheerio";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid'; // Pour générer des CID uniques

const prisma = new PrismaClient();

// Schéma de validation Yup
const schema = yup.object().shape({
  subject: yup.string().required("L'objet est requis.").min(5, "Objet trop court."),
  content: yup.string().required("Le contenu est requis."),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  try {
    // Validation des données
    const { subject, content } = await schema.validate(req.body);

    // Log du contenu avant sanitization
    console.log("Contenu avant sanitization :", content);

    // Nettoyage des données
    const sanitizedSubject = sanitizeHtml(subject);
    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "a",
        "video",
        "u",
        "iframe",
        "p",
        "div",
        "span",
        "ul",    // Ajouté
        "ol",    // Ajouté
        "li",    // Ajouté
        "i",     // Ajouté
        "em",    // Ajouté
        "strong",// Si nécessaire
        "b",
        // Ajoutez d'autres balises nécessaires
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        a: ["href", "target", "rel"],
        img: ["src", "alt", "width", "height"],
        video: ["src", "controls", "width", "height"],
        iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen"],
        span: ["style"], // Permettre les styles en ligne sur les spans
        div: ["style"],
        p: ["style"],
        table: ["style", "border", "width", "height", "cellpadding", "cellspacing"],
      },
      allowedStyles: {
        'span': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/],
          'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/],
          'font-weight': [/^bold$/i, /^700$/],
          'font-style': [/^italic$/i],
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        },
        'div': {
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
          // Autres styles si nécessaire
        },
        'p': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/],
          'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/],
          'font-weight': [/^bold$/i, /^700$/],
          'font-style': [/^italic$/i],
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
          // Autres propriétés si nécessaire
        },
        'table': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/],
          'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/],
          'font-weight': [/^bold$/i, /^700$/],
          'font-style': [/^italic$/i],
          'width': [/^[0-9]+%$/],
          'cellpadding': [/^[0-9]+$/],
          'cellspacing': [/^[0-9]+$/],
          'border': [/^[0-9]+$/],
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
          // Autres propriétés si nécessaire
        },
        'li': {
          'color': [/^#(0x)?[0-9a-f]+$/i],
          'font-style': [/^italic$/i],
          'font-weight': [/^bold$/i],
        },
        'ul': {
          'list-style-type': [/^disc$/i, /^circle$/i, /^square$/i],
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        },
        'ol': {
          'list-style-type': [/^decimal$/i, /^lower-alpha$/i, /^upper-alpha$/i],
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        },
      },
    });


    console.log("Contenu sanitizé avant envoi :", sanitizedContent);

    // Enregistrer la newsletter dans la base de données
    await prisma.newsletter.create({
      data: { subject: sanitizedSubject, content: sanitizedContent, theme: "default" },
    });

    // Récupérer les abonnés actifs
    const subscribers = await prisma.subscriber.findMany({
      where: { subscribed: true },
      select: { email: true },
    });

    const emailList = subscribers.map((sub) => sub.email);

    if (emailList.length === 0) {
      return res.status(400).json({ error: "Aucun abonné pour envoyer la newsletter." });
    }

    // Configuration de Nodemailer avec logging activé
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Adresse email
        pass: process.env.GMAIL_PASSWORD, // Mot de passe ou App Password
      },
      logger: true,
      debug: true,
    });

    // Générer une version texte du contenu HTML
    const sanitizedText = sanitizeHtml(sanitizedContent, {
      allowedTags: [],
      allowedAttributes: {},
      textOnly: true,
    });

    // Utiliser Cheerio pour analyser le contenu HTML et extraire les images
    const $ = load(sanitizedContent);
    const attachments: { filename: string; path: string; cid: string; }[] = [];

    $('img').each((index, img) => {
      const src = $(img).attr('src');

      // Vérifier si le src est une URL locale
      if (src && src.startsWith('http://localhost:3000/uploads/newsletter/')) {
        // Extraire le chemin relatif de l'image
        const imagePath = src.replace('http://localhost:3000', '');

        // Construire le chemin absolu vers l'image sur le serveur (inclure 'public')
        const absoluteImagePath = path.join(process.cwd(), 'public', imagePath);

        // Vérifier si le fichier existe
        if (fs.existsSync(absoluteImagePath)) {
          // Générer un CID unique avec UUID
          const cid = `image-${uuidv4()}@newsletter`;

          // Ajouter l'image en tant que pièce jointe
          attachments.push({
            filename: path.basename(absoluteImagePath),
            path: absoluteImagePath,
            cid: cid, // Same as in the html img src
          });

          // Remplacer le src de l'image dans le HTML par le CID
          $(img).attr('src', `cid:${cid}`);
        } else {
          console.warn(`Image non trouvée : ${absoluteImagePath}`);
        }
      }
    });

    // Mettre à jour le contenu HTML avec les nouveaux src
    const cleanHtmlContent = $.html();
    const finalHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; color: #333; border: 1px solid #ddd; border-radius: 8px display: flex; flex-direction: column; gap: 15px;">
          <h2 style="color: #de277b; text-align: left; font-size: 24px;">Bonjour,</h2>
          <div>
            ${cleanHtmlContent}
          </div>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-top: 20px; text-align: center;">
          À bientôt, <br>
          <h1 style="font-family: 'Aboreto', cursive; color: rgba(0, 0, 0, 0.8); font-size: 32px; text-align: center; position: relative; margin: 0 0 20px;">
          CHIC'MIXT
          <span style="display: block; font-size: 16px; font-style: italic; color: #de277b; margin-top: -20px;">BY Fanny</span>
          </h1>
          </p>
          <div style="text-align: center; margin-top: 30px;">
          <a href="https://www.facebook.com/profile.php?id=61555657774462" style="display: inline-block; text-decoration: none; background-color: #3b5998; color: #fff; padding: 10px 20px; font-size: 16px; border-radius: 5px;">
          Suivez-nous sur Facebook
          </a>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Pour vous désabonner, <a href="${process.env.NEXTAUTH_URL}?showUnsubscribeModal=true">cliquez ici</a>.
          </p>
          </div>
        </div>
    `
    // Options de l'email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: emailList,
      subject: sanitizedSubject,
      text: sanitizedText, // Version texte
      html: finalHtmlContent, // Version HTML avec CID
      attachments: attachments, // Pièces jointes des images
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Newsletter envoyée avec succès !" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur :", error);
      if (error.name === "ValidationError") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erreur lors de l'envoi de la newsletter." });
      }
    } else {
      console.error("Erreur inconnue :", error);
      res.status(500).json({ error: "Erreur inconnue lors de l'envoi de la newsletter." });
    }
  }
}
