"use client";

import { useEffect, useRef } from "react";

/**
 * The looping light-streak clip behind the "What's In" badge.
 *
 * The source plays this same clip twice — once per beam — and recolours it by
 * laying a `mix-blend-mode: color` fill over the top, which keeps the video's
 * luminance but takes the panel's navy hue.
 *
 * The element carries its own `src` rather than being gated behind an observer:
 * it sits inside two `overflow: hidden` ancestors and a rotated box, where
 * intersection observation is unreliable. Browsers already defer both the fetch
 * and playback of an off-screen muted autoplay video, so this stays cheap.
 */
export function BeamVideo({ flipped }: { flipped?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Decorative loop — hold on a frame when the visitor asks for less motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.autoplay = false;
      video.pause();
    }
  }, []);

  return (
    <div
      className="absolute top-[1px] h-[168px] w-[494px]"
      style={flipped ? { transform: "rotate(180deg)" } : undefined}
    >
      <video
        ref={ref}
        src="/video/community-beam.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden
        className="size-full bg-[#0b1023] object-cover"
      />
    </div>
  );
}
