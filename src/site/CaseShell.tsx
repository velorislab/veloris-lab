import CasePageBody from './CasePage'
import { caseJsonLd } from './meta'
import type { CasePage } from './casePages'
import type { LabLang } from './routing'

/**
 * Wrapper for one case page: the CreativeWork + BreadcrumbList payload, and the
 * page under it.
 *
 * THREE THINGS THIS USED TO DO AND NO LONGER DOES, all three for the same
 * reason: they belonged to the design this page has left.
 *
 *   Inter and JetBrains Mono, loaded as `--font-vl-sans` / `--font-vl-mono`.
 *   Only `lab.css` ever read those two variables, and this page does not load
 *   it; the three faces the template uses come from the root layout.
 *
 *   DIRECTION_CONTRACT, which describes a grey #ececed ground, mono labels and
 *   sharp 4px corners. Shipping it in the markup of a page that is now white
 *   cards on 20px radii would be publishing a false statement about the page.
 *
 *   NOSCRIPT_CSS, whose selectors are all `.vl-root`, an element that no longer
 *   exists here. The motion on this page is the template's own, and its
 *   entrances resolve without JS on their own.
 *
 * The metadata for these routes is untouched and still comes from
 * `caseMetadata` in the two route files.
 */
export default function CaseShell({ lang, page }: { lang: LabLang; page: CasePage }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd(lang, page)) }}
      />
      <CasePageBody lang={lang} page={page} />
    </>
  )
}
