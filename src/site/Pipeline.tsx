'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { type LabLang, tx, PIPELINE } from './labData'

const DWELL_MS = 1500

/**
 * Animated hero diagram: a packet travels down a rail through the four stages
 * of a finished automation, lighting each one as it arrives, then loops.
 *
 * The loop runs off a single index rather than a keyframe timeline so that
 * reduced-motion can simply freeze it with every stage lit, which is also the
 * most legible static version of the diagram.
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

  return (
    <div className="vl-pipe">
      <div className="vl-panel-top">
        <span className="vl-lbl">{L(PIPELINE.label)}</span>
      </div>

      <ol className="vl-pipe-list">
        {/* The rail sits behind the nodes; its lit portion tracks the packet. */}
        <span className="vl-pipe-rail" aria-hidden="true">
          <motion.span
            className="vl-pipe-rail-lit"
            animate={{ scaleY: reduce ? 1 : (active + 1) / count }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
        </span>

        {PIPELINE.nodes.map((n, i) => {
          const lit = reduce || i <= active
          return (
            <li key={i} className={`vl-pipe-node${lit ? ' vl-pipe-on' : ''}`}>
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

      <div className="vl-panel-foot">
        <span className="vl-pipe-foot">{L(PIPELINE.foot)}</span>
      </div>
    </div>
  )
}
