import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Mark";
import { StarSurge } from "@/components/backgrounds/StarSurge";
import Link from "next/link";

import { getHome, type HomeContent } from "@/data/content";
import { tx, type LabLang } from "@/site/labData";

/* THE CREST IS THE MARK, AND NOTHING ELSE.
 *
 * Three things have been peeled off this spot in turn, each one added for the
 * same reason and each one removed for the same reason. Two beams of light and
 * a column of partner logos went first: the logos were six companies we have no
 * relationship with, and the beams were a 4.6 MB looping mp4. A ring of stack
 * glyphs replaced them and a faint 379x331 grid sat behind the whole thing.
 *
 * Both are now gone at the founder's call, and he is right. The glyphs repeated
 * a stack the site already lists with the project each tool was used on, so they
 * were the same claim with the evidence removed, and the grid was a second
 * texture over a panel that already has a star field on it. What is left is one
 * mark on one background, which is what the crest of a section is for.
 */

type ServiceCard = HomeContent["whatsIn"]["cards"][number];

interface CardProps {
  card: ServiceCard;
  /** The two words the figures sit beside, already resolved for the locale. */
  labels: { from: string; weeks: string };
}

/**
 * One service, as the template's dark card.
 *
 * The template's card was artwork on a plate with a caption under it, and it
 * went nowhere. Ours has no plate — those illustrations were raster files that
 * did not come across, and content.ts hands a card no image — and it has two
 * things the template's card never carried: what the work starts at, and how
 * long the first version runs. Both arrive as finished strings from the price
 * table; no figure is written here.
 *
 * The pills are the template's own: the white one is the pill it uses for a
 * fact on a dark panel, the translucent one is the fill its section badge uses
 * in dark tone. The whole card is the link, which is why the arrow only has to
 * confirm what the cursor already says.
 */
function Card({ card, labels }: CardProps) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col items-center overflow-hidden rounded-[24px] bg-[#141126] px-5 pt-5 pb-6 text-center transition-colors duration-200 hover:bg-[#1b1834] tablet:px-[30px] tablet:pb-[30px]"
    >
      {/* Its own row rather than an absolute corner, so a long title can use
          the full width of the card without running under it. */}
      <div className="flex w-full justify-end">
        <Image
          src="/images/icons/arrow-diagonal.svg"
          alt=""
          width={25}
          height={25}
          aria-hidden
          className="size-6 opacity-40 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-[10px]">
        <h3 className="text-[20px] leading-[30px] text-white tablet:text-[22px] tablet:leading-[33px]">
          {card.title}
        </h3>
        {card.description && (
          <p className="text-[16px] leading-6 text-ink-100 tablet:text-[17px] tablet:leading-[26px]">
            {card.description}
          </p>
        )}
      </div>

      {(card.price || card.weeks) && (
        <div className="mt-auto flex flex-wrap items-center justify-center gap-2 pt-5">
          {card.price && (
            <span className="flex items-center gap-[6px] rounded-pill bg-surface px-4 py-2">
              <span className="text-[16px] leading-6 text-ink-300">
                {labels.from}
              </span>
              <span className="font-display text-[16px] leading-6 text-ink-800">
                {card.price}
              </span>
            </span>
          )}
          {card.weeks && (
            <span className="rounded-pill bg-white/10 px-4 py-2 text-[16px] leading-6 whitespace-nowrap text-white">
              {card.weeks} {labels.weeks}
            </span>
          )}
        </div>
      )}
      {/* The card was already the link and the only thing saying so was a 24px
          arrow in the corner. Naming the destination is the difference between a
          card a reader might click and a card a reader knows leads somewhere
          longer. Not a nested <a>: this is text inside the Link that wraps the
          whole card. */}
      {card.hrefLabel && (
        <span className="mt-3 text-[15px] leading-6 text-white/45 underline decoration-white/25 underline-offset-4 transition-colors duration-200 group-hover:text-white group-hover:decoration-white/60">
          {card.hrefLabel}
        </span>
      )}
    </Link>
  );
}

/**
 * The six kinds of work, on the template's dark rounded panel.
 *
 * TWO THINGS ARE NOT THE TEMPLATE'S, AND BOTH FOLLOW FROM THE CONTENT.
 *
 * The panel is a flat fill. `whats-in-section.png` was a raster that did not
 * come across, and it was very close to flat already: #110f20, the same value
 * every beam fade above resolves to. The type on this panel is white, so unlike
 * a decorative layer this one could not simply be dropped.
 *
 * The cards sit in an even grid. The template ran five cards across two rows at
 * 1.499:1 and 0.886:1:1, and those ratios were not a design idea — they fell out
 * of each artwork's aspect ratio. There is no artwork and there are six cards,
 * so the honest translation of "two rows of cards" is three columns by two.
 */
