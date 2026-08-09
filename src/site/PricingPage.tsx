import Link from 'next/link'
import { SiteNav, SiteFooter } from './SiteChrome'
import Calculator from './Calculator'
import {
  type LabLang, tx,
  SERVICES, CALC, UI, CONTACT, FAQ, type FaqItem,
  SEPARATE, SEPARATE_LABEL, SEPARATE_SUB,
  TELEGRAM, TELEGRAM_HANDLE, EMAIL, BRAND,
} from './labData'
import { WORK_TYPES, READINESS, ADDONS, money, priced } from './labPricing'
import { PRICING } from './pricingCopy'
import { SERVICE_PAGES } from './servicePages'
import { localizedHref, servicePath, pricingPath } from './routing'
import CopyEmail from './CopyEmail'
/* Load-bearing, same as on the service and case pages: Lab.tsx owns the only
   other import of this stylesheet, and this page is not in Lab's tree. */
import './lab.css'

/**
 * The price list.
 *
 * Two things make this page different from a table of numbers.
 *
 * THE QUALIFIER IS ABOVE THE FOLD. Every figure here is a floor, and a page
 * that prints nine of them before admitting that has already misled the reader.
 * It is the second line of the page, not a footnote under the table.
 *
 * THE MULTIPLIERS ARE PUBLISHED. Section four prints the calculator's own
 * readiness factors, ×1.2 / ×1.0 / ×0.8, with a sentence each on why. Nobody
 * publishes the inside of their estimator, which is most of the reason to do
 * it: a reader who can reproduce the number stops wondering what it hides. The
 * framing is deliberate and load-bearing, though. These are inputs to an
 * estimate, not terms of a contract, and the copy says so in the same breath,
 * because a published multiplier that reads as a promise is worse than an
 * unpublished one.
 *
 * NO NUMERAL IS TYPED IN THIS FILE. Every price, factor and week count is read
 * from labPricing.ts. A price list that restates its own source is a price list
 * that will disagree with the calculator sitting three sections below it.
 */
