# NilaTales — Content Taxonomy & Information Architecture

> நிலா கதைகள் · Moon-Tales · Illustrated Tamil Storytelling for Children (ages 6–12)
>
> Author: design pass for the project root. Mirror stack pattern from `kingspath-nitvi` (Astro 6 + MDX + Tailwind v4) but **diverge intentionally** where storytelling requires it.

---

## 0. First-Principles Reasoning (read this before the rest)

The sister site `kingspath-nitvi` uses a **single content collection** (`blog`) where every post is a markdown tutorial — same shape, same author, same reading pattern. That works because STEM tutorials are structurally homogeneous: title, cover, body, tags. The category (`electronics|coding|...`) is just a routing hint, not a content-type discriminator.

**NilaTales is the opposite.** A Thirukkural explanation (1 couplet → 1 short story → the kural in Tamil script + transliteration), a comic (pages/panels of sequential art), and a teacher guide (lesson plan, vocabulary, discussion questions) share almost no schema. If we force them into one collection with a `type` enum, every layout must branch on `type`, every page must guard every field, and the editor surface becomes a god-field that authors will fill incorrectly.

The right primitive is **one Astro content collection per content shape**, each with a tight, focused Zod schema. Categories become a *cross-cutting tag* (so a single Thirukkural story can appear in "கதைகள்" and "திருக்குறள்" feeds), and a `kind` discriminator keeps each shape pure.

**Brand axis**: "moon-tales" implies softness, calm, bedtime, wonder. Not loud, not gamified, not academic. The taxonomy should *feel* like turning a page under a lamp.

**Audience axis**: 6–12 year olds read, but parents and teachers are the gatekeepers, the searchers, the share-decision-makers. Every content type must serve at least one of: (a) a child's delight, (b) a parent's trust signal, (c) a teacher's classroom utility. If it doesn't, it doesn't ship.

**Language axis**: Tamil is primary and must always render in a proper Tamil web font. English is metadata + optional bilingual toggle. Never the reverse — Tamil-first is the brand promise.

---

## 1. Final Category List (6 public + 1 meta)

Each category maps to a **route**, a **color**, and a **card on the homepage**. The "Content Collection" column lists which underlying collection(s) feed it (see §3 for the discriminator logic).

| # | Tamil | English | Icon | Route | Feeds from | Color | One-line pitch |
|---|---|---|---|---|---|---|---|
| 1 | **கதைகள்** | Moral Stories | 🌙 | `/stories/` | `stories` (kind=`moral`\|`folktale`) | indigo `#6366f1` | Original and classic moral tales, told as bedtime stories. |
| 2 | **திருக்குறள் கதைகள்** | Thirukkural Tales | 📜 | `/kural/` | `stories` (kind=`thirukkural`) | amber `#f59e0b` | One couplet, one short story — Valluvar's wisdom in child-language. |
| 3 | **பஞ்சதந்திர கதைகள்** | Panchatantra Tales | 🦊 | `/panchatantra/` | `stories` (kind=`panchatantra`) | emerald `#10b981` | Animal fables from the classic Sanskrit frame-story. |
| 4 | **நகைச்சுவை** | Comics | 🎨 | `/comics/` | `comics` | rose `#f43f5e` | Illustrated comic strips and graphic stories. |
| 5 | **பாடல்கள் & ஒலிக் கதைகள்** | Lullabies & Audio | 🎵 | `/listen/` | `audio` (type=`lullaby`\|`narration`) | violet `#8b5cf6` | Read-aloud lullabies and narrated stories for car/bedtime. |
| 6 | **வர்ணம் தீட்டு & செயல்பாடுகள்** | Color & Activity | 🖍️ | `/activities/` | `activities` (kind=`coloring`\|`worksheet`\|`craft`) | sky `#0ea5e9` | Printable coloring pages and parent/teacher activity sheets. |
| (meta) | **ஆசிரியர் & பெற்றோர்** | For Grown-ups | 👨‍🏫 | `/grownups/` | `resources` (kind=`teacher-guide`\|`parent-note`\|`glossary`) | slate `#64748b` | Lesson plans, reading guides, vocabulary lists. |

**Why exactly six public, and not more?** Three forces:

1. **Cognitive load on a 7-year-old.** Six tiles fit a 2×3 or 3×2 grid on a phone. Eight doesn't.
2. **The brand is moon-tales, not encyclopedia.** Adding "Science", "History", "Mythology" as siblings dilutes the moon metaphor.
3. **Grown-ups is hidden behind a small footer link**, not on the main tile grid, because children are the heroes of the homepage. Parents/teachers will find it via breadcrumb or the about page — exactly like NitviTalks uses `/about` for the bio.

