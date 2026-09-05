import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'

// Scripted walkthrough of Northstar. Unlike RadarDemo, every figure here is
// real committed output from the northstar-causal-demand-analytics repo — but
// it was measured over a *deliberately synthetic* 2.19M-row estate, generated
// with the true promotional effect recorded so each estimate can be scored
// against a known answer. Hence the third provenance badge: neither the amber
// SIMULATED of the Radar console (illustrative mock data) nor Atlas's plain
// REAL RUN · COMMITTED (real run, real data). Do not collapse it into either.
//
// Three distinct numbers, and they must stay distinct: +126.7% is the naive
// estimate, +96.4% the DiD-corrected one, +81.0% the simulated truth. The CV
// bullet compresses these; the site must not.

const EASE = [0.22, 1, 0.36, 1]

const NAIVE = 126.7
const CAUSAL = 96.4
const TRUTH = 81.0
const DOMAIN = 140 // axis runs 0 → 140%
const pct = (v) => (v / DOMAIN) * 100

const STEPS = [
  { id: 'estate', ms: 2100, log: { icon: '⟳', text: '2.19M store × SKU × day rows generated · true effect recorded', tone: 'slate' } },
  { id: 'leak', ms: 2200, log: { icon: '✓', text: 'Ground-truth column withheld from every model · leakage check PASS', tone: 'teal' } },
  { id: 'naive', ms: 2200, log: { icon: '⚠', text: 'Naive: promoted rows vs everything else → +126.7%', tone: 'rose' } },
  { id: 'truth', ms: 2200, log: { icon: '◆', text: 'Simulated truth +81.0% — the naive number is off by 45.7pp', tone: 'chalk' } },
  { id: 'causal', ms: 2400, log: { icon: '✂', text: 'DiD on uncannibalised controls → +96.4% · 64% of bias removed', tone: 'teal' } },
  { id: 'decide', ms: null, log: { icon: '⏸', text: 'PLAN — which estimate picks the promotions?', tone: 'amber' } },
  { id: 'honesty', ms: 3000, log: { icon: '≈', text: 'Optimiser £337 · Monte Carlo median −£268 · 74% chance of loss', tone: 'amber' } },
]

const IDX = Object.fromEntries(STEPS.map((s, i) => [s.id, i]))

const TONES = {
  slate: 'text-slate',
  teal: 'text-teal-400',
  amber: 'text-amber-400',
  rose: 'text-rose-500',
  chalk: 'text-chalk',
}

const PLANS = {
  naive: {
    n: 19,
    color: '#E0506B',
    label: 'Plan on the naive estimate',
    caption: '19 promotions backed — every one of them loses money.',
    tone: 'text-rose-500',
  },
  causal: {
    n: 10,
    color: '#0FA08D',
    label: 'Plan on the causal estimate',
    caption: '10 promotions backed — 96.8% of perfect-knowledge profit, same budget.',
    tone: 'text-teal-400',
  },
}

