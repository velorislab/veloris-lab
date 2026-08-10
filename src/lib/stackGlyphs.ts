import {
  siDocker, siNextdotjs, siNodedotjs, siPostgresql, siPython, siRailway,
  siReact, siSupabase, siTelegram, siTypescript, siVercel,
} from "simple-icons";

/* =============================================================================
   Our stack, as glyphs, in one place because two components draw it now: the
   pointer trail on the dark slab and the ring around that slab's crest.

   STATIC NAMED IMPORTS, never `import * as` with a lookup by string. The
   namespace form defeats tree shaking: simple-icons carries some three thousand
   icons, and if the bundler cannot prove which eleven are reachable it ships all
   of them. Verified by grepping the built client chunks for icons we do not
   use; they are absent.

   Eleven of the twelve entries in TOOLS are here. Playwright has no glyph in
   that set, and it is left out rather than substituted with something that is
   not Playwright.
   ========================================================================== */

export type StackGlyph = { title: string; path: string; hex: string };

export const STACK_GLYPHS: StackGlyph[] = [
  siTypescript, siReact, siNextdotjs, siNodedotjs, siPython, siPostgresql,
  siSupabase, siDocker, siVercel, siRailway, siTelegram,
].map((i) => ({ title: i.title, path: i.path, hex: i.hex }));

/** Relative luminance of a bare hex, for checking a brand colour on a ground. */
export function lum(hex: string) {
  const n = parseInt(hex, 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

/** The dark slab these are drawn on. */
const SLAB = lum("110f20");

/**
 * The brand colour where it survives that slab, white where it does not.
 *
 * Not a matter of taste: measured on `#110f20`, Next.js and Vercel are
 * `#000000` at 1.11:1 and Railway is `#0B0D0E` at 1.03:1. Used as published,
 * three of the eleven would be invisible.
 */
export function onSlab(hex: string) {
  const r = (Math.max(lum(hex), SLAB) + 0.05) / (Math.min(lum(hex), SLAB) + 0.05);
  return r >= 2.5 ? `#${hex}` : "#ffffff";
}
