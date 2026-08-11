import type { MetadataRoute } from 'next'
import { LANGS, localizedUrl, serviceUrl, caseUrl, pricingUrl, solutionUrl, solutionsUrl } from '../site/routing'
import { SERVICE_PAGES } from '../site/servicePages'
import { CASE_PAGES } from '../site/casePages'
import { SOLUTIONS } from '../site/solutions'

/* Required by `output: 'export'`, which refuses to collect a metadata route
   without it, and a no-op on the server build. `llms.txt` next door already
   carried the same line for the same reason. */
export const dynamic = 'force-static'

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
    /* The solutions hub and every scenario under it. Priority sits between the
       service pages and the cases: these are the pages a search actually lands
       on, and there are more of them than of anything else here. */
    entries.push({
      url: solutionsUrl(lang),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: alt(solutionsUrl),
    })
    for (const s of SOLUTIONS) {
      entries.push({
        url: solutionUrl(lang, s.slug),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: alt((l) => solutionUrl(l, s.slug)),
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
