import { STACK_GLYPHS, onSlab } from "@/lib/stackGlyphs";

/* =============================================================================
   The arc above the dark slab's crest.

   The template arranges six circular avatars here: photographs of people, which
   is the one thing this section cannot borrow. The arrangement is worth keeping
   and the contents are not, so the arc carries our stack instead, from the same
   glyph set the pointer trail on this slab already uses.

   AN ARC, NOT A RING, and that is a correction rather than a preference. The
   first attempt put the six on a full circle and rotated it, which looked right
   in isolation and dropped two glyphs straight onto the heading below the crest.
   Every position here sits above the centre, so nothing can collide with the
   type no matter how long the animation runs.

   No JavaScript. Each glyph bobs on its own staggered delay, which reads as
   floating rather than as a machine turning, and stops under
   prefers-reduced-motion. Hidden below `tablet`, matching the backdrop it sits
   on: at 390px the arc is wider than the viewport.
   ========================================================================== */

/** Six of the eleven, the ones that still read at 26px. */
const ARC = ["TypeScript", "React", "Next.js", "PostgreSQL", "Docker", "Python"];

const SIZE = 26;
/**
 * A WIDE, SHALLOW ellipse, not a circle, and that is the second correction this
 * component needed. A circular arc of radius 122 put its top glyph 143px above
 * the crest centre, which is 34px from the section's top edge, which is behind
 * the sticky nav whenever somebody arrives here from the Services link. Flat and
 * wide keeps the extremes beside the crest, where there is room, instead of
 * above it, where there is not.
 */
const RX = 156;
const RY = 62;
/** Straight up is -90; this spans the upper arc without reaching the sides. */
const FROM = -155;
const TO = -25;

export function OrbitGlyphs() {
  const picked = ARC.map((t) => STACK_GLYPHS.find((g) => g.title === t)).filter(
    (g): g is (typeof STACK_GLYPHS)[number] => Boolean(g),
  );
  const step = (TO - FROM) / (picked.length - 1);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 hidden size-0 tablet:block"
    >
      {picked.map((g, i) => {
        const a = ((FROM + step * i) * Math.PI) / 180;
        return (
          <span
            key={g.title}
            className="vl-orbit-glyph absolute block"
            style={{
              left: Math.cos(a) * RX,
              top: Math.sin(a) * RY,
              /* Delays are spread rather than random so the row never lands in
                 lockstep, and are deterministic so the server and the client
                 render the same thing. */
              animationDelay: `${(i * 0.45).toFixed(2)}s`,
            }}
          >
            <span
              className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border border-white/10 bg-white/[0.05] p-[8px] backdrop-blur-[2px]"
              style={{ width: SIZE + 16, height: SIZE + 16 }}
            >
              <svg viewBox="0 0 24 24" width={SIZE} height={SIZE} role="img" aria-label={g.title}>
                <path d={g.path} fill={onSlab(g.hex)} />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}
