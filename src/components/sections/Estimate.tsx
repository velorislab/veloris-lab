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
  compact = false,
  /* `badgeIcon` went with the badge: callers used to choose which pill glyph sat
     over this heading, and there is no pill any more. */
}: {
  lang: LabLang
  seedType?: string
  title?: LS
  description?: LS
  /**
   * FOR A PAGE THAT IS READ RATHER THAN SOLD.
   *
   * `SectionHeading` is 42px and centred, which is right where this section is
   * one of a landing page's beats. Dropped into the middle of a solution page it
   * was the only centred heading among ten and half again the size of the other
   * nine: measured on the rendered page, the single thing still breaking that
   * document's grammar. Compact gives it the document's own heading instead. The
   * calculator underneath is untouched, because the widget is the same widget
   * wherever it stands.
   */
  compact?: boolean
}) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <section
      id="estimate"
      /* `scroll-mt` clears the fixed bar, or the jump parks the heading under it.
       *
       * NO HORIZONTAL PADDING, and it used to carry `px-4 tablet:px-10`. Every
       * one of the eight callers renders this inside `page-main` (or, on a case
       * page, inside the hand-written equivalent), and that wrapper already
       * pads the column: 16px on a phone, 30px on a tablet. The two stacked, so
       * the calculator was the only section on the site standing inset from the
       * page — 32px against everyone else's 16 on a phone, 70 against 30 on a
       * tablet — on the home page, the price list, the stack page and all five
       * hubs and detail pages at once. Measured on the rendered page rather
       * than reasoned about: every sibling section reported [16..359] at 375px
       * and this one [32..343]. */
      className="flex w-full scroll-mt-[120px] flex-col items-center gap-10"
    >
      {compact ? (
        <div className="read-col flex flex-col gap-3">
          <h2 className="text-[26px] leading-[1.2] text-ink-900 tablet:text-[30px]">
            {L(title ?? CALC.label)}
          </h2>
          <p className="text-[16px] leading-[26px] text-ink-300">{L(description ?? CALC.sub)}</p>
        </div>
      ) : (
        <SectionHeading
          title={L(title ?? CALC.label)}
          description={L(description ?? CALC.sub)}
          textWidth={780}
        />
      )}
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
