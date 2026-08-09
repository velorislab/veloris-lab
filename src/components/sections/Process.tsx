import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { getHome, type HomeContent } from "@/data/content";
import type { LabLang } from "@/site/labData";

type ProcessStep = HomeContent["process"]["steps"][number];

/**
 * One step. The template's card was two thirds artwork: a well holding an
 * oversized phone render on a dotted plate, with two SVG notches tucking the
 * white text panel under it. `screen` is empty for all five of our steps and
 * always will be — there is no product screenshot of a scoping call — so the
 * well, the notches and the plates are gone and the text panel is the card.
 *
 * The panel itself is untouched: same 6px frame, same hairline and white ring,
 * same numbered pill, same 22px display title over 16px body.
 */
function StepCard({ step }: { step: ProcessStep }) {
  return (
    <article className="relative flex w-full flex-col overflow-hidden rounded-[24px] bg-linear-to-b from-[#ebf3f9] via-[#f2f8fc] to-[#fbfdfe] p-[6px] shadow-[0_0_0_1px_var(--color-line),0_0_0_5px_#ffffff] tablet:w-[calc((100%-20px)/2)] desktop:w-[calc((100%-40px)/3)]">
      {/* `grow` keeps every panel in a row the same height now that the artwork
          well is not setting it. */}
      <div className="relative flex w-full grow flex-col items-center justify-center gap-3 rounded-panel bg-surface px-[30px] py-6 shadow-[0_2px_4px_0_rgba(178,180,187,0.2),0_-2px_6px_0_rgba(182,182,182,0.1)]">
        <span className="rounded-pill border border-line-soft px-[10px] py-[5px] text-[15px] leading-[22.5px] text-ink-500">
          {step.step}
        </span>
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="font-display text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
            {step.title}
          </h3>
          <p className="text-[16px] leading-6 text-ink-300">
            {step.description}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * The five steps, and the closing CTA.
 *
 * The template ran three steps in a `grid-cols-3`. Five in that grid leaves the
 * last row hanging off to the left, so the track is a wrapping flex row at the
 * template's own widths: same 20px gutter, same two-then-three column counts,
 * with the trailing row centred instead of orphaned. Card widths are the grid's
 * arithmetic written out, so the rhythm does not move.
 *
 * The card background was process-section.png, the same wash as the "who can
 * use" panel. Its three stops are reproduced in CSS; see the note there.
 */
export function Process({ lang }: { lang: LabLang }) {
  const { process } = getHome(lang);

  return (
    <section
      id="process"
      className="section-shell items-start gap-10 desktop:gap-[60px]"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <SectionBadge {...process.badge} />
        <div className="flex w-full max-w-[780px] flex-col items-center gap-[14px] text-center">
          <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
            {process.title}
          </h2>
          {process.description && (
            <p className="text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]">
              {process.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-8 desktop:gap-[50px]">
        <div className="flex w-full flex-wrap justify-center gap-5">
          {process.steps.map((step) => (
            <StepCard key={step.step} step={step} />
          ))}
        </div>
        {process.ctaLabel && (
          <Button href={process.ctaHref}>{process.ctaLabel}</Button>
        )}
      </div>
    </section>
  );
}
