import PricingPageBody from './PricingPage'
import { pricingJsonLd } from './meta'
import type { LabLang } from './routing'

/**
 * The wrapper for the price list: the OfferCatalog + BreadcrumbList payload,
 * and nothing else any more.
 *
 * THREE THINGS LEFT WITH THE OLD DESIGN, and none of them was content.
 *
 *   The Inter / JetBrains Mono pair. Those were the previous design's faces,
 *   loaded here as CSS variables that the page's own stylesheet read. The
 *   template's three faces come from the root layout for every route, so a
 *   second font pair on this one route would download two families nothing
 *   sets.
 *
 *   `DIRECTION_CONTRACT`. It is the previous design's thesis, written out as an
 *   HTML comment so it could be audited in the shipped markup: grey ground,
 *   sharp 4px corners, "nothing is a pill". Every line of it is now false on
 *   this page, and a design contract that describes a design the page no longer
 *   has is worse than none. It still lives in `meta.ts` for the routes that
 *   have not been reskinned yet.
 *
 *   `NOSCRIPT_CSS`. It forced `opacity:1` onto `.vl-root` descendants so the
 *   old page's motion did not leave the headline invisible without JS. This
 *   page has no `.vl-root` and no entrance animation; the rule matched nothing.
 */
export default function PricingShell({ lang }: { lang: LabLang }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd(lang)) }}
      />
      <PricingPageBody lang={lang} />
    </>
  )
}
