import { Accordion } from "@/components/ui/Accordion";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * The objections block, on our content.
 *
 * A straight swap: same 796px column, same boxed accordion, same badge. The
 * only thing that changed is where the rows come from. `content.ts` flattens
 * the two FAQ groups into one list, so all ten questions render here rather
 * than the template's seven, and the accordion opens closed (`defaultOpen={-1}`)
 * exactly as before.
 *
 * The section has no description slot in this template and does not get one:
 * `FAQ_SUB` exists in `labData`, but adding a paragraph here would be a design
 * change, not a content one.
 */
export function Faq({ lang }: { lang: LabLang }) {
  const { faq } = getHome(lang);

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
