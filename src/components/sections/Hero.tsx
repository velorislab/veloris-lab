"use client";

import { motion, useReducedMotion } from "motion/react";

import { HorizonGrid } from "@/components/backgrounds/HorizonGrid";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { getHome } from "@/data/content";
import { heroVariants, transitions } from "@/lib/motion";
import { type LabLang } from "@/site/labData";

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
  /* The two CTA definitions that used to sit here went with the buttons they
     fed. They were `getSite(lang).heroCta` and `UI.priceList` on
     `pricingPath(lang)`; both are still assembled elsewhere, so bringing the
     row back is markup rather than data. */

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
      /* THE FIRST SCREEN HAS ITS OWN GROUND, AND IT DISSOLVES INTO THE PAGE.
         It used to sit on the page colour like everything else, so the fold and
         the run of white cards below it were one undifferentiated field.

         A FLAT FILL WAS THE FIRST ATTEMPT AND IT WAS WRONG. Ending a solid tint
         at the section's edge draws a hard line straight across the viewport at
         exactly the height the eye is travelling through. The gradient holds the
         tint solid down to 58%, which is where `HorizonGrid`'s vanishing point
         sits at `horizon={0.6}`, and spends the remaining 42% arriving at the
         page colour: the copy stands on flat ground, the grid animates through
         the dissolve, and by the bottom edge the section already IS the page, so
         there is nothing to seam.

         IT ENDS ON `page` AND NOT ON WHITE, which matters more than it reads.
         What follows this section is the page at #f6f7f9, not #ffffff. Fading to
         white would move the seam rather than remove it: the line would land one
         pixel lower, between the white the gradient reached and the grey the
         page actually is.

         THE TINT IS `surface-alt` AND NOT `surface-tint`, and that was measured.
         The palette's light blue is #f1f7fc against a #f6f7f9 page: nine parts
         of a percent of luminance, [-5, 0, +3] per channel, which is not a tint,
         it is the same colour. The greys are the only tokens with enough
         distance to read, and #edeff3 is the furthest at -7.3%. A blue that
         strong is not in the palette, so a blue fold means adding a token to
         DESIGN.md rather than reaching for one. */
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center gap-[50px] overflow-hidden bg-linear-to-b from-surface-alt from-[58%] to-page px-4 pt-[110px] pb-[40px] tablet:gap-[70px] tablet:px-10 desktop:gap-[90px] desktop:px-0"
    >
      {/* THE ONLY THING IN THE BACKGROUND, and the fold went through two other
          answers to get here.

          FOUR DRAWN INTERFACES used to lean in from the margins: a bot thread,
          a metric card, a deal row and a run notification. They were there
          because the template put a screenshot of its own product in this spot
          and the raster never came across, so they were drawn, with invented
          names, invented figures and an invented «онлайн». On a site that
          deletes a section rather than invent the proof it asks for, four small
          fake products in the fold were the one place that rule was not
          applied. `HeroAside.tsx` and the `HERO_ASIDE` block that fed it are
          gone.

          A DOT FIELD replaced them and then went the same way. It filled the
          top of the screen behind the copy, dissolved into this grid across the
          band where these lines are born, and lit up under the pointer. It
          worked, and it was a second texture on a screen that already had one.
          What the margins are for turns out to be air, and what the fold is for
          is the sentence in the middle of it.

          The horizon runs the full height of the first screen, with its
          vanishing point just under the headline: 0.6 of the hero height,
          measured against where the h1 actually ends rather than guessed. It
          replaces a static `hero-grid.svg` that was 223px tall and pinned 256px
          down, so the perspective started below the copy and ran out well
          before the fold. */}
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
      {/* `page-col` AND NOT `max-w-[1101px]`, because 1101 was only ever the
          desktop half of the answer. See the utility in globals.css: below the
          tablet breakpoint the page under this hero is a 418px column and this
          block was ignoring it, so the fold and the first section disagreed
          about the width of the page by nearly 300px on any screen between a
          large phone in landscape and a small tablet. */}
      <div className="page-col relative flex flex-col items-center gap-[50px]">
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
                className="w-full text-balance text-[36px] leading-[1.2] font-semibold text-ink-800 tablet:text-[48px] desktop:text-[64px] desktop:leading-[76.8px]"
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

          {/* THE TWO BUTTONS ARE GONE and the plates stayed. They used to share
              a wrapper, so the wrapper went with them and this is now the fold's
              last element in its own right.

              WHAT THAT COST, on the record rather than rediscovered: the fold
              has no action left. The header's CTA is the only one on the first
              screen now, and it leaves on a scroll down. `site.heroCta` and
              `UI.priceList` are still assembled in `config/site.ts`, so the row
              comes back as markup rather than as data.

              THREE PLATES instead of the one mono line that used to close the
              fold. The line said the floor and the window; these say what it
              costs to start, to build and to keep, which is the whole shape of
              the offer and the three things a stranger wants before they scroll.

              THREE COLUMNS AT EVERY WIDTH, including 360px, and that is the
              load-bearing decision. Stacked they add about 240px and push the
              next section back above the fold, which is the one thing this hero
              was explicitly built not to do. Side by side they cost 90px. The
              type steps down rather than the layout breaking up: 13px figures
              and 11px captions on a phone, which is small but is a figure and a
              label, not prose.

              No border, no shadow and no rules between them either. The
              hairlines went the same way the ones in the motto panel did: three
              figures with their own captions are already three groups, and a
              line drawn between them repeats what the spacing has said. The gap
              carries it instead, and stays small on a phone where the three
              columns have about 90px each to live in.

              AND NO INNER PADDING ON A PHONE, which is what those 90px buy.
              `px-2` was spending 16 of them, and the figures do not wrap: at
              360px «от $120/мес» and its caption were both wider than the box
              they were centred in and painted over the gutter, at 320px by
              15px. The 12px gap is the whole separation there, and it is enough
              because nothing in a column reaches its edge any more. The padding
              comes back at tablet, where there is room for it to mean
              something. */}
          <motion.div
            variants={heroVariants.riseIn}
            initial={initial}
            animate={animate}
            transition={transitions.note}
            className="relative grid w-full max-w-[680px] grid-cols-3 gap-x-3 tablet:gap-x-8"
          >
            {hero.marks.map((m) => (
              <div key={m.caption} className="flex flex-col items-center gap-[2px] text-center tablet:px-4">
                <span className="font-display text-[13px] leading-5 font-semibold whitespace-nowrap text-ink-800 tablet:text-[18px] tablet:leading-7">
                  {m.value}
                </span>
                <span className="text-[11px] leading-[15px] text-ink-250 tablet:text-[14px] tablet:leading-5">
                  {m.caption}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
