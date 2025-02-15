import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false, 
  devIndicators: {
    buildActivity: false, // Désactive l'animation de build en mode dev
  },
  distDir: ".next",
  images: {
    domains: ['localhost', 'www.chicmixt.fr', '192.168.1.81'], // Ajoutez ici les domaines autorisés
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
