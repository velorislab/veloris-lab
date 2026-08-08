'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { type LabLang, tx, PIPELINE } from './labData'

const DWELL_MS = 1500

/**
 * The hero's system diagram: a packet travels the four stages of a finished
 * automation, lighting each one as it arrives, then loops.
 *
 * Horizontal under the centred hero statement, and vertical on a phone, where
 * four columns would be 80px each. The lit portion of the rail is driven by a
 * `--lit` fraction rather than a transform for exactly that reason: one number
 * serves both axes, so the CSS decides which way the rail grows and the
 * component never has to know its own orientation. A `scaleX` would have to be
 * swapped for a `scaleY` at the breakpoint, in JS, from a media query.
 *
 * The loop runs off a single index rather than a keyframe timeline, so
 * reduced-motion just freezes it with every stage lit, which is also the most
 * legible static version of the diagram. The global reduced-motion rule already
 * flattens the transition, so no separate branch is needed for the rail.
 */
export default function Pipeline({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const reduce = useReducedMotion()
  const count = PIPELINE.nodes.length
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActive((i) => (i + 1) % count), DWELL_MS)
    return () => clearInterval(id)
  }, [reduce, count])

  const lit = reduce ? 1 : (active + 1) / count

  return (
    <div className="vl-pipe">
      <span className="vl-lbl vl-pipe-label">{L(PIPELINE.label)}</span>

      <ol className="vl-pipe-list">
        {/* The rail sits behind the nodes; its lit portion tracks the packet. */}
        <span className="vl-pipe-rail" aria-hidden="true">
          <span className="vl-pipe-rail-lit" style={{ '--lit': lit } as CSSProperties} />
        </span>

        {PIPELINE.nodes.map((n, i) => {
          const on = reduce || i <= active
          return (
            <li key={i} className={`vl-pipe-node${on ? ' vl-pipe-on' : ''}`}>
              <span className="vl-pipe-dot" aria-hidden="true">
                {!reduce && i === active && (
                  <motion.span
                    className="vl-pipe-halo"
                    layoutId="vl-pipe-halo"
                    transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                  />
                )}
              </span>
              <span className="vl-pipe-text">
                <b>{L(n.t)}</b>
                <span>{L(n.d)}</span>
              </span>
            </li>
          )
        })}
      </ol>

      <div className="vl-pipe-foot">
        <span>{L(PIPELINE.foot)}</span>
      </div>
    </div>
  )
}
