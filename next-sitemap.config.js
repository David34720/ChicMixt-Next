/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.chicmixt.fr',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,

  // Exclure les pages inutiles
  exclude: [
    '/auth/*', // Exclure toutes les pages liées à l'authentification
    '/HookHomePage', // Supprimer cette page qui ne devrait pas être indexée
    '/api/*', // Empêcher les API routes d'être incluses
    '/admin/*', // Éviter les pages admin
  ],

  // Ajouter manuellement les pages importantes
  additionalPaths: async (config) => [
    await config.transform(config, '/'), // Homepage
    await config.transform(config, '/a-propos-live-mode'),
    await config.transform(config, '/contact-chicmixt-mode-tendance'),
    await config.transform(config, '/mentions-legales-chicmixt-live-facebook'),
  ],
};
