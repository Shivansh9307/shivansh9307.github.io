import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'

// Scripted walkthrough of the Compliance Radar. All figures shown are
// illustrative demo data (labelled SIMULATED in the UI), not live output.

const STEPS = [
  { id: 'bronze', ms: 2000, log: { icon: '⟳', text: 'Companies House batch ingested → bronze (1,204 filings)', tone: 'slate' } },
  { id: 'silver', ms: 2000, log: { icon: '⟳', text: 'Conformed companies · officers · filings → silver', tone: 'slate' } },
  { id: 'gold', ms: 2000, log: { icon: '⟳', text: 'Risk marts refreshed → gold', tone: 'slate' } },
  { id: 'extract', ms: 2200, log: { icon: '✂', text: 'Claude extracted 14 fields from filing PDF · conf 0.97', tone: 'teal' } },
  { id: 'risk', ms: 2400, log: { icon: '⚠', text: 'Director network-risk 0.82 — above calibrated threshold 0.75', tone: 'rose' } },
  { id: 'checkpoint', ms: null, log: { icon: '⏸', text: 'CHECKPOINT — agent requests write: flag_company("07098213")', tone: 'amber' } },
]

const QUERIES = [
  'Which directors joined 3+ boards this quarter?',
  'Show companies with overdue confirmation statements',
  'Which filings moved registered office twice in a year?',
]

const TONES = {
  slate: 'text-slate',
  teal: 'text-teal-400',
  amber: 'text-amber-400',
  rose: 'text-rose-500',
  chalk: 'text-chalk',
}

const STAGES = [
  { id: 'bronze', label: 'Bronze', sub: 'raw filings', color: '#C08427' },
  { id: 'silver', label: 'Silver', sub: 'conformed', color: '#93A1B7' },
  { id: 'gold', label: 'Gold', sub: 'risk marts', color: '#0FA08D' },
]

