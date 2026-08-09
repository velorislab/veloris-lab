import Image from "next/image";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * "You can check all of this without us" — the five claims a reader can verify
 * on their own, in the template's 3-column card grid (1080px shell).
 *
 * NOT `FeatureCard`, and the difference is one element. That card centres a
 * 66px glyph on a blue plate, and the template had a glyph drawn per feature.
 * We have none: the only icons in the repo are the template's own feature set,
 * whose meanings belong to a course platform, and the 24px badge glyphs, which
 * are stroked in accent blue and would vanish on a blue plate. Rather than
 * repeat one borrowed mark five times, the plate carries the item's position.
 * A count is the one thing on this card that cannot be a claim.
 *
 * Everything else — plate, card plate, ring, padding, type scale — is
 * `FeatureCard` unchanged, so the two grids still read as one component.
 */
export function CoreFeatures({ lang }: { lang: LabLang }) {
  const { coreFeatures } = getHome(lang);

  return (
    <section
      id="features"
      className="flex w-full max-w-[1080px] flex-col items-center gap-10 desktop:gap-20"
    >
      <SectionHeading
        badge={coreFeatures.badge}
        title={coreFeatures.title}
        description={coreFeatures.description}
        textWidth={780}
      />
      <div className="grid w-full grid-cols-1 gap-[30px] tablet:grid-cols-2 desktop:grid-cols-3">
        {coreFeatures.items.map((item) => (
          <article
            key={item.title}
            className="relative flex flex-col items-center justify-center gap-[30px] overflow-hidden hairline rounded-panel px-[30px] py-10 text-center shadow-[var(--shadow-ring)]"
          >
            <Image
              src="/images/backgrounds/feature-card.svg"
              alt=""
              fill
              sizes="(min-width: 1320px) 340px, (min-width: 810px) 50vw, 100vw"
              className="rounded-panel object-cover"
            />
            <div className="relative size-[66px] shrink-0">
              <Image
                src="/images/backgrounds/feature-icon-plate.svg"
                alt=""
                width={66}
                height={66}
                className="absolute inset-0 size-[66px] rounded-pill"
              />
              {/* aria-hidden: the position is the plate's decoration, and a
                  screen reader announcing "01" before every heading in a list
                  of five adds noise, not order. */}
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center font-display text-[22px] leading-none text-white"
              >
                {String(item.index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 rounded-pill shadow-[0_6px_8px_0_rgba(131,124,124,0.06),inset_0_2px_2px_0_#81b1fb,inset_2px_0_2px_0_#81b1fb]"
              />
            </div>
            <div className="relative flex flex-col items-center justify-center gap-[6px]">
              <h3 className="text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
                {item.title}
              </h3>
              <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
