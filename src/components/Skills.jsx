import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const EASE = [0.22, 1, 0.36, 1]

const GROUPS = [
  {
    name: 'Power BI & Modelling',
    items: [
      'Power BI Desktop',
      'Power BI Service',
      'Semantic Models',
      'Advanced DAX',
      'Star Schema',
      'Dimensional Modelling',
      'Row-Level Security',
      'Incremental Refresh',
      'Deployment Pipelines',
    ],
  },
  {
    name: 'Data & Database',
    items: [
      'SQL',
      'MS SQL Server',
      'MySQL',
      'PostgreSQL',
      'Power Query (M)',
      'ETL Processes',
      'Data Warehousing',
      'Performance Optimisation',
      'Data Quality & Governance',
      'Snowflake (developing)',
    ],
  },
  {
    name: 'Power Platform & Automation',
    items: ['Power Automate', 'Power Apps', 'Microsoft Fabric', 'Git Version Control', 'Zapier', 'n8n'],
  },
  {
    name: 'Python & AI Workflows',
    items: [
      'Python',
      'pandas',
      'TF-IDF / NLP prototyping',
      'Claude API',
      'LLM document extraction',
      'Agentic workflows (human-in-the-loop)',
    ],
  },
  {
    name: 'Business & Delivery',
    items: [
      'Requirements Gathering',
      'Stakeholder Engagement',
      'Technical Design Documentation',
      'Change Control',
      'Agile & Kanban',
      'Executive Reporting',
    ],
  },
]

function Pill({ children }) {
  return (
    <li className="rounded-full border border-line/80 bg-ink-900/60 px-4 py-1.5 text-[0.82rem] text-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-600/70 hover:text-chalk hover:shadow-[0_0_18px_rgba(15,160,141,0.25)]">
      {children}
    </li>
  )
}

function Group({ group, index }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.05 * index }}
      className="grid gap-4 border-t border-line/50 py-8 md:grid-cols-[260px_1fr] md:gap-10"
    >
      <div>
        <h3 className="text-[1.05rem] font-medium text-chalk">{group.name}</h3>
        <p className="mt-1 font-mono text-[0.65rem] tracking-[0.18em] text-slate uppercase">
          {String(group.items.length).padStart(2, '0')} items
        </p>
      </div>
      <ul className="flex flex-wrap content-start gap-2.5">
        {group.items.map((item) => (
          <Pill key={item}>{item}</Pill>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-28">
      <SectionHeading number="02" eyebrow="Skills">
        The working stack.
      </SectionHeading>
      <div className="border-b border-line/50">
        {GROUPS.map((g, i) => (
          <Group key={g.name} group={g} index={i} />
        ))}
      </div>
    </section>
  )
}
