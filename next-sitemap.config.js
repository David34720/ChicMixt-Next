/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.chicmixt.fr',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/dashboard/*'],
  
  // Permet de récupérer les pages en App Router même si elles sont dans un groupe intercepté `(modal)`
  additionalPaths: async (config) => [
    { loc: '/a-propos-live-mode' },
    { loc: '/contact-chicmixt-mode-tendance' },
    { loc: '/mentions-legales-chicmixt-live-facebook' },
  ], 
};
