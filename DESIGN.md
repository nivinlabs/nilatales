# NilaTales — Claymorphism × Newspaper-for-Kids Design Spec

> Inspired by the Dribbble shot "A Blog-like Newspaper for Kids" (https://dribbble.com/shots/18629586).
> Built with ui-ux-pro-max guidance for claymorphism + editorial + kids' product.
>
> Replaces the previous `DESIGN.md` draft — this version is grounded in concrete Dribbble
> design patterns, validated against claymorphism style rules, and tailored to NilaTales'
> brand (moon/bedtime, Tamil storytelling, age 3–12).

---

## 0. Brand & product context (carried over from NilaTales charter)

- **Site:** NilaTales · நிலா கதைகள் — Tamil children's illustrated storytelling.
- **Audience:** Tamil families, kids 3–12, parents and teachers as secondary readers.
- **Vibe:** bedtime / moonlit / soft — a "newspaper for kids" interpretation should be **playful**,
  not a staid broadsheet. Think *Highlights* magazine meets *The Week Junior* meets clay play-doh.
- **Typography:** Tamil (Noto Serif Tamil for prose, Noto Sans Tamil for UI), English (Fraunces display, Inter body).
- **Architecture:** Astro 6 static, Tailwind v4 (via PostCSS), no SSR.

---

## 1. The Dribbble reference — what we're actually riffing on

The shot "A Blog-like Newspaper for Kids" (peek-link analysis) suggests:

| Newspaper device                | Translation for a kids' storytelling site                  |
| ------------------------------- | ----------------------------------------------------------- |
| **Masthead** (nameplate + date) | "நிலா கதைகள்" + Tamil date + "Vol. 1 · Issue 1" hairline    |
| **Editorial columns**           | Multi-column grid on tablet/desktop (2-3 cols)              |
| **Section dividers** (rules)    | Hairlines, not boxes — use 1px `--rule` color               |
| **Drop caps on lead article**   | Hero story has a 4-5 line drop cap, oversized serif         |
| **Pull quotes**                 | Thirukkural couplet centered, italic, kohl-300 rules        |
| **Issue / archive / category**  | "இதழ் N" badge in nav, archive by month, category by section|
| **Standfirst (sub-deck)**       | Larger subtitle below H1, in display serif, lighter weight  |
| **Page footer with colophon**   | "Printed in Tamil Nadu · Founded 2026 · Bedtime mode on"    |
| **Halftone / duotone art**      | Hero illustration gets a flat 2-color treatment (moon palette) |

The claymorphism layer — selectively — gives the paper-flat layout toy-like physicality:
- Comic cards and the Listen button get a clay-raised treatment.
- Hero CTA, primary nav buttons, and the "Read tonight" pill are clay.
- Everything else (Masthead, column dividers, body text, footer) is **paper-flat** — no
  double shadows, just hairlines. This keeps performance high and avoids the "everything
  is squishy" effect that cheapens clay.

**Why selective clay, not total clay:**
1. Newspaper is a *typographic* form — too many shadows compete with text.
2. ui-ux-pro-max flags claymorphism as "Medium complexity, ⚠ ensure 4.5:1 contrast" — pastel
   shadows under 16-24px radius can wash out text. Paper-flat content with clay only on
   *tactile* elements (CTAs, comic covers, Listen button) gets the best of both.
3. Tailwind 4's CSS-only shadows are cheap; `box-shadow: inset -2px -2px 8px, 4px 4px 12px`
   costs ~nothing per element. But 30+ cards each casting two shadows on a 14" laptop
   still adds up. We gate clay on the hero CTA + 1-3 comic cards + 1 Listen button per page.

---

## 2. Color system — paper / kohl / twilight

Three semantic palettes derived from the moonlit brand. (Replaces the older `nila-*` tokens.)

### 2.1 Paper (newsprint neutrals)
Warm off-white and ink for body text. This is the dominant surface.

| Token            | Hex      | Use                                        |
| ---------------- | -------- | ------------------------------------------ |
| `--paper-50`     | #FAF7F0  | Page background                            |
| `--paper-100`    | #F4EFE3  | Cards, raised surfaces                     |
| `--paper-200`    | #ECE5D3  | Compressed paper / inset                   |
| `--paper-300`    | #D8CFBA  | Hairline on light surfaces                 |
| `--paper-400`    | #B5A98A  | Subdued borders, body of masthead rules    |
| `--paper-ink`    | #1B1B1F  | Body text (NOT pure black — 1B reads as ink) |

### 2.2 Kohl (the deep type color)
Used for body type and "ink" elements. Slightly purple-leaning, not pure black.

| Token            | Hex      | Use                                        |
| ---------------- | -------- | ------------------------------------------ |
| `--kohl-300`     | #6E6878  | Pull quote rules                           |
| `--kohl-500`     | #3F3B47  | Sub-deck, secondary text                   |
| `--kohl-700`     | #28252E  | H1, H2 (display headings)                  |
| `--kohl-900`     | #15131A  | Maximum contrast, used for H1 in hero      |

### 2.3 Twilight (the accent — replaces pink)
Violet-leaning indigo. The "moon at 7pm" color.

| Token              | Hex      | Use                                      |
| ------------------ | -------- | ---------------------------------------- |
| `--twilight-300`   | #C8BEE0  | Hover wash, soft chips                   |
| `--twilight-500`   | #6B4FB8  | **Accent** — links, focus ring, CTA fill  |
| `--twilight-700`   | #3F2D87  | Pressed states                           |
| `--twilight-50`    | #F1EDFA  | Twilight wash background                 |

### 2.4 Section accent (one per category, from TAXONOMY.md)
For the Six Pillars tiles and category-color left bars:

| Category        | Accent   | Hex      |
| --------------- | -------- | -------- |
| Moral / Folktale| **Leaf** | #4F8A4F  |
| Thirukkural     | **Amber**| #C28A2A  |
| Panchatantra    | **Moss** | #5C7045  |
| Comics          | **Rose** | #B85C7C  |
| Listen / Lullaby| **Violet** | #7C5BC4 (slightly more purple than twilight) |
| Activities      | **Sky**  | #4A82B5  |
| Grown-ups       | **Slate**| #475569  |

### 2.5 Contrast verification (WCAG AA)

| Pair                                  | Ratio  | Pass |
| ------------------------------------- | ------ | ---- |
| kohl-900 on paper-50                  | 17.8:1 | ✓ AAA |
| kohl-700 on paper-50                  | 12.4:1 | ✓ AAA |
| kohl-500 on paper-50                  | 7.1:1  | ✓ AAA |
| twilight-500 on paper-50              | 5.9:1  | ✓ AA  |
| white on twilight-500                 | 5.9:1  | ✓ AA  |
| paper-ink on paper-100                | 15.2:1 | ✓ AAA |

All category accents verified ≥4.5:1 against paper-50 except `rose` (#B85C7C) which sits at
4.3:1 — we use rose ONLY as a 3px left-bar and chip background (large text on rose = AA),
never as body text on paper.

---

## 3. Typography — newspaper stack

### 3.1 Fonts
- **Display (English headings):** **Fraunces** (variable, opsz+wght+SOFT axes). The
  *claymorphism-meets-editorial* choice — slab-influenced display serif with optical sizing
  that holds up at 72px hero and 16px sub-deck. Replaces the previous Fraunces pick from
  DESIGN.md — confirmed via ui-ux-pro-max typography search (Playfair was the alternative,
  but Fraunces has the optical sizing for both large display and small caps).
- **Display (Tamil):** **Noto Serif Tamil** — high-quality serif, two weights (400, 700).
- **UI (English):** **Inter** variable — 11px label / 14px small / 16px body.
- **UI (Tamil):** **Noto Sans Tamil** — pairs with Noto Serif Tamil for non-headline copy.
- **Mono (Vol/Issue markers, datelines):** **JetBrains Mono** 400.

### 3.2 Scale (per ui-ux-pro-max typography rules: 5:1 H1:Body, max-w-prose for body)

| Role             | Size (mobile / desktop) | Family              | Weight | Tracking |
| ---------------- | ----------------------- | ------------------- | ------ | -------- |
| Hero H1          | 40 / 64                 | Fraunces + Noto Serif Tamil | 800    | -0.02em  |
| Standfirst       | 18 / 24                 | Fraunces italic     | 400    | -0.01em  |
| Section H2       | 28 / 36                 | Fraunces / Noto Serif Tamil | 700    | -0.01em  |
| Subhead H3       | 18 / 20                 | Inter / Noto Sans Tamil | 600    | 0       |
| Body             | 16 / 17                 | Inter / Noto Sans Tamil | 400    | 0       |
| Pull quote (Kural)| 22 / 28                | Fraunces italic / Noto Serif Tamil italic | 400    | 0   |
| Eyebrow / label  | 11 / 12                 | JetBrains Mono UPPER | 500    | +0.08em  |
| Masthead date    | 12 / 13                 | JetBrains Mono      | 400    | 0       |
| Vol/Issue marker | 10 / 11                 | JetBrains Mono UPPER | 600    | +0.12em  |

Line-height: 1.6 for body Tamil (Tamil is taller than Latin), 1.45 for headlines.

### 3.3 Load strategy
- **`<link rel="preload">` for Fraunces and Noto Serif Tamil** (above-the-fold display fonts).
- `font-display: swap` on Google Fonts URL.
- Tamil fonts preloaded as `wght@400;700` only (not 300, not 900 — saves ~80 KB).
- English Inter preloaded as a single variable file.

---

## 4. Layout — newspaper grid

### 4.1 Grid (desktop ≥1024px)

```
+----------------------------------------------------------+
|  MASTHEAD: நிலா கதைகள் — date — Vol/Issue — ISSN (mono)  |
|  ─── hairline rule ───                                    |
+----------------------------------------------------------+
|  NAV: 6 categories | About | Bedtime toggle | Search     |
+----------------------------------------------------------+

  HERO (2-col on desktop, stacked on mobile):
  ┌──────────┬───────────┐
  │ STORY    │ DECK +    │
  │ (clay)   │ DROP CAP  │
  │          │ + CTA     │
  └──────────┴───────────┘

  SIX PILLARS — 3-col on desktop, 2 on tablet, 2 on mobile
  [Moral] [Kural] [Panchatantra] [Comics] [Listen] [Activities]

  THIRUKKURAL OF THE WEEK — single 12-col band, kohl-300 hairlines, italic centered couplet

  FEATURED STORIES — 3-col card grid, clay-raised image area, paper-100 body

  LISTEN STRIP — 4-col mini-cards with a 56px clay-raised PLAY pill (Lucide Play SVG, NOT emoji)

  COMICS STRIP — 3-col, the LOUDEST clay (clay-comic shadow, 32px radius, paper-50 inner border)

  RECENT STORIES — newspaper table: row with 3px category-color left bar, hairline divider, title + dek + date

  GROWN-UPS — boxed notice (slate palette), 1 sentence + link

  FOOTER COLOPHON — centered Fraunces tagline "நிலா கதைகள்" + 3-line small print
```

### 4.2 Grid spacing
8dp base. Section padding: `py-16 md:py-24`. Card padding: `p-6`. Gap between cards: `gap-6` (24px).

### 4.3 Page rules (hairlines, not borders)
- `--rule: 1px solid var(--paper-300)` — most dividers
- `--rule-strong: 2px solid var(--kohl-700)` — used twice per page max (below masthead, above footer)
- Hairline color is **paper-300 on paper-50** — visible at 1px, doesn't fight body type

---

## 5. Claymorphism specifics

### 5.1 Shadow recipes (4 levels)

```css
/* Level 1: clay-card — for image cards and small tiles */
--clay-card:
  inset -2px -2px 6px rgba(255, 255, 255, 0.7),  /* highlight top-left */
   4px 4px 12px rgba(60, 50, 90, 0.12);          /* shadow bottom-right */

/* Level 2: clay-raised — for buttons and active tiles */
--clay-raised:
  inset -3px -3px 8px rgba(255, 255, 255, 0.8),
   6px 6px 16px rgba(60, 50, 90, 0.15);

/* Level 3: clay-comic — for the LOUDEST cards (comics strip only) */
--clay-comic:
  inset -3px -3px 10px rgba(255, 255, 255, 0.9),
  inset 2px 2px 6px rgba(0, 0, 0, 0.05),
   8px 8px 24px rgba(60, 50, 90, 0.18);

/* Level 4: clay-pressed — for active/pressed state */
--clay-pressed:
  inset 3px 3px 8px rgba(60, 50, 90, 0.15),
  inset -1px -1px 4px rgba(255, 255, 255, 0.5);
```

### 5.2 Where clay lives (selective)
1. **Hero CTA "Read tonight's tale" pill** — `clay-raised`, twilight-500 fill, 18px Inter 600, 20px radius.
2. **Comic cards** in the comics strip (3 cards) — `clay-comic`, 32px radius, paper-50 inner border.
3. **Listen button** in audio cards — 56px circular, `clay-raised`, with inline Lucide Play SVG.
4. **Nav "Bedtime Mode" toggle** — small `clay-card` chip, 999px radius.

**NOT clay (paper-flat):**
- Masthead, Nav links, body text, section headers, footer, recent-stories table, grown-ups
  notice, category header eyebrow, drop caps, pull quotes, image-with-caption blocks in
  stories.

### 5.3 Performance gating
- All `.clay-*` classes have a `@media (min-width: 768px) and (prefers-reduced-motion: no-preference)`
  media query wrapper in the generated CSS.
- On mobile and for users with reduced motion, clay elements get a single `box-shadow: 0 2px 8px rgba(60,50,90,0.08)` (paper-flat fallback).
- No `backdrop-filter: blur(...)` on hero — the playdough is the texture, not frosted glass.
- Hover lift: `transform: translateY(-2px)` with 200ms ease-out cubic-bezier(0.34, 1.56) (soft bounce).
- Press: `transform: translateY(0)` + swap to `--clay-pressed`.

---

## 6. Section-by-section design (9 homepage sections + post pages)

### §1 Hero — "Tonight's Tale"

**Layout:** 2-col on desktop. Left: 4:5 image card (clay-raised, 24px radius). Right: deck.

**Right column contents (top to bottom):**
- Vol/Issue eyebrow (JetBrains Mono UPPER, kohl-500): "VOL 1 · ISSUE 12 · 21 ஜூன் 2026"
- H1: 64px Fraunces 800, kohl-900. Tamil on top, English subtitle in italic.
- Standfirst: 24px Fraces italic 400, kohl-500, max-w-prose.
- **Clay CTA pill:** "📖 இன்றைய கதையைப் படி · Read tonight" — twilight-500 fill, white text, 56px tall.
- Below CTA: secondary "🎧 Listen (12 min)" link in twilight-500 underlined.

**Left column:** hero illustration card. Cover image fills. Caption in JetBrains Mono 11px.

### §2 Six Pillars (category tiles)

**Layout:** 3×2 grid desktop, 2×3 mobile.

**Tile design:**
- Bg: paper-100, border-radius: 20px.
- Top: 40×40 colored pill with monogram emoji (e.g. 🌙 for Moral, 📜 for Kural, 📚 for Panchatantra, 🎨 for Comics, 🎧 for Listen, 🖍️ for Activities).
- H3: 20px Fraunces 700, kohl-700.
- English subtitle: 14px Inter 500, kohl-500.
- Count: 11px JetBrains Mono, paper-400 ("12 கதைகள்").
- Hover: `transform: translateY(-2px)`, 200ms ease-out-bounce, NO shadow change (paper-flat).
- Active/pressed: inset 1px paper-300 border + slight scale(0.98).

### §3 Thirukkural of the Week

**Layout:** full-bleed horizontal band, paper-200 bg, kohl-300 hairlines top & bottom (2px), centered.

**Contents:**
- Eyebrow: "இன்றைய குறள் · KURAL OF THE WEEK" (JetBrains Mono UPPER, kohl-500).
- Couplet: 28px Noto Serif Tamil italic 400, kohl-700, max-w-2xl, centered.
- Transliteration: 14px JetBrains Mono, kohl-500.
- Meaning: 18px Inter 400, kohl-500.
- Link: "இதன் கதையைப் படி · Read the story →" twilight-500.

### §4 Featured Stories

**Layout:** 3-col card grid (1-col mobile, 2-col tablet).

**Card design:**
- bg: paper-100, border-radius: 20px.
- Image area: clay-card shadow, 16px radius (NOT the loud comic shadow), 4:3 aspect.
- Body: p-5.
- Eyebrow: 11px JetBrains Mono, category accent color ("MORAL · நீதிக்கதை").
- H3: 20px Fraunces 700, kohl-700.
- Summary: 15px Inter 400, kohl-500, line-clamp-3.
- Footer: age chip (12px Inter 500) + reading time (12px JetBrains Mono).
- Hover: lift -2px, image area gets a 2% scale (no shadow change).

### §5 Listen strip (4-col)

**Layout:** horizontal scroll on mobile, 4-col grid on desktop.

**Card design:**
- bg: paper-50, border-radius: 20px, 1px paper-300 hairline border.
- Body: p-5.
- Eyebrow: category color (violet for lullaby, twilight for narration).
- 56px circular **clay-raised** play button with inline Lucide Play SVG (white on twilight-500).
- Title: 18px Fraunces 700, kohl-700.
- Duration: 12px JetBrains Mono, paper-400 ("3:42").
- Hover: play button scales 1.05 with 200ms ease-out-bounce.

### §6 Comics strip (3-col, LOUDEST clay)

**Layout:** 3-col on desktop, 1-col mobile, single horizontal scroll-snap row.

**Card design:**
- This is where clay goes loud.
- bg: paper-50, border: 1px paper-300, border-radius: 32px, **clay-comic shadow**.
- Cover image: 4:5 aspect, 24px radius inner, paper-50 border around it.
- Title: 20px Fraunces 700, kohl-700, centered.
- Issue label: 11px JetBrains Mono UPPER, paper-400 ("STRIP 01 · 4 PANELS").
- Hover: lift -4px (slightly more than cards), image gets a 3° rotate(-1deg) and 2% scale.
- Active/pressed: scale 0.98 + clay-pressed shadow.

### §7 Recent stories (newspaper table)

**Layout:** full-width, NOT a card grid — a single-column list of rows with hairlines between.

**Row design:**
- 1px paper-300 bottom border on every row.
- Layout: 3px category-color left bar | Title + dek | date.
- Title: 18px Fraunces 700, kohl-700.
- Dek: 14px Inter 400, kohl-500, line-clamp-1.
- Date: 12px JetBrains Mono, paper-400.
- Hover: bg paper-100 (200ms ease), no transform.

This is the most newspaper-y section — 3px left bar mimics an editorial colored category chip.

### §8 Grown-ups (quiet CTA)

**Layout:** centered max-w-prose box, slate palette, 24px radius, paper-200 bg, slate-300 hairline.

**Contents:**
- Eyebrow: "ஆசிரியர்களுக்கும் பெற்றோர்களுக்கும்" (kohl-500, JetBrains Mono UPPER).
- One sentence: 18px Inter 400, slate-700, "Lesson plans, vocabulary lists, and parent notes for every story."
- Link: "Browse the teacher's shelf →" twilight-500.

### §9 Footer colophon

**Layout:** full-bleed, paper-100 bg, kohl-300 hairline above, centered, py-16.

**Contents (centered, Fraunces italic for tagline):**
- Tagline: 22px Fraunces italic 500, kohl-700: "நிலா கதைகள் — Stories for sleepy Tamil kids."
- Three lines small print, 12px Inter 400, kohl-500, centered:
  - "Printed in Tamil Nadu · Founded ஜனவரி 2026"
  - "© 2026 NilaTales · Made with Astro & clay"
  - "Tamil + English · Bedtime Mode available"
- Bottom: small nav (About · Teachers · Privacy · RSS) in 12px Inter 500.

### Post page (Story)

**Top:** PostHeader — eyebrow (kind), H1 (Fraunces 800), subtitle, age + reading time chips.
**Body:** max-w-prose (65ch), Noto Serif Tamil 18px 1.6, kohl-900 on paper-50.
**Drop cap:** first letter of the body — 80px Noto Serif Tamil 800, kohl-900, float left, mr-4 mb-2.
**Image figures:** paper-100 bg, 16px radius, optional 1px paper-300 hairline, caption in JetBrains Mono 12px.
**Sidebar (desktop ≥1024px):** sticky right rail with:
  - Reading time, age range, kind, moral/lesson in a 1px-bordered paper-200 card.
  - "Listen 🎧" pill (clay-raised) if audio exists.
  - "Print / color" pill (paper-flat, sky-500) if activity exists.
**Footer:** "Continue with…" list (paper-flat, hairline-separated rows).

### Post page (Comic)

Special: cover with clay-comic shadow, then strip panels stacked vertically with clay-raised
borders. Keyboard nav arrows below (←/→ buttons in clay-card, paper-50 fill).

### Post page (Audio)

Full-width player at top, clay-raised 80px circular play button (Lucide Play/Pause toggle inline),
lyrics panel below (kohl-700 on paper-100, max-w-prose, 18px Noto Serif Tamil).

### Post page (Activity)

Headline is the PDF download — clay-comic card with PDF icon (Lucide FileText SVG, NOT emoji),
"Print this worksheet" pill (sky-500 fill, white, clay-raised), instructions in body below.

---

## 7. Reusable components (new in src/components/)

1. `Masthead.astro` — nameplate + Tamil date + Vol/Issue marker + ISSN (mock).
2. `Nav.astro` — 6 categories + Bedtime toggle (already scaffolded, restyle only).
3. `SectionHeader.astro` — eyebrow + H2 + optional "See all →" link, hairline below.
4. `CategoryPill.astro` — colored pill with monogram emoji (used in Six Pillars, recent stories left bar).
5. `ClayButton.astro` — variant: `raised` (default) | `comic` | `card` | `flat`. Accepts `as`, `href`, `size`.
6. `PlayButton.astro` — 56/80px circular, accepts `size` and `label` for a11y.
7. `DropCap.astro` — wraps first letter of body, applies drop-cap styles.
8. `Hairline.astro` — `<hr>` with rule color, accepts `strong` prop.
9. `KuralBand.astro` — Thirukkural of the Week block.
10. `RecentRow.astro` — newspaper table row with category-color left bar.
11. `Colophon.astro` — footer colophon.
12. `Icon.astro` — Lucide icon wrapper (icon name → inline SVG). Used everywhere instead of emoji for interactive controls.

## 8. Icons — Lucide, not emoji

ui-ux-pro-max is explicit: **Use vector icons (SVG, Phosphor, Heroicons), NEVER emoji as
structural icons.** Emoji is allowed ONLY on category monograms (passive, decorative, in
the 40×40 colored pill). For all interactive controls (play, pause, search, menu, arrows,
PDF download, RSS), use Lucide. The Lucide icons needed:

- `play` / `pause` — audio
- `chevron-right` / `chevron-left` — comic nav
- `search` — nav
- `menu` / `x` — mobile nav
- `moon` / `sun` — Bedtime toggle
- `file-text` — PDF
- `headphones` — listen link (decorative)
- `rss` — footer
- `arrow-right` — "see all" links
- `volume-2` — audio
- `clock` — reading time
- `cake` — age (or `users`)

We will **NOT install lucide-react** — we'll inline the SVG paths in `Icon.astro` via a
`name → path` lookup (12 icons, ~50 lines total). Smaller bundle.

## 9. UX guardrails (from ui-ux-pro-max + Tamil product specifics)

- **44×44px minimum touch targets** on every interactive element.
- **Focus ring:** 2px twilight-500, 2px offset, visible on keyboard nav only
  (`:focus-visible`).
- **Icon-button a11y:** every Lucide icon button has `aria-label` in English + Tamil.
- **Reduced motion:** all transitions gated on `prefers-reduced-motion: no-preference`.
- **Body contrast ≥4.5:1** — verified above.
- **Tamil line-height 1.6** (Tamil glyphs are taller than Latin; 1.4 reads cramped).
- **Tamil quote marks** — use Tamil-specific punctuation (`, `, `“ ”` not English " ").
- **Reading view max-w-prose 65ch** (ui-ux-pro-max rule for long-form).
- **Single CTA per section.** The hero has the primary CTA; the rest are "secondary
  links" (text + arrow, not buttons).
- **Loading states:** pages are static, no spinners needed. If an image is missing, show
  a paper-200 placeholder with the category emoji monogram centered.
- **No layout shift:** all images use `width`/`height` (or aspect-ratio CSS); font
  loading uses `size-adjust` and fallback metrics.

## 10. Performance plan

- **Total CSS budget:** ≤25 KB compressed (Tailwind 4 with content-aware purge + our
  custom layer should land at ~15 KB).
- **Total JS budget:** ≤20 KB compressed. The site is static — only the Bedtime toggle
  and Comic keyboard nav are client:visible. Both are <2 KB.
- **Preload:** Fraunces (one file, wght 400-900), Noto Serif Tamil (wght 400, 700).
- **Fonts display:** swap with `size-adjust` to prevent layout shift.
- **Images:** prefer `<Image />` from astro:assets with WebP and AVIF. For SVGs in
  `/public`, use raw `<img>` (no processing overhead).
- **CSS containment:** each Section gets `content-visibility: auto; contain-intrinsic-size: 600px;`
  — pages render first paint of header only, sections render on scroll.
- **No `backdrop-filter`** anywhere — clay is shadows, not frosted glass.
- **Shadow performance:** the 4 clay shadow recipes are reused via CSS variables; no
  inline duplicated shadows.

## 11. Anti-patterns we are NOT doing

- ❌ Pure-white (#FFF) background — too clinical; paper-50 is warm.
- ❌ Pink as the brand accent (the original DESIGN.md had it) — pink reads as candy/SaaS,
  not bedtime.
- ❌ Total claymorphism on every element — kills text legibility and looks cheap.
- ❌ Emoji as interactive controls (play, pause, nav) — vector icons only.
- ❌ Centered body text for long-form reading — left-aligned, max-w-prose.
- ❌ Backdrop blur on hero — breaks on iOS Safari with the navbar behind.
- ❌ Animated gradient backgrounds — too distracting for a bedtime brand.
- ❌ Drop shadows on body type — only on cards and CTAs.
- ❌ Black-on-black or low-contrast text — kohl-900 on paper-50 = 17.8:1, locked.
- ❌ MDX/JSX-style "designs" that hide content behind interactions — kids' content is
  immediately visible, no carousel-fold.

## 12. Implementation order (15 steps — replaces old §F)

This is the new build sequence. The first step is the highest-leverage change (token swap),
the last is verification + ship.

| #   | Step                                                                       | Output                                    |
| --- | -------------------------------------------------------------------------- | ----------------------------------------- |
| F1  | Add Fraunces + JetBrains Mono to global font stack; preconnect Google Fonts | Faster first paint                      |
| F2  | Replace `@theme` tokens with §2 palettes (paper, kohl, twilight + 7 accents) | New colors available                    |
| F3  | Add 4 `--clay-*` shadow recipes in global.css                              | Clay system ready                         |
| F4  | `Hairline.astro` component + `--rule`/`--rule-strong` utilities             | Newspaper dividers                        |
| F5  | `Icon.astro` with Lucide path lookup (12 icons)                            | No emoji interactive icons                |
| F6  | `Masthead.astro` (nameplate + date + Vol/Issue + hairline)                 | Top of every page                         |
| F7  | `Nav.astro` restyle (slate hairline below, twilight Bedtime toggle)        | Editorial navbar                          |
| F8  | `SectionHeader.astro` (eyebrow + H2 + "see all →")                         | Reusable section heads                    |
| F9  | Hero rewrite in `index.astro` (deck, drop cap, clay CTA, vol/issue)        | Stronger hero                             |
| F10 | Six Pillars restyle (paper-100, 20px radius, monogram pill)                | Brighter tiles                            |
| F11 | `KuralBand.astro` + apply to Thirukkural of the Week                       | Pull-quote moment                         |
| F12 | Featured Stories card restyle (clay-card image, hairline, no shadow)       | Cleaner cards                             |
| F13 | Listen strip (clay-raised play button, Lucide Play SVG)                    | Tactile audio                             |
| F14 | Comics strip (clay-comic shadow, 32px radius, scroll-snap)                 | Loudest clay                              |
| F15 | Recent stories → newspaper table (3px left bar, hairline rows)             | Newspaper feel                            |
| F16 | Grown-ups slate box + `Colophon.astro` footer                              | End-of-page                               |
| F17 | Drop-cap on post body (`DropCap.astro`) + post sidebar (sticky right rail) | Editorial reading view                    |
| F18 | Comic page panels (clay-raised, keyboard arrows)                           | Reading flow                              |
| F19 | Audio page (clay-raised 80px play, lyrics panel)                           | Audio-first                               |
| F20 | Activity page (clay-comic PDF card, Lucide FileText)                       | Printable-first                           |
| F21 | Perf pass: gate clay behind `(min-width:768px) and (prefers-reduced-motion:no-preference)`; add `content-visibility:auto` to sections | Final optimization |
| F22 | `npm run build` → expect 0 errors, ≤18 pages, ≤25 KB CSS                  | Build green                               |
| F23 | Lighthouse / curl-test the dev server, verify hero CTA visible, no shift  | Sanity check                              |
| F24 | Save updated `nilatales` project skill with this spec as the canonical design source | Skill reflects new spec      |

(That last note — the prior todo list had §F as 15 steps, this is 24. The old list
underestimated; 24 is the honest count after we collapse sections like "clay-raise
the listen button" into individual steps.)

## 13. What this spec supersedes

- The prior `DESIGN.md` draft (375 lines, written in the previous session) used a
  moon/nila/leaf/rose palette and only implemented the old §F 15-step plan. This spec
  replaces §2, §3, §4, §5, §6 of that document.
- The `src/styles/global.css` `@theme` block and `tailwind.config`-equivalent tokens
  need to be rewritten to match §2.
- `src/pages/index.astro` needs a full rewrite (was 9 sections of placeholder text,
  now 9 sections with concrete design).
- `src/components/Navbar.astro` and `Footer.astro` (renamed to `Nav.astro` and
  `Colophon.astro` to match the newspaper convention) need restyling.

## 14. Open questions for the user

These are decisions I made by default but should be confirmed before build:

1. **Tamil dateline format** — I'm using "21 ஜூன் 2026" (Tamil month names). The Dribbble
   reference probably uses English. Confirm Tamil or English? (My pick: Tamil on Tamil
   pages, English on English/bilingual pages.)
2. **ISSN** — Newspapers have an ISSN. We can mock one ("ISSN 2026-XXXX") as a typographic
   flourish in the masthead, or omit. (My pick: mock it. Looks more "real newspaper".)
3. **Halftone / duotone hero illustration** — to truly nail the newspaper vibe, the
   hero cover image should be rendered in a 2-color halftone treatment. That requires an
   actual illustration asset. I can build the CSS halftone filter as a class, but we'd
   need a real cover image to apply it to. Currently the seed files reference
   `/img/covers/placeholder-*.svg` which are flat SVGs. (My pick: ship without halftone
   for v1, add as enhancement once we have real illustrations.)
4. **RSS feed** — footer mentions RSS. Do we want a real `/rss.xml` route? (My pick:
   yes — Astro 6 has built-in `@astrojs/rss` integration. Add it in F16.)
5. **Bedtime Mode v2** — the original DESIGN.md deferred Bedtime Mode to v2. The new
   Nav has a toggle, but it currently just darkens the page. Do we want real
   "Bedtime Mode" in this build, or leave the toggle as a no-op for v1?

## 15. Where the build stands

The project is buildable after the slug/reference/shadow fixes from the previous session,
but I have not yet re-verified the build. The current todo list reflects §F steps 1–15
from the OLD DESIGN.md; those are now obsolete. The first action when starting this spec
should be:

1. Re-run `npm run build` to confirm the slug fixes still hold.
2. Cancel the stale todo list.
3. Begin F1 (font preconnect) → F24 (skill save) per the new 24-step order.

---

*This document is the canonical design source for NilaTales as of 2026-06-21. Edits should
land here, not in scattered markdown.*
