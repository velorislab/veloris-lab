import { type LabLang, tx, TOOLS } from './labData'

/**
 * Bordered grid of the tools we build with.
 *
 * The structure is the logo-cloud pattern: one shared hairline between cells, a
 * checkerboard of alternating surfaces, and a small plus drawn at every
 * interior intersection. Rebuilt in this project's own CSS rather than lifted:
 * no Tailwind here, no icon package, and no external logo CDN.
 *
 * Cells render a wordmark today. Give a TOOLS entry a `logo` path and that cell
 * switches to the mark without any change here.
 *
 * Server component: nothing about it is interactive.
 */
export default function ToolGrid({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    // The full-bleed top and bottom rules are ::before / ::after on the grid,
    // not elements. As real children they were still counted by :nth-child even
    // though they were absolutely positioned, which shifted the checkerboard
    // and the plus marks by one cell.
    <div className="vl-cloud">
      {TOOLS.map((t) => (
        <div className="vl-cloud-cell" key={t.name}>
          {t.logo
            // eslint-disable-next-line @next/next/no-img-element
            ? <img className="vl-cloud-logo" src={t.logo} alt={t.name} height={20} />
            : <span className="vl-cloud-name">{t.name}</span>}
          <span className="vl-cloud-note">{L(t.note)}</span>
          <svg className="vl-cloud-plus" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M6 0v12M0 6h12" />
          </svg>
        </div>
      ))}
    </div>
  )
}
