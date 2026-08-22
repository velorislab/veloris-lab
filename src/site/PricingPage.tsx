import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Estimate } from '@/components/sections/Estimate'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { FinalCta } from '@/components/sections/FinalCta'
import {
  type LabLang, tx,
  SERVICES, CALC, UI, FAQ, type FaqItem,
  SEPARATE, SEPARATE_LABEL, SEPARATE_SUB,
  TELEGRAM, TELEGRAM_HANDLE, BRAND,
} from '@/site/labData'
import { WORK_TYPES, DESIGN_STATES, SUPPORT_TIERS, ADDONS, money, priced, monthly, line } from '@/site/labPricing'
import { PRICING } from '@/site/pricingCopy'
import { SERVICE_PAGES } from '@/site/servicePages'
import { localizedHref, servicePath } from '@/site/routing'

/**
 * The price list, in the template's design.
 *
 * Three things make this page different from a table of numbers, and all three
 * survived the reskin unchanged, because none of them was a visual decision.
 *
 * THE QUALIFIER IS ABOVE THE FOLD. Every figure here is a floor, and a page
 * that prints nine of them before admitting that has already misled the reader.
 * It is the lede of the hero, not a footnote under the table.
 *
 * THE MULTIPLIERS ARE PUBLISHED. The readiness section prints the calculator's
 * own design additions, one per state, with a sentence each on why. Nobody
 * publishes the inside of their estimator, which is most of the reason to do
 * it: a reader who can reproduce the number stops wondering what it hides. The
 * framing is deliberate and load-bearing, though. These are inputs to an
 * estimate, not terms of a contract, and the copy says so in the same breath.
 *
 * NO NUMERAL IS TYPED IN THIS FILE. Every price, factor and week count is read
 * from labPricing.ts. A price list that restates its own source is a price list
 * that will disagree with the calculator sitting three sections below it.
 *
 * WHAT THE RESKIN CHANGED, beyond swapping `vl-` classes for the template's
 * tokens:
 *
 *   The chrome is the template's `Header` and `Footer`, and neither is handed a
 *   twin: the header is a client component and works the other locale's URL out
 *   of its own path with `routing.twinPath`, so the switcher lands on
 *   /ru/pricing rather than on the home page without this page saying anything.
 *
 *   The close is the site's own `FinalCta`, so the page ends on the same panel
 *   the home page does instead of a second, near-identical contact block. Its
 *   copy is CONTACT.h / CONTACT.sub either way; what the pricing page loses is
 *   the click-to-copy address chip, which that section has no slot for and
 *   which the "write by email" button already covers.
 *
 *   The calculator is not here. `#estimate` is a heading and an empty section,
 *   waiting for the ported component to mount into it.
 */

/* `BADGE`, the path to the eyebrow glyphs, went with the eyebrows. The files
   are still in `public/images/icons/badge/` and nothing reads them. */

/**
 * The table's own responsive contract, written once here because six rows and
 * four cells each would otherwise repeat it twenty-four times.
 *
 * At 760px and up this is a real `<table>`: it IS tabular data, and pretending
 * otherwise costs screen-reader users the column headers. Below 760px the
 * header row is hidden, every row becomes a card and every cell prints its own
 * column name from a real `<span>` rather than a `::before`, so the label is
 * text a screen reader reads rather than decoration it may skip.
 *
 * `table-fixed` on the table is what keeps this honest between 760 and 810px:
 * the template's `page-main` caps its column at 450px until the tablet
 * breakpoint, and an auto table in that width overflows the page rather than
 * wrapping inside it.
 */
function Cell({
  label,
  strong = false,
  children,
}: {
  label: string
  /** The money column, set in the display face like every figure on the page. */
  strong?: boolean
  children: ReactNode
}) {
  return (
    <td
      className={`px-4 py-[18px] align-top desktop:px-6 max-[759px]:flex max-[759px]:items-baseline max-[759px]:justify-between max-[759px]:gap-4 max-[759px]:p-0 ${
        strong
          ? 'font-display text-[17px] leading-[25.5px] text-ink-800'
          : 'text-[16px] leading-6 text-ink-400'
      }`}
    >
      <span className="font-sans text-[16px] leading-6 text-ink-250 min-[760px]:hidden">
        {label}
      </span>
      <span>{children}</span>
    </td>
  )
}

