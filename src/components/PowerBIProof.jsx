import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Report pages and DAX from the two public repos that publish them:
//   powerbi/screenshots/*.png        (northstar-causal-demand-analytics)
//   powerbi/Screenshots/*.png        (compliance-radar)
//   powerbi/measures.dax             (northstar-causal-demand-analytics)
//
// WHY THIS BAND EXISTS: the site is aimed at Data & BI Analyst roles and, before
// this, showed three bespoke React consoles and not one Power BI report. The CV
// claims a five-page layer over 45 DAX measures and a DAX drill-through watchlist;
// a hiring manager scanning for "can he build the thing" had nothing to find.
//
// Two tiers per page: a 760px thumbnail (lazy, ~50 KB) and a full-size file that is
// only fetched when the lightbox opens. Keep that split — seven full-size dashboard
// captures eagerly loaded would be ~1 MB of below-the-fold weight.
//
// Sources are the repo images verbatim, only cropped (the Radar pair are Power BI
// Desktop captures, so the page-tab bar and device toolbar are trimmed) and resized.
// Nothing is recoloured or composited; these are the reports as built.
const THUMBS = import.meta.glob('../assets/powerbi/*.jpg', { eager: true, query: '?url', import: 'default' })
const asset = (name) => THUMBS[`../assets/powerbi/${name}.jpg`]

const PAGES = [
  {
    file: 'northstar-2-promotion-roi',
    title: 'Promotion ROI',
    project: 'Northstar',
    note: 'The three estimates side by side — naive 126.74, causal 96.44, simulated truth 81.03 — with the control-set sensitivity table underneath.',
  },
  {
    file: 'northstar-1-executive-summary',
    title: 'Executive Summary',
    project: 'Northstar',
    note: 'How the business traded, and how much of it was bought with promotional margin.',
  },
  {
    file: 'northstar-3-elasticity-explorer',
    title: 'Elasticity Explorer',
    project: 'Northstar',
    note: 'Dose–response: how measured lift moves with discount depth.',
  },
  {
    file: 'northstar-4-stockout-risk',
    title: 'Stockout Risk',
    project: 'Northstar',
    note: 'Service levels and reorder policy — where promotion days lose the sale entirely.',
  },
  {
    file: 'northstar-5-whatif-simulator',
    title: 'What-If Simulator',
    project: 'Northstar',
    note: 'A slider over the plan, recomputing profit on the same accounting the optimiser used.',
  },
  {
    file: 'radar-1-overview',
    title: 'Watchlist Overview',
    project: 'Compliance Radar',
    note: '10,000 companies down to the 20 that are high risk — 0.2%.',
  },
  {
    file: 'radar-2-director-network-risk',
    title: 'Director Network Risk',
    project: 'Compliance Radar',
    note: 'Directors pseudonymised under UK GDPR, with the calibration note that took the flag from 60 directors to 4.',
  },
]

// Verbatim from powerbi/measures.dax. The `// expects` comments are the author's,
// not annotations added here — do not tidy them away; they are the evidence that
// the semantic model is checked against known values.
const DAX = `Naive Promo Lift % =
CALCULATE (
    MAX ( causal_estimates[effect_pct] ),
    causal_estimates[method] = "promoted rows vs all others"
)
// expects 126.7368 (percent)

Causal Promo Lift % =
CALCULATE (
    MAX ( causal_estimates[effect_pct] ),
    causal_estimates[method] = "DiD: uncannibalised + seasonal effects"
)
// expects 96.4411 (percent)

True Promo Lift % =
MAX ( causal_estimates[true_effect_pct] )
// expects 81.0255 (percent) — available only because the data is simulated

Causal Bias pp =
[Causal Promo Lift %] - [True Promo Lift %]
// expects 15.4156 (percentage points)

Estimate Health =
SWITCH (
    TRUE (),
    ABS ( [Causal Bias pp] ) <= 10, "Within 10pp of truth",
    ABS ( [Causal Bias pp] ) <= 20, "Within 20pp — upper bound",
    "Large residual bias"
)`

