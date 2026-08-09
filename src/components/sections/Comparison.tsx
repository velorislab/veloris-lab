import Image from "next/image";

import { SectionBadge } from "@/components/ui/SectionBadge";
import { comparison } from "@/data/home";
import { siteConfig } from "@/config/site";

function Row({ label, active }: { label: string; active: boolean }) {
  return (
    <li className="flex items-center gap-[6px]">
      <Image
        src={active ? "/images/icons/check-blue.svg" : "/images/icons/cross-grey.svg"}
        alt=""
        width={24}
        height={24}
        className="size-6 shrink-0"
      />
      {/* Both columns use the same ink; only the icon differs in the source. */}
      <span className="text-[16px] leading-6 text-ink-600 tablet:text-[18px] tablet:leading-[27px]">
        {label}
      </span>
    </li>
  );
}

/** "Choosing Aston Over Others" — two panels side by side. */
export function Comparison() {
  return (
    <section
      id="comparison"
      className="flex w-full max-w-[995px] flex-col items-start gap-10 desktop:gap-20"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <SectionBadge {...comparison.badge} />
        <h2 className="text-center text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {comparison.title}
        </h2>
      </div>

      <div className="flex w-full flex-col items-center gap-[30px] desktop:flex-row">
        {/* ---- other platforms ---- */}
        <div className="relative flex w-full flex-1 flex-col items-start gap-[14px] overflow-hidden hairline rounded-panel p-5 shadow-[0_0_0_5px_#ffffff]">
          <Image
            src="/images/backgrounds/comparison-others.svg"
            alt=""
            fill
            sizes="(min-width: 1320px) 482px, 100vw"
            className="rounded-panel object-cover"
          />
          <div className="relative flex w-full items-center justify-center px-[10px] py-[14px]">
            <p className="font-display text-[24px] leading-[28.8px] text-ink-800">
              {comparison.othersLabel}
            </p>
          </div>
          <ul className="relative flex w-full flex-col items-start gap-5 overflow-hidden hairline rounded-panel bg-surface p-5 shadow-[0_2px_6px_0_rgba(182,182,182,0.1)]">
            {comparison.rows.map((row) => (
              <Row key={row.others} label={row.others} active={false} />
            ))}
          </ul>
        </div>

        {/* ---- Aston ---- */}
        <div className="relative flex w-full flex-1 flex-col items-start gap-[14px] overflow-hidden rounded-panel p-5 shadow-[0_0_0_5px_#ffffff]">
          <Image
            src="/images/backgrounds/comparison-aston.jpg"
            alt=""
            fill
            sizes="(min-width: 1320px) 482px, 100vw"
            className="rounded-panel object-cover"
          />
          <div className="relative flex w-full items-center justify-center px-[10px]">
            {/* Source split: 71px glyph plate + 84px wordmark cell, wrapped in
                a 3px blue ring. The ring is an overlay rather than a real
                border so it doesn't eat into the 71+84 split. */}
            <div className="relative flex h-[57px] w-[155px] items-center justify-center overflow-hidden rounded-pill">
              <span className="relative h-[57px] w-[71px] shrink-0 overflow-hidden rounded-l-[30px]">
                <Image
                  src="/images/backgrounds/comparison-logo-shape.png"
                  alt=""
                  fill
                  sizes="71px"
                  className="rounded-l-[30px] object-cover"
                />
                {/* Inset rim: 68×51 offset 3px from the top-left only. */}
                <span
                  aria-hidden
                  className="absolute top-[3px] left-[3px] z-[1] h-[51px] w-[68px] rounded-l-[30px] shadow-[inset_0_2px_5.2px_0_#81b1fb,inset_2px_0_9.9px_0_#81b1fb]"
                />
                <Image
                  src="/images/logos/aston-mark-comparison.svg"
                  alt=""
                  width={39}
                  height={39}
                  className="absolute top-[8.5px] left-[18px] z-[1] size-[39px]"
                />
              </span>
              <span className="flex h-[57px] w-[84px] shrink-0 items-center pl-2 font-display text-[20px] leading-[30px] text-ink-800">
                {siteConfig.name}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[2] rounded-pill border-[3px] border-[#3385ff]"
              />
            </div>
          </div>
          <ul className="relative flex w-full flex-col items-start gap-5 overflow-hidden rounded-panel bg-surface p-5 shadow-[0_2px_6px_0_rgba(182,182,182,0.1)]">
            {comparison.rows.map((row) => (
              <Row key={row.aston} label={row.aston} active />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
