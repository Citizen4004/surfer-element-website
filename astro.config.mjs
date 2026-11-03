// @ts-check
import { defineConfig } from 'astro/config';

// This site is deployed two ways from the same codebase, and Astro needs to
// know which one at build time:
//  - Project-page preview, before surferelement.com's DNS is pointed at
//    GitHub Pages: https://citizen4004.github.io/surfer-element-website/
//    (served from a subpath — needs `base`).
//  - The real custom domain, once DNS is live and verified in the repo's
//    Pages settings: https://surferelement.com/ (served from root, via the
//    public/CNAME file already in this repo — `base` must be empty).
// Toggled by USE_CUSTOM_DOMAIN, set in .github/workflows/deploy.yml. Flip
// that env var (not this file) once the custom domain is actually live.
const usingCustomDomain = process.env.USE_CUSTOM_DOMAIN === 'true';

// https://astro.build/config
export default defineConfig({
  site: usingCustomDomain ? 'https://surferelement.com' : 'https://citizen4004.github.io',
  base: usingCustomDomain ? '/' : '/surfer-element-website',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fr', 'es', 'it', 'nl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
