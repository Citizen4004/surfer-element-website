// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://surferelement.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fr', 'es', 'it', 'nl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
