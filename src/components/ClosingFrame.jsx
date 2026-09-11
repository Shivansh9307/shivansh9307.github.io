import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Closes the argument the hero opens. The hero claims the work is defensible;
// this is the invitation to test that claim, and it is the last thing a hiring
// manager reads before the footer.
export default function ClosingFrame() {
  const reduced = useReducedMotion()
  return (
    <section aria-label="Closing statement" className="border-t border-line/50 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-7 flex items-center gap-3"
        >
          <span className="eyebrow-marker" aria-hidden="true">◆</span>
          <span>End of file</span>
          <motion.span
            aria-hidden="true"
            className="h-px flex-1 origin-left bg-line/60"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          />
        </motion.p>

        <motion.h2
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[24ch] overflow-hidden text-[clamp(2rem,5vw,3.9rem)] leading-[1.06] font-bold tracking-tight"
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: '110%' },
              visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
            }}
          >
            Every number on this page traces to a source.{' '}
            <span className="font-serif italic text-teal-400">Ask me about any of them.</span>
          </motion.span>
        </motion.h2>
      </div>
    </section>
  )
}
