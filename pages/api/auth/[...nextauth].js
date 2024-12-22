import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt"; // Pour comparer les mots de passe
import prisma from "../../../prisma/client"; // Assurez-vous que votre prisma client est correctement configuré

// Définir vos options de NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await compare(credentials.password, user.password))) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax", // Assure l'envoi des cookies pour les requêtes locales
      },
    },
  },
  callbacks: {
    async session({ session, token }) {
      console.log("Session Callback: ", { token, session });
      if (token.role) {
        session.user = { ...session.user, role: token.role };
      }
      return session;
    },
    async jwt({ token, user }) {
     if (user) {
        token.role = user.role; // Ajouter explicitement le rôle au token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ajoutez une variable d'environnement pour sécuriser la session
  pages: {
    signIn: '/login', // Si tu veux spécifier la page de connexion personnalisée
  },
};

// Exporter NextAuth avec les options
export default NextAuth(authOptions);
