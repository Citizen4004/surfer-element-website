import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

// Dynamic so the Sitemap: line always points at wherever this build is
// actually deployed (the GitHub Pages subpath preview or the eventual
// surferelement.com root) — see astro.config.mjs / src/lib/url.ts for why
// that varies by build.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL(withBase('/sitemap.xml'), site);
  const body = `User-agent: *
Allow: /

# AI crawlers — explicitly allowed per config.md ("Allow AI crawlers: Yes")
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: ${sitemapUrl}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
