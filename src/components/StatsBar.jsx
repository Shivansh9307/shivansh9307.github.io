import useCountUp from '../hooks/useCountUp'

// All figures are CV-backed — no invented metrics.
const STATS = [
  { value: 3, suffix: '+', label: 'years in data & reporting' },
  { value: 12, suffix: '', label: 'source platforms unified into one model' },
  { value: 50, suffix: '%', label: 'SLA resolution time cut at HCLTech' },
  { value: 45, suffix: '%', label: 'revenue concentration surfaced at Koru Green' },
]

function Stat({ value, suffix, label }) {
  const [ref, current] = useCountUp(value)
  return (
    <div ref={ref} className="flex flex-col gap-2 px-2 py-8 text-center md:py-10">
      <span className="font-mono text-4xl font-medium text-teal-400 tabular-nums md:text-[3.4rem] md:leading-none">
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
