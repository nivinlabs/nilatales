# NilaTales — Claymorphism Newspaper for Kids

## Design Brainstorm: Dribbble "A Blog-like Newspaper for Kids" + Claymorphism

**Reference:** https://dribbble.com/shots/18629586-A-Blog-like-Newspaper-for-Kids
**Style:** Newspaper editorial layout + Claymorphism (soft 3D, tactile, toy-like)
**Audience:** Tamil children ages 3–12, parents, teachers

---

## 1. CORE CONCEPT

### The Big Idea
A **printed newspaper that came alive in a child's hands** — the pages are soft clay, the headlines squish when you poke them, the comic strips peek off the page with 3D depth. It's not a flat blog; it's a tactile storybook newspaper.

### What the Dribbble Shot Gets Right (interpreted from title + context)
- Newspaper masthead with rule lines, issue numbers, datelines
- Editorial column structure (multi-column grid)
- Kid-friendly color accents on an otherwise paper-like background
- Illustrated story cards instead of photo thumbnails
- Playful navigation that doesn't feel like a navbar

### What Claymorphism Adds
- **Soft 3D depth** — cards appear to lift off the page (inset + outer shadows)
- **Tactile press states** — buttons squish to 0.92 scale on tap
- **Thick borders** (3-4px) — toy-like, chunky, safe
- **Pastel gradients** — gentle color energy, never harsh
- **Spring physics** — bouncy entrances, not linear fades

### What NilaTales Already Has (keep)
- Paper warm neutral palette (newsprint feel)
- 6 pillar category accents (leaf/amber/moss/rose/violet/sky)
- Fraunces display serif (editorial nameplate)
- Clay shadow recipes (card/raised/comic/pressed)
- Newspaper chrome (Vol/Issue, ISSN, dateline, hairline rules)
- Tamil-first typography (Noto Serif/Sans Tamil)

---

## 2. DESIGN TOKENS — Enhanced

### 2.1 Color Palette (current + claymorphism pastels)

**Keep existing newspaper base:**
```
--color-paper-50:  #FAF7F0   (warm newsprint)
--color-paper-100: #F4EFE3   (aged paper)
--color-paper-200: #ECE5D3   (card stock)
--color-paper-300: #D8CFBA   (hairline rules)
--color-kohl-900:  #15131A   (warm ink)
--color-kohl-700:  #28252E   (heading ink)
--color-kohl-500:  #3F3B47   (body ink)
```

**Enhance claymorphism pastels (new):**
```css
/* Claymorphism pastel surfaces — soft, never pure white */
--color-clay-bg:     #F4F1FA   /* cool lavender-white (never #FFFFFF) */
--color-clay-surface: rgba(255, 255, 255, 0.7)  /* glass-clay hybrid */
--color-clay-peach:  #FDBCB4   /* soft peach — warm story accent */
--color-clay-mint:   #B5E8C8   /* fresh mint — activities accent */
--color-clay-lilac:  #DDD0F5   /* gentle lilac — twilight complement */
--color-clay-sky:    #C4DEF0   /* baby blue — listen accent */
--color-clay-butter: #FBE8B6   /* warm butter — kural accent */
```

**Pillar accents — keep but soften for clay:**
```
Current (editorial)          → Claymorphism pastel version
--color-leaf:   #4F8A4F      → bg rgba(79,138,79, 0.15), border rgba(79,138,79, 0.3)
--color-amber:  #C28A2A      → bg rgba(194,138,42, 0.15)
--color-moss:   #5C7045      → bg rgba(92,112,69, 0.15)
--color-rose:   #B85C7C      → bg rgba(184,92,124, 0.15)
--color-violet: #7C5BC4      → bg rgba(124,91,196, 0.15)
--color-sky:    #4A82B5      → bg rgba(74,130,181, 0.15)
```

### 2.2 Typography (enhance for claymorphism)

**Current stack (keep):**
- Display: Fraunces (editorial serif, optical sizing)
- UI: Inter (clean sans body)
- Mono: JetBrains Mono (editorial chrome — Vol/Issue, dateline)
- Tamil Serif: Noto Serif Tamil
- Tamil Sans: Noto Sans Tamil

