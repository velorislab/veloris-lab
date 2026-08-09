import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { finalCta } from "@/data/home";

/** "Get Started with Aston" — blue gradient panel with three assurance chips. */
export function FinalCta() {
  return (
    <section
      id="get-started"
      className="section-shell overflow-hidden rounded-section border border-line px-6 py-12 tablet:px-12 tablet:py-16 desktop:gap-[50px] desktop:px-20 desktop:py-[60px]"
      style={{
        backgroundImage:
          "linear-gradient(210.198deg, rgb(0, 101, 255) 0%, rgb(51, 132, 255) 69.6669%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/backgrounds/cta-design.jpg"
          alt=""
          fill
          sizes="(min-width: 1320px) 1200px, 100vw"
          className="object-cover"
        />
        <Image
          src="/images/backgrounds/cta-dots.svg"
          alt=""
          fill
          sizes="(min-width: 1320px) 1200px, 100vw"
          className="object-cover"
        />
        <Image
          src="/images/backgrounds/cta-abstract-grid.svg"
          alt=""
          width={1187}
          height={130}
          className="absolute inset-x-[6.5px] bottom-0 w-[calc(100%-13px)]"
        />
      </div>

      <div className="relative flex w-full max-w-[1040px] flex-col items-center gap-[30px]">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="relative flex size-[92px] items-start justify-start rounded-pill bg-[rgba(2,48,252,0.2)] p-[10px]">
            {/* Two glows spill out beyond the badge: a grid behind it and a
                color-dodge light in front, both clipped by their own boxes. */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-[-140px] left-1/2 z-0 h-[247px] w-[350px] -translate-x-1/2 overflow-hidden"
            >
              <Image
                src="/images/backgrounds/cta-icon-grid.svg"
                alt=""
                fill
                sizes="350px"
                className="object-cover"
              />
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute top-[-63.5px] left-1/2 z-[1] h-[219px] w-[398px] -translate-x-1/2 overflow-hidden"
            >
              <Image
                src="/images/backgrounds/cta-icon-light.png"
                alt=""
                fill
                sizes="398px"
                className="object-cover mix-blend-color-dodge"
              />
            </span>
            <div className="relative z-[2] flex size-[72px] items-center rounded-pill p-4 shadow-[0_6px_8px_0_rgba(131,124,124,0.06),inset_0_2px_2px_0_#81b1fb,inset_2px_0_2px_0_#81b1fb]">
              <Image
                src="/images/backgrounds/cta-icon-plate.svg"
                alt=""
                fill
                sizes="72px"
                className="rounded-pill object-cover"
              />
              <Image
                src="/images/logos/aston-mark-cta.svg"
                alt=""
                width={40}
                height={40}
                className="relative size-10"
              />
            </div>
          </div>

          <div className="flex w-full max-w-[740px] flex-col items-center justify-center gap-[10px] text-center">
            <h2 className="text-[30px] leading-[1.2] text-white tablet:text-[38px] desktop:text-[48px] desktop:leading-[57.6px]">
              {finalCta.title}
            </h2>
            <p className="text-[16px] leading-6 text-page tablet:text-[18px] tablet:leading-[27px]">
              {finalCta.description}
            </p>
          </div>
        </div>

        <ul className="flex flex-wrap items-start justify-center gap-[10px]">
          {finalCta.points.map((point) => (
            <li
              key={point}
              className="flex items-center justify-center gap-[5px] rounded-pill bg-surface py-2 pr-4 pl-2"
            >
              <Image
                src="/images/icons/list/cta-check.svg"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <span className="text-[16px] leading-6 text-ink-500">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button href={finalCta.ctaHref} variant="secondary" className="relative">
        {finalCta.ctaLabel}
      </Button>
    </section>
  );
}
