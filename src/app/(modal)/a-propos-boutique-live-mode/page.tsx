import AproposModal from "@components/AProposModal/AproposModal";

export const metadata = {
  title: "À propos de Chic'Mixt – Boutique Live Mode",
  description:
    "Découvrez Chic'Mixt, votre boutique de mode en live, animée par Fanny. Collections femmes, hommes et enfants, lives hebdomadaires et bonne humeur !",
  openGraph: {
    url: "https://chicmixt.fr/a-propos-boutique-live-mode",
    title: "À propos de Chic'Mixt",
    description:
      "Chic'Mixt est une boutique de mode en live, animée par Fanny. Découvrez nos collections tendances et nos moments conviviaux chaque semaine.",
    images: [
      {
        url: "https://chicmixt.fr/images/hook2/hook2-1.png",
        width: 1200,
        height: 630,
        alt: "Chic'Mixt | Boutique de mode en Live",
      },
    ],
    siteName: "Chic'Mixt",
  },
  alternates: {
    canonical: "https://chicmixt.fr/a-propos-boutique-live-mode",
  },
};

export default function AproposBoutiqueLiveModePage() {
  return <AproposModal />;
}
