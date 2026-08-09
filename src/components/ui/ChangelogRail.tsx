"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The vertical rail behind the changelog entries, plus the marker that rides
 * it as you scroll.
 *
 * The marker is a 500px sticky box pinned to the top of the viewport with only
 * its top 205px painted, so it travels the rail and comes to rest 500px short
 * of the end — the same construction, and the same numbers, as the source.
 *
 * The source can bake the rail's height into CSS because Framer knows every
 * entry's height at publish time. Here the entries come from a data file, so
 * the rail measures instead: it spans from 2px below the first dot to 2px past
 * the last dot's centre, which is the span the original produces.
 *
 * Renders as the first child of the entry list, which must be `relative`.
 */
export function ChangelogRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    const list = ref.current?.parentElement;
    if (!list) return;

    const measure = () => {
      const dots = list.querySelectorAll<HTMLElement>("[data-rail-dot]");
      const first = dots[0];
      const last = dots[dots.length - 1];
      if (!first || !last) return;

      const origin = list.getBoundingClientRect().top;
      const top = first.getBoundingClientRect().top - origin + 2;
      const end =
        last.getBoundingClientRect().top - origin + last.offsetHeight / 2 + 2;
      setSpan({ top, height: end - top });
    };

    measure();
    // ResizeObserver catches content reflow (images and fonts landing);
    // the resize listener catches breakpoint changes, which move the dots
    // without necessarily resizing the list itself.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      /* Held back until measured — a rail of the wrong length reads as a bug,
         where one that arrives on hydration just reads as the page loading. */
      className={`pointer-events-none absolute left-4 w-[2px] bg-line tablet:left-[181px] ${
        span ? "" : "invisible"
      }`}
      style={span ?? undefined}
    >
      <div className="sticky top-0 h-[500px] w-full">
        <div className="h-[205px] w-full bg-marker" />
      </div>
    </div>
  );
}
