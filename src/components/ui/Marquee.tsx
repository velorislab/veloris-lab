"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * The source drives every ticker at a speed expressed in pixels per second, so
 * a wide row and a narrow one travel at the same visual pace. We measure one
 * copy of the content and derive the CSS animation duration from it, which
 * keeps that pace correct at every breakpoint.
 */
function useTrackDuration(speed: number, axis: "x" | "y") {
  const ref = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(40);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const size = axis === "x" ? node.scrollWidth : node.scrollHeight;
      if (size > 0) setDuration(size / speed);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [speed, axis]);

  return { ref, duration };
}

interface MarqueeProps {
  children: ReactNode;
  /** Pixels per second, matching the source's ticker speed. */
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  className?: string;
  /** The source fades the leading/trailing 25% on some tickers only. */
  fade?: boolean;
}

/**
 * Horizontal ticker. The track holds the content twice and translates by -50%,
 * so the loop is seamless. Using a CSS animation rather than a JS loop keeps
 * continuous motion off the main thread.
 */
export function Marquee({
  children,
  speed = 30,
  direction = "left",
  gap = 14,
  className = "",
  fade = true,
}: MarqueeProps) {
  const { ref, duration } = useTrackDuration(speed, "x");

  return (
    <div
      className={`flex w-full overflow-hidden ${fade ? "marquee-mask" : ""} ${className}`}
    >
      <div
        className={`marquee-track ${direction === "right" ? "marquee-reverse" : ""}`}
        style={
          { "--marquee-duration": `${duration}s`, gap } as CSSProperties
        }
      >
        <div ref={ref} className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface MarqueeColumnProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  gap?: number;
  className?: string;
  fade?: boolean;
}

/** Vertical variant, used by the testimonial columns and the orbit strip. */
export function MarqueeColumn({
  children,
  speed = 30,
  direction = "up",
  gap = 20,
  className = "",
  fade = true,
}: MarqueeColumnProps) {
  const { ref, duration } = useTrackDuration(speed, "y");

  return (
    <div
      className={`h-full overflow-hidden ${fade ? "marquee-mask-y" : ""} ${className}`}
    >
      <div
        className={`marquee-track-y ${direction === "down" ? "marquee-reverse" : ""}`}
        style={
          { "--marquee-duration": `${duration}s`, gap } as CSSProperties
        }
      >
        <div ref={ref} className="flex shrink-0 flex-col" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 flex-col" aria-hidden style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
