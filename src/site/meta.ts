import type { Metadata } from 'next'
import { BRAND, EMAIL, TELEGRAM, LINKEDIN, SERVICES, tx } from './labData'
import { buildAlternates, buildServiceAlternates, localizedUrl, serviceUrl, type LabLang } from './routing'
import { SERVICE_PAGES, type ServicePage } from './servicePages'
import { WORK_TYPES, money, priced } from './labPricing'

/**
 * Everything both language routes share: metadata, JSON-LD, and the two raw
 * style blocks the page injects. Kept out of the route files so `/` and `/ru`
 * stay three lines each and cannot drift apart.
 */

export const TITLE: Record<LabLang, string> = {
  en: 'Veloris Lab, AI development and automation bureau',
  ru: 'Veloris Lab, бюро AI-разработки и автоматизации',
}

export const DESC: Record<LabLang, string> = {
  en: 'Veloris Lab is an engineering bureau building AI agents, automation, integrations and data pipelines end to end, from scoping to production and support.',
  ru: 'Veloris Lab, инженерное бюро: AI-агенты, автоматизация, интеграции и пайплайны данных под ключ, от разбора задачи до прода и поддержки.',
}

export function labMetadata(lang: LabLang): Metadata {
  const url = localizedUrl(lang)
  return {
    title: TITLE[lang],
    description: DESC[lang],
    alternates: buildAlternates(lang),
    openGraph: {
      type: 'website',
      title: TITLE[lang],
      description: DESC[lang],
      url,
      siteName: BRAND,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title: TITLE[lang], description: DESC[lang] },
    robots: { index: true, follow: true },
  }
}

/**
 * Organization plus a service catalogue built from the same SERVICES array the
 * page renders, so the structured data can never claim something the page does
 * not offer.
 */
export function orgJsonLd(lang: LabLang) {
  const url = localizedUrl(lang)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    name: BRAND,
    url,
    description: DESC[lang],
    email: EMAIL,
    owns: {
      '@type': 'SoftwareApplication',
      name: 'Swiftin',
      url: 'https://swiftin.dev/',
      applicationCategory: 'BrowserApplication',
    },
    founder: {
      '@type': 'Person',
      name: 'Denys Kandyba',
      jobTitle: 'Forward Deployed Engineer',
      url: 'https://swiftin.dev/about',
    },
    knowsLanguage: ['ru', 'uk', 'en'],
    sameAs: [LINKEDIN, TELEGRAM],
    makesOffer: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: tx(s.t, lang), description: tx(s.d, lang) },
    })),
  }
}

/**
 * Direction contract. Emitted as a real HTML comment so it survives the
 * production build and can be audited in the shipped markup.
 */
export const DIRECTION_CONTRACT = `<!--
THESIS: a technical page that opens on one dark, textured band carrying the
offer and a table of checkable facts. Refuses the glossy all-white agency
landing and the neon dark-SaaS template alike.
OWN-WORLD: grey ground #ececed, white cards on shared hairlines, one dark
surface repeated three times (#0f1614), signal green #0e7c66 on light and
#35debc on dark. Inter for prose, JetBrains Mono for every label and number.
Sharp 4px corners, nothing is a pill.
STORY: a founder sees an operator who ships, priced before the first call.
FIRST VIEWPORT: dark band, 58px headline left, facts table and pipeline right,
primary action a filled green button.
FORM: pinned by the founder's brief (a starter-kit reference); system taken,
identity derived. No concept roll: a pinned direction beats it.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md.
-->`

/**
 * Motion writes its `initial` styles into the server HTML, so without this the
 * headline would stay invisible for any client that never runs the JS.
 */
export const NOSCRIPT_CSS = `
.vl-root [style*="opacity:0"], .vl-root [style*="opacity: 0"],
.vl-word > span { opacity: 1 !important; transform: none !important; }
`

/* ---------------------------------------------------------------------------
   Service pages.
   --------------------------------------------------------------------------- */

/**
 * Title and description for one service page.
 *
 * The price goes in both, because these pages exist to be found by somebody
 * typing "how much does X cost". It is read from labPricing rather than written
 * here, so a repricing cannot leave twelve `<title>` tags behind saying the old
 * figure while the page under them says the new one.
 */
export function serviceMetadata(lang: LabLang, page: ServicePage): Metadata {
  const svc = SERVICES.find((x) => x.key === page.key)
  const work = WORK_TYPES.find((w) => w.key === page.key)
  const name = tx(svc?.t, lang)
  const from = work ? money(priced(work.from)) : ''
  const title = lang === 'ru'
    ? `${name} на заказ, от ${from} — ${BRAND}`
    : `${name}, from ${from} — ${BRAND}`
  const description = `${tx(svc?.d, lang)} ${tx(page.priceDrivers, lang)}`.slice(0, 300)
  const url = serviceUrl(lang, page.slug)
  return {
    title,
    description,
    alternates: buildServiceAlternates(lang, page.slug),
    openGraph: { type: 'article', title, description, url, siteName: BRAND },
  }
}

/** Service + Offer + BreadcrumbList for one service page. */
export function serviceJsonLd(lang: LabLang, page: ServicePage) {
  const svc = SERVICES.find((x) => x.key === page.key)
  const work = WORK_TYPES.find((w) => w.key === page.key)
  const url = serviceUrl(lang, page.slug)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: tx(svc?.t, lang),
      description: tx(svc?.d, lang),
      url,
      provider: { '@type': 'Organization', name: BRAND, url: localizedUrl(lang) },
      areaServed: 'Worldwide',
      ...(work
        ? {
            offers: {
              '@type': 'Offer',
              // `price` here is a floor, which is exactly what lowPrice means.
              // Publishing it as `price` would assert a fixed figure we do not
              // quote anywhere else on the site.
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: priced(work.from),
                priceCurrency: 'USD',
              },
              availability: 'https://schema.org/InStock',
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: BRAND, item: localizedUrl(lang) },
        { '@type': 'ListItem', position: 2, name: tx(svc?.t, lang), item: url },
      ],
    },
  ]
}

/** Every service slug, for generateStaticParams on both locales. */
export const SERVICE_SLUGS = SERVICE_PAGES.map((p) => ({ slug: p.slug }))
