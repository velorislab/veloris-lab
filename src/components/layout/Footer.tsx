import Link from "next/link";

import { getSite } from "@/config/site";
import { Mark } from "@/components/ui/Mark";
import { SocialGlyph } from "@/components/ui/SocialGlyph";
import type { LabLang } from "@/site/labData";

/**
 * The footer, in one row: the wordmark and what the studio is on the left, the
 * three profiles and the copyright on the right.
 *
 * ONE ROW, NOT THREE. What is left of this footer is a name, a descriptor,
 * three chips and a date. Stacked, that was two bands and a hairline of chrome
 * around four short things, and the hairline existed to separate bands that no
 * longer exist. `flex-wrap` is what makes the single row honest: the four
 * groups need about 950px and the container offers 1200, so they sit on one
 * line on desktop and fold in the order they are written below it, rather than
 * being clipped at the tablet width where the arithmetic runs out.
 *
 * WHAT IS NOT HERE, and why each one went.
 *
 *   The two link columns. They held the six service pages, /solutions and
 *   /pricing beside the four cases, and they were the only site-wide links the
 *   service pages had: the cases are in the header menu and the other two are
 *   in the header pill, but a service page is now reached from its card on the
 *   home page and from the cases that name it. That is the cost of this shape,
 *   and it is worth knowing before the columns come back.
 *
 *   The mail pill. It sat above the social row at 18px, which made an address
 *   the most prominent contact in the footer while pointing at the channel this
 *   business answers on least. Telegram is in the row that replaced it.
 *
 *   The quotation marks around the tagline. They were right around the motto
 *   that used to stand there and wrong around a category name: quoting a
 *   descriptor reads as distance from it.
 *
 *   The disclaimer, which was four sentences of hedging about course
 *   availability, written for a business that sells courses.
 *
 * WHAT STAYED AND WHY.
 *
 *   The wordmark is text, for the same reason it is text in the header: there
 *   is no logo file for this brand and the Aston one is not ours to render.
 *
 *   The three profiles, now as three matching chips. Telegram used to render as
 *   the word "Telegram" beside two full-colour brand tiles, because `public/`
 *   had files for the other two and none for it. All three are geometry now;
 *   see `SocialGlyph` for why that was the fix and not a third file.
 */

/** 1px hairline, between the wordmark and the descriptor. */
function Rule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`bg-line ${className}`} />;
}

export function Footer({ lang }: { lang: LabLang }) {
  const { footer, social, name, tagline, home, homeAria } = getSite(lang);

  return (
    <footer className="flex w-full justify-center bg-surface">
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-8 px-4 py-12 tablet:flex-row tablet:flex-wrap tablet:items-center tablet:justify-between tablet:gap-x-10 tablet:gap-y-6 tablet:px-[30px] tablet:py-14 desktop:px-0">
        {/* ---- Wordmark and descriptor ----
            The rule between them carries the sentence: the wordmark is the
            subject and the descriptor is what it is, which is why that string
            no longer repeats the brand name. It is hidden while the two are
            stacked, where a horizontal rule would read as a divider between
            separate things instead of a join between two halves of a phrase. */}
        <div className="flex flex-col items-start gap-2 tablet:flex-row tablet:items-center tablet:gap-4">
          <Link
            href={home}
            aria-label={homeAria}
            className="flex items-center gap-3 font-display text-[26px] leading-[39px] font-medium text-ink-700 transition-colors duration-200 hover:text-ink-500"
          >
            <Mark size={28} />
            {name}
          </Link>
          <Rule className="hidden h-[22px] w-px tablet:block" />
          <p className="font-display text-[18px] leading-[27px] text-ink-500">
            {tagline}
          </p>
        </div>

        {/* ---- Profiles and copyright ---- */}
        <div className="flex flex-col items-start gap-5 tablet:flex-row tablet:items-center tablet:gap-6">
          {/* Three identical chips, so no rules between them: the hairlines that
              used to stand there were separating an icon from a word, and there
              is no longer a word. The label is the accessible name rather than
              visible text, which is what lets all three be the same square. */}
          {social.length > 0 && (
            <div className="flex items-center gap-3">
              {social.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex size-[46px] items-center justify-center rounded-[12px] border border-line bg-page text-ink-400 transition-colors duration-200 hover:bg-surface-muted hover:text-ink-700"
                >
                  <SocialGlyph name={item.key} />
                </a>
              ))}
            </div>
          )}

          <p className="text-[16px] leading-[24px] whitespace-nowrap text-ink-300">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