function Pipeline({ activeStage }) {
  return (
    <div>
      <p className="eyebrow mb-3 text-[0.62rem]">Medallion pipeline · PostgreSQL</p>
      <div className="flex items-center gap-1">
        {STAGES.map((s, i) => {
          const active = activeStage === s.id
          return (
            <div key={s.id} className="flex flex-1 items-center gap-1">
              <div
                className={`flex-1 rounded-lg border px-3 py-2 text-center transition-all duration-500 ${
                  active ? 'border-transparent' : 'border-line/70'
                }`}
                style={active ? { borderColor: s.color, boxShadow: `0 0 16px ${s.color}44` } : undefined}
              >
                <span className="block font-mono text-[0.7rem] font-medium tracking-[0.12em] text-chalk uppercase">
                  {s.label}
                </span>
                <span className="block font-mono text-[0.58rem] tracking-[0.08em] text-slate">{s.sub}</span>
              </div>
              {i < STAGES.length - 1 && (
                <span aria-hidden="true" className="h-px w-3 shrink-0 bg-line" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Director network: one company, five officers; officer d2 carries the risk.
const NODES = [
  { id: 'co', x: 100, y: 62, r: 9, label: 'CO' },
  { id: 'd1', x: 34, y: 26, r: 5.5 },
  { id: 'd2', x: 168, y: 24, r: 5.5, risky: true },
  { id: 'd3', x: 22, y: 96, r: 5.5 },
  { id: 'd4', x: 148, y: 104, r: 5.5 },
  { id: 'd5', x: 84, y: 12, r: 5.5 },
]

function Network({ riskActive, score }) {
  return (
    <div>
      <p className="eyebrow mb-3 text-[0.62rem]">Director network-risk · calibrated</p>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 190 120" className="h-24 w-auto flex-1" role="img" aria-label="Director network graph with one high-risk connection">
          {NODES.filter((n) => n.id !== 'co').map((n) => (
            <line
              key={n.id}
              x1="100"
              y1="62"
              x2={n.x}
              y2={n.y}
              stroke={n.risky && riskActive ? '#E0506B' : '#22304A'}
              strokeWidth={n.risky && riskActive ? 1.6 : 1}
              className="transition-all duration-700"
            />
          ))}
          {NODES.map((n) => (
            <circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.id === 'co' ? '#6B8AEE' : n.risky && riskActive ? '#E0506B' : '#141C30'}
              stroke={n.id === 'co' ? '#6B8AEE' : n.risky && riskActive ? '#E0506B' : '#93A1B7'}
              strokeWidth="1.2"
              className="transition-all duration-700"
            />
          ))}
        </svg>
        <div className="shrink-0 text-right">
          <span
            className={`block font-mono text-3xl font-medium tabular-nums transition-colors duration-500 ${
              riskActive ? 'text-rose-500' : 'text-slate/60'
            }`}
          >
            {riskActive ? score.toFixed(2) : '—.——'}
          </span>
          <span className="block font-mono text-[0.58rem] tracking-[0.14em] text-slate uppercase">
            risk score · thr 0.75
          </span>
        </div>
      </div>
    </div>
  )
}

function QueryBar() {
  const [i, setI] = useState(0)
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        setI((v) => (v + 1) % QUERIES.length)
      }}
    >
      <span aria-hidden="true" className="font-mono text-teal-400">
        ›
      </span>
      <input
        type="text"
        readOnly
        value={QUERIES[i]}
        aria-label="Example agent query (read-only demo)"
        className="min-w-0 flex-1 cursor-default border-0 bg-transparent font-mono text-[0.72rem] text-slate outline-none"
        tabIndex={-1}
      />
      <button
        type="submit"
        className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[0.6rem] tracking-[0.14em] text-slate uppercase transition-colors hover:border-teal-600/70 hover:text-teal-400"
      >
        Next example
      </button>
    </form>
  )
}

export default function RadarDemo() {
  const reduced = useReducedMotion()
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { margin: '-80px' })

  const [stepIdx, setStepIdx] = useState(-1)
  const [feed, setFeed] = useState([])
  const [resolution, setResolution] = useState(null) // 'approved' | 'rejected'
  const [cycle, setCycle] = useState(0)
  const timer = useRef(null)

  const step = stepIdx >= 0 ? STEPS[stepIdx] : null
  const atCheckpoint = step?.id === 'checkpoint' && !resolution

  // Static "everything on" snapshot for reduced motion.
  useEffect(() => {
    if (!reduced) return
    setStepIdx(STEPS.length - 1)
    setFeed(STEPS.map((s, i) => ({ ...s.log, key: i })))
    setResolution('approved')
  }, [reduced])

  // Advance the scripted timeline.
  useEffect(() => {
    if (reduced || !inView) return
    if (stepIdx === -1) {
      timer.current = setTimeout(() => setStepIdx(0), 400)
      return () => clearTimeout(timer.current)
    }
    const s = STEPS[stepIdx]
    setFeed((f) => [...f.slice(-5), { ...s.log, key: `${cycle}-${stepIdx}` }])

    if (s.ms !== null) {
      timer.current = setTimeout(() => setStepIdx((v) => v + 1 < STEPS.length ? v + 1 : v), s.ms)
      return () => clearTimeout(timer.current)
    }
    // checkpoint: auto-approve after 6s if the visitor doesn't decide
    timer.current = setTimeout(() => resolve('approved'), 6000)
    return () => clearTimeout(timer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, inView, reduced])

  const resolve = (decision) => {
    clearTimeout(timer.current)
    setResolution(decision)
    setFeed((f) => [
      ...f.slice(-5),
      decision === 'approved'
        ? { icon: '✓', text: 'Write committed · audit trail appended', tone: 'teal', key: `${cycle}-ok` }
        : { icon: '✕', text: 'Write discarded · decision noted in audit trail', tone: 'slate', key: `${cycle}-no` },
    ])
    // brief hold, then restart the loop
    timer.current = setTimeout(() => {
      setResolution(null)
      setFeed([])
      setCycle((c) => c + 1)
      setStepIdx(-1)
    }, 3200)
  }

  const activeStage = ['bronze', 'silver', 'gold'].includes(step?.id) ? step.id : null
  const riskActive = reduced || stepIdx >= STEPS.findIndex((s) => s.id === 'risk')
  const score = riskActive ? 0.82 : 0.0

  return (
    <div
      ref={rootRef}
      className="rounded-xl border border-line/70 bg-ink-950/80 p-5 md:p-6"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-[0.62rem] tracking-[0.2em] whitespace-nowrap text-slate uppercase">
          Radar console
        </p>
        <p className="rounded-full border border-amber-600/50 px-2.5 py-0.5 text-center font-mono text-[0.56rem] tracking-[0.18em] text-amber-400 uppercase">
          Simulated
          <span className="hidden sm:inline"> walkthrough</span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <Pipeline activeStage={activeStage} />
          <Network riskActive={riskActive} score={score} />
        </div>

        <div className="flex min-h-[220px] flex-col rounded-lg border border-line/60 bg-ink-900/50 p-4">
          <p className="eyebrow mb-3 text-[0.62rem]">Compliance agent · human-checkpointed</p>
          <ul className="flex flex-1 flex-col justify-end gap-1.5 font-mono text-[0.72rem] leading-relaxed" aria-live="polite">
            <AnimatePresence initial={false}>
              {feed.map((line) => (
                <motion.li
                  key={line.key}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className={TONES[line.tone]}
                >
                  <span aria-hidden="true" className="mr-2">{line.icon}</span>
                  {line.text}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-4 flex min-h-[30px] items-center gap-2">
            {atCheckpoint ? (
              <>
                <button
                  onClick={() => resolve('approved')}
                  className="rounded-full bg-teal-400 px-4 py-1.5 font-mono text-[0.62rem] font-medium tracking-[0.14em] text-ink-950 uppercase transition-colors hover:bg-chalk"
                >
                  Approve write
                </button>
                <button
                  onClick={() => resolve('rejected')}
                  className="rounded-full border border-line px-4 py-1.5 font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase transition-colors hover:border-rose-500/60 hover:text-rose-500"
                >
                  Reject
                </button>
              </>
            ) : (
              <p className="font-mono text-[0.6rem] tracking-[0.12em] text-slate/70 uppercase">
                {resolution
                  ? 'Decision recorded — restarting walkthrough…'
                  : 'Agent running · a human approves every write'}
              </p>
            )}
          </div>

          <div className="mt-4 border-t border-line/50 pt-3">
            <QueryBar />
          </div>
        </div>
      </div>
    </div>
  )
}
