"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/* =============================================================================
   A perspective grid running back to a horizon, as a section background.

   Written to the API the founder supplied, so a drop-in replacement from
   whatever collection that snippet came from needs no call-site change:

     <HorizonGrid color="#c0c5cd" background="#ebebeb" speed={0.5} />

   `horizon` is the one addition: the fraction of the height where the vanishing
   point sits. The default puts it just under the headline, which is where it was
   asked for, rather than at the middle of the canvas.

   HOW IT IS DRAWN. Every line is straight; the perspective is in the spacing,
   not in any curve. Verticals all leave the vanishing point and fan out to the
   bottom edge. Horizontals sit at `y = horizon + (H - horizon) * t²`, so they
   crowd near the horizon and spread as they approach the viewer, which is what
   a receding plane does. Animating `t` toward 1 moves the whole set towards the
   reader; each line wraps back to the horizon when it falls off the bottom.

   The fade is a single vertical gradient composited over the lines, so the grid
   dissolves into the page at the horizon instead of stopping at a hard edge.
   ========================================================================== */

export function HorizonGrid({
  color = "#c0c5cd",
  background = "transparent",
  speed = 0.5,
  horizon = 0.46,
  columns = 26,
  rows = 16,
  className = "",
}: {
  color?: string;
  background?: string;
  speed?: number;
  /** Where the vanishing point sits, as a fraction of the height. */
  horizon?: number;
  columns?: number;
  rows?: number;
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
    let t = 0;

    let draw = () => {};

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      /* Setting canvas.width clears it, and ResizeObserver fires once on
         observe, so the still frame has to be redrawn here or it is wiped. */
      if (reduce) draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      const hy = h * horizon;
      const depth = h - hy;
      if (depth <= 0) return;
      const cx = w / 2;

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      /* Verticals: straight from the vanishing point to the bottom edge, spread
         well past the sides so the fan still fills the corners. */
      const spread = w * 1.9;
      for (let i = 0; i <= columns; i++) {
        const x = cx + (i / columns - 0.5) * spread;
        ctx.globalAlpha = 0.5 - Math.abs(i / columns - 0.5) * 0.55;
        if (ctx.globalAlpha <= 0.01) continue;
        ctx.beginPath();
        ctx.moveTo(cx, hy);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      /* Horizontals: squared spacing, so they bunch at the horizon. */
      for (let i = 0; i < rows; i++) {
        const p = ((i + t) % rows) / rows;
        const y = hy + depth * p * p;
        ctx.globalAlpha = Math.min(p * 2.4, 1) * 0.5;
        if (ctx.globalAlpha <= 0.01) continue;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      /* Dissolve the whole plane into the page towards the horizon. Drawn as a
         fill in `destination-out` so it erases rather than paints, which keeps
         the component usable on any background including a transparent one. */
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-out";
      const fade = ctx.createLinearGradient(0, hy, 0, h);
      fade.addColorStop(0, "rgba(0,0,0,1)");
      fade.addColorStop(0.35, "rgba(0,0,0,0.45)");
      fade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, hy, w, depth);
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduce) {
      draw();
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      /* Time-based so the pace is the same on a 60Hz panel and a 144Hz one. */
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t = (t + dt * speed) % 1;
      draw();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, background, speed, horizon, columns, rows, reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  );
}
