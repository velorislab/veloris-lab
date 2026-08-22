import Link from 'next/link'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Estimate } from '@/components/sections/Estimate'

import { SERVICE_PAGES, CASES_BY_SERVICE } from './servicePages'
import { SOLUTIONS, solutionQuote } from './solutions'
import { UI, CALC, tx, type LabLang } from './labData'
import { WORK_TYPES, money, priced, monthly } from './labPricing'
import { servicePath, solutionPath } from './routing'

/* =============================================================================
   The services hub.

   Six pages existed with no index. They were reachable from the home cards and,
   since the solutions hub grew its middle tier, from there; a visitor who came
   in on a case page or a solution page had no way to ask «what else do you do»
   and get an answer.

   EACH CARD ANSWERS THE THREE QUESTIONS IN THE ORDER THEY ARE ASKED: what it is,
   what it starts at, and whether anybody has actually had one built. The last of
   those is the reason this page is worth more than a nav menu: `CASES_BY_SERVICE`
   already knows which shipped work belongs under which direction, so the card can
   say it instead of implying it. Where there is no public case the card says that
   too, because a row that quietly omits proof reads as a row that has some.

   THE SCENARIO LINKS ARE THE OTHER HALF. A direction with fifty-six scenarios
   underneath it is abstract until three of them are named, and the three named
   here are joined from `SOLUTIONS` by work type rather than listed, so a new
   scenario appears under its direction by existing.
   ========================================================================== */

export default function ServicesHub({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  const cards = SERVICE_PAGES.map((s) => {
    const work = WORK_TYPES.find((w) => w.key === s.key)
    /* Three of this direction's scenarios, cheapest first so the row opens on
       the least frightening one. */
    const scenarios = SOLUTIONS
      .filter((x) => x.base === s.key)
      .sort((a, b) => solutionQuote(a).total - solutionQuote(b).total)
      .slice(0, 3)
    return { s, work, scenarios, cases: CASES_BY_SERVICE[s.key] ?? [] }
  })

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="page-main">
        <section className="section-shell gap-10 pt-10 tablet:pt-4">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-4 text-center">
            <span className="text-[12px] font-medium tracking-[0.1em] text-ink-200 uppercase">
              {L(UI.navServices)}
            </span>
            <h1 className="text-[34px] leading-[1.15] font-semibold text-ink-900 tablet:text-[44px] desktop:text-[56px] desktop:leading-[1.15]">
              {L(UI.servicesHubLabel)}
            </h1>
            <p className="max-w-[820px] text-[17px] leading-[27px] text-ink-400 tablet:text-[19px] tablet:leading-[30px]">
              {L(UI.servicesHubSub)}
            </p>
          </div>

          <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2">
            {cards.map(({ s, work, scenarios, cases }) => (
              <li key={s.slug} className="flex h-full flex-col gap-4 rounded-panel bg-surface p-6 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)]">
                <Link href={servicePath(lang, s.slug)} className="flex flex-col gap-2 group">
                  <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                    {L(s.category)}
                  </span>
                  <span className="text-[22px] leading-8 text-ink-900">{work ? L(work.label) : s.slug}</span>
                  <span className="text-[15px] leading-[22px] text-ink-300">{L(s.when[0])}</span>
                </Link>

                {work && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-pill bg-surface-tint px-3 py-1 font-display text-[15px] text-ink-800">
                      {L(CALC.bfFrom)} {money(priced(work.from))}
                    </span>
                    <span className="rounded-pill bg-surface-muted px-3 py-1 text-[15px] whitespace-nowrap text-ink-500">
                      {work.weeks[0]}–{work.weeks[1]} {L(CALC.weeksShort)}
                    </span>
                    <span className="rounded-pill bg-surface-muted px-3 py-1 text-[15px] whitespace-nowrap text-ink-500">
                      {L(CALC.supportLbl)} {L(CALC.bfFrom)} {money(monthly(work.support))}
                    </span>
                  </div>
                )}

                {scenarios.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {scenarios.map((x) => (
                      <li key={x.slug}>
                        <Link
                          href={solutionPath(lang, x.slug)}
                          className="rounded-pill bg-surface-muted px-3 py-1 text-[14px] text-ink-500 transition-colors duration-200 hover:bg-surface-subtle hover:text-ink-800"
                        >
                          {L(x.title)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Proof, or the absence of it, said out loud. */}
                <p className="mt-auto border-t border-line-soft pt-4 text-[14px] leading-6 text-ink-300">
                  {cases.length > 0
                    ? `${L(UI.servicesHubCases)}: ${cases.join(', ')}`
                    : L(UI.servicesHubNoCases)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <Estimate lang={lang} compact />
      </main>
      <Footer lang={lang} />
    </>
  )
}
