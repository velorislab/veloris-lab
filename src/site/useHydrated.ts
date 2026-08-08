'use client'

import { useSyncExternalStore } from 'react'

/** Subscribes to nothing: the value flips once, at hydration, and never again. */
const NEVER = () => () => {}

/**
 * False during the server render and the hydrating client render, true after.
 *
 * This exists because of a specific bug that bit twice on this page. Anything
 * whose OUTPUT depends on `useReducedMotion()` is a hydration mismatch waiting
 * to happen: the hook has nothing to read on the server, so the server renders
 * the moving version and a reader who asked for less motion renders the still
 * one, and React either rebuilds the subtree or reports attributes it cannot
 * patch. The headline's word reveal did the first, the closing stroke did the
 * second.
 *
 * The rule that came out of it: never let `useReducedMotion()` choose markup or
 * attributes. Either handle reduced motion in CSS, where the server is not
 * involved, or gate the whole animated layer on this hook so the server never
 * writes an animated value at all.
 *
 * Preferred over `useEffect(() => setMounted(true), [])`, which lint objects to
 * and which also renders once more than it needs to.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    NEVER,
    () => true,
    () => false,
  )
}
