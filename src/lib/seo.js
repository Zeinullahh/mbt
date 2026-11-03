const rawUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '';

export const siteUrl = /^https:\/\/[^/]+$/i.test(rawUrl.replace(/\/$/, ''))
  ? rawUrl.replace(/\/$/, '')
  : null;

export const indexable = Boolean(siteUrl) && !['preview', 'development'].includes(process.env.VERCEL_ENV) && process.env.SEO_PREVIEW !== 'true';
export const baseUrl = siteUrl || 'http://localhost:3000';

export const seoPages = {
  '/': {
    title: 'Строительство и проектирование ВОЛС в Казахстане | MBT Connection',
    description: 'MBT Connection проектирует, строит и обслуживает волоконно-оптические линии связи в Казахстане. Монтаж, сварка, измерения OTDR, GPON и FTTH.',
  },
  '/services': {
    title: 'Услуги по проектированию и строительству ВОЛС | MBT Connection',
    description: 'Обследование, проектирование, согласование, строительство, монтаж и тестирование ВОЛС. Подключение GPON и FTTH, обслуживание линий связи.',
  },
  '/projects': {
    title: 'Реализованные объекты ВОЛС | MBT Connection',
    description: 'Опыт MBT Connection: ЖК Akbulak Rivera, Atlant, Nexpo City, Green Line Garden, Green Line Velora и ТРЦ «Керуен».',
  },
  '/contacts': {
    title: 'Контакты MBT Connection в Кокшетау | ВОЛС Казахстан',
    description: 'Свяжитесь с MBT Connection по вопросам проектирования, строительства и обслуживания ВОЛС. Телефон +7 771 100 77 66, Кокшетау.',
  },
};

export function pageMetadata(path) {
  const { title, description } = seoPages[path];
  const url = `${baseUrl}${path}`;
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: `${siteUrl}${path}` } : undefined,
    robots: { index: indexable, follow: indexable },
    openGraph: { title, description, url, siteName: 'MBT Connection', locale: 'ru_KZ', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'MBT Connection — волоконно-оптические линии связи' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  };
}

export function pageJsonLd(path) {
  const url = `${baseUrl}${path}`;
  const graph = [
      {
        '@type': 'Organization', '@id': `${baseUrl}/#organization`, name: 'MBT Connection', url: baseUrl,
        telephone: '+77711007766', email: 'info@mbtconnect.kz', foundingDate: '2022',
        address: { '@type': 'PostalAddress', addressCountry: 'KZ', addressLocality: 'Кокшетау', streetAddress: 'ул. Кошкарбаева, 188' },
      },
      { '@type': 'WebSite', '@id': `${baseUrl}/#website`, name: 'MBT Connection', url: baseUrl, inLanguage: 'ru' },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: seoPages[path].title, description: seoPages[path].description, inLanguage: 'ru', isPartOf: { '@id': `${baseUrl}/#website` }, about: { '@id': `${baseUrl}/#organization` } },
    ];
  if (path !== '/') graph.push({
    '@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: seoPages[path].title, item: url },
    ],
  });
  if (path === '/services') graph.push({
    '@type': 'Service', '@id': `${url}#service`, name: 'Проектирование и строительство ВОЛС',
    serviceType: 'Проектирование, строительство и обслуживание волоконно-оптических линий связи',
    provider: { '@id': `${baseUrl}/#organization` }, areaServed: { '@type': 'Country', name: 'Казахстан' }, url,
  });
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
