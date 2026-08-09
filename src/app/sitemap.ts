import type { MetadataRoute } from 'next'
import { LANGS, localizedUrl, serviceUrl, caseUrl, pricingUrl } from '../site/routing'
import { SERVICE_PAGES } from '../site/servicePages'
import { CASE_PAGES } from '../site/casePages'

/**
 * Every URL the site has, both locales, each carrying its own hreflang set.
 *
 * Generated rather than listed. Twenty-two hand-written entries would go stale
 * the first time a slug moved, and a sitemap that points at a 404 is worse than
 * no sitemap: it is a promise a crawler checks.
 *
 * NOTE ON ABSOLUTE URLS. Everything here hangs off NEXT_PUBLIC_SITE_URL, which
 * falls back to localhost on purpose. If this ships with localhost URLs in it,
 * the variable was not set, and that is the intended way to find out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const alt = (fn: (l: (typeof LANGS)[number]) => string) => ({
    languages: Object.fromEntries(LANGS.map((l) => [l, fn(l)])),
  })

  const entries: MetadataRoute.Sitemap = []

  for (const lang of LANGS) {
    entries.push({
      url: localizedUrl(lang),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: alt(localizedUrl),
    })
    entries.push({
      url: pricingUrl(lang),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: alt(pricingUrl),
    })
    for (const p of SERVICE_PAGES) {
      entries.push({
        url: serviceUrl(lang, p.slug),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: alt((l) => serviceUrl(l, p.slug)),
      })
    }
    for (const c of CASE_PAGES) {
      entries.push({
        url: caseUrl(lang, c.slug),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: alt((l) => caseUrl(l, c.slug)),
      })
    }
  }

  return entries
}
