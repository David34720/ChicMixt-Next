import type { Metadata } from "next";
import "./globals.scss";
import AppWrapper from "../../components/AppWrapper";

import { ModalProvider } from "../../contexts/ModalContext";
// Import du SessionProvider
import { Aboreto, Merriweather_Sans } from "next/font/google";

const aboreto = Aboreto({ subsets: ["latin"], weight: "400" });
const merriweather = Merriweather_Sans({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Chic'Mixt - Boutique de Mode en Live - Vêtements & Accessoires Tendance",
  description:
    "Boutique en live Chic'mixt. Découvrez notre boutique de mode en Live sur Facebook. Shopping mode tendance en direct avec des offres exclusives .",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="fr">
      <head>
        <meta name="keywords" content="mode, vêtements, boutique en live, tendance, shopping live" />
      </head>
      <body className={`${aboreto.className} ${merriweather.className}`}>
        <div id="fb-root"></div>
          <ModalProvider>
            <AppWrapper>
              {children}
              </AppWrapper>
              <div id="modal-root"></div>
          </ModalProvider>
      </body>
    </html>
  );
}
