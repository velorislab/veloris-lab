"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* One import from `routing`, not two. The second line arrived with the switch
   to path-derived locale crossing and still carried `localizedHref`, which the
   header stopped calling when `getSite` began handing it `site.home`. */
import { LANGS, stripLocale, twinPath } from "@/site/routing";
import { getSite, type NavLink } from "@/config/site";
import { transitions } from "@/lib/motion";
import { Mark } from "@/components/ui/Mark";
import type { LabLang } from "@/site/labData";

/**
 * The nav bar: full width, on the page's own ground, with a hairline under it.
 *
 * IT WAS A DARK PILL, floating centred inside a 94px band, and the pill was the
 * template's shape rather than a decision. What it bought was a ground of its
 * own: this bar is `fixed`, the page runs underneath it, and dark chrome on a
 * self-coloured plate never has to care what is passing below. A flat bar has
 * to earn that another way, which is what the background rule on `<header>`
 * does: transparent over the first screen, where it sits on the hero's own
 * tint, and a translucent page-coloured plate with a hairline from the moment
 * anything can pass beneath it.
 *
 * EVERY COLOUR IN HERE FLIPPED WITH IT. The pill's palette was white and
 * `ink-50` on `#2d2d2d`; on the page it is `ink-900` down to `ink-200`, and
 * `chevron-down.svg` had to stop being a file at all, being a white stroke
 * drawn for a dark plate. It is geometry now, on `currentColor`, so it follows
 * the label beside it.
 *
 * WHAT DID NOT CHANGE. The wordmark is text, because there is no Veloris Lab
 * logo file and the two Aston SVGs it used to load are somebody else's brand.
 * The dropdown holds our case pages, which are the only part of the site with
 * no home-page section to scroll to. And the language switcher still crosses to
 * the same page in the other language rather than to the other home page.
 */

/**
 * The menu panel, shared by the desktop dropdown and the mobile sheet.
 *
 * `groups` rather than a flat list: on mobile it carries the whole nav and then
 * the case pages, and those are two different kinds of destination, so a
 * hairline separates them. One group renders no separator at all.
 */
function MenuPanel({
  groups,
  onNavigate,
}: {
  groups: NavLink[][];
  onNavigate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={transitions.accordion}
      className="absolute right-0 top-[calc(100%+10px)] z-20 flex w-[235px] origin-top-right flex-col gap-[14px] overflow-hidden rounded-[20px] bg-surface p-5 shadow-[0_10px_41px_0_rgba(0,0,0,0.08),0_2px_2px_0_rgba(0,0,0,0.02)]"
    >
      {groups.map((group, index) => (
        <Fragment key={group[0]?.href ?? index}>
          {index > 0 && <div aria-hidden className="h-px w-full bg-line" />}
          {group.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="w-[195px] text-[17px] leading-[25.5px] font-semibold text-ink-250 transition-colors duration-200 hover:text-ink-700"
            >
              {link.label}
            </Link>
          ))}
        </Fragment>
      ))}
    </motion.div>
  );
}

/**
 * The switcher crosses to the SAME page in the other language.
 *
 * It used to be handed a callback by whichever page rendered the header, which
 * stopped working the moment this component became `"use client"`: a function
 * cannot cross that boundary, and the build failed on the case pages saying so.
 *
 * It reads its own path instead. Every route here is `/x` or `/ru/x`, so
 * crossing is a prefix operation and needs nothing from the page. A route added
 * later gets a working switcher without anybody remembering to wire one.
 */
function LangSwitch({
  lang,
  label,
  pathname,
}: {
  lang: LabLang;
  label: string;
  pathname: string;
}) {
  return (
    // `role` and not a bare div: an aria-label on a div with no role is a label
    // nothing announces.
    <div role="group" aria-label={label} className="flex shrink-0 items-center gap-[2px]">
      {LANGS.map((code) =>
        code === lang ? (
          /* The white plate is gone with the pill it borrowed from. On the page
             the active language is the one set in the ink the wordmark is, and
             the other is the same quiet grey the nav links rest at, so the pair
             reads as a state rather than as two buttons. */
          <span
            key={code}
            aria-current="true"
            className="flex h-[34px] items-center rounded-pill px-[8px] text-[15px] leading-[24px] font-semibold text-ink-900"
          >
            {code}
          </span>
        ) : (
          <Link
            key={code}
            href={twinPath(pathname, code)}
            hrefLang={code}
            className="flex h-[34px] items-center rounded-pill px-[8px] text-[15px] leading-[24px] font-semibold text-ink-200 transition-colors duration-200 hover:text-ink-700"
          >
            {code}
          </Link>
        ),
      )}
    </div>
  );
}

