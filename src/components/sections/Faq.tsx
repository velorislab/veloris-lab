import { Accordion } from "@/components/ui/Accordion";
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
      /* The section is on the page column like everything else now; the
         accordion below keeps its own 796px, because that width is the reading
         measure of the answers rather than a container preference. Widening the
         shell and widening the prose are two different things, and only the
         first was asked for. */
      /* `scroll-mt` because the nav points here and the bar is fixed over it;
         the sections built on `section-shell` inherit the same 120px from the
         utility, this one is not one of them. */
      className="flex w-full scroll-mt-[120px] flex-col items-center gap-10 desktop:gap-20"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="text-center text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {faq.title}
        </h2>
      </div>
      {/* The 796px the section used to carry lives here now. A question row is
          short and an answer is prose, and prose set across the full 1380px
          column is a line nobody tracks back to the start of. */}
      <div className="w-full max-w-[796px]">
        <Accordion
          variant="card"
          defaultOpen={-1}
          items={faq.items.map((item) => ({
            title: item.question,
            body: item.answer,
          }))}
        />
      </div>
    </section>
  );
}
