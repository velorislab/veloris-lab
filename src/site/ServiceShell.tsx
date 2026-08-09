import ServicePageBody from './ServicePage'
import { serviceJsonLd } from './meta'
import type { ServicePage } from './servicePages'
import type { LabLang } from './routing'

/**
 * The wrapper for one service page: the Service + Offer + BreadcrumbList
 * payload, and the page under it.
 *
 * THREE THINGS THE OLD SHELL CARRIED ARE GONE WITH THE OLD DESIGN, and none of
 * them was metadata:
 *
 *   The two font variables. This shell loaded Inter and JetBrains Mono for
 *   `lab.css` to resolve. The template's three faces are loaded once by the root
 *   layout (`src/site/rootLayout.tsx`), and every page including this one reads
 *   them from there, so a second pair here would be two unused font downloads.
 *
 *   `DIRECTION_CONTRACT`. It is an HTML comment describing the previous design's
 *   direction, down to its hex values and its 4px corners. On a page that no
 *   longer looks like that, shipping it into the markup is shipping a false
 *   statement about the page it sits in.
 *
 *   `NOSCRIPT_CSS`. Its two selectors are `.vl-root` and `.vl-word`; neither
 *   exists on this page any more. It was there because the old page animated its
 *   headline from `opacity: 0`. Nothing in this composition renders hidden and
 *   waits for JavaScript, so there is nothing to reveal.
 *
 * The JSON-LD stays, unchanged and still built by `meta.ts` from the same price
 * table the page renders. So does `serviceMetadata`, which the two route files
 * call directly.
 */
export default function ServiceShell({ lang, page }: { lang: LabLang; page: ServicePage }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(lang, page)) }}
      />
      <ServicePageBody lang={lang} page={page} />
    </>
  )
}