export function Header({ lang }: { lang: LabLang }) {
  const pathname = usePathname();
  /* Anchors have to become absolute the moment the reader is not on the home
     page, and the path is what says so. Nobody has to pass a flag. */
  const site = getSite(lang, { offHome: stripLocale(pathname) !== "/" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  /**
   * The header leaves on the way down and comes back on the way up.
   *
   * WHAT THIS REPLACED. The pill used to fold to the wordmark past a scroll
   * threshold and open on hover, which worked but put the nav, the language
   * switcher and the only CTA in the chrome behind a hover the reader had to
   * discover. Sliding the whole bar is the behaviour people already know from
   * every other site that does this, and it needs nothing explained.
   *
   * `hidden` STARTS FALSE AND THAT IS DELIBERATE. It is the state the server
   * renders, so the first paint matches the markup; reading `window.scrollY`
   * during render would be a hydration mismatch on any reload that restores a
   * scroll position.
   */
  const [hidden, setHidden] = useState(false);
  /**
   * Over the first screen the bar has no plate and no hairline: it stands on
   * the hero's own tint, and drawing a page-coloured band across it would put a
   * seam through the top of the fold. Past that, anything can be underneath, so
   * the bar takes a ground of its own. Both start in the at-top state, which is
   * what the server renders.
   */
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    /* Travel since the direction last changed, not the delta of one event. A
       per-event threshold fires on the first flick of the wheel, which is what
       made the bar feel like it was snatched away the instant you moved. */
    let travel = 0;

    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 120);
      /* Above the fold the bar is always there: at the top of a page there is
         no "back up" left to ask for. */
      if (y < 120) {
        setHidden(false);
        last = y;
        travel = 0;
        return;
      }

      const delta = y - last;
      last = y;
      if (delta === 0) return;
      /* A change of direction starts the count again, so a scroll down followed
         by a nudge up does not carry its momentum into the decision. */
      if (delta > 0 !== travel > 0) travel = 0;
      travel += delta;

      /* ASYMMETRIC ON PURPOSE, and this is the fix for "it vanishes the moment
         I move". Leaving costs 64px of sustained downward scroll, which is a
         deliberate move down the page; coming back costs 8px, because reaching
         for the nav is a small upward flick and it has to answer at once. Equal
         thresholds make one of the two feel wrong whichever number you pick. */
      if (travel > 64) {
        setHidden(true);
        travel = 0;
      } else if (travel < -8) {
        setHidden(false);
        travel = 0;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* An open menu pins the bar. Both panels hang off buttons inside it, so
     letting it leave would take the panel with it, or worse, leave the panel
     floating where its trigger used to be. */
  const away = hidden && !menuOpen && !mobileOpen;

  // Close either menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen && !mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuOpen && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setMenuOpen(false);
      }
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(target)) {
        setMobileOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, mobileOpen]);

  /* Only /pricing is a route; the rest of the nav is anchors, and an anchor is
     never "the page you are on". */
  const isActive = (href: string) =>
    href.startsWith("/") &&
    (href === site.home ? pathname === site.home : pathname.startsWith(href));

  /* Everything the pill hides below 1320px, plus the case pages under a
     hairline. The CTA rides along as its last row: the template's mobile menu
     simply dropped it, which on this site means the one conversion action on
     the page is unreachable on a phone. */
  const mobileGroups: NavLink[][] = [
    [...site.nav, ...site.navRest, site.cta],
    ...(site.navMenu.links.length > 0 ? [site.navMenu.links] : []),
  ];

  return (
    <header
      /* `-translate-y-full` is exact now: the bar IS the band, where the pill
         used to float 24px inside a taller one and needed 130% to clear it.
         `motion-reduce` keeps the bar still for a reader who asked for that:
         the point of the behaviour is reclaimed reading space, and it survives
         being instant. */
      /* `translate` AND NOT `transform` IN THE TRANSITION LIST, which is why the
         bar was appearing and vanishing with no animation at all. Tailwind v4
         compiles `-translate-y-full` to the standalone `translate` property, not
         to a `transform` function, so a hand-written
         `transition-[transform,...]` names a property that never changes and the
         one that does is left uncovered. Measured rather than guessed: the
         computed `transition-property` read `transform, background-color,
         border-color` while the element animated nothing. The shorthand
         `transition-transform` expands to `transform, translate, scale, rotate`
         precisely to hide this; an arbitrary list has to say it.

         NO `backdrop-blur` EITHER, and that was the other artefact. A
         translucent plate over a blur makes the element its own compositing
         layer, so while the bar slid its edge painted as a hard rectangle
         against the page behind it. A solid `page` plate reads the same standing
         still and has no layer to betray it.

         NO HAIRLINE. The plate is enough of an edge on the sections it crosses,
         and the line was drawing itself across the blue panel underneath. */
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color] duration-300 ease-out motion-reduce:transition-none ${
        away ? "-translate-y-full" : "translate-y-0"
      } ${atTop ? "bg-transparent" : "bg-page"}`}
    >
      <nav
        aria-label={site.labels.mainNav}
        className="relative mx-auto flex h-[72px] w-full max-w-[1200px] items-center gap-6 px-4 tablet:px-[30px] desktop:gap-9 desktop:px-0"
      >
        <Link
          href={site.home}
          aria-label={site.homeAria}
          className="flex shrink-0 items-center gap-[10px] font-display text-[21px] leading-9 font-medium text-ink-900 transition-colors duration-200 hover:text-ink-500"
        >
          <Mark size={26} />
          {site.name}
        </Link>

        {/* ---- Desktop links (>= 1320px), beside the wordmark ----
             They used to ride in the right-hand group because the pill packed
             everything against its own two edges. On a full-width bar the links
             belong next to the mark they navigate, and only the controls belong
             at the far edge. */}
        <div className="hidden items-center desktop:flex">
          {site.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              /* No plate on the active link either. A white pill was legible on
                 #2d2d2d and is invisible on the page, so the state is carried in
                 weight of colour: rest sits at ink-400 and the current page is
                 the ink the wordmark is. */
              className={`flex h-[40px] items-center rounded-pill px-[14px] text-[16px] leading-6 font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-ink-900"
                  : "text-ink-400 hover:text-ink-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {site.navMenu.links.length > 0 && (
            <div ref={dropdownRef} className="relative flex items-center">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className="flex h-[40px] items-center gap-[2px] rounded-pill px-[14px] text-[16px] leading-6 font-medium text-ink-400 transition-colors duration-200 hover:text-ink-900"
              >
                {site.navMenu.label}
                <motion.span
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  transition={transitions.variantFast}
                  className="flex size-5 items-center justify-center"
                >
                  {/* Drawn rather than fetched, and that is the whole reason it
                      changed: `chevron-down.svg` is a white stroke, which was
                      right inside a #2d2d2d pill and invisible on the page.
                      `currentColor` also makes it follow the label's hover,
                      which an `<img>` cannot do. */}
                  <svg
                    viewBox="0 0 20 20"
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 8 4.293 4.293a1 1 0 0 0 1.414 0L15 8" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <MenuPanel
                    groups={[site.navMenu.links]}
                    onNavigate={() => setMenuOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* `ml-auto` rather than `justify-between`: the links stay welded to the
            wordmark and only what follows is pushed to the far edge. */}
        <div className="ml-auto flex items-center gap-[14px]">
            <LangSwitch lang={lang} label={site.labels.language} pathname={pathname} />

            <Link
              href={site.cta.href}
              className="hidden h-[42px] items-center rounded-pill bg-accent px-5 text-[16px] leading-6 font-semibold whitespace-nowrap text-surface transition-colors duration-200 hover:bg-accent-600 desktop:flex"
            >
              {site.cta.label}
            </Link>

            {/* ---- Tablet + mobile hamburger (< 1320px) ---- */}
            <div ref={mobileRef} className="relative desktop:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? site.labels.menuClose : site.labels.menuOpen}
                /* The white plate went with the dark pill: on the page it was a
                   white button on a near-white bar. The glyph is `#262626` in
                   the file and needs no plate to be seen here. */
                className="flex size-[40px] items-center justify-center rounded-pill transition-colors duration-200 hover:bg-surface-muted"
              >
                <Image
                  src="/images/icons/menu.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
              </button>
              <AnimatePresence>
                {mobileOpen && (
                  <div id="mobile-menu">
                    <MenuPanel
                      groups={mobileGroups}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
      </nav>
    </header>
  );
}
