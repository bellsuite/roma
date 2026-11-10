import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bellsuites.it';
  const locales = ['it', 'en', 'fr', 'de', 'es', 'zh', 'ja'];

  const routes = [
    '',
    '/contatti',
    '/mappa',
    '/suites/suite-1',
    '/suites/suite-2',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.startsWith('/suites') ? 0.9 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
