import Image from 'next/image'

import staticImageLoader from '../../image-loader'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

import {
  USEFUL, USEFUL_GROUPS, USEFUL_UI, USEFUL_BLOCK_WORD, USEFUL_CAUTION_ORDER,
  USEFUL_COST_LABEL, USEFUL_RUNS_LABEL, USEFUL_CAUTION_LABEL,
  type UsefulTool,
} from './useful'
import { UI, tx, pluralForm, type LabLang, type LS } from './labData'

/* =============================================================================
   Useful things.

   A LINK LIST IS WORTHLESS AND THIS IS NOT ONE, which is the whole design of the
   page. Anybody can paste forty URLs. What takes an afternoon and is what a
   reader actually wants is the line under each one saying what it charges, and
   the line after that saying what the condition is. Both of those are on every
   card here, and neither was copied from anywhere: each site was opened and read.

   THE CARDS ARE CARDS, and that is not a contradiction of the solution pages
   going the other way. A directory is a set of genuinely comparable items that a
   reader scans across rather than reads down, which is the one shape a card is
   for. The grammar is otherwise the site's: one heading size, left-aligned, the
   same hairline ring, and no shadow.

   THE ICON IS THE SITE'S OWN MARK, copied into `public/images/useful` once. It
   is doing a real job rather than decorating: in a grid of nine, the mark is
   what a reader recognises before they have read a word, and a directory without
   marks is a wall of identical rectangles.

   TWO THINGS ORIENT THE READER AND NEITHER IS A CONTROL.

   The index at the top, because sixty-five cards in twelve blocks is a very long
   page and it used to open straight into the first of them with no way to learn
   the other eleven existed. The leads it prints were already written and already
   good; what was wrong was that they sat on top of sections nobody scrolled to.

   The tags at the foot of each card, because the fact that decides a tool was
   prose, and prose is invisible until it is read. They are the card's own third
   sentence in three words.

   A FILTER STOOD BETWEEN THOSE TWO AND IS GONE, at the founder's call. It worked
   and it is not missed: nineteen chips over three axes turned the top of a
   reading page into a control panel, and the two things above answer the
   question it was answering without asking anybody to operate anything. The
   facets it filtered on are still in `useful.ts` and still on every card, so
   bringing it back is markup rather than data.

   Its removal is also why this file is a plain server component again. The split
   into a `"use client"` explorer existed only because narrowing needs a browser;
   with nothing to narrow there is no boundary to cross, no `LS` pair to resolve
   early and no props to invent. The page is HTML again.
   ========================================================================== */

/** A fact from the card's own text, at the foot of the card. Cautions are
 *  tinted and the two neutral facts are not: a wall of identical grey tags
 *  would hide the one that matters. */
function Tag({ tone, children }: { tone: 'plain' | 'warn'; children: string }) {
  return (
    <span
      className={
        'rounded-pill px-[9px] py-[3px] text-[12px] leading-[18px] whitespace-nowrap ' +
        (tone === 'warn' ? 'bg-accent/10 text-accent' : 'bg-surface-muted text-ink-250')
      }
    >
      {children}
    </span>
  )
}

