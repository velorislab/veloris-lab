"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

import { ProcessGlyph } from "@/components/sections/ProcessGlyph";
import { Mark } from "@/components/ui/Mark";
import type { HomeContent } from "@/data/content";

type Step = HomeContent["process"]["steps"][number];

const MARK = 40;
const RAIL = 2;
const RING = 6;

type Point = { x: number; y: number };
type Seg = { left: number; top: number; width: number; height: number };

/**
 * Pale track is drawn only in the gaps between wells, stopping at the 6px
 * white ring. A single first-to-last stroke ran through the empty squares.
 */
function gapSegs(
  track: HTMLElement,
  wells: Array<HTMLElement | null>,
  across: boolean,
): Seg[] {
  const origin = track.getBoundingClientRect();
  const boxes = wells
    .filter((el): el is HTMLElement => el !== null)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        left: r.left - origin.left,
        right: r.right - origin.left,
        top: r.top - origin.top,
        bottom: r.bottom - origin.top,
        cx: r.left - origin.left + r.width / 2,
        cy: r.top - origin.top + r.height / 2,
      };
    });
  const segs: Seg[] = [];
  for (let i = 0; i < boxes.length - 1; i++) {
    const a = boxes[i];
    const b = boxes[i + 1];
    if (across) {
      const left = a.right + RING;
      const right = b.left - RING;
      segs.push({
        left,
        top: a.cy - RAIL / 2,
        width: Math.max(0, right - left),
        height: RAIL,
      });
    } else {
      const top = a.bottom + RING;
      const bottom = b.top - RING;
      segs.push({
        left: a.cx - RAIL / 2,
        top,
        width: RAIL,
        height: Math.max(0, bottom - top),
      });
    }
  }
  return segs;
}

function centersOf(track: HTMLElement, wells: Array<HTMLElement | null>): Point[] {
  const origin = track.getBoundingClientRect();
  return wells
    .filter((el): el is HTMLElement => el !== null)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - origin.left + r.width / 2,
        y: r.top - origin.top + r.height / 2,
      };
    });
}

