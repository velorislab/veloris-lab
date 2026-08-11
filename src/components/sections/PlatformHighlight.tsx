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
  const { tags, groups, model } = platformHighlight;
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
        {/* The lead was written and never rendered: this section showed a badge,
            a heading and a ticker, and the sentence that says the list is not a
            fence sat in content.ts going nowhere. It is the framing the whole
            section needs, so it goes under the heading where a lead belongs. */}
        {platformHighlight.description && (
          <p className="max-w-[820px] text-center text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
            {platformHighlight.description}
          </p>
        )}
      </div>

      {/* ONE ROW, AND aria-hidden, and both are corrections to the change that
          put seventy-one names in here.

          Three rows, each duplicated by the marquee so the loop has no seam, put
          426 tool names into the page text in a row. On screen that is a ticker;
          in the accessibility tree, in a text extraction and to a search engine
          it is a wall of nouns that buries everything after it. The grouped cards
          directly below carry every one of those names in a real list with a
          heading and a sentence, so the ticker owes the reader nothing: it is
          decoration and now declares itself as such. One row instead of three
          for the same reason, plus it no longer competes with the cards. */}
      {tags.length > 0 && (
        <div aria-hidden className="relative flex w-full flex-col items-start gap-3">
          {rows.slice(0, 1).map((row, index) => (
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

      {/* THE SAME STACK, GROUPED AND EXPLAINED.
          A ticker of names says how much there is and nothing about what any of
          it is for, which is the whole weakness of a logo wall. Each group here
          leads with one sentence about why the group exists, then lists what is
          in it. A group with a reason attached is worth more than a longer list
          without one. */}
      {groups.length > 0 && (
        <div className="relative grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2">
          {groups.map((g) => (
            <div
              key={g.key}
              className="flex flex-col gap-3 rounded-panel bg-surface/80 p-5 backdrop-blur-[2px] shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)] tablet:p-6"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                  {g.kicker}
                </span>
                <h3 className="text-[18px] leading-7 text-ink-800 tablet:text-[20px] tablet:leading-[30px]">
                  {g.title}
                </h3>
                <p className="text-[15px] leading-[22px] text-ink-300">{g.lead}</p>
              </div>
              <ul className="flex flex-wrap gap-[6px]">
                {g.items.map((t: string) => (
                  <li
                    key={t}
                    className="rounded-pill bg-surface-muted px-[10px] py-[5px] text-[13px] leading-5 text-ink-500"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* THE MODEL OF WORK, closing the section.
          This is where it belongs: a reader who has just been shown a hundred and
          sixty technologies is one step away from wondering what any of it costs
          to be tied to. Two of the three are read from the price table so they
          cannot drift; the third is a contract term. */}
      {model.length > 0 && (
        <div className="relative flex w-full flex-col items-center gap-6 border-t border-line-soft pt-8">
          <p className="max-w-[720px] text-center font-display text-[20px] leading-[30px] text-ink-800 tablet:text-[24px] tablet:leading-9">
            {platformHighlight.modelLabel}
          </p>
          <ul className="flex w-full flex-col items-stretch gap-4 tablet:flex-row tablet:justify-center tablet:gap-0">
            {model.map((m, i) => (
              <li
                key={m.k}
                className={
                  "flex flex-1 flex-col items-center gap-1 text-center tablet:px-8 " +
                  (i > 0 ? "tablet:border-l tablet:border-line-soft" : "")
                }
              >
                <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                  {String(i + 1).padStart(2, "0")} / {m.k}
                </span>
                <span className="font-display text-[20px] leading-8 font-semibold text-ink-900 tablet:text-[22px]">
                  {m.v}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
