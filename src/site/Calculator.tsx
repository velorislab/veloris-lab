'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  AnimatePresence, motion, useReducedMotion, useSpring, useTransform,
} from 'motion/react'
import { type LabLang, tx, CALC, TELEGRAM } from './labData'
import { useHydrated } from './useHydrated'
import {
  PRICING_IS_DRAFT, WORK_TYPES, DESIGN_STATES, ADDONS,
  estimate, money, type DesignKey, type EstimateFactor,
} from './labPricing'

const STEPS = 5
const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Five-step project calculator.
 *
 * The estimate is live from step 1 and the contact question comes last, so the
 * visitor gets their number before being asked for anything.
 *
 * There is no backend and no stored personal data: the last step assembles the
 * answers into a plain-text brief and hands it off through the visitor's own
 * Telegram or mail client. That is why there is no consent checkbox here, we
 * never receive the field values unless the person chooses to send them.
 */
/**
 * What the calculator opens on.
 *
 * `agent` because AI agents are the headline service and the first card on the
 * page. `ready` because it is the one design state that adds nothing on every
 * single product type, so the opening figure is the service's own floor with
 * nothing added: opening on `needed` would inflate the first number the reader
 * ever sees by up to $500. Same reasoning as before, different mechanism, now
 * that design is a line rather than a multiplier.
 *
 * The server question opens unanswered rather than on `false`, because on the
 * types where it is asked at all it is a real fork worth $1 850 and guessing it
 * either way would be putting words in the reader's mouth.
 */
const DEFAULT_TYPE = 'agent'
const DEFAULT_DESIGN: DesignKey = 'ready'

