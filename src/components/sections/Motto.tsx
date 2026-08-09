import Image from "next/image";
import { Fragment } from "react";

import { CountUp } from "@/components/ui/CountUp";
import { motto } from "@/data/home";

/**
 * Dark statement panel with three headline figures.
 * Framer values: 1200px shell, 100px/170px padding, 40px radius, 8px white ring.
 */
export function Motto() {
  return (
    <section className="section-shell relative w-full overflow-hidden rounded-section border border-line px-6 py-14 shadow-[0_0_0_8px_#ffffff,0_17px_24px_0_rgba(178,178,178,0.08)] tablet:px-16 tablet:py-20 desktop:gap-[60px] desktop:px-[170px] desktop:py-[100px]">
      <Image
        src="/images/backgrounds/motto-section.png"
        alt=""
        fill
        sizes="(min-width: 1320px) 1200px, 100vw"
        className="rounded-section object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 hidden h-[488px] w-[393px] tablet:block"
      >
        <Image
          src="/images/backgrounds/motto-abstract-left.png"
          alt=""
          fill
          sizes="393px"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 hidden h-[488px] w-[393px] tablet:block"
      >
        <Image
          src="/images/backgrounds/motto-abstract-right.png"
          alt=""
          fill
          sizes="393px"
          className="object-cover"
        />
      </div>

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
                  {stat.from !== undefined && stat.to !== undefined ? (
                    <CountUp from={stat.from} to={stat.to} />
                  ) : (
                    stat.value
                  )}
                  <span aria-hidden>{stat.suffix}</span>
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