**Claymorphism enhancement — add rounded display for kid-facing elements:**
```css
/* Baloo 2 — rounded, bubbly, for Tamil/English kid-friendly headings */
/* Used selectively: hero story titles, comic card titles, activity tiles */
--font-rounded: 'Baloo 2', 'Noto Sans Tamil', system-ui, sans-serif;

/* Baloo 2 Tamil variant for Tamil headings */
--font-rounded-ta: 'Baloo 2', 'Noto Sans Tamil', 'Latha', sans-serif;
```

**Font scale (from ui-ux-pro-max claymorphism spec):**
```
Hero title:     48px / lineHeight 52 / letterSpacing -1   (Fraunces Black)
Section title:  32px / lineHeight 38                       (Fraunces Bold)
Card title:     22px / lineHeight 28                       (Baloo 2 Bold)
Body:           16px / lineHeight 24                       (Inter / Noto Sans Tamil)
Eyebrow/mono:   11px / letterSpacing 0.1em                 (JetBrains Mono)
Kid label:      14px / lineHeight 20                       (Baloo 2 SemiBold)
```

### 2.3 Radius Scale (claymorphism-specific)

```css
--radius-pill:    9999px   /* buttons, chips, nav pills */
--radius-button:  1.25rem  /* 20px — chunky clay buttons */
--radius-card:    1.75rem  /* 28px — story cards */
--radius-comic:   2rem     /* 32px — loudest clay (comic strips) */
--radius-outer:   3rem     /* 48px — hero container, section wrappers */
```

### 2.4 Clay Shadow Recipes (enhanced from ui-ux-pro-max)

**Current (keep — good base):**
```css
--clay-card:    inset -2px -2px 6px rgba(255,255,255,0.7),
                4px 4px 12px rgba(60,50,90,0.12);

--clay-raised:  inset -3px -3px 8px rgba(255,255,255,0.8),
                6px 6px 16px rgba(60,50,90,0.15);

--clay-comic:   inset -3px -3px 10px rgba(255,255,255,0.9),
                inset 2px 2px 6px rgba(0,0,0,0.05),
                8px 8px 24px rgba(60,50,90,0.18);

--clay-pressed: inset 3px 3px 8px rgba(60,50,90,0.15),
                inset -1px -1px 4px rgba(255,255,255,0.5);
```

**New additions (from ui-ux-pro-max claymorphism spec):**
```css
/* Thick border variant — toy-like, chunky */
--clay-chunky:  border: 3px solid rgba(255,255,255,0.9),
                inset -3px -3px 8px rgba(255,255,255,0.8),
                6px 6px 16px rgba(60,50,90,0.15);

/* Gradient button — violet to deep violet */
--clay-gradient-btn: background: linear-gradient(135deg, #A78BFA, #7C3AED),
                     box-shadow: var(--clay-raised);

/* Floating blob — decorative background element */
--clay-blob:    filter: blur(40px),
                opacity: 0.15,
                animation: blob-drift 8s ease-in-out infinite alternate;
```

---

## 3. LAYOUT — Newspaper Grid + Clay Cards

### 3.1 Homepage Structure (Dribbble-inspired)

