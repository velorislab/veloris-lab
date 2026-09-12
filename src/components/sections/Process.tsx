"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

import { Button } from "@/components/ui/Button";
import { ProcessTrack } from "@/components/sections/ProcessTrack";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * Five stations on one rail. Support is the last stop on that rail, not a
 * leftover card on a second row: the wrapping 3+2 grid was what made the
 * fifth step look like an upsell.
 *
 * THE PAGE PARKS HERE. On desktop the extra height is the scroll that plays
 * the process; the inner stays sticky so the stations do not leave while
 * the mark fills them. Once Support is reached the extra height is cut and
 * the inner unsticks at the same viewport Y, so the next tick is About and
 * not a jump into the calculator. Scrolling back up is ordinary page motion,
 * not a second play of the park. Below 1320px there is no park.
 */
export function Process({ lang }: { lang: LabLang }) {
  const { process } = getHome(lang);
  const pinRef = useRef<HTMLElement>(null);
  const releasedRef = useRef(false);
  /* Viewport Y of the inner, sampled before the extra height is cut. Restoring
     that Y is what keeps the stations where they were; subtracting the height
     delta overshoots into the calculator above. */
  const pendingTop = useRef<number | null>(null);
  const [released, setReleased] = useState(false);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const release = () => {
    if (releasedRef.current) return;
    const inner = pinRef.current?.querySelector(".process-pin-inner");
    pendingTop.current = inner?.getBoundingClientRect().top ?? null;
    releasedRef.current = true;
    setReleased(true);
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p >= 0.98) release();
  });

  useLayoutEffect(() => {
    if (scrollYProgress.get() >= 0.98) release();
  }, [scrollYProgress]);

  useLayoutEffect(() => {
    if (!released) return;
    const inner = pinRef.current?.querySelector(".process-pin-inner");
    const want = pendingTop.current;
    pendingTop.current = null;
    if (!inner || want == null) return;
    const delta = inner.getBoundingClientRect().top - want;
    if (Math.abs(delta) <= 1) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollBy(0, delta);
    root.style.scrollBehavior = prev;
  }, [released]);

  return (
    <section
      id="process"
      ref={pinRef}
      className="process-pin section-shell items-stretch"
      data-released={released ? "" : undefined}
    >
      <div className="process-pin-inner gap-10 desktop:gap-[60px]">
        <div className="flex w-full flex-col items-center gap-[14px] text-center">
          <h2 className="max-w-[900px] text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
            {process.title}
          </h2>
          {process.description && (
            <p className="max-w-[780px] text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]">
              {process.description}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col items-center gap-8 desktop:gap-[50px]">
          <ProcessTrack steps={process.steps} progress={scrollYProgress} />
          {process.ctaLabel && (
            <Button href={process.ctaHref}>{process.ctaLabel}</Button>
          )}
        </div>
      </div>
    </section>
  );
}
