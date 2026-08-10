/* =============================================================================
   The brand mark.

   A disc split by a wave: charcoal above, coral below, on a light rim. Founder's
   design, supplied as an image and rebuilt here as geometry so it stays sharp at
   any size, needs no file request, and can be recoloured from tokens.

   NO ids IN THIS FILE, deliberately. The obvious way to draw a two-tone disc is
   a `<clipPath id="...">`, and this component renders more than once per page
   (header and footer). Two elements with the same id is a real bug that shows up
   as one mark inheriting the other's clip, and `useId` is not available here
   because Footer is a server component. So the coral half is a closed path that
   follows the wave across the top and the disc's own arc back around the bottom.
   The `A 46 46 0 1 1` at the end is that arc: large-arc and sweep both set, which
   is what takes it the long way round through the bottom rather than cutting
   straight back.

   The previous mark, `>_` morphing to `Vl` on hover, is gone with this. Its
   geometry and the CSS that drove it are in the history if it is ever wanted
   back.

   `vl-logo` carries the hover spin, and it is on the mark itself rather than on
   each of the four call sites so every instance behaves the same and a fifth one
   inherits it for free. The rule is in `globals.css`; it also fires when the
   surrounding link is hovered, which is what you actually point at in the header.
   ========================================================================== */

export function Mark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`vl-logo ${className}`}
      role="img"
      aria-label="Veloris Lab"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The rim. Its own colour rather than the surface's, so the mark reads the
          same on the dark nav pill and on the white footer. */}
      <circle cx="50" cy="50" r="49" fill="var(--mark-rim)" />
      <circle cx="50" cy="50" r="46" fill="var(--mark-ink)" />
      <path
        d="M 4 52 C 20 68 42 70 62 54 C 74 44 86 40 94.4 38 A 46 46 0 1 1 4 52 Z"
        fill="var(--mark-wave)"
      />
    </svg>
  )
}
