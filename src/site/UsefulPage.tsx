import staticImageLoader from '../../image-loader'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

import {
  USEFUL, USEFUL_GROUPS, USEFUL_UI,
  USEFUL_COST_LABEL, USEFUL_RUNS_LABEL, USEFUL_CAUTION_LABEL,
  USEFUL_COST_ORDER, USEFUL_RUNS_ORDER, USEFUL_CAUTION_ORDER, USEFUL_BLOCK_WORD,
} from './useful'
import { UsefulExplorer, type ExplorerLabels } from './UsefulExplorer'
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

   THIS FILE IS NOW A SERVER COMPONENT THAT RESOLVES AND HANDS OFF, and the list
   itself lives in `UsefulExplorer`. The split is the locale rule: the explorer
   is `"use client"` because narrowing needs a browser, and a client component
   cannot be given `tx` or an `LS` pair to resolve later. So every string is
   resolved to the page's language here, on the server, and crosses the boundary
   as a plain string. Nothing about the list is client-only: all sixty-five cards
   and the index above them render in the HTML with no filter applied, which is
   what a reader with no JavaScript and every crawler gets.
   ========================================================================== */

export default function UsefulPage({ lang }: { lang: LabLang }) {
  const L = (v: LS) => tx(v, lang)

  /* Only the groups that carry something, counted rather than assumed. The
     lead says how many there are and must never be told: it is the same rule as
     the case grid's «Показать все N кейсов», and the same three Russian forms. */
  const liveGroups = USEFUL_GROUPS.filter((g) => USEFUL.some((t) => t.group === g.key))
  const indexLead = L(USEFUL_UI.indexLead)
    .replace('{n}', String(liveGroups.length))
    .replace('{w}', USEFUL_BLOCK_WORD[pluralForm(liveGroups.length)])

  /* Resolved once, here. The explorer receives strings and knows no locale. */
  const labels: ExplorerLabels = {
    indexTitle: L(USEFUL_UI.indexTitle),
    indexLead: indexLead,
    filters: L(USEFUL_UI.filters),
    searchPh: L(USEFUL_UI.searchPh),
    costLabel: L(USEFUL_UI.costLabel),
    runsLabel: L(USEFUL_UI.runsLabel),
    cautionLabel: L(USEFUL_UI.cautionLabel),
    any: L(USEFUL_UI.any),
    anyRuns: L(USEFUL_UI.anyRuns),
    reset: L(USEFUL_UI.reset),
    found: L(USEFUL_UI.found),
    nothing: L(USEFUL_UI.nothing),
    nothingHint: L(USEFUL_UI.nothingHint),
    tagsNote: L(USEFUL_UI.tagsNote),
    cost: Object.fromEntries(
      Object.entries(USEFUL_COST_LABEL).map(([k, v]) => [k, L(v)]),
    ),
    runs: Object.fromEntries(
      Object.entries(USEFUL_RUNS_LABEL).map(([k, v]) => [k, L(v)]),
    ),
    caution: Object.fromEntries(
      Object.entries(USEFUL_CAUTION_LABEL).map(([k, v]) => [k, L(v)]),
    ),
    costOrder: USEFUL_COST_ORDER,
    runsOrder: USEFUL_RUNS_ORDER,
    cautionOrder: USEFUL_CAUTION_ORDER,
  }

  /* Only the groups that have something in them, computed from the array rather
     than trusted: an empty block would otherwise print a heading and a lead over
     nothing, and its index entry would scroll to it. */
  const groups = liveGroups.map((g) => ({
    key: g.key,
    title: L(g.title),
    lead: L(g.lead),
  }))

  const tools = USEFUL.map((t) => ({
    key: t.key,
    group: t.group,
    url: t.url,
    /* THROUGH THE LOADER, ON THE SERVER, and this is the second time this exact
       bug has been written. The cards are `unoptimized` because nineteen of the
       marks are .ico and ten are .svg, which the default optimiser will not
       serve without `dangerouslyAllowSVG`; `unoptimized` bypasses the loader,
       and the loader is the only thing that prepends `basePath`. Left raw, all
       sixty-five icons 404 the moment Pages serves the site from a subpath.
       Resolved here rather than in the explorer so the rule stays on the server
       and the client is handed a finished URL. */
    icon: staticImageLoader({ src: t.icon, width: 28 }),
    name: t.name,
    price: L(t.price),
    what: L(t.what),
    cost: t.cost,
    runsWhere: t.runsWhere,
    cautions: t.cautions,
  }))

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

        <UsefulExplorer tools={tools} groups={groups} labels={labels} />
      </main>
      <Footer lang={lang} />
    </>
  )
}
