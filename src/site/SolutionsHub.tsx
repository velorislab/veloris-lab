import Link from 'next/link'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Estimate } from '@/components/sections/Estimate'

import { SOLUTIONS } from './solutions'
import { UI, CALC, tx, type LabLang } from './labData'
import { WORK_TYPES, money, priced } from './labPricing'
import { solutionPath } from './routing'

/* =============================================================================
   The solutions hub.

   One card per scenario, each carrying the figure and the window from the work
   type it sits on, so the index and the pages can never disagree with the price
   table or with each other.

   The lead does one job and it is the important one on this page: it says these
   are offers rather than a portfolio, and points at the case pages for proof.
   Without that sentence a grid of eight scenario cards reads as eight projects,
   which is a claim this page is not making.
   ========================================================================== */

export default function SolutionsHub({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="page-main">
        <section className="section-shell gap-10 pt-4">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-4 text-center">
            <span className="text-[12px] font-medium tracking-[0.1em] text-ink-200 uppercase">
              {L(UI.solutionAll)}
            </span>
            <h1 className="text-[34px] leading-[1.15] font-semibold text-ink-900 tablet:text-[44px] desktop:text-[56px] desktop:leading-[1.15]">
              {L(UI.solutionsLabel)}
            </h1>
            <p className="max-w-[820px] text-[17px] leading-[27px] text-ink-400 tablet:text-[19px] tablet:leading-[30px]">
              {L(UI.solutionsSub)}
            </p>
          </div>

          <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-3">
            {SOLUTIONS.map((s) => {
              const w = WORK_TYPES.find((x) => x.key === s.base)
              return (
                <li key={s.slug} className="h-full">
                  <Link
                    href={solutionPath(lang, s.slug)}
                    className="group flex h-full flex-col gap-3 rounded-panel bg-surface p-6 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)] transition-colors duration-200 hover:bg-surface-muted"
                  >
                    <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                      {s.kicker}
                    </span>
                    <span className="text-[20px] leading-[30px] text-ink-900">{L(s.title)}</span>
                    <span className="text-[15px] leading-[22px] text-ink-300">{L(s.lead)}</span>
                    {w && (
                      <span className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                        <span className="rounded-pill bg-surface-tint px-3 py-1 font-display text-[15px] text-ink-800">
                          {L(CALC.bfFrom)} {money(priced(w.from))}
                        </span>
                        <span className="rounded-pill bg-surface-muted px-3 py-1 text-[15px] whitespace-nowrap text-ink-500">
                          {w.weeks[0]}–{w.weeks[1]} {L(CALC.weeksShort)}
                        </span>
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <Estimate lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  )
}
