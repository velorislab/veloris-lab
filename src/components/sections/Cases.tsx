"use client";

import Link from "next/link";
import { useState } from "react";

import { getHome } from "@/data/content";
import { type LabLang } from "@/site/labData";

/**
 * The cases, as a grid of tiles that are the same shape as each other.
 *
 * WHY THE SHAPE IS THE POINT. Measured on the rendered page when this array
 * first passed ten entries: titles ran 5 to 62 characters and 1 to 4 lines, the
 * result plate ran 4 to 8 lines, and cards ran 420px to 542px. Nothing was
 * broken and the
 * whole thing read as mush, because a grid of repeated cards only reads as a set
 * when the repetition is real. Three things fix it and all three are structural
 * rather than decorative: every text block is clamped to a fixed number of
 * lines, the proof slot has one height whatever fills it, and the two titles
 * that were three times longer than their neighbours were cut in `labData`.
 *
 * THE NUMBERS COME OUT OF THE PROSE. `res` used to arrive as a tinted paragraph
 * carrying the percentages inside a sentence, which is the slowest way to read a
 * percentage. `metrics` lifts them into figures, and the sentence stays on the
 * case page where there is room for it. Two cases have no number worth printing
 * and get the sentence instead, clamped to the same height — see the field's own
 * comment in labData for why inventing one was not on the table.
 *
 * WHAT EACH TILE CARRIES, top to bottom, and every part was already written:
 *   the two lead tags   from `tags`, and the status, on one rail
 *   the title           two lines, always
 *   one line of what    `sub`, two lines, always
 *   the proof           `metrics` as figures, or `res` clamped
 *   the way in          the case page, and anything public
 *
 * THREE COLUMNS ON DESKTOP, not two. Twelve tiles in two columns is a ladder six
 * rows deep that the reader scrolls past rather than scans; in three it is a
 * block they take in. It also puts the tile at a width where a two-line title is
 * the common case rather than the lucky one.
 *
 * IT OPENS ON SIX AND FADES THE SECOND ROW. Twelve tiles is the whole section
 * from here to the fold below it, and a reader who has seen three has learned
 * what the set is; the rest is depth they can ask for. The fade is what says
 * there is more without a caption saying so.
 *
 * THE COLLAPSED GRID RENDERS SIX TILES, IT DOES NOT CLIP TWELVE. A clipped grid
 * leaves six invisible cards in the tab order, so a keyboard walks into content
 * nobody can see, and it needs a `max-height` in pixels that has to be re-guessed
 * every time a card's height changes. Rendering fewer needs neither.
 */