```
┌─────────────────────────────────────────────────────┐
│  MASTHEAD (newspaper nameplate + clay border)       │
│  நிலா கதைகள் · NilaTales                             │
│  VOL 1 · ISSUE 12 · 21 ஜூன் 2026 · ISSN 2026-1247   │
│  ═══════════════════════════════════════════════    │
├─────────────────────────────────────────────────────┤
│  NAV (clay pill bar — sticky, squishy)               │
│  [Stories] [Kural] [Panchatantra] [Comics] [Listen]  │
│  [Activities]                    [About] [🌙 Bedtime] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  HERO — "Tonight's Tale"                             │
│  ┌──────────────┬───────────────────────────┐       │
│  │              │  VOL 1 · ISSUE 12          │       │
│  │  🌙 Clay     │  நிலா ஒளி பகிர்ந்த கதை      │       │
│  │  raised     │  A gentle story for kids    │       │
│  │  story      │  [MORAL] [3-6 yr] [1 min]   │       │
│  │  card       │                             │       │
│  │  (4:5)      │  ┌─────────────────────┐   │       │
│  │              │  │ 📖 Read tonight →    │   │       │
│  │              │  └─────────────────────┘   │       │
│  └──────────────┴───────────────────────────┘       │
│                                                      │
├─────────────────────────────────────────────────────┤
│  PILLARS — 6 clay cards (3-col grid)                 │
│  ┌───────┐ ┌───────┐ ┌───────┐                      │
│  │ 🌙    │ │ 📜    │ │ 📚    │                      │
│  │Stories│ │ Kural │ │Pancha │                      │
│  │ 1 item│ │ 1 item│ │ 1 item│                      │
│  └───────┘ └───────┘ └───────┘                      │
│  ┌───────┐ ┌───────┐ ┌───────┐                      │
│  │ 🎨    │ │ 🎧    │ │ 🖍️    │                      │
│  │Comics │ │Listen │ │Activi │                      │
│  │ 1 item│ │ 1 item│ │Soon   │                      │
│  └───────┘ └───────┘ └───────┘                      │
│                                                      │
├─────────────────────────────────────────────────────┤
│  KURAL OF THE WEEK (centered editorial band)         │
│  ───────────────────────────────────                 │
│        அகர முதல எழுத்தெல்லாம் ஆதி                  │
│        akara mutala eḻuttellām āti                   │
│  ───────────────────────────────────                 │
│  [Read the story →]                                  │
│                                                      │
├─────────────────────────────────────────────────────┤
│  FEATURED STORIES (3-col clay card grid)             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐         │
│  │ [4:3 img] │ │ [4:3 img] │ │ [4:3 img] │         │
│  │ PANCHATAN │ │ THIRUKKUR │ │ MORAL     │         │
│  │ புறாக்கள்  │ │ அகர முதல │ │ Story 3   │         │
│  │ Summary…  │ │ Summary…  │ │ Summary…  │         │
│  │ 3yr 1min  │ │ 3yr 1min  │ │ 3yr 1min  │         │
│  └───────────┘ └───────────┘ └───────────┘         │
│                                                      │
├─────────────────────────────────────────────────────┤
│  LISTEN (4-col clay audio cards)                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │🎵    │ │🎵    │ │🎵    │ │🎵    │               │
│  │ ▶️   │ │ ▶️   │ │ ▶️   │ │ ▶️   │               │
│  │Title │ │Title │ │Title │ │Title │               │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│                                                      │
├─────────────────────────────────────────────────────┤
│  COMICS (horizontal scroll-snap strip)               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  →             │
│  │ 🎨   │ │ 🎨   │ │ 🎨   │ │ 🎨   │                │
│  │Strip │ │Strip │ │Strip │ │Strip │                │
│  │ 01   │ │ 02   │ │ 03   │ │ 04   │                │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│                                                      │
├─────────────────────────────────────────────────────┤
│  FOR GROWN-UPS (clay panel — teacher/parent shelf)   │
│  ┌─────────────────────────────────────────┐        │
│  │ Lesson plans, vocabulary guides…         │        │
│  │ [Browse the teacher's shelf →]           │        │
│  └─────────────────────────────────────────┘        │
│                                                      │
├─────────────────────────────────────────────────────┤
│  ABOUT — mission quote (centered editorial)          │
│  "Every child deserves stories in their mother tongue"│
│                                                      │
├─────────────────────────────────────────────────────┤
│  FOOTER — colophon, links, social, copyright         │
└─────────────────────────────────────────────────────┘
```

### 3.2 Story Page Layout (newspaper article + clay)

```
┌─────────────────────────────────────────────────────┐
│  MASTHEAD (compact) + NAV                            │
├─────────────────────────────────────────────────────┤
│  READING PROGRESS BAR (top, gradient violet)        │
├─────────────────────────────────────────────────────┤
│                                                      │
│  STORY HEADER                                        │
│  [MORAL] category pill                              │
│  நிலா ஒளி பகிர்ந்த கதை                                │
│  When the moon forgot to share her light…           │
│  3-6 yr · 1 min read · 21 ஜூன் 2026                 │
│  ═══════════════════════════════════════            │
│                                                      │
│  Cover image (clay-raised, rounded 28px)            │
│  ┌─────────────────────────────────────┐            │
│  │                                      │            │
│  │         🌙 (illustration)            │            │
│  │                                      │            │
│  └─────────────────────────────────────┘            │
│                                                      │
│  Story body — drop cap, prose-ta, 65ch max          │
│  ┌─────────────────────────────────────┐            │
│  │ அ  long ago, the moon was very      │            │
│  │    shy and kept all her light       │            │
│  │    to herself…                       │            │
│  │                                      │            │
│  │  (multi-column on desktop?)          │            │
│  └─────────────────────────────────────┘            │
│                                                      │
│  Kural band (if related kural)                      │
│  ┌─────────────────────────────────────┐            │
│  │ "குறள் quote"                        │            │
│  └─────────────────────────────────────┘            │
│                                                      │
│  Audio player (clay play button + progress)         │
│  [▶️] ━━━━━━━○━━━━━━━━ 0:32 / 1:24                  │
│                                                      │
│  Next story CTA (clay pill)                         │
│  [Next story →]                                     │
│                                                      │
├─────────────────────────────────────────────────────┤
│  FOOTER                                              │
└─────────────────────────────────────────────────────┘
```

