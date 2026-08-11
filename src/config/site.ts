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
 *              hreflang for all 22 routes. A second set of defaults here would
 *              be a second answer to the same question.
 *   credit     the template's attribution block, whose two images (a Framer
 *              avatar and a Figma badge) are .png files that were never copied
 *              into this repo. Nothing rendered it. Licence attribution, if the
 *              template asks for it, belongs in the repo's own docs, not in a
 *              config field no component reads.
 */

import {
  BRAND, EMAIL, TELEGRAM, SOCIAL, UI, FOOTER, SERVICES, CASES,
  tx, type LabLang, type LS,
} from '@/site/labData'
import { CASE_PAGES } from '@/site/casePages'
import { SERVICE_PAGES } from '@/site/servicePages'
import { SITE_URL, localizedHref, pricingPath, servicePath, casePath, solutionsPath } from '@/site/routing'

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  /** Empty where the template shipped no glyph for this network; see SOCIAL_ICON. */
  icon: string
}

export interface FooterColumn {
  title: string
  links: NavLink[]
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
 * Glyphs for the footer's social row.
 *
 * The template shipped X, Meta, Instagram and LinkedIn. Two of those are
 * accounts we have; Telegram, which is the channel this business actually
 * answers on, has no glyph in `public/` and is not getting an invented path, so
 * it has no entry here and the footer renders its name instead of an icon.
 */
const SOCIAL_ICON: Record<string, string> = {
  instagram: '/images/icons/social-instagram.svg',
  linkedin: '/images/icons/social-linkedin.svg',
}

/**
 * Chrome-only strings with no home in `labData`: the two menu labels, the
 * switcher's group name and three landmark names. They are here rather than in
 * `labData` because nothing outside the header and footer says them, and both
 * languages are written out for the same reason every other string is.
 */
const CHROME: Record<string, LS> = {
  homeAria: { en: `${BRAND}, home`, ru: `${BRAND}, на главную` },
  mainNav: { en: 'Main', ru: 'Основная навигация' },
  footerNav: { en: 'Footer', ru: 'Навигация в подвале' },
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

  const serviceLinks: NavLink[] = SERVICE_PAGES.map((p) => ({
    label: L(SERVICES.find((s) => s.key === p.key)?.t) || p.slug,
    href: servicePath(lang, p.slug),
  }))

  return {
    name: BRAND,
    /** The footer's quoted line. The only positioning sentence on the site. */
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

    /** The single conversion action, on all 22 routes. */
    cta: { label: L(UI.cta), href: at(ANCHORS.contact) },
    /** Read by the hero's primary button. */
    heroCta: { label: L(UI.ctaCalc), href: at(ANCHORS.estimate) },

    contact: { email: EMAIL, telegram: TELEGRAM },

    social: SOCIAL.map((s) => ({
      label: s.label,
      href: s.url,
      icon: SOCIAL_ICON[s.key] ?? '',
    })) satisfies SocialLink[],

    footer: {
      copyright: `© ${new Date().getFullYear()} ${BRAND}`,
      /**
       * Two columns, not the template's three, and both hold real routes only.
       *
       * Our service and case titles are sentences where Aston's were single
       * words, so three columns of them would touch each other inside the 652px
       * the footer gives this block. The home-page anchors are not repeated
       * here: the header has all six, and what the footer is for is the ten
       * inner pages that are otherwise only reachable from one card each.
       */
      columns: [
        {
          title: L(UI.navServices),
          links: [...serviceLinks, { label: L(UI.solutionAll), href: solutionsPath(lang) }, { label: L(UI.priceList), href: pricingPath(lang) }],
        },
        { title: L(UI.navCases), links: caseLinks },
      ] satisfies FooterColumn[],
    },

    /** Landmark and control names, so neither component types an English word. */
    labels: {
      mainNav: L(CHROME.mainNav),
      footerNav: L(CHROME.footerNav),
      language: L(CHROME.language),
      menuOpen: L(CHROME.menuOpen),
      menuClose: L(CHROME.menuClose),
    },
  }
}

export type SiteConfig = ReturnType<typeof getSite>
