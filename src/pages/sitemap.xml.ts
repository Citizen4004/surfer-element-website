import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';
import { getGuides, guidePath, isoDate, updatedOf } from '../lib/guide';

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

export const GET: APIRoute = async ({ site }) => {
  // Published guide posts are added automatically (drafts never are), each
  // with a lastmod taken from its own `updated` date.
  const posts = await getGuides();
  const newest = posts.map((p) => isoDate(updatedOf(p))).sort().at(-1);
  const entries = [
    ...paths.map((p) => ({ loc: p, lastmod: p === '/guide/' ? newest : undefined })),
    ...posts.map((p) => ({ loc: guidePath(p.data.slug), lastmod: isoDate(updatedOf(p)) })),
  ];
  const urls = entries
    .map((e) => `  <url><loc>${new URL(withBase(e.loc), site)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
