import { Marquee } from "@/components/ui/Marquee";

import { getHome } from "@/data/content";
import { type LabLang } from "@/site/labData";

/**
 * The price ticker that closes the first screen.
 *
 * Product-and-price pairs in caps, travelling slowly. It earns its place on the
 * fold because it makes one claim the rest of the page then has to keep, and it
 * makes it with numbers rather than adjectives. Somebody who reads nothing else
 * leaves knowing roughly what this costs.
 *
 * BELOW THE HERO, NOT INSIDE IT, and that is the one deliberate difference.
 * Theirs sits inside a hero that scrolls; ours is pinned to exactly one viewport
 * at every width, and a ticker inside it would either push the next section back
 * above the fold or squeeze the headline. Immediately after it is where theirs
 * effectively lands anyway once you scroll a hair, and the hero stays one screen.
 *
 * NO NUMERAL IS TYPED HERE. Every pair is a work type and its floor, read from
 * labPricing through content.ts, so the ticker cannot disagree with the price
 * table, the calculator or the service cards. Fifteen pairs rather than their
 * five, which is not a boast: it is how many kinds of work the table holds, and
 * a ticker is the one place where a long list costs nothing.
 */
export function PriceTicker({ lang }: { lang: LabLang }) {
  const { priceTicker } = getHome(lang);
  if (priceTicker.length === 0) return null;

  return (
    <section
      aria-hidden
      /* `aria-hidden`, and it is not laziness. The same fifteen floors are in the
         price table on this page as a real table with headers, so a screen reader
         announcing them again here, as an endless run of pairs with no structure,
         would be the same information delivered worse. Decoration for the eye,
         silence for the ear. */
      className="relative -mt-6 w-full overflow-hidden tablet:-mt-8"
    >
      <Marquee speed={26} gap={0} fade className="h-[52px] items-center">
        {priceTicker.map((pair) => (
          <span key={pair.label} className="flex items-center whitespace-nowrap">
            <span className="text-[13px] font-medium tracking-[0.1em] text-ink-250 uppercase tablet:text-[14px]">
              {pair.label}
            </span>
            <span className="ml-2 font-display text-[13px] font-semibold tracking-[0.06em] text-ink-800 uppercase tablet:text-[14px]">
              {pair.price}
            </span>
            {/* The separator belongs to the item rather than sitting between
                items, so the loop seam falls in the middle of a gap and never
                between a price and the dot that should follow it. */}
            <span className="mx-6 text-ink-50 tablet:mx-8" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
