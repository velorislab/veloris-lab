/* =============================================================================
   The brand mark.

   Founder's design and his reasoning: at rest it reads as a command prompt,
   `>_`, and on hover it resolves into the initials, `Vl`. An engineering bureau
   whose logo is a terminal until you look at it.

   The supplied source animated on a five second loop with SMIL. This is the
   same two shapes driven by hover instead, which is what he described, and it
   is built on the CSS `d` property rather than `<animate>` so the transition is
   interruptible, respects prefers-reduced-motion, and needs no JavaScript.

   `d` only interpolates between paths with the SAME command sequence, which is
   why both states of each shape are written with identical commands:

     shape one   M L L   chevron  >  ->  vee     V
     shape two   M L     rule     _  ->  stem    l

   Change one and you must change the other to match, or the morph snaps.
   ========================================================================== */

export function Mark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={`vl-mark ${className}`}
      role="img"
      aria-label="Veloris Lab"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="460"
        height="460"
        rx="40"
        stroke="currentColor"
        strokeWidth="30"
      />
      <path
        className="vl-mark-a"
        stroke="currentColor"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="vl-mark-b"
        stroke="currentColor"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
