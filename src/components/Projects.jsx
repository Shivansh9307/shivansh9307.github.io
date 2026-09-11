import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import NorthstarDemo from './NorthstarDemo'
import RadarDemo from './RadarDemo'
import AtlasReceipt from './AtlasReceipt'
import ClientWork from './ClientWork'
import PowerBIProof from './PowerBIProof'
import NorthstarCaseStudy from './NorthstarCaseStudy'

const EASE = [0.22, 1, 0.36, 1]

const REPO = 'https://github.com/Shivansh9307'

// EGA/HCLTech used to sit here. It is paid client delivery and was being
// out-weighted by three unpaid flagships above it, so it moved to ClientWork
// alongside Koru Green. What is left is genuinely supporting: repo-backed side
// projects, neither of them on the CV, kept because both are live public repos.
const SUPPORTING = [
  {
    eyebrow: 'Self-directed · AI/LLM',
    title: 'RAG Document Chatbot',
    body: 'Conversational analytics chatbot for grounded Q&A over business documents — FastAPI backend, Next.js frontend and a ChromaDB vector store, with token-budgeted prompt assembly and streaming responses.',
    detail: 'A strict "no answer" fallback on empty retrievals — no fabricated output, a control requirement in regulated reporting.',
    tags: ['FastAPI', 'Next.js', 'ChromaDB', 'RAG'],
    repo: `${REPO}/rag-Chatbot-llm`,
  },
  {
    eyebrow: 'Power BI · Commercial',
    title: 'Food & Beverage sales analysis',
    body: 'Interactive Power BI dashboard over a food & beverage sales dataset — revenue distribution, product-category trends, salesperson performance and monthly/quarterly cycles, modelled across a product dimension and a transactions fact table.',
    detail: 'A clear breakdown of $2M+ in revenue across 4,100+ orders.',
    tags: ['Power BI', 'DAX', 'Star schema', 'Sales analytics'],
    repo: `${REPO}/Sales-analysis-of-food-and-beverage`,
  },
]

const FLAGSHIPS = [
  {
    id: 'northstar',
    status: 'Flagship · Active',
    title: 'Northstar — Causal Demand & Promotion Analytics',
    repo: `${REPO}/northstar-causal-demand-analytics`,
    demo: NorthstarDemo,
    tags: [
      'Python',
      'DuckDB',
      'Difference-in-differences',
      'Power BI (TMDL)',
      '45 DAX measures',
      'Monte Carlo',
    ],
  },
  {
    id: 'radar',
    status: 'Flagship · Active',
    title: 'UK Corporate Compliance Radar',
    repo: `${REPO}/compliance-radar`,
    demo: RadarDemo,
    tags: [
      'PostgreSQL',
      'Python',
      'Claude API',
      'Companies House data',
      'Network analysis',
      'Human-in-the-loop agent',
    ],
  },
  {
    id: 'atlas',
    status: 'Flagship · Active',
    title: 'Atlas Analytics',
    repo: `${REPO}/atlas-analytics`,
    demo: AtlasReceipt,
    tags: [
      'Python',
      'Multi-agent',
      'Provenance ledger',
      '18 agents',
      'DuckDB · Postgres',
      'Power BI export',
      '380 tests',
    ],
  },
]

function RepoLink({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/repo inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase transition-colors hover:text-teal-400"
    >
      View repo
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5"
      >
        ↗
      </span>
    </a>
  )
}

function Card({ project, index }) {
  const reduced = useReducedMotion()
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.08 * index }}
      tabIndex={0}
      className="group flex flex-col rounded-2xl border border-line/70 bg-ink-900/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-600/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] focus-within:border-teal-600/60"
    >
      <p className="eyebrow mb-4 text-[0.62rem]">{project.eyebrow}</p>
      <h3 className="mb-3 text-xl font-bold tracking-tight text-chalk">{project.title}</h3>
      <p className="text-[0.92rem] leading-relaxed text-slate">{project.body}</p>
      <p className="mt-3 max-h-24 overflow-hidden font-serif text-[0.95rem] italic text-teal-400 opacity-100 transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:max-h-24 md:group-hover:opacity-100 md:group-focus-within:max-h-24 md:group-focus-within:opacity-100">
        {project.detail}
      </p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.tags.map((t) => (
          <li key={t} className="rounded-full border border-line/70 px-3 py-1 font-mono text-[0.62rem] tracking-[0.08em] text-slate">
            {t}
          </li>
        ))}
      </ul>
      {project.repo && (
        <div className="mt-4 border-t border-line/50 pt-4">
          <RepoLink href={project.repo} />
        </div>
      )}
    </motion.article>
  )
}

