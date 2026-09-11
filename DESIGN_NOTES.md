# DESIGN_NOTES — Shivansh Chauhan portfolio

Working log for the PLAN → BUILD → SCREENSHOT → CRITIQUE → REFINE loop.
Audience: UK hiring managers screening for governance/risk/audit-adjacent and applied-AI data roles.
The one job: *"this person builds trustworthy, governed data systems and is hands-on with modern AI tooling responsibly — interview him."*

---

## Token system (v1 — Cycle 1)

### Palette — "Audit-grade dark" (data + precision + craft)

Dark-first: reads as a well-lit analytics console, not a template. Harmonises with the
portrait (navy suit, warm bokeh). Chart-mark accents were **validated with the dataviz
palette validator** (OKLCH lightness band, chroma floor, CVD ΔE, WCAG contrast) against
the ink surface — all four PASS.

| Token | Hex | Name | Role |
|---|---|---|---|
| `--ink-950` | `#060A12` | Ink | page base |
| `--ink-900` | `#0B1120` | Ledger | panels/cards |
| `--ink-800` | `#141C30` | Graphite | raised panels, pills |
| `--line` | `#22304A` | Gridline | hairlines, borders (used at 40–100% alpha) |
| `--chalk` | `#EDF2F7` | Chalk | primary text |
| `--slate` | `#93A1B7` | Slate | secondary text |
| `--teal-400` | `#4FD6C2` | Signal Teal (display) | large display accents, links, glows (text-level only) |
| `--teal-600` | `#0FA08D` | Signal Teal (mark) | chart marks, canvas lines — validated |
| `--amber-400` | `#F2B457` | Annotation Amber (display) | eyebrow highlights, markers (text-level only) |
| `--amber-600` | `#C08427` | Annotation Amber (mark) | chart marks — validated |
| `--blue-500` | `#6B8AEE` | Plot Blue | chart mark #3 — validated |
| `--rose-500` | `#E0506B` | Risk Rose | risk states in Radar demo — validated |

Rule: *display* tints (`-400`) are for text-scale accents on ink only; *mark* shades
(`-600`) are the only colours allowed on data marks. Status colours (Risk Rose) reserved
for risk semantics, never decoration.

### Type

- **Display:** Space Grotesk 500/700 — precise, slightly technical grotesque. Oversized hero via `clamp(3rem, 9vw, 7.5rem)`.
- **Serif accent:** Fraunces italic (opsz auto) — the "human hand" inside the machine; used for rotating hero word + select editorial emphasis (Monks-style mixed headline).
- **Mono:** IBM Plex Mono 400/500 — eyebrows, data labels, stats, nav. The "chart annotation" voice.
- Body: Space Grotesk 400 at 1.05rem/1.7, Slate.

### Spacing & layout

- Container `max-w-[1200px]`, gutter `clamp(1.25rem, 5vw, 4rem)`.
- Section rhythm: `py-28` desktop / `py-20` mobile; every section opens with a mono eyebrow + rule line.
- Radius: cards 1rem, pills full. Borders: 1px `--line`, hover → teal at 40%.

### Signature element — "chart annotation" motif

The whole page reads like a governed analytics artefact: mono eyebrow labels with
plotted-point markers (`◆ 01 — ABOUT`), thin rule lines, axis-tick dividers, and an
ambient canvas of flowing chart-lines + grid dots behind the hero. One motif, reused
everywhere — this is the anti-template move.

### Motion principles

- Reveal = mask/clip + translate, 0.6–0.9s, custom ease `[0.22, 1, 0.36, 1]`.
- Hero: word-by-word stagger (80ms); rotating word every 1.15s after a 1.6s first-word hold, 0.35s clip swap (was 2.6s / 0.55s — see revision 5).
- Everything gated by `useReducedMotion`; canvas pauses on `prefers-reduced-motion` and `document.hidden`.
- Micro-interactions ≤ 200ms; hover lift 4px max. No parallax soup.

---

## Cycle 1 — PLAN

Scope: scaffold, tokens, Nav (sticky pill), Hero (staggered mixed-type headline,
rotating word, pulse badge, annotated portrait, hand-drawn scroll cue), AmbientCanvas
(flowing chart-lines + dot grid), section placeholders, screenshot tooling.

Assets: portrait resized/compressed → `src/assets/portrait.jpg`; CV → `public/Shivansh_Chauhan_CV.pdf`.

## Cycle 1 — CRITIQUE (screenshots @1440 + @375)

Five flaws found:
1. **Mobile nav overflowed** — HOME/CONTACT clipped at 375px. → Fixed: responsive type/padding (0.58rem mono, tighter tracking below `md`); all six items now fit.
2. **Ambient canvas invisible** — page read as flat black; signature effect lost. → Fixed: raised line alphas (0.5/0.34/0.28), primary line 2px, brighter dots, vignette relaxed (0.82→0.05 edge).
3. **Accidental headline wrap** — "you can / defend." broke ugly. → Fixed: `whitespace-nowrap` group + clamp max 5.6→5.1rem.
4. **Scroll cue read as a scribble**, not a gesture. → Redrawn larger (44×64) with a real loop; still the weakest element — revisit in a later cycle.
5. **Portrait floated** — dead space, widowed coordinate caption. → Fixed: 480px crop, bottom corner ticks, single-line caption.

**Chanel rule removal:** the `52.4862° N` coordinate label — cryptic decoration that explained nothing.

Carry-forwards: scroll cue quality; no portrait presence on mobile (revisit when page has full content); canvas could earn more character behind the type side.

