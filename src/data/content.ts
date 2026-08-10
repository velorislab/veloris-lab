/* =============================================================================
   OUR CONTENT, IN THE TEMPLATE'S SHAPES.

   The template's own `home.ts` is a flat module of English constants that every
   section imports at module scope. This site is bilingual and its content lives
   in `src/site/*`, so this file is the seam: one function of the locale that
   returns the same shapes the sections already expect, built out of the sources
   we already maintain.

   TWO RULES CARRIED OVER FROM THE OLD SITE, BOTH LOAD-BEARING.

   No figure is typed here. Prices, week windows and support amounts are read
   from labPricing at render time, exactly as before, so repricing still moves
   one file.

   Nothing is invented. Where the template's shape asks for something we do not
   have, the slot is emptied and the component drops it rather than filled with
   a plausible number. That is why the hero has no avatar stack, no client-logo
   strip and no review scores: those are three separate claims about strangers.
   ========================================================================== */

import { type LabLang, tx } from '@/site/labData'
import {
  HERO, SERVICES, SERVICES_LABEL, SERVICES_SUB,
  PROCESS, PROCESS_LABEL, PROCESS_SUB,
  WHY, WHY_LABEL, WHY_SUB,
  ENTRY, ENTRY_LABEL, ENTRY_SUB,
  STACK_LABEL, STACK_SUB, TOOLS,
  FAQ, FAQ_LABEL,
  BUREAU, CONTACT, CASES, EYEBROW, UI, MOTTO_TITLE,
} from '@/site/labData'
import { WORK_TYPES, money, priced } from '@/site/labPricing'
import { SERVICE_PAGES } from '@/site/servicePages'
import { pricingPath, servicePath, localizedHref } from '@/site/routing'

const ICON = '/images/icons/badge'

