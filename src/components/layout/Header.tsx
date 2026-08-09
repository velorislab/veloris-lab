"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { siteConfig } from "@/config/site";
import { transitions } from "@/lib/motion";

/** Page links shown inside the "All Pages" menu, with their icon pair. */
const MENU_LINKS = [
  { label: "Pricing", href: "/pricing", icon: "pricing" },
  { label: "Contact", href: "/contact", icon: "contact" },
  { label: "Waitlist", href: "/waitlist", icon: "waitlist" },
  { label: "Changelog", href: "/changelog", icon: "changelog" },
  { label: "Privacy Policy", href: "/privacy-policy", icon: "privacy" },
  { label: "404", href: "/404", icon: "404" },
] as const;

function MenuPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={transitions.accordion}
      className="absolute right-0 top-[calc(100%+10px)] z-20 flex w-[235px] origin-top-right flex-col gap-[14px] overflow-hidden rounded-[20px] bg-surface p-5 shadow-[0_10px_41px_0_rgba(0,0,0,0.08),0_2px_2px_0_rgba(0,0,0,0.02)]"
    >
      {MENU_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          // /404 has no route by design — don't prefetch a deliberate 404.
          prefetch={link.href === "/404" ? false : undefined}
          className="group flex w-[195px] items-center gap-2 text-[17px] leading-[25.5px] font-semibold text-ink-250 transition-colors duration-200 hover:text-ink-700"
        >
          <span className="relative size-5 shrink-0">
            <Image
              src={`/images/icons/nav/${link.icon}.svg`}
              alt=""
              width={20}
              height={20}
              className="size-5 transition-opacity duration-200 group-hover:opacity-0"
            />
            <Image
              src={`/images/icons/nav/${link.icon}-hover.svg`}
              alt=""
              width={20}
              height={20}
              className="absolute inset-0 size-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </span>
          {link.label}
        </Link>
      ))}
    </motion.div>
  );
}

export function Header() {
  const pathname = usePathname();
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[94px]">
      <nav
        aria-label="Main"
        className="relative flex h-[94px] w-full items-center justify-center overflow-visible px-4 pt-6 tablet:px-10 desktop:px-0"
      >
        <div className="flex h-[70px] w-full max-w-[450px] items-center justify-between rounded-pill bg-surface-dark py-3 pr-3 pl-4 tablet:max-w-[800px] desktop:max-w-[810px]">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="shrink-0">
            <Image
              src={siteConfig.logo.light}
              alt={siteConfig.name}
              width={108}
              height={40}
              priority
              className="h-10 w-[108px]"
            />
          </Link>

          {/* ---- Desktop links (>= 1320px) ---- */}
          <div className="hidden items-center gap-[14px] desktop:flex">
            <div className="flex items-center">
              {siteConfig.nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex h-[46px] items-center rounded-pill px-4 py-[10px] text-[17px] leading-[25.5px] font-semibold transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-surface text-ink-700"
                      : "text-ink-50 hover:text-surface"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div ref={dropdownRef} className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-[2px] rounded-[12px] py-[10px] pr-[14px] pl-4 text-[17px] leading-[25.5px] font-semibold text-ink-50 transition-colors duration-200 hover:text-surface"
                >
                  {siteConfig.navDropdown.label}
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
                  {menuOpen && <MenuPanel onNavigate={() => setMenuOpen(false)} />}
                </AnimatePresence>
              </div>
            </div>

            <Link
              href={siteConfig.cta.href}
              className="flex h-[46px] items-center rounded-pill bg-accent px-4 py-[10px] text-[17px] leading-[25.5px] font-semibold text-surface transition-colors duration-200 hover:bg-accent-600"
            >
              {siteConfig.cta.label}
            </Link>
          </div>

          {/* ---- Tablet + mobile hamburger (< 1320px) ---- */}
          <div ref={mobileRef} className="relative desktop:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
                  <MenuPanel onNavigate={() => setMobileOpen(false)} />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
}