---

## 4. COMPONENT SPECS — Claymorphism Applied

### 4.1 Clay Story Card
```
Visual:
  - Border-radius: 28px (radius-card)
  - Background: paper-100 with 3px white border
  - Shadow: clay-card (inset white + outer soft)
  - Hover: translateY(-2px), shadow deepens
  - Press: translateY(0), clay-pressed (squish)

Structure:
  ┌─────────────────────────┐
  │  [4:3 image area]        │  ← clay-card shadow on image
  │                          │
  ├─────────────────────────┤
  │  [PILL] category         │  ← cat-pill with pastel bg
  │  Story Title (Baloo 2)   │  ← rounded, bold, kid-friendly
  │  Summary text (2 lines)  │  ← Inter, line-clamp-2
  │  [3yr] [1 min read]      │  ← clay chips
  └─────────────────────────┘

Thick border variant (for featured stories):
  border: 3px solid rgba(255,255,255,0.9)
  background: linear-gradient(145deg, #FAF7F0, #F4EFE3)
```

### 4.2 Clay Pill Button (CTA)
```
Visual:
  - Border-radius: 9999px (pill)
  - Background: linear-gradient(135deg, #A78BFA, #7C3AED)
  - Color: white
  - Shadow: clay-raised
  - Press: scale(0.95), clay-pressed, 100ms
  - Hover: gradient shifts to #7C3AED→#5B3FB0
  - Min-height: 52px

Animation:
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 200ms ease-out;
  /* Spring bounce on press release */
```

### 4.3 Clay Nav Pill Bar
```
Visual:
  - Sticky top, z-40
  - Background: paper-100 with 2px bottom border (paper-300)
  - Each nav item: pill-shaped, 44px min-height
  - Active: clay-pressed (inset shadow, looks pushed in)
  - Inactive: flat, text-kohl-500
  - Hover: bg-twilight-50, text-twilight-500

  [Stories] [Kural] [Pancha] [Comics] [Listen] [Activities]
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Each item has Tamil label + English sub-label (current pattern)
```

### 4.4 Clay Audio Card
```
Visual:
  - Border-radius: 20px
  - Background: paper-50 with 3px border (paper-300)
  - Shadow: clay-card
  - Play button: 56px circle, clay-raised, violet gradient
  - Press play: button squishes, clay-pressed

Structure:
  ┌──────────────────────┐
  │  [🎵 LULLABY]  [▶️]  │  ← pill + 56px play button
  │                       │
  │  கண்ணே கூந்தல்         │  ← Baloo 2 bold
  │                       │
  │  — 0:32              │  ← duration, mono
  └──────────────────────┘
```

### 4.5 Clay Comic Strip Card
```
Visual:
  - Border-radius: 32px (loudest clay)
  - Background: paper-50
  - Shadow: clay-comic (triple shadow — inset white + inset dark + outer)
  - Thick border: 3px solid rgba(255,255,255,0.9)
  - Hover: translateY(-4px) rotate(-1deg) scale(1.02) — playful tilt
  - Press: scale(0.98), clay-pressed

Structure:
  ┌──────────────────┐
  │                   │
  │   🎨 (4:5 cover)  │  ← illustration area, rounded-xl
  │                   │
  ├──────────────────┤
  │  STRIP 01         │  ← mono eyebrow
  │  விவேக் & குட்டி   │  ← Baloo 2 bold
  │  Summary…         │
  └──────────────────┘
```

