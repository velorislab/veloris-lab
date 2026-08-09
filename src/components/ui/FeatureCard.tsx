import Image from "next/image";

import type { FeatureItem } from "@/data/home";

/**
 * Shared feature card used by both feature grids.
 * Framer values: 20px radius, 4px white ring, 40px/30px padding, 66px icon.
 */
export function FeatureCard({ item }: { item: FeatureItem }) {
  return (
    <article className="relative flex flex-col items-center justify-center gap-[30px] overflow-hidden hairline rounded-panel px-[30px] py-10 text-center shadow-[var(--shadow-ring)]">
      <Image
        src="/images/backgrounds/feature-card.svg"
        alt=""
        fill
        sizes="(min-width: 1320px) 340px, (min-width: 810px) 50vw, 100vw"
        className="rounded-panel object-cover"
      />
      <div className="relative size-[66px] shrink-0">
        <Image
          src="/images/backgrounds/feature-icon-plate.svg"
          alt=""
          width={66}
          height={66}
          className="absolute inset-0 size-[66px] rounded-pill"
        />
        <Image
          src={item.icon}
          alt=""
          width={66}
          height={66}
          className="absolute inset-0 size-[66px] rounded-pill"
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-pill shadow-[0_6px_8px_0_rgba(131,124,124,0.06),inset_0_2px_2px_0_#81b1fb,inset_2px_0_2px_0_#81b1fb]"
        />
      </div>
      <div className="relative flex flex-col items-center justify-center gap-[6px]">
        <h3 className="text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
          {item.title}
        </h3>
        <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
          {item.description}
        </p>
      </div>
    </article>
  );
}
