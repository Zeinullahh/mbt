import { indexable, siteUrl } from '../lib/seo';

export default function robots() {
  if (!indexable) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl };
}
