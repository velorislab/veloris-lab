import Link from 'next/link'
import { SiteNav, SiteFooter } from './SiteChrome'
import Calculator from './Calculator'
import {
  type LabLang, tx,
  SERVICES, CASES, CASE_KEYS, CALC, UI, CONTACT,
  SEPARATE, SEPARATE_LABEL, SEPARATE_SUB,
  TELEGRAM, TELEGRAM_HANDLE, EMAIL, BRAND,
} from './labData'
import { WORK_TYPES, money, priced } from './labPricing'
import { CASES_BY_SERVICE, type ServicePage as SP } from './servicePages'
import { CASE_PAGES } from './casePages'
import { localizedHref, servicePath, casePath } from './routing'
import CopyEmail from './CopyEmail'
/* Load-bearing. Lab.tsx imports the stylesheet and this page is not in Lab's
   tree, so without this line every service page renders with no CSS at all:
   no custom properties, no background, browser-default type. It built, it
   rendered, and every content assertion passed, because text is not style. */
import './lab.css'

/**
 * One service page.
 *
 * Six of these exist per locale and they are the site's answer to the question
 * a search engine is actually asked: not "who are you" but "what does X cost".
 * That is why the price is the second line of the h1 rather than a detail
 * further down; it is the only structural thing borrowed wholesale from the
 * reference, whose case pages pin a figure into the heading for exactly this
 * reason.
 *
 * EVERY FIGURE IS READ, NEVER TYPED. Twelve pages carrying hand-written prices
 * would disagree with the calculator the first time labPricing moves, and the
 * disagreement would be invisible until a client found it.
 */
