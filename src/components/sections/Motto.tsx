"use client";

import { Fragment, useEffect, useRef } from "react";

import { Ticker } from "@/components/sections/Ticker";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * Statement panel: the line, three headline figures, and the capability ribbon.
 * Framer values: 1200px shell, 100px/170px padding, 40px radius, 8px white ring.
 *
 * THREE DEPARTURES FROM THE TEMPLATE, ALL DELIBERATE.
 *
 * The figures do not count up. The template ticks each one from a lower number
 * to a higher one the first time it scrolls into view, which is a nice motion
 * for an invented statistic and a bad one for a checkable fact: a number that is
 * still climbing while you read it is a number you cannot check. Ours render at
 * their final value, in the same type, in the same place.
 *
 * The panel's fill is a gradient rather than the artwork. `motto-section.png`
 * and the two abstract corner plates were raster files that did not come across
 * with the template, and this panel is the one place where the background is
 * load-bearing rather than decorative: the type on it is white. The gradient
 * below is the blue wash that artwork carries, so the contrast survives without
 * pointing at a file that is not there. Its lightest stop went when the pointer
 * glow arrived — see the `style` on the section for why.
 *
 * The ribbon moved in here from under the hero. It is the same thirteen words;
 * what changed is that it now closes a panel instead of straddling the seam
 * between the hero and the page, which is what it was doing.
 *
 * WHY THIS IS A CLIENT COMPONENT. Only the glow. Everything else here is static,
 * and the pointer handler is the entire reason for the directive.
 */
export function Motto({ lang }: { lang: LabLang }) {
  const { motto } = getHome(lang);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  /**
   * The glow follows the pointer across the panel.
   *
   * IT STARTS INVISIBLE, and that is a hydration fix before it is a look.
   * Parking it anywhere on first paint would mean measuring the panel, which
   * cannot happen until after mount, so the server would render one position and
   * the client another and the thing would jump on arrival. Fading in on the
   * first pointer sample sidesteps the measurement entirely.
   *
   * It also means the panel at rest has no light on it at all, which is the
   * intended state now that the gradient's fixed pale corner is gone: one light
   * source, and it is wherever the reader is pointing. A touch device gets the
   * bare gradient and nothing else, because a hover never fires there.
   *
   * THE EASING IS A CSS TRANSITION, NOT A rAF LERP, and the first draft here was
   * the lerp. Writing the pointer position straight to the transform makes the
   * light snap from sample to sample, which reads as a stuttering spotlight, so
   * it needs weight either way. A transition buys that from the compositor: the
   * handler sets one transform and the browser eases to it, restarting cleanly
   * when the next sample lands mid-travel. The loop version scheduled frames of
   * its own, needed a convergence test to stop scheduling them, and froze
   * wherever it had got to whenever rAF was suspended — which is not only the
   * background-tab case, it is measurable in any hidden document. This has no
   * frames to lose.
   *
   * Reduced motion keeps the glow and drops the travel: the light is exactly
   * where the pointer is. Following the reader's own hand is the one kind of
   * movement the preference is not asking us to remove; the lag is the part of
   * it that would be.
   */
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    /* No hover, no follower. A coarse pointer would land the glow wherever the
       last tap was and leave it there, which is worse than not having it. */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FADE = "opacity 500ms ease-out";
    /* Slightly longer than the fade and on a decelerating curve, so the light
       arrives rather than stops. */
    const TRAVEL = `transform 380ms cubic-bezier(0.22, 1, 0.36, 1), ${FADE}`;

    let placed = false;

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const x = Math.round(e.clientX - r.left);
      const y = Math.round(e.clientY - r.top);

      /* The first sample after entering places the light rather than easing to
         it, so it fades in under the cursor instead of flying in from wherever
         it was left. Everything after that travels. */
      if (!placed) {
        glow.style.transition = FADE;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        /* Read back a layout value to flush that placement before the travel
           transition goes on, or the browser coalesces the two and the light
           animates in from its old position after all. */
        void glow.offsetWidth;
        glow.style.transition = still ? FADE : TRAVEL;
        glow.style.opacity = "1";
        placed = true;
        return;
      }

      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onLeave = () => {
      glow.style.opacity = "0";
      placed = false;
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-shell relative w-full overflow-hidden rounded-section border border-line px-6 py-14 shadow-[0_0_0_8px_#ffffff,0_17px_24px_0_rgba(178,178,178,0.08)] tablet:px-16 tablet:py-20 desktop:gap-[60px] desktop:px-[170px] desktop:py-[100px]"
      /* Two blues, and the pale `#bad6ff` that used to sit at 0% is gone. It was
         a fixed wash in the bottom-left corner, which is the one thing on this
         panel that read as a light source; with a light that follows the pointer
         there are otherwise two of them, one of them nailed down. What is left
         is depth rather than glow: lighter at the bottom-left, deeper towards
         the top-right, same direction as before. */
      style={{
        backgroundImage: "linear-gradient(to top right, #3384ff 0%, #0065ff 100%)",
      }}
    >
      {/* The follower. `blur` rather than a soft gradient stop because a blurred
          disc keeps its shape while it moves, where a wide gradient banded
          visibly against the flat blue underneath. The section already clips at
          the panel radius, so nothing escapes the corners. */}
      <span
        ref={glowRef}
        aria-hidden
        /* The transition is set from the effect rather than here, because the
           first placement has to happen without one. This keeps only the resting
           state: invisible, and parked at the panel's top-left until a pointer
           gives it somewhere to be. */
        className="pointer-events-none absolute top-0 left-0 z-0 h-[460px] w-[460px] rounded-full opacity-0 blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(186,214,255,0.34) 45%, rgba(186,214,255,0) 72%)",
        }}
      />

      <div className="relative z-[1] flex w-full flex-col items-center gap-10 desktop:gap-[60px]">
        <h2 className="max-w-[860px] text-center text-[28px] leading-[1.25] text-white tablet:text-[40px] desktop:text-[56px] desktop:leading-[72.8px]">
          {motto.title}
        </h2>

        {/* Figures sit in equal-width columns separated by hairlines; the
            labels are allowed to overflow their column rather than wrap. */}
        <div className="flex w-full max-w-[860px] flex-col items-center justify-center gap-8 tablet:flex-row tablet:gap-[60px] desktop:px-20">
          {motto.stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && (
                <div aria-hidden className="hidden h-[58px] w-px shrink-0 bg-white tablet:block" />
              )}
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
                <p className="flex items-center justify-center font-display text-[38px] leading-[1.2] text-white desktop:text-[50px] desktop:leading-[60px]">
                  {stat.value}
                  {stat.suffix && <span aria-hidden>{stat.suffix}</span>}
                </p>
                <p className="text-center text-[16px] leading-6 whitespace-nowrap text-surface-muted tablet:text-[18px] tablet:leading-[27px]">
                  {stat.label}
                </p>
              </div>
            </Fragment>
          ))}
        </div>

        {/* A hairline above it, at the same weight as the ones between the
            figures, so the ribbon reads as the panel's last band rather than as
            a fourth thing floating under the numbers. It runs full width where
            those are 58px tall, because this one separates rows and they
            separate columns. */}
        <div className="flex w-full flex-col items-center gap-6">
          <div aria-hidden className="h-px w-full bg-white/25" />
          <Ticker lang={lang} />
        </div>
      </div>
    </section>
  );
}
