import { type LabLang, tx, PROCESS } from './labData'

const pad2 = (n: number) => String(n).padStart(2, '0')

/**
 * The process as a list of rolling headings.
 *
 * On hover the step name rolls up to a second copy of itself in the accent, and
 * the row's hairline fills left to right. Two gestures, one meaning: a step
 * advancing. This is the page's one hover set-piece, so it runs at 0.5s against
 * the system's usual 0.16s; that exception is deliberate and recorded.
 *
 * Adapted from a rolling-list pattern that reveals an Unsplash photo on hover.
 * The photo is gone on purpose: generic stock imagery of people at laptops is
 * the fastest way to make a page look templated, which is the opposite of what
 * this section is for. The reveal had to be something we can actually mean.
 *
 * Hover-only by nature, so the resting state is complete on its own: name,
 * number and description are all visible without interaction, which is also
 * what makes it work on touch.
 *
 * Pure CSS, no client JS.
 */
export default function RollingSteps({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <ol className="vl-roll">
      {PROCESS.map((s, i) => (
        <li className="vl-roll-row" key={i}>
          <span className="vl-roll-n">{pad2(i + 1)}</span>

          <span className="vl-roll-word">
            <span className="vl-roll-stack">
              <span className="vl-roll-face">{L(s.t)}</span>
              {/* The second face is the same word; aria-hidden so the step is
                  announced once. */}
              <span className="vl-roll-face vl-roll-face-on" aria-hidden="true">{L(s.t)}</span>
            </span>
          </span>

          <span className="vl-roll-d">{L(s.d)}</span>
        </li>
      ))}
    </ol>
  )
}
