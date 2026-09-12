"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* One import from `routing`, not two. The second line arrived with the switch
   to path-derived locale crossing and still carried `localizedHref`, which the
   header stopped calling when `getSite` began handing it `site.home`. */
import { persistLang } from "@/site/geoLang";
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
 * WHAT DID NOT CHANGE. The wordmark is text, because there is no Sexy AI
 * logo file and the two Aston SVGs it used to load are somebody else's brand.
 * The dropdown holds our case pages, which are the only part of the site with
 * no home-page section to scroll to. And the language switcher still crosses to
 * the same page in the other language rather than to the other home page.
 */

/**
 * The menu panel, shared by the desktop dropdown and the phone sheet.
 *
 * `groups` rather than a flat list: on a phone it carries the whole nav and then
 * the case pages, and those are two different kinds of destination, so a
 * hairline separates them. One group renders no separator at all.
 *
 * `sheet` IS WHERE THE TWO STOP BEING THE SAME OBJECT, and the reason is the
 * finger. A dropdown is aimed with a cursor that lands on a pixel, so a 25px row
 * of text is a perfectly good target and 235px is a perfectly good width for a
 * panel hanging under one button. On a phone the same markup was the whole
 * navigation of the site: seven 25px rows, 14px apart, in a 228px panel pinned
 * to the right edge of a 375px screen. Nothing about that is wrong for a
 * dropdown and everything about it is wrong for the only way into the site on a
 * phone. As a sheet the rows are 44px, which is the target size a thumb is
 * specified against, the panel takes the screen's own margins, and the pointer
 * hover gets a pressed state to answer to instead.
 *
 * `cta` IS SEPARATE FROM THE GROUPS FOR THE SAME REASON. It used to ride along
 * as the last entry of the first group, which made the one conversion action on
 * the page identical to «О студии» directly above it. It is a filled pill here,
 * as it is in the bar on desktop.
 */
