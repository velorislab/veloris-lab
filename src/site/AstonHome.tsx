import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { About } from '@/components/sections/About'
import { CoreFeatures } from '@/components/sections/CoreFeatures'
import { Estimate } from '@/components/sections/Estimate'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { Hero } from '@/components/sections/Hero'
import { PriceTicker } from "@/components/sections/PriceTicker";
import { Motto } from '@/components/sections/Motto'
import { Cases } from "@/components/sections/Cases";
import { PlatformHighlight } from '@/components/sections/PlatformHighlight'
import { Process } from '@/components/sections/Process'
import { WhatsIn } from '@/components/sections/WhatsIn'
import { WhoCanUse } from '@/components/sections/WhoCanUse'
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
 */
export default function AstonHome({ lang }: { lang: LabLang }) {
  return (
    <>
      <Header lang={lang} />
      <Hero lang={lang} />
      <PriceTicker lang={lang} />
      <main id="main-content" className="page-main">
        <Motto lang={lang} />
        <Cases lang={lang} />
        <WhatsIn lang={lang} />
        <CoreFeatures lang={lang} />
        <PlatformHighlight lang={lang} />
        <WhoCanUse lang={lang} />
        <Estimate lang={lang} />
        <Process lang={lang} />
        <About lang={lang} />
        <Faq lang={lang} />
        <FinalCta lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  )
}
