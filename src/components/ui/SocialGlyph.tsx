/* =============================================================================
   The social marks, drawn rather than fetched.

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

export type SocialKey = 'instagram' | 'threads' | 'telegram' | 'linkedin'

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

  /* Official Threads mark, filled. The rest of this row is 1.7-weight strokes
     because those networks are geometry we drew; this one arrived as the real
     glyph and a stroke @ next to it was a different letter. Still currentColor,
     still inline: a file would freeze the ink and break the chip hover. */
  threads: (size) => (
    <svg
      viewBox="0 0 192 192"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.194 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 95.932L13 96v.067c.224 28.617 6.882 51.447 19.788 67.854C47.292 182.358 68.882 191.806 96.957 192h.113c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.723-24.553ZM98.44 129.507c-10.44.588-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.114 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.802 29.274Z" />
    </svg>
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
