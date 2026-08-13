import Link from 'next/link'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Estimate } from '@/components/sections/Estimate'

import { SOLUTIONS, SOLUTION_GROUPS, solutionQuote, type Solution } from './solutions'
import { SERVICE_PAGES } from './servicePages'
import { UI, CALC, tx, pluralForm, type LabLang } from './labData'
import { WORK_TYPES, money, priced } from './labPricing'
import { solutionPath, servicePath, pricingPath } from './routing'

/* =============================================================================
   The solutions hub.

   One card per scenario, each carrying the figure and the window from
   `solutionQuote`, the same call the page itself makes, so the index and the
   pages can never disagree with the price table or with each other.

   THREE BLOCKS, AND THE ORDER IS A SALES ORDER. What a visitor can buy without a
   meeting, then what replaces a process they already run by hand, then what needs
   a conversation first. A flat grid made a $750 booking page and a $2,860 agent
   look like the same size of decision, which cost the cheap end its clarity and
   the expensive end its seriousness. The groups are declared in solutions.ts and
   rendered in its order; an empty one is a bug and shows as nothing.

   The lead does one job and it is the important one on this page: it says these
   are offers rather than a portfolio, and points at the case pages for proof.
   Without that sentence a grid of eight scenario cards reads as eight projects,
   which is a claim this page is not making.
   ========================================================================== */

