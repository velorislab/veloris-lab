"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { Mark } from "@/components/ui/Mark";
import type { HomeContent } from "@/data/content";

type Step = HomeContent["process"]["steps"][number];

const MARK = 40;
const RAIL = 2;
const RING = 6;
const MOVE = 0.9;
const DWELL = 1100;
const DWELL_LAST = 2200;
const RESET = 600;
const EASE = [0.4, 0, 0.2, 1] as const;

type Point = { x: number; y: number };
type Seg = { left: number; top: number; width: number; height: number };

/**
 * Pale track is drawn only in the gaps between wells, stopping at the 6px
 * white ring. A single first-to-last stroke ran through the empty squares:
 * the list is a stacking context, empty wells are just white boxes, and the
 * line still read as a cut through the station.
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

/**
 * The mark rides the process. One disc, five stations, the same path Support
 * sits on so it cannot read as an add-on.
 *
 * IT DOES NOT REVERSE. Playing the process backwards would say the work
 * undoes itself. After the extra beat on Support, the fill fades, later
 * stations clear, and it starts again at Audit.
 *
 * IT SLIDES, it does not hop. A bounce reads as a character; a fill along the
 * rail reads as the work landing. Visited stations keep the real mark, not a
 * grey imprint: the first thing you see after scrolling here is Audit, fully
 * inked.
 *
 * POSITIONS ARE MEASURED, not keyed as percentages. A 5-column grid and a
 * vertical timeline do not share arithmetic. ResizeObserver re-aims.
 *
 * IT STOPS OFF-SCREEN, same contract as the hero grid, and it does not start
 * until the section is in view. Running the loop on a page the reader has not
 * reached yet is how Audit was already grey by the time they got here.
 */
export function ProcessTrack({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion();
  const count = steps.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const wellRefs = useRef<Array<HTMLElement | null>>([]);
  const pointsRef = useRef<Point[]>([]);
  const acrossRef = useRef(true);
  const visibleRef = useRef(false);
  const wakeRef = useRef<(() => void) | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const fillOp = useMotionValue(1);

  const [here, setHere] = useState(0);
  const hereRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [moving, setMoving] = useState(false);
  const [visited, setVisited] = useState(() => steps.map((_, i) => i === 0));
  const [rail, setRail] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    across: boolean;
  } | null>(null);
  const [gaps, setGaps] = useState<Seg[]>([]);
  hereRef.current = here;

  const fillW = useTransform(x, (xv) => {
    if (!acrossRef.current) return RAIL;
    const a = pointsRef.current[0];
    if (!a) return 0;
    return Math.max(0, xv + MARK / 2 - a.x);
  });
  const fillH = useTransform(y, (yv) => {
    if (acrossRef.current) return RAIL;
    const a = pointsRef.current[0];
    if (!a) return 0;
    return Math.max(0, yv + MARK / 2 - a.y);
  });

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
    const pts = measure();
    if (pts[0]) {
      x.set(pts[0].x - MARK / 2);
      y.set(pts[0].y - MARK / 2);
    }
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => {
      const next = measure();
      const at = next[hereRef.current] ?? next[0];
      if (at) {
        x.set(at.x - MARK / 2);
        y.set(at.y - MARK / 2);
      }
    });
    ro.observe(track);
    wellRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    return () => ro.disconnect();
  }, [count, reduce, x, y]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) wakeRef.current?.();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(track);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    let cancelled = false;
    const running: Array<{ stop: () => void }> = [];
    const timers: number[] = [];

    const play = (ctrl: { stop: () => void; finished: Promise<unknown> }) => {
      running.push(ctrl);
      return ctrl.finished.catch(() => undefined);
    };
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });
    const untilVisible = () => {
      if (visibleRef.current) return Promise.resolve();
      return new Promise<void>((resolve) => {
        wakeRef.current = resolve;
      });
    };

    const travel = async (index: number) => {
      const pts = pointsRef.current;
      const end = pts[index];
      if (!end) return;
      setMoving(true);
      await Promise.all([
        play(animate(x, end.x - MARK / 2, { duration: MOVE, ease: EASE })),
        play(animate(y, end.y - MARK / 2, { duration: MOVE, ease: EASE })),
      ]);
      setHere(index);
      setVisited((prev) => prev.map((v, i) => v || i === index));
      setMoving(false);
    };

    const loop = async () => {
      while (!cancelled) {
        await untilVisible();
        if (cancelled) return;
        const pts = pointsRef.current;
        if (pts[0]) {
          x.set(pts[0].x - MARK / 2);
          y.set(pts[0].y - MARK / 2);
        }
        fillOp.set(1);
        setMoving(false);
        setHere(0);
        setVisited(Array.from({ length: count }, (_, i) => i === 0));
        await wait(DWELL);
        for (let i = 1; i < count; i++) {
          await untilVisible();
          if (cancelled) return;
          await travel(i);
          if (cancelled) return;
          await wait(i === count - 1 ? DWELL_LAST : DWELL);
        }
        await untilVisible();
        if (cancelled) return;
        await play(animate(fillOp, 0, { duration: 0.4, ease: EASE }));
        setVisited(Array.from({ length: count }, (_, i) => i === 0));
        setHere(0);
        if (pts[0]) {
          x.set(pts[0].x - MARK / 2);
          y.set(pts[0].y - MARK / 2);
        }
        await wait(RESET);
      }
    };

    void loop();

    return () => {
      cancelled = true;
      wakeRef.current?.();
      timers.forEach(clearTimeout);
      running.forEach((a) => a.stop());
    };
  }, [reduce, count, fillOp, x, y]);

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
              opacity: fillOp,
            }}
          />
        ))}

      {!reduce && ready && moving && (
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
                {on && (
                  <span aria-hidden className="pointer-events-none">
                    <Mark size={MARK} />
                  </span>
                )}
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
