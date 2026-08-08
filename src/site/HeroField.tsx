'use client'

import { useEffect, useRef } from 'react'

/**
 * The particle field behind the hero diagram: a drift of small dots with a few
 * faint orbital arcs cutting through them.
 *
 * This is the piece that carries the "expensive" read in the pinned reference,
 * and the reason an earlier attempt at that hero looked bare: the composition
 * was right and the atmosphere was missing entirely. Dots and arcs, nothing
 * else, so it never competes with the type sitting on top of it.
 *
 * Painted rather than shipped as an image for two reasons. It has to resolve at
 * whatever size the band ends up, and a 1400px PNG of grey dots is a download
 * for something a few lines of canvas can draw at any density.
 *
 * The distribution is deliberately not uniform: density falls off with distance
 * from the centre, so the field reads as a cloud around the diagram instead of
 * as noise across a rectangle. Seeded from a fixed integer hash rather than
 * Math.random, so the layout is identical on the server and the client and the
 * field never reshuffles on a re-render.
 */

const DOTS = 520
const ARCS = 3

/** Deterministic 0..1 from an integer. Cheap, and stable across renders. */
function rnd(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export default function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0

    const paint = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      if (!w || !h) return

      // Capped at 2: past that the extra pixels cost more than they show on a
      // field of 2px dots.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // The cloud centres on the DIAGRAM, not on the band. Those are not the
      // same point: the band also holds a headline, a subhead and two buttons
      // above the diagram, so its midpoint lands in the empty gap between the
      // buttons and the wiring, and the densest part of the field ends up
      // hanging above the thing it is supposed to surround. Measured rather
      // than hardcoded, because the diagram is dropped entirely below 1080px.
      const stage = parent.querySelector('.vl-stage, .vl-pipe')
      let cx = w / 2
      let cy = h / 2
      if (stage) {
        const pb = parent.getBoundingClientRect()
        const sb = stage.getBoundingClientRect()
        if (sb.height > 0) {
          cx = sb.left - pb.left + sb.width / 2
          cy = sb.top - pb.top + sb.height / 2
        }
      }
      // Reaches past the diagram but stays inside the band.
      const reach = Math.min(w, h) * 0.62

      // --- orbital arcs, drawn first so the dots sit over them ---
      ctx.lineWidth = 1
      for (let a = 0; a < ARCS; a++) {
        const r = reach * (0.72 + a * 0.26)
        const tilt = (rnd(a * 7 + 1) - 0.5) * 0.8
        const start = rnd(a * 13 + 3) * Math.PI * 2
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 - a * 0.012})`
        ctx.beginPath()
        ctx.ellipse(cx, cy, r, r * 0.42, tilt, start, start + Math.PI * 1.25)
        ctx.stroke()
      }

      // --- the dot cloud ---
      for (let i = 0; i < DOTS; i++) {
        const ang = rnd(i * 3 + 1) * Math.PI * 2
        // Square root of a uniform sample would spread dots evenly over the
        // disc; raising the exponent instead pulls them inward, which is what
        // makes this a cloud around the diagram rather than a filled circle.
        const dist = Math.pow(rnd(i * 5 + 2), 1.9) * reach
        const x = cx + Math.cos(ang) * dist
        // Squashed vertically: the band is much wider than it is tall, and a
        // circular cloud in it reads as a ball rather than as atmosphere.
        const y = cy + Math.sin(ang) * dist * 0.78
        if (x < -8 || x > w + 8 || y < -8 || y > h + 8) continue

        const size = 1 + rnd(i * 11 + 4) * 1.6
        // Fades out toward the edge of the reach so the cloud has no border.
        const falloff = 1 - dist / reach
        const alpha = (0.1 + rnd(i * 17 + 5) * 0.34) * Math.max(falloff, 0)

        // One dot in about fourteen picks up the signal colour, which keeps the
        // field from being purely grey without becoming a second accent.
        const hot = rnd(i * 23 + 6) > 0.93
        ctx.fillStyle = hot
          ? `rgba(53, 222, 188, ${alpha * 0.85})`
          : `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, size / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    paint()

    // Repaint on resize only. There is no animation loop: a drifting field
    // behind a headline is movement competing with reading, and the page
    // already spends its motion budget on the ticker and the diagram.
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(paint)
    })
    ro.observe(canvas.parentElement!)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={ref} className="vl-hero-field" aria-hidden="true" />
}