**Why three "story" categories instead of one "Stories"?** Thirukkural and Panchatantra each have a built-in *taxonomy of source* (kurals 1–1330; tantra 1–5 books of branch-tales) that becomes the natural sub-filter. A generic `/stories/` would lose that — a teacher searching "kural 102" would never find it. The three routes let us anchor dedicated browse pages: `/kural/1/`, `/panchatantra/mithrabheda/`, etc.

**Why comics separate from stories?** Comics are a structurally different beast: ordered panels, page-level images, dialogue bubbles, optional speech-language tags. Folding them into `stories` and adding `panels:` as an optional array is the kind of "god collection" we are explicitly avoiding. Different shape = different collection.

**Why audio and activities separate?** Because their *primary consumption mode* differs. A lullaby's first-class artifact is an MP3/OGG file; a coloring page's is a PDF. Treating them as "stories with an attachment" would mean every story layout has to ask "do I have an audio URL? do I have a PDF?" — and the empty-check branches leak everywhere.

---

## 2. What Lives in Each Category

### 2.1 கதைகள் / Moral Stories (`/stories/`)
- **Content kind**: Original Tamil moral tales and retellings of regional folktales (not from Thirukkural or Panchatantra).
- **Length**: 600–1,500 Tamil words ≈ 4–8 minute read. ~3–5 sequential illustrations.
- **Sub-categorization**: by `theme` tag (kindness, courage, honesty, gratitude, friendship, family, environmental) — surfaced as filter chips on `/stories/`. Theme is a many-to-many tag, not a category.
- **Body shape**: MDX with prose interleaved with `<Illustration>` components. No page/panel structure.

### 2.2 திருக்குறள் கதைகள் / Thirukkural Tales (`/kural/`)
- **Content kind**: One Thirukkural couplet, plus a short illustrated story that dramatizes it.
- **Length**: Story body 400–900 words; total page includes the couplet + transliteration + meaning + moral recap.
- **Sub-categorization**: by **paal** (இயல் — the 133 adhigaarams grouped into three paal: அறம் / பொருள் / இன்பம்). URL pattern: `/kural/<adhigaaram-number>/<kural-number>/`. Also tagged by **theme**.
- **Mandatory frontmatter**: `kural.number` (1–1330), `kural.adhigaaram` (Tamil), `kural.adhigaaramNumber` (1–133), `kural.paal` (enum), `kural.coupletTamil`, `kural.transliteration`, `kural.meaningEnglish`.
- **Why this richness matters**: teachers search by kural number constantly. A teacher planning "Week 3: Aram" must be able to bookmark `/kural/1/`. If we only have `/stories/the-honest-woodcutter/`, we lose the entire curriculum-aligned discoverability that makes this category *useful* and not just *charming*.

### 2.3 பஞ்சதந்திர கதைகள் / Panchatantra Tales (`/panchatantra/`)
- **Content kind**: Fables from the five tantras — மித்ரபேத (Loss of Friends), மித்ரலாப (Gaining Friends), காகோலூகியம் (Crows & Owls), லப்தப்ரணாம (Loss of Gains), அபதித்யுத (Ill-considered Action).
- **Length**: 500–1,200 words. Often shorter than moral stories because the moral is already in the frame-story.
- **Sub-categorization**: by `tantra` (enum of 5) and `frame-tale` (the outer story that contains the inner fable, e.g., "The War of Crows and Owls"). URL pattern: `/panchatantra/<tantra-slug>/<frame-tale-slug>/`.
- **Why the tantra frame matters**: Panchatantra's genius is *embedded narrative*. A flat `/stories/` grid erases that pedagogy. Surfacing the tantra lets a child browse "all fables from Crows & Owls" — which is how the original book is actually organized.

### 2.4 நகைச்சுவை / Comics (`/comics/`)
- **Content kind**: Comic strips and graphic stories (1–10 pages typically).
- **Length**: Word count is meaningless; pages are the metric. 1–10 pages, 2–6 panels per page.
- **Sub-categorization**: by `format` (`strip` for 1–2 pages, `serial` for ongoing multi-part, `oneshot` for a complete 4–10 page story) and by `humor-tag` (silly, mischief, school-life, fantasy, family).
- **Body shape**: an **ordered list of pages**, each page being an **ordered list of panels**. Each panel can carry optional dialogue text and a small alt-text description.
- **Layout**: a `<ComicReader>` Astro/React island that renders page-by-page with arrow-key navigation, last-page/next-page buttons, and a panel-zoom on click. The reader is shared by all comics — so the content collection should expose the pages array and the reader component should be layout-aware.
- **Why not just "stories with images"**: comics need *reading order*, *panel-level alt text for accessibility*, and *page-level images that are not re-flowable*. The schema is genuinely different.

