import Image from "next/image";

import { PhoneMock } from "@/components/ui/PhoneMock";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { mobileApp } from "@/data/home";

/**
 * "Explore Our Mobile App Features" — device card on the left with two floating
 * chips, feature checklist and a video card on the right.
 */
export function MobileApp() {
  return (
    <section
      id="mobile-app"
      className="section-shell flex-col items-center gap-10 desktop:flex-row desktop:gap-[50px]"
    >
      {/* The hairline is an inset ring rather than a real border: the source
          draws it as an overlay, so it must not shrink the card's inner box. */}
      <div className="relative aspect-[488/512] w-full shrink-0 overflow-hidden rounded-panel shadow-[inset_0_0_0_1px_var(--color-line),0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_5px_#ffffff] desktop:w-[488px]">
        <Image
          src="/images/backgrounds/mobile-card.jpg"
          alt=""
          fill
          sizes="(min-width: 1320px) 488px, 100vw"
          className="rounded-panel object-cover"
        />

        {/* Phone mock, centred and pushed below the card's midpoint. */}
        <PhoneMock
          screen="/images/illustrations/mobile-app-screen.png"
          alt="The Aston mobile app"
          sizes="220px"
          className="absolute top-1/2 left-1/2 w-[220px] -translate-x-1/2 -translate-y-1/2"
        />

        <div className="absolute top-[44%] right-[4%] flex items-center gap-1 rounded-pill bg-surface py-2 pr-5 pl-[10px]">
          <Image
            src="/images/icons/list/mobile-card-1.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
          <span className="text-[16px] leading-6 whitespace-nowrap text-ink-500">
            {mobileApp.cardTags[0]}
          </span>
        </div>
        <div className="absolute top-[71%] left-[4%] flex items-center gap-1 rounded-pill bg-surface py-2 pr-5 pl-[10px]">
          <Image
            src="/images/icons/list/mobile-card-2.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
          <span className="text-[16px] leading-6 whitespace-nowrap text-ink-500">
            {mobileApp.cardTags[1]}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col items-start gap-10">
        <div className="flex w-full flex-col items-start gap-[30px]">
          <div className="flex w-full flex-col items-start gap-[14px]">
            <SectionBadge {...mobileApp.badge} />
            <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
              {mobileApp.title}
            </h2>
          </div>
          <ul className="grid w-full grid-cols-1 gap-3 tablet:grid-cols-2">
            {mobileApp.features.map((feature) => (
              <li key={feature.label} className="flex items-center gap-[6px]">
                <Image
                  src={feature.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 shrink-0"
                />
                <span className="text-[16px] leading-6 text-ink-500 tablet:text-[18px] tablet:leading-[27px]">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://www.youtube.com/watch?v=qSDQ3U6Qyaw"
          target="_blank"
          rel="noreferrer noopener"
          /* Both hairlines are overlays in the source. As real borders they
             cost the text column 2px — just enough to wrap the title. */
          className="flex w-full max-w-[418px] items-center gap-5 rounded-card bg-surface py-[10px] pr-[30px] pl-[10px] shadow-[inset_0_0_0_1px_var(--color-line)] transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_var(--color-line),var(--shadow-badge)]"
        >
          <span className="relative h-[86px] w-[136px] shrink-0 overflow-hidden rounded-[12px] shadow-[inset_0_0_0_1px_var(--color-line-soft),0_0_0_3px_#ffffff,0_7px_4px_0_rgba(178,178,178,0.05)]">
            <Image
              src={mobileApp.video.thumbnail}
              alt=""
              fill
              sizes="136px"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-black/12" />
            <span className="absolute top-1/2 left-1/2 flex size-[34px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <Image
                src="/images/icons/play-button-small.svg"
                alt=""
                width={34}
                height={34}
              />
            </span>
          </span>
          <span className="flex flex-1 flex-col items-start gap-[3px]">
            <span className="font-display text-[20px] leading-[30px] text-ink-500">
              {mobileApp.video.title}
            </span>
            <span className="text-[17px] leading-[25.5px] text-ink-250">
              {mobileApp.video.subtitle}
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