export default function SolutionsHub({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  /* One card, used by both tiers. The featured cards carry the lead and the
     catalogue cards do not: at four across and forty-four of them, a paragraph
     per card turns a scannable index into a wall, and the lead is the first
     thing on the page it opens anyway. */
  const Card = ({ s, full }: { s: Solution; full: boolean }) => {
    const q = solutionQuote(s)
    return (
      <li className="h-full">
        <Link
          href={solutionPath(lang, s.slug)}
          className="group flex h-full flex-col gap-3 rounded-panel bg-surface p-6 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)] transition-colors duration-200 hover:bg-surface-muted"
        >
          <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
            {s.kicker}
          </span>
          <span className={full ? 'text-[20px] leading-[30px] text-ink-900' : 'text-[17px] leading-[26px] text-ink-900'}>
            {L(s.title)}
          </span>
          {full && <span className="text-[15px] leading-[22px] text-ink-300">{L(s.lead)}</span>}
          <span className="mt-auto flex flex-wrap items-center gap-2 pt-3">
            <span className="rounded-pill bg-surface-tint px-3 py-1 font-display text-[15px] text-ink-800">
              {L(CALC.bfFrom)} {money(q.total)}
            </span>
            <span className="rounded-pill bg-surface-muted px-3 py-1 text-[15px] whitespace-nowrap text-ink-500">
              {q.weeks[0]}–{q.weeks[1]} {L(CALC.weeksShort)}
            </span>
          </span>
        </Link>
      </li>
    )
  }

  /* THE MIDDLE TIER: every kind of work, with the figure it starts at.
     Six of the seventeen have a page of their own and the card opens it; the
     rest open the price table, which is the page that actually describes them.
     Built from WORK_TYPES and SERVICE_PAGES rather than from a list here, so a
     new work type or a new service page appears by existing. */
  const serviceFor = new Map(SERVICE_PAGES.map((s) => [s.key, s.slug]))
  const kinds = WORK_TYPES.map((w) => ({
    w,
    href: serviceFor.has(w.key) ? servicePath(lang, serviceFor.get(w.key)!) : pricingPath(lang),
    own: serviceFor.has(w.key),
  }))

  /* The catalogue, in the price table's own order so it reads cheapest-first the
     way /pricing does. A work type with no scenario on it simply does not appear,
     which is why adding one to labPricing does not require touching this file. */
  const catalogue = WORK_TYPES
    .map((w) => ({ w, items: SOLUTIONS.filter((s) => !s.group && s.base === w.key) }))
    .filter((x) => x.items.length > 0)
  const tailCount = catalogue.reduce((n, x) => n + x.items.length, 0)
  /* English has one plural and needs no `{w}`, so its string carries no slot and
     the second replace is a no-op there. The fallback keeps it that way if a
     Russian form is ever dropped from the pipe-separated list. */
  const words = L(UI.solutionWord).split('|')
  const tailHeading = L(UI.solutionCatalogue)
    .replace('{n}', String(tailCount))
    .replace('{w}', words[{ one: 0, few: 1, many: 2 }[pluralForm(tailCount)]] ?? words[0])

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

          {SOLUTION_GROUPS.map((g) => {
            const inGroup = SOLUTIONS.filter((s) => s.group === g.key)
            if (inGroup.length === 0) return null
            return (
              <div key={g.key} className="flex w-full flex-col gap-5">
                <h2 className="text-[24px] leading-[1.2] text-ink-900 tablet:text-[30px]">
                  {L(g.title)}
                </h2>
                <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-4">
                  {inGroup.map((s) => <Card key={s.slug} s={s} full />)}
                </ul>
              </div>
            )
          })}
        </section>

        {/* ----------------------------------------------------------- kinds */}
        <section className="section-shell gap-8">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-3 text-center">
            <h2 className="text-[28px] leading-[1.2] text-ink-900 tablet:text-[34px] desktop:text-[42px]">
              {L(UI.solutionKinds)}
            </h2>
            <p className="max-w-[820px] text-[16px] leading-6 text-ink-300 tablet:text-[17px] tablet:leading-[27px]">
              {L(UI.solutionKindsSub)}
            </p>
          </div>
          <ul className="grid w-full grid-cols-1 gap-[10px] tablet:grid-cols-2 desktop:grid-cols-3">
            {kinds.map(({ w, href, own }) => (
              <li key={w.key}>
                <Link
                  href={href}
                  className="group flex h-full items-center justify-between gap-4 rounded-card bg-surface px-5 py-4 shadow-[0_0_0_1px_var(--color-line-soft)] transition-colors duration-200 hover:bg-surface-muted"
                >
                  <span className="flex flex-col gap-[2px]">
                    <span className="text-[16px] leading-6 text-ink-900">{L(w.label)}</span>
                    <span className="text-[13px] leading-5 text-ink-200">
                      {w.weeks[0]}–{w.weeks[1]} {L(CALC.weeksShort)}
                      {/* Says which cards have somewhere of their own to go, so a
                          reader is not made to click six to find out. */}
                      {own ? ` · ${L(UI.solutionKindOwn)}` : ''}
                    </span>
                  </span>
                  <span className="font-display text-[16px] whitespace-nowrap text-ink-700">
                    {L(CALC.bfFrom)} {money(priced(w.from))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- catalogue */}
        <section className="section-shell gap-10">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-3 text-center">
            <h2 className="text-[28px] leading-[1.2] text-ink-900 tablet:text-[34px] desktop:text-[42px]">
              {tailHeading}
            </h2>
            <p className="max-w-[820px] text-[16px] leading-6 text-ink-300 tablet:text-[17px] tablet:leading-[27px]">
              {L(UI.solutionCatalogueSub)}
            </p>
          </div>

          {catalogue.map(({ w, items }) => (
            <div key={w.key} className="flex w-full flex-col gap-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line pt-4">
                <h3 className="text-[19px] leading-7 text-ink-800">{L(w.label)}</h3>
                {/* The cheapest in the group, not the first in it. They are the
                    same figure today because nothing in the catalogue declares
                    add-ons, and «от» has to stay true the day one does. */}
                <span className="font-numeric text-[14px] text-ink-200">
                  {L(CALC.bfFrom)} {money(Math.min(...items.map((s) => solutionQuote(s).total)))}
                </span>
              </div>
              <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-4">
                {items.map((s) => <Card key={s.slug} s={s} full={false} />)}
              </ul>
            </div>
          ))}
        </section>

        <Estimate lang={lang} compact />
      </main>
      <Footer lang={lang} />
    </>
  )
}
