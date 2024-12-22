import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  distDir: ".next",
  // images: {
  //   domains: ['images.unsplash.com', 'docs.material-tailwind.com'], // Ajoutez ici les domaines autorisés
  // },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
