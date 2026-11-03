import HomeClient from './home-client';
import { pageJsonLd } from '../lib/seo';

export default function Home() {
  const jsonLd = JSON.stringify(pageJsonLd('/')['@graph'][2]).replace(/</g, '\\u003c');
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} /><HomeClient /></>;
}