export default function PricingPageBody({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const home = localizedHref(lang)
  const slugFor = (key: string) => SERVICE_PAGES.find((p) => p.key === key)?.slug

  return (
    <div className="vl-root">
      <SiteNav lang={lang} twin={pricingPath} />

      <main id="main-content">
        <nav className="vl-wrap vl-crumb" aria-label="Breadcrumb">
          <Link href={home}>{BRAND}</Link>
          <span aria-hidden="true">/</span>
          <span>{L(UI.navPricing)}</span>
        </nav>

        {/* HERO. The disclaimer is the lead, not a footnote. */}
        <section className="vl-wrap vl-pr-hero">
          <span className="vl-lbl">{L(UI.navPricing)}</span>
          <h1>{L(PRICING.h1)}</h1>
          <p className="vl-pr-lead">{L(PRICING.lead)}</p>
          <div className="vl-sp-acts">
            <a href="#estimate" className="vl-btn-signal">{L(UI.navCalc)}</a>
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="vl-btn-ghost">
              {TELEGRAM_HANDLE}
            </a>
          </div>
        </section>

        {/* THE SIX. A real table: it is tabular data, and pretending otherwise
            costs screen-reader users the column headers. Below 760px the CSS
            stacks each row and reprints the header from data-l. */}
        <section className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(PRICING.tableLabel)}</h2>
            <p>{L(PRICING.tableSub)}</p>
          </div>
          <div className="vl-pr-tablewrap">
            <table className="vl-pr-table">
              <thead>
                <tr>
                  <th scope="col" className="vl-pr-idx">№</th>
                  <th scope="col">{L(PRICING.colWork)}</th>
                  <th scope="col">{L(PRICING.colFrom)}</th>
                  <th scope="col">{L(PRICING.colTerm)}</th>
                  <th scope="col">{L(PRICING.colSupport)}</th>
                </tr>
              </thead>
              <tbody>
                {WORK_TYPES.map((w, i) => {
                  const svc = SERVICES.find((s) => s.key === w.key)
                  const slug = slugFor(w.key)
                  return (
                    <tr key={w.key}>
                      <td className="vl-pr-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</td>
                      <th scope="row" data-l={L(PRICING.colWork)}>
                        {slug
                          ? <Link href={servicePath(lang, slug)}>{L(svc?.t ?? w.label)}</Link>
                          : L(svc?.t ?? w.label)}
                      </th>
                      <td data-l={L(PRICING.colFrom)} className="vl-pr-money">
                        {money(priced(w.from))}
                      </td>
                      <td data-l={L(PRICING.colTerm)}>
                        {w.weeks[0]}–{w.weeks[1]} {L(CALC.weeksShort)}
                      </td>
                      <td data-l={L(PRICING.colSupport)}>
                        {L(CALC.bfFrom)} {money(priced(w.support))}{L(CALC.perMonth)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* WHAT CHANGES THE NUMBER. The estimator, opened up. */}
        <section className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(PRICING.readyLabel)}</h2>
            <p>{L(PRICING.readySub)}</p>
          </div>
          <ol className="vl-pr-ready">
            {READINESS.map((r) => (
              <li key={r.key}>
                <span className="vl-pr-factor">×{r.factor.toFixed(1)}</span>
                <span className="vl-pr-ready-t">{L(r.label)}</span>
                <span className="vl-pr-ready-d">{L(PRICING.readyWhy[r.key])}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ADD-ONS. Additive, which the FAQ below says out loud. */}
        <section className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(PRICING.addonsLabel)}</h2>
            <p>{L(PRICING.addonsSub)}</p>
          </div>
          <ul className="vl-pr-addons">
            {ADDONS.map((a) => (
              <li key={a.key}>
                <span className="vl-pr-addon-t">{L(a.label)}</span>
                <span className="vl-pr-addon-p">+{money(priced(a.add))}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* PAID SEPARATELY. Same six as everywhere else, imported not restated. */}
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

        {/* THE CALCULATOR, unseeded: this page never assumed a service. */}
        <section id="estimate" className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(PRICING.estimateLabel)}</h2>
            <p>{L(PRICING.estimateSub)}</p>
          </div>
          <Calculator lang={lang} />
        </section>

        {/* FAQ, the money subset. */}
        <section className="vl-wrap vl-sec">
          <div className="vl-sec-head">
            <h2>{L(PRICING_FAQ_LABEL)}</h2>
          </div>
          <dl className="vl-pr-faq">
            {pricingFaq().map((f, i) => (
              <div key={i}>
                <dt>{L(f.q)}</dt>
                <dd>{L(f.a)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="vl-wrap">
          <div className="vl-contact">
            <h2>{L(CONTACT.h)}</h2>
            <p className="vl-contact-sub">{L(CONTACT.sub)}</p>
            <div className="vl-contact-acts">
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="vl-contact-tg">
                {TELEGRAM_HANDLE}
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

const PRICING_FAQ_LABEL = {
  en: 'Questions about the money',
  ru: 'Вопросы про деньги',
}

/**
 * The five questions this page should answer, in reading order.
 *
 * Two are written for this page and two are lifted by reference from the home
 * page's list, never by copy: `FAQ[0][2]` and `FAQ[0][1]` say the same thing in
 * both places because they ARE the same strings.
 *
 * Home's "How much will it cost?" is deliberately not among them. Its answer
 * points at the calculator, and on a page that is nothing but prices the whole
 * document is the answer; reprinting it would be a question answered twice.
 *
 * Every reused item was checked for direction words. "The grid above" and
 * "step 05 of the process" are true on the home page and false here, so those
 * two are not reused, and this comment exists so the next person picking items
 * checks the same thing.
 */
function pricingFaq(): FaqItem[] {
  return [
    PRICING_OWN_FAQ[0],
    FAQ[0][2],
    PRICING_OWN_FAQ[1],
    FAQ[0][1],
    FAQ[1][4],
  ]
}

const PRICING_OWN_FAQ: FaqItem[] = [
  {
    q: { en: 'Why is every number a “from”?', ru: 'Почему везде «от»?' },
    a: {
      en: 'Because the same kind of work spans a wide range, and a single figure printed before anyone has looked at your task would be a guess wearing a decimal point. The floor is real: it is what the work starts at. The binding figure is fixed after the scoping call, which is free and can end with us saying it is not worth building.',
      ru: 'Потому что одна и та же работа бывает очень разной, и одна цифра, напечатанная до того, как кто-то посмотрел на вашу задачу, была бы догадкой с копейками. Пол настоящий: с него работа начинается. Точную цифру фиксируем после разбора, разбор бесплатный, и он может закончиться словами «делать не стоит».',
    },
  },
  {
    q: { en: 'Do the add-ons get multiplied too?', ru: 'Надбавки тоже умножаются?' },
    a: {
      en: 'No. The multiplier applies to the base only, then the add-ons are added on top of the result. Two add-ons cost the same whether you arrive with an idea or with a running system, because the work inside them does not change.',
      ru: 'Нет. Коэффициент применяется только к базе, а надбавки прибавляются к результату. Две надбавки стоят одинаково и с идеей, и с работающей системой, потому что работа внутри них не меняется.',
    },
  },
]
