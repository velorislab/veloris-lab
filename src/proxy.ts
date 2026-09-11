import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { LANG_COOKIE, langFromCountry, parseLangCookie, pathLang } from '@/site/geoLang'
import { twinPath } from '@/site/routing'

/**
 * Pick a language from the visitor's country, unless they already chose one.
 *
 * WHY A PROXY AND NOT A SCRIPT. The site is two static trees, English at `/`
 * and Russian at `/ru`. There is no Node process on GitHub Pages, and a client
 * fetch would paint the wrong tree first. Vercel attaches `x-vercel-ip-country`
 * to the request, so the swap can happen before HTML. The Pages export deletes
 * this file before building; see `.github/workflows/pages.yml`.
 *
 * Crawlers are left on the URL they asked for. hreflang already points at both
 * trees; a geo redirect would hide one of them from the crawler that happened
 * to come from the other country.
 *
 * 307, not 301: the same URL is English for Georgia and Russian for Kazakhstan,
 * and a cached permanent redirect would stick the first visitor's language to
 * the address for everybody behind that cache.
 */
export function proxy(request: NextRequest) {
  if (isCrawler(request.headers.get('user-agent'))) return NextResponse.next()

  const { pathname } = request.nextUrl
  const chosen = parseLangCookie(request.cookies.get(LANG_COOKIE)?.value)
  const implied = langFromCountry(
    request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry'),
  )
  const target = chosen ?? implied
  if (!target) return NextResponse.next()

  const current = pathLang(pathname)
  if (current === target) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = twinPath(pathname, target)
  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: [
    {
      /* Skip the files that are not a language tree: the crawler map, the
         sitemap, static assets. Prefetch is skipped so a language-switcher
         hover does not get rewritten into a redirect of the other tree. */
      source:
        '/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|llms\\.txt|images/).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}

function isCrawler(ua: string | null) {
  if (!ua) return false
  return /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|facebookexternalhit|linkedinbot|twitterbot|applebot|semrush|ahrefsbot|dotbot|mj12bot|gptbot|chatgpt|claudebot|anthropic|perplexity|bytespider|ccbot|lighthouse|pagespeed|google-inspection|pingdom|uptimerobot|headlesschrome/i.test(
    ua,
  )
}
