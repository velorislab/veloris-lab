import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

type ServicePlan = ReturnType<typeof getHome>["pricing"]["plans"][number];

/**
 * One kind of work, in the template's plan card.
 *
 * The template sold three subscriptions, so its card ended in a "What's
 * Included" tick list and wore an audience chip ("Individual", "2 to 20
 * users"). We sell six kinds of project work: there is no feature checklist to
 * tick, and the only thing we can honestly say about who a card is for is a
 * whole sentence, which is not a chip. Both are dropped rather than padded.
 *
 * Everything the card still shows arrives formatted from content.ts: the price
 * already carries its "from" / "от", and the delivery window and the monthly
 * support figure arrive as one line. Nothing here types a currency or a number.
 */
function ServiceCard({ plan }: { plan: ServicePlan }) {
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
        <h3 className="font-display text-[24px] leading-9 text-ink-800">
          {plan.name}
        </h3>
        {plan.audience && (
          <p className="text-[18px] leading-[27px] text-ink-300">
            {plan.audience}
          </p>
        )}
      </header>

      {/* justify-between, where the template had the tick list holding the
          panel open: with the list gone the CTA sits on the floor of the card
          instead of leaving a white hole under itself, and every card in a row
          lands its button on the same line. */}
      <div className="relative flex w-full flex-1 flex-col items-start justify-between gap-[30px] hairline [--hairline:var(--color-line-soft)] rounded-panel bg-surface p-6 shadow-[0_2px_6px_0_rgba(182,182,182,0.1)]">
        <div className="flex flex-col items-start gap-[2px]">
          <span className="font-display text-[30px] leading-[45px] text-ink-800">
            {plan.price}
          </span>
          {plan.billingNote && (
            <p className="text-[16px] leading-6 text-ink-300">
              {plan.billingNote}
            </p>
          )}
        </div>

        <Button
          href={plan.ctaHref}
          className="w-full"
          icon={
            <Image
              src="/images/icons/plan-badge.svg"
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          }
        >
          {plan.ctaLabel}
        </Button>
      </div>
    </article>
  );
}

/**
 * The six kinds of work, as the template's pricing grid.
 *
 * Two cards and a full-width Enterprise panel became six cards, so the row
 * became a grid: one column, two from tablet, three from desktop, on the
 * template's own 30px gap. Card radii, hairlines, shadows and the CTA hover are
 * the template's, untouched.
 */
export function Pricing({ lang }: { lang: LabLang }) {
  const { pricing } = getHome(lang);

  return (
    <section id="pricing" className="section-shell gap-10 desktop:gap-20">
      <SectionHeading
        badge={pricing.badge}
        title={pricing.title}
        description={pricing.description}
        textWidth={800}
      />

      <div className="flex w-full flex-col items-center gap-8 desktop:gap-[50px]">
        <div className="grid w-full grid-cols-1 gap-[30px] tablet:grid-cols-2 desktop:grid-cols-3">
          {pricing.plans.map((plan) => (
            <ServiceCard key={plan.name} plan={plan} />
          ))}
        </div>

        {pricing.allLabel && (
          <Button href={pricing.allHref} variant="secondary">
            {pricing.allLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
