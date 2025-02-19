"use client";

import React, { Suspense, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import Modal from "./Modal/Modal";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";


export default function AppWrapper({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).fbAsyncInit = function () {
        (window as any).FB.init({
          xfbml: true,
          version: "v21.0",
        });
      };
    }
  }, []);

  return (
    <SessionProvider>
      <Header />
      <main className="container mx-auto">
        <Suspense fallback={<div>Chargement...</div>}>
          {children}
        </Suspense>
      </main>
      <Footer />
      <Modal />
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v21.0"
      />
    </SessionProvider>
  );
}