---

## Cycle 2 — BUILD: StatsBar + About + Skills · CRITIQUE

Five flaws found:
1. **Section h2s never appeared** — root cause: IntersectionObserver clips targets by `overflow:hidden` ancestors, so a span translated 110% inside its mask never intersects → `whileInView` never fires. → Fixed: observer moved to the `motion.h2` mask, child animated via variant propagation. **Rule for all future mask reveals: observe the mask, animate the child.**
2. **Full-page screenshots captured pre-reveal state** (opacity-0 sections, counters at 0) — harness now walks the page to fire observers before capturing.
3. **Journey arrow was typed dashes** (`─────▶`) — read as placeholder text. → Replaced with a self-drawing SVG line (pathLength) + fading arrowhead.
4. **About dead space** — left editorial column much taller than facts column leaves an asymmetric hole; acceptable at this stage, revisit in polish cycle.
5. **Stats labels a touch washed** at 0.8rem slate — legible but low presence; revisit with polish cycle contrast pass.

**Chanel rule removal:** none added this cycle; decoration count held flat (dash-arrow replaced, not augmented).

Carry-forwards: About rhythm, stats label presence, scroll-cue quality.

---

## Cycle 3 — BUILD: Projects + Radar console (the centrepiece) · CRITIQUE

The console works: scripted loop (bronze→silver→gold pulses → Claude extraction →
network-risk 0.82 flips rose → amber CHECKPOINT with functioning Approve/Reject →
audit-commit line → restart). Honestly labelled `SIMULATED WALKTHROUGH`; demo figures
(1,204 filings, 0.82 score, conf 0.97) are illustrative mock-UI data, marked as such
in the UI itself. All data-mark colours from the validated quartet; labels wear text
tokens per the dataviz rules.

Five flaws found:
1. **Risk score read `0.00` pre-computation** — looked like a broken metric. → Now `—.——` at 60% slate until the risk step fires.
2. **Mobile console header wrapped badly** ("RADAR CONSOLE" over two lines beside the pill). → Pill collapses to `SIMULATED` below `sm`; label no-wrap.
3. **◆ marker crept onto every card eyebrow** — motif fatigue. → *Chanel rule removal:* ◆ now reserved for section openers only.
4. **Supporting card tag rows land at differing heights** — `mt-auto` pins them; accepted (equal-height cards would demand padded voids).
5. **About dead space persists** — still deferred to the polish cycle, now on a named list.

---

## Cycle 4 — BUILD: Experience timeline + Contact + Footer + cursor accent · CRITIQUE

Timeline uses the annotation motif (rotated-square nodes on a hairline rail, mono date
column, tick-dash bullet markers); all bullets CV-verbatim in substance. Contact wires the
real mailto/LinkedIn/GitHub/CV. Cursor is an accent ring (native cursor kept — replacing
it entirely is a usability tax).

Five flaws found:
1. **Email CTA renders SHOUTY** — `uppercase` mono turns the address into a wall; emails read as lowercase. → Fix in cycle 5: MagneticButton accepts a class override.
2. **Scroll cue still reads as a "6"** — third strike; redesign properly in cycle 5.
3. **Section paddings inconsistent in feel** — py-32 everywhere makes sparse sections (About) feel emptier than dense ones; unify tighter in cycle 5.
4. **Stats numbers could carry more scale** at 1440 — the band reads slightly meek between the cinematic hero and editorial About.
5. **Demo feed duplicates lines across loop restarts in long screenshots** — cosmetic, only visible in stitched captures; keys are cycle-scoped so no React issues. Accepted.

---

## Cycle 5 — POLISH · CRITIQUE