export function Cases({ lang }: { lang: LabLang }) {
  const { cases } = getHome(lang);
  const [open, setOpen] = useState(false);
  if (cases.items.length === 0) return null;

  /* Six collapsed, and below the tablet breakpoint the last three of those are
     hidden by CSS rather than by this slice: one column makes six tiles a very
     long ladder, and a slice that depends on the viewport cannot be decided on
     the server without the client disagreeing with it. */
  const COLLAPSED = 6;
  const shown = open ? cases.items : cases.items.slice(0, COLLAPSED);
  const collapsible = cases.items.length > COLLAPSED;

  return (
    <section id="cases" className="section-shell scroll-mt-[110px] gap-10 desktop:gap-[60px]">
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <h2 className="max-w-[900px] text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {cases.title}
        </h2>
        {/* Rendered only when there is something to say. Empty, this printed an
            empty paragraph and the wrapper's `gap-4` under the heading anyway,
            which reads as a missing line rather than as a heading that needs
            none. */}
        {cases.description && (
          <p className="max-w-[760px] text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
            {cases.description}
          </p>
        )}
      </div>

      <div className="relative w-full">
      <ul
        /* The mask is on the grid itself, so the tiles fade rather than sitting
           under a coloured sheet: a sheet would have to match the page colour
           exactly and would still square off over the rounded corners. It runs
           only while collapsed, because a fade at the end of the full set would
           be hiding nothing. */
        className={`grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-3 ${
          open || !collapsible
            ? ""
            : "[mask-image:linear-gradient(to_bottom,black_0%,black_46%,transparent_94%)]"
        }`}
      >
        {shown.map((c, i) => (
          <li
            key={c.slug}
            /* The hover is the one authored moment in this section: the hairline
               tightens and the card lifts a little. `translate-y` and not scale,
               because twelve of these sit edge to edge and a scaling tile
               overlaps its neighbours.

               Collapsed and below the tablet breakpoint, tiles four to six are
               out: one column turns six tiles into a ladder, and three is the
               row a phone can see at once. The decision is CSS rather than a
               second slice, so the server and the client render the same list. */
            className={`group flex-col gap-5 rounded-panel bg-surface p-6 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)] transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_0_0_1px_var(--color-line),0_10px_24px_0_rgba(182,182,182,0.18)] ${
              !open && i >= 3 ? "hidden tablet:flex" : "flex"
            }`}
          >
            {/* ---- Rail: what kind of work, and whether it is running ---- */}
            <div className="flex items-start justify-between gap-3">
              <span className="min-w-0 truncate text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                {c.marker}
              </span>
              {/* The status is a fact, not a badge for decoration: this list
                  deliberately mixes shipped work with work still being built,
                  and the heading must not be left to imply otherwise. */}
              <span
                className={
                  "shrink-0 rounded-pill px-[10px] py-[3px] text-[12px] leading-5 whitespace-nowrap " +
                  (c.live
                    ? "bg-accent/10 text-accent"
                    : "bg-surface-muted text-ink-300")
                }
              >
                {c.status}
              </span>
            </div>

            {/* ---- Identity. Both blocks reserve their two lines whether or not
                    they need them, which is what keeps the rails below aligned
                    across a row. ---- */}
            <div className="flex flex-col gap-2">
              <h3 className="line-clamp-2 min-h-[56px] text-[19px] leading-7 text-ink-900">
                {c.title}
              </h3>
              {/* Three lines, not two, and that is a measurement rather than a
                  preference. At two, five of eleven subs clipped, and the
                  threshold was not a character count: Cowee's 81 characters fit
                  where another card's 81 did not, because Russian compound
                  nouns wrap where English words would not. Shaving each string
                  to a fragile limit would clip again the next time one is
                  edited. The slot reserves its three lines whether or not a
                  card fills them, which is what keeps the rails aligned. */}
              <p className="line-clamp-3 min-h-[60px] text-[14px] leading-5 text-ink-300">
                {c.sub}
              </p>
            </div>

            {/* ---- The proof, on its own height above a hairline. Figures where
                    the case has them, the result sentence where it does not. ---- */}
            <div className="mt-auto flex flex-col gap-4 border-t border-line-soft pt-4">
              {/* ONE HEIGHT, NOT A MINIMUM, and both branches carry the same
                  one. A `min-h` let a label that wrapped to two lines push its
                  card 8px taller than the card beside it, which is the ragged
                  edge this whole pass exists to remove. 70px is the figure at
                  32px plus two lines of label at 18px; the sentence gets three
                  lines at 21px inside the same box. */}
              {c.metrics.length > 0 ? (
                <dl className="flex h-[70px] gap-6">
                  {c.metrics.map((m) => (
                    <div key={m.k} className="flex min-w-0 flex-1 flex-col gap-[2px]">
                      {/* The measurement voice, as everywhere else numbers are
                          set on this site. */}
                      <dt className="font-numeric text-[22px] leading-8 font-semibold text-ink-900">
                        {m.v}
                      </dt>
                      <dd className="line-clamp-2 text-[13px] leading-[18px] text-ink-200">
                        {m.k}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="line-clamp-3 h-[70px] text-[14px] leading-[21px] text-ink-400">
                  {c.result}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  href={c.href}
                  className="text-[15px] leading-6 font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                >
                  {c.readLabel}
                </Link>
                {c.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] leading-6 text-ink-300 underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-ink-800"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* The blur, over the fading tiles only. `backdrop-blur` rather than a
          blur on the grid: blurring the grid would blur the three sharp tiles
          above too, and this way the same gradient that fades the tiles also
          fades the blur in, so there is no edge where it starts. It takes no
          clicks, and it is out of the accessibility tree. */}
      {!open && collapsible && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[42%] backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_78%)] tablet:block"
        />
      )}
      </div>

      {/* ONE WAY ONLY: the control opens the grid and then leaves. Collapsing
          again is a thing nobody does on a page they are reading downwards, and
          a button that alternates its own label is a second state to notice for
          no gain. `aria-expanded` is still correct while the button exists, and
          it is the last element in the section, so nothing below it loses its
          place when it goes. */}
      {collapsible && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          className="inline-flex h-[52px] items-center rounded-pill bg-surface px-6 text-[16px] leading-6 font-semibold text-ink-700 shadow-[0_0_0_1px_var(--color-line),0_2px_6px_0_rgba(182,182,182,0.12)] transition-colors duration-200 hover:bg-surface-muted"
        >
          {cases.showAllLabel}
        </button>
      )}
    </section>
  );
}
