/**
 * Site chrome configuration, as a function of the language.
 *
 * The template shipped this as `siteConfig`, one frozen object of English
 * strings that the header and footer imported at module scope. This site is
 * bilingual and its content lives in `src/site/*`, so the object became a
 * function of the locale, in the same spirit as `src/data/content.ts`: same
 * shape, our values, one place that knows them.
 *
 * NOTHING IS TYPED HERE THAT ALREADY EXISTS SOMEWHERE ELSE. The brand, the
 * addresses and every visible word come from `labData`; every path comes from
 * `routing`; the case and service links are built from the page tables, so a
 * new service page appears in the footer by existing rather than by being
 * remembered.
 *
 * FOUR OF THE TEMPLATE'S BLOCKS ARE GONE, and each was a slot we cannot fill:
 *
 *   logo       Aston shipped a wordmark SVG and a mark; we have no logo file,
 *              and inventing a path to one is worse than rendering the name.
 *              The brand is text in both the header and the footer.
 *   navDropdown its seven entries were /contact, /waitlist, /changelog,
 *              /privacy-policy and /404, none of which are routes here. The
 *              header menu carries our case pages instead, which are.
 *   seo, ogImage `src/site/meta.ts` already owns titles, descriptions, OG and
 *              hreflang for all 24 routes per language. A second set of
 *              defaults here would be a second answer to the same question.
 *   credit     the template's attribution block, whose two images (a Framer
 *              avatar and a Figma badge) are .png files that were never copied
 *              into this repo. Nothing rendered it. Licence attribution, if the
 *              template asks for it, belongs in the repo's own docs, not in a
 *              config field no component reads.
 */

import {
  BRAND, SOCIAL, UI, FOOTER, CASES,
  tx, type LabLang, type LS,
} from '@/site/labData'
import { CASE_PAGES } from '@/site/casePages'
import { SITE_URL, localizedHref, pricingPath, casePath, solutionsPath } from '@/site/routing'
import type { SocialKey } from '@/components/ui/SocialGlyph'

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  /** Which mark to draw. Every network in SOCIAL has one; see `SocialGlyph`. */
  key: SocialKey
}

/**
 * The home-page anchors the chrome points at, in one list.
 *
 * Six of the seven nav destinations are sections of the home page, so the nav
 * is only as correct as these ids. Four are the template's own (`hero`,
 * `what-in`, `about`, `faq`); `process` and `contact` are ours, carried by the
 * ported sections, and `content.ts` links to `#contact` too, which is why the
 * close is spelled that way here rather than the template's `get-started`.
 *
 * `estimate` is the one with nothing behind it yet: the calculator is not on
 * the page. `Hero.tsx` and `content.ts` already point their primary buttons at
 * it, so the anchor is written the same way here and lights up for all three
 * the moment that section lands.
 */
export const ANCHORS = {
  home: '#hero',
  services: '#what-in',
  process: '#process',
  bureau: '#about',
  faq: '#faq',
  contact: '#contact',
  estimate: '#estimate',
} as const

/**
 * Chrome-only strings with no home in `labData`: the two menu labels, the
 * switcher's group name and three landmark names. They are here rather than in
 * `labData` because nothing outside the header and footer says them, and both
 * languages are written out for the same reason every other string is.
 */
const CHROME: Record<string, LS> = {
  homeAria: { en: `${BRAND}, home`, ru: `${BRAND}, на главную` },
  mainNav: { en: 'Main', ru: 'Основная навигация' },
  language: { en: 'Language', ru: 'Язык' },
  menuOpen: { en: 'Open menu', ru: 'Открыть меню' },
  menuClose: { en: 'Close menu', ru: 'Закрыть меню' },
}

/**
 * @param opts.offHome set on every page that is not the home page. It turns the
 * in-page anchors into absolute links back to the home page's anchors, which is
 * the difference between `#process` working and doing nothing at all. The
 * header takes it from the presence of its `twin` prop, exactly as
 * `src/site/SiteChrome.tsx` does.
 */
