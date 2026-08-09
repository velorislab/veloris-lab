import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  type LabLang, type LS, tx,
  CASES, SERVICES, CALC, UI, CONTACT,
  TELEGRAM, TELEGRAM_HANDLE, EMAIL, BRAND,
} from '@/site/labData'
import { WORK_TYPES, money, priced } from '@/site/labPricing'
import { CASE_PAGES, CP_LABELS, type CasePage as CP } from '@/site/casePages'
import { SERVICE_PAGES } from '@/site/servicePages'
import { localizedHref, servicePath, casePath } from '@/site/routing'

/**
 * One case page, in the template's visual language.
 *
 * WHAT THIS PAGE IS MADE OF. The template has no case study, so the page is
 * assembled from parts that already exist on the home page rather than from a
 * new set of surfaces:
 *
 *   hero          the standalone-page heading scale `SectionHeading` documents
 *                 (32/42/56, `as="h1"`), with the section badge's pill reused
 *                 for the eyebrow tokens and the status.
 *   difficulties  the numbered plate from `CoreFeatures`, laid on its side so
 *                 three long paragraphs read in a column instead of across it.
 *   sidebar       the stack on the white card + ring every feature card uses,
 *                 the estimate panel on the `WhoCanUse` wash.
 *   other cases   the same white card, with `WhatsIn`'s corner arrow.
 *   the close     `FinalCta`'s gradient panel and its two real channels.
 *
 * THREE THINGS THE OLD PAGE DID THAT THIS ONE STILL DOES, because each was
 * argued once and the reskin does not change the argument.
 *
 * NO PRICE IN THE HEADING. These are client projects whose price we cannot
 * publish, so a figure under the h1 would say that is what the case cost. The
 * one figure on the page is the PARENT SERVICE's floor, in the sidebar, labelled
 * "similar work for you" and read from the price table.
 *
 * NO INVENTED DIFFICULTIES. Two of the four cases have enough asserted material
 * for three real obstacles; the other two render no such section at all.
 *
 * NOTHING FROM THE OLD DESIGN. No `lab.css`, no `vl-` class, and no
 * `CopyEmail`: that button's only styling lived in the stylesheet this page no
 * longer loads, and the close already carries the two channels that reach us.
 */

/** "Breadcrumb", the landmark name. Chrome, not copy, so it has no home in labData. */
const CRUMB_LABEL: LS = { en: 'Breadcrumb', ru: 'Хлебные крошки' }

/**
 * The section badge's pill without its icon.
 *
 * `SectionBadge` itself needs a 24px glyph, and there is none for "browser
 * extension" or "client work" in this repo. Rather than borrow a badge glyph
 * whose meaning belongs to another section, the pill renders the word alone.
 */
function Token({ children }: { children: ReactNode }) {
  return (
    <span className="hairline flex w-fit items-center rounded-pill bg-surface-tint px-[10px] py-[6px] text-[15px] leading-[22.5px] text-ink-500 shadow-[0_2px_3px_0_rgba(182,182,182,0.1),0_0_0_3px_#ffffff] tablet:text-[17px] tablet:leading-[25.5px]">
      {children}
    </span>
  )
}

/**
 * The live badge. The dot is the changelog rail's `--color-marker`, which is
 * the one green in the token set and already means "this one is current".
 * A case that is not live keeps the pill and loses the dot: the word is the
 * claim, the dot only repeats it.
 */
function Status({ label, live }: { label: string; live: boolean }) {
  return (
    <span className="flex w-fit shrink-0 items-center gap-2 rounded-pill bg-surface px-[14px] py-[6px] text-[16px] leading-6 text-ink-600 shadow-[var(--shadow-badge)]">
      {live && (
        <span
          aria-hidden
          className="size-[9px] shrink-0 rounded-pill bg-marker shadow-[0_0_0_3px_rgba(96,229,25,0.2)]"
        />
      )}
      {label}
    </span>
  )
}

/** One prose block of the narrative column. */
function Block({ title, body }: { title: string; body: string }) {
  return (
    <section className="flex w-full flex-col items-start gap-3">
      <h2 className="font-display text-[22px] leading-[33px] text-ink-800 tablet:text-[26px] tablet:leading-[39px]">
        {title}
      </h2>
      <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
        {body}
      </p>
    </section>
  )
}

