import Image from "next/image";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { whoCanUse } from "@/data/home";

/** "Ideal Users, Who Aston Empowers" — accordion beside a CTA panel. */
export function WhoCanUse() {
  return (
    <section className="section-shell flex-col items-start gap-10 desktop:flex-row desktop:gap-20">
      <div className="flex w-full flex-1 flex-col items-start gap-8 desktop:gap-[60px]">
        <div className="flex w-full flex-col items-start gap-4">
          <SectionBadge {...whoCanUse.badge} />
          <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[38px] desktop:text-[48px] desktop:leading-[57.6px]">
            {whoCanUse.title}
          </h2>
        </div>
        <Accordion
          items={whoCanUse.items.map((item) => ({
            title: item.title,
            body: item.description,
          }))}
        />
      </div>

      <div className="relative flex w-full flex-1 flex-col items-start overflow-hidden rounded-panel border border-line shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_5px_#ffffff]">
        <Image
          src="/images/backgrounds/who-can-use.png"
          alt=""
          fill
          sizes="(min-width: 1320px) 560px, 100vw"
          className="rounded-panel object-cover"
        />

        <div className="relative flex w-full flex-col items-start gap-[10px] px-[10px] pt-[10px]">
          <div className="relative aspect-[540/480] w-full">
            <Image
              src={whoCanUse.panel.image}
              alt=""
              fill
              sizes="(min-width: 1320px) 540px, 100vw"
              className="rounded-panel object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-panel bg-linear-to-b from-[rgba(51,133,255,0)] from-[35%] to-[rgba(51,133,255,0.5)]"
            />
            <div className="absolute top-[10px] left-[10px] flex items-center gap-[6px] rounded-pill bg-surface py-[6px] pr-[14px] pl-[6px]">
              <Image
                src={whoCanUse.panel.avatar}
                alt=""
                width={30}
                height={30}
                className="size-[30px] rounded-pill"
              />
              <span className="text-[16px] leading-6 text-ink-700">
                {whoCanUse.panel.kicker}
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center gap-4 p-6 tablet:flex-row">
          <div className="flex flex-1 flex-col items-start gap-1">
            <h3 className="font-display text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
              {whoCanUse.panel.title}
            </h3>
            <p className="text-[16px] leading-6 text-ink-300">
              {whoCanUse.panel.subtitle}
            </p>
          </div>
          <Button
            href={whoCanUse.panel.ctaHref}
            variant="muted"
            className="h-[49.5px] px-4 py-3"
          >
            {whoCanUse.panel.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
