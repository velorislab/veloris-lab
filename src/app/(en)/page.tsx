import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { About } from '@/components/sections/About'
import { Comparison } from '@/components/sections/Comparison'
import { CoreFeatures } from '@/components/sections/CoreFeatures'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { Hero } from '@/components/sections/Hero'
import { Motto } from '@/components/sections/Motto'
import { Numbers } from '@/components/sections/Numbers'
import { PlatformHighlight } from '@/components/sections/PlatformHighlight'
import { PowerfulFeatures } from '@/components/sections/PowerfulFeatures'
import { Pricing } from '@/components/sections/Pricing'
import { Process } from '@/components/sections/Process'
import { WhatsIn } from '@/components/sections/WhatsIn'
import { WhoCanUse } from '@/components/sections/WhoCanUse'

/**
 * SMOKE TEST, and it is meant to be replaced.
 *
 * This renders the template's own composition with the template's own English
 * content, purely to prove it compiles and paints under Next 16 inside this
 * repository before any of our material is moved into it.
 *
 * Four of the template's nineteen sections are already left out, and they are
 * the ones that cannot survive contact with this business rather than the ones
 * that were hard to port:
 *
 *   Team          four photographs of people who do not work here
 *   Testimonials  thirteen quotes from customers who do not exist
 *   MobileApp     we do not ship a mobile app
 *   DownloadApp   likewise, and it is an App Store badge row
 *
 * `Numbers`, `Comparison` and `WhoCanUse` are kept for now because their shape
 * is reusable, but every figure in them is the template's and has to be
 * replaced or the section has to go the same way as Team.
 */
export default function EnHome() {
  return (
    <>
      <Header />
      <Hero />
      <main id="main-content" className="page-main">
        <Motto />
        <WhatsIn />
        <PlatformHighlight />
        <CoreFeatures />
        <Numbers />
        <PowerfulFeatures />
        <Pricing />
        <Comparison />
        <About />
        <WhoCanUse />
        <Process />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
