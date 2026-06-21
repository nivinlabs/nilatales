// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
//
// NilaTales is a fully static site — no SSR, no Node adapter. Output goes to
// dist/ and is uploaded as-is to Hostinger (nilatales.com is hosted there).
// Static is simpler, faster, and Hostinger-friendly.
//
// Tailwind v4 runs via @tailwindcss/postcss (see postcss.config.mjs). We
// avoid @tailwindcss/vite because it depends on an older Vite resolveOptions
// shape that isn't compatible with the rolldown-vite bundler Astro 6 ships.
export default defineConfig({
  site: 'https://nilatales.com',
  integrations: [react(), mdx()],
  build: {
    // Inline small stylesheets (Tamil font subset is small) so first paint
    // doesn't flash unstyled text.
    inlineStylesheets: 'auto',
  },
});
