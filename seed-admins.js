import { hash } from "bcrypt";
import prisma from "./prisma/client.js"; // Chemin vers votre client Prisma

async function createAdmin() {
  try {
    const hashedPassword = await hash("Davidchicmixt1!", 10); // Hashez le mot de passe
    const admin = await prisma.user.create({
      data: {
        name: "david",
        email: "david@okiweed.fr",
        password: hashedPassword,
        role: "admin", // Définissez un rôle pour distinguer les admins
      },
    });
    console.log("Admin créé :", admin);
  } catch (error) {
    console.error("Erreur lors de la création de l'admin :", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