### 2.5 பாடல்கள் & ஒலிக் கதைகள் / Lullabies & Audio (`/listen/`)
- **Content kind**: Two sub-kinds:
  - `lullaby` — short Tamil lullaby (தாலாட்டு) with melody/lyrics, sheet-image optional.
  - `narration` — a narration track of an existing story (links back to the story it narrates).
- **Length**: 1–4 minutes audio. Lullabies are the dominant type; narrations are an enhancement, not a separate primary category.
- **Sub-categorization**: by `type` (lullaby|narration) and by `mood` (calm, playful, lullaby). Optional `linkedStory` ref into the `stories` collection.
- **Why this matters for the brand**: the "moon" metaphor is most powerful at bedtime. A child cannot read a story at 9pm in the dark; they *can* press play. This category is what makes NilaTales a nightly ritual, not just a reading site.

### 2.6 வர்ணம் தீட்டு & செயல்பாடுகள் / Color & Activity (`/activities/`)
- **Content kind**: Three sub-kinds:
  - `coloring` — printable coloring page derived from a story's illustration (PDF + low-ink preview PNG).
  - `worksheet` — vocabulary match-up, sequencing, fill-in-the-blanks tied to a story.
  - `craft` — a hands-on activity (paper boat, kolappai mask, etc.) with printable template.
- **Length**: 1 printable artifact per entry. Always linked back to the story it serves.
- **Why this matters for grown-ups**: this is the single biggest trust signal for parents and teachers. It transforms NilaTales from "a reading site" into "a learning ecosystem." A teacher can print one worksheet per child per week and have a curriculum.
- **Sub-categorization**: by `kind` (coloring|worksheet|craft) and by `linkedStory` ref.

### 2.7 (Meta) ஆசிரியர் & பெற்றோர் / For Grown-ups (`/grownups/`)
- **Content kind**: Three sub-kinds:
  - `teacher-guide` — full lesson plan (objective, vocabulary, pre-reading, discussion questions, extension activity, assessment).
  - `parent-note` — short "how to read this with your child" companion piece.
  - `glossary` — Tamil↔English word list for a story or theme.
- **Sub-categorization**: by `kind` (teacher-guide|parent-note|glossary) and by `linkedStory` ref.
- **Why it's hidden from the homepage grid**: children are the heroes; grown-ups are the support staff. Surfacing it in the main tile row would shift the site's emotional tone from "story-time" to "study-time." A small 👨‍🏫 link in the footer and a single CTA on the homepage ("For parents & teachers →") is the right prominence.

---

## 3. Frontmatter Schemas (TypeScript / Zod)

These are the contract authors write against. Every field is opinionated and present for a reason — explained inline.

### 3.1 `stories` collection (modes: moral | thirukkural | panchatantra | folktale)

