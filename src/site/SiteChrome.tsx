import Link from 'next/link'
import {
  type LabLang, tx,
  BRAND, TELEGRAM, SWIFTIN, ABOUT_URL, UI, FOOTER,
} from './labData'
import { localizedHref, servicePath } from './routing'

/**
 * The header and footer, shared by the home page and every service page.
 *
 * They used to live inside Lab.tsx, which was fine while there was one page.
 * With `/services/<slug>` × 6 × 2 arriving, a nav that exists in two places is
 * a nav that will disagree with itself, and the language switcher is the part
 * that would break first: on a service page it has to cross to the SAME service
 * in the other locale, not dump the reader on the home page.
 */

/**
 * `section` is the anchor set the nav can use.
 *
 * On the home page the links are in-page anchors. On a service page there are
 * no such sections to jump to, so each one has to become an absolute link back
 * to the home page's anchor, or the nav quietly does nothing. `home` is the
 * path those anchors hang off.
 */
export function SiteNav({ lang, slug }: { lang: LabLang; slug?: string }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const home = localizedHref(lang)
  /** On home, `#calc`. Elsewhere, `/ru#calc`. */
  const at = (hash: string) => (slug ? `${home}${hash}` : hash)

  /* The switcher crosses to the same page in the other language when there is
     one, and to the other home page when there is not. */
  const other = (to: LabLang) => (slug ? servicePath(to, slug) : localizedHref(to))

  return (
    <header className="vl-nav">
      <div className="vl-wrap vl-nav-in">
        <a href={slug ? home : '#top'} className="vl-brand">
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
        {/* Absolute, not `/about`. That route lived in the Swiftin repo this
            project was split out of; here it 404s. */}
        <a href={ABOUT_URL} target="_blank" rel="noopener noreferrer">{L(UI.founderLink)}</a>
        <a href={SWIFTIN} target="_blank" rel="noopener noreferrer">{L(UI.productLink)}</a>
        <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Telegram</a>
      </nav>
    </footer>
  )
}
