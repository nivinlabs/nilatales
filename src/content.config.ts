/**
 * NilaTales content collections.
 *
 * Five collections, discriminated by *shape* not topic (see TAXONOMY.md §0/§3):
 *   - stories   : prose + illustrations (kind: moral | thirukkural | panchatantra | folktale)
 *   - comics    : ordered pages of panels
 *   - audio     : lullabies & narrations (primary artifact = audio file)
 *   - activities: coloring / worksheet / craft (primary artifact = PDF)
 *   - resources : teacher guides, parent notes, glossaries (hidden /grownups/ route)
 *
 * A story of kind=thirukkural routes to /kural/ via the universal dispatcher
 * in src/pages/stories/[...slug].astro.  See TAXONOMY.md §6 for the route map.
 */
import { glob } from 'astro/loaders';
import { defineCollection, z, reference } from 'astro:content';

// ─── Shared enums ────────────────────────────────────────────────────────────

const kindEnum = z.enum(['moral', 'thirukkural', 'panchatantra', 'folktale']);
const paalEnum = z.enum(['aram', 'porul', 'inbam']);
const tantraEnum = z.enum([
  'mithrabheda',
  'mithraLaapa',
  'kaakolookiyam',
  'labdhapraNasham',
  'apadhitthudai',
]);
/**
 * Stories / comics / activities / teacher-guides: ages 3–18.
 * Audio (lullabies in particular) can be 0+ — lullabies are sung to newborns.
 * So we keep the schema's ageRange at 3–18 by default, but audio uses a
 * looser range.
 */
const ageRange = z
  .object({
    min: z.number().int().min(0).max(18),
    max: z.number().int().min(0).max(18),
  })
  .refine((r: { min: number; max: number }) => r.min <= r.max, {
    message: 'ageRange.min must be ≤ max',
  });

/** Audio (lullabies can be for newborns). Same shape, but allows min=0. */
const audioAgeRange = ageRange;

// ─── Source refs (discriminated union on kind) ───────────────────────────────

const kuralRef = z.object({
  number: z.number().int().min(1).max(1330),
  adhigaaramNumber: z.number().int().min(1).max(133),
  adhigaaramTamil: z.string(),
  paal: paalEnum,
  coupletTamil: z.string(),
  transliteration: z.string(), // ISO 15919
  meaningEnglish: z.string(),
});

const panchatantraRef = z.object({
  tantra: tantraEnum,
  tantraTamil: z.string(),
  frameTale: z.string(),
  frameTaleTamil: z.string(),
  innerTaleTitle: z.string().optional(),
});

// ─── stories ────────────────────────────────────────────────────────────────

/**
 * Image field — accepts either:
 *   - An `ImageMetadata` (when frontmatter uses `import foo from '...'` syntax)
 *   - A plain string path (when the frontmatter references an asset in
 *     /public, e.g. `cover: "/img/covers/foo.svg"`)
 *
 * We can't use `z.union([image(), z.string()])` because astro:assets'
 * `image()` validator eagerly tries to resolve strings as filesystem paths,
 * which fails for `/public/...` URLs. So we accept anything and let
 * `resolveCover()` in src/utils/content.ts discriminate at use-site.
 */
const img = z.any();

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      titleEnglish: z.string().optional(),
      subtitle: z.string().optional(),

      kind: kindEnum,
      themes: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      audience: z.enum(['kids', 'family', 'classroom']).default('kids'),

      source: z
        .discriminatedUnion('kind', [
          z.object({
            kind: z.literal('moral'),
            originalAuthor: z.string().optional(),
          }),
          z.object({
            kind: z.literal('folktale'),
            region: z.string().optional(),
            attribution: z.string().optional(),
          }),
          z.object({
            kind: z.literal('thirukkural'),
            kural: kuralRef,
          }),
          z.object({
            kind: z.literal('panchatantra'),
            panchatantra: panchatantraRef,
          }),
        ])
        .optional(),

      ageRange,
      readingTimeMin: z.number().int().positive(),
      difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
      language: z.enum(['ta', 'en', 'ta-en']).default('ta'),

      cover: img,
      coverAlt: z.string(),
      illustrations: z
        .array(
          z.object({
            src: img,
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),

      summary: z.string(),
      moral: z.string().optional(),
      author: z.string().default('NilaTales'),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),

      related: z.array(reference('stories')).default([]),
      audioNarration: reference('audio').optional(),
      activity: reference('activities').optional(),
      teacherGuide: reference('resources').optional(),
    }),
});

