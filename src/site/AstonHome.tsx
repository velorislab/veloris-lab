import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { About } from '@/components/sections/About'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { Hero } from '@/components/sections/Hero'
import { Motto } from '@/components/sections/Motto'
import { Cases } from "@/components/sections/Cases";
import { PlatformHighlight } from '@/components/sections/PlatformHighlight'
import { Process } from '@/components/sections/Process'
import { WhatsIn } from '@/components/sections/WhatsIn'
import type { LabLang } from '@/site/labData'

/**
 * The home page, in the template's sections and our content.
 *
 * Both locales render this; the language is a prop rather than a module-level
 * import, which is the whole reason `src/data/content.ts` exists.
 *
 * SECTION ORDER is not the template's. Theirs runs nineteen sections for a SaaS
 * product with a free trial; this is the order the previous design arrived at
 * after a six-lens audit, and the reasoning survives the reskin: the offer,
 * then what is sold, then what can be checked, then how the work runs, then who
 * answers for it, then the objections, then the close.
 *
 * NINE OF THE TEMPLATE'S SECTIONS ARE NOT HERE.
 *
 *   Team, Testimonials    strangers presented as our people and our customers
 *   MobileApp, DownloadApp we do not ship an app
 *   Numbers               its four figures duplicate Motto's three
 *   Comparison            an us-versus-them table we have no data to fill
 *   Pricing               the six services already carry their own floor on the
 *                         WhatsIn cards, and saying the same six twice on one
 *                         page is the duplication the audit kept catching. The
 *                         component is ported and available; the full table
 *                         lives at /pricing, which the cards and the nav link to.
 *
 * The five-step calculator is the same kind of absence. It still runs on
 * /pricing and the inner pages. On the home page the floors are already on
 * the cards, and a second widget between those cards and the process asked
 * the reader to assemble a number before they had finished the page.
 */
export default function AstonHome({ lang }: { lang: LabLang }) {
  return (
    <>
      <Header lang={lang} />
      <Hero lang={lang} />
      <main id="main-content">
        {/* Pulled into the hero so the first screen shows only the blue cap.
            The overlap is a length per breakpoint, not a share of the viewport:
            8svh on a phone is already the panel's top padding, so the headline
            was painting in the fold. Each peek sits inside that padding. */}
        <div className="page-axis z-[2] -mt-10 tablet:-mt-14 desktop:-mt-[4.75rem]">
          <Motto lang={lang} />
        </div>
        <div className="page-main">
          <Cases lang={lang} />
          <WhatsIn lang={lang} />
          <PlatformHighlight lang={lang} />
          <Process lang={lang} />
          <About lang={lang} />
          <Faq lang={lang} />
          <FinalCta lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
    </>
  )
}