export function WhatsIn({ lang }: { lang: LabLang }) {
  const { whatsIn } = getHome(lang);
  const labels = {
    from: tx({ en: "from", ru: "от" }, lang),
    weeks: tx({ en: "weeks", ru: "нед." }, lang),
  };

  return (
    <section
      id="what-in"
      /* Top and bottom padding match. They did not: 130px above the crest and
         80px under the row below it, which was fine while that row was a wall
         of chips heavy enough to hold the bottom edge down. With one button
         there instead, the slab needs the same air under the button as it has
         over the crest, or the button looks dropped rather than placed.

         THE SIDES ARE 24px ON A PHONE, NOT 16, and that is about the page
         rather than about this slab. Four panels stand on this column and three
         of them (`Motto`, `PlatformHighlight`, `FinalCta`) open their content
         24px inside their own edge; this one opened it 16px in, so its cards
         started 32px from the screen edge while every other panel's content
         started at 41. One number was wrong and it was this one.

         AND THE CORNER SCALES WITH THEM. 50px was the slab's own radius against
         the other three panels' 40, which is a 10px difference on a 1380px
         column and reads as a deliberate softening. On a 343px phone panel the
         same 10px is the difference between an 8% corner and a 15% one, and the
         slab stopped matching the section above it. Below the tablet breakpoint
         it takes the same 28px `--radius-section` resolves to there; above it,
         nothing changed. */
      className="relative flex w-full scroll-mt-[120px] flex-col items-end gap-10 overflow-hidden rounded-[28px] bg-[#110f20] px-6 py-20 shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_8px_#ffffff] tablet:rounded-[50px] tablet:px-10 tablet:py-24 desktop:gap-20 desktop:px-20 desktop:py-[130px]"
    >
      {/* One background instead of the three overlays this slab used to carry.
          The pointer trail that used to be here piled glyphs into the corner
          whenever the pointer rested there, and the 50px radius sliced them; a
          background has no relationship to the pointer and cannot do that. */}
      <StarSurge color="#c9cfe6" speed={0.9} count={240} className="z-0" />
      <div className="relative flex w-full flex-col items-center gap-12">
        {/* ---- the crest ---- */}
        {/* THE 150px BOX IS GONE and the mark is its own size. That box held two
            nested plates behind the template's letterform; the plates went, and
            what was left was 28px of empty inset on every side of a 94px disc.
            It was invisible until the slab's padding was made symmetric, which
            put the mark 158px from the top edge against the button's 130px from
            the bottom. Compensating with a smaller `pt` would have meant three
            hand-computed values that break the moment the mark is resized, so
            the dead inset went instead and the wrapper's `gap` grew by exactly
            the 28px it used to contribute, leaving the crest-to-heading rhythm
            where it was. */}
        <Mark size={94} className="relative z-10" />

        <div className="relative z-10 flex w-full flex-col items-center gap-[14px] text-center">
          <h2 className="text-[28px] leading-[1.25] text-white tablet:text-[40px] desktop:text-[56px] desktop:leading-[72.8px]">
            {whatsIn.title}
          </h2>
          {whatsIn.description && (
            <p className="text-[16px] leading-6 text-line-strong tablet:text-[18px] tablet:leading-[27px]">
              {whatsIn.description}
            </p>
          )}
        </div>
      </div>

      {whatsIn.cards.length > 0 && (
        <div className="relative grid w-full grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
          {whatsIn.cards.map((card) => (
            <Card key={card.title} card={card} labels={labels} />
          ))}
        </div>
      )}

      {/* WAS A ROW OF NINE PRICED CHIPS under a small-caps label. It existed
          because the heading above used to count fifteen work types while the
          slab showed six, and the chips closed that gap. The heading counts
          nothing now, and a second grid of prices directly under a grid of
          prices was the busiest thing on the page. One button, on the white
          fill the rest of the site uses for a light action on a dark ground. */}
      <div className="relative z-10 flex w-full justify-center">
        <Button href={whatsIn.moreHref} variant="secondary">
          {whatsIn.moreLabel}
        </Button>
      </div>
    </section>
  );
}
