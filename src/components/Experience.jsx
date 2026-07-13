import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const EASE = [0.22, 1, 0.36, 1]

const ENTRIES = [
  {
    period: '2024 — 2025',
    eyebrow: 'Education · Birmingham',
    title: 'MSc Business Analytics — Aston University',
    where: 'Birmingham, UK',
    points: [
      'Data modelling, predictive analytics, machine learning and data visualisation.',
      'Dissertation-adjacent build: the UK Corporate Compliance Radar platform.',
    ],
  },
  {
    period: 'Sep — Nov 2024',
    eyebrow: 'BI Intern · Green energy',
    title: 'Koru Green Limited',
    where: 'Remote, UK',
    points: [
      'Built star-schema semantic models that surfaced a 45% revenue-concentration insight, reshaping commercial targeting.',
      'Cut dashboard load times 30% with advanced DAX; unified 12 source platforms into clean dimensional models.',
      'Embedded governance — KPI standardisation, version-controlled documentation, deployment pipelines — cutting post-release issues 40%.',
    ],
  },
  {
    period: '2022 — 2023',
    eyebrow: 'Senior Analyst · Enterprise',
    title: 'HCLTech — Client: EGA Dubai',
    where: 'Lucknow, India',
    points: [
      'Cut SLA resolution time 50% by modelling operational datasets dimensionally to expose bottleneck patterns.',
      'Designed reusable star-schema reporting frameworks supporting executive decisions across a multi-system industrial environment.',
      'Introduced QA validation and documentation standards; root-cause analytics reduced repeat tickets 10%.',
    ],
  },
  {
    period: '2020 — 2022',
    eyebrow: 'Agency Manager · Insurance',
    title: 'HDFC Life',
    where: 'Lucknow, India',
    points: [
      'Lifted branch conversion rates 30% through SQL-based KPI modelling and structured performance reviews.',
      'Reduced turnaround time 15% with forecast-versus-actual variance dashboards that flagged drift early.',
      'Delivered executive regional reports integrating revenue mix and compliance analytics.',
    ],
  },
]

function Entry({ entry, index }) {
  const reduced = useReducedMotion()
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.05 * index }}
      className="relative grid gap-2 pb-14 pl-8 last:pb-0 md:grid-cols-[180px_1fr] md:gap-10 md:pl-10"
    >
      {/* node marker on the rail */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-[5px] rotate-45 border border-teal-600 bg-ink-950"
      />
      <p className="font-mono text-[0.72rem] leading-6 tracking-[0.14em] text-slate uppercase">{entry.period}</p>
      <div>
        <p className="eyebrow mb-1.5 text-[0.62rem]">{entry.eyebrow}</p>
        <h3 className="text-lg font-bold tracking-tight text-chalk">{entry.title}</h3>
        <p className="mt-0.5 font-mono text-[0.65rem] tracking-[0.14em] text-slate/80 uppercase">{entry.where}</p>
        <ul className="mt-3 flex flex-col gap-2">
          {entry.points.map((pt) => (
            <li key={pt} className="flex gap-3 text-[0.92rem] leading-relaxed text-slate">
              <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-teal-600/70" />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-28">
      <SectionHeading number="04" eyebrow="Experience">
        Where the discipline came from.
      </SectionHeading>
      <ol className="relative border-l border-line/60">
        {ENTRIES.map((e, i) => (
          <Entry key={e.title} entry={e} index={i} />
        ))}
      </ol>
    </section>
  )
}
