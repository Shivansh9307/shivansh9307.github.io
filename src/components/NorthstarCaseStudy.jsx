// Method write-up for the Northstar flagship, in a native <details> so it stays
// single-page, works without JS, and is keyboard-operable for free.
//
// SOURCE: every figure below is from the northstar-causal-demand-analytics repo
// README, which is the sanctioned second source alongside the CV (see the content
// rules in CLAUDE.md). Two control-selection error figures in that README are
// stated ambiguously (it is unclear whether they are estimates or error
// magnitudes), so the control comparison here is described qualitatively rather
// than quoting numbers that might be wrong. Do not "restore" them without
// checking the repo.
//
// The parallel-trends failure is the point of this section, not a footnote. It is
// the one thing on the site that a sceptical interviewer cannot argue him into —
// he already argued himself into it. Keep it prominent.

function Step({ n, title, children }) {
  return (
    <li className="grid gap-2 md:grid-cols-[2.5rem_1fr] md:gap-5">
      <span className="font-mono text-[0.72rem] leading-6 tracking-[0.14em] text-teal-400 uppercase">
        {n}
      </span>
      <div>
        <h4 className="mb-1.5 text-[0.98rem] font-medium text-chalk">{title}</h4>
        <div className="flex flex-col gap-3 text-[0.9rem] leading-relaxed text-slate">{children}</div>
      </div>
    </li>
  )
}

export default function NorthstarCaseStudy() {
  return (
    <details className="group mt-6 rounded-xl border border-line/70 bg-ink-950/60">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-mono text-[0.66rem] tracking-[0.16em] text-slate uppercase transition-colors hover:text-teal-400 md:px-6">
        <span>Read the method — and where it breaks</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-[0.85rem] transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>

      <div className="border-t border-line/60 px-5 py-7 md:px-6 md:py-8">
        <ol className="flex flex-col gap-7">
          <Step n="01" title="The decision, not the metric">
            <p>
              A grocery chain has a fixed promotional budget and a list of candidate promotions.
              The only question that matters is which ones to fund. Every estimate below is scored
              on that decision, not on how good it looks as a number.
            </p>
          </Step>

          <Step n="02" title="Why the obvious comparison is wrong">
            <p>
              Promoted SKU-days sell <strong className="font-medium text-chalk">127% more</strong>{' '}
              than baseline. That is a real number and a useless one: promotions are not randomly
              assigned, and the lift is contaminated from two directions.
            </p>
            <p>
              <strong className="font-medium text-chalk">Cannibalisation</strong> — a category
              neighbour on promotion pulls demand down 6.1%; four or more neighbours pull it down
              16.4%. And <strong className="font-medium text-chalk">stockouts</strong> — the stockout
              rate on promotion days is 2.95% against 0.034% off-promotion, so 94% of all lost sales
              land on exactly the days being measured. The naive estimate counts borrowed demand as
              new and misses the demand that was never served.
            </p>
          </Step>

          <Step n="03" title="Choosing a control group">
            <p>
              Two candidate control sets were built and scored. The intuitive one —{' '}
              <strong className="font-medium text-chalk">never-treated SKUs</strong>, promoted zero
              times across the period — performed worse, and the reason is the same cannibalisation
              above: a never-promoted SKU still sits in a category where other things are being
              promoted, so it is absorbing spillover rather than sitting still.
            </p>
            <p>
              The estimate uses{' '}
              <strong className="font-medium text-chalk">uncannibalised category-days</strong>{' '}
              instead — controls drawn from outside the affected categories entirely. Two-way fixed
              effects over negative-binomial counts.
            </p>
          </Step>

          <Step n="04" title="The check that failed">
            <div className="rounded-lg border border-amber-600/50 bg-ink-900/60 p-4 md:p-5">
              <p className="eyebrow mb-2.5 text-[0.6rem] text-amber-400">
                Parallel trends does not hold
              </p>
              <p className="text-[0.9rem] leading-relaxed text-slate">
                Difference-in-differences rests on one assumption: absent the promotion, treated and
                control groups would have moved in parallel. Testing it,{' '}
                <strong className="font-medium text-chalk">
                  11 of 13 pre-treatment leads come back statistically significant
                </strong>
                . The assumption fails, and it fails cleanly enough that there is no reading of the
                output that rescues it.
              </p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-slate">
                So <strong className="font-medium text-chalk">+96.4% is reported as an upper
                bound, not a point estimate</strong> — and the 15.4pp that still separates it from
                the recorded truth of +81.0% is attributed to that violation rather than explained
                away. The correction removes 64% of the naive bias. It does not remove all of it,
                and the write-up says so.
              </p>
            </div>
            <p>
              This is the part worth interrogating in an interview, and it is on the page precisely
              because it is the part most portfolios delete.
            </p>
          </Step>

          <Step n="05" title="What actually changed in the plan">
            <p>
              51% of promotions look profitable on their own P&amp;L. Charged for the demand they
              cannibalise from their neighbours, <strong className="font-medium text-chalk">27 of
              18,000 survive</strong> — 0.15%.
            </p>
            <p>
              Ranked on the naive number, the budget funds{' '}
              <strong className="font-medium text-chalk">19 promotions, and all 19 lose money</strong>.
              Ranked on the corrected one it funds 10, and captures{' '}
              <strong className="font-medium text-chalk">96.8% of the profit a perfect-knowledge
              planner would have made</strong> on the same budget. The estimate is still biased; the
              decision it drives is right.
            </p>
          </Step>

          <Step n="06" title="Does it hold outside the sandbox?">
            <p>
              The estate is synthetic by design — 20 stores, 150 SKUs, two years of daily trading,
              2.19M rows, with bias and censoring encoded and the true effect recorded so every
              estimate can be scored against a known answer. That is the only way to know an
              estimator is wrong rather than merely different.
            </p>
            <p>
              The method was then re-run on real{' '}
              <strong className="font-medium text-chalk">Rossmann store data</strong>, where
              parallel trends failed again (7 of 11 leads significant) at a promotion density of 45%
              against Northstar&rsquo;s 8.5% — and where the forecasting layer took WAPE from 0.313
              to 0.089 against baseline. The failure mode replicates; so does the fix.
            </p>
          </Step>
        </ol>

        <p className="mt-8 border-t border-line/60 pt-5 font-mono text-[0.6rem] leading-relaxed tracking-[0.14em] text-slate/80 uppercase">
          Every figure above is committed to the northstar-causal-demand-analytics repo · 220 tests ·
          five Power BI decision pages over 45 DAX measures
        </p>
      </div>
    </details>
  )
}