### 4.6 Clay Category Tile (6 Pillars)
```
Visual:
  - Border-radius: 20px
  - Background: paper-100 with border paper-200
  - Shadow: clay-card (subtle)
  - Hover: border-paper-300, translateY(-0.5), 200ms
  - Emoji icon in colored pastel pill (40x40, rounded-xl)

Structure:
  ┌──────────────┐
  │  [🌙]         │  ← 40x40 pastel pill, rgba(color, 0.12)
  │               │
  │  கதைகள்       │  ← Noto Serif Tamil, semibold
  │  Stories      │  ← Inter, xs, muted
  │               │
  │  1 item       │  ← mono, xs, muted, mt-auto
  └──────────────┘
```

### 4.7 Clay Bedtime Toggle
```
Visual:
  - Pill-shaped, 36px height
  - Default: paper-50 bg, kohl-700 text, paper-300 border
  - Active: twilight-50 bg, twilight-500 text, glow shadow
  - Moon icon (SVG, not emoji) + "Bedtime" label
  - Press: clay-pressed

Active state:
  background: linear-gradient(135deg, #1a1a2e, #16213e)
  color: #E8E8F0
  box-shadow: 0 0 20px rgba(107, 79, 184, 0.3)
  /* Dark mode bedtime theme — whole page dims */
```

### 4.8 Floating Clay Blobs (decorative background)
```
Visual:
  - 2-3 large blurred circles
  - Pastel colors (lilac, peach, mint)
  - Slow drift animation (±20px, 8s alternate)
  - opacity: 0.12
  - Behind hero section only (not full page — performance)

  @keyframes blob-drift {
    0%   { transform: translate(0, 0) scale(1); }
    100% { transform: translate(20px, -15px) scale(1.05); }
  }

  @media (prefers-reduced-motion: reduce) {
    .clay-blob { animation: none; }
  }
```

---

## 5. INTERACTION SPECIFICATION

### 5.1 Micro-interactions (from ui-ux-pro-max UX rules)

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Story card hover | hover | translateY(-2px), shadow deepen | 200ms | cubic-bezier(0.34, 1.56, 0.64, 1) |
| Story card press | active | translateY(0), clay-pressed | 100ms | ease-out |
| Comic card hover | hover | translateY(-4px) rotate(-1deg) scale(1.02) | 200ms | spring |
| Comic card press | active | scale(0.98), clay-pressed | 100ms | ease-out |
| CTA button press | active | scale(0.95), clay-pressed | 100ms | ease-out |
| Nav pill active | click | clay-pressed (inset) | 150ms | ease-out |
| Play button press | active | scale(0.92), clay-pressed | 100ms | ease-out |
| Bedtime toggle | click | bg + color transition, glow | 200ms | ease-out |
| Blob drift | continuous | translate ±20px, scale 1.05 | 8s | ease-in-out alternate |

### 5.2 Page Load Animations
```
- Hero section: fade-in + translateY(10px → 0), 400ms ease-out
- Pillars grid: stagger fade-in, 50ms per card, 300ms total
- Featured stories: stagger fade-in, 80ms per card
- All gated behind prefers-reduced-motion: reduce
```

### 5.3 Touch Targets (accessibility)
```
- All buttons: min-height 44px (WCAG)
- Nav items: min-height 44px
- Play buttons: 56px (larger for children)
- Card click areas: full card, not just title
- Comic cards: min-width 260px (scroll-snap)
```

---

## 6. BEDTIME MODE (dark variant)

Claymorphism in dark mode needs special handling (from ui-ux-pro-max: ⚠ Dark adjusted):

```css
.bedtime-active {
  --color-paper-50:  #1a1a2e;      /* deep night sky */
  --color-paper-100: #16213e;      /* card surface */
  --color-paper-200: #0f1626;      /* border */
  --color-paper-300: #1e2a3a;      /* hairline */
  --color-kohl-300:  #8b88a3;      /* muted text */
  --color-kohl-500:  #a8a5bd;      /* body text */
  --color-kohl-700:  #d4d2e0;      /* heading text */
  --color-kohl-900:  #e8e8f0;      /* bright text */
  --color-twilight-50: #2a1f4a;    /* accent surface */
  --color-twilight-500: #9d7ff0;   /* brighter accent for dark */

  /* Clay shadows adjusted for dark — lighter inset, softer outer */
  --clay-card:    inset -2px -2px 6px rgba(255,255,255,0.05),
                  4px 4px 12px rgba(0,0,0,0.3);
  --clay-raised:  inset -3px -3px 8px rgba(255,255,255,0.08),
                  6px 6px 16px rgba(0,0,0,0.4);
  --clay-comic:   inset -3px -3px 10px rgba(255,255,255,0.1),
                  inset 2px 2px 6px rgba(0,0,0,0.15),
                  8px 8px 24px rgba(0,0,0,0.5);
}
```

