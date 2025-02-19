import ContactModal from "@components/Contact/ContactModal";

export const metadata = {
  title: "Contactez Chic'Mixt – Boutique Live Mode",
  description:
    "Contactez Chic'Mixt avec ce formulaire de contact, Live shopping Facebook",
  openGraph: {
    url: "https://www.chicmixt.fr/contact-chicmixt-herault-mode-tendance",
    title: "Formulaire de contact de Chic'Mixt",
    description:
      "Contactez Chic'Mixt avec ce formulaire de contact, Live shopping Facebook",
    images: [
      {
        url: "https://www.chicmixt.fr/images/s-logo-chicMixt.jpeg",
        width: 1200,
        height: 630,
        alt: "Contactez Chic'Mixt | Boutique de mode en Live",
      },
    ],
    siteName: "Chic'Mixt",
  },
  alternates: {
    canonical: "https://www.chicmixt.fr/contact-chicmixt-herault-mode-tendance",
  },
};

export default function ContactModalePage() {
  return <ContactModal />;
}
