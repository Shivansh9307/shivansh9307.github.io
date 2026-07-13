import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// Anchor that leans toward the cursor on fine-pointer devices.
export default function MagneticButton({ href, download, children, variant = 'primary', onClick, caps = true, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })
  const reduced = useReducedMotion()

  const onMouseMove = (e) => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const styles =
    variant === 'primary'
      ? 'bg-teal-400 text-ink-950 hover:bg-chalk'
      : 'border border-line bg-ink-900/60 text-chalk hover:border-teal-600/60'

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[0.78rem] font-medium transition-colors duration-200 ${
        caps ? 'tracking-[0.14em] uppercase' : 'tracking-[0.02em]'
      } ${styles} ${className}`}
    >
      {children}
    </motion.a>
  )
}
