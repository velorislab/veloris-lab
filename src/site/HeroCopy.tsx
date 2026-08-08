'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { type LabLang, tx, UI, HERO } from './labData'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Hero entrance: one orchestrated sequence rather than scattered effects.
 * Pill, then the headline word by word, then the subhead and the buttons.
 *
 * The headline is split on spaces instead of on visual lines, because line
 * boxes move with the viewport and any hard-coded split would break at some
 * width. Each word rides up out of its own clipping box, so the effect still
 * reads as a line reveal wherever the text happens to wrap.
 */
export default function HeroCopy({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const reduce = useReducedMotion()

  // The availability status moved to the announcement bar at the top of the
  // page, so the hero opens straight on the headline.
  if (reduce) {
    return (
      <div className="vl-hero-copy">
        <h1 className="vl-h1">{L(HERO.h1)}</h1>
        <p className="vl-hero-sub">{L(HERO.sub)}</p>
        <div className="vl-hero-acts">
          <a href="#calc" className="vl-btn-signal">{L(UI.ctaCalc)}</a>
          <a href="#cases" className="vl-btn-ghost">{L(UI.viewCases)}</a>
        </div>
      </div>
    )
  }

  const words = L(HERO.h1).split(' ')
  // The headline owns most of the sequence, so everything after it is offset
  // by roughly how long the word run takes.
  const tail = 0.18 + words.length * 0.045

  return (
    <motion.div className="vl-hero-copy" initial="hidden" animate="shown">
      <h1 className="vl-h1">
        {/* The separator space MUST be a sibling of .vl-word, never a child.
            .vl-word is an inline-block with overflow:hidden, and a trailing
            space inside one is collapsed away, which jams the whole headline
            into a single unreadable word. */}
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="vl-word">
              <motion.span
                variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                transition={{ duration: 0.62, ease: EASE, delay: 0.18 + i * 0.045 }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </h1>

      <motion.p
        className="vl-hero-sub"
        variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, ease: EASE, delay: tail }}
      >
        {L(HERO.sub)}
      </motion.p>

      <motion.div
        className="vl-hero-acts"
        variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, ease: EASE, delay: tail + 0.09 }}
      >
        <a href="#calc" className="vl-btn-signal">{L(UI.ctaCalc)}</a>
        <a href="#cases" className="vl-btn-ghost">{L(UI.viewCases)}</a>
      </motion.div>
    </motion.div>
  )
}
