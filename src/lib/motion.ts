import type { Transition, Variants } from "motion/react";

/**
 * Animation tokens transcribed from the original Framer project.
 *
 * Framer compiles appear-animations to `initial` / `animate` pairs with an
 * explicit transition; these constants reproduce those pairs exactly so the
 * coded hero matches the published site's timing, not an approximation.
 */

/** Framer's default tween easing for this project. */
export const EASE_FRAMER = [0.12, 0.23, 0.5, 1] as const;

/** Spring used by every staggered hero entrance. */
const heroSpring = (delay: number): Transition => ({
  type: "spring",
  stiffness: 150,
  damping: 50,
  mass: 1,
  delay,
});

export const transitions = {
  /** Light rays sweeping in from the page corners. */
  lightRay: {
    type: "tween",
    duration: 0.7,
    delay: 1,
    ease: EASE_FRAMER,
  } satisfies Transition,

  /** Floating widget columns sliding in from the left/right edges. */
  widgetColumn: {
    type: "tween",
    duration: 1,
    delay: 0.7,
    ease: EASE_FRAMER,
  } satisfies Transition,

  /** Social-proof badge above the headline. */
  badge: {
    type: "spring",
    stiffness: 150,
    damping: 30,
    mass: 1,
    delay: 0.1,
  } satisfies Transition,

  heading: heroSpring(0.2),
  paragraph: heroSpring(0.3),
  button: heroSpring(0.4),
  note: heroSpring(0.5),
  grid: heroSpring(0.6),
  visual: heroSpring(0.6),

  /** Component hover/variant springs used throughout the project. */
  variantFast: {
    type: "spring",
    stiffness: 500,
    damping: 60,
    mass: 1,
  } satisfies Transition,

  variantSoft: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1,
  } satisfies Transition,

  /** Accordion open/close. */
  accordion: {
    type: "spring",
    bounce: 0.2,
    duration: 0.4,
  } satisfies Transition,
} as const;

/** Shared entrance shapes. `hidden` values are the Framer `initial` states. */
export const heroVariants = {
  lightRayLeft: {
    hidden: { opacity: 0, scale: 0.5, x: -200, y: -200 },
    visible: { opacity: 1, scale: 1, x: 0, y: 0 },
  },
  lightRayRight: {
    hidden: { opacity: 0, scale: 0.5, x: 200, y: -200 },
    visible: { opacity: 1, scale: 1, x: 0, y: 0 },
  },
  badge: {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  heading: {
    hidden: { opacity: 0, scale: 0.8, y: 30, rotateX: 30 },
    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0 },
  },
  riseIn: {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  visual: {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
} satisfies Record<string, Variants>;

/**
 * Widget columns translate by a different distance on tablet, matching the
 * project's per-breakpoint overrides (desktop ±201px, tablet ±111px).
 */
export const widgetColumnVariants = (
  direction: "left" | "right",
  distance: number,
): Variants => ({
  hidden: { opacity: 0, x: direction === "left" ? -distance : distance },
  visible: { opacity: 1, x: 0 },
});

/** Framer triggers these once, when 50% of the element is in view. */
export const viewportOnce = { once: true, amount: 0.5 } as const;
