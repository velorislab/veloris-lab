'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  AnimatePresence, motion, useReducedMotion, useSpring, useTransform,
} from 'motion/react'
import { type LabLang, tx, CALC, EMAIL, TELEGRAM } from './labData'
import {
  PRICING_IS_DRAFT, WORK_TYPES, READINESS, ADDONS,
  estimate, money,
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
export default function Calculator({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const reduce = useReducedMotion()

  // Direction rides along with the step so the panel can slide the way the
  // visitor is actually moving.
  const [[step, dir], setStep] = useState<[number, number]>([1, 1])
  const [type, setType] = useState<string | null>(null)
  const [ready, setReady] = useState<string | null>(null)
  const [addons, setAddons] = useState<string[]>([])
  const [desc, setDesc] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [copied, setCopied] = useState(false)

  const est = useMemo(() => estimate(type, ready, addons), [type, ready, addons])

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
    setStep([1, -1]); setType(null); setReady(null); setAddons([])
    setDesc(''); setName(''); setContact(''); setCopied(false)
    priceMv.jump(0)
  }

  // Steps 1 and 2 are the only ones that gate progress; 3 to 5 are all optional.
  const blocked = (step === 1 && !type) || (step === 2 && !ready)

  const labelOf = (list: { key: string; label: Parameters<typeof tx>[0] }[], key: string | null) => {
    const hit = list.find((x) => x.key === key)
    return hit ? L(hit.label) : ''
  }

  const brief = () => {
    const lines = [
      `${L(CALC.bfTask)}: ${labelOf(WORK_TYPES, type)}`,
      `${L(CALC.bfHave)}: ${labelOf(READINESS, ready)}`,
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
    return `${L(CALC.mailSubject)}\n\n${lines.join('\n')}`
  }

  const sendTelegram = () => {
    // Fire the copy without awaiting so window.open stays inside the user
    // gesture and is not treated as a popup.
    try { void navigator.clipboard?.writeText(brief()) } catch { /* clipboard unavailable */ }
    setCopied(true)
    window.open(TELEGRAM, '_blank', 'noopener,noreferrer')
  }

  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(L(CALC.mailSubject))}&body=${encodeURIComponent(brief())}`

  /** Selectable chip. Radio or checkbox underneath, spring on press. */
  const Chip = ({ on, onPick, children, radio, group }: {
    on: boolean; onPick: () => void; children: string; radio?: boolean; group?: string
  }) => (
    <motion.label
      className={`vl-opt${on ? ' vl-opt-on' : ''}`}
      whileTap={reduce ? undefined : { scale: 0.955 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <input
        type={radio ? 'radio' : 'checkbox'} name={group}
        checked={on} onChange={onPick}
      />
      <span>{children}</span>
    </motion.label>
  )

  const slide = (offset: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: offset })

  return (
    <div className="vl-calc">
      {PRICING_IS_DRAFT && (
        <p className="vl-calc-draft" role="status">{L(CALC.draftNotice)}</p>
      )}

      <div className="vl-calc-grid">

        {/* ---- questions ---- */}
        <div className="vl-calc-steps">
          <div className="vl-calc-progress">
            <span className="vl-lbl">
              {L(CALC.stepOf)} {step} {L(CALC.stepOfMid)} {STEPS}
            </span>
            <span className="vl-calc-bar" aria-hidden="true">
              <motion.span
                className="vl-calc-bar-fill"
                animate={{ scaleX: step / STEPS }}
                initial={{ scaleX: 1 / STEPS }}
                transition={{ type: 'spring', stiffness: 140, damping: 24 }}
              />
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={step}
              className="vl-calc-fs"
              initial={slide(dir * 26)}
              animate={{ opacity: 1, x: 0 }}
              exit={slide(dir * -26)}
              transition={{ duration: 0.28, ease: EASE }}
            >
              {step === 1 && (
                <>
                  <span className="vl-calc-q">{L(CALC.q1)}</span>
                  <div className="vl-opts">
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
                  <span className="vl-calc-q">{L(CALC.q2)}</span>
                  <div className="vl-opts">
                    {READINESS.map((r) => (
                      <Chip key={r.key} radio group="vl-ready" on={ready === r.key} onPick={() => setReady(r.key)}>
                        {L(r.label)}
                      </Chip>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <span className="vl-calc-q">{L(CALC.q3)}</span>
                  <p className="vl-calc-hint">{L(CALC.q3hint)}</p>
                  <div className="vl-opts">
                    {ADDONS.map((a) => (
                      <Chip key={a.key} on={addons.includes(a.key)} onPick={() => toggleAddon(a.key)}>
                        {L(a.label)}
                      </Chip>
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <label className="vl-calc-q" htmlFor="vl-desc">{L(CALC.q4)}</label>
                  <p className="vl-calc-hint">{L(CALC.q4hint)}</p>
                  <textarea
                    id="vl-desc" className="vl-field vl-area" rows={6}
                    placeholder={L(CALC.q4ph)}
                    value={desc} onChange={(e) => setDesc(e.target.value)}
                  />
                </>
              )}

              {step === 5 && (
                <>
                  <span className="vl-calc-q">{L(CALC.q5)}</span>
                  <div className="vl-calc-fields">
                    <input
                      className="vl-field" type="text" aria-label={L(CALC.namePh)}
                      placeholder={L(CALC.namePh)} value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="vl-field" type="text" aria-label={L(CALC.contactPh)}
                      placeholder={L(CALC.contactPh)} value={contact} onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <div className="vl-calc-send">
                    <button type="button" className="vl-btn-signal" onClick={sendTelegram}>{L(CALC.sendTg)}</button>
                    <a className="vl-btn-ghost" href={mailHref}>{L(CALC.sendMail)}</a>
                  </div>
                  {copied && <p className="vl-calc-copied" role="status">{L(CALC.copied)}</p>}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="vl-calc-navrow">
            <button
              type="button" className="vl-calc-back"
              onClick={() => (step === 1 ? reset() : go(step - 1))}
              disabled={step === 1}
            >
              {L(CALC.back)}
            </button>
            {step < STEPS
              ? (
                <button type="button" className="vl-btn-solid" onClick={() => go(step + 1)} disabled={blocked}>
                  {L(CALC.next)}
                </button>
              )
              : (
                <button type="button" className="vl-calc-back" onClick={reset}>{L(CALC.restart)}</button>
              )}
          </div>
        </div>

        {/* ---- live estimate ---- */}
        <aside className="vl-calc-out" aria-live="polite">
          {est
            ? (
              <>
                <span className="vl-lbl">{L(CALC.resultLbl)}</span>
                <p className="vl-calc-price">
                  <span className="vl-calc-from">{L(CALC.bfFrom)}</span>
                  <motion.span>{priceText}</motion.span>
                </p>
                <div className="vl-calc-meta">
                  <div className="vl-calc-metarow">
                    <span>{L(CALC.termLbl)}</span>
                    <b>{est.weeks[0]}&ndash;{est.weeks[1]} {L(CALC.weeksShort)}</b>
                  </div>
                  <div className="vl-calc-metarow">
                    <span>{L(CALC.supportLbl)}</span>
                    <b>{L(CALC.bfFrom)} {money(est.support)}{L(CALC.perMonth)}</b>
                  </div>
                </div>
              </>
            )
            : <p className="vl-calc-wait">{L(CALC.waiting)}</p>}
          <p className="vl-calc-note">{L(CALC.disclaimer)}</p>
        </aside>

      </div>
    </div>
  )
}
