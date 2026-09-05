import useCountUp from '../hooks/useCountUp'

// All figures are CV-backed — no invented metrics.
const STATS = [
  { value: 4, label: 'directors left on the compliance watchlist after one definitional fix, down from 60' },
  { value: 19, label: 'loss-making promotions the standard lift measure would have backed' },
  { value: 30, suffix: '%', label: 'of manual reporting effort cut at HCLTech, redirected into investigation' },
  { value: 0.64, decimals: 2, label: 'precision-recall AUC in the NLP fraud dissertation — 4.6× up from 0.14' },
]

function Stat({ value, prefix = '', suffix = '', decimals = 0, label }) {
  const [ref, current] = useCountUp(value, 1400, decimals)
  return (
    <div ref={ref} className="flex flex-col gap-2 px-2 py-8 text-center md:py-10">
      <span className="font-mono text-4xl font-medium text-teal-400 tabular-nums md:text-[3.4rem] md:leading-none">
        {prefix}
        {current}
        {suffix}
      </span>
      <span className="mx-auto max-w-[22ch] text-[0.82rem] leading-snug text-slate">{label}</span>
    </div>
  )
}

export default function StatsBar() {
  return (
    <section aria-label="Career statistics" className="border-y border-line/60 bg-ink-900/40">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-line/40 px-6 md:grid-cols-4 md:px-10">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
