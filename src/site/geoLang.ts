import type { LabLang } from './labData'

/**
 * Which language the IP implies, and the cookie that outranks it.
 *
 * English is the site's default URL (`/`). Russian is a prefix (`/ru`). A
 * visitor from a Russian-speaking country who types the domain would otherwise
 * land on English every time; this table is what sends them to `/ru` instead.
 *
 * Georgia is English on purpose. It is next to the rest of this list and is
 * still not on it: the founder named it with Europe and America, not with
 * Russia and Kazakhstan.
 *
 * The cookie is only written by the language switcher. Geo never sets it, so a
 * shared `/ru/...` link still opens in Russian for someone in the US until they
 * click `en` themselves, and the other way around.
 */
export const LANG_COOKIE = 'sas-lang'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/** ISO 3166-1 alpha-2, as `x-vercel-ip-country` sends them. */
const RU_COUNTRIES = new Set([
  'RU',
  'UA',
  'BY',
  'KZ',
  'KG',
  'UZ',
  'TJ',
  'TM',
  'AM',
  'AZ',
])

export function pathLang(pathname: string): LabLang {
  return /^\/ru(?=\/|$)/.test(pathname) ? 'ru' : 'en'
}

export function parseLangCookie(value: string | undefined): LabLang | null {
  return value === 'en' || value === 'ru' ? value : null
}

/** `null` when the host did not tell us a country, so the URL is left alone. */
export function langFromCountry(country: string | null | undefined): LabLang | null {
  if (!country) return null
  const code = country.toUpperCase()
  if (code === 'XX' || code === 'T1') return null
  return RU_COUNTRIES.has(code) ? 'ru' : 'en'
}

export function persistLang(lang: LabLang) {
  document.cookie = `${LANG_COOKIE}=${lang}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
}
