import Calculator from '@/site/Calculator'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EYEBROW, CALC, tx, type LabLang } from '@/site/labData'

/**
 * The calculator, in a section of its own.
 *
 * The template had no equivalent, because it sells a subscription and the price
 * is three cards. This business sells project work and the price is the whole
 * argument, so the estimator is the page's centre of gravity and gets the
 * section heading treatment every other block gets.
 *
 * `id="estimate"` is the anchor the hero button, the about block, the process
 * block, all six service pages and the price list already point at. Before this
 * existed, every one of those was a link to nowhere.
 */
export function Estimate({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <section
      id="estimate"
      className="flex w-full scroll-mt-[86px] flex-col items-center gap-10 px-4 tablet:px-10 desktop:px-0"
    >
      <SectionHeading
        badge={{ icon: '/images/icons/badge/pricing.svg', label: L(EYEBROW.calc) }}
        title={L(CALC.label)}
        description={L(CALC.sub)}
        textWidth={720}
      />
      <div className="w-full max-w-[1101px]">
        <Calculator lang={lang} />
      </div>
    </section>
  )
}
