import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import AmbientCanvas from './AmbientCanvas'
import MagneticButton from './MagneticButton'
import portrait from '../assets/portrait.jpg'

const EASE = [0.22, 1, 0.36, 1]
const ROTATING = ['dashboards', 'semantic models', 'pipelines', 'insights']

// One word inside an overflow mask — the staggered hero reveal unit.
function Word({ children, index, serif = false }) {
  const reduced = useReducedMotion()
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span
        className={`inline-block ${serif ? 'font-serif italic text-teal-400' : ''}`}
        initial={reduced ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 + index * 0.08 }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function RotatingWord() {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2600)
    return () => clearInterval(t)
  }, [reduced])

  return (
    <span className="relative inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom text-teal-400">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROTATING[i]}
          className="inline-block font-serif italic"
          initial={reduced ? false : { y: '105%' }}
          animate={{ y: 0 }}
          exit={reduced ? undefined : { y: '-105%' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function ScrollCue() {
  const reduced = useReducedMotion()
  return (
    <motion.a
      href="#about"
      aria-label="Scroll to about section"
      className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
    >
      {/* hand-drawn loop arrow */}
      <motion.svg
        width="26"
        height="58"
        viewBox="0 0 26 58"
        fill="none"
        animate={reduced ? undefined : { y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <path
          d="M13 2 C 18 12, 8 20, 13 30 C 16 36, 13 42, 13 52"
          stroke="#B8C4D6"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M6 45 L 13 54 L 20 45" stroke="#B8C4D6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.svg>
      <span className="font-serif text-base italic text-slate transition-colors group-hover:text-teal-400">scroll</span>
    </motion.a>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <AmbientCanvas />
      {/* vignette so text sits on calm ink */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_45%,rgba(6,10,18,0.82)_0%,rgba(6,10,18,0.4)_55%,rgba(6,10,18,0.05)_100%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 pt-28 pb-20 md:grid-cols-[1.5fr_1fr] md:px-10">
        <div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line/80 bg-ink-900/70 px-4 py-2 font-mono text-[0.68rem] tracking-[0.16em] text-slate uppercase backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            Open to Power BI / Data Analyst roles · UK
          </motion.p>

          <h1 className="text-[clamp(2.5rem,6.6vw,5.1rem)] leading-[1.04] font-bold tracking-tight">
            <Word index={0}>I</Word> <Word index={1}>build</Word>
            <br />
            <RotatingWord />
            <br />
            <span className="whitespace-nowrap">
              <Word index={2}>you</Word> <Word index={3}>can</Word>{' '}
              <Word index={4}>defend.</Word>
            </span>
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate"
          >
            Data &amp; BI Analyst in London, UK. I design{' '}
            <strong className="font-medium text-chalk">semantic models, advanced DAX and governed pipelines</strong>{' '}
            — from SLA reporting across 10,000+ tickets a year for EGA Dubai to an AI
            compliance-monitoring platform on UK Companies House data, and an analytics
            engine that blocks its own output when the evidence doesn&rsquo;t hold up.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" variant="primary">
              View projects <span aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton href="/Shivansh_Chauhan_CV.pdf" download="Shivansh_Chauhan_CV.pdf" variant="secondary">
              Download CV
            </MagneticButton>
          </motion.div>
        </div>

        {/* Annotated portrait — a plotted figure, not a circle crop */}
        <motion.figure
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="relative mx-auto w-full max-w-[240px] md:max-w-[320px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-line">
            <img
              src={portrait}
              alt="Portrait of Shivansh Chauhan"
              width="675"
              height="1200"
              className="h-[340px] w-full object-cover object-top saturate-[0.9] md:h-[480px]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
          </div>
          {/* annotation label */}
          <figcaption className="mt-3 text-center font-mono text-[0.65rem] tracking-[0.18em] text-slate uppercase md:text-left">
            <span className="eyebrow-marker">◆</span> Shivansh Chauhan
          </figcaption>
          {/* corner ticks */}
          <span aria-hidden="true" className="absolute -top-2 -left-2 h-4 w-4 border-t border-l border-teal-600/70" />
          <span aria-hidden="true" className="absolute -top-2 -right-2 h-4 w-4 border-t border-r border-teal-600/70" />
          <span aria-hidden="true" className="absolute -right-2 bottom-6 h-4 w-4 border-r border-b border-teal-600/70" />
          <span aria-hidden="true" className="absolute -left-2 bottom-6 h-4 w-4 border-b border-l border-teal-600/70" />
        </motion.figure>
      </div>

      <ScrollCue />
    </section>
  )
}