export default function CasePageBody({ lang, page }: { lang: LabLang; page: CP }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const c = CASES.find((x) => tx(x.title, 'en') === page.match)
  if (!c) return null

  const parent = SERVICES.find((s) => s.key === page.parentService)
  const parentWork = WORK_TYPES.find((w) => w.key === page.parentService)
  const others = CASE_PAGES.filter((p) => p.slug !== page.slug).slice(0, 3)
  const home = localizedHref(lang)
  /** Two tokens, "domain · kind". One token if a future entry carries one. */
  const tokens = L(page.eyebrow).split('·').map((t) => t.trim()).filter(Boolean)

  /* Prefilled exactly as the close on the home page does it, so a mail client
     never opens on an empty window. */
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    L(CONTACT.mailDirectSubject),
  )}&body=${encodeURIComponent(L(CONTACT.mailDirectBody))}`

  return (
    <>
      {/* `twin` is what sends the switcher to THIS case in the other language
          rather than to the home page. */}
      <Header lang={lang} twin={(to) => casePath(to, page.slug)} />

      {/* `page-main`'s widths and its 200/150/80 rhythm are written out here
          rather than borrowed: that utility is sized for a home page whose first
          child is a hero section of its own, and it puts only 80px above the
          fold on a phone, which is under the 94px fixed nav. An inner page whose
          first child IS the heading has to clear the pill itself. */}
      <main
        id="main-content"
        className="mx-auto flex w-full max-w-[450px] flex-col items-center gap-20 px-4 pt-[130px] pb-20 tablet:max-w-[800px] tablet:gap-[110px] tablet:px-[30px] tablet:pt-[150px] tablet:pb-24 desktop:w-[94%] desktop:max-w-[1380px] desktop:gap-[150px] desktop:px-0 desktop:pt-[190px] desktop:pb-[120px]"
      >
        {/* ------------------------------------------------------------ hero */}
        <section className="section-shell items-start gap-6 desktop:gap-8">
          <nav
            aria-label={L(CRUMB_LABEL)}
            className="flex w-full flex-wrap items-center gap-2 text-[15px] leading-[22.5px] text-ink-250"
          >
            <Link href={home} className="transition-colors duration-200 hover:text-ink-700">
              {BRAND}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-500">{L(c.title)}</span>
          </nav>

          <div className="flex w-full flex-col items-start gap-5">
            {tokens.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {tokens.map((t) => (
                  <Token key={t}>{t}</Token>
                ))}
              </div>
            )}

            {/* The heading scale SectionHeading documents for a standalone page
                hero, with the status riding beside it instead of under it. */}
            <div className="flex w-full flex-col items-start gap-4 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-8">
              <h1 className="max-w-[900px] text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] tablet:leading-[1.25] desktop:text-[56px] desktop:leading-[72.8px]">
                {L(c.title)}
              </h1>
              <Status label={L(c.status)} live={c.live} />
            </div>

            <p className="max-w-[780px] text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]">
              {L(c.sub)}
            </p>
          </div>

          {/* Only the links the case really has. Two of the four have none. */}
          {c.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {c.links.map((l) => (
                <Button
                  key={l.href}
                  href={l.href}
                  variant={l.primary ? 'primary' : 'muted'}
                  icon={
                    <Image
                      src="/images/icons/arrow-up-right.svg"
                      alt=""
                      width={20}
                      height={20}
                      aria-hidden
                      className="size-5"
                    />
                  }
                >
                  {l.label}
                </Button>
              ))}
            </div>
          )}
        </section>

        {/* ------------------------------------------------- body + sidebar */}
        <div className="section-shell flex-col items-start gap-12 desktop:flex-row desktop:gap-20">
          <div className="flex w-full flex-col items-start gap-10 desktop:flex-1 desktop:gap-[50px]">
            <Block title={L(CP_LABELS.task)} body={L(c.task)} />
            <Block title={L(CP_LABELS.audience)} body={L(page.audience)} />

            {/* Rendered only where labData already asserts enough to draw three
                real obstacles from. Two of the four cases have no such section. */}
            {page.difficulties && (
              <section className="flex w-full flex-col items-start gap-5">
                <h2 className="font-display text-[22px] leading-[33px] text-ink-800 tablet:text-[26px] tablet:leading-[39px]">
                  {L(CP_LABELS.difficulties)}
                </h2>
                <ol className="flex w-full flex-col gap-5">
                  {page.difficulties.map((d, i) => (
                    <li
                      key={tx(d.t, 'en')}
                      className="hairline relative flex w-full flex-col items-start gap-5 overflow-hidden rounded-panel px-6 py-6 shadow-[var(--shadow-ring)] tablet:flex-row tablet:items-start tablet:gap-6 tablet:px-8 tablet:py-7"
                    >
                      <Image
                        src="/images/backgrounds/feature-card.svg"
                        alt=""
                        fill
                        sizes="(min-width: 1320px) 760px, 100vw"
                        className="rounded-panel object-cover"
                      />
                      {/* The plate from the home page's feature cards. It
                          carries the position, which is the one thing on a card
                          like this that cannot be a claim. */}
                      <div className="relative size-[66px] shrink-0">
                        <Image
                          src="/images/backgrounds/feature-icon-plate.svg"
                          alt=""
                          width={66}
                          height={66}
                          className="absolute inset-0 size-[66px] rounded-pill"
                        />
                        <span
                          aria-hidden
                          className="absolute inset-0 flex items-center justify-center font-display text-[22px] leading-none text-white"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-pill shadow-[0_6px_8px_0_rgba(131,124,124,0.06),inset_0_2px_2px_0_#81b1fb,inset_2px_0_2px_0_#81b1fb]"
                        />
                      </div>
                      <div className="relative flex flex-col items-start gap-[6px]">
                        <h3 className="text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
                          {L(d.t)}
                        </h3>
                        <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
                          {L(d.d)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <Block title={L(CP_LABELS.did)} body={L(c.sol)} />
            <Block title={L(CP_LABELS.outcome)} body={L(c.res)} />
          </div>

          {/* The sidebar carries the only number on the page, and it belongs to
              the parent SERVICE, not to this case. */}
          <aside className="flex w-full flex-col gap-5 desktop:w-[380px] desktop:shrink-0">
            {c.tags.length > 0 && (
              <div className="hairline relative flex w-full flex-col items-start gap-4 rounded-panel bg-surface p-6 shadow-[var(--shadow-ring)] tablet:p-8">
                <h2 className="font-display text-[20px] leading-[30px] text-ink-800">
                  {L(CP_LABELS.stack)}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-pill bg-surface-subtle px-[14px] py-[6px] text-[15px] leading-[22.5px] text-ink-500"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {parent && parentWork && (
              /* The wash from the home page's "where to start" panel, drawn
                 rather than loaded; see the note on that section. */
              <div className="relative flex w-full flex-col items-start gap-5 overflow-hidden rounded-panel border border-line bg-linear-to-b from-[#ebf3f9] via-[#f2f8fc] to-[#fbfdfe] p-6 shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_5px_#ffffff] tablet:p-8">
                <span className="rounded-pill bg-surface px-[14px] py-[6px] text-[16px] leading-6 text-ink-700">
                  {L(CP_LABELS.similar)}
                </span>

                <div className="flex w-full flex-col items-start gap-1">
                  <h2 className="font-display text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
                    {L(parent.t)}
                  </h2>
                  {/* Read from the price table, never typed: repricing moves
                      labPricing and this line follows. */}
                  <p className="flex flex-wrap items-baseline gap-[6px] text-[16px] leading-6 text-ink-300">
                    {L(CALC.bfFrom)}
                    <span className="font-display text-[22px] leading-[33px] text-ink-800">
                      {money(priced(parentWork.from))}
                    </span>
                  </p>
                </div>

                <Button
                  href={`${servicePath(lang, serviceSlug(page.parentService))}#estimate`}
                  variant="muted"
                  className="h-[49.5px] px-4 py-3"
                >
                  {L(UI.ctaCalc)}
                </Button>

                <p className="text-[15px] leading-[22.5px] text-ink-250">
                  {L(CALC.disclaimer)}
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* ---------------------------------------------------- other cases */}
        {others.length > 0 && (
          <section className="section-shell items-start gap-10 desktop:gap-[60px]">
            <SectionHeading as="h2" align="left" title={L(CP_LABELS.other)} />
            <div className="grid w-full grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
              {others.map((o) => {
                const oc = CASES.find((x) => tx(x.title, 'en') === o.match)
                if (!oc) return null
                return (
                  <Link
                    key={o.slug}
                    href={casePath(lang, o.slug)}
                    className="group hairline relative flex h-full flex-col items-start gap-3 rounded-panel bg-surface p-6 shadow-[var(--shadow-ring)] transition-colors duration-200 hover:bg-surface-muted tablet:p-8"
                  >
                    <div className="flex w-full items-start justify-between gap-4">
                      <span className="text-[15px] leading-[22.5px] text-ink-250">
                        {L(o.eyebrow)}
                      </span>
                      <Image
                        src="/images/icons/arrow-diagonal.svg"
                        alt=""
                        width={25}
                        height={25}
                        aria-hidden
                        className="size-6 shrink-0 opacity-30 transition-opacity duration-200 group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
                      {L(oc.title)}
                    </h3>
                    <p className="text-[16px] leading-6 text-ink-300">{L(oc.sub)}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ----------------------------------------------------- the close */}
        {/* The home page's closing panel, on this case's own question. Its icon
            plate is not here: that plate holds the template's own mark, and a
            borrowed brand mark is not something to spread onto four more pages.
            The gradient, the two SVG decorations and the button pair are the
            part of that section that carries no claim. */}
        <section
          className="section-shell gap-8 overflow-hidden rounded-section border border-line px-6 py-12 tablet:gap-10 tablet:px-12 tablet:py-16 desktop:gap-[50px] desktop:px-20 desktop:py-[60px]"
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
              {L(page.cta)}
            </h2>
            <p className="text-[16px] leading-6 text-page tablet:text-[18px] tablet:leading-[27px]">
              {L(CONTACT.sub)}
            </p>
          </div>

          {/* The handle rides on the wrapper: `Button` has no `title` prop, and a
              tooltip on an ancestor still answers for the link inside it. */}
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
      </main>

      <Footer lang={lang} />
    </>
  )
}

/**
 * WORK_TYPES key to service-page slug.
 *
 * Read out of SERVICE_PAGES rather than written here. A second hand-kept map of
 * the same six pairs would go stale the first time a slug changed, and the only
 * symptom would be a case page linking to a 404.
 */
function serviceSlug(key: string): string {
  return SERVICE_PAGES.find((p) => p.key === key)?.slug ?? key
}
