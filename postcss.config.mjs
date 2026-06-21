// PostCSS config — runs Tailwind v4 via @tailwindcss/postcss.
// We switched away from @tailwindcss/vite because it depends on an older
// Vite resolveOptions shape that isn't compatible with rolldown-vite
// (the bundler Astro 6 ships). The PostCSS path is the canonical Tailwind
// v4 integration and has no rolldown-vite surface area.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
