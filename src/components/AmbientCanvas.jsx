import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Ambient signature effect: a faint dot grid with three slow-flowing chart
// lines (the validated mark colours). Canvas 2D, DPR-aware, paused when the
// tab is hidden; renders a single static frame under prefers-reduced-motion.
// Two series only — a third (amber) line was removed in cycle 5 (Chanel rule):
// it added colour noise without adding meaning.
const SERIES = [
  { color: '#0FA08D', alpha: 0.5, width: 2, amp: 46, speed: 0.00012, phase: 0, yFrac: 0.62 },
  { color: '#6B8AEE', alpha: 0.34, width: 1.5, amp: 64, speed: 0.00008, phase: 2.1, yFrac: 0.5 },
]

function drawFrame(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h)

  // dot grid
  const gap = 56
  ctx.fillStyle = 'rgba(56, 76, 112, 0.7)'
  for (let x = gap / 2; x < w; x += gap) {
    for (let y = gap / 2; y < h; y += gap) {
      ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5)
    }
  }

  // flowing chart lines
  for (const s of SERIES) {
    ctx.beginPath()
    const baseY = h * s.yFrac
    for (let x = -20; x <= w + 20; x += 14) {
      const y =
        baseY +
        Math.sin(x * 0.006 + t * s.speed * 1000 + s.phase) * s.amp +
        Math.sin(x * 0.0017 + t * s.speed * 400 + s.phase * 2) * s.amp * 0.7
      x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.strokeStyle = s.color
    ctx.globalAlpha = s.alpha
    ctx.lineWidth = s.width
    ctx.stroke()
    ctx.globalAlpha = 1
  }
}

export default function AmbientCanvas() {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduced) drawFrame(ctx, w, h, 0)
    }

    const loop = (t) => {
      drawFrame(ctx, w, h, t)
      raf = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
