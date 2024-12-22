// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // Ajoutez le rôle ici
  }

  interface Session {
    user: User; // Ajoutez le type User ici
  }
}
