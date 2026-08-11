import { Marquee } from "@/components/ui/Marquee";

import { getHome } from "@/data/content";
import { type LabLang } from "@/site/labData";

/**
 * The capability ribbon: thirteen words in caps, travelling slowly.
 *
 * WAS `PriceTicker`, carrying every work type with its price floor. The name
 * went with the prices rather than outliving them, because a component called
 * PriceTicker that shows no price is the kind of thing somebody later trusts.
 * `MARQUEE` in labData holds the words and the argument for them; the short
 * version is that six forty-character phrases at ticker speed get read instead
 * of glanced at, which is not what a ribbon does.
 *
 * IT LIVES INSIDE THE MOTTO PANEL NOW, and that is why this renders a bare
 * strip with no section element, no landmark and no margin of its own. It used
 * to sit under the hero and had to be pulled up by its own height to keep off
 * the seam with the page behind it; inside a panel there is no seam and the
 * placement is the panel's business, not this component's.
 *
 * Colours are for the blue ground it stands on, and the word opacity is
 * measured rather than picked. It started at 70%, which composites to
 * rgb(186,214,255) over the middle of that gradient and gives 2.83:1 — thin for
 * 14px, even wide-tracked caps. 85% is 3.47:1 and still clearly quieter than
 * the white figures above it. The separators stay at 30% because a faint dot is
 * doing its whole job at that weight.
 */
export function Ticker({ lang }: { lang: LabLang }) {
  const { ticker } = getHome(lang);
  if (ticker.length === 0) return null;

  return (
    /* `aria-hidden`, and it is not laziness. Every word here names something the
       page states properly further down, in the service cards and the stack
       section, so a screen reader announcing them again as an endless run of
       nouns with no structure would be the same information delivered worse.
       Decoration for the eye, silence for the ear. */
    <div aria-hidden className="w-full overflow-hidden">
      <Marquee speed={26} gap={0} fade className="h-[42px] items-center">
        {ticker.map((word) => (
          <span key={word} className="flex items-center whitespace-nowrap">
            <span className="text-[13px] font-medium tracking-[0.1em] text-page/85 uppercase tablet:text-[14px]">
              {word}
            </span>
            {/* The separator belongs to the item rather than sitting between
                items, so the loop seam falls in the middle of a gap and never
                between a word and the dot that should follow it. */}
            <span className="mx-6 text-page/30 tablet:mx-8" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
