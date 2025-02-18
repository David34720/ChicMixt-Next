"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import "@src/app/globals.scss";
import dynamic from "next/dynamic";
import AdminHeader from "@components/Admin/AdminHeader";


const NewsletterAdmin = dynamic(
  () => import("@components/Admin/NewsletterAdmin"),
  { ssr: false }
);
const UsersAdmin = dynamic(
  () => import("@components/Admin/UsersAdmin"),
  { ssr: false }
);
interface User {
  role?: string;
}

export default function AdminPageWrapper() {
  return (
    <SessionProvider>
      <AdminPage />
    </SessionProvider>
  );
}

// Liste des composants affichables
const displayState = [
  { key: "index", label: "Dashboard", component: null },
  { key: "newsletter", label: "Newsletter", component: <NewsletterAdmin /> },
  { key: "users", label: "Users", component: <UsersAdmin /> },
];

function AdminPage() {
  const { data: session, status } = useSession();
  const [display, setDisplay] = useState("index"); // L'état contient la clé du composant actif

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (!session || (session.user as User).role !== "admin") {
    redirect("/"); // Redirection si non admin
  }

  // Trouver le composant correspondant à l'état actuel
  const activeComponent =
    displayState.find((state) => state.key === display)?.component || null;

  return (
    <div className="admin-container">
      <header>
        <AdminHeader
          displayState={displayState}
          setDisplay={setDisplay}
        />
      </header>
      <div className="container mx-auto p-6">
        {/* Affichage dynamique */}
        {activeComponent || <div>Bienvenue sur le dashboard admin.</div>}
      </div>
    </div>
  );
}
