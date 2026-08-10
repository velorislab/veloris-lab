import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Estimate } from '@/components/sections/Estimate'

import { SOLUTIONS, type Solution } from './solutions'
import { SEPARATE, SEPARATE_LABEL, UI, CALC, tx, type LabLang } from './labData'
import { WORK_TYPES, money, priced, monthly } from './labPricing'
import { solutionPath, solutionsPath, pricingPath } from './routing'

/* =============================================================================
   One solution page.

   THE SHAPE IS BORROWED AND THE TENSE IS THE POINT. A competitor's equivalent
   pages run: what it is and what it costs, who it suits, what is in the first
   version, how the path through it goes, what has to be got right, what to
   measure, the pass-through costs, the questions. That order works because it
   answers a reader's questions in the order they occur to them, so it is the
   order here too.

   What is NOT borrowed is any suggestion that these have been built for a named
   client. Every sentence on this page is present tense about a thing we build.
   The proof of work is the case cards on the home page and the case pages under
   them, which stay answerable to a repository. Mixing the two would turn a
   truthful offer page into a fabricated credential, which is the one thing on a
   site like this that a buyer checks first.

   NO FIGURE IS TYPED. The price, the window and the support all come from the
   work type this solution sits on, so a solution can never quote a number the
   price table does not hold.
   ========================================================================== */

