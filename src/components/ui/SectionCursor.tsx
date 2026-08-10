"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * A pointer follower scoped to ONE section.
 *
 * Requested as `mdafsarx/tech-curosr` from the 21st.dev registry, which answers
 * 403 without an API key, so this is the same effect built on what the project
 * already has. Nothing was copied: motion is already a dependency and the
 * geometry is ours.
 *
 * SCOPED IS THE WHOLE POINT, and three separate things enforce it:
 *
 *   The overlay is `absolute inset-0` inside the section, and that section is
 *   `overflow-hidden` with a 50px radius, so the visuals are clipped to the slab
 *   by construction rather than by arithmetic.
 *   Listeners are attached to the parent element, not the window, so nothing
 *   fires while the pointer is anywhere else on the page.
 *   The native cursor is hidden IMPERATIVELY on mount and restored on unmount,
 *   never by a class in the markup. A class would leave a reader with
 *   JavaScript disabled staring at a section with no cursor at all.
 *
 * It renders nothing at all for a coarse pointer or under reduced motion: a
 * follower that lags behind a finger is meaningless, and a follower that lags
 * behind a pointer is exactly the movement reduced motion asks us to drop. Both
 * are decided AFTER mount, in an effect, so the server and the first client
 * render agree; deciding in the body from a media query is a hydration mismatch.
 */
export function SectionCursor() {
  const holder = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [inside, setInside] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  /* The dot tracks tightly and the ring trails it. One spring, two stiffnesses:
     the gap between them IS the effect. */
  const dotX = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 170, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 170, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
  }, [reduce]);

  useEffect(() => {
    const host = holder.current?.parentElement;
    if (!host || !enabled) return;

    const move = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      x.set(e.clientX - b.left);
      y.set(e.clientY - b.top);
    };
    const enter = (e: PointerEvent) => {
      // Place it before showing it, or the first frame flies in from 0,0.
      move(e);
      dotX.jump(x.get()); dotY.jump(y.get());
      ringX.jump(x.get()); ringY.jump(y.get());
      setInside(true);
    };
    const leave = () => setInside(false);

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);

    const previous = host.style.cursor;
    host.style.cursor = "none";

    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      host.style.cursor = previous;
    };
  }, [enabled, x, y, dotX, dotY, ringX, ringY]);

  return (
    <div
      ref={holder}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      {enabled && (
        <>
          {/* The trailing ring, with two ticks so it reads as an instrument
              rather than as a bubble. */}
          <motion.div
            style={{ x: ringX, y: ringY, opacity: inside ? 1 : 0 }}
            transition={{ opacity: { duration: 0.18 } }}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="block size-[38px] rounded-pill border border-[var(--mark-wave)]/60" />
            <span className="absolute top-1/2 -left-[7px] h-px w-[6px] -translate-y-1/2 bg-[var(--mark-wave)]/70" />
            <span className="absolute top-1/2 -right-[7px] h-px w-[6px] -translate-y-1/2 bg-[var(--mark-wave)]/70" />
          </motion.div>

          {/* The dot, in the brand coral, because this section is the one place
              on the site where that colour has a dark ground to sit on. */}
          <motion.span
            style={{ x: dotX, y: dotY, opacity: inside ? 1 : 0 }}
            transition={{ opacity: { duration: 0.12 } }}
            className="absolute top-0 left-0 block size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-pill bg-[var(--mark-wave)]"
          />
        </>
      )}
    </div>
  );
}
