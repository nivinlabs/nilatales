/**
 * Content helpers — keep filtering and sorting in one place so the rules
 * are consistent across pages.
 *
 * Rule of thumb: production pages filter `draft === false`. Preview / admin
 * pages can pass `includeDrafts: true` to bypass.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export type Story    = CollectionEntry<'stories'>;
export type Comic    = CollectionEntry<'comics'>;
export type Audio    = CollectionEntry<'audio'>;
export type Activity = CollectionEntry<'activities'>;
export type Resource = CollectionEntry<'resources'>;

/**
 * idWithoutExt — Astro 6's `entry.id` is the full relative path with the
 * .md/.mdx extension, e.g. "panchatantra/the-doves-and-the-net.mdx". For URLs
 * we want the extension stripped: "panchatantra/the-doves-and-the-net".
 *
 * This is the closest drop-in for the old `entry.slug` behaviour and is the
 * right helper for the `/stories/[...slug]` catch-all (which preserves nested
 * paths like `panchatantra/the-doves-and-the-net`).
 */
export function idWithoutExt<T extends { id: string }>(entry: T): string {
  // Astro 6 glob loader: entry.id is the relative path from the collection base
  // with the file extension stripped. We use locale subdirectories (ta/ en/)
  // so we need to strip the locale prefix too.
  // e.g. "ta/moral/the-moon-who-learned-to-share" → "moral/the-moon-who-learned-to-share"
  return entry.id.replace(/^(ta|en)\//, '');
}

/**
 * idBasename — strip BOTH the extension and any nested directory prefix.
 * E.g. "panchatantra/the-doves-and-the-net.mdx" → "the-doves-and-the-net".
 *
 * Use this for canonical / single-segment routes like
 *   /comics/<slug>/
 *   /listen/<slug>/
 *   /activities/<slug>/
 *   /grownups/<slug>/
 *   /kural/<adhigaaram>/<kural>/
 *   /panchatantra/<tantra>/<slug>/
 * where the file may live in a subfolder of the collection root.
 */
export function idBasename<T extends { id: string }>(entry: T): string {
  // Strip locale prefix (ta/ en/) and get the basename without extension
  const noLocale = entry.id.replace(/^(ta|en)\//, '');
  const noExt = noLocale.replace(/\.[^./]+$/, '');
  return noExt.split('/').pop() ?? noExt;
}

/**
 * resolveCover — accept either an ImageMetadata (when the frontmatter uses
 * `import foo from '...'` syntax) OR a plain string path (when the frontmatter
 * references an asset in /public). For strings, return them as-is. For
 * ImageMetadata, run through astro:assets so we get the optimized src + dims.
 */
export async function resolveCover(
  src: ImageMetadata | string | undefined,
  opts: { width: number; format?: 'webp' | 'avif' | 'png' | 'jpg' } = { width: 1600 },
): Promise<{ src: string; width: number; height: number } | null> {
  if (!src) return null;
  if (typeof src === 'string') {
    return { src, width: opts.width, height: Math.round(opts.width * 9 / 16) };
  }
  const opt = await getImage({ src, width: opts.width, format: opts.format ?? 'webp' });
  return {
    src: opt.src,
    width: opt.attributes.width ?? opts.width,
    height: opt.attributes.height ?? Math.round(opts.width * 9 / 16),
  };
}

export async function publishedStories(locale: 'ta' | 'en' = 'ta', includeDrafts = false): Promise<Story[]> {
  const all = await getCollection('stories', ({ data }) => {
    if (!includeDrafts && data.draft === false) return false;
    if (data.language !== locale && data.language !== 'ta-en') return false;
    return true;
  });
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function publishedComics(locale: 'ta' | 'en' = 'ta', includeDrafts = false): Promise<Comic[]> {
  const all = await getCollection('comics', ({ data }) => {
    if (!includeDrafts && data.draft === false) return false;
    if (data.language !== locale && data.language !== 'ta-en') return false;
    return true;
  });
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function publishedAudio(locale: 'ta' | 'en' = 'ta', includeDrafts = false): Promise<Audio[]> {
  const all = await getCollection('audio', ({ data }) => {
    if (!includeDrafts && data.draft === false) return false;
    if (data.language !== locale && data.language !== 'ta-en') return false;
    return true;
  });
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function publishedActivities(locale: 'ta' | 'en' = 'ta', includeDrafts = false): Promise<Activity[]> {
  const all = await getCollection('activities', ({ data }) => {
    if (!includeDrafts && data.draft === false) return false;
    if (data.language !== locale && data.language !== 'ta-en') return false;
    return true;
  });
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function publishedResources(locale: 'ta' | 'en' = 'ta', includeDrafts = false): Promise<Resource[]> {
  const all = await getCollection('resources', ({ data }) => {
    if (!includeDrafts && data.draft === false) return false;
    if (data.language !== locale && data.language !== 'ta-en') return false;
    return true;
  });
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Story dispatcher: which route should this story live at? */
export function storyRoute(story: Story): string {
  if (story.data.kind === 'thirukkural') {
    const k = story.data.source?.kind === 'thirukkural' ? story.data.source.kural : null;
    if (k) return `/kural/${k.adhigaaramNumber}/${k.number}/`;
    return `/kural/${idBasename(story)}/`;
  }
  if (story.data.kind === 'panchatantra') {
    const p = story.data.source?.kind === 'panchatantra' ? story.data.source.panchatantra : null;
    if (p) return `/panchatantra/${p.tantra}/${idBasename(story)}/`;
    return `/panchatantra/${idBasename(story)}/`;
  }
  return `/stories/${idWithoutExt(story)}/`;
}

/** Strip MDX body excerpt for previews (first paragraph). */
export function excerpt(body: string | undefined, maxLen = 180): string {
  if (!body) return '';
  const text = body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + '…' : text;
}
