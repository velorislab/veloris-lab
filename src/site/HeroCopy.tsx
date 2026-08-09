'use client'

import { Fragment } from 'react'
import { motion } from 'motion/react'
import { type LabLang, tx, UI, HERO, CALC } from './labData'
import { WORK_TYPES, money, priced } from './labPricing'
import { pricingPath } from './routing'

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
  /* ONE TREE, ALWAYS. There used to be an `if (useReducedMotion())` here that
     returned a plain headline instead of the word-by-word one, and it was a
     hydration bug: that hook has nothing to read on the server, so the server
     always rendered the animated markup and a client with reduced motion
     rendered the plain markup, and React threw the whole subtree away and
     rebuilt it. Nothing in the DOM may depend on that hook.

     Reduced motion is handled in CSS instead, where server and client cannot
     disagree: the media query neutralises the word transform with `!important`,
     which outranks the inline style Motion writes. The words simply start where
     they finish. */

  /* The last word carries a light plaque, the way the pinned reference marks its
     final word. Same typeface, not a serif swapped in: a foreign family injected
     into one word of a sans headline is the tell, the plaque is the effect. */
  /* The shortest first-version window on the price table. Read, not typed, so
     it moves with labPricing like every other figure on the page. */
  const fastest = Math.min(...WORK_TYPES.map((t) => t.weeks[0]))

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
                /* The plaque rides the same clipping box as the reveal, so it
                   wipes up with its word instead of sitting there waiting. */
                className={i === words.length - 1 ? 'vl-word-mark' : undefined}
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
        {/* The secondary used to be an in-page jump to #cases, which the nav,
            the section itself and four card links already reach. It now leaves
            for the price list, which had exactly two links on the whole home
            page, at y=5,503 and y=10,863 of a 10,937px document. This is the
            only route to it that is in the first fold at every viewport. */}
        <a href={pricingPath(lang)} className="vl-btn-ghost">{L(UI.priceList)}</a>

        {/* THE FOLD CARRIES A NUMBER AND A CLOCK.
            Both are floors read straight out of labPricing: the cheapest of the
            six starting figures, and the shortest first-version window on the
            table. Nothing here is typed, so repricing moves the hero with
            everything else, and neither figure can drift from the calculator
            three screens down. */}
        <span className="vl-hero-floor">
          {L(UI.heroFloor)} {money(priced(Math.min(...WORK_TYPES.map((t) => t.from))))}{' '}
          <span className="vl-hero-floor-sep" aria-hidden="true">·</span>{' '}
          {L(UI.heroSpeed)} {fastest} {L(fastest === 1 ? CALC.weekShortOne : CALC.weeksShort)}
        </span>
      </motion.div>
    </motion.div>
  )
}
