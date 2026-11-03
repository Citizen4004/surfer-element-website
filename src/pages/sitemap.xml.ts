import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

// Dynamic for the same reason as robots.txt.ts — URLs here must match
// wherever this build is actually deployed. English pages only for now;
// hreflang alternates get added once the other five locales are translated.
const paths = [
  '/',
  '/compare/',
  '/fit-check/',
  '/price-lock/',
  '/houses/surfshub-tamraght/',
  '/houses/cactus-surf-skate-house/',
  '/houses/hakuna-matata/',
  '/about/',
  '/faq/',
  '/contact/',
  '/guide/',
];

export const GET: APIRoute = ({ site }) => {
  const urls = paths
    .map((p) => `  <url><loc>${new URL(withBase(p), site)}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
