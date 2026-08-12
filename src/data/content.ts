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
  HERO, SERVICES, SERVICES_LABEL,
  PROCESS, PROCESS_LABEL, PROCESS_SUB,
  STACK_LABEL, STACK_SUB, TOOLS, STACK_GROUPS, WORK_MODEL, WORK_MODEL_LABEL,
  FAQ, FAQ_LABEL,
  BUREAU, CONTACT, CASES, CASES_LABEL, CASES_COUNT_NOUN, CASE_WORD, pluralForm,
  EYEBROW, UI, MOTTO_TITLE, CALC, MARQUEE,
} from '@/site/labData'
import { WORK_TYPES, SUPPORT_TIERS, money, priced, monthly } from '@/site/labPricing'
import { SERVICE_PAGES } from '@/site/servicePages'
import { CASE_PAGES } from '@/site/casePages'
import { pricingPath, servicePath, casePath, localizedHref } from '@/site/routing'

const ICON = '/images/icons/badge'

export function getHome(lang: LabLang) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const floor = Math.min(...WORK_TYPES.map((w) => w.from))
  const fastest = Math.min(...WORK_TYPES.map((w) => w.weeks[0]))

  /* The motto's third figure, rounded down to a ten and carrying a «+» like the
     two beside it. Two things make that better than the exact `CASES.length`:
     the count moves every time a case lands, and a precise number invites the
     reader to go and count the cards. Under ten there is no ten to round down
     to, so it shows the exact figure and drops the plus rather than printing
     «0+». Still derived, so twenty cases print «20+» without anyone editing a
     string. */
  const caseShown = CASES.length >= 10 ? Math.floor(CASES.length / 10) * 10 : CASES.length
  const caseSuffix = CASES.length >= 10 ? '+' : ''

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
        /* The noun agrees with the number ON SCREEN and not with the array: at
           eleven cases those are 10 and 11, and Russian gives them different
           forms. Reading the length here would print «10+ живых кейса». */
        { value: String(caseShown), suffix: caseSuffix, label: L(CASES_COUNT_NOUN[pluralForm(caseShown)]), from: caseShown, to: caseShown },
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
      /* Empty on purpose. The cards are the argument; a sentence counting them
         is a caption on something the reader is already looking at. `Cases.tsx`
         drops the paragraph and its gap when this is empty, so a standfirst
         comes back by filling this string and nothing else. */
      description: '',
      /* The grid opens on the first few and fades the rest; these label the
         control that opens it. The figure and its noun are derived here for the
         same reason every other count on this page is. */
      showAllLabel: L(UI.casesAll)
        .replace('%n', String(CASES.length))
        .replace('cases', CASES.length === 1 ? 'case' : 'cases')
        .replace('кейсов', CASE_WORD[pluralForm(CASES.length)]),
      collapseLabel: L(UI.casesLess),
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
          /* Resolved here rather than in the card, so the component never sees
             an `LS`. Empty where a case has no number worth printing, which the
             card reads as "show the result sentence instead". */
          metrics: (c.metrics ?? []).map((m) => ({ v: L(m.v), k: L(m.k) })),
          result: L(c.res),
          href: page ? casePath(lang, page.slug) : pricingPath(lang),
          readLabel: L(UI.readCase),
          links: c.links.filter((l) => /^https?:/.test(l.href)),
        }
      }),
    },

    /* ------------------------------------------------- the six, as cards */
    whatsIn: {
      /* Its own heading, not the counted one the pricing block uses. Both
         printed the same line until now, so the page carried one headline
         twice. */
      title: L(SERVICES_LABEL),
      /* Empty on purpose; see the note where SERVICES_SUB used to be. */
      description: '',
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
             A card should open on what the thing is and what it costs. The
             difficulty belongs deep inside the detail page, numbered, framed as
             engineering rather than as the client's suffering.

             So the card leads on the deliverable now. `when` is not deleted; it
             still carries the service pages, which is where a reader has already
             decided they are interested and recognition is worth paying for. */
          description: L(s.d),
          price: w ? money(priced(w.from)) : '',
          weeks: w ? `${w.weeks[0]}–${w.weeks[1]}` : '',
          href: page ? servicePath(lang, page.slug) : pricingPath(lang),
          /* Their cards name the link rather than leaving an arrow to imply it,
             and an arrow alone does not say whether it goes to a page or opens
             something. It offers the next step rather than naming the page. */
          hrefLabel: L(UI.scopeTask),
        }
      }),
      /* ONE LINK, WHERE NINE PRICE CHIPS USED TO BE. They listed the work types
         with no card of their own, each with its floor, and the argument for
         them was that the heading above counted fifteen while the page showed
         six. That heading no longer counts anything, so the row was answering a
         question nobody was being asked, and it put a second grid of prices
         directly under a grid of prices. The link says the same thing in four
         words and the table is one click away. */
      moreLabel: L(UI.allPrices),
      moreHref: pricingPath(lang),
      orbitLogos: [] as string[],
    },

    /* THE TICKER under the first screen. Capability words, not the price ladder:
       see MARQUEE in labData for why the floors were tried here twice and left
       twice. Already a flat array of strings in the reader's language, so there
       is nothing to map. */
    ticker: MARQUEE[lang],

    /* ------------------------------------------------------------- stack */
    platformHighlight: {
      /* `platform.svg` is not in public/images/icons/badge; `whats-inside.svg`
         is, and it is the icon the template gave this exact section. */
      badge: { icon: `${ICON}/whats-inside.svg`, label: L(EYEBROW.stack) },
      title: L(STACK_LABEL),
      description: L(STACK_SUB),
      /* THE TICKER RUNS ON THE WHOLE STACK, not on the twelve sourced tools it
         used to. Three rows of twelve meant each row was the same short list
         rotated, and you could watch a name come round again inside one screen
         width. The full set fills the track and, more to the point, breadth is
         what this section is for. The count is deliberately not written down
         here: it is `STACK_GROUPS.flatMap`, and it has already changed twice. */
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

    /* THE PROOF SECTION IS GONE, and it was `coreFeatures`: five numbered
       claims under «Это можно проверить без нас». Every one of them is still
       made somewhere it can be checked rather than asserted, which is what
       made the section removable: the own-product claim is the Swiftin card and
       its case page, the full-chain claim is the studio section, the no-API
       claim is the parsing service page, the calculator arithmetic is /pricing,
       and the fourth claim counted four cases at a point where there are
       twelve. `CoreFeatures.tsx` went with it. */

    /* THE `pricing` BLOCK IS GONE, and it had been dead for a while: nothing
       destructured it out of `getHome`, because the home page's pricing section
       went when the six service cards started carrying their own figures. It
       cost more than the lines it took. Building fifteen plan objects on every
       render of every page is the cheap part; the expensive part is that it
       still printed a heading, so reading this file suggested the home page had
       two headings when it has one. `SERVICES_LABEL_TAIL` went with it, being
       the string only this block read. The real price list is `PricingPage`,
       which has its own copy in `pricingCopy.ts`. */

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

    /* THE STARTING-POINTS SECTION IS GONE, and it was `whoCanUse`: the heading
       «С чего начать, если ТЗ ещё нет», the link to /solutions, three numbered
       doors (idea, process, product) and a panel repeating the free-scoping
       offer. `WhoCanUse.tsx` and `ENTRY` went with it.

       Nothing it carried is now unreachable. /solutions is in the header pill,
       the calculator the three doors pointed at is the section directly below,
       and its panel was the third copy of «Разберём бесплатно и скажем как
       есть» on one page: `CONTACT.h` still opens the close, which is where that
       sentence has an anchor and a channel under it. */

    /* ------------------------------------------------------------ process */
    process: {
      badge: { icon: `${ICON}/process.svg`, label: L(EYEBROW.process) },
      title: L(PROCESS_LABEL),
      description: L(PROCESS_SUB),
      /* «Бесплатный разбор», not «Узнать цену за минуту». The section ends on
         step 01, which IS the free scoping, so the button should offer the step
         the reader has just read about rather than send them back up to the
         calculator. */
      ctaLabel: L(UI.cta),
      ctaHref: '#contact',
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
         promises the rest of the page has already kept, and they are their own
         strings now rather than `HERO.facts` glued into «ключ: значение». */
      points: CONTACT.points.map(L),
      ctaLabel: L(UI.cta),
      ctaHref: '#contact',
      home: localizedHref(lang),
    },
  }
}

export type HomeContent = ReturnType<typeof getHome>
