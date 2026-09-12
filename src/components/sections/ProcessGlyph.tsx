import {
  Blueprint,
  Hammer,
  Headset,
  MagnifyingGlass,
  RocketLaunch,
} from "@phosphor-icons/react";

import type { ProcessIcon } from "@/site/labData";

const GLYPH = {
  audit: MagnifyingGlass,
  plan: Blueprint,
  build: Hammer,
  launch: RocketLaunch,
  support: Headset,
} as const;

/**
 * The station's own drawing, from Phosphor. The brand mark is what fills the
 * well; this is what sits there before the mark arrives, so an empty square
 * is never the thing you see.
 */
export function ProcessGlyph({
  name,
  className,
}: {
  name: ProcessIcon;
  className?: string;
}) {
  const Icon = GLYPH[name];
  return (
    <Icon
      size={24}
      weight="regular"
      className={className}
      aria-hidden
    />
  );
}