export default function UsefulPage({ lang }: { lang: LabLang }) {
  const L = (v: LS) => tx(v, lang)

  /* Only the groups that carry something, counted rather than assumed. The lead
     says how many there are and must never be told: same rule as the case grid's
     «Показать все N кейсов», and the same three Russian forms. */
  const liveGroups = USEFUL_GROUPS.filter((g) => USEFUL.some((t) => t.group === g.key))
  const indexLead = L(USEFUL_UI.indexLead)
    .replace('{n}', String(liveGroups.length))
    .replace('{w}', USEFUL_BLOCK_WORD[pluralForm(liveGroups.length)])

  /* Sorted by the shared order rather than by however the entry happened to
     list them, so the same two flags land in the same order on every card and a
     row of them reads as a column. */
  const cautionsOf = (t: UsefulTool) =>
    USEFUL_CAUTION_ORDER.filter((f) => t.cautions.includes(f))

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="page-main">
        <section className="section-shell gap-8 pt-10 tablet:pt-4">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-5 text-center">
            <h1 className="text-[34px] leading-[1.15] font-semibold text-ink-900 tablet:text-[44px] desktop:text-[56px] desktop:leading-[1.15]">
              {L(UI.usefulLabel)}
            </h1>
            <p className="max-w-[820px] text-[17px] leading-[28px] text-ink-400 tablet:text-[19px] tablet:leading-[30px]">
              {L(UI.usefulSub)}
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ index */}
        <section className="section-shell gap-6">
          <div className="flex w-full max-w-[1180px] flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-[26px] leading-[1.2] text-ink-900 tablet:text-[30px]">
                {L(USEFUL_UI.indexTitle)}
              </h2>
              <p className="max-w-[780px] text-[16px] leading-[26px] text-ink-300">{indexLead}</p>
            </div>

            <ul className="grid grid-cols-1 gap-[10px] tablet:grid-cols-2 desktop:grid-cols-3">
              {liveGroups.map((g) => (
                <li key={g.key}>
                  <a
                    href={`#useful-${g.key}`}
                    className="flex h-full flex-col gap-1 rounded-card bg-surface p-4 shadow-[0_0_0_1px_var(--color-line-soft)] transition-colors duration-200 hover:bg-surface-muted"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[17px] leading-7 text-ink-900">{L(g.title)}</span>
                      {/* Counted here, never typed. */}
                      <span className="font-numeric text-[14px] leading-6 text-ink-200">
                        {USEFUL.filter((t) => t.group === g.key).length}
                      </span>
                    </span>
                    <span className="line-clamp-2 text-[14px] leading-[21px] text-ink-300">
                      {L(g.lead)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ cards */}
        {liveGroups.map((g) => {
          const inGroup = USEFUL.filter((t) => t.group === g.key)
          return (
            <section
              key={g.key}
              id={`useful-${g.key}`}
              /* Clears the fixed bar, or the jump from the index above parks the
                 heading underneath it. */
              className="section-shell scroll-mt-[120px] gap-6"
            >
              <div className="flex w-full max-w-[1180px] flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h2 className="text-[26px] leading-[1.2] text-ink-900 tablet:text-[30px]">
                    {L(g.title)}
                  </h2>
                  <p className="max-w-[780px] text-[16px] leading-[26px] text-ink-300">
                    {L(g.lead)}
                  </p>
                </div>

                <ul className="grid grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-3">
                  {inGroup.map((t) => (
                    <li key={t.key} className="h-full">
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full flex-col gap-4 rounded-card bg-surface p-5 shadow-[0_0_0_1px_var(--color-line-soft)] transition-colors duration-200 hover:bg-surface-muted"
                      >
                        {/* Mark, name, and the price in the corner. The price is
                            the first thing scanned and the last thing that needs
                            a heading over it: four words up here let a reader
                            compare a whole grid without reading one card.

                            THE ROW WRAPS, AND THE NAME HAS A FLOOR. It did not,
                            and the price is not always four words: fifteen of
                            the entries carry a whole clause there. The pill was
                            `shrink-0` and the name was `min-w-0`, so every one
                            of those names was squeezed to between 0 and 16px and
                            spelled itself down the card one letter per line. */}
                        <span className="flex flex-wrap items-start gap-x-3 gap-y-2">
                          {/* Unoptimised: nineteen of these marks are .ico and
                              ten are .svg, and the default optimiser refuses SVG
                              without `dangerouslyAllowSVG`, which is not a flag
                              to turn on for files fetched from other people's
                              domains. And therefore through the loader by hand:
                              `unoptimized` bypasses it, and it is the one thing
                              that prepends `basePath`. Left raw, all sixty-five
                              404 the moment Pages serves this from a subpath. */}
                          <Image
                            src={staticImageLoader({ src: t.icon, width: 28 })}
                            alt=""
                            width={28}
                            height={28}
                            unoptimized
                            className="mt-[2px] h-7 w-7 shrink-0 rounded-[6px] object-contain"
                          />
                          <span className="min-w-[7rem] flex-1 text-[17px] leading-7 text-ink-900">
                            {t.name}
                          </span>
                          <span className="font-numeric ml-auto shrink-0 rounded-pill bg-surface-tint px-3 py-1 text-right text-[13px] leading-5 text-ink-700">
                            {L(t.price)}
                          </span>
                        </span>

                        {/* One block of prose, always the same three sentences.
                            The labelled Cost and Worth-knowing blocks that used
                            to sit here made every card a small form to fill in
                            with the eye; the facts they carried are inside the
                            description now, which is where they read. */}
                        <span className="text-[15px] leading-[24px] text-ink-500">{L(t.what)}</span>

                        {/* And the same facts again as three words, because the
                            sentence above is invisible until it is read and a
                            reader scanning a grid of nine is not reading yet.
                            `mt-auto` holds them on the bottom edge so a row of
                            cards has one rail rather than three. */}
                        <span className="mt-auto flex flex-wrap items-center gap-[6px]">
                          <Tag tone="plain">{L(USEFUL_COST_LABEL[t.cost])}</Tag>
                          <Tag tone="plain">{L(USEFUL_RUNS_LABEL[t.runsWhere])}</Tag>
                          {cautionsOf(t).map((f) => (
                            <Tag key={f} tone="warn">
                              {L(USEFUL_CAUTION_LABEL[f])}
                            </Tag>
                          ))}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}
      </main>
      <Footer lang={lang} />
    </>
  )
}