---

## 7. ANTI-PATTERNS TO AVOID

From ui-ux-pro-max checklist:

- [ ] NO emojis as structural icons — use SVG (Heroicons/Lucide). Emoji allowed ONLY as decorative illustration (🌙 story cover, 🎨 comic)
- [ ] NO muted colors + low energy — kids need vibrancy
- [ ] NO pure white background (#FFFFFF) — use #FAF7F0 or #F4F1FA
- [ ] NO linear easing on press — use spring (cubic-bezier 0.34, 1.56)
- [ ] NO infinite decorative animations — blobs are decorative but slow/ambient, not attention-grabbing
- [ ] NO text contrast below 4.5:1 — especially important for children
- [ ] NO font-layout shift — font-display: swap + similar fallback metrics
- [ ] NO all-elements-animated — max 1-2 animated elements per view (blobs in hero only)
- [ ] NO 3-4px borders on EVERYTHING — reserve thick borders for featured cards and comic strips
- [ ] NO claymorphism on mobile without gating — shadows are expensive, gate behind min-width: 768px

---

## 8. IMPLEMENTATION ROADMAP

### Phase 1: Token + CSS Updates (already partially done)
- [x] Clay shadow recipes in global.css
- [x] Radius scale (4 levels)
- [x] Paper/kohl/twilight palette
- [ ] Add claymorphism pastel surface tokens
- [ ] Add Baloo 2 font for rounded kid headings
- [ ] Add clay-blob keyframe animation
- [ ] Add bedtime-mode dark token overrides

### Phase 2: Component Enhancements
- [ ] Story card: add thick border variant for featured
- [ ] CTA button: change to gradient (violet linear-gradient)
- [ ] Nav: clay-pressed state for active item
- [ ] Comic card: playful hover tilt (rotate -1deg)
- [ ] Audio card: ensure play button has spring squish
- [ ] Bedtime toggle: glow + dark theme CSS variables

### Phase 3: Layout Polish
- [ ] Hero: add floating clay blobs behind
- [ ] Pillars: ensure 3-col grid with clay-card shadows
- [ ] Featured: stagger fade-in on scroll (IntersectionObserver)
- [ ] Comics: scroll-snap with peek hint (gradient mask edges)
- [ ] Story page: drop cap + multi-column body on desktop
- [ ] Reading progress bar: gradient violet

### Phase 4: Interaction Refinement
- [ ] Spring physics on all press states
- [ ] Stagger entrance animations
- [ ] prefers-reduced-motion full compliance
- [ ] Touch target audit (all ≥ 44px)
- [ ] Focus-visible ring audit

### Phase 5: Dark Mode (Bedtime)
- [ ] CSS variable overrides for bedtime-active class
- [ ] Clay shadow adjustments for dark surfaces
- [ ] Test contrast in bedtime mode
- [ ] Smooth transition (200ms) between light/dark

---

## 9. DESIGN SYSTEM SUMMARY

```
STYLE:        Claymorphism Newspaper for Kids
BASE:         Editorial newspaper (rule lines, masthead, columns)
SURFACE:      Soft 3D clay (inset+outer shadows, thick borders, pastel)
MOOD:         Warm newsprint that came alive in a child's hands
PALETTE:      Paper warm neutrals + twilight violet + 6 pillar pastels
TYPOGRAPHY:   Fraunces (display serif) + Baloo 2 (rounded headings) +
              Inter (body) + JetBrains Mono (editorial chrome) +
              Noto Serif/Sans Tamil
RADII:        20px cards · 28px story cards · 32px comic strips · 9999px pills
SHADOWS:      clay-card (subtle) · clay-raised (buttons) ·
              clay-comic (loudest) · clay-pressed (active)
ANIMATION:    Spring physics (cubic-bezier 0.34, 1.56) · 200ms ·
              gated behind prefers-reduced-motion
DARK MODE:    Bedtime Mode — deep night sky + adjusted clay shadows
```

---

*Generated from: Dribbble shot #18629586 "A Blog-like Newspaper for Kids" +
ui-ux-pro-max skill (claymorphism style, kids/education typography, UX rules)*