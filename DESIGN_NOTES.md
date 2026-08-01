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
- Hero: word-by-word stagger (80ms); rotating word every 2.6s (clip swap).
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
