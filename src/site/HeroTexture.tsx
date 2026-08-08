'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero's textured ground, painted rather than photographed.
 *
 * The reference carries its first screen on a moody photographic surface. We
 * generate an equivalent: two soft haze fields in the brand hue over the deep
 * ground, plus a fine monochrome grain. Canvas rather than a raster asset means
 * nothing to license, nothing to download, and it resamples cleanly at any
 * width and pixel ratio.
 *
 * It renders once per size change and never animates, so it costs one paint.
 * The canvas is aria-hidden and purely decorative; every pixel of meaning lives
 * in the DOM above it.
 */
export default function HeroTexture() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const host = canvas.parentElement
    if (!host) return

    let frame = 0

    const paint = () => {
      const { width: cssW, height: cssH } = host.getBoundingClientRect()
      if (cssW < 2 || cssH < 2) return
      // Cap the ratio: grain is invisible past 2x and the buffer cost is not.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`

      const g = canvas.getContext('2d')
      if (!g) return
      const w = canvas.width
      const h = canvas.height

      g.fillStyle = '#0f1614'
      g.fillRect(0, 0, w, h)

      // Two haze fields, off-centre so the light reads as directional.
      const haze = (x: number, y: number, r: number, rgb: string, a: number) => {
        const grad = g.createRadialGradient(x, y, 0, x, y, r)
        grad.addColorStop(0, `rgba(${rgb}, ${a})`)
        grad.addColorStop(1, `rgba(${rgb}, 0)`)
        g.fillStyle = grad
        g.fillRect(0, 0, w, h)
      }
      haze(w * 0.74, h * 0.16, Math.max(w, h) * 0.72, '53, 222, 188', 0.16)
      haze(w * 0.12, h * 0.92, Math.max(w, h) * 0.62, '14, 124, 102', 0.2)

      // Fine grain. Drawn into a small tile and stamped, which is ~40x cheaper
      // than writing ImageData across the full buffer on a wide screen.
      const tile = document.createElement('canvas')
      const T = 128
      tile.width = T
      tile.height = T
      const tg = tile.getContext('2d')
      if (tg) {
        const img = tg.createImageData(T, T)
        for (let i = 0; i < img.data.length; i += 4) {
          const v = 118 + ((i * 2654435761) % 76)
          img.data[i] = v
          img.data[i + 1] = v
          img.data[i + 2] = v
          img.data[i + 3] = 12
        }
        tg.putImageData(img, 0, 0)
        const pattern = g.createPattern(tile, 'repeat')
        if (pattern) {
          g.fillStyle = pattern
          g.fillRect(0, 0, w, h)
        }
      }
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(paint)
    }

    schedule()
    const ro = new ResizeObserver(schedule)
    ro.observe(host)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={ref} className="vl-texture" aria-hidden="true" />
}
