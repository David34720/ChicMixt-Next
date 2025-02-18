// chicmixt/src/app/(modal)/mentions-legales-chicmixt-live-facebook/page.tsx

import MentionsLegales from "@components/MentionsLegales/MentionsLegales";

export const metadata = {
  title: "Mentions légales de Chic'Mixt – Boutique Live Mode",
  description: "Mentions légales de Chic'Mixt, vente sur Facebook mode et tendance",
  openGraph: {
    url: "https://chicmixt.fr/mentions-legales-chicmixt-live-facebook",
    title: "Mentions légales de Chic'Mixt",
    description: "Mentions légales de Chic'Mixt, vente sur Facebook mode et tendance",
    images: [
      {
        url: "https://chicmixt.fr/images/hook2/hook2-1.png",
        width: 1200,
        height: 630,
        alt: "Mentions légales Chic'Mixt | Boutique de mode en Live",
      },
    ],
    siteName: "Chic'Mixt",
  },
  alternates: {
    canonical: "https://chicmixt.fr/mentions-legales-chicmixt-live-facebook",
  },
};

export default function MentionsLegalesModalePage() {
  return <MentionsLegales />;
}
