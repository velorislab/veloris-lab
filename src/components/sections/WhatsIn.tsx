import Image from "next/image";

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
        {/* THE PAIN, THEN WHAT ARRIVES, in that order and at two weights. The
            card used to stop after the first line, which left six cards each
            describing something wrong with the reader's week and none of them
            saying what they would get for the figure underneath. The second line
            is `d` from SERVICES, written long ago and used only on the service
            pages until now. */}
        {card.description && (
          <p className="text-[15px] leading-[22px] text-ink-100/70 tablet:text-[16px] tablet:leading-6">
            {card.description}
          </p>
        )}
        {card.outcome && (
          <p className="text-[16px] leading-6 text-white/85 tablet:text-[17px] tablet:leading-[26px]">
            {card.outcome}
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
      className="relative flex w-full scroll-mt-[110px] flex-col items-end gap-10 overflow-hidden rounded-[50px] bg-[#110f20] px-4 pt-20 pb-10 shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_8px_#ffffff] tablet:px-10 tablet:pt-24 tablet:pb-16 desktop:gap-20 desktop:px-20 desktop:pt-[130px] desktop:pb-20"
    >
      {/* One background instead of the three overlays this slab used to carry.
          The pointer trail that used to be here piled glyphs into the corner
          whenever the pointer rested there, and the 50px radius sliced them; a
          background has no relationship to the pointer and cannot do that. */}
      <StarSurge color="#c9cfe6" speed={0.9} count={240} className="z-0" />
      <div className="relative flex w-full flex-col items-center gap-5">
        {/* ---- badge, on its beam-lit backdrop ---- */}
        <div className="relative flex size-[150px] items-center justify-center">
          {/* Two nested plates and a 14px inset used to sit between the halo and
              the template's letterform, which is what a letterform needs and a
              disc does not: our mark arrived at 50 visual pixels inside a 150px
              halo and read as lost. The halo stays, the plates go, and the mark
              is the crest at its own size. */}
          <Mark size={94} className="relative z-10" />
        </div>

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
    </section>
  );
}
