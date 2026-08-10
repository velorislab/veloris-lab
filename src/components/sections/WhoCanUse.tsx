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

        {/* CARDS, NOT AN ACCORDION, and the reason is the buttons.
            These three are not a sequence, they are three doors: a reader
            arrives already knowing which of the three they are. An accordion
            shows one and hides the other two behind a click, and it has nowhere
            to put a call to action, so the whole section used to funnel into the
            single button in the panel beside it. Someone who recognises
            themselves in the third door had to scroll past the other two to act.
            Each card now names the situation it answers and ends on its own
            button: two at the calculator, one at the conversation, because a
            running system is not something a calculator can price. */}
        {whoCanUse.items.length > 0 && (
          <ul className="flex w-full flex-col gap-[14px]">
            {whoCanUse.items.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-2 rounded-panel bg-surface p-5 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)] tablet:p-6"
              >
                <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                  {item.marker}
                </span>
                <h3 className="text-[19px] leading-7 text-ink-900 tablet:text-[21px] tablet:leading-8">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[22px] text-ink-300 tablet:text-[16px] tablet:leading-6">
                  {item.description}
                </p>
                <a
                  href={item.ctaHref}
                  className="mt-1 self-start text-[15px] leading-6 font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                >
                  {item.ctaLabel}
                </a>
              </li>
            ))}
          </ul>
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
