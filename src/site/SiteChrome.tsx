import Link from 'next/link'
import {
  type LabLang, tx,
  BRAND, TELEGRAM, SWIFTIN, ABOUT_URL, UI, FOOTER,
} from './labData'
import { localizedHref, pricingPath } from './routing'

/**
 * The header and footer, shared by the home page and every inner page.
 *
 * They used to live inside Lab.tsx, which was fine while there was one page.
 * With services, cases and pricing all carrying the same nav, a nav that exists
 * in two places is a nav that will disagree with itself, and the language
 * switcher is the part that would break first: on an inner page it has to cross
 * to the SAME page in the other locale, not dump the reader on the home page.
 */

/**
 * `twin` is what makes this nav work off the home page, and it does two jobs.
 *
 * Its presence says "this is not the home page", which turns every in-page
 * anchor into an absolute link back to the home page's anchor. Without that,
 * `#services` on an inner page is a link that quietly does nothing.
 *
 * Its return value is the same page in the other language, which is the only
 * correct destination for the switcher. It is a function rather than a slug
 * because the three inner page kinds build that path differently, and the first
 * version of this took a bare slug and assumed `/services/<slug>`, which sent
 * every case page's switcher to a service URL that did not exist.
 */
export function SiteNav({ lang, twin }: { lang: LabLang; twin?: (to: LabLang) => string }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const home = localizedHref(lang)
  /** On home, `#calc`. Elsewhere, `/ru#calc`. */
  const at = (hash: string) => (twin ? `${home}${hash}` : hash)

  const other = (to: LabLang) => (twin ? twin(to) : localizedHref(to))

  return (
    <header className="vl-nav">
      <div className="vl-wrap vl-nav-in">
        <a href={twin ? home : '#top'} className="vl-brand">
          <span className="vl-mark" aria-hidden="true" />
          {BRAND}
        </a>
        <nav className="vl-links">
          <a href={at('#services')}>{L(UI.navServices)}</a>
          <a href={at('#cases')}>{L(UI.navCases)}</a>
          <a href={at('#process')}>{L(UI.navProcess)}</a>
          <a href={at('#calc')}>{L(UI.navCalc)}</a>
          <a href={at('#bureau')}>{L(UI.navBureau)}</a>
        </nav>
        <div className="vl-nav-right">
          <div className="vl-langsw">
            {lang === 'en'
              ? <span className="vl-lang-on">en</span>
              : <Link href={other('en')} hrefLang="en">en</Link>}
            {lang === 'ru'
              ? <span className="vl-lang-on">ru</span>
              : <Link href={other('ru')} hrefLang="ru">ru</Link>}
          </div>
          <a href={at('#contact')} className="vl-nav-cta">{L(UI.cta)}</a>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  return (
    <footer className="vl-wrap vl-foot">
      <span className="vl-foot-line">{L(FOOTER.line)}</span>
      <nav className="vl-foot-nav">
        <Link href={pricingPath(lang)}>{L(UI.navPricing)}</Link>
        {/* Absolute, not `/about`. That route lived in the Swiftin repo this
            project was split out of; here it 404s. */}
        <a href={ABOUT_URL} target="_blank" rel="noopener noreferrer">{L(UI.founderLink)}</a>
        <a href={SWIFTIN} target="_blank" rel="noopener noreferrer">{L(UI.productLink)}</a>
        <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Telegram</a>
      </nav>
    </footer>
  )
}
