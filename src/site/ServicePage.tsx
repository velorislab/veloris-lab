import Image from 'next/image'
import Link from 'next/link'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Estimate } from '@/components/sections/Estimate'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  type LabLang, tx,
  SERVICES, CASES, CASE_KEYS, CALC, UI, CONTACT,
  SEPARATE, SEPARATE_LABEL, SEPARATE_SUB,
  TELEGRAM, TELEGRAM_HANDLE, EMAIL, BRAND,
} from './labData'
import { WORK_TYPES, money, priced, monthly } from './labPricing'
import { CASES_BY_SERVICE, type ServicePage as SP } from './servicePages'
import { CASE_PAGES } from './casePages'
import { localizedHref, casePath } from './routing'

/**
 * One service page, in the template's design.
 *
 * Six of these exist per locale and they are the site's answer to the question
 * a search engine is actually asked: not "who are you" but "what does X cost".
 * That is why the figure is in the first viewport, beside the h1, rather than a
 * detail further down.
 *
 * EVERY FIGURE IS READ, NEVER TYPED. Twelve pages carrying hand-written prices
 * would disagree with the calculator the first time labPricing moves, and the
 * disagreement would be invisible until a client found it.
 *
 * WHAT THE RESKIN CHANGED, and it is only ever the presentation:
 *
 *   The chrome is `components/layout`, not `site/SiteChrome`. The old nav was
 *   handed a `twin` callback so the language switcher could cross to THIS page
 *   rather than the home page; the new header reads its own path and crosses
 *   with `routing.twinPath`, which is the same behaviour with nothing to pass
 *   and nothing to forget. The footer never took one; its links are absolute
 *   routes already.
 *
 *   `lab.css` is not imported and no `vl-` class is used, except the two the
 *   brand mark owns, which live inside `Mark` and the chrome.
 *
 *   The calculator is gone from this file. `#estimate` is still the id every
 *   CTA on the page points at, and the section holding it is still here; the
 *   widget is being ported separately and mounts into it.
 *
 * FOUR OF THE TEMPLATE'S SURFACES DO THE WORK HERE. The pricing card's shell
 * carries the offer, the feature card's shell carries the recognition lines and
 * the cases, the section heading and badge open every block, and the FAQ
 * accordion carries the pass-through costs, which are six question-shaped rows
 * and were a flat definition list before.
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

  /* Prefilled, exactly as the close on the home page does it: a mail client
     that opens on an empty window gets the same three prompts here. */
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    L(CONTACT.mailDirectSubject),
  )}&body=${encodeURIComponent(L(CONTACT.mailDirectBody))}`

  return (
    <>
      {/* No `twin` prop to pass any more, and that is not an omission.
          `Header` is `"use client"`, so a function prop cannot reach it from
          here at all: passing one throws "Functions cannot be passed directly
          to Client Components" at request time. It reads `usePathname()` and
          crosses locales with `routing.twinPath` instead, so the switcher lands
          on THIS page in the other language without being told which page it
          is on. Same for `offHome`, which it derives from the same path. */}
      <Header lang={lang} />

      {/* The hero sits inside `main` and `page-main` wraps everything after it,
          which is the home page's rhythm with the h1 kept inside the landmark:
          there the hero is a sibling of `main`, and the skip link would jump
          the reader straight past the heading of the page they asked for. The
          200/150/80px `page-main` gives its first child is the same gap it puts
          between every other pair of sections, so nothing about the spacing is
          special-cased here. */}
      <main id="main-content">
        <ServiceHero lang={lang} page={page} name={L(svc?.t)} work={work} home={home} />

        <div className="page-main">
          {/* ---- TWO MORE SIGNS THIS IS YOU ------------------------------- */}
          {/* `when[0]` is the hero's lead, so these are signs two and three and
              the plates say so. Narrower than the template's three-column card
              grid: two cards across 1080px give each of them 525px for one
              sentence, which reads as a card with a hole in it. */}
          <section className="flex w-full max-w-[860px] flex-col items-center gap-10 desktop:gap-[60px]">
            <SectionHeading title={L(SP_LABELS.when)} textWidth={720} />
            <div className="grid w-full grid-cols-1 gap-[30px] tablet:grid-cols-2">
              {page.when.slice(1).map((w, i) => (
                <PlateCard key={i} index={i + 2}>
                  {L(w)}
                </PlateCard>
              ))}
            </div>
          </section>

          {/* ---- WHAT THE FIRST VERSION INCLUDES --------------------------- */}
          <section className="section-shell gap-10 desktop:gap-[60px]">
            <SectionHeading
              badge={{ icon: '/images/icons/badge/whats-inside.svg', label: L(UI.moreOn) }}
              title={L(SP_LABELS.first)}
              description={L(SP_LABELS.firstSub)}
              textWidth={780}
            />
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {page.firstVersion.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-[6px] rounded-pill hairline bg-surface py-[10px] pr-[18px] pl-[14px] shadow-[0_2px_3px_0_rgba(182,182,182,0.1),0_0_0_3px_#ffffff]"
                >
                  <Image
                    src="/images/icons/list/benefits-check.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-5 shrink-0"
                  />
                  <span className="text-[16px] leading-6 text-ink-500 tablet:text-[17px] tablet:leading-[25.5px]">
                    {L(f)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ---- WHAT MOVES THE PRICE -------------------------------------- */}
          {/* Required per service, never a shared string; the type in
              servicePages.ts is what makes a shared one impossible. It gets the
              template's own gradient panel because it is the one block on the
              page that is a single long paragraph, and a paragraph that wide on
              the open page reads as filler. */}
          <section className="flex w-full max-w-[1036px] flex-col items-center">
            <div className="relative flex w-full flex-col items-start gap-8 overflow-hidden rounded-section border border-line bg-linear-to-b from-[#ebf3f9] via-[#f2f8fc] to-[#fbfdfe] p-6 shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_6px_#ffffff] tablet:p-10 desktop:gap-10 desktop:p-[50px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-section"
              >
                <Image
                  src="/images/backgrounds/highlight-grid-top.svg"
                  alt=""
                  width={1036}
                  height={168}
                  /* `h-auto` beside the aspect ratio: without it next/image
                     warns that one dimension was overridden and the other was
                     not, on every render of all twelve pages. */
                  className="absolute inset-x-0 top-0 aspect-[1036/168] h-auto w-full object-cover"
                />
              </div>

              <SectionHeading
                badge={{ icon: '/images/icons/badge/pricing.svg', label: L(UI.navPricing) }}
                title={L(SP_LABELS.drivers)}
                align="left"
                className="relative"
                textWidth={820}
              />
              <p className="relative max-w-[820px] text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]">
                {L(page.priceDrivers)}
              </p>
            </div>
          </section>

          {/* ---- RELATED WORK ---------------------------------------------- */}
          {related.length > 0 && (
            <section className="flex w-full max-w-[1080px] flex-col items-center gap-10 desktop:gap-[60px]">
              <SectionHeading title={L(SP_LABELS.related)} textWidth={780} />
              <div
                className={`grid w-full grid-cols-1 gap-[30px] ${
                  related.length > 1 ? 'tablet:grid-cols-2' : 'max-w-[560px]'
                }`}
              >
                {related.map((c, i) => {
                  const cp = CASE_PAGES.find((x) => x.match === tx(c.title, 'en'))
                  const Inner = (
                    <>
                      <Image
                        src="/images/backgrounds/feature-card.svg"
                        alt=""
                        fill
                        sizes="(min-width: 810px) 525px, 100vw"
                        className="rounded-panel object-cover"
                      />
                      <div className="relative flex w-full flex-col gap-3">
                        {/* The badge is its own row above the title, not a
                            right-aligned chip beside it. Two of these titles
                            are short enough to share a line and two are not, so
                            beside the title it sits inline on one card and drops
                            under the heading on the next one. */}
                        <span
                          className={`w-fit rounded-pill px-[10px] py-1 text-[14px] leading-[21px] ${
                            c.live ? 'bg-accent-100 text-ink-700' : 'bg-surface-muted text-ink-300'
                          }`}
                        >
                          {L(c.status)}
                        </span>
                        <h3 className="font-display text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
                          {L(c.title)}
                        </h3>
                        <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
                          {L(c.sub)}
                        </p>
                      </div>
                      <dl className="relative flex w-full flex-col gap-1 border-t border-line-soft pt-4">
                        <dt className="text-[15px] leading-[22.5px] text-ink-200">
                          {L(CASE_KEYS.res)}
                        </dt>
                        <dd className="text-[16px] leading-6 text-ink-500">{L(c.res)}</dd>
                      </dl>
                    </>
                  )
                  /* A Link CARRYING the same children, never an <article> nested
                     inside one: that would put a padded white card inside a
                     padded white card. The plain article stays as the fallback
                     for a join that does not resolve, which cannot happen today
                     but would otherwise fail silently if a title changed. */
                  return cp ? (
                    <Link
                      key={i}
                      href={casePath(lang, cp.slug)}
                      className="group relative flex flex-col items-start gap-5 overflow-hidden hairline rounded-panel p-6 shadow-[var(--shadow-ring)] transition-shadow duration-200 hover:shadow-[var(--shadow-ring-6)] tablet:p-[30px]"
                    >
                      {Inner}
                      <span className="relative mt-auto flex items-center gap-1 text-[16px] leading-6 font-semibold text-ink-600 transition-colors duration-200 group-hover:text-accent">
                        {L(UI.readCase)}
                        <Image
                          src="/images/icons/arrow-up-right.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="size-5"
                        />
                      </span>
                    </Link>
                  ) : (
                    <article
                      key={i}
                      className="relative flex flex-col items-start gap-5 overflow-hidden hairline rounded-panel p-6 shadow-[var(--shadow-ring)] tablet:p-[30px]"
                    >
                      {Inner}
                    </article>
                  )
                })}
              </div>
            </section>
          )}

          {/* ---- PAID SEPARATELY ------------------------------------------- */}
          {/* The same six as the home page, imported not restated. They were a
              flat definition list before; on the template they are the FAQ
              accordion, which is what six "what about X" rows want to be. */}
          <section className="flex w-full max-w-[900px] flex-col items-center gap-10 desktop:gap-[60px]">
            <SectionHeading
              title={L(SEPARATE_LABEL)}
              description={L(SEPARATE_SUB)}
              textWidth={780}
            />
            <Accordion
              variant="card"
              items={SEPARATE.map((x) => ({ title: L(x.k), body: L(x.d) }))}
            />
          </section>

          {/* ---- THE ESTIMATE ---------------------------------------------- */}
          {/* The calculator, seeded with this page's own service so step one
              arrives answered: asking what kind of work somebody wants directly
              under a heading naming that work is a question with one obvious
              answer. The heading pair is this page's, not the home page's. */}
          <Estimate
            lang={lang}
            seedType={page.key}
            title={SP_LABELS.estimate}
            description={SP_LABELS.estimateSub}
          />

          {/* ---- CLOSE ------------------------------------------------------ */}
          {/* The home page's closing panel, minus its icon plate: that plate
              renders the template's own mark, and one dark blue block at the end
              of the page is the shape, not the badge on it. Neither button
              prints an address; the handle rides along as the Telegram button's
              tooltip, which is what lets a reader see where they are going
              before they click. */}
          <section
            className="section-shell gap-[30px] overflow-hidden rounded-section border border-line px-6 py-12 tablet:px-12 tablet:py-16 desktop:px-20 desktop:py-[60px]"
            style={{
              backgroundImage:
                'linear-gradient(210.198deg, rgb(0, 101, 255) 0%, rgb(51, 132, 255) 69.6669%)',
            }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <Image
                src="/images/backgrounds/cta-dots.svg"
                alt=""
                fill
                sizes="(min-width: 1320px) 1200px, 100vw"
                className="object-cover"
              />
              <Image
                src="/images/backgrounds/cta-abstract-grid.svg"
                alt=""
                width={1187}
                height={130}
                className="absolute inset-x-[6.5px] bottom-0 w-[calc(100%-13px)]"
              />
            </div>

            <div className="relative flex w-full max-w-[740px] flex-col items-center justify-center gap-[10px] text-center">
              <h2 className="text-[30px] leading-[1.2] text-white tablet:text-[38px] desktop:text-[48px] desktop:leading-[57.6px]">
                {L(CONTACT.h)}
              </h2>
              <p className="text-[16px] leading-6 text-page tablet:text-[18px] tablet:leading-[27px]">
                {L(CONTACT.sub)}
              </p>
            </div>

            <div className="relative flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex" title={TELEGRAM_HANDLE}>
                <Button href={TELEGRAM} variant="secondary">
                  {L(UI.ctaTg)}
                </Button>
              </span>
              <Button href={mailHref} variant="muted">
                {L(UI.sendMailDirect)}
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * The hero.
 *
 * It echoes the home hero rather than repeating it: same grid behind it, same
 * display scale, same button, and then it splits. The home hero is centred and
 * ends on a badge over two buttons; this one is a left column that says what the
 * work is and who it is for, beside a card that says what it costs and offers
 * the one action worth taking from here. The single CTA lives inside that card,
 * where the figure it acts on already is.
 *
 * The backdrop is `page-grid.svg`, the template's own artwork for a standalone
 * page, and not `PageBackdrop`: that component loads two `.jpg` light rays that
 * were never copied into this repo, so it renders two failing optimiser requests
 * and no pixels. Same reason the home hero dropped its own ray layer.
 */
function ServiceHero({
  lang,
  page,
  name,
  work,
  home,
}: {
  lang: LabLang
  page: SP
  name: string
  work: (typeof WORK_TYPES)[number] | undefined
  home: string
}) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-4 pt-[122px] pb-[10px] tablet:px-10 tablet:pt-[140px] desktop:px-0 desktop:pt-[150px]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[180px] left-1/2 z-0 hidden h-[339px] w-[481px] -translate-x-1/2 desktop:block"
      >
        <Image
          src="/images/backgrounds/page-grid.svg"
          alt=""
          fill
          sizes="481px"
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full max-w-[1200px] flex-col gap-10 desktop:flex-row desktop:items-center desktop:gap-20">
        {/* ---- left: what it is, and who it is for ---- */}
        <div className="flex w-full flex-col items-start gap-6 desktop:flex-1">
          {/* Breadcrumb. Working SEO, so it survives the reskin unchanged in
              structure; only the type and the colours moved. */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[15px] leading-[22.5px] text-ink-250"
          >
            <Link href={home} className="transition-colors duration-200 hover:text-ink-700">
              {BRAND}
            </Link>
            <span aria-hidden="true" className="text-ink-100">
              /
            </span>
            <span className="text-ink-500">{name}</span>
          </nav>

          <div className="flex w-full flex-col items-start gap-4">
            <span className="flex items-center overflow-hidden rounded-pill bg-surface px-[14px] py-2 text-[16px] leading-6 text-ink-600 shadow-[var(--shadow-badge)]">
              {L(page.category)}
            </span>
            <h1 className="text-[36px] leading-[1.2] font-semibold text-ink-800 tablet:text-[48px] desktop:text-[56px] desktop:leading-[67.2px]">
              {name}
            </h1>
            <p className="max-w-[560px] text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]">
              {L(page.when[0])}
            </p>
          </div>
        </div>

        {/* ---- right: the offer ---- */}
        {work && (
          <div className="relative flex w-full shrink-0 flex-col overflow-hidden rounded-t-panel hairline rounded-b-[24px] p-[14px] shadow-[var(--shadow-ring)] desktop:w-[435px]">
            <Image
              src="/images/backgrounds/pricing-card.svg"
              alt=""
              fill
              sizes="435px"
              className="rounded-t-panel rounded-b-[24px] object-cover"
            />

            <div className="relative flex w-full flex-col gap-6 hairline [--hairline:var(--color-line-soft)] rounded-panel bg-surface p-6 shadow-[0_2px_6px_0_rgba(182,182,182,0.1)]">
              <div className="flex flex-col items-start gap-[2px]">
                <div className="flex flex-wrap items-baseline gap-[14px]">
                  <span className="font-display text-[22px] leading-[33px] text-ink-600">
                    {L(CALC.bfFrom)}
                  </span>
                  <span className="font-display text-[36px] leading-[45px] text-ink-900">
                    {money(priced(work.from))}
                  </span>
                </div>
              </div>

              {/* Timeline and support, read from the same table as the figure
                  above it. `dl` because these are label / value pairs and the
                  old page had them as one too. */}
              <dl className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4 border-t border-line-soft pt-3">
                  <dt className="text-[16px] leading-6 text-ink-300">{L(CALC.termLbl)}</dt>
                  <dd className="text-[16px] leading-6 font-semibold text-ink-700">
                    {work.weeks[0]}&ndash;{work.weeks[1]} {L(CALC.weeksShort)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-line-soft pt-3">
                  <dt className="text-[16px] leading-6 text-ink-300">{L(CALC.supportLbl)}</dt>
                  <dd className="text-[16px] leading-6 font-semibold text-ink-700">
                    {L(CALC.bfFrom)} {money(monthly(work.support))}
                    {L(CALC.perMonth)}
                  </dd>
                </div>
              </dl>

              <Button href="#estimate" className="w-full">
                {L(page.ctaLabel)}
              </Button>

              {/* The honest hedge that makes publishing a figure safe, and it
                  sits with the figure rather than three screens below it. */}
              <p className="text-[15px] leading-[22.5px] text-ink-250">{L(CALC.disclaimer)}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * The template's feature card with its position on the plate instead of a glyph.
 *
 * Same reasoning `CoreFeatures` wrote down for the home page: the only 66px
 * glyphs in this repo are the template's own feature set, whose meanings belong
 * to a course platform, and repeating one borrowed mark reads as a mistake. A
 * count is the one thing on this card that cannot be a claim.
 */
function PlateCard({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <article className="relative flex flex-col items-center justify-center gap-[30px] overflow-hidden hairline rounded-panel px-[30px] py-10 text-center shadow-[var(--shadow-ring)]">
      <Image
        src="/images/backgrounds/feature-card.svg"
        alt=""
        fill
        sizes="(min-width: 810px) 415px, 100vw"
        className="rounded-panel object-cover"
      />
      <div className="relative size-[66px] shrink-0">
        <Image
          src="/images/backgrounds/feature-icon-plate.svg"
          alt=""
          width={66}
          height={66}
          className="absolute inset-0 size-[66px] rounded-pill"
        />
        {/* aria-hidden: the position is the plate's decoration, and a screen
            reader announcing "02" before a sentence adds noise, not order. */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-display text-[22px] leading-none text-white"
        >
          {String(index).padStart(2, '0')}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 rounded-pill shadow-[0_6px_8px_0_rgba(131,124,124,0.06),inset_0_2px_2px_0_#81b1fb,inset_2px_0_2px_0_#81b1fb]"
        />
      </div>
      <p className="relative text-[16px] leading-6 text-ink-500 tablet:text-[18px] tablet:leading-[27px]">
        {children}
      </p>
    </article>
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
  when: { en: 'Two more signs this is you', ru: 'Ещё два признака, что это про вас' },
  first: { en: 'Here is what we build first', ru: 'Вот что соберём первым' },
  firstSub: {
    en: 'The first version is deliberately small, and complete enough to run on real data.',
    ru: 'Первая версия намеренно небольшая, но достаточно полная, чтобы работать на живых данных.',
  },
  drivers: { en: 'The expensive part is rarely obvious', ru: 'Дорого обычно не то, что кажется' },
  related: { en: 'We have built this, and it still runs', ru: 'Такое мы уже собирали, и оно работает' },
  estimate: { en: 'You can leave here with a figure', ru: 'Отсюда можно уйти с цифрой' },
  estimateSub: {
    en: 'The page you are on answers the first question. Four left, and you see the figure without telling us anything.',
    ru: 'На первый вопрос уже отвечает эта страница. Осталось четыре, и цифру вы увидите, ничего о себе не сообщая.',
  },
}