// Estimate axis: three marks on one scale, so the gap between them is the
// argument. Value labels float above the rule from sm up; below that they
// stack into the legend underneath, which never overflows.
function LiftAxis({ naiveOn, truthOn, causalOn }) {
  const reduced = useReducedMotion()
  const marks = [
    { id: 'causal', v: CAUSAL, on: causalOn, color: '#0FA08D', label: 'causal', err: '+15.4pp' },
    { id: 'naive', v: NAIVE, on: naiveOn, color: '#E0506B', label: 'naive', err: '+45.7pp' },
  ]

  return (
    <div>
      <p className="eyebrow mb-3 text-[0.62rem]">Promotional lift · scored against a known answer</p>

      {/* Outer box carries the side padding so end-of-scale labels have room to
          sit centred on their mark; the inner box is the actual plot area, so
          the rule, the ticks and every mark share one coordinate system. */}
      <div className="relative h-[74px] px-5 sm:h-[86px]">
        <div className="absolute inset-x-5 inset-y-0">
          {/* truth reference line */}
          <motion.div
            className="absolute top-0 bottom-[26px]"
            style={{ left: `${pct(TRUTH)}%` }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: truthOn ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span aria-hidden="true" className="block h-full w-px border-l border-dashed border-chalk/60" />
            <span className="absolute -top-1 left-1.5 hidden font-mono text-[0.56rem] tracking-[0.14em] whitespace-nowrap text-chalk uppercase sm:block">
              truth +81.0%
            </span>
          </motion.div>

          {/* marks */}
          {marks.map((m) => (
            <motion.div
              key={m.id}
              className="absolute bottom-[26px] -translate-x-1/2"
              style={{ left: `${pct(m.v)}%` }}
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: m.on ? 1 : 0, y: m.on ? 0 : -8 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span
                className="mx-auto hidden font-mono text-[0.62rem] tracking-[0.06em] whitespace-nowrap sm:block"
                style={{ color: m.color }}
              >
                +{m.v.toFixed(1)}%
              </span>
              <span
                aria-hidden="true"
                className="mx-auto mt-1 block h-2 w-2 rotate-45"
                style={{ background: m.color }}
              />
            </motion.div>
          ))}

          {/* axis rule + ticks */}
          <div className="absolute inset-x-0 bottom-[18px] h-px bg-line" />
          {[0, 50, 100].map((t) => (
            <span
              key={t}
              className="absolute bottom-0 -translate-x-1/2 font-mono text-[0.56rem] tracking-[0.1em] text-slate/70"
              style={{ left: `${pct(t)}%` }}
            >
              +{t}%
            </span>
          ))}
        </div>
      </div>

      {/* legend — the only reading of the axis that survives 375px */}
      <ul className="mt-2 flex flex-col gap-1 font-mono text-[0.62rem] sm:mt-1">
        <li className="flex items-baseline justify-between gap-3 text-rose-500">
          <span>naive · promoted rows vs all others</span>
          <span className="tabular-nums whitespace-nowrap">
            +126.7% <span className="text-slate/70">err +45.7pp</span>
          </span>
        </li>
        <li className="flex items-baseline justify-between gap-3 text-teal-400">
          <span>causal · DiD, uncannibalised controls</span>
          <span className="tabular-nums whitespace-nowrap">
            +96.4% <span className="text-slate/70">err +15.4pp</span>
          </span>
        </li>
        <li className="flex items-baseline justify-between gap-3 text-chalk">
          <span>simulated truth</span>
          <span className="tabular-nums whitespace-nowrap">+81.0%</span>
        </li>
      </ul>
    </div>
  )
}

// The decision flip: which promotions the plan actually funds.
function PromotionPlan({ active, mode }) {
  const reduced = useReducedMotion()
  const plan = PLANS[mode] ?? PLANS.naive
  return (
    <div>
      <p className="eyebrow mb-3 text-[0.62rem]">Promotion plan · same budget</p>
      <ul className="flex min-h-[42px] flex-wrap gap-1.5" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          {active &&
            Array.from({ length: plan.n }, (_, i) => (
              <motion.li
                key={`${mode}-${i}`}
                initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.3, ease: EASE, delay: reduced ? 0 : i * 0.035 }}
                className="h-4 w-4 rounded-[3px]"
                style={{ background: `${plan.color}33`, border: `1px solid ${plan.color}` }}
              />
            ))}
        </AnimatePresence>
      </ul>
      <p className={`mt-3 text-[0.8rem] leading-snug ${active ? plan.tone : 'text-slate/50'}`}>
        {active ? plan.caption : 'Awaiting an estimate to plan against…'}
      </p>
    </div>
  )
}

