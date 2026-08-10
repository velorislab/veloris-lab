"use client";

import { useEffect, useRef, useState } from "react";
import { STACK_GLYPHS, onSlab } from "@/lib/stackGlyphs";
import { useReducedMotion } from "motion/react";

/* =============================================================================
   A canvas that sprays stack glyphs from the pointer; they drift up and fade.

   This is `mdafsarx/tech-curosr`'s mechanism, from the source the founder
   supplied: spawn one particle per pointer move, `y -= 0.4` and `alpha -= 0.02`
   per frame, draw at 22 to 30px, drop it when it reaches zero. Three things are
   different, and each is a decision rather than a liberty:

   SCOPED, NOT GLOBAL. The original is `fixed inset-0` with the listener on
   `window`, so it follows the pointer over the whole document. This was asked
   for inside one section, so the canvas is `absolute inset-0` in a section that
   already clips, the listener is on that section, and the coordinates are local
   to it.

   OUR STACK, DRAWN NOT FETCHED. The original hotlinks six PNGs of somebody
   else's stack from their Cloudinary bucket, with a comment saying to replace
   them. Ours come from `simple-icons` as path data, which means no network on
   the animation path, no dependency on a stranger's storage, and glyphs that
   stay crisp at any size and any pixel ratio. Eleven of the twelve tools in
   TOOLS have one; Playwright has no glyph in that set and is simply not in the
   pool rather than being substituted with something that is not Playwright.

   COLOURS ARE CHECKED AGAINST THE GROUND. Brand hex where it survives the dark
   slab, white where it does not. Measured on `#110f20`: Next.js and Vercel are
   `#000000` at 1.11:1 and Railway is `#0B0D0E` at 1.03:1, which is three
   invisible particles out of eleven if their own colour is used blindly.
   ========================================================================== */

type Particle = { x: number; y: number; alpha: number; size: number; glyph: number };

export function TechCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
  }, [reduce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host || !enabled) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Path2D is browser-only, so the glyphs are compiled here rather than at
       module scope, once, and reused for every particle. */
    const paths = STACK_GLYPHS.map((g) => ({
      path: new Path2D(g.path),
      fill: onSlab(g.hex),
    }));

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(host.clientWidth * dpr);
      canvas.height = Math.round(host.clientHeight * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const particles: Particle[] = [];
    let raf = 0;

    const frame = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y -= 0.4;
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const g = paths[p.glyph];
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x - p.size / 2, p.y - p.size / 2);
        // simple-icons draws on a 24 unit grid.
        ctx.scale(p.size / 24, p.size / 24);
        ctx.fillStyle = g.fill;
        ctx.fill(g.path);
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const move = (e: PointerEvent) => {
      /* One per move, as the original does, with a ceiling. A trackpad flick can
         fire a hundred events in a second and an unbounded array turns a nice
         effect into a dropped frame. */
      if (particles.length > 90) return;
      const b = host.getBoundingClientRect();
      particles.push({
        x: e.clientX - b.left,
        y: e.clientY - b.top,
        alpha: 1,
        size: 22 + Math.random() * 8,
        glyph: Math.floor(Math.random() * paths.length),
      });
    };
    host.addEventListener("pointermove", move);

    return () => {
      host.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [enabled]);

  /* The canvas is always in the tree so the effect has a stable parent to
     measure and listen on; only the drawing is gated. It never takes pointer
     events, and it sits under the section's own content rather than over it, so
     a glyph passing a card does not sit on top of the text. */
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 size-full"
    />
  );
}
