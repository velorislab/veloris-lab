"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/* =============================================================================
   One word inside the headline, cycling.

   NO LAYOUT SHIFT, and that is why every word is in the DOM rather than one at
   a time. They are stacked in a single grid cell, so the box is always as wide
   as the longest of them and the words on either side never move. Swapping a
   single node's text instead would reflow the whole headline six times a
   minute, which on a two-line h1 means the second line jumping.

   ONE SENTENCE FOR A SCREEN READER. Only the active word is exposed; the other
   five carry `aria-hidden`, so the h1 reads as "Студия полного цикла
   стартапов" rather than as six nouns in a row. There is deliberately no
   `aria-live`: this is decoration, and announcing a new word every three
   seconds would make the page unusable.

   Under prefers-reduced-motion it stops on the first word. Not a slower cycle,
   no cycle: a word that changes under you is exactly the movement that setting
   is asking us to remove.
   ========================================================================== */

export function RotatingWord({
  words,
  interval = 2600,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    /* A FULL-WIDTH BLOCK grid, not an inline one, and that is the third thing
       this box needed. As an inline-grid it was shrink-to-fit against whatever
       space was left on the line it landed on, and that remainder changes with
       the word: measured at 360px the box breathed between 320 and 328 wide and
       84 and 86 tall as it cycled, which is the exact layout shift the stacked
       grid exists to prevent. Taking the whole line makes the width a property
       of the container instead of the content, so it cannot vary at all. The
       headline already broke here on its own at every width; this only makes
       the break deliberate. */
    <span className={`grid w-full ${className}`}>
      {words.map((w, n) => (
        <span
          key={w}
          aria-hidden={n === i ? undefined : true}
          /* Deliberately NOT `whitespace-nowrap`. Holding the longest word on one
             line blew the headline out of small phones: at 360px, «мобильные
             приложения» is 342px of text inside a 328px column, so the h1
             measured 417px and started at x = -28 — clipped on both sides, and
             invisibly so, because the section and the body both carry
             `overflow-x: hidden`. Letting it wrap costs one extra line on narrow
             screens and nothing at all above them, and the grid still fixes both
             the width and the height to the largest word, so nothing moves. */
          className="col-start-1 row-start-1 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          /* `visibility`, not just `opacity`, and it is not a detail.
             A node hidden with opacity alone still counts as rendered text, so
             `h1.innerText` came out as "Студия полного цикла: стартапы SaaS
             AI-инструменты веб-приложения мобильные приложения CRM" — fine for
             a screen reader, which honours aria-hidden, and wrong for anything
             that reads the DOM: a search engine, a share preview, a copy-paste.
             `visibility: hidden` drops it from innerText while still holding its
             grid cell, so the box does not move either. It flips after the fade
             on the way out and immediately on the way in, which is what the
             split transition durations below are for. */
          style={{
            opacity: n === i ? 1 : 0,
            visibility: n === i ? "visible" : "hidden",
            transform: n === i ? "translateY(0)" : "translateY(0.22em)",
            transitionProperty: "opacity, transform, visibility",
            transitionDuration: "500ms, 500ms, 0s",
            transitionDelay: n === i ? "0s, 0s, 0s" : "0s, 0s, 500ms",
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
