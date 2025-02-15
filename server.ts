// server.ts
import express from "express";
import next from "next";
import path from "path";

// Détermine si on est en mode dev ou prod
const dev = process.env.NODE_ENV !== "production";

// Initialise Next
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // === Statique : pour servir tout le contenu de 'public/uploads' en direct ===
  // Si vous voulez un autre dossier (ex: "uploads" hors de "public"), adaptez ici.
  // Mais puisque vous utilisez "public/uploads/gallery", voici :
  server.use("/uploads", express.static(path.join(__dirname, "..", "..", "public", "uploads")));

  // (Option) Si vous avez besoin d'un bodyParser ou autre config globale Express,
  // vous pouvez l’ajouter ici.

  // === Toutes les autres routes, Next gère ===
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // === Lancement sur le port 3000 (ou un autre) ===
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (error?: Error | undefined) => {
    if (error) throw error;
    console.log(`> Serveur custom démarré : http://localhost:${PORT}`);
  });
});
