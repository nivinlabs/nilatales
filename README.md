# NilaTales · நிலா கதைகள்

> Moon-tales — illustrated Tamil storytelling for children (ages 6–12).

A static Astro site that hosts illustrated moral stories, Thirukkural explanations, Panchatantra fables, comics, lullabies, and printable activities. Sister site to [NitviTalks](https://nitvi.kingspath.in).

**Live**: https://nilatales.com (hosted on Hostinger)
**Repo**: https://github.com/nivinlabs/nilatales

## Stack

- **Astro 6** (static output — no SSR)
- **MDX** for content authoring
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **React 19** islands only where needed (comic reader, audio player)
- **Noto Serif Tamil** + **Noto Sans Tamil** via Google Fonts
- TypeScript strict mode

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # → dist/
npm run preview      # serve dist/ locally
```

## Project structure

```
src/
├── content.config.ts          # 5 content collections (Zod schemas)
├── content/
│   ├── stories/{moral,thirukkural,panchatantra,folktale}/   # prose
│   ├── comics/                 # ordered pages of panels
│   ├── audio/                  # lullabies & narrations
│   ├── activities/             # coloring, worksheets, crafts
│   └── resources/              # teacher guides, parent notes
├── layouts/                    # StoryPost, ComicPost, AudioPost, ActivityPost, ResourcePost
├── pages/
│   ├── index.astro             # homepage (9 sections)
│   ├── stories/, kural/, panchatantra/, comics/, listen/, activities/, grownups/
│   └── [...slug].astro         # universal story dispatcher
├── components/                 # Pillars, KuralCard, ComicReader, AudioPlayer, etc.
└── styles/global.css           # Tailwind v4 + Tamil typography
```

See `TAXONOMY.md` for the full content architecture (collections, routes, schemas, IA).

## Deployment to Hostinger

Domain `nilatales.com` is registered on Hostinger. The site is pure static HTML/JS/CSS.

```bash
npm run build
# zip the dist/ folder and upload via Hostinger file manager, OR
# rsync to your Hostinger public_html via SFTP (see deploy/hostinger.sh).
```

A `deploy/hostinger.sh` helper is included.

## Content authoring

Each post type has a strict Zod schema in `src/content.config.ts`. Required fields will fail the build if missing. See `TAXONOMY.md` §3 for the complete schemas.

Quick example — a Thirukkural story:

```mdx
---
title: "அகர முதல எழுத்தெல்லாம்"
titleEnglish: "A is the first of all letters"
kind: thirukkural
kural:
  number: 1
  adhigaaramNumber: 1
  adhigaaramTamil: "கடவுள் வாழ்த்து"
  paal: aram
  coupletTamil: |
    அகர முதல எழுத்தெல்லாம்
    ஆதி பகவன் முதற்றே உலகு
  transliteration: "akara mutala eḻuttellām āti pakavan muṭaṟṟē ulaku"
  meaningEnglish: "As A is the first of all letters, so the eternal God is first in the world."
themes: [learning, devotion]
ageRange: { min: 7, max: 12 }
readingTimeMin: 5
language: ta
cover: /img/covers/k001.jpg
coverAlt: "A child opening a book under a banyan tree"
summary: "Valluvar's opening couplet, retold as the tale of a village child who discovers letters."
moral: "Beginnings matter — start with reverence."
pubDate: 2026-06-21
featured: true
---

The village of Kanchipuram in the month of Margazhi...
```

## Conventions

- **Author**: always `NilaTales` (the brand is the surface; a child's byline goes in the post body, not frontmatter).
- **Language**: `language: 'ta'` for Tamil-only, `'ta-en'` for bilingual toggle.
- **Images**: stored under `public/img/{covers,illustrations,comics,activities}/`. Cover images are 16:9, ~1600px wide.
- **Accessibility**: `coverAlt` is mandatory on every post.
- **Featured content**: `featured: true` in frontmatter promotes to homepage.

## Related

- **NitviTalks**: https://github.com/nivinlabs/kingspath-nitvi (sister site)
- **Kingspath Academy**: https://kingspath.in
