import { indexable, seoPages, siteUrl } from '../lib/seo';

export default function sitemap() {
  if (!indexable) return [];
  return Object.keys(seoPages).map(path => ({ url: `${siteUrl}${path}` }));
}
