import Image from "next/image";

import { Marquee } from "@/components/ui/Marquee";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { downloadApp } from "@/data/home";

/** "Get the App for Seamless Learning" — store buttons beside a screen ticker. */
export function DownloadApp() {
  return (
    <section
      id="download-app"
      className="section-shell flex-col items-center gap-10 desktop:flex-row desktop:gap-[60px]"
    >
      <div className="flex w-full flex-1 flex-col items-start gap-10">
        <div className="flex w-full flex-col items-start gap-[14px]">
          <SectionBadge {...downloadApp.badge} />
          <div className="flex w-full flex-col items-start gap-[30px] desktop:pr-6">
            <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
              {downloadApp.title}
            </h2>
            <div className="flex flex-wrap items-start gap-4">
              {downloadApp.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-[6px] rounded-pill border border-line bg-surface py-2 pr-[18px] pl-3"
                >
                  <Image
                    src={stat.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6"
                  />
                  <span className="text-[16px] leading-6 text-ink-500 tablet:text-[18px] tablet:leading-[27px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-[14px]">
          {downloadApp.buttons.map((button) => (
            <a
              key={button.large}
              href={button.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-[70px] items-center justify-center gap-[10px] rounded-[12px] border border-line-strong bg-surface-alt py-4 pr-7 pl-4 transition-colors duration-200 hover:bg-line-soft"
            >
              <Image
                src={button.icon}
                alt=""
                width={30}
                height={30}
                className="size-[30px]"
              />
              <span className="flex flex-col items-start justify-center gap-[6px]">
                <span className="text-[15px] leading-[15px] text-ink-300">
                  {button.small}
                </span>
                <span className="text-[17px] leading-[17px] text-ink-800">
                  {button.large}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="relative flex aspect-[570/452] w-full flex-1 items-center justify-center overflow-hidden rounded-panel border border-line shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_5px_#ffffff]">
        <Image
          src="/images/backgrounds/download-ticker.jpg"
          alt=""
          fill
          sizes="(min-width: 1320px) 570px, 100vw"
          className="rounded-panel object-cover"
        />
        {/* Twelve slides in the source: the four screens repeated three times. */}
        <Marquee gap={30} speed={50} fade={false} className="relative">
          {[...downloadApp.screens, ...downloadApp.screens, ...downloadApp.screens].map(
            (screen, index) => (
              <Image
                key={`${screen}-${index}`}
                src={screen}
                alt=""
                width={182}
                height={390}
                className="h-[390px] w-[182px] shrink-0 rounded-[18px] object-cover"
              />
            ),
          )}
        </Marquee>
      </div>
    </section>
  );
}
