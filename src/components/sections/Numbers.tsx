import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { numbers, type StatItem } from "@/data/home";

/** Single figure tile: 16px radius, 4px white ring, glow plate behind. */
function StatCard({ stat, className = "" }: { stat: StatItem; className?: string }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden hairline rounded-card px-5 py-6 text-center shadow-[var(--shadow-ring)] ${className}`}
    >
      <Image
        src="/images/backgrounds/numbers-text-glow.svg"
        alt=""
        fill
        sizes="229px"
        className="rounded-card object-cover"
      />
      <p className="relative flex items-center justify-center font-display text-[36px] leading-[1.2] text-ink-800 desktop:text-[44px] desktop:leading-[52.8px]">
        {stat.value}
        <span className="text-accent">{stat.suffix}</span>
      </p>
      <p className="relative text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
        {stat.label}
      </p>
    </div>
  );
}

/** "Impressive Figures and Facts" — figures on the left, copy and CTAs right. */
export function Numbers() {
  const [first, second, third, fourth] = numbers.stats;

  return (
    <section
      id="numbers"
      className="flex w-full max-w-[1036px] flex-col items-center gap-10 desktop:flex-row desktop:gap-20"
    >
      <div className="relative flex w-full flex-1 flex-col items-center gap-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(52.337% 50% at 50% 50%, rgba(219, 233, 249, 0.5) 14.437%, rgba(242, 247, 253, 0) 100%)",
          }}
        />
        <Image
          src="/images/backgrounds/numbers-grid.svg"
          alt=""
          width={477}
          height={383}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-5 w-full"
        />
        <div className="relative flex w-full flex-col items-center justify-center gap-5">
          <StatCard stat={first} className="w-[229px] max-w-full" />
          <div className="flex w-full items-center gap-5">
            <StatCard stat={second} className="flex-1" />
            <StatCard stat={third} className="flex-1" />
          </div>
          <StatCard stat={fourth} className="w-[229px] max-w-full" />
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col items-start gap-[30px]">
        <div className="flex w-full flex-col items-start gap-4">
          <SectionBadge {...numbers.badge} />
          <div className="flex flex-col items-start gap-[14px]">
            <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[38px] desktop:text-[48px] desktop:leading-[57.6px]">
              {numbers.title}
            </h2>
            <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
              {numbers.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-4">
          <Button href="/#pricing">Get Started Now</Button>
          <Button href="/contact" variant="muted">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
