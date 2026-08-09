import Image from 'next/image'
// The `/ssr` submodule, because this file is a Server Component: those variants
// render without React Context. One family, one weight, never hand-drawn.
import {
  InstagramLogoIcon,
  TelegramLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react/ssr'
import { SiteNav, SiteFooter } from './SiteChrome'
import CopyEmail from './CopyEmail'
import Calculator from './Calculator'
import HeroCopy from './HeroCopy'
import HeroTexture from './HeroTexture'
import HeroField from './HeroField'
import Pipeline from './Pipeline'
import ToolGrid from './ToolGrid'
import Faq from './Faq'
import RollingSteps from './RollingSteps'
import ScrollStroke from './ScrollStroke'
import {
  type LabLang,
  tx,
  EMAIL, TELEGRAM, TELEGRAM_HANDLE,
  UI, SERVICES, SERVICES_LABEL, SERVICES_SUB,
  CASES, CASES_LABEL, CASES_SUB, CASE_KEYS,
  PROCESS_LABEL, PROCESS_SUB,
  WHY, WHY_LABEL, WHY_SUB,
  CALC, HERO, FAQ_LABEL, FAQ_SUB,
  ENTRY, ENTRY_LABEL, ENTRY_SUB,
  STACK_LABEL, STACK_SUB,
  SEPARATE, SEPARATE_LABEL, SEPARATE_SUB,
  BUREAU, CONTACT, LOGOS, REVIEWS,
  SOCIAL, ABOUT_URL,
} from './labData'
import { WORK_TYPES, money, priced } from './labPricing'
import './lab.css'

/** Keyed off SOCIAL so a profile can never render with the wrong mark. */
const SOCIAL_ICON = {
  instagram: InstagramLogoIcon,
  telegram: TelegramLogoIcon,
  linkedin: LinkedinLogoIcon,
} as const

/**
 * Veloris Lab landing (/lab, /ru/lab). Server-rendered end to end; the only
 * client island is the email-copy button.
 *
 * The bureau is a separate brand from Swiftin, so this route renders its own
 * nav and footer instead of the site Header/Footer, and keeps its own fonts and
 * scoped CSS. That is also what makes the folder portable if it ever moves to
 * its own domain.
 */
export default function Lab({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <div className="vl-root">

      <SiteNav lang={lang} />

      {/* `main-content` is the target of the site-wide skip link in RootBody. */}
      <main id="main-content">

      {/* HERO BAND. Full-bleed dark, painted by HeroTexture rather than backed
          by a licensed photo.

          Centred, with the system diagram as the thing under the statement
          rather than beside it. This replaced a split composition whose right
          rail held the facts table; the table now runs as a strip under the
          band, where it has the width to be read across instead of down. */}
      <section id="top" className="vl-heroband">
        <HeroTexture />
        <HeroField />
        <div className="vl-wrap vl-hero">
          <HeroCopy lang={lang} />
          <Pipeline lang={lang} />
        </div>
      </section>

      {/* PRICE TICKER. Was a hand-kept list of thirteen capability words; it is
          now the six services with their floors, derived from labPricing, so the
          price ladder is stated once before the reader reaches any section that
          argues about it. A list of adjectives said what we know; this says what
          it costs.

          Loop mechanics unchanged and load-bearing: two identical passes moved
          by exactly -50%, with the list repeated inside each pass, because one
          pass narrower than the viewport shows a gap on a wide monitor.
          aria-hidden because it is decorative and would otherwise be announced
          four times over. */}
      <div className="vl-ticker" aria-hidden="true">
        <div className="vl-ticker-track">
          {[0, 1].map((pass) => (
            <div className="vl-ticker-pass" key={pass}>
              {[0, 1].map((copy) => WORK_TYPES.map((t, i) => (
                <span className="vl-ticker-item" key={`${copy}-${i}`}>
                  <span className="vl-ticker-word">
                    {L(t.label)} {L(CALC.bfFrom)} {money(priced(t.from))}
                  </span>
                  <span className="vl-ticker-dot" />
                </span>
              )))}
            </div>
          ))}
        </div>
      </div>

      {/* FACTS STRIP. What used to be the hero's right rail, and what used to be
          a separate three-cell strip that repeated its first three rows word for
          word. One table now, six rows, each checkable further down the page.
          This is the honest version of the reference's client-logo wall: real
          facts about us instead of borrowed marks from companies we never had. */}
      <div className="vl-wrap">
        <dl className="vl-facts-strip">
          {HERO.facts.map((f, i) => (
            <div className="vl-facts-cell" key={i}>
              <dt className="vl-lbl">{L(f.k)}</dt>
              <dd className={f.hot ? 'vl-facts-v vl-facts-hot' : 'vl-facts-v'}>{L(f.v)}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* CASES */}
      <section id="cases" className="vl-wrap vl-sec">
        <div className="vl-sec-head">
          <h2>{L(CASES_LABEL)}</h2>
          <p>{L(CASES_SUB)}</p>
        </div>
        <div className="vl-cases">
          {CASES.map((c, i) => (
            <article className="vl-case" key={i}>
              <div className="vl-case-head">
                <div className="vl-case-top">
                  <h3 className="vl-case-t">{L(c.title)}</h3>
                  <span className={c.live ? 'vl-case-badge vl-case-badge-live' : 'vl-case-badge'}>
                    {L(c.status)}
                  </span>
                </div>
                <p className="vl-case-sub">{L(c.sub)}</p>
              </div>
              <div className="vl-tags">
                {c.tags.map((tag, j) => <span className="vl-tag" key={j}>{tag}</span>)}
              </div>
              <div className="vl-psr">
                <div className="vl-psr-item">
                  <span className="vl-lbl">{L(CASE_KEYS.task)}</span>
                  <p>{L(c.task)}</p>
                </div>
                <div className="vl-psr-item">
                  <span className="vl-lbl">{L(CASE_KEYS.sol)}</span>
                  <p>{L(c.sol)}</p>
                </div>
                <div className="vl-psr-item vl-psr-res">
                  <span className="vl-lbl">{L(CASE_KEYS.res)}</span>
                  <p>{L(c.res)}</p>
                </div>
              </div>
              {c.links.length > 0 && (
                <div className="vl-case-links">
                  {c.links.map((l, j) => (
                    <a
                      key={j}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={l.primary ? 'vl-case-link vl-case-link-main' : 'vl-case-link'}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* CLIENT LOGOS, renders only once LOGOS holds real, permitted logos. */}
      {LOGOS.length > 0 && (
        <section className="vl-wrap vl-sec">
          <div className="vl-grid">
            {LOGOS.map((logo) => (
              <div className="vl-cell" key={logo.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} height={28} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section id="services" className="vl-wrap vl-sec-light">
        <div className="vl-on-light">
        <div className="vl-sec-head">
          <h2>{L(SERVICES_LABEL)}</h2>
          <p>{L(SERVICES_SUB)}</p>
        </div>
        {/* Each card carries its own floor, window and support figure, all read
            from labPricing at render time. No numeral is typed here on purpose:
            with the same figures due on service pages, a pricing page and the
            ticker, a hand-typed one drifts the first time the table moves. */}
        <div className="vl-grid">
          {SERVICES.map((s, i) => {
            const w = WORK_TYPES.find((t) => t.key === s.key)
            return (
              <article className="vl-cell" key={s.key}>
                <span className="vl-cell-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="vl-cell-t">{L(s.t)}</h3>
                <p className="vl-cell-d">{L(s.d)}</p>
                <p className="vl-cell-when">{L(s.when)}</p>
                {w && (
                  <dl className="vl-cell-stats">
                    <div>
                      <dt>{L(CALC.resultLbl)}</dt>
                      <dd>{L(CALC.bfFrom)} {money(priced(w.from))}</dd>
                    </div>
                    <div>
                      <dt>{L(CALC.termLbl)}</dt>
                      <dd>{w.weeks[0]}–{w.weeks[1]} {L(CALC.weeksShort)}</dd>
                    </div>
                    <div>
                      <dt>{L(CALC.supportLbl)}</dt>
                      <dd>{L(CALC.bfFrom)} {money(priced(w.support))}{L(CALC.perMonth)}</dd>
                    </div>
                  </dl>
                )}
              </article>
            )
          })}
        </div>
        </div>
      </section>

      {/* BUREAU */}
      <section id="bureau" className="vl-wrap vl-sec">
        <div className="vl-sec-head">
          <h2>{L(BUREAU.label)}</h2>
          <p>{L(BUREAU.lead)}</p>
        </div>

        {/* A real photograph, and the only one on the page. The section claims
            one named person answers for the work, so showing him is the claim's
            evidence; a stock portrait would undo it. Lazy by default: this sits
            well below the fold.

            The overlap is a grid TRACK, not a negative margin: the photograph
            spans columns 1-3 and the card 2-4, so they overlap by construction
            and the proportions survive any container width. */}
        <div className="vl-founder">
          <div className="vl-founder-shot">
            {/* 1500px square source for a 716px slot, so it still has real
                pixels at 2x. An earlier crop was 1000px upscaled to 1100, which
                put softness into the file before the browser ever resized it. */}
            <Image
              src="/founder.jpg"
              alt={L(BUREAU.photoAlt)}
              width={1500}
              height={1500}
              quality={85}
              sizes="(max-width: 720px) 100vw, (max-width: 1080px) 620px, (max-width: 1255px) 63vw, 716px"
            />
          </div>
          <div className="vl-founder-card">
            <h3 className="vl-founder-name">{L(BUREAU.name)}</h3>
            <p className="vl-founder-role">{L(BUREAU.role)}</p>
            <p className="vl-founder-body">{L(BUREAU.body)}</p>

            {/* Only profiles we actually hold get a button. An entry with an
                empty url is skipped rather than rendered dead, so adding the
                missing address is a one-string change in labData. */}
            <div className="vl-founder-links">
              {SOCIAL.filter((s) => s.url).map((s) => {
                const Icon = SOCIAL_ICON[s.key]
                return (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vl-founder-link"
                    aria-label={s.label}
                  >
                    <Icon size={22} weight="regular" aria-hidden="true" />
                  </a>
                )
              })}
              <a href={ABOUT_URL} target="_blank" rel="noopener noreferrer" className="vl-founder-more">
                {L(UI.founderLink)}
              </a>
            </div>
          </div>
        </div>

        {/* Outside .vl-founder on purpose: the strip keeps the photograph's left
            edge and the card's right edge, so it reads as the line the picture
            sits on. Four key/value rows inside the card were the mass that made
            it taller and wider than the photograph. */}
        <dl className="vl-founder-facts">
          {BUREAU.facts.map((f, i) => (
            <div className="vl-founder-fact" key={i}>
              <dt className="vl-lbl">{L(f.k)}</dt>
              <dd className={f.mono ? 'vl-founder-fact-v vl-founder-fact-n' : 'vl-founder-fact-v'}>
                {L(f.v)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ENTRY POINTS. Deliberately unnumbered: the reader self-selects the one
          that matches them, so an order would be decoration, not information.
          The process steps below keep their numbers because that IS a sequence. */}
      <section className="vl-wrap vl-sec">
        <div className="vl-sec-head">
          <h2>{L(ENTRY_LABEL)}</h2>
          <p>{L(ENTRY_SUB)}</p>
        </div>
        <div className="vl-entries">
          {ENTRY.map((e, i) => (
            <article className="vl-entry" key={i}>
              <h3 className="vl-entry-t">{L(e.t)}</h3>
              <p className="vl-entry-d">{L(e.d)}</p>
              <a href="#calc" className="vl-entry-link">{L(UI.ctaCalc)}</a>
            </article>
          ))}
        </div>
      </section>

      {/* CALCULATOR. The page's centre of gravity, and it now sits BEFORE the
          process rather than after it. The old order argued that a reader should
          see how the work runs before being shown a number; the funnel argues
          the opposite, and the entry points immediately above already say "start
          from wherever you are", which is the same sentence the first question
          asks. Process, stack and pass-through costs become the reassurance tail
          after the price instead of a preamble to it. */}
      <section id="calc" className="vl-wrap vl-sec">
        <div className="vl-sec-head">
          <h2>{L(CALC.label)}</h2>
          <p>{L(CALC.sub)}</p>
        </div>
        
          <Calculator lang={lang} />
        
      </section>

      {/* PROCESS */}
      <section id="process" className="vl-wrap vl-sec-light">
        <div className="vl-on-light">
        <div className="vl-sec-head">
          <h2>{L(PROCESS_LABEL)}</h2>
          <p>{L(PROCESS_SUB)}</p>
        </div>
        <RollingSteps lang={lang} />
        </div>
      </section>

      {/* STACK */}
      <section className="vl-wrap vl-sec">
        <div className="vl-sec-head">
          <h2>{L(STACK_LABEL)}</h2>
          <p>{L(STACK_SUB)}</p>
        </div>
        <ToolGrid lang={lang} />
      </section>

      {/* WHAT YOU PAY FOR SEPARATELY. Their strongest trust block per line of
          copy, and the one section of theirs that needs no material we lack.
          Deliberately without figures: these bills come from third parties and
          move, and a price quoted on a landing page goes stale in silence. */}
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

      {/* WHY */}
      <section className="vl-wrap vl-sec-light">
        <div className="vl-on-light">
        <div className="vl-sec-head">
          <h2>{L(WHY_LABEL)}</h2>
          <p>{L(WHY_SUB)}</p>
        </div>
        <div className="vl-why">
          {WHY.map((r, i) => (
            <article className="vl-reason" key={i}>
              <h3 className="vl-reason-t">{L(r.t)}</h3>
              <p className="vl-reason-d">{L(r.d)}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      {/* TESTIMONIALS, renders only once REVIEWS holds real quotes. */}
      {REVIEWS.length > 0 && (
        <section className="vl-wrap vl-sec">
          <div className="vl-why">
            {REVIEWS.map((rev, i) => (
              <blockquote className="vl-reason" key={i}>
                <p className="vl-reason-d">{L(rev.quote)}</p>
                <footer className="vl-lbl">{rev.author}, {L(rev.role)}, {rev.company}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* FAQ. Sits last before the CTA: by here the reader has the offer, the
          proof and the price, and what is left is the objections. */}
      <section className="vl-wrap vl-sec">
        <div className="vl-sec-head">
          <h2>{L(FAQ_LABEL)}</h2>
          <p>{L(FAQ_SUB)}</p>
        </div>
        <Faq lang={lang} />
      </section>

      {/* The run-in to the close. The stroke gets a band of its own rather than
          a layer behind the sections above: occluded by opaque cards it showed
          only in the gaps between them, which read as a smudge, not a line. */}
      <ScrollStroke />

      {/* CONTACT */}
      <section id="contact" className="vl-wrap">
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
