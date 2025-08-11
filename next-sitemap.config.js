/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lifetimeart.co.uk', // Replace with your actual domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/server-sitemap.xml', // Exclude server-side sitemap from the sitemap index
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://lifetimeart.co.uk/server-sitemap.xml', // Add server-side sitemap to robots.txt
    ],
  },
}