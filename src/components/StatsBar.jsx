import useCountUp from '../hooks/useCountUp'

// All figures are CV-backed — no invented metrics.
//
// The mix is deliberate: two from paid delivery (HCLTech, Koru Green), one from
// the independent projects, one academic. An earlier set ran 1/2/1 the other way,
// which made a page about employability lead with unpaid work. Keep a paid figure
// in each of the first two slots when this is re-synced.
const STATS = [
  {
    value: 8,
    label: 'points of SLA compliance gained across two UAE industrial sites at HCLTech',
  },
  {
    value: 7.5,
    decimals: 1,
    suffix: '%',
    label: 'revenue understatement risk eliminated at Koru Green by re-keying the model',
  },
  {
    value: 4,
    // Rendered as a dimmed "60 →" annotation before the counted value: the fall is
    // the point, and a bare "4" needs its caption read before it parses.
    from: '60',
    label: 'directors left on the compliance watchlist after one definitional fix',
  },
  {
    value: 0.64,
    decimals: 2,
    // The other real before/after pair on this band, presented like the 60 → 4 above.
    // The remaining two stats are deltas (+8 points, 7.5%) — they *are* the change, so
    // they have no "before", and no baseline for them exists in the CV or any repo.
    // Slope marks were considered twice and declined for that reason; see DESIGN_NOTES.
    from: '0.14',
    label: 'precision-recall AUC in the NLP fraud dissertation, 4.6× up',
  },
]

function Stat({ value, prefix = '', suffix = '', decimals = 0, from, label }) {
  const [ref, current] = useCountUp(value, 1400, decimals)
  return (
    <div ref={ref} className="flex flex-col gap-2 px-2 py-8 text-center md:py-10">
      <span className="font-mono text-4xl font-medium text-teal-400 tabular-nums md:text-[3.4rem] md:leading-none">
        {from && (
          <span className="mr-1.5 text-[0.42em] font-normal tracking-[0.04em] text-slate">
            {from} <span aria-hidden="true">→</span>
          </span>
        )}
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
