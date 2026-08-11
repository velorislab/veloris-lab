/* =============================================================================
   The three social marks, drawn rather than fetched.

   WHY THESE ARE GEOMETRY AND NOT FILES. `public/` held two of them as
   full-colour brand tiles: Instagram's gradient rounded square and LinkedIn's
   blue rounded square, each with its own background baked in, each rendered
   through `next/image` inside the footer's bordered 46px chip. A filled square
   inside a bordered square with 10px between them reads as cramped, the two
   networks arrived in two different palettes, and Telegram, the channel this
   business actually answers on, had no file at all and rendered as the word
   "Telegram" beside them. One stroke weight, one colour and one box fixes all
   three at once, and `currentColor` is only available to an inline node: an
   `<img>` cannot inherit the ink colour, which is why these are components.

   NO ids IN THIS FILE, for the reason spelled out in `Mark.tsx`: the footer is a
   server component, `useId` is not available to it, and a hardcoded id would
   collide the moment a mark renders twice on a page.

   The old files, `social-instagram.svg` and `social-linkedin.svg`, are still in
   `public/images/icons/` and nothing imports them.
   ========================================================================== */

export type SocialKey = 'instagram' | 'telegram' | 'linkedin'

/** Shared frame. 24-unit box, so every glyph is drawn against the same grid. */
function Glyph({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

const GLYPHS: Record<SocialKey, (size: number) => React.ReactElement> = {
  /* Rounded square, lens, flash. The dot is filled because at 24px a 1.1r ring
     closes up into a smudge. */
  instagram: (size) => (
    <Glyph size={size}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.15" cy="6.85" r="1.15" fill="currentColor" stroke="none" />
    </Glyph>
  ),

  /* The plane, as an outline: the swoosh, then the crease where the wing folds
     back on itself. Straight segments only. The curve everyone draws here is
     doing nothing the eye can see at this size, and a bezier that is a few
     hundredths out is visible as a kink where a line is not. */
  telegram: (size) => (
    <Glyph size={size}>
      <path d="M21.4 3.6 2.9 11.1l5.7 2 2 6 2.8-3.4 5 3.7z" />
      <path d="m8.6 13.1 12.8-9.5" />
    </Glyph>
  ),

  /* Rounded square, the i and the n. Same rx as Instagram's frame so the two
     sit as one pair rather than as two borrowed logos. */
  linkedin: (size) => (
    <Glyph size={size}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="7.7" cy="7.9" r="1.15" fill="currentColor" stroke="none" />
      <path d="M7.7 10.9v6.4" />
      <path d="M11.7 17.3v-6.4" />
      <path d="M11.7 13.9a2.55 2.55 0 0 1 5.1 0v3.4" />
    </Glyph>
  ),
}

export function SocialGlyph({ name, size = 22 }: { name: SocialKey; size?: number }) {
  return GLYPHS[name](size)
}
