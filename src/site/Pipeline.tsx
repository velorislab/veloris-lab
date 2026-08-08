'use client'

import { motion } from 'motion/react'
import { type LabLang, tx, PIPELINE } from './labData'
import { useHydrated } from './useHydrated'

/** Fixed stage geometry. Pixels, not percentages, because the callout boxes are
 *  HTML and the wiring is SVG: sharing one integer coordinate space is what
 *  guarantees a connector actually meets the box it belongs to. Below 1080px
 *  the stage is dropped for a plain list, so this never has to be fluid. */
const W = 860
const H = 360
const HUB = { x: 430, y: 180 }
const BOX_W = 190

/**
 * One branch: the node it labels, which side of the stage its box sits on, and
 * how long its beam takes. The durations are staggered and deliberately not all
 * equal, so the four branches drift out of phase instead of pulsing in lockstep.
 * Fixed numbers rather than random ones, because a random duration would differ
 * between the server render and the client one.
 */
const BRANCHES = [
  // `bow` is how far the control point is pulled off the straight line, away
  // from the centre. This is the number that matters: at 22 the four paths were
  // near-straight diagonals meeting in a cross, which is a star, not wiring. At
  // 70 they become long shallow arcs, which is what the reference draws.
  // `sweep` is which way the gradient plane travels, and it decides whether a
  // branch lights from its label inward or from the hub outward.
  // `dir` is which way the light runs. The top pair feeds the hub, the bottom
  // pair is fed by it, which is the shape of the sentence the diagram is making:
  // a source and an agent go in, systems and you come out.
  { y: 82,  side: 'left' as const,  bow: -70, dir: 'in' as const,  dur: 4.6, delay: 0 },
  { y: 82,  side: 'right' as const, bow: -70, dir: 'in' as const,  dur: 5.4, delay: 0.9 },
  { y: 278, side: 'right' as const, bow: 70,  dir: 'out' as const, dur: 4.9, delay: 1.8 },
  { y: 278, side: 'left' as const,  bow: 70,  dir: 'out' as const, dur: 5.8, delay: 2.6 },
]

/** Exponential ease-out: the beam leaves fast and settles slowly. */
const EASE = [0.16, 1, 0.3, 1] as const

/**
 * The hero's system diagram: four stages of a finished automation wired to a
 * hub, each labelled by a callout box out at the edge of the stage.
 *
 * THE BEAM. This went through two wrong versions before this one. First a line
 * that switched from grey to green on a timer, which is a light being flicked,
 * not anything travelling. Then a hard-edged dash sliding along the path at
 * constant speed, which moved but read as a tick mark rather than as light.
 *
 * What the pinned reference actually does, and what this now does: each path is
 * stroked twice, once dim and once with a LINEAR GRADIENT whose stops run
 * transparent, bright, deep, transparent. The gradient is in `userSpaceOnUse`
 * and its x1/x2 are animated straight across the stage, so the bright band
 * sweeps over the stroke and only the part of the path currently under it lights
 * up. That is what produces the soft head and the fading tail; a dash cannot,
 * because a dash has ends.
 *
 * The easing is exponential ease-out, so the run starts fast and settles, and
 * the four branches carry different durations so they drift out of phase instead
 * of pulsing together.
 *
 * Each gradient is bounded to its own branch in absolute user units, not swept
 * across the stage in percentages. That distinction is the difference between a
 * beam and nothing at all: see the note on `sweepRange`.
 *
 * Each branch is ONE shallow arc from its label to the hub. An earlier version
 * ran a spoke to a mid-point dot and then a straight lead on to the box, with the
 * control handle pushed off by only 22px; that gave four near-straight diagonals
 * meeting in a star, and a beam made of two events that had to be delay-matched
 * to look like one. A single arc bowed 70px is both the reference's shape and a
 * single continuous run.
 *
 * The centre is our own drawing, not the reference's brain illustration. A brain
 * is a metaphor for thinking, and what we sell is a wired system, so the middle
 * is a hub with the four stages on a ring around it.
 *
 * Below 1080px the stage is replaced by the vertical list, because four callouts
 * and an 860px wiring diagram do not survive a phone.
 */
