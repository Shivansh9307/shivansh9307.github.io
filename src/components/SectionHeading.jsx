import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Section opener: mono annotation eyebrow + oversized heading with a
// scroll-triggered mask reveal. NB: whileInView must live on the h2 (the
// always-visible mask), not the translated span — IntersectionObserver clips
// targets by overflow-hidden ancestors, so a fully-masked span never
// intersects and would never reveal.
export default function SectionHeading({ number, eyebrow, children }) {
  const reduced = useReducedMotion()
  return (
    <div className="mb-14">
      <motion.p
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="eyebrow mb-4 flex items-center gap-3"
      >
        <span className="eyebrow-marker" aria-hidden="true">◆</span>
        <span>
          {number} — {eyebrow}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line/60" />
      </motion.p>
      <motion.h2
        initial={reduced ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="overflow-hidden text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] font-bold tracking-tight"
      >
        <motion.span
          className="block"
          variants={{
            hidden: { y: '110%' },
            visible: { y: 0, transition: { duration: 0.8, ease: EASE } },
          }}
        >
          {children}
        </motion.span>
      </motion.h2>
    </div>
  )
}
