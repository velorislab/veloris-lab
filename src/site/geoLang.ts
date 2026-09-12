import type { LabLang } from './labData'

/**
 * Which language a first visit opens in, and the cookie that outranks it.
 *
 * Russian is the site's default. English still lives at the unprefixed URLs
 * (`/`, `/pricing`); Russian keeps the `/ru` prefix. A visitor who types the
 * domain lands on `/ru` unless they already chose English or they are in an
 * English-primary country.
 *
 * The cookie is only written by the language switcher. Geo never sets it, so a
 * shared `/pricing` link still opens in English for someone who picked `en`,
 * and a shared `/ru/...` link stays Russian until they click `en` themselves.
 */
export const LANG_COOKIE = 'sas-lang'

/** First visit with no cookie and no country signal. */
export const DEFAULT_LANG: LabLang = 'ru'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/** ISO 3166-1 alpha-2, as `x-vercel-ip-country` sends them. */
const EN_COUNTRIES = new Set(['US', 'GB', 'AU', 'CA', 'NZ', 'IE'])

export function pathLang(pathname: string): LabLang {
  return /^\/ru(?=\/|$)/.test(pathname) ? 'ru' : 'en'
}

export function parseLangCookie(value: string | undefined): LabLang | null {
  return value === 'en' || value === 'ru' ? value : null
}

/** `null` when the host did not tell us a country, so the default language is used. */
export function langFromCountry(country: string | null | undefined): LabLang | null {
  if (!country) return null
  const code = country.toUpperCase()
  if (code === 'XX' || code === 'T1') return null
  return EN_COUNTRIES.has(code) ? 'en' : 'ru'
}

export function persistLang(lang: LabLang) {
  document.cookie = `${LANG_COOKIE}=${lang}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
}