export default function SolutionPage({ lang, page }: { lang: LabLang; page: Solution }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const work = WORK_TYPES.find((w) => w.key === page.base)

  /* Three others, chosen as the ones after this in the list and wrapping round,
     so every page has neighbours and none of them links to itself. */
  const i = SOLUTIONS.findIndex((s) => s.slug === page.slug)
  const near = [1, 2, 3].map((n) => SOLUTIONS[(i + n) % SOLUTIONS.length])

  const facts = work
    ? [
        { k: L(CALC.resultLbl), v: `${L(CALC.bfFrom)} ${money(priced(work.from))}` },
        { k: L(CALC.termLbl), v: `${work.weeks[0]}–${work.weeks[1]} ${L(CALC.weeksShort)}` },
        { k: L(CALC.supportLbl), v: `${L(CALC.bfFrom)} ${money(monthly(work.support))}${L(CALC.perMonth)}` },
      ]
    : []

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="page-main">
        {/* ------------------------------------------------------------ head */}
        <section className="section-shell gap-8 pt-4">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-4 text-center">
            <span className="text-[12px] font-medium tracking-[0.1em] text-ink-200 uppercase">
              {page.kicker}
            </span>
            <h1 className="text-[34px] leading-[1.15] font-semibold text-ink-900 tablet:text-[44px] desktop:text-[56px] desktop:leading-[1.15]">
              {L(page.title)}
            </h1>
            <p className="max-w-[760px] text-[17px] leading-[27px] text-ink-400 tablet:text-[19px] tablet:leading-[30px]">
              {L(page.lead)}
            </p>
          </div>

          {facts.length > 0 && (
            <ul className="flex w-full max-w-[760px] flex-col items-stretch gap-3 tablet:flex-row tablet:gap-0">
              {facts.map((f, n) => (
                <li
                  key={f.k}
                  className={
                    'flex flex-1 flex-col items-center gap-1 text-center tablet:px-6 ' +
                    (n > 0 ? 'tablet:border-l tablet:border-line-soft' : '')
                  }
                >
                  <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                    {f.k}
                  </span>
                  <span className="font-display text-[20px] leading-8 font-semibold text-ink-900 tablet:text-[22px]">
                    {f.v}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="#estimate" className="h-[54px] px-6 text-[16px]">
              {L(UI.ctaCalc)}
            </Button>
            <Button href={pricingPath(lang)} variant="muted" className="h-[54px] px-6 text-[16px]">
              {L(UI.priceList)}
            </Button>
          </div>

          <p className="max-w-[760px] text-center text-[16px] leading-6 text-ink-300">
            <span className="font-medium text-ink-700">{L(UI.solutionFor)}</span>{' '}
            {L(page.audience)}
          </p>
        </section>

        {/* ---------------------------------------------------- composition */}
        <section className="section-shell gap-8">
          <h2 className="text-center text-[28px] leading-[1.2] text-ink-900 tablet:text-[34px] desktop:text-[42px]">
            {L(UI.solutionComposition)}
          </h2>
          <ul className="flex flex-wrap justify-center gap-[10px]">
            {page.composition.map((c) => (
              <li
                key={L(c)}
                className="rounded-pill bg-surface px-4 py-2 text-[15px] leading-6 text-ink-600 shadow-[0_0_0_1px_var(--color-line-soft)]"
              >
                {L(c)}
              </li>
            ))}
          </ul>
          {/* Says out loud that the figures above are the package this sits on,
              which is the sentence that keeps a solution page from reading as a
              second, competing price list. */}
          {work && (
            <p className="max-w-[720px] text-center text-[15px] leading-6 text-ink-300">
              {L(UI.solutionBase)} <span className="text-ink-700">{L(work.label)}</span>.{' '}
              {L(UI.solutionBaseTail)}
            </p>
          )}
        </section>

        {/* ----------------------------------------------------------- flow */}
        <section className="section-shell gap-8">
          <h2 className="text-center text-[28px] leading-[1.2] text-ink-900 tablet:text-[34px] desktop:text-[42px]">
            {L(UI.solutionFlow)}
          </h2>
          <ol className="grid w-full grid-cols-1 gap-[14px] desktop:grid-cols-3">
            {page.flow.map((f, n) => (
              <li
                key={L(f.t)}
                className="flex flex-col gap-2 rounded-panel bg-surface p-6 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)]"
              >
                <span className="font-numeric text-[13px] font-medium tracking-[0.08em] text-accent">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[19px] leading-7 text-ink-900">{L(f.t)}</h3>
                <p className="text-[15px] leading-[22px] text-ink-300">{L(f.d)}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- watch */}
        <section className="section-shell gap-8">
          <h2 className="max-w-[820px] text-center text-[28px] leading-[1.2] text-ink-900 tablet:text-[34px] desktop:text-[42px]">
            {L(UI.solutionWatch)}
          </h2>
          <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-3">
            {page.watch.map((w) => (
              <li
                key={L(w.t)}
                className="flex flex-col gap-2 border-t border-line pt-5"
              >
                <h3 className="text-[18px] leading-7 text-ink-900">{L(w.t)}</h3>
                <p className="text-[15px] leading-[22px] text-ink-300">{L(w.d)}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- metrics */}
        <section className="section-shell gap-8">
          <h2 className="text-center text-[28px] leading-[1.2] text-ink-900 tablet:text-[34px] desktop:text-[42px]">
            {L(UI.solutionMetrics)}
          </h2>
          <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-4">
            {page.metrics.map((m, n) => (
              <li
                key={L(m)}
                className="flex flex-col gap-1 rounded-card bg-surface-tint px-5 py-4"
              >
                <span className="font-numeric text-[13px] text-ink-200">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <span className="text-[16px] leading-6 text-ink-700">{L(m)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ estimator */}
        <Estimate lang={lang} seedType={page.base} />

        {/* -------------------------------------------------- paid separately */}
        <section className="section-shell gap-6">
          <h2 className="text-center text-[24px] leading-[1.2] text-ink-900 tablet:text-[30px]">
            {L(SEPARATE_LABEL)}
          </h2>
          <ul className="grid w-full grid-cols-1 gap-x-[30px] gap-y-3 tablet:grid-cols-2">
            {SEPARATE.map((x, n) => (
              <li key={n} className="border-t border-line pt-3 text-[15px] leading-6 text-ink-400">
                {L(x.k)}
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ faq */}
        {page.faq.length > 0 && (
          <section className="section-shell gap-6">
            <h2 className="text-center text-[24px] leading-[1.2] text-ink-900 tablet:text-[30px]">
              {L(UI.solutionFaq)}
            </h2>
            <dl className="flex w-full max-w-[860px] flex-col gap-5">
              {page.faq.map((f) => (
                <div key={L(f.q)} className="flex flex-col gap-2 border-t border-line pt-5">
                  <dt className="text-[18px] leading-7 text-ink-900">{L(f.q)}</dt>
                  <dd className="text-[16px] leading-6 text-ink-300">{L(f.a)}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* --------------------------------------------------------- nearby */}
        <section className="section-shell gap-6">
          <h2 className="text-center text-[24px] leading-[1.2] text-ink-900 tablet:text-[30px]">
            {L(UI.solutionNear)}
          </h2>
          <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-3">
            {near.map((s) => {
              const w = WORK_TYPES.find((x) => x.key === s.base)
              return (
                <li key={s.slug}>
                  <Link
                    href={solutionPath(lang, s.slug)}
                    className="group flex h-full flex-col gap-2 rounded-panel bg-surface p-5 shadow-[0_0_0_1px_var(--color-line-soft)] transition-colors duration-200 hover:bg-surface-muted"
                  >
                    <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                      {s.kicker}
                    </span>
                    <span className="text-[18px] leading-7 text-ink-900">{L(s.title)}</span>
                    {w && (
                      <span className="mt-auto pt-2 font-display text-[16px] text-ink-600">
                        {L(CALC.bfFrom)} {money(priced(w.from))}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href={solutionsPath(lang)}
            className="text-[15px] leading-6 font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            {L(UI.solutionAll)}
          </Link>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}
