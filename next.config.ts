import type { NextConfig } from 'next'

/* =============================================================================
   TWO BUILDS OUT OF ONE CONFIG, and the split is behind an environment flag so
   the normal build is not touched by any of it.

   `PAGES_BUILD=1` produces a fully static export for GitHub Pages. Everything it
   turns on is a consequence of there being no Node process on the other side:

     output: 'export'      writes plain HTML into ./out instead of a server build.
     images.loader         the default image loader IS a server route, so the
                           export needs its own. NOT `unoptimized: true`, which
                           is the obvious answer and the wrong one: it bypasses
                           the loader, and the loader is what prepends basePath,
                           so every SVG on the site 404s the moment it is served
                           from a subpath. See image-loader.ts.
     trailingSlash         Pages resolves a URL to a directory, so /solutions/booking
                           has to be written as solutions/booking/index.html.
                           Without it the export writes booking.html and every
                           inner route 404s.
     basePath/assetPrefix  the repo is velorislab/veloris-lab, so Pages serves it
                           from /veloris-lab rather than from the root. Next
                           rewrites Link and next/image with this automatically,
                           which is the only reason this works at all: there is
                           not one raw <img src="/..."> or CSS url(/...) in the
                           project, checked before adding this.

   WHAT STILL HAS TO BE PASSED IN, because a static export bakes it at build time
   and there is no runtime to read it later:

     NEXT_PUBLIC_SITE_URL   every canonical, hreflang, sitemap entry and llms.txt
                            URL comes from this. Leave it unset and the export
                            ships localhost links to the public web.
     NEXT_PUBLIC_BASE_PATH  the subpath, kept separate from SITE_URL because one
                            is an origin and the other is a prefix.

   The Vercel build reads none of this and behaves exactly as before.

   ONE KNOWN DEFECT, MEASURED AND ACCEPTED. On the export, hovering a link makes
   Next request a per-segment prefetch payload that the export does not write:
   it asks for `__next.!KHJ1KQ.ru.txt` and the export produced
   `__next.!KHJ1KQ.txt`. Those requests 404. Navigation is unaffected, verified by
   clicking through the served export: the router falls back to loading the page
   normally and lands on the right URL. It is console noise on a temporary preview
   host, and the only real fixes are `prefetch = 'force-disabled'` in the root
   layout or `prefetch={false}` on every Link, both of which would slow the actual
   production site to tidy up a preview. Confirmed against the Next source: in
   export mode the router appends `.txt` to the URL because it cannot use response
   headers, and per-segment payloads are written into a separate directory.
   ========================================================================== */

const pagesBuild = process.env.PAGES_BUILD === '1'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    // Next 16 restricts this list to [75] by default and silently coerces any
    // other `quality` prop to the nearest allowed value, so 85 has to be
    // declared here or it never takes effect. The founder photograph is a
    // detailed street frame where 75 shows blocking in the cobbles and the
    // brickwork; nothing else on the page is a photograph.
    qualities: [75, 85],
    // Only on the export. See image-loader.ts for why this is a loader rather
    // than `unoptimized: true`.
    ...(pagesBuild ? { loader: 'custom' as const, loaderFile: './image-loader.ts' } : {}),
  },
  ...(pagesBuild
    ? {
        output: 'export' as const,
        trailingSlash: true,
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {}),
}

export default config
