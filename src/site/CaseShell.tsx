import { Inter, JetBrains_Mono } from 'next/font/google'
import CasePageBody from './CasePage'
import { DIRECTION_CONTRACT, NOSCRIPT_CSS, caseJsonLd } from './meta'
import type { CasePage } from './casePages'
import type { LabLang } from './routing'

/** Wrapper for one case page. Mirrors Page.tsx and ServiceShell.tsx. */

const fontSans = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-vl-sans', display: 'swap' })
const fontMono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-vl-mono', display: 'swap' })

export default function CaseShell({ lang, page }: { lang: LabLang; page: CasePage }) {
  return (
    <div className={`${fontSans.variable} ${fontMono.variable}`}>
      <div dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
      <noscript><style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} /></noscript>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd(lang, page)) }}
      />
      <CasePageBody lang={lang} page={page} />
    </div>
  )
}
