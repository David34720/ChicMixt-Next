import Login from "@components/Admin/Login";

export const metadata = {
  title: "Connnectez Admin",
  description:
    "Se connecter au panneau d'administration de Chic'Mixt",
  openGraph: {
    url: "https://www.chicmixt.fr/contact-chicmixt-herault-mode-tendance",
    title: "Login de Chic'Mixt",
    description:
      "Administration de Chic'Mixt avec ce formulaire de Login",
    images: [
      {
        url: "https://www.chicmixt.fr/images/s-logo-chicMixt.jpeg",
        width: 1200,
        height: 630,
        alt: "Login Chic'Mixt | Boutique de mode en Live",
      },
    ],
    siteName: "Chic'Mixt",
  },
  alternates: {
    canonical: "https://www.chicmixt.fr/",
  },
};

export default function LoginPage() {
  return <Login />;
}
