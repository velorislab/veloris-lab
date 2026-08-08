import type { Metadata, Viewport } from 'next'
import { SITE_URL, type LabLang } from './routing'

/**
 * Shared body of both root layouts.
 *
 * The App Router only lets `<html>` be rendered by a root layout, and this site
 * needs a truthful `lang` attribute per language. So each language sits in its
 * own route group with its own root layout, and both call this. Anything else
 * would ship the Russian page declaring itself English.
 *
 * There is deliberately no shared chrome here: the bureau page brings its own
 * nav, footer, fonts and scoped CSS.
 */

export const sharedMetadata: Metadata = { metadataBase: new URL(SITE_URL) }

export const sharedViewport: Viewport = { themeColor: '#0f1614', colorScheme: 'light' }

export default function RootShell({ lang, children }: { lang: LabLang; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}