```ts
// src/content.config.ts
import { glob } from 'astro/loaders';
import { defineCollection, z, reference } from 'astro:content';

const kindEnum = z.enum(['moral', 'thirukkural', 'panchatantra', 'folktale']);
const paalEnum  = z.enum(['aram', 'porul', 'inbam']);

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: ({ image }) => z.object({
    // ---------- Identity ----------
    title:           z.string(),                                  // primary Tamil title (or Tamil + English if bilingual)
    titleEnglish:    z.string().optional(),
    subtitle:        z.string().optional(),                       // a poetic sub-line for hero

    // ---------- Classification ----------
    kind:            kindEnum,                                   // drives which sub-site renders this
    themes:          z.array(z.string()).default([]),            // kindness, courage, honesty ...
    tags:            z.array(z.string()).default([]),
    audience:        z.enum(['kids', 'family', 'classroom']).default('kids'),

    // ---------- Source / provenance ----------
    // Optional because moral/folktale are original; required for thirukkural & panchatantra.
    source: z.discriminatedUnion('kind', [
      z.object({ kind: z.literal('moral'),       originalAuthor: z.string().optional() }),
      z.object({ kind: z.literal('folktale'),    region: z.string().optional(), attribution: z.string().optional() }),
      z.object({ kind: z.literal('thirukkural'), kural: kuralRef }),
      z.object({ kind: z.literal('panchatantra'),panchatantra: panchatantraRef }),
    ]).optional(),

    // ---------- Reading meta ----------
    ageRange:        z.object({ min: z.number().int().min(3).max(18), max: z.number().int().min(3).max(18) }),
    readingTimeMin:  z.number().int().positive(),                // minutes, computed at write-time by an editor script
    difficulty:      z.enum(['easy', 'medium', 'hard']).default('easy'),
    language:        z.enum(['ta', 'ta-en']).default('ta'),       // 'ta-en' = bilingual toggle

    // ---------- Visuals ----------
    cover:           image(),                                    // 16:9 hero illustration
    coverAlt:        z.string(),                                 // mandatory — accessibility
    illustrations:   z.array(z.object({
      src:    image(),
      alt:    z.string(),
      caption: z.string().optional(),
    })).default([]),

    // ---------- Editorial ----------
    summary:         z.string(),                                 // 1–2 sentence pitch (used in cards & meta description)
    moral:           z.string().optional(),                      // explicit moral line; surfaced as a pull-quote
    author:          z.string().default('NilaTales'),
    pubDate:         z.coerce.date(),
    updatedDate:     z.coerce.date().optional(),
    draft:           z.boolean().default(false),
    featured:        z.boolean().default(false),                 // homepage hero rotation

    // ---------- Cross-links ----------
    related:         z.array(reference('stories')).default([]),
    audioNarration:  reference('audio').optional(),
    activity:        reference('activities').optional(),
    teacherGuide:    reference('resources').optional(),
  }),
});

const kuralRef = z.object({
  number:               z.number().int().min(1).max(1330),
  adhigaaramNumber:     z.number().int().min(1).max(133),
  adhigaaramTamil:      z.string(),
  paal:                 paalEnum,
  coupletTamil:         z.string(),                              // both lines, Tamil script
  transliteration:      z.string(),                              // ISO 15919 or IAST — pick one and document it
  meaningEnglish:       z.string(),
});

const panchatantraRef = z.object({
  tantra:    z.enum(['mithrabheda', 'mithraLaapa', 'kaakolookiyam', 'labdhapraNasham', 'apadhitthudai']),
  tantraTamil: z.string(),                                       // மித்ரபேதம் etc.
  frameTale:   z.string(),                                       // e.g. "The Doves and the Hunter"
  frameTaleTamil: z.string(),
  innerTaleTitle: z.string().optional(),
});
```

**Why these choices**:

- **`source` is a discriminated union, not a flat optional object.** Because the moment you have `kural: { number: 1 }` on a `moral` story, your schema is lying. Discriminated unions make it impossible.
- **`audience` defaults to `kids`, not `family`.** Because the default *is* the brand. If you have to mark a story as "for grown-ups", that's an editorial signal — make it explicit.
- **`coverAlt` is required.** Illustrations-without-alt are the #1 accessibility failure on kids' sites. Make it impossible to publish a story without describing its hero image.
- **`language: 'ta' | 'ta-en'`** lives at the post level, not the site level, because we may want to publish a story Tamil-only first and add English later.
- **`featured` and `draft` are boolean flags at the root**, not booleans on a status field, because boolean checks in `.filter()` are the cleanest possible pattern (see `kingspath-nitvi/src/pages/index.astro` line 5).

### 3.2 `comics` collection

```ts
const comics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comics' }),
  schema: ({ image }) => z.object({
    title:        z.string(),
    titleEnglish: z.string().optional(),
    format:       z.enum(['strip', 'oneshot', 'serial']),
    series:       z.string().optional(),                         // for serials: e.g. "விவேக் & குட்டி" episode 3
    episode:      z.number().int().positive().optional(),
    humorTags:    z.array(z.enum(['silly', 'mischief', 'school', 'fantasy', 'family'])).default([]),
    themes:       z.array(z.string()).default([]),

    ageRange:        z.object({ min: z.number().int(), max: z.number().int() }),
    readingTimeMin:  z.number().int().positive(),
    language:        z.enum(['ta', 'ta-en']).default('ta'),

    cover:       image(),
    coverAlt:    z.string(),

    // The core differentiator from stories: ordered pages of ordered panels.
    pages: z.array(z.object({
      pageNumber:  z.number().int().positive(),
      image:       image(),
      imageAlt:    z.string(),                                   // describes the whole page for screen readers
      panels: z.array(z.object({
        index:     z.number().int().nonnegative(),
        dialogue:  z.string().optional(),                        // Tamil text in the bubble
        sfx:       z.string().optional(),                        // sound effect: "டபாஸ்!"
        alt:       z.string(),                                  // per-panel alt — required for accessibility
      })).min(1),
    })).min(1),

    characters: z.array(z.object({                               // cast list — for the cast page
      name:    z.string(),
      species: z.string().optional(),
      desc:    z.string().optional(),
    })).default([]),

    summary:     z.string(),
    moral:       z.string().optional(),
    author:      z.string().default('NilaTales'),
    illustrator: z.string().optional(),                          // separate credit when author ≠ illustrator
    pubDate:     z.coerce.date(),
    draft:       z.boolean().default(false),
    featured:    z.boolean().default(false),

    related:     z.array(reference('stories')).default([]),
  }),
});
```

