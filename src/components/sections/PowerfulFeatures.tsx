import Image from "next/image";

import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { powerfulFeatures } from "@/data/home";

/**
 * "Explore the Powerful Features of Aston" — copy plus highlight chips on the
 * left, a 2×2 card grid on the right.
 */
export function PowerfulFeatures() {
  return (
    <section
      id="benefits"
      className="section-shell flex-col items-center gap-10 desktop:flex-row desktop:gap-[60px]"
    >
      <div className="flex w-full flex-col items-start gap-[30px] desktop:max-w-[463px] desktop:flex-1">
        <div className="flex flex-col items-start gap-4">
          <SectionBadge {...powerfulFeatures.badge} />
          <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[38px] desktop:text-[48px] desktop:leading-[57.6px]">
            {powerfulFeatures.title}
          </h2>
        </div>
        <ul className="flex flex-wrap items-start gap-3">
          {powerfulFeatures.highlights.map((highlight, index) => (
            <li
              key={highlight}
              className="flex items-center gap-[6px] rounded-pill border border-line bg-surface py-[6px] pr-4 pl-[6px]"
            >
              <Image
                src="/images/icons/list/benefits-check.svg"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              {/* The source sets the last chip a shade darker than the rest. */}
              <span
                className={`text-[16px] leading-6 tablet:text-[18px] tablet:leading-[27px] ${
                  index === powerfulFeatures.highlights.length - 1
                    ? "text-ink-700"
                    : "text-ink-600"
                }`}
              >
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid w-full flex-1 grid-cols-1 gap-5 tablet:grid-cols-2">
        {powerfulFeatures.items.map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
