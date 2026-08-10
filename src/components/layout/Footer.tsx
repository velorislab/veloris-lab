import Image from "next/image";
import Link from "next/link";

import { getSite } from "@/config/site";
import { Mark } from "@/components/ui/Mark";
import type { LabLang } from "@/site/labData";

/**
 * The footer, in the template's shape and our links.
 *
 * WHAT MOVED, and why each one had to.
 *
 *   The wordmark is text, for the same reason it is text in the header: there
 *   is no logo file for this brand and the Aston one is not ours to render.
 *
 *   Two link columns, not three. Aston's titles were single words ("Benefits",
 *   "Pricing"); ours are the real names of six services and four cases, which
 *   are sentences. Three columns of sentences touch each other inside the
 *   652px this block gets, so the third column went and the home-page anchors
 *   it would have held stayed in the header, which carries all six of them.
 *   Both remaining columns are real routes only: these ten pages are otherwise
 *   reachable from exactly one card each.
 *
 *   Telegram has no glyph. The template shipped X, Meta, Instagram and
 *   LinkedIn; the channel this business actually answers on is not among them
 *   and `public/` has no icon for it, so it renders as a named chip in the same
 *   row rather than borrowing another network's mark or being dropped.
 *
 *   The disclaimer is gone. It was four sentences of hedging about course
 *   availability, written for a business that sells courses. Nothing we have
 *   belongs in that slot, so the bottom bar carries the copyright instead of an
 *   invented legal paragraph.
 */

/** 1px hairline divider used throughout the footer. */
function Divider({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`bg-line ${className}`} />;
}

export function Footer({ lang }: { lang: LabLang }) {
  const { footer, social, contact, name, tagline, home, homeAria, labels } =
    getSite(lang);

  return (
    <footer className="flex w-full justify-center bg-surface">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-10 px-4 pt-14 pb-10 tablet:gap-[60px] tablet:px-[30px] tablet:pt-20 desktop:px-0">
        {/* ---- Brand row ---- */}
        <div className="flex w-full flex-col items-start justify-between gap-6 tablet:flex-row tablet:items-center tablet:gap-4">
          <Link
            href={home}
            aria-label={homeAria}
            className="flex items-center gap-3 font-display text-[26px] leading-[54px] font-medium text-ink-700 transition-colors duration-200 hover:text-ink-500"
          >
            <Mark size={28} />
            {name}
          </Link>
          <p className="font-display text-[18px] leading-[27px] text-ink-500">
            “{tagline}”
          </p>
        </div>

        <Divider className="h-px w-full" />

        {/* ---- Contact + link columns ---- */}
        {/* Framer splits this row 268px / 280px gap / 652px; the left block is
            sized to its content rather than sharing the width evenly. */}
        <div className="flex w-full flex-col gap-10 tablet:flex-row tablet:gap-[60px] desktop:gap-[280px]">
          <div className="flex flex-col justify-between gap-8 desktop:w-[268px] desktop:shrink-0">
            <a
              href={`mailto:${contact.email}`}
              className="flex w-fit items-center gap-3 rounded-pill border border-line bg-page px-4 py-3 transition-colors duration-200 hover:bg-surface-muted"
            >
              <span className="flex items-center gap-1">
                <Image
                  src="/images/icons/mail.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
                <span className="text-[18px] leading-[27px] text-ink-500">
                  {contact.email}
                </span>
              </span>
              <Image
                src="/images/icons/arrow-up-right.svg"
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
            </a>

            {social.length > 0 && (
              <div className="flex w-full max-w-[268px] items-center justify-between">
                {social.map((item, index) => (
                  <div key={item.label} className="flex items-center">
                    {index > 0 && <Divider className="mr-4 h-[25px] w-px" />}
                    {item.icon ? (
                      <a
                        href={item.href}
                        aria-label={item.label}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex size-[46px] items-center justify-center rounded-[12px] border border-line bg-page p-[10px] transition-colors duration-200 hover:bg-surface-muted"
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={26}
                          height={26}
                          className="size-[26px]"
                        />
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex h-[46px] items-center rounded-[12px] border border-line bg-page px-4 text-[16px] leading-[24px] font-medium text-ink-500 transition-colors duration-200 hover:bg-surface-muted"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {footer.columns.length > 0 && (
            <nav
              aria-label={labels.footerNav}
              /* One column on phones, not the template's two: at 375px a
                 two-column grid gives each link 156px, and "Интеграции и
                 пайплайны данных" is three lines in 156px. Same two groups,
                 stacked, every link on one line. */
              className="grid flex-1 grid-cols-1 gap-8 tablet:flex tablet:justify-between"
            >
              {footer.columns.map((column) => (
                <div key={column.title} className="flex flex-col items-start gap-5">
                  <h2 className="font-display text-[22px] leading-[33px] text-ink-500">
                    {column.title}
                  </h2>
                  <ul className="flex flex-col items-start gap-[10px]">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.href}`}>
                        <Link
                          href={link.href}
                          className="text-[18px] leading-[27px] text-ink-250 transition-colors duration-200 hover:text-ink-700"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* ---- Copyright bar ---- */}
        <div className="flex w-full flex-col items-center gap-10 border-t border-line pt-8">
          <p className="max-w-[902px] text-[16px] leading-[24px] text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
