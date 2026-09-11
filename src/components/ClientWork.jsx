import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// The two paid client engagements, promoted out of the supporting-card grid.
//
// Why they get their own band: the three flagships are unpaid self-directed work,
// and a page aimed at hiring managers cannot leave its only *client* delivery as
// one card in a 3-up row below them. Every figure here is CV-backed.
//
// Deliberately NOT carrying a provenance badge. The SIMULATED / REAL RUN ·
// COMMITTED / REAL RUN · SYNTHETIC ESTATE trio labels the flagships' *demo data*;
// there is no demo data here, and a fourth badge would blur a distinction the
// site works hard to keep sharp (see CLAUDE.md).

// All three share the unit "% reduction", so they can share one 0–30 scale.
// The +8-point SLA compliance lift is a different unit and is called out
// separately rather than being drawn on this axis.
const REDUCTIONS = [
  { label: 'Repeat SLA breaches', value: 15, note: 'quarter on quarter' },
  { label: 'Repeat incidents', value: 18, note: 'against baseline' },
  { label: 'Manual reporting effort', value: 30, note: 'monthly pack standardised' },
]
const SCALE = 30

function DeltaBars() {
  const reduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-3.5">
      <p className="eyebrow text-[0.6rem]">Reductions delivered · % against baseline</p>
      {REDUCTIONS.map((r, i) => (
        <div key={r.label} className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1">
          <span className="text-[0.82rem] text-slate">{r.label}</span>
          <span className="font-mono text-[0.95rem] font-medium text-teal-400 tabular-nums">
            &minus;{r.value}%
          </span>
          <div className="col-span-2 h-1 overflow-hidden rounded-full bg-line/50">
            <motion.div
              className="h-full rounded-full bg-teal-600"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
              style={{ width: `${(r.value / SCALE) * 100}%`, transformOrigin: 'left' }}
            />
          </div>
          <span className="col-span-2 font-mono text-[0.58rem] tracking-[0.14em] text-slate/80 uppercase">
            {r.note}
          </span>
        </div>
      ))}
    </div>
  )
}

// Many-to-one reconciliation: three inputs collapsing into one reporting set.
function ReconcileStrip() {
  const reduced = useReducedMotion()
  const INPUTS = [
    { v: '5,147', k: 'transactions' },
    { v: '20+', k: 'providers' },
    { v: '158', k: 'markets' },
  ]
  return (
    <div className="flex flex-col gap-3.5">
      <p className="eyebrow text-[0.6rem]">Reconciled into one reporting set</p>
      <div className="flex flex-col gap-2">
        {INPUTS.map((it, i) => (
          <motion.div
            key={it.k}
            initial={reduced ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="w-[4.5rem] shrink-0 text-right font-mono text-[1.05rem] font-medium text-chalk tabular-nums">
              {it.v}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
            <span className="w-[6.5rem] shrink-0 font-mono text-[0.58rem] tracking-[0.14em] text-slate uppercase">
              {it.k}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
        className="mt-1 flex items-center gap-3 rounded-lg border border-teal-600/40 bg-ink-950/60 px-3.5 py-2.5"
      >
        <span className="font-mono text-[1.05rem] font-medium text-teal-400 tabular-nums">16/16</span>
        <span className="font-mono text-[0.58rem] leading-snug tracking-[0.14em] text-slate uppercase">
          accuracy checks passed
        </span>
      </motion.div>
    </div>
  )
}

const ENGAGEMENTS = [
  {
    id: 'ega',
    eyebrow: 'Client delivery · HCLTech → Emirates Global Aluminium',
    title: 'SLA & operational performance, two UAE sites',
    body: 'Two years of operational performance reporting for EGA — analysing performance data across two UAE industrial sites to expose failure patterns and backlog bottlenecks, then standardising the monthly management pack across incident volume, SLA compliance, backlog and resolution time.',
    headline: { value: '+8', unit: 'points', label: 'SLA compliance' },
    visual: DeltaBars,
    footnote:
      'Reporting migrated from BMC Remedy to ServiceNow mid-contract — rebuilt on a new data source with no break in the monthly cycle. 90%+ of agreed corrective actions closed within target.',
    tags: ['ServiceNow', 'BMC Remedy', 'Root cause analysis', 'SLA reporting'],
  },
  {
    id: 'koru',
    eyebrow: 'Client delivery · Koru Green (music & media)',
    title: 'Royalty & revenue analytics for the Managing Director',
    body: 'Four Tableau dashboards built for the MD, reconciling a fragmented royalty estate into one reporting set — then using it to quantify where the revenue actually concentrates.',
    headline: { value: '7.5%', unit: 'risk removed', label: 'revenue understatement' },
    visual: ReconcileStrip,
    footnote:
      'The largest revenue source — 33% of income — was fragmented across two records; re-keying the model on the unique identifier eliminated the understatement. One provider held 37% of revenue at the lowest rate paid and all quarterly reversals; a 10% rate cut was modelled at 3.67% of quarter.',
    tags: ['Tableau', 'Revenue reconciliation', 'Data quality', 'Executive reporting'],
  },
]

function Engagement({ item, index }) {
  const reduced = useReducedMotion()
  const Visual = item.visual
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.08 * index }}
      className="flex flex-col rounded-2xl border border-line/70 bg-ink-900/50 p-6 md:p-8"
    >
      <p className="eyebrow mb-4 text-[0.62rem]">{item.eyebrow}</p>
      <h3 className="mb-4 text-xl font-bold tracking-tight text-chalk md:text-[1.4rem]">{item.title}</h3>

      <div className="mb-6 flex items-baseline gap-2.5">
        <span className="font-mono text-[2.6rem] leading-none font-medium text-teal-400 tabular-nums">
          {item.headline.value}
        </span>
        <span className="font-mono text-[0.6rem] leading-snug tracking-[0.14em] text-slate uppercase">
          {item.headline.unit}
          <br />
          {item.headline.label}
        </span>
      </div>

      <p className="mb-7 text-[0.92rem] leading-relaxed text-slate">{item.body}</p>

      <div className="mb-6 rounded-lg border border-line/60 bg-ink-950/50 p-4 md:p-5">
        <Visual />
      </div>

      <p className="mb-6 border-l-2 border-teal-600/40 py-0.5 pl-3 text-[0.85rem] leading-relaxed text-slate/90">
        {item.footnote}
      </p>

      <ul className="mt-auto flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line/70 px-3 py-1 font-mono text-[0.62rem] tracking-[0.08em] text-slate"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function ClientWork() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {ENGAGEMENTS.map((e, i) => (
        <Engagement key={e.id} item={e} index={i} />
      ))}
    </div>
  )
}
