import Link from 'next/link'
import { SiteNav, SiteFooter } from './SiteChrome'
import {
  type LabLang, tx,
  CASES, SERVICES, CALC, UI, CONTACT,
  TELEGRAM, TELEGRAM_HANDLE, EMAIL, BRAND,
} from './labData'
import { WORK_TYPES, money, priced } from './labPricing'
import { CASE_PAGES, CP_LABELS, type CasePage as CP } from './casePages'
import { SERVICE_PAGES } from './servicePages'
import { localizedHref, servicePath, casePath } from './routing'
import CopyEmail from './CopyEmail'
import './lab.css'

/**
 * One case page.
 *
 * Deliberately shorter than the reference's twenty-seven-field template; the
 * cuts and their reasons are recorded in casePages.ts. Two are worth repeating
 * where the markup makes them visible:
 *
 * NO PRICE IN THE HEADING. Their cases are their own priced products, so a
 * figure in the h1 is a fact. Ours are client work whose price we cannot
 * publish, and printing the parent service's floor under a case would say that
 * is what the case cost. It appears once, in the sidebar, as "similar work
 * from X" with the service named and linked, which is true and still gives the
 * reader a number to hold.
 *
 * NO INVENTED DIFFICULTIES. Two of the four cases have enough asserted material
 * to draw three real obstacles from; two do not, and their section simply does
 * not render.
 */
export default function CasePageBody({ lang, page }: { lang: LabLang; page: CP }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const c = CASES.find((x) => tx(x.title, 'en') === page.match)
  if (!c) return null

  const parent = SERVICES.find((s) => s.key === page.parentService)
  const parentWork = WORK_TYPES.find((w) => w.key === page.parentService)
  const parentSlugFor = page.parentService
  const others = CASE_PAGES.filter((p) => p.slug !== page.slug).slice(0, 3)
  const home = localizedHref(lang)

  return (
    <div className="vl-root">
      <SiteNav lang={lang} twin={(to) => casePath(to, page.slug)} />

      <main id="main-content">
        <nav className="vl-wrap vl-crumb" aria-label="Breadcrumb">
          <Link href={home}>{BRAND}</Link>
          <span aria-hidden="true">/</span>
          <span>{L(c.title)}</span>
        </nav>

        <section className="vl-wrap vl-cp-hero">
          <span className="vl-lbl">{L(page.eyebrow)}</span>
          <div className="vl-cp-title">
            <h1>{L(c.title)}</h1>
            <span className={c.live ? 'vl-case-badge vl-case-badge-live' : 'vl-case-badge'}>
              {L(c.status)}
            </span>
          </div>
          <p className="vl-cp-lead">{L(c.sub)}</p>
          {c.links.length > 0 && (
            <div className="vl-cp-links">
              {c.links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={l.primary ? 'vl-btn-signal' : 'vl-btn-ghost'}
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </section>

        <div className="vl-wrap vl-cp-body">
          <div className="vl-cp-main">
            <section className="vl-cp-block">
              <h2>{L(CP_LABELS.task)}</h2>
              <p>{L(c.task)}</p>
            </section>

            <section className="vl-cp-block">
              <h2>{L(CP_LABELS.audience)}</h2>
              <p>{L(page.audience)}</p>
            </section>

            {/* Only where the material supports three real ones. */}
            {page.difficulties && (
              <section className="vl-cp-block">
                <h2>{L(CP_LABELS.difficulties)}</h2>
                <ol className="vl-cp-diff">
                  {page.difficulties.map((d, i) => (
                    <li key={i}>
                      <span className="vl-cp-diff-n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="vl-cp-diff-t">{L(d.t)}</span>
                      <span className="vl-cp-diff-d">{L(d.d)}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className="vl-cp-block">
              <h2>{L(CP_LABELS.did)}</h2>
              <p>{L(c.sol)}</p>
            </section>

            <section className="vl-cp-block">
              <h2>{L(CP_LABELS.outcome)}</h2>
              <p className="vl-cp-outcome">{L(c.res)}</p>
            </section>
          </div>

          {/* The sidebar carries the only number on the page, and it is the
              PARENT SERVICE's floor, labelled as such. */}
          <aside className="vl-cp-side">
            <div className="vl-cp-card">
              <span className="vl-lbl">{L(CP_LABELS.stack)}</span>
              <ul className="vl-cp-stack">
                {c.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>

            {parent && parentWork && (
              <div className="vl-cp-card">
                <span className="vl-lbl">{L(CP_LABELS.similar)}</span>
                <Link href={`${servicePath(lang, serviceSlug(parentSlugFor))}#estimate`} className="vl-cp-similar">
                  {L(parent.t)}
                </Link>
                <span className="vl-cp-from">
                  {L(CALC.bfFrom)} {money(priced(parentWork.from))}
                </span>
                <span className="vl-cp-note">{L(CALC.disclaimer)}</span>
              </div>
            )}
          </aside>
        </div>

        {others.length > 0 && (
          <section className="vl-wrap vl-sec">
            <div className="vl-sec-head">
              <h2>{L(CP_LABELS.other)}</h2>
            </div>
            <div className="vl-cp-others">
              {others.map((o) => {
                const oc = CASES.find((x) => tx(x.title, 'en') === o.match)
                if (!oc) return null
                return (
                  <Link key={o.slug} href={casePath(lang, o.slug)} className="vl-cp-other">
                    <span className="vl-lbl">{L(o.eyebrow)}</span>
                    <h3>{L(oc.title)}</h3>
                    <p>{L(oc.sub)}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <section className="vl-wrap">
          <div className="vl-contact">
            <h2>{L(page.cta)}</h2>
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
 * WORK_TYPES key to service-page slug.
 *
 * Read out of SERVICE_PAGES rather than written here. The first draft of this
 * was a second hand-kept map of the same six pairs, which is precisely the drift
 * this codebase spends its comments avoiding: it would have gone stale the first
 * time a slug changed, and the only symptom would have been a case page linking
 * to a 404.
 */
function serviceSlug(key: string): string {
  return SERVICE_PAGES.find((p) => p.key === key)?.slug ?? key
}