export default function Calculator({ lang, seedType }: { lang: LabLang; seedType?: string }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const reduce = useReducedMotion()
  const hydrated = useHydrated()

  // Direction rides along with the step so the panel can slide the way the
  // visitor is actually moving.
  const [[step, dir], setStep] = useState<[number, number]>([1, 1])
  /* Answered, not empty. The calculator used to open on two blank questions and
     a "pick the kind of work to see a number" placeholder, which asks the reader
     to work before it gives them anything. It now opens on the headline service
     and the neutral readiness, so a real figure is on screen before a single
     click. Both are ordinary radio selections the reader can change, the price
     says "from", and the disclaimer sits right under it. */
  /* On a service page the first question is already answered by the page the
     reader is standing on, so it arrives seeded. Asking somebody what kind of
     work they want directly under a heading naming that work is a question with
     one obvious answer, which is a question worth not asking. */
  const opening = seedType ?? DEFAULT_TYPE
  const [type, setType] = useState<string | null>(opening)
  const [design, setDesign] = useState<DesignKey>(DEFAULT_DESIGN)
  const [server, setServer] = useState<boolean | null>(null)
  const [addons, setAddons] = useState<string[]>([])
  const [desc, setDesc] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  /** The chosen type, so the step machine can ask about a server only where one
   *  is not already implied. */
  const work = WORK_TYPES.find((t) => t.key === type)
  const serverAsked = Boolean(work) && !work!.serverIncluded

  /* `desc` is in the dependency list because the complexity bump is read out of
     it, so the figure moves as the reader types. That is the whole point of
     their heuristic and it is worth keeping live. */
  const est = useMemo(
    () => estimate({ typeKey: type, designKey: design, server: Boolean(server), addonKeys: addons, description: desc }),
    [type, design, server, addons, desc],
  )

  // The price is the one number people screenshot, so it counts up on a spring
  // instead of snapping. Mid-flight values are rounded to 50 to stay readable;
  // every real total is a multiple of 100, so it still lands exactly.
  const priceMv = useSpring(0, { stiffness: 90, damping: 20, restDelta: 1 })
  const priceText = useTransform(priceMv, (v) => money(Math.round(v / 50) * 50))
  useEffect(() => {
    if (!est) return
    if (reduce) priceMv.jump(est.total)
    else priceMv.set(est.total)
  }, [est, priceMv, reduce])

  const go = (n: number) => setStep([n, n > step ? 1 : -1])

  const toggleAddon = (key: string) =>
    setAddons((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const reset = () => {
    setStep([1, -1]); setType(opening); setDesign(DEFAULT_DESIGN); setServer(null); setAddons([])
    setDesc(''); setName(''); setContact('')
    priceMv.jump(0)
  }

  /* Nothing gates progress any more: steps 1 and 2 arrive answered and 3 to 5
     were always optional. Kept as an expression rather than deleted because it
     is the one place that would need to know, if a future step ever does. */
  const blocked = step === 1 && !type

  const labelOf = (list: { key: string; label: Parameters<typeof tx>[0] }[], key: string | null) => {
    const hit = list.find((x) => x.key === key)
    return hit ? L(hit.label) : ''
  }

  /** One breakdown line's wording. The shape comes from `estimate()`, which is
   *  locale-blind on purpose; the words belong here. */
  const factorLabel = (f: EstimateFactor) => {
    if (f.kind === 'design') return L(CALC.fxDesign)
    if (f.kind === 'server') return L(CALC.fxServer)
    if (f.kind === 'features') return `${f.count} ${L(CALC.fxFeatures)}`
    return L(f.level === 'high' ? CALC.fxHigh : CALC.fxSome)
  }

  const brief = () => {
    const lines = [
      `${L(CALC.bfTask)}: ${labelOf(WORK_TYPES, type)}`,
      `${L(CALC.bfHave)}: ${labelOf(DESIGN_STATES, design)}`,
      ...(serverAsked ? [`${L(CALC.bfServer)}: ${L(server ? CALC.bfYes : CALC.bfNo)}`] : []),
      `${L(CALC.bfNeeds)}: ${addons.length
        ? ADDONS.filter((a) => addons.includes(a.key)).map((a) => L(a.label)).join(', ')
        : L(CALC.bfNone)}`,
    ]
    if (desc.trim()) lines.push(`${L(CALC.bfDesc)}: ${desc.trim()}`)
    if (est) {
      lines.push(`${L(CALC.bfEstimate)}: ${L(CALC.bfFrom)} ${money(est.total)}, ${est.weeks[0]}–${est.weeks[1]} ${L(CALC.weeksShort)}`)
    }
    if (name.trim()) lines.push(`${L(CALC.bfName)}: ${name.trim()}`)
    if (contact.trim()) lines.push(`${L(CALC.bfContact)}: ${contact.trim()}`)
    return `${L(CALC.briefTitle)}\n\n${lines.join('\n')}`
  }

  /* The handoff carries the whole brief in the URL, so it needs no click
     handler, no clipboard permission and no popup that a browser might block.

     Telegram's deep-link format for a public username pre-enters the text into
     the input bar with the recipient already resolved, which is what makes the
     old copy-and-paste dance unnecessary. TELEGRAM is the full
     `https://t.me/<handle>` URL, so the parameter appends to it directly.

     There was a mailto beside this doing the same job for the other channel.
     The site answers on Telegram, and a second button offering a slower way to
     reach the same inbox is a fork with a wrong branch in it. */
  const tgHref = `${TELEGRAM}?text=${encodeURIComponent(brief())}`

  /** Selectable chip. Radio or checkbox underneath, spring on press. */
  const Chip = ({ on, onPick, children, radio, group }: {
    on: boolean; onPick: () => void; children: string; radio?: boolean; group?: string
  }) => (
    <motion.label
      className={
        'cursor-pointer rounded-pill border px-[18px] py-[11px] text-[15px] leading-6 transition-colors duration-200 select-none ' +
        (on
          ? 'border-accent bg-accent text-white'
          : 'border-line bg-surface-muted text-ink-500 hover:bg-surface-subtle')
      }
      /* Unconditional, and `tabIndex={-1}` alongside it, for two reasons that
         turn out to be the same reason. Motion makes anything with `whileTap`
         focusable, so the label picked up a `tabindex="0"` on top of the real
         radio inside it, giving every chip two tab stops. And gating the prop on
         `useReducedMotion()` meant the server wrote that attribute while a
         reduced-motion client did not, which React reported as an attribute it
         could not patch. Fixing the tab stop fixes the mismatch: the attribute is
         now the same on both sides and focus stays on the input, which is what
         the `:has(input:focus-visible)` ring is drawn against.

         The press scale stays for everyone. It is a 4.5% squash in direct
         response to the reader's own finger, which is the one kind of movement
         reduced motion is not asking us to remove. */
      tabIndex={-1}
      whileTap={{ scale: 0.955 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <input
        type={radio ? 'radio' : 'checkbox'} name={group}
        checked={on} onChange={onPick}
        /* Visually hidden but focusable: the label is the whole hit area and
           the ring is drawn against this input, not against the label. */
        className="sr-only"
      />
      <span>{children}</span>
    </motion.label>
  )

  /* `hydrated &&` so the decision cannot differ between the server render and the
     hydrating one: these values reach `initial` and `exit`, and a difference
     there is a mismatch. After hydration the reduced-motion reader gets the
     fade without the sideways travel. */
  const slide = (offset: number) =>
    hydrated && reduce ? { opacity: 0 } : { opacity: 0, x: offset }

  return (
    <div className="w-full">
      {PRICING_IS_DRAFT && (
        <p className="mb-4 rounded-card border border-line bg-surface-tint px-4 py-3 text-[15px] text-ink-500" role="status">{L(CALC.draftNotice)}</p>
      )}

      <div className="grid w-full gap-6 desktop:grid-cols-[minmax(0,1fr)_360px] desktop:items-start">

        {/* ---- questions ---- */}
        <div data-calc-steps className="flex flex-col rounded-panel border border-line bg-surface shadow-[var(--shadow-widget-alt)] p-6 tablet:p-10">
          <div className="mb-7 flex flex-col gap-3">
            <span className="text-[13px] font-medium tracking-[0.08em] text-ink-200 uppercase">
              {L(CALC.stepOf)} {step} {L(CALC.stepOfMid)} {STEPS}
            </span>
            <span className="block h-[3px] w-full overflow-hidden rounded-pill bg-line" aria-hidden="true">
              <motion.span
                className="block h-full w-full origin-left rounded-pill bg-accent"
                animate={{ scaleX: step / STEPS }}
                initial={{ scaleX: 1 / STEPS }}
                transition={{ type: 'spring', stiffness: 140, damping: 24 }}
              />
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={step}
              className="flex min-h-[300px] flex-col gap-4"
              initial={slide(dir * 26)}
              animate={{ opacity: 1, x: 0 }}
              exit={slide(dir * -26)}
              transition={{ duration: 0.28, ease: EASE }}
            >
              {step === 1 && (
                <>
                  <span className="font-display text-[24px] leading-[1.25] font-semibold text-ink-800 tablet:text-[28px]">{L(CALC.q1)}</span>
                  <div className="flex flex-wrap gap-[10px]">
                    {WORK_TYPES.map((t) => (
                      <Chip key={t.key} radio group="vl-type" on={type === t.key} onPick={() => setType(t.key)}>
                        {L(t.label)}
                      </Chip>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <span className="font-display text-[24px] leading-[1.25] font-semibold text-ink-800 tablet:text-[28px]">{L(CALC.qDesign)}</span>
                  <p className="-mt-1 text-[15px] leading-6 text-ink-300">{L(CALC.qDesignHint)}</p>
                  <div className="flex flex-wrap gap-[10px]">
                    {DESIGN_STATES.map((d) => (
                      <Chip key={d.key} radio group="vl-design" on={design === d.key} onPick={() => setDesign(d.key)}>
                        {L(d.label)}
                      </Chip>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <span className="font-display text-[24px] leading-[1.25] font-semibold text-ink-800 tablet:text-[28px]">{L(CALC.qServer)}</span>
                  {/* ASKED ONLY WHERE IT IS A REAL QUESTION. On an integration, a
                      parser, a dashboard, a CRM or an agent the server IS the
                      work, so its cost is already inside the floor; offering the
                      choice there would charge for the same thing twice. The step
                      still exists on those types rather than being skipped,
                      because a five-step bar that sometimes has four steps is
                      worse than a step that explains itself. */}
                  {serverAsked
                    ? (
                      <>
                        <p className="-mt-1 text-[15px] leading-6 text-ink-300">{L(CALC.qServerHint)}</p>
                        <div className="flex flex-wrap gap-[10px]">
                          <Chip radio group="vl-server" on={server === true} onPick={() => setServer(true)}>
                            {L(CALC.serverYes)}
                          </Chip>
                          <Chip radio group="vl-server" on={server === false} onPick={() => setServer(false)}>
                            {L(CALC.serverNo)}
                          </Chip>
                        </div>
                      </>
                    )
                    : <p className="-mt-1 text-[15px] leading-6 text-ink-300">{L(CALC.serverIncluded)}</p>}
                </>
              )}

              {step === 4 && (
                <>
                  <span className="font-display text-[24px] leading-[1.25] font-semibold text-ink-800 tablet:text-[28px]">{L(CALC.q3)}</span>
                  <p className="-mt-1 text-[15px] leading-6 text-ink-300">{L(CALC.q3hint)}</p>
                  <div className="flex flex-wrap gap-[10px]">
                    {ADDONS.map((a) => (
                      <Chip key={a.key} on={addons.includes(a.key)} onPick={() => toggleAddon(a.key)}>
                        {L(a.label)}
                      </Chip>
                    ))}
                  </div>
                  {/* The description shares this step rather than owning one of
                      its own, which is what freed a step for the server question.
                      It also belongs here: the figure moves as it is typed, so
                      seeing it beside the checkboxes makes that connection. */}
                  <label className="mt-2 text-[15px] font-medium text-ink-700" htmlFor="vl-desc">{L(CALC.q4)}</label>
                  <p className="-mt-2 text-[15px] leading-6 text-ink-300">{L(CALC.q4hint)}</p>
                  <textarea
                    id="vl-desc" rows={4} className="w-full resize-y rounded-card border border-line bg-surface px-4 py-3 text-[16px] leading-6 text-ink-800 transition-colors placeholder:text-ink-100 focus:border-accent focus:outline-none"
                    placeholder={L(CALC.q4ph)}
                    value={desc} onChange={(e) => setDesc(e.target.value)}
                  />
                </>
              )}

              {step === 5 && (
                <>
                  <span className="font-display text-[24px] leading-[1.25] font-semibold text-ink-800 tablet:text-[28px]">{L(CALC.q5)}</span>
                  <p className="-mt-1 text-[15px] leading-6 text-ink-300">{L(CALC.q5hint)}</p>
                  <div className="grid gap-3 tablet:grid-cols-2">
                    <input
                      type="text" aria-label={L(CALC.namePh)} className="w-full rounded-card border border-line bg-surface px-4 py-3 text-[16px] text-ink-800 transition-colors placeholder:text-ink-100 focus:border-accent focus:outline-none"
                      placeholder={L(CALC.namePh)} value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text" aria-label={L(CALC.contactPh)} className="w-full rounded-card border border-line bg-surface px-4 py-3 text-[16px] text-ink-800 transition-colors placeholder:text-ink-100 focus:border-accent focus:outline-none"
                      placeholder={L(CALC.contactPh)} value={contact} onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <pre className="max-h-[160px] overflow-auto rounded-card border border-line bg-surface-muted p-4 font-numeric text-[13px] leading-6 whitespace-pre-wrap text-ink-400">{brief()}</pre>
                  <div className="flex flex-wrap gap-3">
                    <a
                      className="rounded-pill bg-accent px-6 py-[13px] text-[16px] font-medium text-white transition-colors duration-200 hover:bg-accent-600"
                      href={tgHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{L(CALC.sendTg)}</a>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-line-soft pt-6">
            <button
              type="button"
              className="rounded-pill px-5 py-3 text-[15px] text-ink-300 transition-colors duration-200 hover:text-ink-800 disabled:pointer-events-none disabled:opacity-40"
              onClick={() => (step === 1 ? reset() : go(step - 1))}
              disabled={step === 1}
            >
              {L(CALC.back)}
            </button>
            {step < STEPS
              ? (
                <button
                  type="button"
                  className="rounded-pill bg-ink-900 px-6 py-3 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-ink-700 disabled:pointer-events-none disabled:opacity-40"
                  onClick={() => go(step + 1)}
                  disabled={blocked}
                >
                  {L(CALC.next)}
                </button>
              )
              : (
                <button type="button" className="rounded-pill px-5 py-3 text-[15px] text-ink-300 transition-colors duration-200 hover:text-ink-800" onClick={reset}>{L(CALC.restart)}</button>
              )}
          </div>
        </div>

        {/* ---- live estimate ---- */}
        <aside className="order-first flex flex-col gap-4 rounded-panel border border-line bg-surface-tint p-6 shadow-[var(--shadow-widget)] desktop:order-none desktop:sticky desktop:top-[86px]">
          <div aria-live="polite">
          {est
            ? (
              <>
                <span className="text-[13px] font-medium tracking-[0.08em] text-ink-200 uppercase">{L(CALC.resultLbl)}</span>
                <p className="flex items-baseline gap-2 font-display text-[42px] leading-none font-semibold text-ink-900 tablet:text-[48px]">
                  <span className="text-[17px] font-medium text-ink-200">{L(CALC.bfFrom)}</span>
                  <motion.span>{priceText}</motion.span>
                </p>
                <div className="mt-1 flex flex-col">
                  <div className="flex items-center justify-between gap-3 border-t border-line-soft py-[10px] text-[15px] text-ink-400 [&>b]:font-medium [&>b]:text-ink-800">
                    <span>{L(CALC.termLbl)}</span>
                    <b>{est.weeks[0]}&ndash;{est.weeks[1]} {L(CALC.weeksShort)}</b>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-line-soft py-[10px] text-[15px] text-ink-400 [&>b]:font-medium [&>b]:text-ink-800">
                    <span>{L(CALC.supportLbl)}</span>
                    <b>{L(CALC.bfFrom)} {money(est.support)}{L(CALC.perMonth)}</b>
                  </div>
                </div>

                {/* WHAT IS IN THE FIGURE, itemised. Their result screen does this
                    and it is the best thing in their calculator: the same number
                    reads as arithmetic rather than as an assertion, and a reader
                    who disagrees with one line can see which line to argue about.
                    Only the lines that actually added money appear, so on a bare
                    landing page the block is absent instead of empty. */}
                {est.factors.length > 0 && (
                  <div className="mt-3 flex flex-col gap-1 border-t border-line-soft pt-3">
                    <span className="text-[13px] font-medium tracking-[0.08em] text-ink-200 uppercase">{L(CALC.breakdownLbl)}</span>
                    {est.factors.map((f) => (
                      <div key={f.kind} className="flex items-baseline justify-between gap-3 text-[14px] leading-6 text-ink-400">
                        <span>{factorLabel(f)}</span>
                        <span className="font-numeric text-ink-700">+{money(f.add)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Their confidence line, «предварительная» until the reader has
                    written something. It asks for detail without a required
                    field, and costs nothing to ignore. */}
                <p className="mt-2 text-[13px] leading-5 text-ink-200">
                  {L(est.described ? CALC.firmLbl : CALC.roughLbl)}
                </p>
              </>
            )
            : <p className="text-[16px] leading-6 text-ink-300">{L(CALC.waiting)}</p>}
          </div>

          {/* The one moment on the site where a visitor has self-qualified,
              self-priced and formed an intent, and until now this panel held
              only spans and paragraphs. It jumps to the last step rather than
              submitting anything: there is no endpoint on this site and there
              is not going to be one.
              The scroll target is the [data-calc-steps] card, not #estimate: below
              the desktop breakpoint that card is ordered BELOW the panel, so
              scrolling to the section top would put the step change off-screen. */}
          {step < STEPS && (
            <button
              type="button"
              className="w-full rounded-pill bg-accent px-6 py-[14px] text-[16px] font-medium text-white transition-colors duration-200 hover:bg-accent-600"
              onClick={() => {
                setStep([STEPS, 1])
                document.querySelector('[data-calc-steps]')?.scrollIntoView({
                  behavior: reduce ? 'auto' : 'smooth', block: 'start',
                })
              }}
            >
              {L(CALC.jumpSend)}
            </button>
          )}

          <p className="border-t border-line-soft pt-3 text-[13px] leading-5 text-ink-200">{L(CALC.disclaimer)}</p>
        </aside>

      </div>
    </div>
  )
}