export function getSite(lang: LabLang, opts: { offHome?: boolean } = {}) {
  const L = (v: LS | undefined) => tx(v, lang)
  const home = localizedHref(lang)
  const at = (hash: string) => (opts.offHome ? `${home}${hash}` : hash)

  /* Both link lists are joined on the page tables rather than retyped: the
     label is the localized title the rest of the site shows, and the path comes
     from `routing`, so neither can drift from the page it opens. */
  const caseLinks: NavLink[] = CASE_PAGES.map((p) => ({
    label: L(CASES.find((c) => tx(c.title, 'en') === p.match)?.title) || p.match,
    href: casePath(lang, p.slug),
  }))

  return {
    name: BRAND,
    /** The line beside the footer wordmark. A descriptor, not a claim: what the
     *  studio promises is said where the page can back it. */
    tagline: L(FOOTER.line),
    url: SITE_URL,

    /** Where the wordmark goes, and what a screen reader hears it as. */
    home,
    homeAria: L(CHROME.homeAria),

    /**
     * The two links the pill can actually hold, beside the case menu.
     *
     * THIS IS ARITHMETIC, NOT TASTE. The desktop pill is `max-w-[810px]`. The
     * wordmark takes 114, the language switcher 77, the Russian CTA 197, the
     * padding and two gaps 56: 366px is left for links. Services, Pricing and
     * the Cases button are 271 of it. «Как работаем» alone is 145 more, which
     * is 50 over the edge, and an overflowing pill is a broken pill.
     *
     * Widening it, shrinking the CTA or tightening the link padding would each
     * be a change to the design rather than to the content, so the two anchors
     * that did not fit are in `navRest` instead.
     */
    nav: [
      { label: L(UI.navServices), href: at(ANCHORS.services) },
      /* The solutions hub is a real route with eight pages under it, and the
         shape of the site most likely to be landed on from a search. It is in the
         desktop pill rather than in `navRest` because it is the only entry here
         that is not an anchor on the page the reader is already on. */
      { label: L(UI.navSolutions), href: solutionsPath(lang) },
      { label: L(UI.navPricing), href: pricingPath(lang) },
    ] satisfies NavLink[],

    /**
     * Process and Bureau: nav by rights, over the width budget in fact.
     *
     * The mobile sheet lists them with everything else, since it is a panel and
     * has the room. On desktop they are two sections of a single-scroll page
     * the reader passes through on the way down, which is the cheapest thing on
     * this list to lose. If the pill ever gets wider, move these two back into
     * `nav` and nothing else has to change.
     */
    navRest: [
      { label: L(UI.navProcess), href: at(ANCHORS.process) },
      { label: L(UI.navBureau), href: at(ANCHORS.bureau) },
    ] satisfies NavLink[],

    /**
     * The header menu, where the template kept "All Pages".
     *
     * Cases are the one part of the site with no home-page section to anchor
     * to, and four real routes to reach, so the dropdown carries them. That is
     * also why it is a menu and not a link: there is no /cases index.
     */
    navMenu: { label: L(UI.navCases), links: caseLinks },

    /** The single conversion action, on all 24 routes of each language. */
    cta: { label: L(UI.cta), href: at(ANCHORS.contact) },
    /** Read by the hero's primary button. */
    heroCta: { label: L(UI.ctaCalc), href: at(ANCHORS.estimate) },

    /* No `contact` block any more. It carried an address pair, the footer read
       only the mail half of it, and that pill is gone. Telegram reaches the
       footer through SOCIAL, which is the row that renders it. */
    social: SOCIAL.map((s) => ({
      label: s.label,
      href: s.url,
      key: s.key,
    })) satisfies SocialLink[],

    /**
     * The copyright, and nothing else. There were two link columns here, the
     * six service pages plus /solutions and /pricing beside the four cases, and
     * they were the only site-wide links those inner pages had. The cases keep
     * theirs in `navMenu`, and /solutions and /pricing are in `nav`; the six
     * service pages now hang off the home page's service cards alone. Paste the
     * columns back if that shows up in the numbers.
     */
    footer: {
      copyright: `© ${new Date().getFullYear()} ${BRAND}`,
    },

    /** Landmark and control names, so neither component types an English word. */
    labels: {
      mainNav: L(CHROME.mainNav),
      language: L(CHROME.language),
      menuOpen: L(CHROME.menuOpen),
      menuClose: L(CHROME.menuClose),
    },
  }
}

export type SiteConfig = ReturnType<typeof getSite>
