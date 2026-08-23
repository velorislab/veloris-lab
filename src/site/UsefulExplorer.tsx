'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

import type { UsefulCaution, UsefulCost, UsefulRuns } from './useful'

/* =============================================================================
   The explorer over the tool list.

   WHY THIS IS A CLIENT COMPONENT AND THE PAGE AROUND IT IS NOT. Everything here
   renders on the server first, with no filter applied, so all sixty-five cards
   are in the HTML: a reader with no JavaScript gets the whole list and the index
   above it, and a crawler gets every description. What the client adds is the
   narrowing, and narrowing is the only part that needs a browser.

   IT RECEIVES STRINGS, NOT A LOCALE. Every `LS` pair is resolved by the server
   component that renders this, so nothing here imports `tx` and nothing is
   passed a function. That is the rule the header learned the hard way.

   THE INDEX IS THE POINT, and the filter is the second thing. The page is
   twenty-six thousand pixels of cards on a phone, and until now it opened
   straight into the first of twelve blocks with no way to see that the other
   eleven existed. What a reader wants first is not a filter, it is the list of
   what is here and what each part is for, which the group leads already said
   perfectly well at the bottom of a scroll nobody reached.
   ========================================================================== */

export interface ExplorerTool {
  key: string
  group: string
  url: string
  icon: string
  name: string
  price: string
  what: string
  cost: UsefulCost
  runsWhere: UsefulRuns
  cautions: UsefulCaution[]
}

export interface ExplorerGroup {
  key: string
  title: string
  lead: string
}

export interface ExplorerLabels {
  indexTitle: string
  indexLead: string
  filters: string
  searchPh: string
  costLabel: string
  runsLabel: string
  cautionLabel: string
  any: string
  anyRuns: string
  reset: string
  found: string
  nothing: string
  nothingHint: string
  tagsNote: string
  cost: Record<string, string>
  runs: Record<string, string>
  caution: Record<string, string>
  costOrder: UsefulCost[]
  runsOrder: UsefulRuns[]
  cautionOrder: UsefulCaution[]
}

/** One filter chip. The same shape for all three axes, so a row of them reads
 *  as one control rather than as three that happen to sit together. */
function Chip({
  on,
  count,
  onPick,
  children,
}: {
  on: boolean
  count?: number
  onPick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={on}
      /* 40px tall rather than the 32 a chip wants to be, because this row is
         read with a thumb on the width it matters at. */
      className={
        'flex min-h-[40px] items-center gap-[6px] rounded-pill border px-[14px] text-[15px] leading-6 transition-colors duration-200 ' +
        (on
          ? 'border-accent bg-accent text-white'
          : 'border-line bg-surface text-ink-500 hover:bg-surface-muted')
      }
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className={on ? 'font-numeric text-white/70' : 'font-numeric text-ink-100'}>
          {count}
        </span>
      )}
    </button>
  )
}

/** A facet as it appears on a card. Cautions are tinted, the two neutral facts
 *  are not: a wall of identical grey tags would hide the one that matters. */
function Tag({ tone, children }: { tone: 'plain' | 'warn'; children: string }) {
  return (
    <span
      className={
        'rounded-pill px-[9px] py-[3px] text-[12px] leading-[18px] whitespace-nowrap ' +
        (tone === 'warn'
          ? 'bg-accent/10 text-accent'
          : 'bg-surface-muted text-ink-250')
      }
    >
      {children}
    </span>
  )
}

