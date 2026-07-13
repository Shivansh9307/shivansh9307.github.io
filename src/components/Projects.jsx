import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import RadarDemo from './RadarDemo'

const EASE = [0.22, 1, 0.36, 1]

const FLAGSHIP_TAGS = [
  'PostgreSQL',
  'Python',
  'Claude API',
  'Companies House data',
  'Network analysis',
  'Human-in-the-loop agent',
]

const SUPPORTING = [
  {
    eyebrow: 'Data engineering · Foundation',
    title: 'Companies House ingestion engine',
    body: 'Bulk-file and REST ingestion of live UK Companies House data into a bronze/silver/gold PostgreSQL warehouse — idempotent loads, data-quality gates and full lineage from raw filing to reporting mart.',
    detail: 'The governed data layer the Compliance Radar is built on.',
    tags: ['Python', 'PostgreSQL', 'REST APIs', 'Dimensional modelling'],
  },
  {
    eyebrow: 'Analyst · Enterprise',
    title: 'Enterprise reporting frameworks — EGA Dubai',
    body: 'Reusable star-schema reporting frameworks for a multi-system industrial environment at HCLTech, exposing SLA bottlenecks and cutting resolution time by 50%.',
    detail: 'QA validation and documentation standards embedded into the reporting lifecycle.',
    tags: ['Power BI', 'SQL', 'Star schema', 'Executive reporting'],
  },
  {
    eyebrow: 'Prototype · NLP',
    title: 'TF-IDF sentiment analysis',
    body: 'Classical-NLP prototype scoring sentiment in customer text with TF-IDF features — a deliberately explainable baseline before reaching for transformer models.',
    detail: 'Explainability first: every score traces back to weighted terms.',
    tags: ['Python', 'scikit-learn', 'TF-IDF', 'NLP'],
  },
]

function Card({ project, index }) {
  const reduced = useReducedMotion()
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.08 * index }}
      className="group flex flex-col rounded-2xl border border-line/70 bg-ink-900/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-600/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
    >
      <p className="eyebrow mb-4 text-[0.62rem]">{project.eyebrow}</p>
      <h3 className="mb-3 text-xl font-bold tracking-tight text-chalk">{project.title}</h3>
      <p className="text-[0.92rem] leading-relaxed text-slate">{project.body}</p>
      <p className="mt-3 max-h-0 overflow-hidden font-serif text-[0.95rem] italic text-teal-400 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
        {project.detail}
      </p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.tags.map((t) => (
          <li key={t} className="rounded-full border border-line/70 px-3 py-1 font-mono text-[0.62rem] tracking-[0.08em] text-slate">
            {t}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function Projects() {
  const reduced = useReducedMotion()
  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-28">
      <SectionHeading number="03" eyebrow="Projects">
        Built to be audited.
      </SectionHeading>

      {/* Flagship */}
      <motion.article
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-8 rounded-2xl border border-line/70 bg-ink-900/50 p-6 md:p-10"
      >
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-4 text-[0.62rem]">
              <span className="text-teal-400" aria-hidden="true">●</span> Flagship · Active
            </p>
            <h3 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-tight font-bold tracking-tight text-chalk">
              UK Corporate Compliance Radar
            </h3>
          </div>
          <p className="text-[0.95rem] leading-relaxed text-slate">
            End-to-end compliance monitoring on{' '}
            <strong className="font-medium text-chalk">live UK Companies House data</strong>: a
            bronze/silver/gold PostgreSQL warehouse, a calibrated director network-risk score,
            Claude-based PDF extraction, and a tool-using compliance agent —{' '}
            <strong className="font-medium text-chalk">every write approved by a human</strong>.
          </p>
        </div>

        <RadarDemo />

        <ul className="mt-6 flex flex-wrap gap-2">
          {FLAGSHIP_TAGS.map((t) => (
            <li key={t} className="rounded-full border border-line/70 px-3 py-1 font-mono text-[0.62rem] tracking-[0.08em] text-slate">
              {t}
            </li>
          ))}
        </ul>
      </motion.article>

      {/* Supporting cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {SUPPORTING.map((p, i) => (
          <Card key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
