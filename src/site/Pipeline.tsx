'use client'

import { useEffect, useState } from 'react'
import { type LabLang, tx, PIPELINE } from './labData'

const DWELL_MS = 1900

/** Fixed stage geometry. Pixels, not percentages, because the callout boxes are
 *  HTML and the wiring is SVG: sharing one integer coordinate space is what
 *  guarantees a connector actually meets the box it belongs to. Below 1080px
 *  the stage is dropped for a plain list, so this never has to be fluid. */
const W = 860
const H = 360
const HUB = { x: 430, y: 180 }
const BOX_W = 190
/** Node centres. Each connector runs from the box edge straight to its node, so
 *  the 85px of clear line between them is what makes it read as a lead rather
 *  than as a box touching a dot. */
const NODES = [
  { x: 275, y: 82, side: 'left' as const },
  { x: 585, y: 82, side: 'right' as const },
  { x: 585, y: 278, side: 'right' as const },
  { x: 275, y: 278, side: 'left' as const },
]

/**
 * The hero's system diagram: four stages of a finished automation wired to a
 * hub, each labelled by a callout box out at the edge of the stage.
 *
 * The arrangement is taken from the pinned reference, which parks annotated
 * boxes around a central graphic and runs a thin line from each one to the
 * point it names. What is NOT taken is its palette. That reference colour-codes
 * three channels in green, indigo and magenta; this page has one signal, so the
 * channels are told apart by TIME instead of by hue. A packet walks the four
 * stages and only the current one is lit: its box border, its label, its
 * connector and its node all come up together, and the rest sit on hairlines.
 *
 * That is a better fit than three static colours anyway. The diagram is trying
 * to say "the work flows through these four places", and a thing that moves
 * says that; three colours only say "there are three of these".
 *
 * The centre is our own drawing, not the reference's brain illustration. A brain
 * is a metaphor for thinking, and what we sell is a wired system, so the middle
 * is a hub with the four stages on a ring around it.
 *
 * Below 1080px the whole stage is replaced by the vertical list, because four
 * callouts and an 860px wiring diagram do not survive a phone.
 */
export default function Pipeline({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const count = PIPELINE.nodes.length
  const [active, setActive] = useState(0)

  useEffect(() => {
    // `prefers-reduced-motion` is read here rather than through the hook so the
    // loop is never started at all for those readers, instead of started and
    // then visually frozen.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % count), DWELL_MS)
    return () => clearInterval(id)
  }, [count])

  return (
    <div className="vl-pipe">
      <span className="vl-lbl vl-pipe-label">{L(PIPELINE.label)}</span>

      {/* THE STAGE. Decorative twin of the list below it, so it is hidden from
          assistive tech: the list carries the same four stages as real text. */}
      <div className="vl-stage" style={{ width: W, height: H }} aria-hidden="true">
        <svg className="vl-stage-svg" viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hub to node, bowed slightly so the four spokes are not a cross. */}
          {NODES.map((n, i) => {
            const mx = (HUB.x + n.x) / 2 + (n.x > HUB.x ? 22 : -22)
            const my = (HUB.y + n.y) / 2
            return (
              <path
                key={`spoke-${i}`}
                d={`M ${HUB.x} ${HUB.y} Q ${mx} ${my} ${n.x} ${n.y}`}
                className={i === active ? 'vl-spoke vl-spoke-on' : 'vl-spoke'}
              />
            )
          })}

          {/* Node out to the edge, where its callout box waits. */}
          {NODES.map((n, i) => {
            const toX = n.side === 'left' ? BOX_W : W - BOX_W
            return (
              <line
                key={`lead-${i}`}
                x1={n.x} y1={n.y} x2={toX} y2={n.y}
                className={i === active ? 'vl-lead vl-lead-on' : 'vl-lead'}
              />
            )
          })}

          {/* The hub itself: a ring rather than a disc, so the spokes read as
              entering something hollow instead of stopping at a dot. */}
          <circle cx={HUB.x} cy={HUB.y} r={34} className="vl-hub" />
          <circle cx={HUB.x} cy={HUB.y} r={23} className="vl-hub-inner" />
          <circle cx={HUB.x} cy={HUB.y} r={4} className="vl-hub-core" />

          {NODES.map((n, i) => (
            <circle
              key={`node-${i}`}
              cx={n.x} cy={n.y} r={6}
              className={i === active ? 'vl-nodedot vl-nodedot-on' : 'vl-nodedot'}
            />
          ))}
        </svg>

        {/* Callout boxes. Positioned off the same integers as the wiring. */}
        {PIPELINE.nodes.map((node, i) => {
          const n = NODES[i]
          const pos = n.side === 'left'
            ? { left: 0, top: n.y - 21 }
            : { left: W - BOX_W, top: n.y - 21 }
          return (
            <div
              key={i}
              className={i === active ? 'vl-callout vl-callout-on' : 'vl-callout'}
              style={{ ...pos, width: BOX_W }}
            >
              <span className="vl-callout-tick" />
              <span className="vl-callout-t">{L(node.t)}</span>
            </div>
          )
        })}
      </div>

      {/* The readable version, and the only one narrow screens get. */}
      <ol className="vl-pipe-list">
        {PIPELINE.nodes.map((n, i) => (
          <li key={i} className={i === active ? 'vl-pipe-node vl-pipe-on' : 'vl-pipe-node'}>
            <span className="vl-pipe-dot" aria-hidden="true" />
            <span className="vl-pipe-text">
              <b>{L(n.t)}</b>
              <span>{L(n.d)}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="vl-pipe-foot">
        <span>{L(PIPELINE.foot)}</span>
      </div>
    </div>
  )
}