export function getHome(lang: LabLang) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const floor = Math.min(...WORK_TYPES.map((w) => w.from))
  const fastest = Math.min(...WORK_TYPES.map((w) => w.weeks[0]))

  return {
    /* ---------------------------------------------------------------- hero */
    hero: {
      /* NO BADGE. The template's slot held "3,500+ Pro Users" over three stock
         portraits; it then held our Swiftin credential with the faces removed,
         because the people in those avatars are not our customers. It is out
         altogether now at the founder's call: the reach figure moved into the
         sub, where it is a sentence rather than a chip, and the first screen
         reads with one less thing in it. */
      title: L(HERO.h1),
      /* The plain sentence stays in `title` for metadata and for a reader with
         no JavaScript; these two drive the cycling version. */
      rotatorLead: L(HERO.rotator.lead),
      rotatorWords: HERO.rotator.words[lang],
      description: L(HERO.sub),
      /* The template's note advertised a Figma file. Ours states the floor and
         the shortest window, both read from the price table. */
      note: `${L(UI.heroFloor)} ${money(priced(floor))} · ${L(UI.heroSpeed)} ${fastest} ${L({ en: fastest === 1 ? 'week' : 'weeks', ru: 'нед.' })}`,
      visual: '',
      /* Emptied on purpose, not forgotten. `trustedText` was "Trusted by over
         14,540 businesses", `logos` were six invented companies and `ratings`
         were G2 and Google scores. We have no clients we may name, no logos and
         no review profile, so the whole trust strip does not render. */
      trustedText: '',
      logos: [] as string[],
      ratings: [] as { icon: string; score: string; count: string; label: string; href: string }[],
      widgets: { left: [], right: [] },
    },

    /* --------------------------------------------------------------- motto */
    motto: {
      title: L(MOTTO_TITLE),
      /* The three countable facts the old facts strip carried. `from`/`to` feed
         the template's CountUp; ours do not tick upward, because a number that
         climbs while you read it is a number nobody can check. */
      stats: [
        { value: '15', suffix: '+', label: L(HERO.facts[3].k), from: 15, to: 15 },
        { value: '20', suffix: '+', label: L(HERO.facts[4].k), from: 20, to: 20 },
        { value: String(CASES.length), suffix: '', label: L({ en: 'live cases', ru: 'живых кейса' }), from: CASES.length, to: CASES.length },
      ],
    },

    /* ------------------------------------------------- the six, as cards */
    whatsIn: {
      title: L(SERVICES_LABEL),
      description: L(SERVICES_SUB),
      cards: SERVICES.map((s) => {
        const w = WORK_TYPES.find((t) => t.key === s.key)
        const page = SERVICE_PAGES.find((p) => p.key === s.key)
        return {
          title: L(s.t),
          description: L(s.when),
          price: w ? money(priced(w.from)) : '',
          weeks: w ? `${w.weeks[0]}–${w.weeks[1]}` : '',
          href: page ? servicePath(lang, page.slug) : pricingPath(lang),
        }
      }),
      orbitLogos: [] as string[],
    },

    /* ------------------------------------------------------------- stack */
    platformHighlight: {
      /* `platform.svg` is not in public/images/icons/badge; `whats-inside.svg`
         is, and it is the icon the template gave this exact section. */
      badge: { icon: `${ICON}/whats-inside.svg`, label: L(EYEBROW.stack) },
      title: L(STACK_LABEL),
      description: L(STACK_SUB),
      tags: TOOLS.map((t) => t.name),
    },

    /* --------------------------------------- what a reader can check */
    coreFeatures: {
      /* `badge/features.svg` and not `badge/core-features.svg`: the second one
         was never in the template's asset set. The five items carry no icon at
         all. The template gave each card a bespoke 66px glyph drawn for its own
         feature list; none of those means anything next to a claim of ours, and
         a decorative badge glyph repeated five times reads as a mistake. The
         card renders its position instead, which is what `index` is for. */
      badge: { icon: `${ICON}/features.svg`, label: L(EYEBROW.why) },
      title: L(WHY_LABEL),
      description: L(WHY_SUB),
      items: WHY.map((r, i) => ({
        title: L(r.t),
        description: L(r.d),
        index: i,
      })),
    },

    /* ------------------------------------------------------------ pricing */
    pricing: {
      badge: { icon: `${ICON}/pricing.svg`, label: L(EYEBROW.services) },
      title: L(SERVICES_LABEL),
      description: L(SERVICES_SUB),
      plans: WORK_TYPES.map((w) => {
        const svc = SERVICES.find((s) => s.key === w.key)
        const page = SERVICE_PAGES.find((p) => p.key === w.key)
        return {
          name: L(svc?.t ?? w.label),
          audience: L(svc?.when ?? ''),
          price: `${L({ en: 'from', ru: 'от' })} ${money(priced(w.from))}`,
          billingNote: `${w.weeks[0]}–${w.weeks[1]} ${L({ en: 'weeks', ru: 'нед.' })} · ${L({ en: 'support from', ru: 'поддержка от' })} ${money(priced(w.support))}${L({ en: '/mo', ru: '/мес' })}`,
          ctaLabel: L(UI.moreOn),
          ctaHref: page ? servicePath(lang, page.slug) : pricingPath(lang),
        }
      }),
      allHref: pricingPath(lang),
      allLabel: L(UI.priceList),
    },

    /* -------------------------------------------------------------- about */
    about: {
      /* `about-us.svg` is the file the template actually ships; `about.svg` is
         not there. */
      badge: { icon: `${ICON}/about-us.svg`, label: L(EYEBROW.bureau) },
      title: L(BUREAU.label),
      description: L(BUREAU.lead),
      body: L(BUREAU.body),
      name: L(BUREAU.name),
      role: L(BUREAU.role),
      photo: '/founder.jpg',
      photoAlt: L(BUREAU.photoAlt),
      facts: BUREAU.facts.map((f) => ({ k: L(f.k), v: L(f.v) })),
      primaryCta: { label: L(UI.ctaCalc), href: '#estimate' },
      secondaryCta: { label: L(UI.priceList), href: pricingPath(lang) },
    },

    /* ------------------------------------------------- starting points */
    whoCanUse: {
      badge: { icon: `${ICON}/who-can-use.svg`, label: L(EYEBROW.entry) },
      title: L(ENTRY_LABEL),
      description: L(ENTRY_SUB),
      items: ENTRY.map((e) => ({ title: L(e.t), description: L(e.d) })),
      panel: {
        kicker: L(EYEBROW.calc),
        title: L(CONTACT.h),
        subtitle: L(CONTACT.sub),
        ctaLabel: L(UI.cta),
        ctaHref: '#contact',
      },
    },

    /* ------------------------------------------------------------ process */
    process: {
      badge: { icon: `${ICON}/process.svg`, label: L(EYEBROW.process) },
      title: L(PROCESS_LABEL),
      description: L(PROCESS_SUB),
      ctaLabel: L(UI.ctaCalc),
      ctaHref: '#estimate',
      steps: PROCESS.map((s, i) => ({
        step: `${L({ en: 'Step', ru: 'Шаг' })} ${String(i + 1).padStart(2, '0')}`,
        title: L(s.t),
        description: L(s.d),
        screen: '',
      })),
    },

    /* ---------------------------------------------------------------- faq */
    faq: {
      badge: { icon: `${ICON}/faq.svg`, label: L(EYEBROW.faq) },
      title: L(FAQ_LABEL),
      items: FAQ.flat().map((f) => ({ question: L(f.q), answer: L(f.a) })),
    },

    /* ----------------------------------------------------------- the close */
    finalCta: {
      title: L(CONTACT.h),
      description: L(CONTACT.sub),
      /* The template's three bullets were product perks. Ours are the three
         promises the rest of the page has already kept. */
      points: [
        `${L(HERO.facts[0].k)}: ${L(HERO.facts[0].v)}`,
        `${L(HERO.facts[1].k)}: ${L(HERO.facts[1].v)}`,
        `${L(HERO.facts[2].k)}: ${L(HERO.facts[2].v)}`,
      ],
      ctaLabel: L(UI.cta),
      ctaHref: '#contact',
      home: localizedHref(lang),
    },
  }
}

export type HomeContent = ReturnType<typeof getHome>
