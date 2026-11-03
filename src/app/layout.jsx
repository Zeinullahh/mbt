import './globals.css';
import { baseUrl, pageJsonLd, pageMetadata } from '../lib/seo';

export const metadata = {
  metadataBase: new URL(baseUrl),
  ...pageMetadata('/'),
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.YANDEX_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': pageJsonLd('/')['@graph'].slice(0, 2) }).replace(/</g, '\\u003c');
  return <html lang="ru"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />{children}</body></html>;
}