**Why the comic schema is the most elaborate**: because comics are the easiest type to publish badly. Pages without page numbers break reading order; panels without alt text lock out screen-reader users (and Tamil-language screen readers are scarce, so the text content in `dialogue` is doubly important); a `cast` list lets us build a `/characters/` page later — a feature that costs nothing to add now and is expensive to retrofit.

### 3.3 `audio` collection

```ts
const audio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/audio' }),
  schema: ({ image }) => z.object({
    title:        z.string(),
    titleEnglish: z.string().optional(),
    type:         z.enum(['lullaby', 'narration', 'song']),
    mood:         z.enum(['calm', 'playful', 'lullaby', 'energetic']).default('calm'),
    durationSec:  z.number().int().positive(),                   // 60–240 typical
    lyrics:       z.string().optional(),                         // for lullabies/songs
    lyricsTransliteration: z.string().optional(),
    lyricsEnglish: z.string().optional(),

    audioFile:    z.string(),                                    // /audio/<slug>.mp3 — required, not image() because we host raw audio
    cover:        image().optional(),
    coverAlt:     z.string().optional(),

    // Narration-only: the story this narration belongs to.
    narrationOf:  reference('stories').optional(),

    ageRange:        z.object({ min: z.number().int(), max: z.number().int() }),
    language:        z.enum(['ta', 'ta-en']).default('ta'),
    pubDate:         z.coerce.date(),
    draft:           z.boolean().default(false),
    related:         z.array(reference('stories')).default([]),
  }),
});
```

### 3.4 `activities` collection

```ts
const activities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' }),
  schema: ({ image }) => z.object({
    title:         z.string(),
    titleEnglish:  z.string().optional(),
    kind:          z.enum(['coloring', 'worksheet', 'craft']),
    ageRange:      z.object({ min: z.number().int(), max: z.number().int() }),
    difficulty:    z.enum(['easy', 'medium', 'hard']).default('easy'),
    durationMin:   z.number().int().positive(),                  // how long the activity takes

    // Downloadable artifact (PDF preferred, image fallback).
    pdf:           z.string().optional(),                        // /activities/<slug>.pdf
    previewImage:  image().optional(),                           // low-ink / on-screen preview

    materials:     z.array(z.string()).default([]),              // for craft: "paper, scissors, glue"
    instructions:  z.string(),                                   // MDX body — can include steps, illustrations
    instructionsEnglish: z.string().optional(),

    linkedStory:   reference('stories'),                         // every activity must be tied to a story
    related:       z.array(reference('stories')).default([]),
    pubDate:       z.coerce.date(),
    draft:         z.boolean().default(false),
  }),
});
```

### 3.5 `resources` collection (grown-ups only — `/grownups/`)

```ts
const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: ({ image }) => z.object({
    title:         z.string(),
    kind:          z.enum(['teacher-guide', 'parent-note', 'glossary']),
    ageRange:      z.object({ min: z.number().int(), max: z.number().int() }),
    linkedStory:   reference('stories').optional(),              // for guides tied to one story; null for general "How to use NilaTales"

    // Teacher-guide-specific (optional, surfaced when kind='teacher-guide'):
    objectives:    z.array(z.string()).default([]),
    vocabulary:    z.array(z.object({ tamil: z.string(), english: z.string(), transliteration: z.string().optional() })).default([]),
    preReading:    z.string().optional(),
    discussion:    z.array(z.string()).default([]),
    extensionActivity: z.string().optional(),
    assessment:    z.string().optional(),

    // Parent-note-specific:
    readingTips:   z.array(z.string()).default([]),
    conversationPrompts: z.array(z.string()).default([]),

    summary:       z.string(),
    pubDate:       z.coerce.date(),
    draft:         z.boolean().default(false),
  }),
});

export const collections = { stories, comics, audio, activities, resources };
```

