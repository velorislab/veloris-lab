/**
 * Routing and absolute URLs for the standalone bureau site.
 *
 * In the SwiftIn monorepo this page lived at /lab under a shared [lang] segment
 * and borrowed that app's i18n helpers. Standing alone, the bureau owns its
 * root: English is `/`, Russian is `/ru`. This module is the only thing that
 * knows that, so changing the URL shape is a one-file edit.
 */

// The language union lives with the copy it indexes, so there is only ever one
// definition of it to keep in sync.
import type { LabLang } from './labData'

export type { LabLang }

export const LANGS: LabLang[] = ['en', 'ru']

/**
 * Absolute origin, used for canonicals, hreflang and JSON-LD. Set
 * NEXT_PUBLIC_SITE_URL in the environment before deploying; the fallback is a
 * localhost value on purpose, so a missing variable shows up as obviously wrong
 * URLs in the markup rather than silently shipping someone else's domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

/** Path for a language: `/` for English, `/ru` for Russian. */
export function localizedHref(lang: LabLang): string {
  return lang === 'en' ? '/' : `/${lang}`
}

/** Absolute URL for a language. */
export function localizedUrl(lang: LabLang): string {
  return lang === 'en' ? `${SITE_URL}/` : `${SITE_URL}/${lang}`
}

/** hreflang map for <link rel="alternate">, plus x-default on English. */
export function buildAlternates(lang: LabLang) {
  return {
    canonical: localizedUrl(lang),
    languages: {
      en: localizedUrl('en'),
      ru: localizedUrl('ru'),
      'x-default': localizedUrl('en'),
    },
  }
}
