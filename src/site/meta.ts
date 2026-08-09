import type { Metadata } from 'next'
import { BRAND, EMAIL, TELEGRAM, LINKEDIN, SERVICES, UI, CALC, tx } from './labData'
import { buildAlternates, buildServiceAlternates, buildCaseAlternates, localizedUrl, serviceUrl, caseUrl, buildPricingAlternates, pricingUrl, type LabLang } from './routing'
import { SERVICE_PAGES, type ServicePage } from './servicePages'
import { CASE_PAGES, type CasePage } from './casePages'
import { CASES } from './labData'
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
    ? `${name} на заказ, от ${from} · ${BRAND}`
    : `${name}, from ${from} · ${BRAND}`
  /* COMPOSED, not concatenated and cut.
     This used to be `svc.d + ' ' + priceDrivers` sliced at 300, which served
     Google a sentence ending «…аккаунты, оплата и н» and spent its visible
     ~155 characters on an abstract capability line plus the opening of a
     price-drivers essay. It now leads with the reader's own situation, then
     the price, the window and the free scoping: the four things somebody
     typing "сколько стоит X" is actually deciding between.
     Every figure still comes from labPricing; the week unit is read from
     CALC rather than typed, so it stays localized. */
  const w = work ? `${work.weeks[0]}\u2013${work.weeks[1]} ${tx(CALC.weeksShort, lang)}` : ''
  const head = lang === 'ru'
    ? `${name} от ${from}${w ? `, срок ${w}` : ''}`
    : `${name} from ${from}${w ? `, ${w}` : ''}`
  /* The unit already ends in a full stop in Russian («нед.»), so the sentence
     terminator has to be added conditionally rather than unconditionally. */
  const free = lang === 'ru' ? 'Разбор задачи бесплатный.' : 'The scoping call is free.'
  const description = `${tx(page.when[0], lang)} ${head.replace(/\.$/, '')}. ${free}`.slice(0, 300)
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

/* ---------------------------------------------------------------------------
   Case pages.
   --------------------------------------------------------------------------- */

/** The CASES entry a case page describes, matched on the English title. */
export function caseFor(page: CasePage) {
  return CASES.find((c) => tx(c.title, 'en') === page.match)
}

export function caseMetadata(lang: LabLang, page: CasePage): Metadata {
  const c = caseFor(page)
  const name = tx(c?.title, lang)
  const title = lang === 'ru' ? `${name}, кейс · ${BRAND}` : `${name}, a case · ${BRAND}`
  const description = tx(c?.sub, lang)
  const url = caseUrl(lang, page.slug)
  return {
    title,
    description,
    alternates: buildCaseAlternates(lang, page.slug),
    openGraph: { type: 'article', title, description, url, siteName: BRAND },
  }
}

/** CreativeWork + BreadcrumbList. Not `Product`: none of these are for sale. */
export function caseJsonLd(lang: LabLang, page: CasePage) {
  const c = caseFor(page)
  const url = caseUrl(lang, page.slug)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: tx(c?.title, lang),
      abstract: tx(c?.sub, lang),
      url,
      creator: { '@type': 'Organization', name: BRAND, url: localizedUrl(lang) },
      keywords: (c?.tags ?? []).join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: BRAND, item: localizedUrl(lang) },
        { '@type': 'ListItem', position: 2, name: tx(c?.title, lang), item: url },
      ],
    },
  ]
}

export const CASE_SLUGS = CASE_PAGES.map((p) => ({ slug: p.slug }))

/* ---------------------------------------------------------------------------
   Pricing page.
   --------------------------------------------------------------------------- */

export function pricingMetadata(lang: LabLang): Metadata {
  const lowest = Math.min(...WORK_TYPES.map((w) => priced(w.from)))
  const title = lang === 'ru'
    ? `Цены на разработку и автоматизацию, от ${money(lowest)} · ${BRAND}`
    : `Development and automation pricing, from ${money(lowest)} · ${BRAND}`
  const description = lang === 'ru'
    ? `Шесть направлений с ценой, сроком и поддержкой. Каждое число это пол, а не смета; точную цифру фиксируем после бесплатного разбора задачи.`
    : `Six kinds of work with a floor, a timeline and a support figure. Every number is a floor rather than a quote; the binding figure is fixed after a free scoping call.`
  return {
    title,
    description,
    alternates: buildPricingAlternates(lang),
    openGraph: { type: 'website', title, description, url: pricingUrl(lang), siteName: BRAND },
  }
}

/**
 * OfferCatalog + BreadcrumbList for the price list.
 *
 * `minPrice` throughout, never `price`, for the same reason as on the service
 * pages: the site quotes floors and nothing else, and a `price` field would
 * assert a fixed figure that no page on this site is willing to stand behind.
 */
export function pricingJsonLd(lang: LabLang) {
  const url = pricingUrl(lang)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: lang === 'ru' ? `Цены · ${BRAND}` : `Pricing · ${BRAND}`,
      url,
      provider: { '@type': 'Organization', name: BRAND, url: localizedUrl(lang) },
      itemListElement: WORK_TYPES.map((w, i) => {
        const svc = SERVICES.find((x) => x.key === w.key)
        const page = SERVICE_PAGES.find((p) => p.key === w.key)
        return {
          '@type': 'Offer',
          position: i + 1,
          ...(page ? { url: serviceUrl(lang, page.slug) } : {}),
          itemOffered: {
            '@type': 'Service',
            name: tx(svc?.t ?? w.label, lang),
            ...(svc ? { description: tx(svc.d, lang) } : {}),
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: priced(w.from),
            priceCurrency: 'USD',
          },
          availability: 'https://schema.org/InStock',
        }
      }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: BRAND, item: localizedUrl(lang) },
        { '@type': 'ListItem', position: 2, name: tx(UI.navPricing, lang), item: url },
      ],
    },
  ]
}
