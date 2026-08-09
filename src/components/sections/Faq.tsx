import { Accordion } from "@/components/ui/Accordion";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { faq } from "@/data/home";

/** "Frequently Asked Questions" — 796px column of boxed accordion rows. */
export function Faq() {
  return (
    <section
      id="faq"
      className="flex w-full max-w-[796px] flex-col items-center gap-10 desktop:gap-20"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <SectionBadge {...faq.badge} />
        <h2 className="text-center text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {faq.title}
        </h2>
      </div>
      <Accordion
        variant="card"
        defaultOpen={-1}
        items={faq.items.map((item) => ({
          title: item.question,
          body: item.answer,
        }))}
      />
    </section>
  );
}
