import type { Metadata, Viewport } from 'next'
import { SITE_URL, type LabLang } from './routing'
import { clashGrotesk, instrumentSans, manrope } from '@/lib/fonts'
import '@/app/globals.css'

/**
 * Shared body of both root layouts.
 *
 * The App Router only lets `<html>` be rendered by a root layout, and this site
 * needs a truthful `lang` attribute per language. So each language sits in its
 * own route group with its own root layout, and both call this. Anything else
 * would ship the Russian page declaring itself English.
 *
 * The three font variables and the stylesheet are the template's; see
 * `src/lib/fonts.ts` for why two of the three faces are not the ones it
 * shipped with.
 */

export const sharedMetadata: Metadata = { metadataBase: new URL(SITE_URL) }

export const sharedViewport: Viewport = { themeColor: '#f6f7f9', colorScheme: 'light' }

export default function RootShell({ lang, children }: { lang: LabLang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${clashGrotesk.variable} ${instrumentSans.variable} ${manrope.variable}`}>
      <body>
        {/* Tailwind's own visually-hidden pair, not the old `.vl-skip`: that
            class lived in lab.css, which these pages no longer load, so the
            link was rendering in the top-left corner of every page. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-pill focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          {lang === 'ru' ? 'Перейти к содержанию' : 'Skip to content'}
        </a>
        {children}
      </body>
    </html>
  )
}
