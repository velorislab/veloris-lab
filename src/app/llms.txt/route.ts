import { LANGS, localizedUrl, serviceUrl, caseUrl, pricingUrl, SITE_URL } from '../../site/routing'
import { SERVICE_PAGES } from '../../site/servicePages'
import { CASE_PAGES } from '../../site/casePages'
import { SERVICES, CASES, BRAND, EMAIL, TELEGRAM, tx } from '../../site/labData'
import { WORK_TYPES, money, priced } from '../../site/labPricing'

/**
 * /llms.txt, the plain-text map of the site for language models.
 *
 * Same discipline as the sitemap next door: generated, never hand-listed, so it
 * cannot drift from the pages it describes, and every figure in it is read from
 * labPricing.ts rather than typed.
 *
 * ONE THING IS WORTH SAYING TWICE, AND IT IS SAID HERE FIRST. A model reading
 * this file will quote the numbers in it back to somebody. So the line about
 * every price being a floor sits above the price list rather than under it, for
 * exactly the reason it sits above the fold on /pricing: a figure repeated
 * without its qualifier becomes a quote, and this is the file most likely to be
 * repeated without a qualifier.
 */

export const dynamic = 'force-static'

export function GET() {
  const L = <T,>(v: T) => tx(v as never, 'en')
  const lines: string[] = []
  const p = (s = '') => lines.push(s)

  p(`# ${BRAND}`)
  p()
  p('> An engineering bureau. AI development, automation and integrations, built by a small')
  p('> team that takes a task from scoping to production and stays on for support.')
  p('> Two languages, English and Russian; every page exists at both.')
  p()
  p('Every price below is a FLOOR, not a quote: it is what that kind of work starts at')
  p('when the task is clear. The binding figure is fixed after a free scoping call, which')
  p('can end with the bureau saying the thing is not worth building. Quoting any of these')
  p('numbers without that qualifier misrepresents them.')
  p()

  p('## Pricing')
  p()
  for (const w of WORK_TYPES) {
    const svc = SERVICES.find((s) => s.key === w.key)
    const page = SERVICE_PAGES.find((x) => x.key === w.key)
    const url = page ? serviceUrl('en', page.slug) : ''
    p(`- [${L(svc?.t ?? w.label)}](${url}): from ${money(priced(w.from))}, `
      + `${w.weeks[0]}-${w.weeks[1]} weeks, support from ${money(priced(w.support))}/mo. `
      + `${L(svc?.d ?? '')}`)
  }
  p()
  p(`Full price list, including the estimator's own readiness multipliers and the`)
  p(`add-on prices: ${pricingUrl('en')} (Russian: ${pricingUrl('ru')})`)
  p()

  p('## Services')
  p()
  for (const page of SERVICE_PAGES) {
    const svc = SERVICES.find((s) => s.key === page.key)
    p(`- [${L(svc?.t)}](${serviceUrl('en', page.slug)}): ${L(page.when[0])}`)
  }
  p()

  p('## Work')
  p()
  for (const c of CASE_PAGES) {
    const item = CASES.find((x) => tx(x.title, 'en') === c.match)
    p(`- [${L(item?.title)}](${caseUrl('en', c.slug)}): ${L(item?.sub)}`)
  }
  p()

  p('## Russian')
  p()
  p(`- [Home](${localizedUrl('ru')})`)
  p(`- [Pricing](${pricingUrl('ru')})`)
  for (const page of SERVICE_PAGES) {
    const svc = SERVICES.find((s) => s.key === page.key)
    p(`- [${tx(svc?.t, 'ru')}](${serviceUrl('ru', page.slug)})`)
  }
  for (const c of CASE_PAGES) {
    const item = CASES.find((x) => tx(x.title, 'en') === c.match)
    p(`- [${tx(item?.title, 'ru')}](${caseUrl('ru', c.slug)})`)
  }
  p()

  p('## Contact')
  p()
  p(`- Telegram: ${TELEGRAM}`)
  p(`- Email: ${EMAIL}`)
  p(`- Languages worked in: Russian, Ukrainian, English. Timezone UTC+4.`)
  p()
  p(`## Machine-readable`)
  p()
  p(`- Sitemap: ${SITE_URL}/sitemap.xml`)
  p(`- Locales: ${LANGS.join(', ')}. English is x-default; every URL carries hreflang alternates.`)
  p()

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
