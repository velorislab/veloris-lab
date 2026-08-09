import Image from "next/image";

import {
  PlanChip,
  PlanCta,
  PlanFeature,
  PricingCard,
} from "@/components/ui/PricingCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing, type PricingPlan } from "@/data/home";

/** The Enterprise plan renders as a full-width panel under the two cards. */
function EnterprisePanel({ plan }: { plan: PricingPlan }) {
  const half = Math.ceil(plan.features.length / 2);
  const columns = [plan.features.slice(0, half), plan.features.slice(half)];

  return (
    <div className="relative flex w-full flex-col items-center gap-8 overflow-hidden hairline rounded-[30px] p-6 shadow-[0_17px_24px_0_rgba(178,178,178,0.04),0_0_0_5px_#ffffff] tablet:p-10 desktop:flex-row desktop:gap-[50px] desktop:p-[50px]">
      <Image
        src="/images/backgrounds/pricing-section.svg"
        alt=""
        fill
        sizes="(min-width: 1320px) 1200px, 100vw"
        className="rounded-[30px] object-cover"
      />

      <div className="relative flex w-full flex-col items-start gap-5 desktop:max-w-[336px] desktop:flex-1">
        <div className="flex w-full flex-col items-start justify-center gap-3">
          <PlanChip label={plan.audience} icon="/images/icons/plan-toggle-b.svg" />
          <div className="flex w-full flex-col justify-center gap-8 desktop:gap-[46px]">
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-display text-[24px] leading-9 text-ink-800">
                {plan.name}
              </h3>
              <p className="text-[18px] leading-[27px] text-ink-300">
                {plan.bestFor}
              </p>
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex items-center gap-[14px]">
                <span className="font-display text-[22px] leading-[33px] text-ink-600">
                  Starting at
                </span>
                <span className="font-display text-[30px] leading-[45px] text-ink-800">
                  {plan.price}
                </span>
              </div>
              <p className="text-[16px] leading-6 text-ink-300">
                {plan.billingNote}
              </p>
            </div>
          </div>
        </div>
        <PlanCta plan={plan} />
      </div>

      <div className="relative flex w-full flex-col items-start gap-6 hairline [--hairline:var(--color-line-soft)] rounded-panel bg-surface p-6 shadow-[0_2px_6px_0_rgba(182,182,182,0.1)] desktop:flex-1 desktop:p-[30px]">
        <p className="text-[20px] leading-[30px] text-ink-700 desktop:text-[24px] desktop:leading-9">
          {plan.includedLabel}
        </p>
        <div className="flex w-full flex-col items-start gap-[14px] tablet:flex-row tablet:gap-[30px]">
          {columns.map((column, index) => (
            <ul
              key={index}
              className="flex flex-1 flex-col items-start gap-[14px]"
            >
              {column.map((feature) => (
                <PlanFeature key={feature} label={feature} active />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

/** "Our Pricing Plans" — two cards plus the wide Enterprise panel. */
export function Pricing() {
  const cards = pricing.plans.filter((plan) => plan.layout === "card");
  const panel = pricing.plans.find((plan) => plan.layout === "panel");

  return (
    <section
      id="pricing"
      className="section-shell gap-10 desktop:gap-20"
    >
      <SectionHeading
        badge={pricing.badge}
        title={pricing.title}
        description={pricing.description}
        textWidth={800}
      />

      <div className="flex w-full flex-col items-center gap-8 desktop:gap-[50px]">
        <div className="flex w-full flex-col items-stretch justify-center gap-[30px] desktop:flex-row">
          {cards.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
        {panel && <EnterprisePanel plan={panel} />}
      </div>
    </section>
  );
}
