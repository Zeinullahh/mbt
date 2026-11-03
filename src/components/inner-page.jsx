import Link from 'next/link';
import { pageJsonLd } from '../lib/seo';

const links = [
  ['/', 'Главная'], ['/services', 'Услуги'], ['/projects', 'Объекты'], ['/contacts', 'Контакты'],
];

export default function InnerPage({ path, eyebrow, title, children }) {
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': pageJsonLd(path)['@graph'].slice(2) }).replace(/</g, '\\u003c');
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    <header className="inner-header"><Link className="inner-brand" href="/">MBT <span>CONNECTION</span></Link><nav aria-label="Основная навигация">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav></header>
    <main className="inner-page">
      <nav className="breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span aria-hidden="true">/</span><span>{eyebrow}</span></nav>
      <div className="inner-intro"><p className="section-kicker">{eyebrow}</p><h1>{title}</h1></div>
      {children}
      <div className="inner-cta"><h2>Обсудим ваш проект</h2><p>Опишите объект и задачу — обсудим проектирование, строительство или обслуживание сети.</p><Link href="/contacts">Связаться с MBT Connection ↗</Link></div>
    </main>
    <footer className="inner-footer"><Link href="/">MBT CONNECTION</Link><a href="mailto:info@mbtconnect.kz">info@mbtconnect.kz</a><span>© 2026 MBT Connection</span></footer>
  </>;
}
