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
      'Found a 7.5% revenue understatement risk: the largest revenue source (33% of income) was split across two records. Re-keyed the model on the unique identifier to remove it.',
      'Built four Tableau dashboards for the Managing Director, reconciling thousands of transactions across 20+ providers and 158 markets into one reporting set that passed all 16 accuracy checks.',
      'Quantified revenue concentration for executive review: one provider held 37% of revenue, at the lowest rate paid, and accounted for all quarterly reversals.',
    ],
  },
  {
    period: 'Jan 2022 — Dec 2023',
    eyebrow: 'Senior Analyst · Operational performance reporting',
    title: 'HCLTech — Client: Emirates Global Aluminium (EGA), Dubai',
    where: 'Lucknow, India',
    points: [
      'Built a Power BI star-schema model (DAX time intelligence, dynamic segmentation, RLS) adopted by executive leadership to track critical operational KPIs, and automated the monthly management pack with SQL and Power Query, cutting manual reporting effort 30% (~15 analyst-hours a month).',
      'Gathered and prioritised reporting requirements with EGA management and delivered monthly executive steering packs and weekly operational reviews on incident volume, SLA compliance, backlog and resolution time. Migrated reporting from BMC Remedy to ServiceNow mid-contract with zero disruption.',
      'Cut repeat SLA breaches 15% quarter on quarter, lifted SLA compliance 8 points and reduced repeat incidents 18% against baseline by analysing ~4,200 monthly incidents and service requests across two UAE sites (Jebel Ali, Al Taweelah) to expose failure patterns and backlog bottlenecks.',
      'Presented findings to 25+ stakeholders across Service Desk, Infrastructure, Enterprise Applications and Site Operations and agreed remediation, reaching 90%+ closure of corrective actions within target. Mentored 3 junior BI and reporting analysts.',
    ],
  },
  {
    period: 'Sep 2020 — Jan 2022',
    eyebrow: 'Corporate Agency Manager · MIS Analyst',
    title: 'HDFC Life',
    where: 'Lucknow, India',
    points: [
      'Produced daily, weekly and monthly MIS reporting across 5 core BFSI systems, consolidating large operational datasets in Excel (XLOOKUP, PivotTables, SUMIFS) and cutting report turnaround 45%.',
      'Reconciled premium collections and commissions across 15+ branches, identifying billing discrepancies and maintaining 99.8% reporting accuracy.',
      'Tracked KPIs, advisor productivity and branch performance for regional managers, with ad hoc analysis that reduced process turnaround time 15%.',
    ],
  },
  {
    period: 'Jul 2017 — Aug 2020',
    eyebrow: 'Analytics Associate · Fintech product analytics',
    title: 'smallcase',
    where: 'Bengaluru, India',
    points: [
      'Owned product analytics across three verticals (B2C app, Publisher tools and Broker Gateway), working with engineering to lift event tracking accuracy to 98%+.',
      'Traced broker-login friction through funnel and retention cohort analysis in SQL and Python, driving a 14% increase in onboarding conversion.',
      'Launched 12+ self-serve dashboards for product, marketing and partnerships teams, cutting ad hoc data requests 40% and saving around 12 hours a week.',
    ],
  },
  {
    period: 'Jun 2016 — Jul 2017',
    eyebrow: 'Accounts Executive',
    title: 'Meridian Associates',
    where: 'Lucknow, India',
    points: [
      'Managed ledgers, AP/AR and invoicing for 15+ client accounts in Tally ERP and built monthly MIS packs, with automated Excel reconciliations that cut discrepancy resolution time 30%.',
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