export function UsefulExplorer({
  tools,
  groups,
  labels,
}: {
  tools: ExplorerTool[]
  groups: ExplorerGroup[]
  labels: ExplorerLabels
}) {
  const [query, setQuery] = useState('')
  const [cost, setCost] = useState<UsefulCost | null>(null)
  const [runs, setRuns] = useState<UsefulRuns | null>(null)
  const [cautions, setCautions] = useState<UsefulCaution[]>([])
  const [open, setOpen] = useState(false)

  const activeCount = (cost ? 1 : 0) + (runs ? 1 : 0) + cautions.length + (query.trim() ? 1 : 0)

  /* Counted off the full list rather than off the filtered one, so a chip's
     number does not change as you narrow. A count that moves while you read it
     is telling you about the filter you already applied, not about the one you
     are considering. */
  const totals = useMemo(() => {
    const c: Record<string, number> = {}
    const r: Record<string, number> = {}
    const w: Record<string, number> = {}
    for (const t of tools) {
      c[t.cost] = (c[t.cost] ?? 0) + 1
      r[t.runsWhere] = (r[t.runsWhere] ?? 0) + 1
      for (const f of t.cautions) w[f] = (w[f] ?? 0) + 1
    }
    return { c, r, w }
  }, [tools])

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tools.filter((t) => {
      if (cost && t.cost !== cost) return false
      if (runs && t.runsWhere !== runs) return false
      /* Every selected caution has to be present, not any of them. Picking two
         is a narrower question than picking one, which is what a reader means
         by ticking a second box. */
      if (cautions.length && !cautions.every((f) => t.cautions.includes(f))) return false
      if (q && !t.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [tools, query, cost, runs, cautions])

  const shown = useMemo(() => new Set(matches.map((t) => t.key)), [matches])

  const toggleCaution = (f: UsefulCaution) =>
    setCautions((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))

  const reset = () => {
    setQuery('')
    setCost(null)
    setRuns(null)
    setCautions([])
  }

  const perGroup = (g: string) => matches.filter((t) => t.group === g).length

  return (
    <>
      {/* ---------------------------------------------------- index + filter */}
      {/* ONE SECTION, NOT TWO, and the reason is `page-main`'s gap. It puts
          200px between its children on a desktop and 80 on a phone, which is
          the rhythm between one part of the page and the next. The map and the
          control that narrows it are not two parts of the page, they are one
          thing with two halves, and 200px of air through the middle of it read
          as the filter belonging to the cards below rather than to the index
          above. Inside one section they get the 40px they should have. */}
      <section className="section-shell gap-10">
        <div className="flex w-full max-w-[1180px] flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-[26px] leading-[1.2] text-ink-900 tablet:text-[30px]">
              {labels.indexTitle}
            </h2>
            <p className="max-w-[780px] text-[16px] leading-[26px] text-ink-300">
              {labels.indexLead}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-[10px] tablet:grid-cols-2 desktop:grid-cols-3">
            {groups.map((g) => {
              const n = perGroup(g.key)
              /* A block with nothing left in it under the current filter is not
                 dimmed, it is gone: an index entry that scrolls you to an empty
                 space is worse than a shorter index. */
              if (n === 0) return null
              return (
                <li key={g.key}>
                  <a
                    href={`#useful-${g.key}`}
                    className="group flex h-full flex-col gap-1 rounded-card bg-surface p-4 shadow-[0_0_0_1px_var(--color-line-soft)] transition-colors duration-200 hover:bg-surface-muted"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[17px] leading-7 text-ink-900">{g.title}</span>
                      <span className="font-numeric text-[14px] leading-6 text-ink-200">{n}</span>
                    </span>
                    <span className="line-clamp-2 text-[14px] leading-[21px] text-ink-300">
                      {g.lead}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex w-full max-w-[1180px] flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPh}
              aria-label={labels.searchPh}
              /* 16px, and it is not a style choice: anything smaller makes iOS
                 zoom the page on focus and never zoom back out.

                 `basis-full` on a phone, not `flex-1`. In a wrapping row
                 `flex-1` means basis zero and shrink allowed, so the field
                 collapsed to whatever was left beside the button and the count,
                 and clipped its own placeholder to «Найти по на». Taking the
                 whole line is what a search field does on a phone anyway. */
              className="min-h-[44px] w-full basis-full rounded-pill border border-line bg-surface px-5 text-[16px] leading-6 text-ink-800 transition-colors placeholder:text-ink-100 focus:border-accent focus:outline-none tablet:w-auto tablet:max-w-[380px] tablet:min-w-[260px] tablet:flex-1 tablet:basis-auto"
            />

            {/* The panel is a disclosure below the tablet breakpoint and always
                open above it. Thirteen chips wrap to five rows on a 375px
                screen, which is a wall in front of the thing you came to read;
                on a desktop they are one row and hiding them would be silly. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="useful-filters"
              className="flex min-h-[44px] items-center gap-2 rounded-pill border border-line bg-surface px-5 text-[16px] leading-6 font-medium text-ink-700 transition-colors duration-200 hover:bg-surface-muted tablet:hidden"
            >
              {labels.filters}
              {activeCount > 0 && (
                <span className="font-numeric rounded-pill bg-accent px-[7px] text-[13px] leading-5 text-white">
                  {activeCount}
                </span>
              )}
            </button>

            <span className="font-numeric text-[15px] leading-6 text-ink-200">
              {labels.found.replace('{n}', String(matches.length)).replace('{t}', String(tools.length))}
            </span>

            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="min-h-[44px] rounded-pill px-3 text-[15px] leading-6 text-accent underline decoration-accent/30 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
              >
                {labels.reset}
              </button>
            )}
          </div>

          <div
            id="useful-filters"
            className={`flex-col gap-4 ${open ? 'flex' : 'hidden'} tablet:flex`}
          >
            <FilterRow label={labels.costLabel}>
              <Chip on={cost === null} onPick={() => setCost(null)}>
                {labels.any}
              </Chip>
              {labels.costOrder.map((c) => (
                <Chip
                  key={c}
                  on={cost === c}
                  count={totals.c[c] ?? 0}
                  onPick={() => setCost(cost === c ? null : c)}
                >
                  {labels.cost[c]}
                </Chip>
              ))}
            </FilterRow>

            <FilterRow label={labels.runsLabel}>
              <Chip on={runs === null} onPick={() => setRuns(null)}>
                {labels.anyRuns}
              </Chip>
              {labels.runsOrder.map((r) => (
                <Chip
                  key={r}
                  on={runs === r}
                  count={totals.r[r] ?? 0}
                  onPick={() => setRuns(runs === r ? null : r)}
                >
                  {labels.runs[r]}
                </Chip>
              ))}
            </FilterRow>

            <FilterRow label={labels.cautionLabel}>
              {labels.cautionOrder.map((f) => (
                <Chip
                  key={f}
                  on={cautions.includes(f)}
                  count={totals.w[f] ?? 0}
                  onPick={() => toggleCaution(f)}
                >
                  {labels.caution[f]}
                </Chip>
              ))}
            </FilterRow>
          </div>

          <p className="text-[14px] leading-[21px] text-ink-200">{labels.tagsNote}</p>
        </div>
      </section>

      {/* ------------------------------------------------------------ cards */}
      {matches.length === 0 && (
        <section className="section-shell gap-3">
          <div className="flex w-full max-w-[1180px] flex-col gap-2">
            <p className="text-[20px] leading-7 text-ink-800">{labels.nothing}</p>
            <p className="text-[16px] leading-6 text-ink-300">{labels.nothingHint}</p>
          </div>
        </section>
      )}

      {groups.map((g) => {
        const inGroup = tools.filter((t) => t.group === g.key && shown.has(t.key))
        if (inGroup.length === 0) return null
        return (
          <section
            key={g.key}
            id={`useful-${g.key}`}
            className="section-shell scroll-mt-[120px] gap-6"
          >
            <div className="flex w-full max-w-[1180px] flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="text-[26px] leading-[1.2] text-ink-900 tablet:text-[30px]">
                  {g.title}
                </h2>
                <p className="max-w-[780px] text-[16px] leading-[26px] text-ink-300">{g.lead}</p>
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
                          and the price is not always four words: fifteen of the
                          entries carry a whole clause there. The pill was
                          `shrink-0` and the name was `min-w-0`, so those names
                          were squeezed to between 0 and 16px and spelled
                          themselves down the card one letter per line. */}
                      <span className="flex flex-wrap items-start gap-x-3 gap-y-2">
                        <Image
                          src={t.icon}
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
                          {t.price}
                        </span>
                      </span>

                      <span className="text-[15px] leading-[24px] text-ink-500">{t.what}</span>

                      {/* The facts the third sentence carries, lifted where they
                          can be seen without reading it. Last rather than first
                          on purpose: they are a summary of the card, and a
                          summary above the thing it summarises reads as a
                          heading. `mt-auto` keeps them on the bottom edge so a
                          row of cards has one rail rather than three. */}
                      <span className="mt-auto flex flex-wrap items-center gap-[6px]">
                        <Tag tone="plain">{labels.cost[t.cost]}</Tag>
                        <Tag tone="plain">{labels.runs[t.runsWhere]}</Tag>
                        {t.cautions.map((f) => (
                          <Tag key={f} tone="warn">
                            {labels.caution[f]}
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
    </>
  )
}

/** A labelled row of chips. Its own component only so the three rows cannot
 *  drift apart by being written out three times. */
function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