---

## 4. Content Collection Structure (file-system layout)

```
src/
└── content/
    ├── config.ts                    ← single source of truth, mirrors §3
    ├── stories/
    │   ├── moral/
    │   │   ├── the-honest-woodcutter.mdx
    │   │   └── why-the-moon-has-shadows.mdx
    │   ├── thirukkural/
    │   │   ├── k001-agam.mdx        ← kural #1, அகர முதல ...
    │   │   ├── k002-agam.mdx
    │   │   └── ...
    │   ├── panchatantra/
    │   │   ├── mithrabheda-the-doves-and-the-hunter.mdx
    │   │   └── ...
    │   └── folktale/
    │       ├── kovalan-and-kannagi.mdx
    │       └── ...
    ├── comics/
    │   ├── vivek-and-kutti-strip-01.mdx     ← format='strip'
    │   ├── the-moon-bakery-oneshot.mdx
    │   └── vivek-and-kutti-serial-ep03.mdx  ← format='serial'
    ├── audio/
    │   ├── lullaby-kanne-koonthal.mdx       ← type='lullaby'
    │   └── narration-honest-woodcutter.mdx  ← type='narration', narrationOf='...'
    ├── activities/
    │   ├── coloring-moon-bakery.mdx
    │   ├── worksheet-doves-and-hunter.mdx
    │   └── craft-paper-kolappai.mdx
    └── resources/
        ├── teacher-guide-k001.mdx
        ├── parent-note-using-nilatales.mdx
        └── glossary-animal-fables.mdx
```

**Why sub-folders inside `stories/`?** Because `kind` is a discriminator and Astro's `glob` loader uses directory structure for nothing by default — but humans do. An author opening the project tree should be able to find "all Thirukkural stories" by intuition, not by querying the frontmatter. The route `/kural/` is generated independently from the `kind === 'thirukkural'` filter (see §6); the sub-folder is purely for human navigability.

**Why five collections, not one?** Re-asserted for clarity:

| Discriminator | Collection | Why separate |
|---|---|---|
| Linear prose + illustrations | `stories` | Most stories share the same shape regardless of `kind`. |
| Ordered pages of panels | `comics` | `pages: [{ panels: [...] }]` is a unique shape. |
| Audio file is the primary artifact | `audio` | The whole page is an `<audio>` element with optional lyrics. |
| Downloadable artifact is the primary artifact | `activities` | The page is a print/save flow, not a read. |
| Editorial layer for grown-ups | `resources` | Hidden route; different author surface; rarely mixed with kids' content. |

**Why no `pages` collection?** A common temptation is "let every category be its own collection." That explodes when you want to cross-tag a story across themes, ages, or series — collections don't compose. Keep collections by *shape* and use frontmatter enums + reference fields for *cross-cutting relationships*.

---

## 5. Five Additional Content Types I'd Recommend

These are *not* in your original 4–5 list. I'm adding them because they directly serve the brand promise of "moon-tales as a nightly ritual" and the audience of "children + their teachers". Each is justified below — I would not have proposed any without a clear reason.

### 5.1 📜 **Thirukkural of the Week** (திருக்குறள் வாரம்)
**Not a new category** — a curated slice of `stories` (kind=`thirukkural`). Surface one kural per week on the homepage hero with a "Read this week's kural" CTA. *Why*: gives the site a reason to be revisited daily/weekly. Children and teachers love a ritual; this is the single highest-leverage retention mechanic. Implementation: a `featuredKuralOfWeek` field or a date-driven query in the homepage hero.

### 5.2 🌙 **Bedtime Mode** (தூக்க நேரம்)
**Not a new collection** — a site-wide presentation layer. A single `/bedtime/` route or a top-bar toggle that:
- Dims the chrome to deep indigo
- Renders text in a larger, extra-legible Tamil font
- Surfaces tonight's lullaby + a short kural + a 5-minute story
- Auto-plays the lullaby after 30 seconds

*Why*: the "moon" metaphor is literally nighttime. This feature makes the metaphor operational. It also gives parents a "calm-down" destination that's distinct from the daytime reading site.

### 5.3 🗺️ **Tamil Nadu Folktale Map** (நாட்டுப்புற கதை வரைபடம்)
**New collection `map-pins`** (kind=`place`). Each pin links to a folktale set in that region (Madurai, Chettinad, Kongu Nadu, etc.) with a small illustration of the place and the stories that originate there. *Why*: Tamil regional identity is *deeply* part of Tamil cultural pride for parents/teachers. A flat "Folktales" folder gives them no sense of geography; a map turns the folktale section into a cultural artifact. Implementation cost: low (a single SVG map + pinned links), but brand value is high.