// ─── comics ────────────────────────────────────────────────────────────────

const comics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comics' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      titleEnglish: z.string().optional(),
      format: z.enum(['strip', 'oneshot', 'serial']),
      series: z.string().optional(),
      episode: z.number().int().positive().optional(),
      humorTags: z
        .array(z.enum(['silly', 'mischief', 'school', 'fantasy', 'family']))
        .default([]),
      themes: z.array(z.string()).default([]),

      ageRange,
      readingTimeMin: z.number().int().positive(),
      language: z.enum(['ta', 'en', 'ta-en']).default('ta'),

      cover: img,
      coverAlt: z.string(),

      pages: z
        .array(
          z.object({
            pageNumber: z.number().int().positive(),
            image: img,
            imageAlt: z.string(),
            panels: z
              .array(
                z.object({
                  index: z.number().int().nonnegative(),
                  dialogue: z.string().optional(),
                  sfx: z.string().optional(),
                  alt: z.string(),
                }),
              )
              .min(1),
          }),
        )
        .min(1),

      characters: z
        .array(
          z.object({
            name: z.string(),
            species: z.string().optional(),
            desc: z.string().optional(),
          }),
        )
        .default([]),

      summary: z.string(),
      moral: z.string().optional(),
      author: z.string().default('NilaTales'),
      illustrator: z.string().optional(),
      pubDate: z.coerce.date(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),

      related: z.array(reference('stories')).default([]),
    }),
});

// ─── audio ──────────────────────────────────────────────────────────────────

const audio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/audio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      titleEnglish: z.string().optional(),
      type: z.enum(['lullaby', 'narration', 'song']),
      mood: z.enum(['calm', 'playful', 'lullaby', 'energetic']).default('calm'),
      durationSec: z.number().int().positive(),
      lyrics: z.string().optional(),
      lyricsTransliteration: z.string().optional(),
      lyricsEnglish: z.string().optional(),

      audioFile: z.string(),
      cover: img.optional(),
      coverAlt: z.string().optional(),

      narrationOf: reference('stories').optional(),

      ageRange: audioAgeRange,
      language: z.enum(['ta', 'en', 'ta-en']).default('ta'),
      pubDate: z.coerce.date(),
      draft: z.boolean().default(false),

      related: z.array(reference('stories')).default([]),
    }),
});

// ─── activities ────────────────────────────────────────────────────────────

const activities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      titleEnglish: z.string().optional(),
      kind: z.enum(['coloring', 'worksheet', 'craft']),
      ageRange,
      difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
      durationMin: z.number().int().positive(),

      pdf: z.string().optional(),
      previewImage: img.optional(),

      materials: z.array(z.string()).default([]),
      instructions: z.string(),
      instructionsEnglish: z.string().optional(),

      language: z.enum(['ta', 'en', 'ta-en']).default('ta'),
      linkedStory: reference('stories'),
      related: z.array(reference('stories')).default([]),
      pubDate: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

// ─── resources (grown-ups only) ────────────────────────────────────────────

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['teacher-guide', 'parent-note', 'glossary']),
    language: z.enum(['ta', 'en', 'ta-en']).default('ta'),
    ageRange,
    linkedStory: reference('stories').optional(),

    objectives: z.array(z.string()).default([]),
    vocabulary: z
      .array(
        z.object({
          tamil: z.string(),
          english: z.string(),
          transliteration: z.string().optional(),
        }),
      )
      .default([]),
    preReading: z.string().optional(),
    discussion: z.array(z.string()).default([]),
    extensionActivity: z.string().optional(),
    assessment: z.string().optional(),

    readingTips: z.array(z.string()).default([]),
    conversationPrompts: z.array(z.string()).default([]),

    summary: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { stories, comics, audio, activities, resources };
