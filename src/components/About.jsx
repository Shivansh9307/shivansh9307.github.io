import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const EASE = [0.22, 1, 0.36, 1]

function Reveal({ children, delay = 0, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FACTS = [
  { k: 'MSc Business Analytics', v: 'Aston University, Birmingham · Merit · 2025' },
  { k: 'Languages', v: 'English (professional proficiency), Hindi (native)' },
  { k: 'Currently building', v: 'Atlas Analytics · UK Corporate Compliance Radar' },
  { k: 'Base', v: 'London · open to hybrid / remote UK' },
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-28">
      <SectionHeading number="01" eyebrow="About">
        Analyst first, engineer second.
      </SectionHeading>

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
        <div>
          <Reveal>
            <p className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.72rem] tracking-[0.2em] text-slate uppercase">
              <span>
                <span aria-hidden="true">🇮🇳</span> Lucknow, India
              </span>
              <svg aria-hidden="true" className="h-2.5 w-20" viewBox="0 0 80 10" fill="none">
                <motion.path
                  d="M1 5 H72"
                  stroke="#0FA08D"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
                />
                <motion.path
                  d="M66 1.5 L73 5 L66 8.5"
                  stroke="#0FA08D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3, duration: 0.3 }}
                />
              </svg>
              <span>
                <span aria-hidden="true">🇬🇧</span> London, UK
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.55] font-normal text-slate">
              I turn <strong className="font-medium text-chalk">messy operational and commercial data</strong> into{' '}
              <strong className="font-medium text-chalk">decisions people can stand behind</strong>. Three years across
              enterprise IT, insurance and a music-analytics startup taught me one lesson:{' '}
              <em className="font-serif text-teal-400">
                a dashboard is only as good as the governance underneath it
              </em>{' '}
              — the model, the definitions, the audit trail.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-[1.7] text-slate">
              That discipline was built on volume: two years of SLA and KPI reporting across{' '}
              <strong className="font-medium text-chalk">10,000+ tickets a year</strong> for Emirates
              Global Aluminium at HCLTech, where a number that couldn't be traced was a number
              leadership wouldn't act on. Now, after an MSc in Business Analytics at Aston
              University, I'm applying it to a newer class of problems —{' '}
              <strong className="font-medium text-chalk">
                AI-assisted data systems that keep humans in the loop
              </strong>
              , where every automated write has a checkpoint and every score can be explained.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <dl className="flex flex-col divide-y divide-line/50 border-y border-line/50">
            {FACTS.map(({ k, v }) => (
              <div key={k} className="flex flex-col gap-1 py-4">
                <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-slate uppercase">{k}</dt>
                <dd className="text-[0.95rem] text-chalk">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
