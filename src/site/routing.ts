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

/* ---------------------------------------------------------------------------
   Service pages. English keeps the bare root, so `/services/<slug>`; Russian
   keeps its prefix, so `/ru/services/<slug>`. Same rule as the home route, and
   this file stays the only place that knows it.
   --------------------------------------------------------------------------- */

export function servicePath(lang: LabLang, slug: string): string {
  return lang === 'en' ? `/services/${slug}` : `/${lang}/services/${slug}`
}

export function serviceUrl(lang: LabLang, slug: string): string {
  return `${SITE_URL}${servicePath(lang, slug)}`
}

/** hreflang map for one service page, plus x-default on English. */
export function buildServiceAlternates(lang: LabLang, slug: string) {
  return {
    canonical: serviceUrl(lang, slug),
    languages: {
      en: serviceUrl('en', slug),
      ru: serviceUrl('ru', slug),
      'x-default': serviceUrl('en', slug),
    },
  }
}

/* Solution pages, same shape as the service ones. The hub has its own pair
   because it is a real page rather than an index of slugs. */

export function solutionsPath(lang: LabLang): string {
  return lang === 'en' ? '/solutions' : `/${lang}/solutions`
}

export function solutionsUrl(lang: LabLang): string {
  return `${SITE_URL}${solutionsPath(lang)}`
}

export function buildSolutionsAlternates(lang: LabLang) {
  return {
    canonical: solutionsUrl(lang),
    languages: {
      en: solutionsUrl('en'),
      ru: solutionsUrl('ru'),
      'x-default': solutionsUrl('en'),
    },
  }
}

export function solutionPath(lang: LabLang, slug: string): string {
  return lang === 'en' ? `/solutions/${slug}` : `/${lang}/solutions/${slug}`
}

export function solutionUrl(lang: LabLang, slug: string): string {
  return `${SITE_URL}${solutionPath(lang, slug)}`
}

export function buildSolutionAlternates(lang: LabLang, slug: string) {
  return {
    canonical: solutionUrl(lang, slug),
    languages: {
      en: solutionUrl('en', slug),
      ru: solutionUrl('ru', slug),
      'x-default': solutionUrl('en', slug),
    },
  }
}

/* Case pages, same shape as the service ones. */

export function casePath(lang: LabLang, slug: string): string {
  return lang === 'en' ? `/cases/${slug}` : `/${lang}/cases/${slug}`
}

export function caseUrl(lang: LabLang, slug: string): string {
  return `${SITE_URL}${casePath(lang, slug)}`
}

export function buildCaseAlternates(lang: LabLang, slug: string) {
  return {
    canonical: caseUrl(lang, slug),
    languages: {
      en: caseUrl('en', slug),
      ru: caseUrl('ru', slug),
      'x-default': caseUrl('en', slug),
    },
  }
}

/* The pricing page. A fixed path rather than a segment, so it needs no params. */

export function pricingPath(lang: LabLang): string {
  return lang === 'en' ? '/pricing' : `/${lang}/pricing`
}

export function pricingUrl(lang: LabLang): string {
  return `${SITE_URL}${pricingPath(lang)}`
}

export function buildPricingAlternates(lang: LabLang) {
  return {
    canonical: pricingUrl(lang),
    languages: {
      en: pricingUrl('en'),
      ru: pricingUrl('ru'),
      'x-default': pricingUrl('en'),
    },
  }
}

/**
 * The same page in the other language, worked out from the path itself.
 *
 * The language switcher used to be handed a callback by whatever page rendered
 * the header. That stopped being possible the moment the header became a client
 * component: functions are not serializable across that boundary, and the build
 * failed on the case pages with exactly that error.
 *
 * A path is serializable, and a client component can read its own. Since every
 * route on this site is either `/x` or `/ru/x`, crossing is a prefix operation
 * and needs no per-page knowledge at all. That also means a route added later
 * gets a working switcher without anybody remembering to wire one.
 */
/** The path with any locale prefix removed: `/ru/pricing` becomes `/pricing`. */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/ru(?=\/|$)/, '') || '/'
}

export function twinPath(pathname: string, to: LabLang): string {
  const bare = stripLocale(pathname)
  if (to === 'en') return bare
  return bare === '/' ? '/ru' : `/ru${bare}`
}
