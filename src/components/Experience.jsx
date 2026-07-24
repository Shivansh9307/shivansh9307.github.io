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
      'Dissertation applied NLP to financial fraud detection, improving model precision-recall AUC from 0.14 to 0.64.',
    ],
  },
  {
    period: 'Sep — Nov 2024',
    eyebrow: 'BI Intern · Green energy',
    title: 'Koru Green Limited',
    where: 'Remote, UK',
    points: [
      'Cleansed and prepared multi-regional royalty earnings data in Python (pandas / Jupyter), analysing month-on-month revenue trends.',
      'Built dynamic Tableau dashboards by translating Technical Design Document (TDD) requirements into analytical deliverables with cross-functional stakeholders.',
      'Presented performance reporting to stakeholders; managed version control in Git / GitHub.',
    ],
  },
  {
    period: '2022 — 2023',
    eyebrow: 'Senior Analyst · Enterprise',
    title: 'HCLTech — Client: EGA Dubai',
    where: 'Lucknow, India',
    points: [
      'Produced automated SLA and IT Support KPI reporting across a multi-system enterprise IT environment, delivered to senior management on weekly and monthly cycles.',
      'Extracted, cleansed and transformed incident data from ServiceNow and BMC Remedy into Excel reporting suites, giving IT heads visibility of SLA breaches and operational bottlenecks.',
      'Streamlined recurring manual reporting and maintained operational and procedural documentation to client standards.',
    ],
  },
  {
    period: '2020 — 2022',
    eyebrow: 'Agency Manager · Insurance',
    title: 'HDFC Life',
    where: 'Lucknow, India',
    points: [
      'Managed a bank-partnership (RBL Bank bancassurance) insurance portfolio, tracking performance metrics and reporting to branch and regional stakeholders.',
      'Territory achieved the #1 regional position for premium collection during tenure.',
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
