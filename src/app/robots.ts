import type { MetadataRoute } from 'next'
import { SITE_URL } from '../site/routing'

/* Required by `output: 'export'`, which refuses to collect a metadata route
   without it, and a no-op on the server build. `llms.txt` next door already
   carried the same line for the same reason. */
export const dynamic = 'force-static'

/**
 * GitHub Pages at sexyai.studio is the production host, so this file allows
 * crawling and points at the sitemap. Canonicals, hreflang and JSON-LD still
 * hang off NEXT_PUBLIC_SITE_URL, which the Pages workflow sets to that origin.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
