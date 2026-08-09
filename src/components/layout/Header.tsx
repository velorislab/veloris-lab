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
 * The nav pill, in the template's shape and our navigation.
 *
 * Three things changed and nothing else did.
 *
 *   The wordmark is text. There is no Veloris Lab logo file, and the two Aston
 *   SVGs it used to load are somebody else's brand.
 *
 *   The dropdown holds our four case pages instead of Aston's seven routes.
 *   `/waitlist`, `/changelog`, `/privacy-policy` and `/404` do not exist here;
 *   the case pages do, and they are the only part of the site with no
 *   home-page section to scroll to. Its rows lost their icon pair with the
 *   routes they belonged to: `public/images/icons/nav/` has a glyph for
 *   "pricing" and "waitlist", none for a case, and a case is not getting an
 *   invented path to one.
 *
 *   The language switcher is new, because the template had no concept of a
 *   second language. It is built out of the pill's own two states: the active
 *   language is the white pill an active nav link already is, the other is the
 *   same ink-50 that hovers to white. Nothing else was added to the bar.
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
          <span
            key={code}
            aria-current="true"
            className="flex h-[38px] items-center rounded-pill bg-surface px-[10px] text-[16px] leading-[24px] font-semibold text-ink-700"
          >
            {code}
          </span>
        ) : (
          <Link
            key={code}
            href={twinPath(pathname, code)}
            hrefLang={code}
            className="flex h-[38px] items-center rounded-pill px-[10px] text-[16px] leading-[24px] font-semibold text-ink-50 transition-colors duration-200 hover:text-surface"
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
    <header className="fixed inset-x-0 top-0 z-50 h-[94px]">
      <nav
        aria-label={site.labels.mainNav}
        className="relative flex h-[94px] w-full items-center justify-center overflow-visible px-4 pt-6 tablet:px-10 desktop:px-0"
      >
        <div className="flex h-[70px] w-full max-w-[450px] items-center justify-between rounded-pill bg-surface-dark py-3 pr-3 pl-4 tablet:max-w-[800px] desktop:max-w-[810px]">
          {/* `vl-logo` is what the mark's hover morph listens for, so the
              prompt resolves into the initials from anywhere on the pair, the
              wordmark included. */}
          <Link
            href={site.home}
            aria-label={site.homeAria}
            className="vl-logo flex shrink-0 items-center gap-[10px] font-display text-[22px] leading-10 font-medium text-surface transition-colors duration-200 hover:text-ink-50"
          >
            <Mark size={26} />
            {site.name}
          </Link>

          <div className="flex items-center gap-[14px]">
            {/* ---- Desktop links (>= 1320px) ---- */}
            <div className="hidden items-center desktop:flex">
              {site.nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex h-[46px] items-center rounded-pill px-4 py-[10px] text-[17px] leading-[25.5px] font-semibold transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-surface text-ink-700"
                      : "text-ink-50 hover:text-surface"
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
                    className="flex items-center gap-[2px] rounded-[12px] py-[10px] pr-[14px] pl-4 text-[17px] leading-[25.5px] font-semibold text-ink-50 transition-colors duration-200 hover:text-surface"
                  >
                    {site.navMenu.label}
                    <motion.span
                      animate={{ rotate: menuOpen ? 180 : 0 }}
                      transition={transitions.variantFast}
                      className="flex size-5 items-center justify-center"
                    >
                      <Image
                        src="/images/icons/chevron-down.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
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

            <LangSwitch lang={lang} label={site.labels.language} pathname={pathname} />

            <Link
              href={site.cta.href}
              className="hidden h-[46px] items-center rounded-pill bg-accent px-4 py-[10px] text-[17px] leading-[25.5px] font-semibold text-surface transition-colors duration-200 hover:bg-accent-600 desktop:flex"
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
                className="flex items-center justify-center rounded-pill bg-surface px-[18px] py-3"
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
        </div>
      </nav>
    </header>
  );
}
