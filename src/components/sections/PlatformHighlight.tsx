import Image from "next/image";

import { Marquee } from "@/components/ui/Marquee";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { platformHighlight, type TickerTag } from "@/data/home";

function Tag({ tag }: { tag: TickerTag }) {
  return (
    <div className="flex h-16 shrink-0 items-center gap-2 overflow-hidden hairline rounded-pill bg-surface py-2 pr-4 pl-2 shadow-[0_0_0_4px_rgba(255,255,255,0.5)]">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-[#e5f0ff] p-[10px] shadow-[0_7px_4px_0_rgba(178,178,178,0.05)]">
        <Image src={tag.icon} alt="" width={28} height={28} className="size-7" />
      </span>
      <span className="font-display text-[20px] leading-[30px] whitespace-nowrap text-ink-800">
        {tag.label}
      </span>
    </div>
  );
}

/**
 * "Platform Highlights" — three ticker rows of course-category tags.
 * Middle row travels in the opposite direction, as in the source.
 */
export function PlatformHighlight() {
  const rows = [
    platformHighlight.tags.slice(0, 6),
    platformHighlight.tags.slice(6, 12),
    platformHighlight.tags.slice(12, 18),
  ];

  return (
    <section
      id="highlight"
      className="relative flex w-full max-w-[1036px] flex-col items-start gap-10 overflow-hidden rounded-section border border-line p-6 shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_6px_#ffffff] tablet:p-10 desktop:gap-[60px] desktop:p-[50px]"
      style={{
        backgroundImage:
          "radial-gradient(63.001% 100% at 50% 0%, rgb(212, 231, 246) 0%, rgb(240, 247, 252) 82.4379%, rgb(246, 247, 249) 100%)",
      }}
    >
      {/* Layer order and blending are the source's: a soft light wash, the two
          ray grids, then the blue wave art on each side blended with
          `hard-light` — which is what lets the waves sit *in* the gradient
          rather than on top of it. */}
      {/* No `isolate` here on purpose: the wave art blends with the section's
          radial gradient as well as these layers, so it must stay in the
          section's stacking context. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-section"
      >
        <Image
          src="/images/backgrounds/highlight-light.jpg"
          alt=""
          width={1036}
          height={527}
          sizes="(min-width: 1320px) 1036px, 100vw"
          className="absolute inset-x-0 top-[-3.84px] aspect-[1036/527] w-full object-cover"
        />
        <Image
          src="/images/backgrounds/highlight-grid-top.svg"
          alt=""
          width={1036}
          height={168}
          className="absolute inset-x-0 top-0 aspect-[1036/168] w-full object-cover"
        />
        <Image
          src="/images/backgrounds/highlight-grid-bottom.svg"
          alt=""
          width={861}
          height={222}
          className="absolute bottom-0 left-1/2 aspect-[861/222] w-[83.11%] -translate-x-1/2 object-cover"
        />
        <Image
          src="/images/backgrounds/highlight-design-left.svg"
          alt=""
          width={346}
          height={465}
          className="absolute top-0 left-0 aspect-[346/465] w-[33.4%] object-cover mix-blend-hard-light"
        />
        <Image
          src="/images/backgrounds/highlight-design-right.svg"
          alt=""
          width={346}
          height={465}
          className="absolute top-0 right-0 aspect-[346/465] w-[33.4%] object-cover mix-blend-hard-light"
        />
      </div>

      <div className="relative flex w-full flex-col items-center gap-4">
        <SectionBadge {...platformHighlight.badge} />
        <h2 className="text-center text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {platformHighlight.title}
        </h2>
      </div>

      <div className="relative flex w-full flex-col items-start gap-3">
        {rows.map((row, index) => (
          <Marquee
            key={index}
            gap={18}
            speed={30}
            direction={index === 1 ? "right" : "left"}
            className="h-[70px] items-center"
          >
            {row.map((tag) => (
              <Tag key={tag.label} tag={tag} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