### 5.4 👩‍🏫 **Teacher's Companion** (ஆசிரியர் துணை)
Already partly covered by `resources` (kind=`teacher-guide`). I'd expand it to include **weekly lesson plan bundles** (a `kind: 'lesson-bundle'` variant) — one MDX entry that aggregates 5 stories + 5 activities + 1 worksheet around a theme (e.g. "Week of Honesty"). *Why*: this is the feature that turns a curious parent visiting once into a school subscribing to the site. If even one school in Tamil Nadu adopts NilaTales as a weekly resource, the SEO and word-of-mouth snowball begins.

### 5.5 🎨 **Coloring-Printable Companion** (already in §3.4, but worth elevating)
I am *not* recommending a separate "coloring pages" collection — I'm recommending that **every story automatically gets a coloring page**. Editorial rule: when you publish a story in `stories`, you *must* also publish one `activities` entry with `kind: 'coloring'` and `linkedStory: <this story>`. Enforcement is a build-time check in `content.config.ts` (a Zod `superRefine` on the `stories` schema) or an admin-only lint rule. *Why*: it's the smallest thing that doubles the practical utility of every story. Coloring is also the most photocopier-friendly feature for low-resource classrooms.

*(If I had to pick one to defer: the map. It's the highest effort and the lowest priority for the first 50 stories. Defer to month 6.)*

---

## 6. Homepage IA — what sections appear, in what order

Mirror the structural rhythm of `kingspath-nitvi/src/pages/index.astro` (Hero → Pillars → Featured → Recent → About), but adapt for storytelling. Justifications follow each section.

### Section 1 — Hero: "Tonight's Tale" (tonight's story)
- Hero illustration (large, full-width, soft moonlight gradient)
- Big Tamil title + small English subtitle
- One-line summary in Tamil
- Primary CTA: **"படிக்க / Read"** → links to tonight's featured story
- Secondary CTA: **"🎵 ஒலி கேட்க / Listen"** → links to tonight's lullaby (Bedtime Mode handoff)
- Tag row: `age 7–10 · 5 min · 🌙 moral`
- **Why**: a single page should never offer 5+ choices at the top. The hero is one story. Mirrors NitviTalks' hero but with *one* CTA emphasis, not three competing ones.

### Section 2 — Six Pillars (category tiles)
- 2×3 grid on desktop, single column on mobile.
- Each tile: emoji icon + Tamil name + English alt + one-line description + post count.
- Tiles route to `/stories/`, `/kural/`, `/panchatantra/`, `/comics/`, `/listen/`, `/activities/`.
- A small 👨‍🏫 "For parents & teachers" footer-link *below* the grid leads to `/grownups/`.
- **Why 6, not 4 or 8**: see §1. **Why a grid and not a carousel**: children don't swipe; they tap. A grid also gives every category equal visual weight — important because Tamil, comics, and lullabies should not feel "secondary" to each other.

### Section 3 — "Thirukkural of the Week" (highlight strip)
- A wide horizontal card with the kural in Tamil script, a small illustration, and "Read the story →".
- Pulls the most recent `stories` entry with `kind: 'thirukkural'` and `featured: true`.
- **Why**: makes the kural collection feel *living* and *revisited*, not just an archive. Also: this is the single most shareable artifact for Tamil cultural pride on social media.

### Section 4 — Featured Stories (3 cards)
- Mirrors NitviTalks' `featured` section exactly.
- Picks `posts.filter(p => p.featured)` across all collections, OR `posts.slice(0, 3)` after sorting by date (mirror NitviTalks' simpler approach to start).
- **Why**: editorial control matters; `featured: true` in frontmatter is a non-negotiable editorial primitive.

### Section 5 — Listen / Lullabies strip
- Audio-first section: cover image, ▶ button, title, duration.
- 3–4 entries from the `audio` collection, prioritizing `type: 'lullaby'`.
- **Why**: this section exists to teach the visitor that NilaTales has an audio dimension. Many visitors won't scroll past the pillars; surfacing it here (before "Recent") makes sure they at least *know* it exists.

### Section 6 — Comics Strip (visual section)
- 3 comic covers side-by-side with the "Read comic →" CTA.
- Distinct from featured stories so comics don't get drowned out by prose.
- **Why**: comics are the most visually distinctive content type; giving them their own section signals "we make comics, not just illustrated prose."

### Section 7 — Recent Stories (compact list)
- Last 8–12 posts across all story-shaped collections, compact row format.
- Mirrors NitviTalks' recent section verbatim.
- **Why**: this is the "what's new" feed. It's not glamorous but it's what returning visitors actually want.

### Section 8 — For Grown-ups (single quiet CTA card)
- A small section with a single CTA: **"ஆசிரியர்களுக்கும் பெற்றோர்களுக்கும் →"** linking to `/grownups/`.
- Mentions teacher guides, lesson plans, and printable worksheets.
- **Why**: children are the homepage's primary audience; parents and teachers get one quiet, dignified entry point — not a competing section. This matches NitviTalks' "About" closing section in tone and prominence.

### Section 9 — Closing "About NilaTales" (1 paragraph + footer link)
- Mirrors NitviTalks' closing About section.
- One paragraph: who makes this, why it exists, what's the moon-metaphor about.
- Links to a fuller `/about` page.

---

## 7. Routes Map (final)

```
/                       Homepage (§6)
/stories/               All stories (kind=moral|folktale default filter)
/kural/                 All Thirukkural stories
/kural/<adhigaaram>/    Stories in one adhigaaram (e.g. /kural/1/)
/kural/<adhigaaram>/<kural>/  One kural story (e.g. /kural/1/1)
/panchatantra/          All Panchatantra stories
/panchatantra/<tantra>/ All fables in one tantra
/comics/                All comics (filter by format)
/comics/<slug>/         One comic
/listen/                All audio
/listen/<slug>/         One audio entry (with player)
/activities/            All activities (filter by kind)
/activities/<slug>/     One activity (with download)
/grownups/              All resources
/grownups/<slug>/       One resource
/stories/<slug>/        One story (universal story reader — dispatches by `kind`)
                       ┌ moral/folktale   → prose reader with illustrations
                       ├ thirukkural      → couplet-block + prose
                       └ panchatantra     → tantra/context-block + prose
/comics/<slug>/         ComicReader (§3.2)
/about                  About page
/characters/            (future) all comic characters
```

**Why a single `/stories/<slug>/` route dispatches by `kind`**: because for *prose stories*, the layout difference between moral, thirukkural, and panchatantra is small (a header block changes — couplet card or tantra context card). Splitting into three route templates is over-engineering for a v1. Comics and audio *do* get separate routes because their layout is genuinely different (page-by-page reader, audio player).

---

## 8. What I Explicitly Reject (and why)

- **❌ One mega-collection with a `type` discriminator.** See §0. The moment you have `kind: z.enum([...])` and 80% of fields are optional/conditional, the schema is lying.
- **❌ A "Mythology" sibling category.** Mythology belongs as a *theme tag* under folktales (kovalan-kannagi is mythology AND a folktale). Making it a sibling forces a categorization that Tamil parents themselves don't agree on.
- **❌ A "Poems" or "Rhymes" category separate from Lullabies.** Lullabies *are* Tamil children's first poems. Folding them under one `audio` entrypoint keeps the bedtime metaphor intact.
- **❌ Tagging authors prominently.** NilaTales is the author surface; the child's name (when they're credited) goes in the post body, not the frontmatter. Keep the brand singular.
- **❌ Comments / ratings / user accounts.** Children. No. Not on the architecture. (If needed later, it's a separate concern.)

---

## 9. Open Questions for You

1. **Thirukkural transliteration scheme**: ISO 15919 (more accurate) or IAST (more readable for diaspora)? Pick one and document it. I went with ISO 15919 above but it's a real choice.
2. **Font**: which Tamil web font? `Catamaran` is too geometric for bedtime; `Noto Serif Tamil` is safe; a custom font is a real brand move.
3. **Audio hosting**: bundled MP3 in repo (simple, repo grows) or external (S3 / Cloudflare R2, scales)? v1 should start with bundled.
4. **PDF hosting for activities**: same question. Recommend bundled for v1; move to CDN later.
5. **Comment moderation policy**: N/A for kids, but if `/grownups/` gets a comment thread for teachers, what's the policy?

---

## 10. One-Sentence Summary

**Six public categories (stories / thirukkural / panchatantra / comics / listen / activities), one hidden grown-ups surface, five content collections discriminated by *shape* not by *topic*, every story cross-linked to its audio, activities, and teacher guide — and the moon-metaphor turned into a literal Bedtime Mode that makes NilaTales a nightly ritual, not just a reading site.**