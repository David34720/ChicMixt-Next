import type { Metadata } from "next";
import "./globals.scss";
import AppWrapper from "../../components/AppWrapper";

import { ModalProvider } from "../../contexts/ModalContext";
// Import du SessionProvider
import { Aboreto, Merriweather_Sans } from "next/font/google";

const aboreto = Aboreto({ subsets: ["latin"], weight: "400" });
const merriweather = Merriweather_Sans({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Chic'Mixt - Votre Boutique de Mode en Ligne - Vêtements & Accessoires Tendance en Direct",
  description:
    "Boutique en live Chic'mixt. Découvrez notre boutique de mode en ligne offrant les dernières tendances en vêtements et accessoires pour tous. Profitez de nos ventes en direct sur Facebook pour des offres exclusives. Achat facile et livraison rapide partout en France.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="fr">
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
