"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/* =============================================================================
   A star field surging outward, as a section background.

   Written to the API the founder supplied, so a drop-in replacement from
   whatever collection that snippet came from needs no call-site change:

     <StarSurge color="#c9cfe6" background="#0f1013" speed={1} count={260} />

   `StarSurge` is not on npm and the import path in the snippet
   (`~/components/backgrounds/effects`) is a copy-paste kit, so this is the
   effect rebuilt rather than the package installed.

   WHY THIS REPLACED THREE OVERLAYS. The slab previously carried two sweeping
   gradient beams, an arc of glyphs and a pointer trail that sprayed stack icons.
   The trail was the source of a real defect: resting the pointer near the
   section's corner piled glyphs into it, where the 50px radius sliced them, and
   it read as breakage rather than as an effect. One background that fills the
   panel does the job the three were sharing, and it cannot produce an artefact
   at an edge because it has no relationship to the pointer.

   Under prefers-reduced-motion the field is drawn once and left alone: still a
   star field, no travel.
   ========================================================================== */

export function StarSurge({
  color = "#c9cfe6",
  background = "transparent",
  speed = 1,
  count = 260,
  className = "",
}: {
  color?: string;
  background?: string;
  speed?: number;
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    /*
     * CARTESIAN, NOT POLAR, and that is a correction. The first model put every
     * star on a radius that died at 0.52 of half the diagonal: on this panel
     * that is 477px from the centre against a half-width of 677, so the sides
     * and corners were empty by construction and the effect looked like it did
     * not cover the section. Positions are uniform over the whole rectangle
     * now, so coverage is even everywhere by definition.
     */
    type Star = {
      x: number; y: number;      // 0..1 of the panel
      z: number;                 // depth: size, brightness and drift speed
      phase: number;             // twinkle offset, so they do not pulse in unison
    };
    let stars: Star[] = [];

    const seed = () =>
      Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: Math.random() * 0.75 + 0.25,
        phase: Math.random() * Math.PI * 2,
      }));

    /* Declared before `resize` because `resize` calls it in the reduced-motion
       case. */
    let draw = () => {};

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (!stars.length) stars = seed();
      /* Setting canvas.width CLEARS the canvas, and ResizeObserver fires once
         on observe. Without this the reduced-motion path drew its single frame
         and then had it wiped, which measured as zero lit pixels. */
      if (reduce) draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let t = 0;
    draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
      ctx.fillStyle = color;
      for (const s of stars) {
        /* Stars, not streaks: a dot whose brightness breathes. The nearer ones
           are bigger and brighter, which is the only depth cue here. */
        const twinkle = 0.72 + 0.28 * Math.sin(t * 1.1 + s.phase);
        ctx.globalAlpha = Math.min(0.18 + s.z * 0.62, 1) * twinkle;
        const r = 0.5 + s.z * 1.5;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduce) {
      draw();
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      /* Time-based, not frame-based: the same visual pace on a 60Hz panel and a
         144Hz one. */
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      for (const s of stars) {
        /* A slow drift outward from the middle, so the field breathes rather
           than sits. Anything that leaves comes back at a uniformly random
           point, which is what keeps coverage even instead of hollowing out
           the centre over time. */
        s.x += (s.x - 0.5) * dt * 0.055 * speed * s.z;
        s.y += (s.y - 0.5) * dt * 0.055 * speed * s.z;
        if (s.x < -0.02 || s.x > 1.02 || s.y < -0.02 || s.y > 1.02) {
          s.x = Math.random();
          s.y = Math.random();
          s.z = Math.random() * 0.75 + 0.25;
        }
      }
      draw();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, background, speed, count, reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  );
}
