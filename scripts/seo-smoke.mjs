const origin = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const routes = ['/', '/services', '/projects', '/contacts'];
const titles = new Set();
const descriptions = new Set();
const errors = [];
const configuredOrigin = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
const indexable = Boolean(configuredOrigin) && process.env.SEO_PREVIEW !== 'true' && !['preview', 'development'].includes(process.env.VERCEL_ENV);

async function get(path) {
  const response = await fetch(`${origin}${path}`);
  return { response, body: await response.text() };
}
function check(condition, message) { if (!condition) errors.push(message); }
function tag(html, name) { return html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i'))?.[1]; }
function canonical(html) { return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1]; }

for (const path of routes) {
  const { response, body } = await get(path);
  check(response.status === 200, `${path}: HTTP ${response.status}`);
  const title = body.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = tag(body, 'description');
  check(Boolean(title), `${path}: title missing`);
  check(Boolean(description), `${path}: description missing`);
  check(!titles.has(title), `${path}: duplicate title`);
  check(!descriptions.has(description), `${path}: duplicate description`);
  titles.add(title); descriptions.add(description);
  check((body.match(/<h1\b/gi) || []).length === 1, `${path}: expected one H1`);
  check(Boolean(tag(body, 'og:title') && tag(body, 'og:description') && tag(body, 'og:image') && tag(body, 'og:url')), `${path}: Open Graph incomplete`);
  check(Boolean(tag(body, 'twitter:card')), `${path}: Twitter card missing`);
  check(!/<img\b(?![^>]*\balt=)[^>]*>/i.test(body), `${path}: image without alt`);
  check(!body.includes('???'), `${path}: corrupted text`);
  const robots = tag(body, 'robots') || '';
  if (indexable) {
    check(canonical(body) === `${configuredOrigin.replace(/\/$/, '')}${path}`, `${path}: canonical mismatch`);
    check(!robots.includes('noindex'), `${path}: unexpected noindex`);
  } else check(robots.includes('noindex'), `${path}: preview should be noindex`);
  const jsonScripts = [...body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  check(jsonScripts.length > 0, `${path}: JSON-LD missing`);
  for (const [, json] of jsonScripts) { try { JSON.parse(json); } catch { errors.push(`${path}: invalid JSON-LD`); } }
  for (const [, href] of body.matchAll(/<a[^>]+href="(\/[^"]*)"/gi)) {
    const target = href.split('#')[0].split('?')[0] || '/';
    check(routes.includes(target), `${path}: broken internal link ${href}`);
  }
}

const missing = await get('/missing-seo-route');
check(missing.response.status === 404, `missing route: HTTP ${missing.response.status}`);
const robotsFile = await get('/robots.txt');
const sitemapFile = await get('/sitemap.xml');
const ogImage = await fetch(`${origin}/opengraph-image`);
check(robotsFile.response.status === 200, 'robots.txt unavailable');
check(sitemapFile.response.status === 200, 'sitemap.xml unavailable');
check(ogImage.status === 200 && (ogImage.headers.get('content-type') || '').includes('image/png'), 'OG image unavailable');
if (indexable) {
  for (const path of routes) check(sitemapFile.body.includes(`${configuredOrigin.replace(/\/$/, '')}${path}`), `sitemap missing ${path}`);
  check(robotsFile.body.includes('sitemap.xml'), 'robots.txt lacks sitemap');
} else check(robotsFile.body.includes('Disallow: /'), 'preview robots.txt should disallow crawl');

if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`SEO smoke passed: ${routes.length} pages, metadata, links, JSON-LD, robots, sitemap, OG image, 404.`);
