import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Every figure below is real output committed to the atlas-analytics repo
// (examples/churn-run and examples/blocked-run) — not mock data. This is the
// deliberate counterpart to RadarDemo, which is labelled SIMULATED because its
// figures are illustrative. Do not relabel either one.
const RUNS = [
  {
    id: 'pass',
    tab: 'Run 01 · Pass',
    question: '/analyze "what drives churn"',
    scope: '64,374 customer records',
    checks: [
      { name: 'base rate', analyst: '0.473685', red: '0.473685', ok: true },
      { name: "weighted rates over 'Gender'", analyst: '0.473685', red: '0.473685', ok: true },
      { name: 'cliff jump at Payment Delay ≥ 16', analyst: '0.611904', red: '0.611904', ok: true },
    ],
    verdict: {
      tone: 'pass',
      label: 'Verdict: PASS',
      detail: 'Attacks: none survived · Confidence A (1.00)',
    },
    findings: [
      'Churn steps from 10.1% to 71.3% at 16 days payment-late — a 7.06× jump at a threshold, not a gradual trend.',
      '2-cut step R² 1.000 against linear R² 0.830: a linear model would have buried the actionable cutoff.',
    ],
    shipped: 'Provenance-stamped deck + Power BI export',
  },
  {
    id: 'blocked',
    tab: 'Run 02 · Blocked',
    question: '/analyze returns risk',
    scope: '12,000 orders joined from 9 CSVs',
    // All three agree — the arithmetic was never the problem. The gate fired on
    // discrimination (an AUC of 0.4954 is a coin flip), so every tolerance check
    // here is honestly YES; the veto lives in the verdict line below.
    checks: [
      { name: 'base rate', analyst: 'matched', red: 'matched', ok: true },
      { name: 'confusion matrix', analyst: 'matched', red: 'matched', ok: true },
      { name: 'calibration', analyst: 'matched', red: 'matched', ok: true },
    ],
    kicker: { label: 'Held-out AUC 0.4954', detail: 'a coin flip' },
    verdict: {
      tone: 'blocked',
      label: 'Verdict: GATE 3 VETO',
      detail: '“The model does not earn its complexity.”',
    },
    findings: [
      'Every number computed correctly. It failed on discrimination, not arithmetic — an AUC of 0.4954 is a coin flip.',
      'The gate halts the DAG before the deck and emit nodes run, so no polished artefact exists to be mistaken for a validated one.',
    ],
    shipped: 'Nothing. No deck, no Power BI project.',
  },
]

// Aligned columns from sm up; stacked with inline labels below it. The
// analyst-vs-red-team comparison is the whole argument, so it must never be
// pushed off-screen into a horizontal scroll on mobile.
const ROW = 'sm:grid sm:grid-cols-[1fr_5.5rem_5.5rem_3.75rem] sm:gap-x-3 sm:items-baseline'

function Cell({ label, value, className }) {
  return (
    <span className="flex gap-2 sm:block sm:text-right">
      <span className="w-[4.5rem] shrink-0 text-slate/50 sm:hidden">{label}</span>
      <span className={className}>{value}</span>
    </span>
  )
}

function Check({ check }) {
  return (
    <li className={`flex flex-col gap-1 border-t border-line/40 py-2.5 ${ROW}`}>
      <span className="text-slate">{check.name}</span>
      <Cell label="analyst" value={check.analyst} className="tabular-nums text-chalk" />
      <Cell label="red team" value={check.red} className="tabular-nums text-plot-500" />
      <Cell
        label="in tol."
        value={check.ok ? 'YES' : 'NO'}
        className={check.ok ? 'text-teal-400' : 'text-rose-500'}
      />
    </li>
  )
}

function Panel({ run }) {
  const isBlocked = run.verdict.tone === 'blocked'
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <div className="min-w-0">
        <p className="eyebrow mb-3 text-[0.62rem]">Independent re-derivation</p>
        <div className="font-mono text-[0.72rem]">
          <div className={`hidden pb-1 text-slate/70 ${ROW}`} aria-hidden="true">
            <span>check</span>
            <span className="text-right">analyst</span>
            <span className="text-right">red team</span>
            <span className="text-right">in tol.</span>
          </div>
          <ul>
            {run.checks.map((c) => (
              <Check key={c.name} check={c} />
            ))}
          </ul>
        </div>

        {run.kicker && (
          <p className="mt-4 flex flex-wrap items-baseline gap-x-2 font-mono text-[0.68rem]">
            <span className="text-rose-500">{run.kicker.label}</span>
            <span className="text-slate/70">— {run.kicker.detail}</span>
          </p>
        )}

        <p
          className={`mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border px-3 py-2 font-mono text-[0.68rem] ${
            isBlocked ? 'border-rose-500/40 bg-rose-500/5' : 'border-teal-600/40 bg-teal-600/5'
          }`}
        >
          <span className={isBlocked ? 'text-rose-500' : 'text-teal-400'}>{run.verdict.label}</span>
          <span className="text-slate">{run.verdict.detail}</span>
        </p>
      </div>

      <div className="flex min-w-0 flex-col rounded-lg border border-line/60 bg-ink-900/50 p-4">
        {/* Not .eyebrow — that uppercases, and a slash-command should read as typed. */}
        <p className="mb-3 font-mono text-[0.68rem] leading-relaxed tracking-[0.06em] text-teal-400">
          {run.question} <span className="text-slate/60">· {run.scope}</span>
        </p>
        <ul className="flex flex-col gap-2.5">
          {run.findings.map((f) => (
            <li key={f} className="flex gap-3 text-[0.86rem] leading-relaxed text-slate">
              <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-teal-600/70" />
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-4 font-mono text-[0.65rem] tracking-[0.12em] text-slate/80 uppercase">
          Shipped:{' '}
          <span className={isBlocked ? 'text-rose-500' : 'text-teal-400'}>{run.shipped}</span>
        </p>
      </div>
    </div>
  )
}

export default function AtlasReceipt() {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  const run = RUNS[i]

  return (
    <div className="rounded-xl border border-line/70 bg-ink-950/80 p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.62rem] tracking-[0.2em] whitespace-nowrap text-slate uppercase">
          Atlas ledger
        </p>
        {/* Teal, not amber: these are real committed run figures, not a simulation. */}
        <p className="rounded-full border border-teal-600/50 px-2.5 py-0.5 text-center font-mono text-[0.56rem] tracking-[0.18em] text-teal-400 uppercase">
          Real run
          <span className="hidden sm:inline"> · committed</span>
        </p>
      </div>

      <div role="tablist" aria-label="Atlas example runs" className="mb-5 flex flex-wrap gap-2">
        {RUNS.map((r, idx) => (
          <button
            key={r.id}
            role="tab"
            type="button"
            aria-selected={i === idx}
            onClick={() => setI(idx)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[0.62rem] tracking-[0.14em] uppercase transition-colors ${
              i === idx
                ? 'border-teal-600/70 bg-teal-600/20 text-teal-400'
                : 'border-line text-slate hover:border-teal-600/70 hover:text-teal-400'
            }`}
          >
            {r.tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={run.id}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Panel run={run} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
