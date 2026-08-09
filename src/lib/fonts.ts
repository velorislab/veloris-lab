import { Manrope, Onest } from "next/font/google";

/* =============================================================================
   THE TEMPLATE'S TYPEFACES DO NOT SPEAK RUSSIAN, SO TWO OF THEM ARE REPLACED.

   Measured before changing anything, because this is the kind of thing that is
   easy to assume and expensive to get wrong:

     Clash Grotesk    443 glyphs, 26/26 Latin, 0/64 Cyrillic  (all three weights)
     Instrument Sans  no cyrillic subset on Google Fonts
     Manrope          cyrillic subset present

   Clash Grotesk is the display face of the entire template and Instrument Sans
   is its body face, so on the Russian half of this site, which is the primary
   market, every heading and every paragraph would have fallen through to a
   system serif. That is not a downgrade, it is an unstyled page.

   Why one family is not used for both scripts: our copy mixes them INSIDE
   single strings, constantly. «AI-агенты», «MVP или продукт под ключ»,
   «Swiftin», «Telegram», every stack name. Keeping Clash for Latin and adding a
   Cyrillic face beside it splits those strings across two typefaces mid-line,
   which is visibly broken rather than merely different.

   So the pairing is Onest for display and Manrope for text. It preserves the
   template's own display-versus-sans contrast, both faces carry Cyrillic and
   Latin, and both are free to use. The Clash Grotesk woff2 files were removed
   from public/fonts rather than left unreferenced.
   ========================================================================== */

/** Display face. Replaces Clash Grotesk. */
export const clashGrotesk = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-clash-grotesk",
  display: "swap",
});

/** Body and UI face. Replaces Instrument Sans. */
export const instrumentSans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

/** Numerals, as in the template. */
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-manrope",
  display: "swap",
});
