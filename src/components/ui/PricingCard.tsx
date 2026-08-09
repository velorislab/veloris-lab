import Image from "next/image";
import Link from "next/link";

import type { PricingPlan } from "@/data/home";

/** One "What's Included" row. Greyed-out rows use the muted tick asset. */
export function PlanFeature({ label, active }: { label: string; active: boolean }) {
  return (
    <li className="flex items-center gap-[6px]">
      <Image
        src={
          active
            ? "/images/icons/check-plan-active.svg"
            : "/images/icons/check-plan-inactive.svg"
        }
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0"
      />
      <span
        className={`text-[16px] leading-6 ${active ? "text-ink-400" : "text-ink-200"}`}
      >
        {label}
      </span>
    </li>
  );
}

/** The audience chip that sits beside the plan name. */
export function PlanChip({ label, icon }: { label: string; icon: string }) {
  return (
    <span className="flex shrink-0 items-center gap-1 rounded-pill bg-surface py-1 pr-[10px] pl-2">
      <Image src={icon} alt="" width={20} height={20} className="size-5" />
      <span className="text-[14px] leading-[21px] text-ink-800">{label}</span>
    </span>
  );
}

/** Primary CTA used by every plan. */
export function PlanCta({ plan }: { plan: PricingPlan }) {
  return (
    <Link
      href={plan.ctaHref}
      className="flex h-[57.5px] w-full items-center justify-center gap-1 rounded-pill bg-accent px-6 py-4 text-[17px] leading-[25.5px] font-semibold text-white shadow-[inset_0_0_20px_8px_rgba(51,132,255,0)] transition-all duration-200 hover:bg-accent-600 hover:shadow-[inset_0_0_8px_6px_#3384ff]"
    >
      {plan.ctaLabel}
      <Image
        src="/images/icons/plan-badge.svg"
        alt=""
        width={24}
        height={24}
        className="size-6"
      />
    </Link>
  );
}

/** Standard pricing card (Personal and Team plans). */
export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className="relative flex w-full max-w-[435px] flex-col items-start gap-[10px] overflow-hidden rounded-t-panel hairline rounded-b-[24px] p-[14px] shadow-[var(--shadow-ring)]">
      <Image
        src="/images/backgrounds/pricing-card.svg"
        alt=""
        fill
        sizes="435px"
        className="rounded-t-panel rounded-b-[24px] object-cover"
      />

      <header className="relative flex w-full flex-col items-start justify-center gap-[6px] p-4">
        <div className="flex w-full items-center gap-[10px]">
          <h3 className="font-display text-[24px] leading-9 text-ink-800">
            {plan.name}
          </h3>
          <PlanChip label={plan.audience} icon="/images/icons/plan-toggle-a.svg" />
        </div>
        <p className="text-[18px] leading-[27px] text-ink-300">{plan.bestFor}</p>
      </header>

      <div className="relative flex w-full flex-1 flex-col items-start gap-[30px] hairline [--hairline:var(--color-line-soft)] rounded-panel bg-surface p-6 shadow-[0_2px_6px_0_rgba(182,182,182,0.1)]">
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex flex-col items-start gap-[2px]">
            <div className="flex items-center gap-[14px]">
              <span className="font-display text-[22px] leading-[33px] text-ink-600">
                Starting at
              </span>
              <span className="font-display text-[30px] leading-[45px] text-ink-800">
                {plan.price}
              </span>
            </div>
            <p className="text-[16px] leading-6 text-ink-300">{plan.billingNote}</p>
          </div>
          <PlanCta plan={plan} />
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <p className="text-[20px] leading-[30px] text-ink-700">
            {plan.includedLabel}
          </p>
          <ul className="flex w-full flex-col items-start gap-[14px]">
            {plan.features.map((feature, index) => (
              <PlanFeature
                key={feature}
                label={feature}
                active={index < plan.activeCount}
              />
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
