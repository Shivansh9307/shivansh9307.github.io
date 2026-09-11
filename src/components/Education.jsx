import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const EASE = [0.22, 1, 0.36, 1]

// Split out of the Experience timeline so that section holds employment only —
// a reader counting years of work should not have to disentangle two degrees
// from it first. Mirrors the CV, which has always kept these separate.
const ENTRIES = [
  {
    period: 'Jan 2024 — Jan 2025',
    // CV-backed only: the CV says "MSc Business Analytics (Merit)" and nothing
    // about distinctions. Do not embellish a grade here.
    eyebrow: 'Postgraduate · Business analytics',
    title: 'MSc Business Analytics (Merit) — Aston University',
    where: 'Birmingham, UK',
    points: [
      'Data modelling, predictive analytics, machine learning and data visualisation.',
      'Dissertation applied natural language processing to financial fraud detection, taking model performance from near-unusable to reliable — a 4.6× improvement in precision-recall AUC, from 0.14 to 0.64.',
    ],
  },
  {
    period: '2013 — 2016',
    eyebrow: 'BCom (Honours) · Commerce & Finance',
    title: 'Amity University',
    where: 'Lucknow, India',
    points: [],
  },
]

function Entry({ entry, index }) {
  const reduced = useReducedMotion()
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.05 * index }}
      className="relative grid gap-2 pb-14 pl-8 last:pb-0 md:grid-cols-[180px_1fr] md:gap-10 md:pl-10"
    >
      {/* Same rail marker as the Experience timeline — this is the same kind of
          list and should not invent a second visual language for it. */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-[5px] rotate-45 border border-teal-600 bg-teal-600"
      />
      <p className="font-mono text-[0.72rem] leading-6 tracking-[0.14em] text-slate uppercase">{entry.period}</p>
      <div>
        <p className="eyebrow mb-1.5 text-[0.62rem]">{entry.eyebrow}</p>
        <h3 className="text-lg font-bold tracking-tight text-chalk">{entry.title}</h3>
        <p className="mt-0.5 font-mono text-[0.65rem] tracking-[0.14em] text-slate/80 uppercase">{entry.where}</p>
        {entry.points.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {entry.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-[0.92rem] leading-relaxed text-slate">
                <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-teal-600/70" />
                {pt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  )
}

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-28">
      <SectionHeading number="05" eyebrow="Education">
        Where the method came from.
      </SectionHeading>
      <ol className="relative border-l border-line/60">
        {ENTRIES.map((e, i) => (
          <Entry key={e.title} entry={e} index={i} />
        ))}
      </ol>
    </section>
  )
}