Applied:
1. Email CTA now true lowercase (deterministic `caps={false}` prop — the earlier `normal-case` override depended on Tailwind utility order and couldn't be trusted).
2. Scroll cue redrawn third time: single confident S-curve arrow — finally reads as a hand gesture, not a "6".
3. Section rhythm unified `md:py-32 → md:py-28`; sparse sections no longer feel hollow.
4. Stats numbers raised to 3.4rem at desktop — the band now holds its own between hero and About.
5. **Chanel rule removal:** the amber third chart-line in the ambient canvas — colour noise without meaning. Two series (teal/blue) remain.

Remaining nits, judged acceptable: fixed nav floats over content while scrolling
(translucent + blur, standard pattern); supporting-card tag rows sit at differing
heights (honest content beats padded voids).

**Cycle 5 verdict: no major flaws remaining** → proceed to final accessibility /
reduced-motion / mobile / production pass.

---

## Final pass — accessibility · reduced motion · mobile · production

- **Keyboard**: tab order verified with Playwright — skip-link → nav (6) → hero CTAs →
  scroll cue → demo controls → contact links; all 14 stops report a visible
  `:focus-visible` outline (2px teal, offset 3).
- **Reduced motion**: full-page capture under `prefers-reduced-motion: reduce` shows the
  complete static page — canvas renders one still frame, counters land on final values,
  the Radar console renders its full end-state snapshot. Nothing is missing, nothing moves.
- **Mobile 375px**: full-page audit clean — nav fits, headline holds three lines, console
  stacks, timeline and contact readable. Portrait remains desktop-only by design.
- **Production**: `vite build` clean — 95.8 kB gzip JS, 6.8 kB gzip CSS, 189 kB portrait
  JPEG; fonts load `display=swap`; canvas pauses when the tab is hidden. Preview serves the
  correct title and the CV PDF answers 200.
- **Deploy**: `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on push
  to `main`.

### TODO: verify (illustrative / assumed values)

- Radar console figures — `1,204 filings`, risk `0.82`, threshold `0.75`, `14 fields`,
  `conf 0.97`, company number `07098213` — are **mock UI data**, labelled `SIMULATED` in
  the interface. Swap for real platform output if desired.
- "PL-300 expected 2026" and "open to hybrid / remote UK" — confirm current status.
- Everything else (45% / 50% / 30% / 12 platforms / dates / titles) is CV-verbatim.

### What makes this design distinctive

1. **One metaphor, carried all the way down**: the page reads as a governed analytics
   artefact — mono annotation eyebrows with plotted markers, hairline rules, axis-tick
   bullets, a portrait framed like a plotted figure ("Fig. 01"), and an ambient canvas of
   drifting chart-lines. No stock decoration; every ornament is a chart element.
2. **The centrepiece argues the candidate's thesis**: the Radar console doesn't just say
   "human-in-the-loop" — it stops and makes *you* approve the write. A hiring manager
   screening for governance instinctively gets it.
3. **Honesty as an aesthetic**: validated CVD-safe mark palette, CV-backed numbers only,
   and a visible `SIMULATED` tag on the demo — the site practises the governance it sells.
4. **Type with a hand in it**: precise Space Grotesk + mono carry the machine voice;
   Fraunces italic interrupts it exactly where a human judgement appears (rotating hero
   word, "a dashboard is only as good as the governance underneath it").

---

## Post-launch revision 1 (user feedback, 2026-07-13)

- Hero portrait now shows on mobile too (240px wide, 340px crop, stacked below the
  CTAs) — resolves the cycle-1 carry-forward, by user request.
- Portrait caption simplified to `◆ Shivansh Chauhan` — "Fig. 01" annotation and
  location dropped at the owner's preference; caption centres under the portrait on
  mobile, left-aligns on desktop.

---

## Post-launch revision 2 — CV sync + Atlas (2026-07-31)

Synced the site to the 2026-07-31 CV and to live GitHub project data.

**Two factual corrections.** Koru Green was labelled *"Green energy"* in the Experience
eyebrow and *"a green-energy startup"* in the About prose — inferred from the company
name. It is **music & media analytics** (royalty data); both are fixed. HCLTech's client
is named in full: Emirates Global Aluminium (EGA), Dubai.

**Experience restructured** to mirror the CV, which now folds portfolio work into a dated
`Data & BI Analyst — Independent Projects (Jan 2025 – Present)` entry rather than a
separate projects section. That entry carries the CV's disclosure verbatim in substance —
*"unpaid portfolio work, no client engagement, all code public on GitHub"* — rendered in
an amber-ruled `note` field. **Keep it.** An unlabelled portfolio entry sitting in a work
timeline reads as a client engagement, and the whole site argues for provenance; the
disclosure is the design, not a caveat on it. Added MSc Merit, the Amity BCom, and the
HCLTech figures the site never carried (10,000+ tickets/yr, ~20 hrs/month automated out,
SLA compliance mid-90s%).

**Projects: two co-flagships.** Atlas Analytics joins Compliance Radar at equal
hierarchy, **stacked, not side by side** — both demos are wide consoles and neither
survives half-width. `Flagship` is now a component rendered from a `FLAGSHIPS` array with
per-project blurbs in `BLURBS`. Supporting cards dropped from four to three, which also
fixes a standing layout bug (four cards in a `md:grid-cols-3` grid left an orphan on row
two). Removed: *Companies House ingestion engine* (not a separate project — it lives in
the `compliance-radar` repo and duplicated the flagship copy) and *TF-IDF sentiment
analysis* (no public repo, absent from the CV). Added *Food & Beverage sales analysis*.
Every project with a public repo now carries a `VIEW REPO ↗` link.

**New `AtlasReceipt` component** — the counterpart to `RadarDemo`, with a crucial
labelling asymmetry:

> `RadarDemo` is tagged **`SIMULATED`** in amber because its figures are illustrative mock
> UI data. `AtlasReceipt` is tagged **`REAL RUN · COMMITTED`** in teal because every figure
> is genuine output committed to `examples/churn-run` and `examples/blocked-run`. **Do not
> relabel either one, in either direction.** The site's entire argument is that it
> practises the provenance it sells; mislabelling real output as simulated is as damaging
> as the reverse.

Two flaws found and fixed during the cycle:

1. **The blocked run misstated its own failure.** First pass marked the held-out AUC row
   `in tol. = NO`. Wrong: analyst and red team both derived `0.4954` — they *agreed*. The
   run failed on **discrimination, not arithmetic**, which is the entire point of the
   example. All three tolerance checks now read YES, and the AUC sits in a separate rose
   `kicker` line above the veto. A table that can only express "someone disagreed" cannot
   express "everyone agreed and the answer was still worthless".
2. **Mobile hid the red-team column.** The checks were a `<table>` in an `overflow-x-auto`
   container; at 375px only ~239px is available inside the nested padding, so the
   analyst-vs-red-team comparison — the whole argument — scrolled off-screen. Now a `<ul>`
   that stacks with inline labels below `sm` and becomes an aligned grid above it. **Rule:
   content that carries the argument never goes behind a horizontal scroll.**

**StatsBar** re-cut to employed/academic evidence, since Projects now covers the portfolio
work twice over: 10K+ tickets/yr (EGA), 20 hrs/month automated out, 0.64 precision-recall
AUC (from 0.14), #1 regional rank. The old **"357% AUC lift"** was dropped — arithmetically
true (0.14 → 0.64) but it inflates a 0.5 absolute move, and stating the raw before/after is
more credible to the analyst audience this site targets. `useCountUp` gained an optional
`decimals` argument to render 0.64; default `0` preserves every existing call site.

**Chanel rule removal:** two project cards (ingestion engine, TF-IDF) — content that
existed to fill a grid rather than to make a point.

## Post-launch revision 3 — portrait swap (2026-08-19)

New hero headshot supplied by the user, replacing the office/glasses portrait. The source
was a 1254×1254 **square** studio shot (1.8 MB, and a PNG despite its `.jpg` name), while
the hero frame is a ~2:3 window (`max-w-[240px]`/`h-[340px]` mobile, `max-w-[320px]`/
`h-[480px]` desktop). Dropped in as-is, `object-cover` would have thrown away a third of the
width at load time and `object-top` would have become a no-op.

Instead the crop was taken at source: a centred 836×1254 2:3 slice, resampled to 800×1200
(2× the desktop display box) and re-encoded as real JPEG at q80 → **143 KB**, slightly under
the 188 KB it replaces. Headroom and face size land close to the previous framing, so the
corner ticks, scrim and `◆ Shivansh Chauhan` figcaption needed no adjustment; only the `width`
attribute changed (675 → 800), which exists to reserve layout space against decode-time shift.

## Post-launch revision 4 — CV re-sync + Northstar flagship (2026-09-05)

A new CV landed, and it repositions rather than refreshes. The headline moved from
`Power BI · SQL · Python · Dimensional Modelling` to `… | Causal Inference & Validation`,
and the profile now leads with analytics systems that *catch an expensive mistake before it
reaches a decision*. Hero prose, About's second paragraph and the meta description follow
that framing; the page `<title>` deliberately does **not** — it keeps "Power BI Developer &
Data Analyst" because that is what recruiters search for, and the title is the only string
doing SEO work here.

**Two load-bearing figures were retired.** `10,000+ tickets a year` (hero, About, StatsBar,
a project card) and `~20 hrs/month automated out` (StatsBar, project card) are both gone from
the CV. Under the content rule they had to go from the site the same day — a figure that no
longer traces anywhere is exactly the failure the site argues against. HCLTech's entry now
carries what the CV does carry: −15% repeat breaches QoQ, +8 points compliance, −18% repeat
incidents, 90%+ corrective-action closure, −30% manual reporting effort, and the mid-contract
BMC Remedy → ServiceNow migration.

**StatsBar was rebuilt** around what the work catches rather than how much of it there was:
`4` directors left after a definitional fix (down from 60), `19` loss-making promotions the
naive lift measure would have backed, `30%` of manual reporting effort cut, `0.64` PR-AUC
(4.6× up from 0.14). The last still needs `decimals: 2` — see revision 2.

### Northstar: a third flagship, and a third provenance label

Northstar leads the CV's Projects section, so it leads the site's: **Northstar → Radar →
Atlas**, all three stacked full-width. `NorthstarDemo.jsx` is a scripted walkthrough built on
RadarDemo's state-machine shape (STEPS array, `useInView` start, reduced-motion snapshot),
but the visual is an **estimate axis** — three marks on one scale, because the distance
between them *is* the argument — over a promotion grid that flips 19 loss-making marks to 10
profitable ones. Like the Radar checkpoint, it pauses and makes the visitor choose which
estimate funds the plan, auto-resolving to causal after 6s.

**The badge is new: teal `REAL RUN · SYNTHETIC ESTATE`.** Neither existing label was honest
here. Amber `SIMULATED` (Radar) would understate it — these are real committed figures, not
mock UI data. Plain `REAL RUN · COMMITTED` (Atlas) would overstate it — the 2.19M-row estate
is synthetic *by design*, generated with the true promotional effect recorded so every
estimate can be scored against a known answer. The third label says exactly that, and the
note under the console explains why the synthetic data is a feature. The site now carries
three provenance states; do not collapse them into two.

**Three numbers that must stay distinct.** `+126.7%` naive, `+96.4%` DiD-corrected, `+81.0%`
recorded truth.

> **Resolved 2026-09-11.** The CV was rewritten and now states all three explicitly; the
> paragraph below describes the *old* bullet and is kept as the record of why the rule
> exists. See "CV swap" at the end of revision 5.

The CV bullet compresses this to "+126.7% against a true +81.0% … removing
64% of the bias", which reads as though +81.0% were the corrected estimate. It is not; it is
the answer both estimates are scored against. Every surface that quotes one of these must
quote the axis, not the compression.

**Axis coordinate bug, caught in the 375px screenshot pass.** The axis rule was inset
(`inset-x-5`) while the marks and ticks were positioned as percentages of the full padded
box, so the scale and its rule disagreed — invisible at 1440px, obvious at 375px. Fixed by
wrapping every positioned child in an inner `absolute inset-x-5 inset-y-0` plot area so the
rule, the ticks and all three marks share one coordinate system. Any future mark added to
this axis goes inside that inner box.

### Skills

Restructured onto the CV's categories (BI & Visualisation / Data & Engineering / Analysis &
Modelling / Domain & Governance) plus an **AI & Automation** group the CV folds into Data &
Engineering — the site has room and the agent/LLM work is a selling point. New from the CV:
DuckDB, TMDL/PBIP, causal inference (DiD, IPW), regression, forecasting, optimisation &
simulation, CI/CD, agent orchestration, LLM cost governance, UK GDPR pseudonymisation.
Previously listed items not on the new CV (MS SQL Server, MySQL, Snowflake, Fabric, Power
Apps, Zapier, n8n, RLS, incremental refresh, deployment pipelines) were kept by the owner's
decision — they are user-supplied, not invented.

### TODO: verify (illustrative / assumed values) — revision 4 update

- Radar console figures remain **mock UI data** labelled `SIMULATED`; the CV's real Radar
  numbers now live in the Projects blurb and the timeline instead. Left deliberately: the
  console demonstrates the *mechanism*, and relabelling it would break the three-state
  provenance argument above.
- The old note's "45% / 50% / 30% / 12 platforms" line is stale — those figures are no
  longer anywhere on the site. Current numbers all trace to the 2026 CV or to a repo README
  (`northstar-causal-demand-analytics`, `compliance-radar`, `atlas-analytics`).
- "PL-300 expected 2026" is not on the site or the new CV. "open to hybrid / remote UK"
  still shows in About — confirm it still holds.

---

## Post-launch revision 5 — hiring-manager review (2026-09-10)

The site was read the way a hiring manager reads it: CV first, then the portfolio,
looking for mismatches. It scored well on craft and badly on two things — the
evidence was weighted toward unpaid work, and the page never showed the artefact
the roles are actually hiring for. This revision fixes what could be fixed in code;
the rest is listed under TODO below because it needs assets only the owner has.

### Role and title, settled

The owner confirmed the target role as **Data & BI Analyst**. "Power BI Developer"
is gone from `<title>`, the meta description and the hero badge — the site, the CV
headline and LinkedIn now say one thing. The hero badge also carries the
right-to-work signal ("No UK sponsorship needed"), which was previously buried
fourth in the About `FACTS` list, a third of the way down the page.

About's "three years across enterprise IT, insurance and a music-analytics startup"
became "nearly four" — HDFC Life (1y5m) + HCLTech (2y) + Koru Green (3m) is 3y7m,
and rounding *down* was costing a bracket in recruiter filters that ask for 3–5.

### StatsBar: the mix was the problem, not the numbers

Of four headline stats, exactly one came from paid employment; two were from unpaid
projects and one from a dissertation. A page arguing for employability was leading
with work nobody paid for. The band now runs **two paid, one project, one academic**:
+8 points SLA compliance (HCLTech), 7.5% understatement risk removed (Koru Green),
60 → 4 directors (Radar), 0.64 PR-AUC (dissertation).

`19` came off. It was the one stat whose caption had to be read before the number
parsed — a large teal figure that means something *bad*. It still carries the
Northstar blurb, where it has context.

The `from` field on a `STATS` entry renders a dimmed "60 →" annotation before the
counted value. The fall is the finding; a bare `4` is not.

### ClientWork — a new band, and why it is not badged

`ClientWork.jsx` promotes the two paid engagements (EGA/HCLTech, Koru Green) out of
the supporting-card grid into their own band between the flagships and the leftovers.
Three unpaid flagship consoles were out-weighting two years of real client delivery.
Projects now reads in three labelled bands: **Independent projects** → **Client
delivery · paid engagements** → **Also built · public repos**.

**It deliberately carries no provenance badge.** SIMULATED / REAL RUN · COMMITTED /
REAL RUN · SYNTHETIC ESTATE label the flagships' *demo data*. There is no demo data
in ClientWork — it is prose plus a chart of CV figures — and a fourth badge would
blur a three-way distinction the site works hard to keep sharp.

**One honest-charting note.** The EGA card draws 15% / 18% / 30% on one shared 0–30
scale because all three are the same unit. The +8-point SLA compliance lift is a
different unit and is called out as a figure rather than drawn on that axis — and
the CV gives no baseline, so a before/after bar would have been invented precision.

### Northstar case study — the parallel-trends failure is the point

`NorthstarCaseStudy.jsx`, a native `<details>` under the Northstar demo, sourced
from the `northstar-causal-demand-analytics` README (the sanctioned second source
alongside the CV). Six steps: the decision → why the naive comparison is
contaminated (cannibalisation −6.1%/−16.4%, stockouts 2.95% vs 0.034%) → control
selection → **the check that failed** → what changed in the plan → external validity
on Rossmann.

The centrepiece is that **parallel trends does not hold** — 11 of 13 pre-treatment
leads are significant, so +96.4% is reported as an upper bound, not a point estimate,
and the residual 15.4pp to truth is attributed to the violation rather than explained
away. This is the strongest thing on the site: it is the part most portfolios delete,
and it is the one claim a sceptical interviewer cannot argue him into, because he
argued himself into it first.

Two control-selection error figures in that README are stated ambiguously (unclear
whether they are estimates or error magnitudes), so the control comparison is
described qualitatively. Do not "restore" those numbers without re-reading the repo.

### Accessibility

- **Pause control** (`PlaybackToggle.jsx`) on both looping consoles. WCAG 2.2.2 wants
  a user-operable control for auto-updating content past five seconds; reduced-motion
  is an OS setting, not that control. Not rendered under reduced motion — there is no
  motion to pause. The advance effect re-runs when `paused` flips back, so both demos
  now carry a `lastLogged` ref; without it the current step's log line is appended a
  second time under a key it already used, and `AnimatePresence` sees duplicate keys.
- **Hover-only card detail** was invisible to every touch visitor and every keyboard
  user. Now visible unconditionally below `md`, and `md:group-focus-within:` mirrors
  every `md:group-hover:` above it. The cards take `tabIndex={0}` so the one without a
  repo link is still reachable.
- **Footer contrast**: `text-slate/60` was ~3.4:1 at 10.4px. Now `/80` — measured
  5.16:1 by painting the computed colour into a canvas and reading the pixel back.
  Do *not* measure Tailwind v4 colours by regexing `getComputedStyle().color`; it
  emits `color-mix()`, and a naive parser returns nonsense.
- **Nav tap targets** were ~25px, at the WCAG 2.5.8 floor. `py-1.5` → `py-2.5` gives
  37px. Height only: the pill already spans the full 375px viewport, so raising the
  font size would have overflowed it.
- **Experience rail markers** now encode entry type — solid teal for employment,
  hollow amber for the unpaid independent work, hollow slate for education — with a
  legend above the list. Six entries with identical markers meant a manager counting
  years of employment had to disentangle two degrees and one unpaid entry first.

### Motion

- **ScrollSpine** (D1): fixed left-gutter rail, scroll progress as a filling rule with
  one node per section. `xl:` and up only — below that there is no gutter to live in.
  Nodes are real anchors. Returns `null` under reduced motion rather than rendering
  inert, since it carries nothing the nav doesn't.
  **It repeats the section ids a third time.** `Nav.jsx` LINKS and each section's own
  `id` were already two; adding or renaming a section now means editing three places.
- **Horizon lines** (D3): the section-opener hairline in `SectionHeading` was static
  and now draws left-to-right on entry. One `scaleX` on an element that already existed.
- **ClosingFrame** (D7): a final full-bleed statement — *"Every number on this page
  traces to a source. Ask me about any of them."* — closing the argument the hero opens.
- **D2 (draw-on sparklines in StatsBar) was dropped, deliberately.** A sparkline needs
  a series. Two of the four stats have a real before/after pair (60→4, 0.14→0.64) and
  two have no baseline anywhere in the CV, so three of four marks would have been
  invented shapes. Drawing a decorative line under a number on *this* site is the exact
  failure it argues against. Revisit only if the underlying series turn up.

### Performance and distribution

- **`public/og.png`** (1200×630) plus full Open Graph and Twitter Card tags. The link
  previously pasted into LinkedIn as a bare grey URL, throwing away the site's best
  asset. Generated by `scripts/og.mjs` (`npm run og`) — a standalone Playwright render
  that does **not** need the dev server, unlike `screenshot.mjs`. The card restates the
  three-mark axis; regenerate it if the headline or those figures change.
  The card's palette is a hand-copy of `@theme` — it is not imported. Keep in sync.
- **JSON-LD `Person`**, canonical link, `robots.txt`, `sitemap.xml`, and a themed
  `public/404.html` (static — its palette is a second hand-copy of `@theme`).
- **Fonts** load off the critical path: `preload as=style` plus a `media="print"`
  onload swap, with a `<noscript>` fallback. `display=swap` was already in the URL.
- **Portrait** was 800×1200 for a slot never wider than 320 CSS px. Now 640×960 with
  `fetchPriority="high"` — 143 KB → 98 KB on the LCP element.

### TODO: verify / blocked on assets — revision 5

- ~~No Power BI artefact anywhere on the site.~~ **Done — see "Closing the four open
  items" below.** The premise was wrong: the screenshots were never blocked on the
  owner, they were already committed to the public repos.
- **No certification** on the site or the CV. `DESIGN_NOTES` revision 4 recorded that
  "PL-300 expected 2026" was dropped; if it is in progress, say so.
- **No availability or notice period** in Contact — not added, because inventing it was
  not an option and the owner has not stated it.
- ~~CV bullet M1 still unfixed.~~ **Done 2026-09-11** — see "CV swap" below.
- **WebP for the portrait** not done: `cwebp` is not installed and `sips` on this
  machine has no WebP encoder. The JPG is correctly sized, so this is a small win.
- **Skills wall left at 56 pills by the owner's explicit decision (2026-09-10)**,
  confirming the revision-4 call. ~20 are neither CV- nor repo-backed (Fabric,
  Snowflake, MS SQL Server, MySQL, Power Apps, Zapier, n8n, RLS, Incremental Refresh,
  Deployment Pipelines, …). Noted here as a standing interview exposure, not a defect
  to fix: "tell me about your Fabric work" has no answer on the site or the CV.
- ~~No analytics.~~ **Done — GoatCounter, chosen by the owner 2026-09-11.** Still
  inert until the account exists; see below.


### Closing the four open items (2026-09-11)

Same cycle finishing, not a new one.

**The Power BI gap was never blocked on the owner.** Revision 5 recorded it as needing
"exported PNGs only the owner has". That was wrong, and checking would have cost one
API call: `northstar-causal-demand-analytics` publishes all five decision pages at
`powerbi/screenshots/`, `compliance-radar` publishes two at `powerbi/Screenshots/`, and
`powerbi/measures.dax` is public alongside them. **Check the repos before recording
something as blocked on a person.**

`PowerBIProof.jsx` now sits between the flagships and `ClientWork`, under the band
label `Power BI layer · shipped report pages` — deliberately ahead of the paid-work
band, because for a Data & BI Analyst role it is the artefact being hired for.

- **Seven pages, two tiers each.** A 760px thumbnail (lazy, ~50 KB) and a 1500px
  full-size file fetched only when the lightbox opens. Keep the split: initial load is
  481 KB, the thumbnails add 388 KB below the fold, and the 1029 KB of full-size files
  costs nothing unless someone clicks. Eager-loading them all would have quadrupled the
  page.
- **The Radar pair are Power BI Desktop captures**, so the page-tab bar and device
  toolbar are cropped off. Nothing is recoloured or composited — these are the reports
  as built.
- **Lightbox is a native `<dialog>`**: focus trap, Escape and focus-restore for free.
  `m-auto` on it is **load-bearing** — a modal `<dialog>` is centred by the UA's
  `margin: auto`, Tailwind's preflight resets margins to `0`, and without it the dialog
  pins to the top-left *and* backdrop-to-close silently stops working, because there is
  no backdrop left above or beside it to click. This shipped broken and was caught by
  testing the close paths individually rather than assuming one implied the others.
- **DAX specimen**: five measures verbatim from `measures.dax`, including the author's
  own `// expects 126.7368` comments — the model is checked against known values. The
  fifth, `Estimate Health`, is the reason that set was chosen over anything flashier:
  a `SWITCH` that labels the model's own output *"Within 20pp — upper bound"*. The
  site's entire thesis, asserted in the semantic model rather than in prose.
- **Measure count checked.** `measures.dax` defines ~44 measures (50 top-level `name =`
  lines, six of which are `VAR`s inside other measures). The CV's "45 DAX measures"
  stands — an earlier note flagging it as possibly wrong was based on a summariser's
  loose estimate, not a count. No CV change needed on that point.

**BandLabel regression, caught at 375px.** `shrink-0` on the label stopped it wrapping,
so "Independent projects · built and documented in public" sat 501px wide in a 375px
viewport and put the *whole page* into horizontal scroll — a defect introduced in
revision 5 and missed because that pass never measured `scrollWidth` at 375. It does
now, and the trailing rule is dropped below `sm` where there is no room for it.
`fetchPriority` was also corrected to lowercase `fetchpriority`; React 18 does not
recognise the camelCase prop and was logging a warning on every load.

**D2 (StatsBar sparklines) is settled, not deferred.** Declined a second time, by the
owner, for the same reason: `+8 points` and `7.5%` are *deltas* — they are the change,
so they have no "before", and no baseline exists in the CV or any repo. Three of four
marks would have been invented shapes. `from: '0.14'` was added to the AUC stat so the
two genuine before/after pairs (`60 → 4`, `0.14 → 0.64`) read alike. **Do not propose
this a third time** without the underlying series.

**Analytics: GoatCounter.** One tag before `</body>`, plus a `cv-download` event on
both CV links (optional-chained, so an ad blocker changes nothing). Collects page path,
referrer and a coarse browser/country string — no cookies, no cross-site identifier, no
consent banner. Verified cookie-free with no console errors.

> **It reports nothing until the account exists.** Register `shivansh9307` at
> goatcounter.com/signup, or change the `data-goatcounter` code in `index.html` to
> whichever code is registered. This could not be verified from here and was not
> claimed to work.

### CV swap — M1 closed (2026-09-11)

New CV supplied, adopted over `public/Shivansh_Chauhan_CV.pdf`. Diffing the extracted
text of both PDFs, **the only change is the Northstar bullet**; every other figure is
identical, and both are still two pages, so the added line did not spill the layout.

Removed:

> Proved the standard promotional-lift measure overstates returns by half again
> (+126.7% against a true +81.0%), correcting it with difference-in-differences to
> remove 64% of the bias.

Added, in its place:

> Showed the standard promotional-lift measure overstates returns by half again — a
> naive +126.7% against a recorded truth of +81.0%. Difference-in-differences on
> uncannibalised controls brought it to +96.4%, removing 64% of the bias.
>
> Reported the corrected figure as an upper bound rather than a point estimate:
> pre-treatment testing showed parallel trends did not hold (11 of 13 leads
> significant), and the write-up attributes the residual 15.4pp to that violation.

**No site copy changed, and that is the correct outcome.** The re-sync ritual in
`CLAUDE.md` exists for when CV figures move; none did. The site already carried all
three percentages and already told the parallel-trends story in `NorthstarCaseStudy`,
sourced from the repo README. This time the CV caught up to the site rather than the
other way round — so the re-sync was a diff, a file swap, and a documentation
correction. **Diff first; do not re-sync reflexively.**

Two operational traps worth remembering, both live at the moment the file lands:

- **`public/` ships everything verbatim.** The new CV arrived as
  `Shivansh_Chauhan_CV_new.pdf` *alongside* the old one. Deployed in that state the site
  would have published two competing CVs — the new one live at a guessable URL, while
  every Download CV button still served the old one. A replacement CV must **overwrite
  the canonical filename**, never sit beside it.
- **Keep the filename stable.** The URL is likely already in sent applications and on
  LinkedIn, it is what lands in a recruiter's downloads folder, and repointing the links
  to a `_new` path would both 404 the shared copies and make the download read as a
  draft. `Hero.jsx` and `Contact.jsx` were left untouched for exactly that reason.

`public/.DS_Store` was also removed while in there — 6 KB of Finder metadata that was
deploying to the site root. Being in `.gitignore` does not stop Vite copying it out of
`public/`; check for it whenever that folder is touched.

### Analytics live (2026-09-11)

GoatCounter account registered as `shivansh9307`; the `data-goatcounter` code in
`index.html` already matched, so no code change was needed to switch it on. Verified
end-to-end against the live account: the pageview and the `cv-download` event both
return **200**, and no cookie is set.

**`count.js` will not count on `localhost`.** It logs `goatcounter: not counting
because of: localhost` as a console *warning* and sends nothing — deliberate, so local
development does not pollute real stats. A first test here looked like a dead tag for
exactly this reason. To exercise it locally, inject `window.goatcounter = { allow_local:
true }` before the script runs (Playwright's `addInitScript` does this without touching
the file); never commit that setting.

The script URL was also changed from protocol-relative `//gc.zgo.at/count.js` to
explicit `https://`. Over plain http the protocol-relative form took a 301 hop to https
before loading — harmless on the deployed https site, but a pointless round-trip and
deprecated practice either way.

What it collects: page path, referrer, and a coarse browser/screen/country string. No
cookies, no cross-site identifier, no consent banner required.

### Hero rotating-word glitch — the mask must not be content-sized (2026-09-11)

Reported as "a glitch while animating to dashboards". Two things were landing on that
word; measuring the live page frame-by-frame separated them.

**The reported glitch: the mask resized mid-transition and sheared the outgoing word.**
`RotatingWord` used `<AnimatePresence mode="popLayout">`. `popLayout` pulls the outgoing
word out of layout flow the instant a transition starts, so the mask — an `inline-block`
sized by its in-flow content — collapsed to the *incoming* word's width in a single
frame, while both words were still sliding. With `overflow: hidden` on the mask, the
outgoing word was then clipped to the narrower box:

```
t=1330ms  mask 512.3 -> 368.7   causal estimates | absolute | w=512   <- 144px sheared off
                                dashboards       | static   | w=368.7
```

Measured overhang past the mask, worst case mid-transition: **241px before, 0px after.**

Every transition did this; only the shrinking ones showed it — `causal estimates → dashboards`
(−144px) and `semantic models → pipelines` (−241px). The growing two hid it.

**Fix: grid-stack the mask and size it by the longest option, not the current one.** Every
entry in `ROTATING` is rendered as an invisible `aria-hidden` sizer in grid cell (1,1),
with the animating word in the same cell. The mask is therefore always as wide as the
widest option and cannot change width at all — verified constant at 520.7px across all
four transitions over 11s. The sizers are generated from `ROTATING` itself, so **adding a
longer word cannot reintroduce this**.

`mode="popLayout"` was dropped with it. It existed only to stop the two words sitting
side by side during the overlap, which cell-stacking already does — in flow, without
yanking the outgoing word out of layout and collapsing the box behind it. Both children
now stay `static`.

**The general rule: an overlapping enter/exit transition cannot live in a
content-sized `overflow: hidden` box.** The box tracks whichever child is in flow, so it
will always resize at the exact moment two children need different widths. Reserve the
maximum width, or don't clip.

Checked rather than assumed: descender headroom stays positive for all four words at 1440
and 375 (`pipelines` has the only descender; 9.8px and 4.8px of room); the `inline-block`
→ `inline-grid` switch moved the headline by ≤1px at every measured point; the widest
word fits inside the 375px content column with no page overflow; the `h1` still reads
"I build dashboards you can defend." with the sizers excluded from the accessible name;
and reduced motion still renders one static word with no rotation.

**Font swap: left alone, by decision.** At load, "dashboards" (it is `ROTATING[0]`) paints
in the Georgia fallback at 483px before Fraunces arrives and it snaps to 369px. That is
`display=swap` doing its job and predates this work. It is much less disruptive now: with
the mask no longer content-sized, the swap moves only the mask's invisible right edge —
the word is alone on its line and left-aligned, so nothing visible shifts and only the
letterforms change. Self-hosting the three families would remove it outright; judged a
much larger change than the bug warranted. **Decided, not deferred.**

### Hero rotation sped up (2026-09-11)

The rotating word held each option for **2600ms** with a 0.55s swap, so a visitor waited
**10.4s** to see the whole claim — longer than anyone spends on a hero — with each word
sitting motionless for 2s, several times what it takes to read it.

| | before | after |
|---|---|---|
| dwell (`DWELL_MS`) | 2600ms | **1150ms** |
| swap (`SWAP_S`) | 0.55s | **0.35s** |
| first-word hold (`FIRST_HOLD_MS`) | — | **1600ms** |
| measured readable time per word | ~2050ms | **783ms** |
| **full cycle** | **10.4s** | **4.6s** (measured 4600ms) |

**`FIRST_HOLD_MS` is not cosmetic.** The entrance stagger settles at ~1.3s (`Word` runs
0.9s after a `0.15 + index * 0.08` delay, last index 4). The old 2600ms dwell cleared that
by 1.3s for free; a 1150ms dwell would have fired the first swap while the headline was
still assembling, which reads as a glitch rather than as speed. A `setTimeout` holds the
first word, then hands off to the interval. Measured margin: first swap at 2015ms against
an entrance settling at 1298ms — **717ms clear**. If the entrance stagger is ever
shortened, this can come down with it; it must never go below it.

All three constants sit together at the top of `Hero.jsx` beside `ROTATING`, because they
are the knobs most likely to be retuned.

**783ms of readable time is the deliberate floor.** Enough for a one- or two-word phrase
and no more; the owner picked this tier over a 1.5s dwell knowing that. If it ever reads
as twitchy, raise `DWELL_MS` — do not compensate by shortening `SWAP_S`, which would make
the swap itself harder to follow.

Re-verified that the previous fix holds at the faster cadence: mask width constant at
520.7px and **zero clipping across 396 overlap frames** once webfonts have settled. (Before
`document.fonts.ready` the mask measures 643px — the sizers in the Georgia fallback — which
is the known, accepted `display=swap` behaviour, not a regression.) Reduced motion still
renders one static word with no timer; 375px still fits with no page overflow.
