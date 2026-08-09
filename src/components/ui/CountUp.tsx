"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  from: number;
  to: number;
  /** Milliseconds per increment. The source uses 20ms. */
  stepMs?: number;
  className?: string;
}

/**
 * Ticking figure used by the Motto and About statistics.
 *
 * Reproduces the source's counter: it increments by one every `stepMs` once the
 * element scrolls into view, then stops. Numbers are grouped with commas, as in
 * the original (`toLocaleString("en-US")`).
 */
export function CountUp({ from, to, stepMs = 20, className }: CountUpProps) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Honour reduced motion by showing the resolved figure straight away.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        let current = from;
        const id = window.setInterval(() => {
          current += 1;
          setValue(current);
          if (current >= to) window.clearInterval(id);
        }, stepMs);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [from, to, stepMs]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-US")}
    </span>
  );
}
