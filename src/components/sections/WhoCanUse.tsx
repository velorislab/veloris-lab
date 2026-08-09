import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * The three starting points, as an accordion beside a panel.
 *
 * WHAT CHANGED, AND WHY.
 *
 * The template's side panel was a picture: a 540x480 illustration plate with a
 * blue gradient scrim over it and, pinned to its top-left corner, a pill that
 * read "Made for professionals" beside a stock avatar. Neither the plate nor
 * the avatar is in this repo, and the avatar was a stranger's face used as
 * social proof, so the panel is rebuilt out of the four strings content.ts
 * supplies for it: kicker, title, subtitle, CTA.
 *
 * Everything else is the template's, class for class.
 */
export function WhoCanUse({ lang }: { lang: LabLang }) {
  const { whoCanUse } = getHome(lang);
  const { panel } = whoCanUse;

  return (
    <section className="section-shell flex-col items-start gap-10 desktop:flex-row desktop:gap-20">
      <div className="flex w-full flex-1 flex-col items-start gap-8 desktop:gap-[60px]">
        <div className="flex w-full flex-col items-start gap-4">
          <SectionBadge {...whoCanUse.badge} />
          {/* Title and lede in one 14px stack — the pairing SectionHeading uses
              for every other section header in the template. The template's own
              `whoCanUse` had no lede slot; ours does, and it is the line that
              explains what the three accordion rows are choosing between. */}
          <div className="flex w-full flex-col items-start gap-[14px]">
            <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[38px] desktop:text-[48px] desktop:leading-[57.6px]">
              {whoCanUse.title}
            </h2>
            {whoCanUse.description && (
              <p className="text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]">
                {whoCanUse.description}
              </p>
            )}
          </div>
        </div>

        {whoCanUse.items.length > 0 && (
          <Accordion
            items={whoCanUse.items.map((item) => ({
              title: item.title,
              body: item.description,
            }))}
          />
        )}
      </div>

      {/* The panel fill was who-can-use.png, a 2240x2416 wash running
          #ebf3f9 -> #f2f8fc -> #fbfdfe top to bottom. The file is not in the
          repo; those three stops are, measured off the original, so the wash is
          drawn instead of loaded. No path is invented and the panel keeps the
          colour it had.

          `desktop:self-stretch` does the job the illustration used to: in the
          template this panel ran 600px against the accordion column's 566 and
          set the row height. Without a picture it would collapse to the height
          of three lines and leave the right half of the section empty.

          The padding sits on the inner wrapper, not on this flex item. A
          `flex-1` item can never be narrower than its own padding and border,
          so padding out here would have been added on top of an even split and
          pushed the column to 601px against the accordion's 519. */}
      <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-panel border border-line bg-linear-to-b from-[#ebf3f9] via-[#f2f8fc] to-[#fbfdfe] shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_5px_#ffffff] desktop:self-stretch">
        <div className="flex w-full grow flex-col items-start justify-center gap-8 p-6 tablet:p-8 desktop:p-10">
          {panel.kicker && (
            <span className="rounded-pill bg-surface px-[14px] py-[6px] text-[16px] leading-6 text-ink-700">
              {panel.kicker}
            </span>
          )}

          <div className="flex w-full flex-col items-start gap-1">
            <h3 className="font-display text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
              {panel.title}
            </h3>
            <p className="text-[16px] leading-6 text-ink-300">
              {panel.subtitle}
            </p>
          </div>

          {panel.ctaLabel && (
            <Button
              href={panel.ctaHref}
              variant="muted"
              className="h-[49.5px] px-4 py-3"
            >
              {panel.ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