function MenuPanel({
  groups,
  cta,
  sheet = false,
  id,
  onNavigate,
}: {
  groups: NavLink[][];
  cta?: NavLink;
  sheet?: boolean;
  id?: string;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={transitions.menuPanel}
      /* The sheet's width is the screen minus the bar's own 16px gutters, so its
         left edge lands on the page column rather than somewhere inside it, and
         it stops at 320 on the wider phones where a full-bleed sheet would just
         be a long way for the eye to travel back. */
      className={`absolute right-0 top-[calc(100%+10px)] z-20 flex origin-top-right flex-col overflow-hidden bg-surface shadow-[0_10px_41px_0_rgba(0,0,0,0.08),0_2px_2px_0_rgba(0,0,0,0.02)] ${
        sheet
          ? "w-[min(320px,calc(100vw-var(--page-pad-left)-var(--page-pad-right)))] gap-1 rounded-[20px] p-3"
          : "w-[235px] gap-[14px] rounded-[20px] p-5"
      }`}
    >
      {groups.map((group, index) => (
        <Fragment key={group[0]?.href ?? index}>
          {index > 0 && (
            <div
              aria-hidden
              className={`h-px w-full bg-line ${sheet ? "my-2" : ""}`}
            />
          )}
          {group.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={
                sheet
                  ? "flex min-h-[44px] items-center rounded-[12px] px-3 text-[17px] leading-[25.5px] font-semibold text-ink-250 transition-colors duration-200 hover:bg-surface-muted hover:text-ink-700 active:bg-surface-muted"
                  : "w-[195px] text-[17px] leading-[25.5px] font-semibold text-ink-250 transition-colors duration-200 hover:text-ink-700"
              }
            >
              {link.label}
            </Link>
          ))}
        </Fragment>
      ))}

      {cta && (
        <Link
          href={cta.href}
          onClick={onNavigate}
          className="mt-2 flex min-h-[48px] items-center justify-center rounded-pill bg-accent px-4 text-center text-[17px] leading-[25.5px] font-semibold text-surface transition-colors duration-200 hover:bg-accent-600"
        >
          {cta.label}
        </Link>
      )}
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
 *
 * The click also writes `sas-lang`. Without it, the geo proxy would send a
 * visitor from Georgia who just chose English straight back to `/ru`.
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
            className="flex h-[44px] items-center rounded-pill px-[10px] text-[15px] leading-[24px] font-semibold text-ink-900"
          >
            {code}
          </span>
        ) : (
          /* 44px tall, and the height is the whole change: the pair reads
             exactly as before because neither half has a plate at rest, but the
             inactive one was a 34x34 target sitting next to a 40x40 hamburger in
             a 72px bar with room for neither problem. */
          <Link
            key={code}
            href={twinPath(pathname, code)}
            hrefLang={code}
            onClick={() => persistLang(code)}
            className="flex h-[44px] items-center rounded-pill px-[10px] text-[15px] leading-[24px] font-semibold text-ink-200 transition-colors duration-200 hover:text-ink-700"
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
    /* Hash links and the hamburger both move the page. The smooth-scroll that
       follows is not the reader putting the bar away, and treating it as one
       is how the chrome vanished mid-tap on a phone. */
    let ignoreUntil = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const HIDE = coarse ? 88 : 64;
    const SHOW = coarse ? 28 : 12;
    const DEAD = coarse ? 10 : 0;

    const onScroll = () => {
      if (Date.now() < ignoreUntil) {
        last = window.scrollY;
        travel = 0;
        return;
      }

      const y = Math.max(0, window.scrollY);
      setAtTop(y < 120);
      /* Above the fold the bar is always there: at the top of a page there is
         no "back up" left to ask for. */
      if (y < 120) {
        setHidden(false);
        last = y;
        travel = 0;
        return;
      }

      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      /* Rubber-band past the end invents a reverse delta that is not a reader
         reaching for the nav. */
      if (y > maxY) {
        last = y;
        return;
      }

      const delta = y - last;
      last = y;
      if (delta === 0 || Math.abs(delta) < DEAD) return;
      /* A change of direction starts the count again, so a scroll down followed
         by a nudge up does not carry its momentum into the decision. */
      if (delta > 0 !== travel > 0) travel = 0;
      travel += delta;

      /* ASYMMETRIC ON PURPOSE. Leaving still costs a sustained move down.
         Coming back used to cost 8px, which on a phone is also the jitter from
         the browser chrome collapsing, so the bar hid and showed in the same
         gesture. The phone number is a flick, not a twitch. */
      if (travel > HIDE) {
        setHidden(true);
        travel = 0;
      } else if (travel < -SHOW) {
        setHidden(false);
        travel = 0;
      }
    };

    const onHeaderClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      /* Links, not the hamburger: a tap that starts a smooth-scroll should not
         also hide the bar, but closing the sheet must not mute the next flick. */
      if (target?.closest("header a")) {
        ignoreUntil = Date.now() + 900;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onHeaderClick, true);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onHeaderClick, true);
    };
  }, []);

  /* The page used to keep scrolling under the sheet, so by the time the panel
     closed the bar had already decided to leave and the two animations ran at
     once. */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

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
        setHidden(false);
      }
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(target)) {
        setMobileOpen(false);
        setHidden(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
        setHidden(false);
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

  /* Everything the bar hides below 1320px, plus the case pages under a
     hairline. The CTA is handed to the panel separately rather than appended
     here: the template's mobile menu dropped it entirely, which on this site
     means the one conversion action on the page is unreachable on a phone, and
     the first fix put it back as an ordinary nav row, which is only half of
     what it needs to be. */
  const mobileGroups: NavLink[][] = [
    [...site.nav, ...site.navRest],
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
      className={`fixed inset-x-0 top-0 z-50 pt-[var(--page-safe-top)] transition-[translate,background-color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
        away ? "-translate-y-full" : "translate-y-0"
      } ${atTop ? "bg-transparent" : "bg-page"}`}
    >
      <nav
        aria-label={site.labels.mainNav}
        className="relative mx-auto flex h-[72px] w-full items-center gap-6 pl-[var(--page-pad-left)] pr-[var(--page-pad-right)] desktop:gap-9"
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
                    key="desktop-menu"
                    groups={[site.navMenu.links]}
                    onNavigate={() => {
                      setMenuOpen(false);
                      setHidden(false);
                    }}
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
                onClick={() =>
                  setMobileOpen((open) => {
                    if (open) setHidden(false);
                    return !open;
                  })
                }
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? site.labels.menuClose : site.labels.menuOpen}
                /* The white plate went with the dark pill: on the page it was a
                   white button on a near-white bar. The glyph is `#262626` in
                   the file and needs no plate to be seen here. */
                className="flex size-[44px] items-center justify-center rounded-pill transition-colors duration-200 hover:bg-surface-muted"
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
                  <MenuPanel
                    key="mobile-menu"
                    id="mobile-menu"
                    sheet
                    groups={mobileGroups}
                    cta={site.cta}
                    onNavigate={() => {
                      setMobileOpen(false);
                      setHidden(false);
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
      </nav>
    </header>
  );
}