export default function ServicePageBody({ lang, page }: { lang: LabLang; page: SP }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const svc = SERVICES.find((s) => s.key === page.key)
  const work = WORK_TYPES.find((w) => w.key === page.key)
  const home = localizedHref(lang)

  /* Titles rather than indices, so reordering CASES cannot silently repoint a
     service page at the wrong case. */
  const wanted = CASES_BY_SERVICE[page.key] ?? []
  const related = CASES.filter((c) => wanted.includes(tx(c.title, 'en')))

  return (
    <div className="vl-root">
      <SiteNav lang={lang} twin={(to) => servicePath(to, page.slug)} />

      <main id="main-content">
        <nav className="vl-wrap vl-crumb" aria-label="Breadcrumb">
          <Link href={home}>{BRAND}</Link>
          <span aria-hidden="true">/</span>
          <span>{L(svc?.t)}</span>
        </nav>

        {/* HERO. The price is a line of the heading, not a footnote. */}
        <section className="vl-wrap vl-sp-hero">
          <span className="vl-lbl">{L(page.category)}</span>
          <h1 className="vl-sp-h1">
            {L(svc?.t)}
            {work && (
              <span className="vl-sp-price">
                {L(CALC.bfFrom)} {money(priced(work.from))}
              </span>
            )}
          </h1>
          <p className="vl-sp-lead">{L(page.when[0])}</p>

          {work && (
            <dl className="vl-sp-pills">
              <div>
                <dt>{L(CALC.termLbl)}</dt>
                <dd>{work.weeks[0]}–{work.weeks[1]} {L(CALC.weeksShort)}</dd>
              </div>
              <div>
                <dt>{L(CALC.supportLbl)}</dt>
                <dd>{L(CALC.bfFrom)} {money(priced(work.support))}{L(CALC.perMonth)}</dd>
              </div>
              <div>
                <dt>{L(UI.navCalc)}</dt>
                <dd>{L(CALC.bfFrom)} {money(priced(work.from))}</dd>
              </div>
            </dl>
          )}

          <div className="vl-sp-acts">
            <a href="#estimate" className="vl-btn-signal">{L(page.ctaLabel)}</a>
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="vl-btn-ghost">
              {TELEGRAM_HANDLE}
            </a>
          </div>
        </section>

        {/* WHEN THIS IS THE RIGHT CALL */}
        <section className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(SP_LABELS.when)}</h2>
          </div>
          <ul className="vl-sp-when">
            {/* [0] is the lead above; this list is the other two. */}
            {page.when.slice(1).map((w, i) => (
              <li key={i}>{L(w)}</li>
            ))}
          </ul>
        </section>

        {/* WHAT THE FIRST VERSION INCLUDES */}
        <section className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(SP_LABELS.first)}</h2>
            <p>{L(SP_LABELS.firstSub)}</p>
          </div>
          <ul className="vl-sp-scope">
            {page.firstVersion.map((f, i) => (
              <li key={i}>{L(f)}</li>
            ))}
          </ul>
        </section>

        {/* WHAT MOVES THE PRICE. Required per service, never a shared string. */}
        <section className="vl-wrap vl-sec">
          <div className="vl-on-light vl-sp-drivers">
            <h2>{L(SP_LABELS.drivers)}</h2>
            <p>{L(page.priceDrivers)}</p>
            <p className="vl-sp-note">{L(CALC.disclaimer)}</p>
          </div>
        </section>

        {/* RELATED WORK */}
        {related.length > 0 && (
          <section className="vl-wrap vl-sec">
            <div className="vl-sec-head">
              <h2>{L(SP_LABELS.related)}</h2>
            </div>
            <div className="vl-sp-cases">
              {related.map((c, i) => {
                const cp = CASE_PAGES.find((x) => x.match === tx(c.title, 'en'))
                const Inner = (
                  <>
                    <div className="vl-sp-case-top">
                      <h3>{L(c.title)}</h3>
                      <span className={c.live ? 'vl-case-badge vl-case-badge-live' : 'vl-case-badge'}>
                        {L(c.status)}
                      </span>
                    </div>
                    <p>{L(c.sub)}</p>
                    <dl className="vl-sp-case-res">
                      <dt className="vl-lbl">{L(CASE_KEYS.res)}</dt>
                      <dd>{L(c.res)}</dd>
                    </dl>
                  </>
                )
                /* A Link CARRYING the same children, never an <article> nested
                   inside one: that would put a padded white card inside a
                   padded white card. The plain article stays as the fallback
                   for a join that does not resolve, which cannot happen today
                   but would otherwise fail silently if a title changed. */
                return cp ? (
                  <Link href={casePath(lang, cp.slug)} className="vl-sp-case vl-sp-case-go" key={i}>
                    {Inner}
                    <span className="vl-sp-case-more">{L(UI.readCase)}</span>
                  </Link>
                ) : (
                  <article className="vl-sp-case" key={i}>{Inner}</article>
                )
              })}
            </div>
          </section>
        )}

        {/* PAID SEPARATELY. Same six as the home page, imported not restated. */}
        <section className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(SEPARATE_LABEL)}</h2>
            <p>{L(SEPARATE_SUB)}</p>
          </div>
          <dl className="vl-sep">
            {SEPARATE.map((x, i) => (
              <div className="vl-sep-row" key={i}>
                <dt>{L(x.k)}</dt>
                <dd>{L(x.d)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* THE CALCULATOR, arriving with this page's service already chosen. */}
        <section id="estimate" className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(SP_LABELS.estimate)}</h2>
            <p>{L(SP_LABELS.estimateSub)}</p>
          </div>
          <Calculator lang={lang} seedType={page.key} />
        </section>

        {/* CLOSE */}
        <section className="vl-wrap">
          <div className="vl-contact">
            <h2>{L(CONTACT.h)}</h2>
            <p className="vl-contact-sub">{L(CONTACT.sub)}</p>
            <div className="vl-contact-acts">
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="vl-contact-tg"
                title={TELEGRAM_HANDLE}
              >
                {L(UI.ctaTg)}
              </a>
              <a
                className="vl-btn-ghost"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(L(CONTACT.mailDirectSubject))}&body=${encodeURIComponent(L(CONTACT.mailDirectBody))}`}
              >
                {L(UI.sendMailDirect)}
              </a>
              <CopyEmail email={EMAIL} copiedLabel={L(UI.copied)} hint={L(UI.copyHint)} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}

/**
 * Section headings shared by all six pages.
 *
 * Here rather than in servicePages.ts because they do not vary per service; the
 * per-service strings are the ones that must never be shared, and keeping the
 * two kinds in different files makes it obvious which is which.
 */
const SP_LABELS = {
  when: { en: 'This may also be you', ru: 'Это тоже про вас' },
  first: { en: 'What the first version includes', ru: 'Что входит в первую версию' },
  firstSub: {
    en: 'The smallest thing that is worth running in production, not a demo.',
    ru: 'Самое маленькое, что уже имеет смысл держать в проде, а не демо.',
  },
  drivers: { en: 'What moves the price', ru: 'Что двигает цену' },
  related: { en: 'We have built this before', ru: 'Такое мы уже делали' },
  estimate: { en: 'Price it here', ru: 'Посчитайте здесь' },
  estimateSub: {
    en: 'The first question is already answered by the page you are on. Four left.',
    ru: 'На первый вопрос уже отвечает страница, на которой вы стоите. Осталось четыре.',
  },
}
