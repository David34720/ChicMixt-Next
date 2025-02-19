// chicmixt/src/app/(modal)/mentions-legales-chicmixt-live-facebook/page.tsx

import MentionsLegales from "@components/MentionsLegales/MentionsLegales";

export const metadata = {
  title: "Mentions légales de Chic'Mixt – Boutique Live Mode",
  description: "Mentions légales de Chic'Mixt, vente sur Facebook mode et tendance",
  openGraph: {
    url: "https://www.chicmixt.fr/",
    title: "Mentions légales de Chic'Mixt",
    description: "Mentions légales de Chic'Mixt, vente sur Facebook mode et tendance",
    images: [
      {
        url: "https://www.chicmixt.fr/images/s-logo-chicMixt.jpeg",
        width: 1200,
        height: 630,
        alt: "Mentions légales Chic'Mixt | Boutique de mode en Live",
      },
    ],
    siteName: "Chic'Mixt",
  },
  alternates: {
    canonical: "https://www.chicmixt.fr/mentions-legales-chicmixt-live-facebook",
  },
};

export default function MentionsLegalesModalePage() {
  return <MentionsLegales />;
}
