import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const EASE = [0.22, 1, 0.36, 1]

const ENTRIES = [
  {
    period: 'Sep — Nov 2024',
    eyebrow: 'BI Intern · Royalty & revenue analytics',
    title: 'Koru Green — music & media',
    where: 'Remote, UK',
    points: [
      'Eliminated a 7.5% revenue understatement risk by identifying that the largest revenue source — 33% of income — was fragmented across two records, and re-keying the model on the unique identifier.',
      'Built four Tableau dashboards for the Managing Director, reconciling 5,147 transactions across 20+ providers and 158 markets into one reporting set passing all 16 accuracy checks.',
      'Quantified revenue concentration for executive review: one provider held 37% of revenue at the lowest rate paid and all quarterly reversals; modelled a 10% rate cut at 3.67% of quarter.',
    ],
  },
  {
    period: 'Jan 2022 — Dec 2023',
    eyebrow: 'Senior Analyst · Operational performance reporting',
    title: 'HCLTech — Client: Emirates Global Aluminium (EGA), Dubai',
    where: 'Lucknow, India',
    points: [
      'Cut repeat SLA breaches 15% quarter on quarter and lifted SLA compliance 8 points by analysing performance data across two UAE industrial sites to expose failure patterns and backlog bottlenecks.',
      'Reduced repeat incidents 18% against baseline through root cause analysis on high-impact failures, using trend analysis and cross-team investigation to isolate underlying process and technical drivers.',
      'Achieved 90%+ closure of agreed corrective actions within target by partnering with service desk, infrastructure, application and business stakeholders to validate findings and agree remediation.',
      'Cut manual reporting effort 30% by standardising monthly management reporting across incident volume, SLA compliance, backlog and resolution time — redirecting that time into investigation.',
      'Migrated reporting from BMC Remedy to ServiceNow mid-contract, rebuilding the reporting layer on a new data source with no break in monthly management reporting.',
    ],
  },
  {
    period: 'Sep 2020 — Jan 2022',
    eyebrow: 'Agency Manager · Bancassurance, RBL Bank partnership',
    title: 'HDFC Life',
    where: 'Lucknow, India',
    points: [
      'Lifted conversion from 15% to 35% and took the territory to #1 in Uttar Pradesh by analysing sales and premium performance across five bank branches to find where conversion was breaking down.',
      'Produced weekly performance reporting for branch and regional management, tracking conversion, premium volume and activity against target.',
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
      {/* Every entry here is employment now, so the marker is uniform. Education
          moved to its own section and keeps the same marker for visual continuity. */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-[5px] rotate-45 border border-teal-600 bg-teal-600"
      />
      <p className="font-mono text-[0.72rem] leading-6 tracking-[0.14em] text-slate uppercase">{entry.period}</p>
      <div>
        <p className="eyebrow mb-1.5 text-[0.62rem]">{entry.eyebrow}</p>
        <h3 className="text-lg font-bold tracking-tight text-chalk">{entry.title}</h3>
        <p className="mt-0.5 font-mono text-[0.65rem] tracking-[0.14em] text-slate/80 uppercase">{entry.where}</p>
        {entry.points.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {entry.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-[0.92rem] leading-relaxed text-slate">
                <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-teal-600/70" />
                {pt}
              </li>
            ))}
          </ul>
        )}
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