function Lightbox({ page, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (page && !d.open) d.showModal()
    if (!page && d.open) d.close()
  }, [page])

  // <dialog> fires `close` for Escape as well as for close() — one handler covers both.
  return (
    // `m-auto` is load-bearing: a modal <dialog> is centred by the UA's
    // `margin: auto`, and Tailwind's preflight resets margins to 0, which pins it
    // to the top-left. That also breaks backdrop-to-close, because there is no
    // backdrop left above or beside the dialog to click.
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // Backdrop clicks land on the dialog itself; anything inside stops here.
        if (e.target === ref.current) ref.current.close()
      }}
      className="m-auto max-h-[92vh] w-[min(96vw,1500px)] max-w-none rounded-xl border border-line/70 bg-ink-900 p-0 text-chalk backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
    >
      {page && (
        <figure className="m-0 flex flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line/60 px-4 py-3 md:px-5">
            <figcaption className="min-w-0">
              <span className="block text-[0.95rem] font-medium text-chalk">{page.title}</span>
              <span className="mt-0.5 block font-mono text-[0.6rem] tracking-[0.16em] text-slate uppercase">
                {page.project} · Power BI
              </span>
            </figcaption>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="shrink-0 rounded-full border border-line px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-slate uppercase transition-colors hover:border-teal-600/70 hover:text-teal-400"
            >
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>
          <img
            src={asset(`${page.file}-full`)}
            alt={`${page.title} — ${page.note}`}
            className="max-h-[78vh] w-full bg-white object-contain"
          />
        </figure>
      )}
    </dialog>
  )
}

function Thumb({ page, index, onOpen }) {
  const reduced = useReducedMotion()
  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.04 * index }}
      className="m-0 flex flex-col"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${page.title} full size`}
        className="group block overflow-hidden rounded-lg border border-line/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-teal-600/60 hover:shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
      >
        <img
          src={asset(page.file)}
          alt={`${page.title} — ${page.note}`}
          width="760"
          height="441"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>
      <figcaption className="mt-3">
        <span className="block text-[0.92rem] font-medium text-chalk">{page.title}</span>
        <span className="mt-1 block font-mono text-[0.58rem] tracking-[0.16em] text-slate uppercase">
          {page.project}
        </span>
        <span className="mt-2 block text-[0.82rem] leading-relaxed text-slate">{page.note}</span>
      </figcaption>
    </motion.figure>
  )
}

export default function PowerBIProof() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(null)
  const lastTrigger = useRef(null)

  const openPage = (page, e) => {
    lastTrigger.current = e.currentTarget
    setOpen(page)
  }
  // Most browsers restore focus on dialog close, but not all do it reliably when
  // the dialog unmounts its contents — put it back explicitly.
  const close = () => {
    setOpen(null)
    lastTrigger.current?.focus()
  }

  return (
    <div className="rounded-2xl border border-line/70 bg-ink-900/50 p-6 md:p-10">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow mb-4 text-[0.62rem]">
            <span className="text-teal-400" aria-hidden="true">●</span> Report pages · shipped
          </p>
          <h3 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-tight font-bold tracking-tight text-chalk">
            The Power BI layer
          </h3>
        </div>
        <p className="text-[0.95rem] leading-relaxed text-slate">
          Seven pages from two semantic models — five Northstar decision pages over 45 DAX measures,
          and the Compliance Radar drill-through watchlist. Every one is{' '}
          <strong className="font-medium text-chalk">committed to its public repo</strong>, alongside
          the <code className="font-mono text-[0.88em] text-teal-400">.pbip</code> project and TMDL
          definition, so the model behind each page can be opened and checked.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <span className="rounded-full border border-teal-600/50 px-2.5 py-0.5 font-mono text-[0.56rem] tracking-[0.18em] text-teal-400 uppercase">
          Real run · committed
        </span>
        <span className="font-mono text-[0.6rem] leading-relaxed tracking-[0.12em] text-slate uppercase">
          Northstar pages measure the synthetic estate — see the note under its console
        </span>
      </div>

      <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((p, i) => (
          <Thumb key={p.file} page={p} index={i} onOpen={(e) => openPage(p, e)} />
        ))}
      </div>

      {/* The DAX behind the three numbers the whole site turns on. */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-12"
      >
        <p className="eyebrow mb-3 text-[0.62rem]">The measures behind those three numbers</p>
        <p className="mb-5 max-w-[68ch] text-[0.9rem] leading-relaxed text-slate">
          Five measures from{' '}
          <span className="font-mono text-[0.88em] text-chalk">powerbi/measures.dax</span>, verbatim.
          The <span className="font-mono text-[0.88em] text-chalk">// expects</span> comments are in
          the source — the model is checked against known values. Note the last one:{' '}
          <strong className="font-medium text-chalk">
            the semantic model labels its own estimate an upper bound
          </strong>{' '}
          rather than leaving a reader to assume it is exact.
        </p>
        <div className="overflow-x-auto rounded-lg border border-line/60 bg-ink-950/70">
          <pre className="min-w-max p-4 font-mono text-[0.72rem] leading-relaxed text-slate md:p-5">
            <code>{DAX}</code>
          </pre>
        </div>
      </motion.div>

      <Lightbox page={open} onClose={close} />
    </div>
  )
}
