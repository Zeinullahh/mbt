/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  trailingSlash: false,
  async redirects() {
    const configured = process.env.SITE_URL;
    if (!configured || !/^https:\/\//.test(configured)) return [];
    const primary = new URL(configured).hostname;
    const alternate = primary.startsWith('www.') ? primary.slice(4) : `www.${primary}`;
    if (primary.split('.').length !== 2 && !primary.startsWith('www.')) return [];
    return [{ source: '/:path*', has: [{ type: 'host', value: alternate }], destination: `${configured.replace(/\/$/, '')}/:path*`, permanent: true }];
  }
};

export default nextConfig;