export default function PricingPageBody({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const home = localizedHref(lang)
  const slugFor = (key: string) => SERVICE_PAGES.find((p) => p.key === key)?.slug

  const headCell =
    'px-4 py-4 text-left text-[15px] leading-[22.5px] font-medium text-ink-250 desktop:px-6'

  return (
    <>
      <Header lang={lang} />

      <main id="main-content" className="page-main">
        {/* ---------------------------------------------------------- hero */}
        {/* NO SECTION BADGE. The breadcrumb one line above already says
            "Pricing", and an eyebrow that repeats the crumb is decoration.
            Every other badge on this page is an existing `EYEBROW` word; the
            add-ons and the "billed separately" sections have none because
            `EYEBROW` has no word for them and inventing one is inventing copy.

            `pt-10` BELOW THE TABLET BREAKPOINT, and nothing above it. The nav
            bar is `fixed` and 72px tall while `page-main` opens on 80px of
            padding on phones, so without this the breadcrumb renders 8px under
            it. 40 is not a taste call: 80 + 40 is the same 120px every other
            inner page now opens on, and it replaced a `pt-16` that made this
            the roomiest of four different answers. The home page never hit this
            because its hero sits outside `page-main` and holds its own top
            padding; the 150px and 200px this shell uses higher up already clear
            the bar on their own. */}
        <section className="section-shell gap-6 pt-10 tablet:pt-0">
          <nav
            aria-label="Breadcrumb"
            className="flex w-full flex-wrap items-center justify-center gap-2 text-[16px] leading-6"
          >
            <Link
              href={home}
              className="text-ink-250 transition-colors duration-200 hover:text-ink-700"
            >
              {BRAND}
            </Link>
            <span aria-hidden="true" className="text-ink-50">
              /
            </span>
            <span className="text-ink-500">{L(UI.navPricing)}</span>
          </nav>

          <SectionHeading
            as="h1"
            title={L(PRICING.h1)}
            description={L(PRICING.lead)}
            textWidth={860}
          />

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button href="#estimate">{L(UI.ctaCalc)}</Button>
            {/* The handle rides on the wrapper, as in `FinalCta`: `Button` has
                no `title` prop, and a tooltip on an ancestor still answers for
                the link inside it. */}
            <span className="inline-flex" title={TELEGRAM_HANDLE}>
              <Button href={TELEGRAM} variant="muted">
                {L(UI.ctaTg)}
              </Button>
            </span>
          </div>
        </section>

        {/* ----------------------------------------------------- the six */}
        <section className="section-shell gap-10 desktop:gap-[60px]">
          <SectionHeading
            title={L(PRICING.tableLabel)}
            description={L(PRICING.tableSub)}
            textWidth={860}
          />

          <div className="w-full min-[760px]:overflow-hidden min-[760px]:rounded-panel min-[760px]:bg-surface min-[760px]:shadow-[0_0_0_1px_var(--color-line),0_2px_6px_0_rgba(182,182,182,0.1)]">
            <table className="w-full border-collapse text-left min-[760px]:table-fixed">
              <caption className="sr-only">{L(PRICING.tableLabel)}</caption>
              <thead className="max-[759px]:hidden">
                {/* The header band is `bg-page` on a `bg-surface` panel, which
                    is the same two-surface contrast the template's own pricing
                    table uses to separate headers from rows. */}
                <tr className="border-b border-line bg-page">
                  <th scope="col" className={`w-[40%] ${headCell}`}>
                    {L(PRICING.colWork)}
                  </th>
                  <th scope="col" className={`w-[16%] ${headCell}`}>
                    {L(PRICING.colFrom)}
                  </th>
                  <th scope="col" className={`w-[20%] ${headCell}`}>
                    {L(PRICING.colTerm)}
                  </th>
                  <th scope="col" className={`w-[24%] ${headCell}`}>
                    {L(PRICING.colSupport)}
                  </th>
                </tr>
              </thead>
              <tbody className="max-[759px]:flex max-[759px]:flex-col max-[759px]:gap-4">
                {WORK_TYPES.map((w) => {
                  const svc = SERVICES.find((s) => s.key === w.key)
                  const slug = slugFor(w.key)
                  const name = L(svc?.t ?? w.label)
                  return (
                    <tr
                      key={w.key}
                      className="border-t border-line-soft first:border-t-0 max-[759px]:flex max-[759px]:flex-col max-[759px]:gap-3 max-[759px]:rounded-card max-[759px]:border-0 max-[759px]:bg-surface max-[759px]:p-5 max-[759px]:shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)]"
                    >
                      <th
                        scope="row"
                        className="px-4 py-[18px] text-left align-top font-display text-[17px] leading-[25.5px] font-medium text-ink-800 desktop:px-6 max-[759px]:p-0 max-[759px]:text-[20px] max-[759px]:leading-[30px]"
                      >
                        {slug ? (
                          <Link
                            href={servicePath(lang, slug)}
                            className="transition-colors duration-200 hover:text-accent"
                          >
                            {name}
                          </Link>
                        ) : (
                          name
                        )}
                      </th>
                      <Cell label={L(PRICING.colFrom)} strong>
                        {money(priced(w.from))}
                      </Cell>
                      <Cell label={L(PRICING.colTerm)}>
                        {w.weeks[0]}–{w.weeks[1]} {L(CALC.weeksShort)}
                      </Cell>
                      <Cell label={L(PRICING.colSupport)}>
                        {L(CALC.bfFrom)} {money(monthly(w.support))}
                        {L(CALC.perMonth)}
                      </Cell>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ----------------------------------- what changes the number */}
        {/* The estimator, opened up. The plate carries the factor, which is the
            one thing on this card that is not a claim but an input the reader
            can apply themselves. It is NOT aria-hidden the way the numbered
            plate on the home page is: there the digit is decoration, here the
            figure is the content. */}
        <section className="flex w-full max-w-[1080px] flex-col items-center gap-10 desktop:gap-20">
          <SectionHeading
            title={L(PRICING.readyLabel)}
            description={L(PRICING.readySub)}
            textWidth={800}
          />
          <ol className="flex w-full flex-wrap justify-center gap-[30px]">
            {DESIGN_STATES.map((r) => (
              <li
                key={r.key}
                className="relative flex flex-col items-center gap-[30px] overflow-hidden hairline rounded-panel px-[30px] py-10 text-center shadow-[var(--shadow-ring)] tablet:w-[calc((100%-30px)/2)] desktop:w-[calc((100%-60px)/3)]"
              >
                <Image
                  src="/images/backgrounds/feature-card.svg"
                  alt=""
                  fill
                  sizes="(min-width: 1320px) 340px, (min-width: 810px) 50vw, 100vw"
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
                  {/* The largest this state ever adds, read across every work
                      type rather than typed. On `ready` that maximum is zero on
                      all fifteen, so the plate says $0 and means it. */}
                  <span className="absolute inset-0 flex items-center justify-center font-display text-[18px] leading-none text-white">
                    +{money(line(Math.max(...WORK_TYPES.map((w) => w.design[r.key]))))}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-pill shadow-[0_6px_8px_0_rgba(131,124,124,0.06),inset_0_2px_2px_0_#81b1fb,inset_2px_0_2px_0_#81b1fb]"
                  />
                </div>
                <div className="relative flex flex-col items-center gap-[6px]">
                  <h3 className="text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
                    {L(r.label)}
                  </h3>
                  <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
                    {L(PRICING.readyWhy[r.key])}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- add-ons */}
        {/* Additive, which the FAQ below says out loud. No badge: `EYEBROW` has
            no word for this and the two closing fine-print sections read as a
            pair without one. Inventing an eyebrow is inventing copy. */}
        <section className="section-shell gap-10 desktop:gap-[60px]">
          <SectionHeading
            title={L(PRICING.addonsLabel)}
            description={L(PRICING.addonsSub)}
            textWidth={860}
          />
          <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-3">
            {ADDONS.map((a) => (
              <li
                key={a.key}
                className="flex items-center justify-between gap-4 rounded-card bg-surface px-5 py-4 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)]"
              >
                <span className="text-[16px] leading-6 text-ink-500">{L(a.label)}</span>
                <span className="shrink-0 font-display text-[18px] leading-[27px] text-ink-800">
                  +{money(line(a.add))}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------- support ladder */}
        {/* Four tiers, and the price follows what has to be watched rather than
            what the project cost. NO NUMERAL IS TYPED: every figure comes from
            SUPPORT_TIERS through `monthly()`, the same rounding the calculator
            uses, so the ladder can never drift from the estimate beside it. */}
        <section className="section-shell gap-10 desktop:gap-[60px]">
          <SectionHeading
            title={L(PRICING.supportLadderLabel)}
            description={L(PRICING.supportLadderSub)}
            textWidth={860}
          />
          <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-4">
            {SUPPORT_TIERS.map((t) => (
              <li
                key={t.key}
                className="flex flex-col gap-4 rounded-panel bg-surface p-6 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)]"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-[20px] leading-[30px] text-ink-800">{L(t.label)}</h3>
                  <p className="flex items-baseline gap-1">
                    <span className="font-display text-[28px] leading-none font-semibold text-ink-900">
                      {money(monthly(t.perMonth))}
                    </span>
                    <span className="text-[15px] text-ink-200">{L(CALC.perMonth)}</span>
                  </p>
                </div>
                {/* Who it is for, before what is in it. A reader comparing four
                    columns is answering «which one is mine» first, and that
                    question has its own line rather than a place in the list. */}
                <p className="text-[15px] leading-6 text-ink-600">{L(t.who)}</p>
                <ul className="flex flex-col gap-2 border-t border-line-soft pt-4">
                  {t.includes.map((line, i) => (
                    <li key={i} className="text-[15px] leading-6 text-ink-400">{L(line)}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------ paid separately */}
        {/* The same six as everywhere else, imported rather than restated. */}
        <section className="section-shell gap-10 desktop:gap-[60px]">
          <SectionHeading
            title={L(SEPARATE_LABEL)}
            description={L(SEPARATE_SUB)}
            textWidth={860}
          />
          <dl className="grid w-full grid-cols-1 gap-x-[30px] gap-y-8 tablet:grid-cols-2">
            {SEPARATE.map((x, i) => (
              <div key={i} className="flex flex-col gap-2 border-t border-line pt-5">
                <dt className="font-display text-[20px] leading-[30px] text-ink-800">
                  {L(x.k)}
                </dt>
                <dd className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
                  {L(x.d)}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------- the calculator */}
        {/* Deliberately empty. The calculator is being ported to the template's
            design separately and mounts under this heading; the id, the heading
            and the lede are here so the hero button, `ANCHORS.estimate` and
            `content.ts` all have somewhere real to land the moment it does.
            Unseeded on purpose: this page never assumed a service.

            `scroll-mt` is not decoration: the nav is `fixed` and 94px tall, so
            without it the jump parks this section's heading underneath the pill.
            Same 120px the service page's `#estimate` uses, so the two inner
            pages land their one anchor identically. */}
        <Estimate
          lang={lang}
          title={PRICING.estimateLabel}
          description={PRICING.estimateSub}
        />

        {/* ------------------------------------------------------------ faq */}
        <section className="flex w-full max-w-[796px] flex-col items-center gap-10 desktop:gap-20">
          <div className="flex w-full flex-col items-center gap-4">
            <h2 className="text-center text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
              {L(PRICING_FAQ_LABEL)}
            </h2>
          </div>
          <Accordion
            variant="card"
            defaultOpen={-1}
            items={pricingFaq().map((f) => ({ title: L(f.q), body: L(f.a) }))}
          />
        </section>

        {/* ---------------------------------------------------------- close */}
        <FinalCta lang={lang} />
      </main>

      <Footer lang={lang} />
    </>
  )
}

const PRICING_FAQ_LABEL = {
  en: 'Questions about the money',
  ru: 'Вопросы про деньги',
}

/**
 * The questions this page should answer, in reading order.
 *
 * Some are written for this page and some are lifted by reference from the home
 * page's list, never by copy: a shared question says the same thing in both
 * places because it IS the same object.
 *
 * PICKED BY QUESTION, NOT BY POSITION, and that is a repair. It used to read
 * `FAQ[0][2]`, `FAQ[0][1]` and `FAQ[1][4]`, so the home list could not be
 * reordered or resized without silently repointing this page at whatever landed
 * on those indices. It could not even be shortened: trimming that list to one
 * row of five made `FAQ[1]` undefined and the build failed on this page rather
 * than on the file that changed. The same rule the case pages already follow,
 * where the join is a title and not an index.
 *
 * Home's "How much will it cost?" is deliberately not among them. Its answer
 * points at the calculator, and on a page that is nothing but prices the whole
 * document is the answer; reprinting it would be a question answered twice.
 *
 * Every reused item was checked for direction words: a phrase like "the grid
 * above" is true on the home page and false here. This comment exists so the
 * next person picking items checks the same thing.
 */
function fromHome(question: string): FaqItem | undefined {
  return FAQ.flat().find((f) => tx(f.q, 'en') === question)
}

function pricingFaq(): FaqItem[] {
  return [
    PRICING_OWN_FAQ[0],
    fromHome('Who exactly does the work?'),
    PRICING_OWN_FAQ[1],
    fromHome('Do we need a finished spec?'),
    fromHome('How do we start?'),
    /* A question that has been renamed on the home page drops out of this list
       rather than taking the build down with it. */
  ].filter((f): f is FaqItem => Boolean(f))
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
    q: { en: 'Does anything here get multiplied?', ru: 'Здесь что-нибудь умножается?' },
    a: {
      en: 'No. Every line is an addition: the floor for the kind of work, then finishing the design, then a server if that kind of work does not already need one, then each feature, then a bump if what you described is a heavier product. The calculator shows each line separately, so the total is arithmetic you can check rather than a figure you have to accept.',
      ru: 'Нет. Каждая строка это слагаемое: нижняя граница по типу работы, потом доделка дизайна, потом сервер, если этот тип работы его ещё не требует, потом каждая функция, потом надбавка, если описанный продукт тяжелее обычного. Калькулятор показывает каждую строку отдельно, поэтому итог это арифметика, которую можно проверить, а не цифра, которую надо принять.',
    },
  },
]
