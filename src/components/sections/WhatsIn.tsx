import Image from "next/image";

import { BeamVideo } from "@/components/ui/BeamVideo";
import { MarqueeColumn } from "@/components/ui/Marquee";
import { whatsIn } from "@/data/home";

/**
 * Positions of the six drifting logos inside one 150×174 ticker cell, taken
 * straight from the source's absolute layout.
 */
const ORBIT_CELL: Array<{
  src: string;
  size: number;
  top: number;
  left: number;
  centre?: boolean;
}> = [
  { src: whatsIn.orbitLogos[0], size: 34, top: 140, left: 0 },
  { src: whatsIn.orbitLogos[1], size: 34, top: 96, left: 75, centre: true },
  { src: whatsIn.orbitLogos[2], size: 28, top: 50, left: 40 },
  { src: whatsIn.orbitLogos[3], size: 28, top: 20, left: 110 },
  { src: whatsIn.orbitLogos[4], size: 28, top: 6, left: 6 },
  { src: whatsIn.orbitLogos[5], size: 34, top: 140, left: 116 },
];

/** One repeated cell of the vertical logo ticker. */
function OrbitCell() {
  return (
    <div className="relative h-[174px] w-[150px] shrink-0">
      {ORBIT_CELL.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt=""
          width={logo.size}
          height={logo.size}
          className="absolute"
          style={{
            top: logo.top,
            left: logo.left,
            width: logo.size,
            height: logo.size,
            transform: logo.centre ? "translateX(-50%)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

/**
 * The composition behind the badge: a grid, two dark beams angled at ±30° and
 * a column of logos drifting downwards. Geometry matches the source's
 * 1380×360 backdrop.
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
            <div
              className="absolute top-[10px] h-[170px] w-[494px] isolate"
              style={{
                left: isLeft ? 181 : 0,
                transform: isLeft ? "rotate(30deg)" : "rotate(-30deg) scaleY(-1)",
              }}
            >
              <BeamVideo flipped={!isLeft} />
              <div className="absolute inset-0 bg-[#0b1023] mix-blend-color" />
              <div className="absolute inset-y-0 left-[282px] w-[212px] bg-[linear-gradient(270deg,#110f20_0%,rgba(17,15,32,0)_100%)]" />
              <div className="absolute inset-y-0 left-0 w-[212px] bg-[linear-gradient(90deg,#110f20_0%,rgba(17,15,32,0)_100%)]" />
              <div className="absolute inset-x-0 top-0 h-[54px] bg-[linear-gradient(178deg,#110f20_0%,rgba(17,15,32,0)_100%)]" />
              <div className="absolute inset-x-0 top-[116px] h-[54px] bg-[linear-gradient(356deg,#110f20_0%,rgba(17,15,32,0)_100%)]" />
            </div>

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

      {/* Logos drifting downwards behind the badge. */}
      <div className="absolute top-0 left-1/2 z-[2] h-[174px] w-[150px] -translate-x-1/2">
        <MarqueeColumn speed={30} direction="down" gap={20} fade={false}>
          <OrbitCell />
          <OrbitCell />
        </MarqueeColumn>
      </div>
    </div>
  );
}

interface CardProps {
  card: (typeof whatsIn.cards)[number];
}

/** Dark feature card: artwork plate on top, copy underneath. */
function Card({ card }: CardProps) {
  return (
    <article className="flex flex-col items-center overflow-hidden rounded-[24px] bg-[#141126]">
      <div className="relative flex w-full flex-col items-start gap-[10px] p-[10px]">
        <div
          className="relative flex w-full items-center justify-center overflow-hidden rounded-panel"
          style={{ aspectRatio: card.aspect, maxHeight: 224 }}
        >
          <Image
            src={card.background}
            alt=""
            fill
            sizes="(min-width: 1320px) 700px, 100vw"
            className="object-cover"
          />
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(min-width: 1320px) 700px, 100vw"
            className="object-cover"
          />
        </div>
        {/* Two stacked gradients fade the artwork into the card, as in the source. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[1px] bottom-0 h-[125px] bg-linear-to-b from-[rgba(20,18,38,0)] from-[51.5%] to-[#141226]"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-1 px-5 pt-5 pb-6 text-center tablet:px-[30px] tablet:pb-[30px]">
        <h3 className="text-[20px] leading-[30px] text-white tablet:text-[22px] tablet:leading-[33px]">
          {card.title}
        </h3>
        {card.description && (
          <p className="text-[16px] leading-6 text-ink-100 tablet:text-[18px] tablet:leading-[27px]">
            {card.description}
          </p>
        )}
      </div>
    </article>
  );
}

/**
 * "What's in our Community" — dark rounded panel with an orbiting logo badge
 * and two rows of artwork cards.
 *
 * The two card rows use uneven column ratios. Those ratios (1.499:1 and
 * 0.886:1:1) are the measured proportions of the original layout, where the
 * widths fall out of each artwork's aspect ratio.
 */
export function WhatsIn() {
  const [wide, half, ...rest] = whatsIn.cards;

  return (
    <section
      id="what-in"
      className="relative flex w-full flex-col items-end gap-10 overflow-hidden rounded-[50px] px-4 pt-20 pb-10 shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_8px_#ffffff] tablet:px-10 tablet:pt-24 tablet:pb-16 desktop:gap-20 desktop:px-20 desktop:pt-[130px] desktop:pb-20"
    >
      <Image
        src="/images/backgrounds/whats-in-section.png"
        alt=""
        fill
        sizes="100vw"
        className="rounded-[50px] object-cover"
      />

      <div className="relative flex w-full flex-col items-center gap-5">
        {/* ---- orbiting logo badge ---- */}
        <div className="relative flex size-[150px] items-center justify-center">
          <OrbitBackdrop />

          <div className="relative z-10 flex size-[150px] items-center justify-center overflow-hidden rounded-pill">
            <Image
              src="/images/backgrounds/whats-in-logo-glow.svg"
              alt=""
              fill
              sizes="150px"
              className="rounded-pill object-cover"
            />
            <div className="relative z-10 flex size-[78px] items-center justify-center overflow-hidden rounded-pill p-[14px]">
              <Image
                src="/images/backgrounds/whats-in-logo-ring.svg"
                alt=""
                fill
                sizes="78px"
                className="rounded-pill object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-pill shadow-[inset_0_2.6px_2.6px_0_#81b1fb,inset_2.6px_0_2.6px_0_#81b1fb,0_7.8px_10.4px_0_rgba(131,124,124,0.06)]"
              />
              <Image
                src="/images/logos/aston-mark.svg"
                alt=""
                width={50}
                height={50}
                className="relative size-[50px]"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex w-full flex-col items-center gap-[14px] text-center">
          <h2 className="text-[28px] leading-[1.25] text-white tablet:text-[40px] desktop:text-[56px] desktop:leading-[72.8px]">
            {whatsIn.title}
          </h2>
          <p className="text-[16px] leading-6 text-line-strong tablet:text-[18px] tablet:leading-[27px]">
            {whatsIn.description}
          </p>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-start gap-5">
        <div className="grid w-full grid-cols-1 gap-5 desktop:grid-cols-[1.499fr_1fr]">
          <Card card={wide} />
          <Card card={half} />
        </div>
        <div className="grid w-full grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-[0.886fr_1fr_1fr]">
          {rest.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