export default function Pipeline({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  /**
   * The beam layer is client-only, and that is a correctness fix rather than an
   * optimisation. Under `prefers-reduced-motion` Motion jumps an infinite
   * animation straight to its end value on the client, while the server had
   * already written the start value into x1/x2, and React reports the attribute
   * mismatch it cannot patch. Keeping the animated gradients out of the server
   * render removes the disagreement entirely.
   *
   * Nothing is lost by it: the wiring, the hub and the labels are the diagram and
   * they are all server-rendered. The beam is the life in it, and life arrives
   * with the JavaScript.
   */
  const lit = useHydrated()

  /**
   * One shallow arc from the label's edge to the hub.
   *
   * The control point sits at the midpoint on x and is pushed off the start on y
   * by `bow`, which is the reference's own construction: a quadratic whose handle
   * is displaced perpendicular to the run. The label boxes are the endpoints, the
   * way the circles are in the reference, so there are no intermediate dots for
   * the curve to have to pass through.
   */
  const edgeX = (i: number) => (BRANCHES[i].side === 'left' ? BOX_W : W - BOX_W)

  const branchPath = (i: number) => {
    const n = BRANCHES[i]
    const edge = edgeX(i)
    const cx = (edge + HUB.x) / 2
    return `M ${edge} ${n.y} Q ${cx} ${n.y + n.bow} ${HUB.x} ${HUB.y}`
  }

  /**
   * The x range the gradient has to travel for THIS branch, in user units.
   *
   * This is the part that has to be per-branch rather than per-stage, and getting
   * it wrong made the beam invisible rather than merely wrong. Percentages under
   * `userSpaceOnUse` resolve against the whole 860px stage, so a band sweeping
   * from 86% to 96% sits at x 744..830 while branch 0 only spans x 190..430. Off
   * the ends of a gradient SVG clamps to the nearest stop, and the nearest stop
   * there is the transparent one, so the branch vanished for most of its cycle.
   *
   * Absolute coordinates bounded to the branch fix it: the band starts one band
   * width before the run and finishes one band width after it.
   */
  const sweepRange = (i: number) => {
    const n = BRANCHES[i]
    const a = edgeX(i)
    const b = HUB.x
    const [head, tail] = n.dir === 'in' ? [a, b] : [b, a]
    const band = Math.abs(b - a) * 0.42 * (tail > head ? 1 : -1)
    return {
      x1: [head - band, tail],
      x2: [head, tail + band],
    }
  }

  return (
    <div className="vl-pipe">
      <span className="vl-lbl vl-pipe-label">{L(PIPELINE.label)}</span>

      {/* THE STAGE. Decorative twin of the list below it, so it is hidden from
          assistive tech: the list carries the same four stages as real text. */}
      <div className="vl-stage" style={{ width: W, height: H }} aria-hidden="true">
        <svg className="vl-stage-svg" viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {lit && BRANCHES.map((br, i) => {
              // Percentages resolve against the viewBox under `userSpaceOnUse`,
              // so this sweeps the gradient plane clear across the stage and off
              // the far side, which is what carries the band over the stroke.
              const { x1, x2 } = sweepRange(i)
              return (
                <motion.linearGradient
                  key={i}
                  id={`vl-beam-${i}`}
                  gradientUnits="userSpaceOnUse"
                  initial={{ x1: x1[0], x2: x2[0], y1: 0, y2: 0 }}
                  animate={{ x1, x2, y1: [0, 0], y2: [0, 0] }}
                  transition={{
                    delay: br.delay,
                    duration: br.dur,
                    ease: EASE,
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                >
                  {/* Colour comes from CSS, not from a `stopColor` attribute: a
                      presentation attribute does not parse `var()`, so the tokens
                      have to be applied as the `stop-color` property instead. */}
                  <stop className="vl-beam-head" stopOpacity="0" />
                  <stop className="vl-beam-head" />
                  <stop offset="32.5%" className="vl-beam-tail" />
                  <stop offset="100%" className="vl-beam-tail" stopOpacity="0" />
                </motion.linearGradient>
              )
            })}
          </defs>

          {/* The dim wiring. This is the diagram; the beam is the life in it. */}
          {BRANCHES.map((_, i) => (
            <path key={`wire-${i}`} d={branchPath(i)} className="vl-wire" />
          ))}

          {/* The lit pass. Same path, stroked with its own travelling gradient. */}
          {lit && BRANCHES.map((_, i) => (
            <path key={`beam-${i}`} d={branchPath(i)} className="vl-beam" stroke={`url(#vl-beam-${i})`} />
          ))}

          {/* The hub: a ring rather than a disc, so the spokes read as entering
              something hollow instead of stopping at a dot. */}
          <circle cx={HUB.x} cy={HUB.y} r={34} className="vl-hub" />
          <circle cx={HUB.x} cy={HUB.y} r={23} className="vl-hub-inner" />
          <circle cx={HUB.x} cy={HUB.y} r={4} className="vl-hub-core" />

        </svg>

        {/* Callout boxes, positioned off the same integers as the wiring. */}
        {PIPELINE.nodes.map((node, i) => {
          const n = BRANCHES[i]
          return (
            <div
              key={i}
              className="vl-callout"
              style={{ left: n.side === 'left' ? 0 : W - BOX_W, top: n.y - 21, width: BOX_W }}
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
          <li key={i} className="vl-pipe-node">
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
