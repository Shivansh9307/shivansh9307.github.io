import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import useActiveSection from '../hooks/useActiveSection'
import { SECTIONS, SECTION_IDS } from '../sections'

// Fixed left-gutter rail: scroll progress as a filling rule, with one node per
// section. Turns six separately-revealing sections into one continuous read.
//
// Desktop-only by necessity — it lives in the gutter beside the max-w-[1200px]
// content column, and below xl there is no gutter to live in. Nodes are real
// anchors, so it doubles as a second nav for long-page scrolling.
//
// Renders EVERY section, unlike the nav — a vertical gutter rail has no width
// pressure, so it keeps the Home node and the scroll-to-top the nav gives up.
// Both track the same list; ids come from src/sections.js.
const NODES = SECTIONS

export default function ScrollSpine() {
  const reduced = useReducedMotion()
  const active = useActiveSection(SECTION_IDS)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  // Nothing here conveys information the nav doesn't already carry, so under
  // reduced motion it simply doesn't render rather than rendering inert.
  if (reduced) return null

  return (
    <nav
      aria-label="Section progress"
      className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative flex flex-col items-center gap-7 py-2">
        {/* track + fill, behind the nodes */}
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line/60" />
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 origin-top bg-teal-600"
          style={{ scaleY: progress }}
        />

        {NODES.map(({ id, label }) => {
          const on = active === id
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              aria-current={on ? 'true' : undefined}
              className="group relative flex h-3 w-3 items-center justify-center"
            >
              <span
                className={`h-[7px] w-[7px] rotate-45 border transition-all duration-300 ${
                  on
                    ? 'scale-125 border-teal-400 bg-teal-400'
                    : 'border-slate/60 bg-ink-950 group-hover:border-teal-400'
                }`}
              />
              <span className="pointer-events-none absolute left-6 font-mono text-[0.58rem] tracking-[0.16em] whitespace-nowrap text-teal-400 uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
