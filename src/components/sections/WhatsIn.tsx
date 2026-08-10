import Image from "next/image";

import { Mark } from "@/components/ui/Mark";
import { SectionCursor } from "@/components/ui/SectionCursor";
import Link from "next/link";

import { getHome, type HomeContent } from "@/data/content";
import { tx, type LabLang } from "@/site/labData";

/**
 * The composition behind the badge: a grid and two dark beams angled at ±30°.
 * Geometry matches the source's 1380×360 backdrop.
 *
 * The source also drifted a column of partner logos down through this. Those
 * logos were six companies we have no relationship with, so `orbitLogos` is
 * empty in content.ts and the column is gone with it — the grid and the beams
 * are the part of this composition that carries no claim.
 */
function OrbitBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-[-134px] left-1/2 hidden h-[360px] w-[1380px] -translate-x-1/2 overflow-hidden tablet:block"
    >
      <Image
        src="/images/backgrounds/whats-in-grid.svg"
        alt=""
        width={379}
        height={331}
        className="absolute top-[-43px] left-1/2 -translate-x-1/2"
      />

      {/* Two beams of streaking light. Each is the same looping clip: rotated
          ±30°, tinted navy by a `mix-blend-mode: color` fill, then faded on all
          four edges so it dissolves into the panel. */}
      {(["left", "right"] as const).map((side) => {
        const isLeft = side === "left";
        return (
          <div
            key={side}
            className="absolute top-0 h-[293px] w-[675px] overflow-hidden"
            style={{ left: isLeft ? 0 : 705 }}
          >
            {/* The template ran a looping video of its own product through
                this slot, masked into a light beam. The file was not copied and
                the footage is not ours, so the beam is gone and the shell fades
                below keep the panel's edges soft on their own. */}
            {/* Shell-level fades that blend the beam into the section. */}
            <div
              className="absolute top-[95px] h-[198px] w-[536px] bg-[linear-gradient(0.16deg,#110f20_0%,rgba(17,15,32,0)_100%)]"
              style={{ left: isLeft ? 139 : 0 }}
            />
            <div
              className="absolute top-[70px] h-[167px] w-[283px]"
              style={{
                left: isLeft ? 392 : 0,
                transform: isLeft
                  ? "matrix(-0.866025, -0.5, 0.5, -0.866025, 0, 0)"
                  : "matrix(-0.866025, 0.5, -0.5, -0.866025, 0, 0)",
                backgroundImage: isLeft
                  ? "linear-gradient(59.8967deg, #110f20 1.5%, rgba(17,15,32,0) 100%)"
                  : "linear-gradient(59.8967deg, rgba(17,15,32,0) 1.5%, #110f20 100%)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

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

      <div className="flex w-full flex-col items-center gap-1">
        <h3 className="text-[20px] leading-[30px] text-white tablet:text-[22px] tablet:leading-[33px]">
          {card.title}
        </h3>
        {card.description && (
          <p className="text-[16px] leading-6 text-ink-100 tablet:text-[18px] tablet:leading-[27px]">
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
      className="relative flex w-full flex-col items-end gap-10 overflow-hidden rounded-[50px] bg-[#110f20] px-4 pt-20 pb-10 shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_8px_#ffffff] tablet:px-10 tablet:pt-24 tablet:pb-16 desktop:gap-20 desktop:px-20 desktop:pt-[130px] desktop:pb-20"
    >
      {/* Scoped to this slab and nowhere else: the overlay is absolute inside a
          section that already clips, and the listeners sit on this element
          rather than on the window. */}
      <SectionCursor />
      <div className="relative flex w-full flex-col items-center gap-5">
        {/* ---- badge, on its beam-lit backdrop ---- */}
        <div className="relative flex size-[150px] items-center justify-center">
          <OrbitBackdrop />

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
