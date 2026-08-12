import Calculator from '@/site/Calculator'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CALC, tx, type LabLang, type LS } from '@/site/labData'

/**
 * The calculator, in a section of its own.
 *
 * The template had no equivalent, because it sells a subscription and its price
 * is three cards. This business sells project work and the price is the whole
 * argument, so the estimator is the page's centre of gravity and gets the
 * section heading treatment every other block gets.
 *
 * `id="estimate"` is the anchor the hero button, the about block, the process
 * block, all six service pages and the price list point at. Before this
 * existed, every one of those was a link to nowhere. It also means this
 * component REPLACES a page's own estimate section rather than sitting inside
 * one: two elements on one id is one too many.
 *
 * `seedType` restores something the old design had and the first port dropped.
 * A service page already names the kind of work in its h1, so asking the
 * question again underneath is a question with one obvious answer; seeded, the
 * reader arrives with step one already filled in. The heading pair is
 * overridable for the same reason: the wording that suits a page about one
 * service is not the wording that suits the home page.
 */
export function Estimate({
  lang,
  seedType,
  title,
  description,
  /* `badgeIcon` went with the badge: callers used to choose which pill glyph sat
     over this heading, and there is no pill any more. */
}: {
  lang: LabLang
  seedType?: string
  title?: LS
  description?: LS
}) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <section
      id="estimate"
      /* Clears the fixed pill, or the jump parks the heading under it. */
      className="flex w-full scroll-mt-[120px] flex-col items-center gap-10 px-4 tablet:px-10 desktop:px-0"
    >
      <SectionHeading
        title={L(title ?? CALC.label)}
        description={L(description ?? CALC.sub)}
        textWidth={780}
      />
      {/* The 1101px cap went with the page's other four widths. It was the last
          thing standing narrower than the column: the section around it already
          measured the full 1339, so the widget looked inset by 238px against
          the dark slab above it. The estimate panel beside the steps keeps its
          fixed 360px, so the extra width all goes to the step column, which is
          the half that holds the chips. */}
      <div className="w-full">
        <Calculator lang={lang} seedType={seedType} />
      </div>
    </section>
  )
}
