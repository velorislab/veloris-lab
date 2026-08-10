"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { HorizonGrid } from "@/components/backgrounds/HorizonGrid";
import { Button } from "@/components/ui/Button";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { getSite } from "@/config/site";
import { getHome } from "@/data/content";
import { heroVariants, transitions } from "@/lib/motion";
import { UI, tx, type LabLang } from "@/site/labData";
import { pricingPath } from "@/site/routing";

/**
 * The hero, on our content.
 *
 * FOUR OF THE TEMPLATE'S SLOTS ARE GONE, and all four for the same reason: the
 * thing behind them does not exist here (see the comments in `data/content.ts`,
 * which empties every one of them at the seam).
 *
 *   avatar stack     three stock portraits inside the badge pill. The badge now
 *                    carries our one strongest credential as text, so the pill
 *                    lost the 60px avatar rail and its padding was evened up
 *                    from 8/14 to a symmetric 14.
 *   hero visual      a screenshot of the template's own dashboard, with a play
 *                    button over it. We have no product film and no dashboard
 *                    to show at the top of a services page.
 *   widget columns   two rails of floating tiles, plus the gradient masks that
 *                    faded them into the page. Every tile was a screenshot of
 *                    somebody else's product.
 *   trust strip      "Trusted by over 14,540 businesses", six invented client
 *                    logos, the divider under them and two review-score cards.
 *                    Three separate claims about strangers, so the whole block
 *                    goes rather than being rewritten smaller.
 *
 * The section's bottom edge closes on its own: the removed blocks were the two
 * later children of a flex column, and `page-main` already puts 200/150/80px
 * between the hero and the first section, so nothing has to be padded back in.
 */