function alongRail(pts: Point[], t: number): Point {
  if (pts.length === 0) return { x: 0, y: 0 };
  if (pts.length === 1) return pts[0];
  const max = pts.length - 1;
  const u = Math.max(0, Math.min(max, t * max));
  const i = Math.min(Math.floor(u), max - 1);
  const f = u - i;
  const a = pts[i];
  const b = pts[i + 1];
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

/**
 * The mark rides the process. One disc, five stations, the same path Support
 * sits on so it cannot read as an add-on.
 *
 * SCROLL DRIVES IT, not a timer. The page parks this section and the wheel
 * is what moves the mark; playing it on a clock is how Audit was already
 * grey by the time the reader arrived.
 *
 * IT LATCHES AT THE END. Playing the process backwards would say the work
 * undoes itself. Until Support is reached the scrub can reverse with the
 * scroll; after that the fill stays, and the parent drops the park so the
 * wheel is free again.
 *
 * POSITIONS ARE MEASURED, not keyed as percentages. A 5-column grid and a
 * vertical timeline do not share arithmetic. ResizeObserver re-aims.
 */
export function ProcessTrack({
  steps,
  progress,
}: {
  steps: Step[];
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const count = steps.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const wellRefs = useRef<Array<HTMLElement | null>>([]);
  const pointsRef = useRef<Point[]>([]);
  const acrossRef = useRef(true);
  const tRef = useRef(0);
  const doneRef = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [ready, setReady] = useState(false);
  const [visited, setVisited] = useState(() => steps.map((_, i) => i === 0));
  const [rail, setRail] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    across: boolean;
  } | null>(null);
  const [gaps, setGaps] = useState<Seg[]>([]);

  const fillW = useTransform(() => {
    if (!acrossRef.current) return RAIL;
    const a = pointsRef.current[0];
    if (!a) return 0;
    return Math.max(0, x.get() + MARK / 2 - a.x);
  });
  const fillH = useTransform(() => {
    if (acrossRef.current) return RAIL;
    const a = pointsRef.current[0];
    if (!a) return 0;
    return Math.max(0, y.get() + MARK / 2 - a.y);
  });

  const apply = (raw: number) => {
    if (raw >= 0.995) doneRef.current = true;
    const t = doneRef.current ? 1 : Math.max(0, Math.min(1, raw));
    tRef.current = t;
    const pts = pointsRef.current;
    const at = alongRail(pts, t);
    x.set(at.x - MARK / 2);
    y.set(at.y - MARK / 2);
    const u = t * Math.max(count - 1, 1);
    setVisited((prev) => {
      let changed = false;
      const next = prev.map((was, i) => {
        const on = u + 0.02 >= i;
        if (on !== was) changed = true;
        return on;
      });
      return changed ? next : prev;
    });
  };

  const measure = () => {
    const track = trackRef.current;
    if (!track) return [];
    const pts = centersOf(track, wellRefs.current);
    pointsRef.current = pts;
    if (pts.length >= 1) setReady(true);
    if (pts.length >= 2) {
      const a = pts[0];
      const b = pts[pts.length - 1];
      const across = Math.abs(b.x - a.x) > Math.abs(b.y - a.y);
      acrossRef.current = across;
      setRail({
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        w: across ? Math.abs(b.x - a.x) : RAIL,
        h: across ? RAIL : Math.abs(b.y - a.y),
        across,
      });
      setGaps(gapSegs(track, wellRefs.current, across));
    }
    return pts;
  };

  useLayoutEffect(() => {
    measure();
    apply(reduce ? 1 : progress.get());
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => {
      measure();
      apply(reduce ? 1 : tRef.current);
    });
    ro.observe(track);
    wellRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    return () => ro.disconnect();
  }, [count, reduce, progress, x, y]);

  useMotionValueEvent(progress, "change", (p) => {
    if (reduce) return;
    apply(p);
  });

  const railBox = rail
    ? rail.across
      ? { left: rail.x, top: rail.y - RAIL / 2, width: rail.w, height: RAIL }
      : { left: rail.x - RAIL / 2, top: rail.y, width: RAIL, height: rail.h }
    : null;

  return (
    <div ref={trackRef} className="relative isolate w-full">
      {gaps.map((seg, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-0 bg-line-cool"
          style={seg}
        />
      ))}
      {rail &&
        (reduce ? (
          <div
            aria-hidden
            className="pointer-events-none absolute z-0 bg-[var(--mark-ink)]"
            style={railBox ?? undefined}
          />
        ) : (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute z-0 bg-[var(--mark-ink)]"
            style={{
              left: rail.across ? rail.x : rail.x - RAIL / 2,
              top: rail.across ? rail.y - RAIL / 2 : rail.y,
              width: fillW,
              height: fillH,
            }}
          />
        ))}

      {!reduce && ready && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-[2] will-change-transform"
          style={{ x, y }}
        >
          <Mark size={MARK} />
        </motion.div>
      )}

      <ol className="relative z-[1] flex w-full flex-col gap-10 desktop:grid desktop:grid-cols-5 desktop:gap-10">
        {steps.map((step, i) => {
          const on = reduce || visited[i];
          return (
            <li
              key={step.n}
              className="grid grid-cols-[56px_minmax(0,1fr)] items-start gap-x-5 gap-y-2 desktop:flex desktop:flex-col desktop:items-center desktop:gap-4 desktop:text-center"
            >
              <div
                ref={(el) => {
                  wellRefs.current[i] = el;
                }}
                className="relative z-[1] flex size-[56px] items-center justify-center rounded-card bg-surface shadow-[0_0_0_1px_var(--color-line-soft),0_0_0_6px_#ffffff]"
              >
                <span
                  aria-hidden
                  className={`pointer-events-none text-ink-200 transition-opacity duration-300 ${
                    on ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <ProcessGlyph name={step.icon} />
                </span>
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Mark size={MARK} />
                </span>
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <h3
                  className={`font-display text-[22px] leading-7 transition-colors duration-500 ${
                    on ? "text-ink-800" : "text-ink-200"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-[15px] leading-[22px] transition-colors duration-500 tablet:text-[16px] tablet:leading-6 ${
                    on ? "text-ink-300" : "text-ink-100"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
