"use client";

import { useEffect, useRef } from "react";

import { Ticker } from "@/components/sections/Ticker";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * Statement panel: the line, three headline figures, and the capability ribbon.
 * Framer values: 1200px shell, 100px/170px padding, 40px radius, 8px white ring.
 *
 * THREE DEPARTURES FROM THE TEMPLATE, ALL DELIBERATE.
 *
 * The figures count up once, on the scroll that first reaches them, and there
 * are no rules between them any more. Both are recent and both reverse
 * something this file used to argue; the counter's reasoning is on the effect
 * that runs it, the rules' is on the row they used to divide.
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
  const figuresRef = useRef<HTMLDivElement>(null);

  /**
   * The figures count up once, when the scroll first brings them into view.
   *
   * THIS REVERSES A DECISION THIS FILE USED TO ARGUE FOR, so the argument is
   * worth answering rather than deleting. It was: a number still climbing while
   * you read it is a number you cannot check, which is a nice motion for an
   * invented statistic and a bad one for a countable fact. Three things answer
   * it here. The true value is what the server renders, so it is in the HTML,
   * in view-source and in anything that reads the page without running it. The
   * climb lasts 900ms and only ever happens once. And it does not run at all
   * for a reader who asked for less motion.
   *
   * IT ALSO DOES NOT RUN IF THE PANEL IS ALREADY ON SCREEN AT LOAD. Parking the
   * numbers at zero happens after the first paint, so a visitor landing with
   * the panel in view would see the real figures flash and then reset, which is
   * worse than no animation. It is scroll-triggered by request and by name, and
   * a panel that never had to be scrolled to has nothing to trigger.
   */
  useEffect(() => {
    const root = figuresRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-count-to]"));
    const targets = nodes.map((node) => ({
      node,
      to: Number(node.dataset.countTo),
      final: node.textContent ?? "",
    }));
    /* Anything that is not a plain positive integer keeps whatever it renders.
       A figure like «10+» arrives here as 10 with the plus beside it, but a
       future one written as a range would not, and counting to NaN is worse
       than not counting. */
    if (targets.length === 0 || targets.some((t) => !Number.isFinite(t.to) || t.to <= 0)) return;

    /* Already on screen: leave it alone. See the note above. */
    const box = root.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return;

    /* NOTHING IS ZEROED UNTIL THE ANIMATION IS ABOUT TO RUN, and the first
       version of this got it wrong. It parked the figures at zero here, on
       mount, and left restoring them to machinery that might never run: an
       IntersectionObserver that a browser does not implement, or a constructor
       that throws, and the panel says «0+ проектов сдано» for the rest of the
       session. Zeroing inside the callback, one tick before the frame loop
       starts, means every path that fails to animate simply leaves the true
       numbers where the server put them. */
    if (typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let backstop = 0;
    let started = 0;
    const DURATION = 900;

    /* Land on the rendered string rather than on the rounded number, so the
       figure ends up byte-identical to what the server sent. */
    const finish = () => {
      targets.forEach((t) => {
        t.node.textContent = t.final;
      });
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const step = (now: number) => {
      if (!started) started = now;
      const p = Math.min(1, (now - started) / DURATION);
      /* Cubic ease-out: most of the distance is covered early, so the number is
         legible for longer than it is a blur. */
      const eased = 1 - Math.pow(1 - p, 3);
      targets.forEach((t) => {
        t.node.textContent = String(Math.round(t.to * eased));
      });
      if (p < 1) {
        frame = requestAnimationFrame(step);
        return;
      }
      finish();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        targets.forEach((t) => {
          t.node.textContent = "0";
        });
        frame = requestAnimationFrame(step);
        /* THE BACKSTOP, armed in the same tick as the zeroing. From here on the
           figures are false until the loop lands, so a timer on the wall clock
           rather than on the frame clock restores them a little after the
           animation should have ended. When the loop runs normally it has
           already finished and this writes the same strings a second time. */
        backstop = window.setTimeout(finish, DURATION + 400);
      },
      { threshold: 0.4 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if (backstop) clearTimeout(backstop);
    };
  }, []);

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

        {/* NO RULES BETWEEN THE COLUMNS. Three figures at 50px with their own
            labels underneath are already three groups; the hairlines were
            drawing a border the proximity had drawn first, and on a saturated
            blue a full-white 1px line is the highest-contrast thing in the
            panel, louder than the numbers it was separating. The 60px gap does
            the separating now. */}
        <div
          ref={figuresRef}
          className="flex w-full max-w-[860px] flex-col items-center justify-center gap-8 tablet:flex-row tablet:gap-[60px] desktop:px-20"
        >
          {motto.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1"
            >
              <p className="flex items-center justify-center font-display text-[38px] leading-[1.2] text-white desktop:text-[50px] desktop:leading-[60px]">
                {/* The digits are their own node so the counter can rewrite
                    them without touching the plus beside it, which stays a
                    separate `aria-hidden` sibling. The rendered text is the
                    final value: the server sends the true number, and a reader
                    with no JavaScript keeps it. */}
                <span data-count-to={stat.to}>{stat.value}</span>
                {stat.suffix && <span aria-hidden>{stat.suffix}</span>}
              </p>
              <p className="text-center text-[16px] leading-6 whitespace-nowrap text-surface-muted tablet:text-[18px] tablet:leading-[27px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* The rule that used to sit above the ribbon went with the ones between
            the figures. The wrapper's own gap already separates them, and one
            surviving line on a panel with no other lines reads as a leftover. */}
        <div className="flex w-full flex-col items-center gap-6">
          <Ticker lang={lang} />
        </div>
      </div>
    </section>
  );
}