export default function NorthstarDemo() {
  const reduced = useReducedMotion()
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { margin: '-80px' })

  const [stepIdx, setStepIdx] = useState(-1)
  const [feed, setFeed] = useState([])
  const [planMode, setPlanMode] = useState('naive')
  const [resolved, setResolved] = useState(false)
  const [cycle, setCycle] = useState(0)
  const timer = useRef(null)

  const step = stepIdx >= 0 ? STEPS[stepIdx] : null
  const atDecision = step?.id === 'decide' && !resolved

  // Static "everything resolved" snapshot for reduced motion.
  useEffect(() => {
    if (!reduced) return
    setStepIdx(STEPS.length - 1)
    setFeed(STEPS.map((s, i) => ({ ...s.log, key: i })))
    setPlanMode('causal')
    setResolved(true)
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
      timer.current = setTimeout(() => {
        if (stepIdx + 1 < STEPS.length) setStepIdx(stepIdx + 1)
        else restart()
      }, s.ms)
      return () => clearTimeout(timer.current)
    }
    // decision point: fall back to the causal plan after 6s if nobody chooses
    timer.current = setTimeout(() => resolve('causal'), 6000)
    return () => clearTimeout(timer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, inView, reduced])

  const resolve = (mode) => {
    clearTimeout(timer.current)
    setPlanMode(mode)
    setResolved(true)
    setFeed((f) => [
      ...f.slice(-5),
      mode === 'causal'
        ? { icon: '✓', text: 'Causal plan funded · 10 promotions · 96.8% of perfect knowledge', tone: 'teal', key: `${cycle}-causal` }
        : { icon: '✕', text: 'Naive plan funded · 19 promotions · every one loses money', tone: 'rose', key: `${cycle}-naive` },
    ])
    timer.current = setTimeout(() => setStepIdx(IDX.honesty), 1100)
  }

  const restart = () => {
    setFeed([])
    setPlanMode('naive')
    setResolved(false)
    setCycle((c) => c + 1)
    setStepIdx(-1)
  }

  const naiveOn = reduced || stepIdx >= IDX.naive
  const truthOn = reduced || stepIdx >= IDX.truth
  const causalOn = reduced || stepIdx >= IDX.causal
  const planOn = reduced || stepIdx >= IDX.decide

  return (
    <div ref={rootRef} className="rounded-xl border border-line/70 bg-ink-950/80 p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-[0.62rem] tracking-[0.2em] whitespace-nowrap text-slate uppercase">
          Northstar console
        </p>
        {/* Teal like Atlas — these are real committed figures — but the estate
            they were measured on is synthetic by design, and the badge says so. */}
        <p className="rounded-full border border-teal-600/50 px-2.5 py-0.5 text-center font-mono text-[0.56rem] tracking-[0.18em] text-teal-400 uppercase">
          Real run
          <span className="hidden sm:inline"> · synthetic estate</span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col gap-6">
          <LiftAxis naiveOn={naiveOn} truthOn={truthOn} causalOn={causalOn} />
          <PromotionPlan active={planOn} mode={planMode} />
        </div>

        <div className="flex min-h-[220px] flex-col rounded-lg border border-line/60 bg-ink-900/50 p-4">
          <p className="eyebrow mb-3 text-[0.62rem]">Causal pipeline · scored against truth</p>
          <ul
            className="flex flex-1 flex-col justify-end gap-1.5 font-mono text-[0.72rem] leading-relaxed"
            aria-live="polite"
          >
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

          <div className="mt-4 flex min-h-[30px] flex-wrap items-center gap-2">
            {atDecision ? (
              <>
                <button
                  onClick={() => resolve('causal')}
                  className="rounded-full bg-teal-400 px-4 py-1.5 font-mono text-[0.62rem] font-medium tracking-[0.14em] text-ink-950 uppercase transition-colors hover:bg-chalk"
                >
                  Use causal
                </button>
                <button
                  onClick={() => resolve('naive')}
                  className="rounded-full border border-line px-4 py-1.5 font-mono text-[0.62rem] tracking-[0.14em] text-slate uppercase transition-colors hover:border-rose-500/60 hover:text-rose-500"
                >
                  Use naive
                </button>
              </>
            ) : (
              <p className="font-mono text-[0.6rem] tracking-[0.12em] text-slate/70 uppercase">
                {reduced
                  ? 'Static summary · motion disabled'
                  : resolved
                    ? 'Plan recorded — restarting walkthrough…'
                    : 'Estimating · every figure scored against the recorded truth'}
              </p>
            )}
          </div>

          <p className="mt-4 border-t border-line/50 pt-3 text-[0.78rem] leading-relaxed text-slate">
            2.19M rows simulated with selection bias, cannibalisation and stockouts built in — and
            the true effect recorded, so every estimate is scored against a known answer.
          </p>
        </div>
      </div>
    </div>
  )
}
