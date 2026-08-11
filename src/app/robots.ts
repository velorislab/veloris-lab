import type { MetadataRoute } from 'next'
import { SITE_URL } from '../site/routing'

/* Required by `output: 'export'`, which refuses to collect a metadata route
   without it, and a no-op on the server build. `llms.txt` next door already
   carried the same line for the same reason. */
export const dynamic = 'force-static'

/**
 * NOINDEX ON THE GITHUB PAGES BUILD, and this is the whole reason the flag is
 * read here as well as in next.config.
 *
 * A Pages export is a second public copy of every page on the site, at a
 * different origin, with the same text. Left crawlable it competes with the real
 * domain for its own content and a search engine picks the winner, not us. So the
 * temporary copy asks not to be indexed, and only the real deployment allows
 * crawling.
 *
 * It is `disallow: '/'` rather than a meta tag because a static export has no
 * per-page hook to add one, and robots.txt is the one file this build can still
 * decide the contents of.
 */
const pagesBuild = process.env.PAGES_BUILD === '1'

export default function robots(): MetadataRoute.Robots {
  if (pagesBuild) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
