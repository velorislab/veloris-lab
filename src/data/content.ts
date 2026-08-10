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
  STACK_LABEL, STACK_SUB, TOOLS, STACK_GROUPS, WORK_MODEL, WORK_MODEL_LABEL,
  FAQ, FAQ_LABEL,
  BUREAU, CONTACT, CASES, CASES_LABEL, CASES_SUB, EYEBROW, UI, MOTTO_TITLE, CALC,
} from '@/site/labData'
import { WORK_TYPES, SUPPORT_TIERS, money, priced, monthly } from '@/site/labPricing'
import { SERVICE_PAGES } from '@/site/servicePages'
import { CASE_PAGES } from '@/site/casePages'
import { pricingPath, servicePath, casePath, solutionsPath, localizedHref } from '@/site/routing'

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
      /* THREE CARDS, not the one mono line that used to be here. The line read
         «Проекты от $250 · первая версия от 1 нед.» and buried the free scoping
         entirely; these say what it costs to start, to build and to keep, which
         is the whole commercial shape of the offer in three plates.

         Every figure is read, not written: the floor and the shortest window
         from WORK_TYPES, the support price from the cheapest tier on the ladder.
         Reprice labPricing and the first screen follows. */
      marks: [
        {
          value: L(HERO.marks.freeValue),
          caption: L(HERO.marks.freeCap),
        },
        {
          value: `${L(UI.heroFloorShort)} ${money(priced(floor))}`,
          caption: `${L(HERO.marks.priceCap)} ${fastest} ${L(fastest === 1 ? CALC.weekShortOne : CALC.weeksShort)}`,
        },
        {
          value: `${L(UI.heroFloorShort)} ${money(monthly(SUPPORT_TIERS[0].perMonth))}${L(CALC.perMonth)}`,
          caption: L(HERO.marks.supportCap),
        },
      ],
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

    /* THE CASES, ON THE HOME PAGE, WITH THEIR FIGURES.
       Until now four real projects reached the reader as the digit in «4 живых
       кейса» and nothing else, while the task, the solution, the result, the
       status and the links all sat in CASES unused. Proof was the strongest
       thing the page had and the only thing it did not show. */
    cases: {
      badge: { icon: `${ICON}/who-can-use.svg`, label: L(EYEBROW.cases) },
      title: L(CASES_LABEL),
      description: L(CASES_SUB),
      items: CASES.map((c) => {
        /* `match` is documented as the English title, so the join has to ask
           for the English form explicitly rather than the reader's. */
        const en = tx(c.title, 'en')
        const page = CASE_PAGES.find((x) => x.match === en)
        return {
          slug: page?.slug ?? en.toLowerCase(),
          /* Their cards open on a two-token domain marker. Ours is the first two
             of the case's own tags, which are already the truthful shorthand for
             what the thing is. */
          marker: c.tags.slice(0, 2).join(' · '),
          title: L(c.title),
          sub: L(c.sub),
          status: L(c.status),
          live: c.live,
          result: L(c.res),
          href: page ? casePath(lang, page.slug) : pricingPath(lang),
          readLabel: L(UI.readCase),
          links: c.links.filter((l) => /^https?:/.test(l.href)),
        }
      }),
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
          /* THE PAIN LINE IS OFF THE CARD, and this reverses a change made
             earlier the same week.

             `when` describes the reader's own bad morning back to them, and it
             is good writing, but six cards in a row each opening on something
             wrong with your week reads as a lecture before it reads as an offer.
             A competitor's equivalent cards never do this: they open on what the
             thing is and what it costs, and the difficulty only appears deep
             inside the detail page, numbered, framed as engineering rather than
             as the client's suffering.

             So the card leads on the deliverable now. `when` is not deleted; it
             still carries the service pages, which is where a reader has already
             decided they are interested and recognition is worth paying for. */
          description: L(s.d),
          price: w ? money(priced(w.from)) : '',
          weeks: w ? `${w.weeks[0]}–${w.weeks[1]}` : '',
          href: page ? servicePath(lang, page.slug) : pricingPath(lang),
          /* Their cards name the link rather than leaving an arrow to imply it,
             and an arrow alone does not say whether it goes to a page or opens
             something. UI.moreOn is the label the pricing cards already use. */
          hrefLabel: L(UI.moreOn),
        }
      }),
      orbitLogos: [] as string[],
    },

    /* THE PRICE TICKER under the first screen. A competitor runs five
       product-and-price pairs there and it is the strongest thing on their fold:
       a claim made in numbers that the rest of the page then has to keep. Ours
       is every work type and its floor, read from the table, so it cannot drift
       from the calculator sitting further down the same page. */
    priceTicker: WORK_TYPES.map((w) => ({
      label: L(w.label),
      price: `${L({ en: 'from', ru: 'от' })} ${money(priced(w.from))}`,
    })),

    /* ------------------------------------------------------------- stack */
    platformHighlight: {
      /* `platform.svg` is not in public/images/icons/badge; `whats-inside.svg`
         is, and it is the icon the template gave this exact section. */
      badge: { icon: `${ICON}/whats-inside.svg`, label: L(EYEBROW.stack) },
      title: L(STACK_LABEL),
      description: L(STACK_SUB),
      /* THE TICKER RUNS ON EVERYTHING NOW, seventy-one names instead of twelve.
         Three rows of twelve meant each row was the same short list rotated and
         you could watch a name come round again inside one screen width. The
         full stack fills the track properly and, more to the point, breadth is
         the thing this section is for. */
      tags: STACK_GROUPS.flatMap((g) => g.items),
      /* And the same stack again, grouped, with a sentence per group saying
         what we do with it. The ticker shows how much there is; the groups say
         what it is for.

         ONE LIST PER GROUP, which is a change. There used to be two, shipped
         and worked-with, rendered as different chips. That split is honest and
         it is also a page telling a buyer which half of its own stack it has
         not used, which no studio's stack page does, including the one this is
         modelled on. The claim this section makes is capability; the claim the
         case cards make is history, and those stay specific. */
      /* The three facts that close this section. The support figure is read from
         the cheapest tier on the ladder rather than typed, so it cannot drift
         from /pricing. */
      modelLabel: L(WORK_MODEL_LABEL),
      model: WORK_MODEL.map((m) => ({
        k: L(m.k),
        v: L(m.v) === '__SUPPORT__'
          ? `${L({ en: 'from', ru: 'от' })} ${money(monthly(SUPPORT_TIERS[0].perMonth))}${L(CALC.perMonth)}`
          : L(m.v),
      })),
      groups: STACK_GROUPS.map((g) => ({
        key: g.key,
        kicker: L(g.kicker),
        title: L(g.title),
        lead: L(g.lead),
        items: g.items,
      })),
      /* Kept, and it is the strongest thing on this section: twelve tools with
         the project each one was used on. A stack list anybody can write; a
         stack list with «Swiftin, этот сайт» beside each entry is checkable. */
      used: TOOLS.map((t) => ({ name: t.name, note: L(t.note) })),
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
          billingNote: `${w.weeks[0]}–${w.weeks[1]} ${L({ en: 'weeks', ru: 'нед.' })} · ${L({ en: 'support from', ru: 'поддержка от' })} ${money(monthly(w.support))}${L({ en: '/mo', ru: '/мес' })}`,
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
      /* A competitor puts «Смотреть все решения →» in this section's header, and
         it is the right place for it: a reader who has just recognised their own
         situation in one of the three doors is the reader most likely to want the
         scenario list. */
      allHref: solutionsPath(lang),
      allLabel: L(UI.solutionAll),
      items: ENTRY.map((e, i) => ({
        /* «01 / Есть идея», the reader's own situation as the label. Numbered
           because three states read as a sequence otherwise, and they are not
           one: they are three doors. */
        marker: `${String(i + 1).padStart(2, '0')} / ${L(e.state)}`,
        title: L(e.t),
        description: L(e.d),
        ctaLabel: L(e.cta),
        ctaHref: e.href,
      })),
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
