import { useState, useEffect, useCallback } from 'react';

interface Panel {
  index: number;
  dialogue?: string;
  sfx?: string;
  alt: string;
}

interface Page {
  pageNumber: number;
  src: string;
  width: number;
  height: number;
  imageAlt: string;
  panels: Panel[];
}

interface Props {
  pages: Page[];
  title: string;
}

/**
 * ComicReader — React island.
 * Keyboard navigation: ArrowLeft / ArrowRight / Space.
 * Renders one page at a time with prev/next buttons and a page indicator.
 *
 * Why a React island (vs. plain Astro)?
 *   The previous/next interaction is stateful and benefits from a snappy
 *   client-side handler. Everything else (the page images themselves) is
 *   pre-resolved at build time, so the bundle is tiny.
 */
export default function ComicReader({ pages, title }: Props) {
  const [idx, setIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const page = pages[idx];

  const goPrev = useCallback(
    () => setIdx((i) => Math.max(0, i - 1)),
    [],
  );
  const goNext = useCallback(
    () => setIdx((i) => Math.min(pages.length - 1, i + 1)),
    [pages.length],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'Escape') setZoomed(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label={`Comic: ${title}`}>
      {/* Page indicator */}
      <div className="flex items-center justify-between mb-4 text-sm font-display text-slate-600">
        <span aria-live="polite">
          Page {page.pageNumber} of {pages.length}
        </span>
        <span className="text-xs text-slate-400 hidden sm:inline">
          Use ← → keys to navigate · click image to zoom
        </span>
      </div>

      {/* Page image */}
      <button
        type="button"
        onClick={() => setZoomed((z) => !z)}
        className="block w-full rounded-2xl overflow-hidden shadow-xl shadow-rose-200/40 focus-visible:ring-4 focus-visible:ring-rose-400"
        aria-label={`${page.imageAlt}. Click to ${zoomed ? 'shrink' : 'zoom'}.`}
      >
        <img
          src={page.src}
          width={page.width}
          height={page.height}
          alt={page.imageAlt}
          loading="lazy"
          className={`w-full h-auto transition-transform ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
        />
      </button>

      {/* Panel-by-panel transcript (for accessibility + bilingual readers) */}
      {page.panels.some((p) => p.dialogue || p.sfx) && (
        <details className="mt-4 group">
          <summary className="cursor-pointer text-sm font-display text-slate-600 hover:text-nila-700 select-none">
            📝 Read this page's text
          </summary>
          <ol className="mt-3 space-y-2 text-sm">
            {page.panels.map((p) => (
              <li key={p.index} className="flex gap-3">
                <span className="font-display text-xs text-slate-400 mt-1">
                  Panel {p.index + 1}
                </span>
                <span lang="ta">
                  {p.dialogue && <span className="text-nila-900">{p.dialogue}</span>}
                  {p.dialogue && p.sfx && <span className="text-slate-400 mx-1">·</span>}
                  {p.sfx && <span className="font-bold text-rose-600">{p.sfx}</span>}
                </span>
              </li>
            ))}
          </ol>
        </details>
      )}

      {/* Prev / Next */}
      <nav className="mt-8 flex items-center justify-between gap-3" aria-label="Page navigation">
        <button
          type="button"
          onClick={goPrev}
          disabled={idx === 0}
          className="px-4 py-2 rounded-xl bg-white border border-rose-200 font-display font-medium text-nila-700 hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ← Previous
        </button>
        <span className="text-xs font-display text-slate-500">
          {idx + 1} / {pages.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={idx === pages.length - 1}
          className="px-4 py-2 rounded-xl bg-rose-500 font-display font-medium text-white hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next →
        </button>
      </nav>
    </section>
  );
}
