// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// O repositório deve se chamar "dennysvf.github.io" para o site ficar na raiz.
// Se usar outro nome de repositório, adicione `base: '/nome-do-repo'`.
export default defineConfig({
  site: 'https://dennysvf.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
