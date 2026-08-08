'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useHydrated } from './useHydrated'

/**
 * A stroke that draws itself as you scroll into the close.
 *
 * Two things make this effect work, and it took three tries to get both at
 * once. The first is TRAVEL: the pattern it comes from gives the line most of a
 * screen-height to unwind through, so squeezed into a short block it reads as a
 * static hairline. The second is ROOM. The previous version had the travel but
 * ran the line as a layer behind the last four sections, and those sections are
 * opaque cards, so about four fifths of the path was covered and what showed
 * through the gaps between them was disconnected arcs. It looked like a
 * rendering artefact. Putting it over the content instead is not an option
 * either: a sixteen-pixel line across body copy is not a decoration.
 *
 * So it gets a band to itself, full-bleed, between the questions and the call
 * to action. Nothing competes with it there, which is also why it can be drawn
 * at full strength instead of the ghost opacity the layered version needed. The
 * path ends heading down and slightly left, aimed into the CTA below: the line
 * is a run-in, not an ornament parked in the margin.
 *
 * `preserveAspectRatio="none"` maps the path onto whatever height the band
 * resolves to, and `vector-effect="non-scaling-stroke"` keeps the width even
 * while that stretching happens.
 *
 * Decorative: aria-hidden and never intercepts a pointer. Reduced motion gets
 * the finished line, because the drawing is the decoration and the line is the
 * composition.
 */
export default function ScrollStroke() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  /* The scroll-linked value is attached only after hydration. `useReducedMotion`
     reads nothing on the server, so branching the rendered `style` on it wrote
     dash attributes server-side and a plain `pathLength` client-side, which React
     reported as attributes it could not patch. With no style until hydration the
     server sends the finished line, which is also the correct still version. */
  const hydrated = useHydrated()

  // Starts when the band's top reaches the bottom of the viewport, finishes as
  // its bottom reaches the middle. Ending on `center` rather than `end` matters
  // twice: it stretches the draw over the band's height plus half a screen
  // instead of the height alone, and it lands the last stroke just as the call
  // to action comes into view. Both ends stay reachable by ordinary scrolling,
  // which an earlier version got wrong: anchored near the page bottom it
  // stalled around 0.9 and never finished.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end center'] })
  const drawn = useTransform(scrollYProgress, [0, 0.9], [0, 1])

  return (
    <div className="vl-runway" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 1200 900" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          // A descent with two knots in it. The knots are the character;
          // without them this is a divider, not a gesture.
          d="M 1080 -40
             C 1080 120, 900 170, 780 220
             C 660 270, 610 360, 690 415
             C 770 470, 890 430, 880 345
             C 872 275, 760 262, 730 330
             C 680 440, 720 560, 600 615
             C 470 675, 320 610, 340 505
             C 356 420, 480 425, 494 517
             C 512 620, 400 700, 366 800
             C 344 872, 332 902, 326 980"
          stroke="var(--accent)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={hydrated && !reduce ? { pathLength: drawn } : undefined}
        />
      </svg>
    </div>
  )
}
