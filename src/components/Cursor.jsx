import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// Desktop-only cursor accent: a trailing teal ring that grows over
// interactive elements. The native cursor stays visible — this is an accent,
// not a replacement.
export default function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hoveringLink, setHoveringLink] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 350, damping: 28 })
  const sy = useSpring(y, { stiffness: 350, damping: 28 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHoveringLink(Boolean(e.target.closest('a, button, input')))
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[90]"
    >
      <motion.div
        animate={{ scale: hoveringLink ? 2.1 : 1, opacity: hoveringLink ? 0.9 : 0.6 }}
        transition={{ duration: 0.2 }}
        className="-ml-3 -mt-3 h-6 w-6 rounded-full border border-teal-400/80"
      />
    </motion.div>
  )
}
