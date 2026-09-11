import { Button } from "@/components/ui/Button";
import { ProcessTrack } from "@/components/sections/ProcessTrack";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * Five stations on one rail. Support is the last stop on that rail, not a
 * leftover card on a second row: the wrapping 3+2 grid was what made the
 * fifth step look like an upsell.
 *
 * Below 1320px the rail stands up in a 56px column beside the copy. Five
 * centred columns of this copy will not fit a tablet, and a line drawn through
 * the stacked captions would cut the text. Vertical, the mark still travels
 * the same five stops. On desktop, wells and copy sit on the centre of each
 * station: the numbers were a second index next to the order the rail already
 * draws.
 */
export function Process({ lang }: { lang: LabLang }) {
  const { process } = getHome(lang);

  return (
    <section
      id="process"
      className="section-shell items-start gap-10 desktop:gap-[60px]"
    >
      <div className="flex w-full flex-col items-center gap-[14px] text-center">
        <h2 className="max-w-[900px] text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {process.title}
        </h2>
        {process.description && (
          <p className="max-w-[780px] text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]">
            {process.description}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-8 desktop:gap-[50px]">
        <ProcessTrack steps={process.steps} />
        {process.ctaLabel && (
          <Button href={process.ctaHref}>{process.ctaLabel}</Button>
        )}
      </div>
    </section>
  );
}