export function Hero({ lang }: { lang: LabLang }) {
  const { hero } = getHome(lang);
  const reduceMotion = useReducedMotion();
  // Framer animates these once on load; with reduced motion we render the
  // resolved state directly rather than a shortened animation.
  const animate = reduceMotion ? undefined : "visible";
  const initial = reduceMotion ? "visible" : "hidden";

  /* TWO BUTTONS, and the pair is ours rather than the template's, which ended
     on a single CTA to its own checkout.

     The primary now reads from `getSite(lang).heroCta`, so the calculator
     anchor is spelled once, in `ANCHORS`, rather than typed here as well. The
     secondary has no counterpart in the chrome (the price list is a footer
     column there, not a CTA), so it stays composed from `UI` and `routing`.
     Neither line types a figure or a URL.

     STILL TO SETTLE, and it is the reason `#estimate` currently goes nowhere:
     the calculator is not in this composition yet. The old home page carried it
     as `id="calc"` while the service and pricing pages carry it as
     `id="estimate"`. This button, `content.ts` (about and process) and
     `ANCHORS.estimate` all say `#estimate`, so the three light up together the
     moment that section lands under that id. */
  const primaryCta = getSite(lang).heroCta;
  const secondaryCta = { label: tx(UI.priceList, lang), href: pricingPath(lang) };

  return (
    <section
      id="hero"
      /* ONE SCREEN, EXACTLY, at every width.
       *
       * `100svh` and not `100vh`: on a phone `vh` is the height with the browser
       * chrome retracted, so a `100vh` hero is taller than what you can actually
       * see and the next section peeks under the address bar — the precise thing
       * this is here to stop. `svh` is the small viewport, chrome showing, which
       * is what you get on arrival.
       *
       * `min-h` and not `h`: where the copy is taller than the screen — a narrow
       * phone in Russian, where the headline runs to four lines — the section
       * grows instead of clipping.
       *
       * `justify-center` is the other half. Left top-aligned the block just sat
       * under its 160px of padding and the slack all piled up underneath, which
       * looks like a page that failed to load rather than like a full screen.
       * The padding now only sets the minimum clearance from the fixed 94px
       * header; the slightly larger top value pushes the optical centre down a
       * touch, which is what compensates for that header.
       */
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center gap-[50px] overflow-hidden px-4 pt-[110px] pb-[40px] tablet:gap-[70px] tablet:px-10 desktop:gap-[90px] desktop:px-0"
    >
      {/* The horizon runs the full height of the first screen, with its
          vanishing point just under the headline: 0.6 of the hero height, measured
          against where the h1 actually ends rather than guessed. It replaces a static
          `hero-grid.svg` that was 223px tall and pinned 256px down, so the
          perspective started below the copy and ran out well before the fold. */}
      <HorizonGrid color="#c0c5cd" speed={0.5} horizon={0.6} className="z-0" />

      {/* -------------------------------------------------- decorative layer */}
      {/* GONE, and this is why, because the markup looked harmless.

          The template opened on two raster glows, `hero-light-ray-left.jpg` and
          `-right.jpg`, in an `aria-hidden pointer-events-none absolute` layer.
          Neither file was copied into this repo and neither is coming back.

          Kept in place they cost two failing optimiser requests per render, and
          `priority` turned each one into a `<link rel="preload">` carrying a
          fifteen-candidate srcset of URLs that answer 400. They bought nothing
          back: the layer is out of flow, so it sets no height and no spacing,
          and with no file behind it the hero already painted with no glow. The
          pixels are identical without it.

          To restore the layer: drop two wide, transparent artworks at those two
          paths and re-add a `motion.div` per side using `heroVariants.lightRayLeft`
          / `lightRayRight` with `transitions.lightRay`, positioned
          `absolute top-0 left-0` / `right-0`, sized
          `h-[462px] w-[345px] desktop:h-[725px] desktop:w-[541px]`, inside an
          `aria-hidden pointer-events-none absolute inset-x-0 top-0 h-[725px]` box. */}

      {/* ------------------------------------------------------------ content */}
      <div className="relative flex w-full max-w-[1101px] flex-col items-center gap-[50px]">
        <div className="relative flex w-full flex-col items-center gap-10 desktop:px-20">
          <div className="relative flex w-full max-w-[941px] flex-col items-center gap-4">
            {/* The credential pill that used to open the fold is gone, at the
                founder's call. What it said now opens the sub instead, as a
                sentence rather than a chip, and the first screen carries one
                fewer object above the headline.

                `heroVariants.badge` and `transitions.badge` stay in the motion
                config: they are the template's, shared, and not ours to prune
                from here. */}

            <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
              <motion.h1
                variants={heroVariants.heading}
                initial={initial}
                animate={animate}
                transition={transitions.heading}
                className="w-full text-[36px] leading-[1.2] font-semibold text-ink-800 tablet:text-[48px] desktop:text-[64px] desktop:leading-[76.8px]"
              >
                {/* The lead is fixed and one word cycles inside it, in the
                    accent, which is the whole point of the device. The plain
                    `hero.title` is still what metadata and a no-JS reader get.

                    `w-full` on the h1 is load-bearing. This column is
                    `items-center`, so without it the heading shrink-wraps to its
                    own text and its width follows whichever word is showing —
                    which then feeds the rotator's box and makes it breathe. A
                    definite width breaks that loop; the text stays centred
                    because the column already sets `text-center`. */}
                {hero.rotatorLead}{" "}
                <RotatingWord words={hero.rotatorWords} className="text-accent" />
              </motion.h1>
              <motion.p
                variants={heroVariants.riseIn}
                initial={initial}
                animate={animate}
                transition={transitions.paragraph}
                className="max-w-[581px] text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]"
              >
                {hero.description}
              </motion.p>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center gap-4">
            {/* Both buttons ride the template's single button entrance, so the
                pair arrives as one beat rather than two. */}
            <motion.div
              variants={heroVariants.riseIn}
              initial={initial}
              animate={animate}
              transition={transitions.button}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Button
                href={primaryCta.href}
                className="h-[58px] px-6 py-4 text-[17px] leading-[25.5px]"
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="muted"
                className="h-[58px] px-6 py-4 text-[17px] leading-[25.5px]"
              >
                {secondaryCta.label}
              </Button>
            </motion.div>
            {/* The note kept its place and its type, and lost the Figma glyph
                that used to sit in front of it: the line now states our price
                floor and shortest window, and a Figma mark beside that reads as
                an offer of a file we do not ship. */}
            <motion.div
              variants={heroVariants.riseIn}
              initial={initial}
              animate={animate}
              transition={transitions.note}
              className="flex items-center justify-center gap-1"
            >
              <span className="text-center text-[16px] leading-6 text-ink-250">
                {hero.note}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
