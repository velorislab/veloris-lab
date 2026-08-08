import { Inter, JetBrains_Mono } from 'next/font/google'
import Lab from './Lab'
import { DIRECTION_CONTRACT, NOSCRIPT_CSS, orgJsonLd } from './meta'
import type { LabLang } from './routing'

/**
 * The whole surface for one language. Both routes render this; only the `lang`
 * differs.
 *
 * Two families: Inter carries prose, JetBrains Mono is the technical voice for
 * every label, tag, number and step marker. The cyrillic subsets are
 * load-bearing, without them the Russian page falls back to a system face.
 */

const fontSans = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-vl-sans', display: 'swap' })
const fontMono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-vl-mono', display: 'swap' })

export default function LabPage({ lang }: { lang: LabLang }) {
  return (
    <div className={`${fontSans.variable} ${fontMono.variable}`}>
      <div dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
      <noscript><style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} /></noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(lang)) }} />
      <Lab lang={lang} />
    </div>
  )
}
