import { Inter, JetBrains_Mono } from 'next/font/google'
import ServicePageBody from './ServicePage'
import { DIRECTION_CONTRACT, NOSCRIPT_CSS, serviceJsonLd } from './meta'
import type { ServicePage } from './servicePages'
import type { LabLang } from './routing'

/**
 * The wrapper for one service page: fonts, the two raw style blocks, and the
 * Service + BreadcrumbList payload. Mirrors Page.tsx so the two page kinds
 * cannot drift on the parts that are not their content.
 */

const fontSans = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-vl-sans', display: 'swap' })
const fontMono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-vl-mono', display: 'swap' })

export default function ServiceShell({ lang, page }: { lang: LabLang; page: ServicePage }) {
  return (
    <div className={`${fontSans.variable} ${fontMono.variable}`}>
      <div dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
      <noscript><style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} /></noscript>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(lang, page)) }}
      />
      <ServicePageBody lang={lang} page={page} />
    </div>
  )
}
