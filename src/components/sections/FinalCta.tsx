import Image from "next/image";

import { Mark } from "@/components/ui/Mark";

import { Button } from "@/components/ui/Button";
import { getHome } from "@/data/content";
import {
  CONTACT,
  TELEGRAM,
  TELEGRAM_HANDLE,
  UI,
  tx,
  type LabLang,
} from "@/site/labData";

/**
 * The anchor the whole site points at. `whoCanUse.panel`, the nav and the
 * service and case pages all link to `#contact`; before this section carried
 * the id, every one of those links landed nowhere on the home page.
 *
 * The template's own `#get-started` id went with it, and nothing points at it
 * any more: the header's Aston menu, which was its last reader, is gone too.
 * `ANCHORS.contact` in `src/config/site.ts` is now the one place the chrome
 * spells this id, so the section and the nav cannot drift apart.
 */
const SECTION_ID = "contact";

/**
 * The close, on our content: blue gradient panel, three assurance chips, and
 * the two addresses that actually reach us.
 *
 * TWO RASTER DECORATIONS ARE GONE, both because the file is not in this repo
 * and is not coming back: `cta-design.jpg`, a full-bleed texture over the
 * gradient, and `cta-icon-light.png`, a colour-dodge glow in front of the icon
 * plate. Neither is load-bearing (both are `absolute` children of an
 * `aria-hidden` layer), so dropping them costs no layout, where keeping them
 * would cost two 404s on every render. The four SVG decorations stay.
 *
 * THE ROW IS BACK DOWN TO ONE CHANNEL. It briefly held two, Telegram and a
 * prefilled mailto, and the mail half is gone; it stays a `flex-wrap` row
 * because `showOwnCta` can still put a second button beside it. The button
 * prints no address: the label names the action, and the handle rides along as
 * the tooltip, which is what lets a reader see where they are going before they
 * click.
 */
export function FinalCta({ lang }: { lang: LabLang }) {
  const { finalCta } = getHome(lang);
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang);

  /* Prefilled, exactly as the calculator and the service pages do it: a chat
     that opens on an empty input gets the same three prompts here. Telegram's
     deep link resolves the recipient and drops the text into the input bar, so
     the reader edits a draft instead of composing one. */
  const tgHref = `${TELEGRAM}?text=${encodeURIComponent(
    L(CONTACT.tgDirectText),
  )}`;

  /* `content.ts` sends the close's own CTA to `#contact`, which is now this
     section: a button that scrolls you to the block you are already reading.
     So it renders only once it has somewhere else to go. Today it does not,
     and the row below is the two real destinations. */
  const showOwnCta = finalCta.ctaHref !== `#${SECTION_ID}`;

  return (
    <section
      id={SECTION_ID}
      className="section-shell overflow-hidden rounded-section border border-line px-6 py-12 tablet:px-12 tablet:py-16 desktop:gap-[50px] desktop:px-20 desktop:py-[60px]"
      style={{
        backgroundImage:
          "linear-gradient(210.198deg, rgb(0, 101, 255) 0%, rgb(51, 132, 255) 69.6669%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/backgrounds/cta-dots.svg"
          alt=""
          fill
          sizes="(min-width: 1320px) 1200px, 100vw"
          className="object-cover"
        />
        <Image
          src="/images/backgrounds/cta-abstract-grid.svg"
          alt=""
          width={1187}
          height={130}
          className="absolute inset-x-[6.5px] bottom-0 w-[calc(100%-13px)]"
        />
      </div>

      <div className="relative flex w-full max-w-[1040px] flex-col items-center gap-[30px]">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="relative flex size-[92px] items-start justify-start rounded-pill bg-[rgba(2,48,252,0.2)] p-[10px]">
            {/* The grid glow behind the badge. Its companion in front of it was
                the missing PNG, so the plate now sits on one layer, not two. */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-[-140px] left-1/2 z-0 h-[247px] w-[350px] -translate-x-1/2 overflow-hidden"
            >
              <Image
                src="/images/backgrounds/cta-icon-grid.svg"
                alt=""
                fill
                sizes="350px"
                className="object-cover"
              />
            </span>
            {/* Same as the WhatsIn crest: the 16px inset and the blue inner
                glow existed to seat somebody else's letterform, and both fight a
                disc that brings its own rim. */}
            <Mark size={72} className="relative z-[2]" />
          </div>

          <div className="flex w-full max-w-[740px] flex-col items-center justify-center gap-[10px] text-center">
            <h2 className="text-[30px] leading-[1.2] text-white tablet:text-[38px] desktop:text-[48px] desktop:leading-[57.6px]">
              {finalCta.title}
            </h2>
            <p className="text-[16px] leading-6 text-page tablet:text-[18px] tablet:leading-[27px]">
              {finalCta.description}
            </p>
          </div>
        </div>

        {finalCta.points.length > 0 && (
          <ul className="flex flex-wrap items-start justify-center gap-[10px]">
            {finalCta.points.map((point) => (
              <li
                key={point}
                className="flex items-center justify-center gap-[5px] rounded-pill bg-surface py-2 pr-4 pl-2"
              >
                <Image
                  src="/images/icons/list/cta-check.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
                <span className="text-[16px] leading-6 text-ink-500">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Same `relative` the single button carried, moved onto the row so the
          whole group clears the decorative layer. `gap-3` is the hero's
          button-pair gap, so the two rows of the page match. */}
      <div className="relative flex flex-wrap items-center justify-center gap-3">
        {showOwnCta && (
          <Button href={finalCta.ctaHref} variant="secondary">
            {finalCta.ctaLabel}
          </Button>
        )}
        {/* The handle lives on the wrapper rather than the button: `Button` has
            no `title` prop, and a tooltip set on an ancestor still answers for
            the link inside it. */}
        <span className="inline-flex" title={TELEGRAM_HANDLE}>
          <Button href={tgHref} variant="secondary">
            {L(UI.ctaTg)}
          </Button>
        </span>
      </div>
    </section>
  );
}
