import Image from "next/image";

import { Marquee } from "@/components/ui/Marquee";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * One ticker pill.
 *
 * The template's pill opened with a 48px icon plate because every tag was a
 * course category with its own illustration. Our tags are tool names and there
 * is no per-tool artwork in this repo, so the plate is gone and the padding is
 * balanced instead. Height, radius, ring, type and colour are the template's.
 */
function Tag({ label }: { label: string }) {
  return (
    <div className="flex h-16 shrink-0 items-center overflow-hidden hairline rounded-pill bg-surface px-6 shadow-[0_0_0_4px_rgba(255,255,255,0.5)]">
      <span className="font-display text-[20px] leading-[30px] whitespace-nowrap text-ink-800">
        {label}
      </span>
    </div>
  );
}

/** Move the first `by` items to the back, so each row starts somewhere else. */
function rotate<T>(items: T[], by: number): T[] {
  if (items.length === 0) return items;
  const n = by % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

/**
 * The stack, as three ticker rows. The middle row travels in the opposite
 * direction, as in the source.
 *
 * The template fed the three rows from eighteen tags, six each. We have twelve
 * tools, and slicing them six / six / nothing would leave the third row empty
 * and each row too narrow to loop without a visible gap in it. So every row
 * carries the whole list, rotated, which fills the track and keeps a row from
 * repeating a name against itself. Nothing is added: the three rows are the
 * same twelve tools in three orders.
 */
export function PlatformHighlight({ lang }: { lang: LabLang }) {
  const { platformHighlight } = getHome(lang);
  const { tags } = platformHighlight;
  const step = Math.ceil(tags.length / 3);
  const rows = [0, 1, 2].map((index) => rotate(tags, index * step));

  return (
    <section
      id="highlight"
      className="relative flex w-full max-w-[1036px] flex-col items-start gap-10 overflow-hidden rounded-section border border-line p-6 shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_6px_#ffffff] tablet:p-10 desktop:gap-[60px] desktop:p-[50px]"
      style={{
        backgroundImage:
          "radial-gradient(63.001% 100% at 50% 0%, rgb(212, 231, 246) 0%, rgb(240, 247, 252) 82.4379%, rgb(246, 247, 249) 100%)",
      }}
    >
      {/* Layer order and blending are the source's: the two ray grids, then the
          blue wave art on each side blended with `hard-light` — which is what
          lets the waves sit *in* the gradient rather than on top of it.

          The source laid a photographic light wash under all of this. It was a
          .jpg and did not come across; the section's own radial gradient is the
          same wash within a shade, so the layer is simply gone rather than
          pointing at a missing file. */}
      {/* No `isolate` here on purpose: the wave art blends with the section's
          radial gradient as well as these layers, so it must stay in the
          section's stacking context. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-section"
      >
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

      {tags.length > 0 && (
        <div className="relative flex w-full flex-col items-start gap-3">
          {rows.map((row, index) => (
            <Marquee
              key={index}
              gap={18}
              speed={30}
              direction={index === 1 ? "right" : "left"}
              className="h-[70px] items-center"
            >
              {row.map((label) => (
                <Tag key={label} label={label} />
              ))}
            </Marquee>
          ))}
        </div>
      )}
    </section>
  );
}