function Flagship({ project, blurb, index }) {
  const reduced = useReducedMotion()
  const Demo = project.demo
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.05 * index }}
      className="rounded-2xl border border-line/70 bg-ink-900/50 p-6 md:p-10"
    >
      <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow mb-4 text-[0.62rem]">
            <span className="text-teal-400" aria-hidden="true">●</span> {project.status}
          </p>
          <h3 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-tight font-bold tracking-tight text-chalk">
            {project.title}
          </h3>
        </div>
        <p className="text-[0.95rem] leading-relaxed text-slate">{blurb}</p>
      </div>

      <Demo />

      {project.id === 'northstar' && <NorthstarCaseStudy />}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-line/70 px-3 py-1 font-mono text-[0.62rem] tracking-[0.08em] text-slate">
              {t}
            </li>
          ))}
        </ul>
        <RepoLink href={project.repo} />
      </div>
    </motion.article>
  )
}

const BLURBS = {
  northstar: (
    <>
      What do promotions actually earn? The obvious comparison says{' '}
      <strong className="font-medium text-chalk">+126.7%</strong>; difference-in-differences on
      uncannibalised controls says <strong className="font-medium text-chalk">+96.4%</strong>; the
      recorded truth is <strong className="font-medium text-chalk">+81.0%</strong> — so the
      correction removes 64% of the bias. That gap is not academic:{' '}
      <strong className="font-medium text-chalk">
        a plan built on the naive number backs 19 promotions that all lose money
      </strong>
      , where the corrected one backs 10 and captures 96.8% of perfect-knowledge profit on the same
      budget. Delivered as a five-page Power BI layer over 45 DAX measures.
    </>
  ),
  radar: (
    <>
      End-to-end compliance monitoring on{' '}
      <strong className="font-medium text-chalk">live UK Companies House data</strong>: a
      bronze/silver/gold PostgreSQL warehouse, a calibrated director network-risk score,
      Claude-based PDF extraction, and a tool-using compliance agent —{' '}
      <strong className="font-medium text-chalk">every write approved by a human</strong>. Fixing
      the definition of &ldquo;adverse&rdquo; — counting involuntary insolvency rather than every
      dissolution, with the threshold held constant — cut the network flag from{' '}
      <strong className="font-medium text-chalk">60 directors to 4</strong>. Hand-verifying flagged
      cases against source accounts took the LLM layer&rsquo;s false positives from 18 in 20 to 3
      in 20, <strong className="font-medium text-chalk">holding at 9.2% across 239 unseen
      companies</strong> — isolating 20 high-risk companies from 10,000, all directors
      pseudonymised under UK GDPR.
    </>
  ),
  atlas: (
    <>
      A multi-agent analytics platform that{' '}
      <strong className="font-medium text-chalk">
        refuses to ship a number it cannot trace back to a query
      </strong>
      . <strong className="font-medium text-chalk">18 specialist agents</strong> orchestrated with
      read-only enforcement at two layers; every figure is computed deterministically in Python —
      the LLM layer is never given the chance to produce one — and carries a provenance ID
      resolving to a stored query and result hash. A blind red team re-derives the headline from
      raw data without seeing the first analyst&rsquo;s SQL;{' '}
      <strong className="font-medium text-chalk">a failed gate blocks the build entirely</strong>.
    </>
  ),
}

function BandLabel({ children }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <p className="eyebrow min-w-0 text-[0.62rem]">{children}</p>
      {/* The rule is decoration; it gets whatever space the label leaves, and is
          dropped entirely on narrow screens where there is none to give. */}
      <span aria-hidden="true" className="hidden h-px flex-1 bg-line/60 sm:block" />
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-28">
      <SectionHeading number="03" eyebrow="Projects">
        Built to be audited.
      </SectionHeading>

      {/* Three co-flagships, stacked: the demos are wide consoles and none
          survives half-width. */}
      <BandLabel>Independent projects · built and documented in public</BandLabel>
      <div className="mb-14 flex flex-col gap-8">
        {FLAGSHIPS.map((p, i) => (
          <Flagship key={p.id} project={p} blurb={BLURBS[p.id]} index={i} />
        ))}
      </div>

      {/* The artefact the role actually hires for. See PowerBIProof.jsx. */}
      <BandLabel>Power BI layer · shipped report pages</BandLabel>
      <div className="mb-14">
        <PowerBIProof />
      </div>

      {/* Paid client delivery — see ClientWork.jsx for why it has its own band. */}
      <BandLabel>Client delivery · paid engagements</BandLabel>
      <div className="mb-14">
        <ClientWork />
      </div>

      {/* Supporting cards */}
      <BandLabel>Also built · public repos</BandLabel>
      <div className="grid gap-6 md:grid-cols-2">
        {SUPPORTING.map((p, i) => (
          <Card key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
