import { type LabLang, tx, FAQ } from './labData'

/**
 * The FAQ as a two-column index.
 *
 * This was a pair of card rows drifting in opposite directions, and it was
 * wrong on both counts. Movement fights the only thing an FAQ is for, which is
 * finding your own question, so the reader had to wait for their answer to come
 * back around. And the loop needed every question in the DOM four times, which
 * meant hiding the visible text from assistive tech and re-exposing all ten
 * pairs through a parallel list.
 *
 * Static, it is just a description list: each question said once, in source
 * order, to every reader at the same time. The ruled two-column layout is doing
 * the work the motion was pretending to do, giving the block a silhouette the
 * sections above it do not have.
 */
export default function Faq({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <dl className="vl-faq">
      {FAQ.flat().map((item, i) => (
        <div className="vl-faq-item" key={i}>
          <dt className="vl-faq-q">{L(item.q)}</dt>
          <dd className="vl-faq-a">{L(item.a)}</dd>
        </div>
      ))}
    </dl>
  )
}
