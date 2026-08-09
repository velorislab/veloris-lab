import { Fragment } from "react";

import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * Statement panel with three headline figures.
 * Framer values: 1200px shell, 100px/170px padding, 40px radius, 8px white ring.
 *
 * TWO DEPARTURES FROM THE TEMPLATE, BOTH DELIBERATE.
 *
 * The figures do not count up. The template ticks each one from a lower number
 * to a higher one the first time it scrolls into view, which is a nice motion
 * for an invented statistic and a bad one for a checkable fact: a number that is
 * still climbing while you read it is a number you cannot check. Ours render at
 * their final value, in the same type, in the same place.
 *
 * The panel's fill is a gradient rather than the artwork. `motto-section.png`
 * and the two abstract corner plates were raster files that did not come across
 * with the template, and this panel is the one place where the background is
 * load-bearing rather than decorative: the type on it is white. The gradient
 * below is the blue wash that artwork carries, so the contrast survives without
 * pointing at a file that is not there.
 */
export function Motto({ lang }: { lang: LabLang }) {
  const { motto } = getHome(lang);

  return (
    <section
      className="section-shell relative w-full overflow-hidden rounded-section border border-line px-6 py-14 shadow-[0_0_0_8px_#ffffff,0_17px_24px_0_rgba(178,178,178,0.08)] tablet:px-16 tablet:py-20 desktop:gap-[60px] desktop:px-[170px] desktop:py-[100px]"
      style={{
        backgroundImage:
          "linear-gradient(to top right, #bad6ff 0%, #3384ff 25%, #0065ff 100%)",
      }}
    >
      <div className="relative flex w-full flex-col items-center gap-10 desktop:gap-[60px]">
        <h2 className="max-w-[860px] text-center text-[28px] leading-[1.25] text-white tablet:text-[40px] desktop:text-[56px] desktop:leading-[72.8px]">
          {motto.title}
        </h2>

        {/* Figures sit in equal-width columns separated by hairlines; the
            labels are allowed to overflow their column rather than wrap. */}
        <div className="flex w-full max-w-[860px] flex-col items-center justify-center gap-8 tablet:flex-row tablet:gap-[60px] desktop:px-20">
          {motto.stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && (
                <div aria-hidden className="hidden h-[58px] w-px shrink-0 bg-white tablet:block" />
              )}
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
                <p className="flex items-center justify-center font-display text-[38px] leading-[1.2] text-white desktop:text-[50px] desktop:leading-[60px]">
                  {stat.value}
                  {stat.suffix && <span aria-hidden>{stat.suffix}</span>}
                </p>
                <p className="text-center text-[16px] leading-6 whitespace-nowrap text-surface-muted tablet:text-[18px] tablet:leading-[27px]">
                  {stat.label}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
