import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Cases } from '@/components/sections/Cases'
import { Estimate } from '@/components/sections/Estimate'

import { UI, tx, type LabLang } from './labData'

/* =============================================================================
   The cases hub.

   WHY IT EXISTS, AND WHY ITS ABSENCE WAS THE WORST GAP ON THIS SITE. Seven case
   pages were reachable only through a dropdown in the header, and the header
   comment said so out loud: it was a menu rather than a link «because there is
   no /cases index». Meanwhile every one of fifty-six solution pages says its
   proof of work lives on a case page, and then gave a reader no way to see them.
   For a studio whose strongest asset is one product a stranger can go and check
   in the Chrome Web Store, that is the page a serious buyer opens last before
   writing, and it did not exist.

   IT REUSES THE HOME SECTION RATHER THAN RESTATING IT. `Cases` already assembles
   every card from `content.ts`, joins each to its page and derives its metrics;
   a second grid here would be a second place for those to go stale. The only
   difference is `all`, which turns off the open-on-six fade: that behaviour is
   right for a section a reader passes through and wrong for a page they came to.

   THE STANDFIRST IS DOING REAL WORK and is not decoration. A visitor landing
   from a search sees two catalogues on this site, and one of them is offers
   while this one is history. Saying which is which, in the first sentence, is
   what keeps /solutions honest.
   ========================================================================== */

export default function CasesHub({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="page-main">
        <section className="section-shell gap-6 pt-4">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-4 text-center">
            <span className="text-[12px] font-medium tracking-[0.1em] text-ink-200 uppercase">
              {L(UI.navCases)}
            </span>
            <h1 className="text-[34px] leading-[1.15] font-semibold text-ink-900 tablet:text-[44px] desktop:text-[56px] desktop:leading-[1.15]">
              {L(UI.casesHubLabel)}
            </h1>
            <p className="max-w-[820px] text-[17px] leading-[27px] text-ink-400 tablet:text-[19px] tablet:leading-[30px]">
              {L(UI.casesHubSub)}
            </p>
          </div>
        </section>

        <Cases lang={lang} all />

        <Estimate lang={lang} compact />
      </main>
      <Footer lang={lang} />
    </>
  )
}
