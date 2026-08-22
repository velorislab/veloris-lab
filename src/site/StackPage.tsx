import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Estimate } from '@/components/sections/Estimate'

import { getHome } from '@/data/content'
import {
  STACK_CHOOSE, STACK_CHOOSE_LABEL, STACK_USED_LABEL, STACK_USED_SUB,
  tx, type LabLang,
} from './labData'

/* =============================================================================
   The stack page.

   IT EXISTS BECAUSE FIFTY-SIX PAGES POINTED AT IT AND IT DID NOT. Every solution
   page carries a «возможный стек» section whose whole premise is that the choice
   is made against the task rather than in advance, and the reference's own
   solution pages end that section with a link to the full list. Ours had nowhere
   to send that click: the stack lived as a section of the home page, which a
   reader arriving on a solution page has no reason to have seen.

   NOTHING HERE IS NEW DATA. The ten groups, their leads and all seventy-three
   tools come from `STACK_GROUPS` through `getHome`, the same assembly the home
   section reads, so the two can never disagree. Only the two blocks the home has
   no room for are added: how the choice is made, and where each tool has run.

   THE SECOND OF THOSE IS THE REASON THIS PAGE BEATS THEIRS. Their stack page is
   nine groups of chips and nothing else, which is a list anybody can write in an
   afternoon. `TOOLS` carries twelve entries each naming the project it shipped
   on, and a stack list with «Swiftin, этот сайт» beside its entries is the only
   kind a stranger can check.
   ========================================================================== */

export default function StackPage({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const { platformHighlight: stack } = getHome(lang)

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="page-main">
        <section className="section-shell gap-8 pt-10 tablet:pt-4">
          {/* No kicker over the h1, for the reason DESIGN.md gives for the
              section badges: a heading that needs a label saying what it is
              about is doing half its job. */}
          <div className="flex w-full max-w-[900px] flex-col items-center gap-4 text-center">
            <h1 className="text-[34px] leading-[1.15] font-semibold text-ink-900 tablet:text-[44px] desktop:text-[56px] desktop:leading-[1.15]">
              {stack.title}
            </h1>
            <p className="max-w-[820px] text-[17px] leading-[27px] text-ink-400 tablet:text-[19px] tablet:leading-[30px]">
              {stack.description}
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- groups */}
        <section className="section-shell gap-6">
          <ul className="flex w-full flex-col gap-[14px]">
            {stack.groups.map((g) => (
              <li
                key={g.key}
                className="flex flex-col gap-3 rounded-panel bg-surface p-6 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)] tablet:flex-row tablet:gap-8"
              >
                <div className="flex flex-col gap-1 tablet:w-[280px] tablet:shrink-0">
                  <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                    {g.kicker}
                  </span>
                  <h2 className="text-[20px] leading-[30px] text-ink-900">{g.title}</h2>
                  <p className="text-[15px] leading-[22px] text-ink-300">{g.lead}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="rounded-pill bg-surface-muted px-3 py-1 text-[14px] leading-6 text-ink-500"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- used */}
        {stack.used.length > 0 && (
          <section className="section-shell gap-8">
            <div className="flex w-full max-w-[860px] flex-col items-center gap-3 text-center">
              <h2 className="text-[24px] leading-[1.2] text-ink-900 tablet:text-[30px]">
                {L(STACK_USED_LABEL)}
              </h2>
              <p className="text-[16px] leading-6 text-ink-300">{L(STACK_USED_SUB)}</p>
            </div>
            <ul className="grid w-full grid-cols-1 gap-x-[30px] gap-y-4 tablet:grid-cols-2">
              {stack.used.map((t) => (
                <li
                  key={t.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line pt-3"
                >
                  <span className="font-display text-[17px] leading-7 text-ink-800">{t.name}</span>
                  <span className="text-[15px] leading-6 text-ink-300">{t.note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* --------------------------------------------------------- choose */}
        <section className="section-shell gap-8">
          <h2 className="max-w-[820px] text-center text-[24px] leading-[1.2] text-ink-900 tablet:text-[30px]">
            {L(STACK_CHOOSE_LABEL)}
          </h2>
          <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2">
            {/* No 01-04: four things that decide a choice are considered
                together, not in order. Numbering them would promise a sequence
                the reader would then look for and not find. */}
            {STACK_CHOOSE.map((c) => (
              <li key={L(c.t)} className="flex flex-col gap-3 border-t border-line pt-5">
                <h3 className="text-[18px] leading-7 text-ink-900">{L(c.t)}</h3>
                <p className="text-[16px] leading-[26px] text-ink-300">{L(c.d)}</p>
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
