# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Single-page portfolio site for Shivansh Chauhan (Data & BI Analyst, London UK), aimed at UK hiring managers for governance/risk/audit-adjacent and applied-AI data roles. GitHub Pages **user site** (`shivansh9307.github.io`): `.github/workflows/deploy.yml` builds and deploys on push to `main`.

Note the nesting: the git repo is `Shivansh9307.github.io/` inside the `Portfolio Website/` folder. All npm commands run from the repo directory, not its parent.

## Commands

- `npm run dev` — Vite dev server on http://localhost:5173
- `npm run build` / `npm run preview` — production build to `dist/` and local preview
- Analytics is **GoatCounter** (`index.html`, before `</body>`), cookie-free and consent-free, live against the `shivansh9307` account since 2026-09-11. `window.goatcounter?.count(...)` is optional-chained at both CV links so an ad blocker changes nothing.
  **`count.js` refuses to count on `localhost` by design** — it logs `goatcounter: not counting because of: localhost` and sends nothing. That is not a broken tag. To exercise it locally, set `window.goatcounter = { allow_local: true }` before the script runs; don't commit that.
- `npm run og` — regenerates `public/og.png`, the 1200×630 Open Graph card (`scripts/og.mjs`). Standalone: unlike `shots`, it does **not** need a dev server. Re-run it whenever the hero headline or the three Northstar figures change. Its palette is a hand-copy of `@theme`, not an import — same for `public/404.html`.
- `npm run shots` — Playwright screenshot harness (`scripts/screenshot.mjs`); flags: `--out <dir>` (default `shots/`, gitignored), `--url <url>`, `--reduced` (emulates `prefers-reduced-motion`). Captures 1440px + 375px, fold + full-page — four files per run (`desktop-1440-fold.png`, `desktop-1440-full.png`, and the `mobile-375-*` pair), with a `-reduced` infix under `--reduced` so a reduced run never overwrites the normal one and the two can be diffed. **Requires a dev server already running** — start `npm run dev` in the background first. The script scrolls through the page before the full capture so IntersectionObserver reveals and count-ups fire; don't remove that walk. Chromium is already downloaded locally; `npx playwright install chromium` is the fix if the launch ever fails.

There are no tests and no linter. Verification is visual (screenshots) plus a clean `npm run build`. Deploy runs `npm ci` on **Node 20** — the local toolchain is newer, so check the workflow first if a build passes here and fails in CI, and keep `package-lock.json` committed and in sync with `package.json`.

## Stack & Architecture

Vite + React 18 + Tailwind CSS v4 (via `@tailwindcss/vite`; tokens live in `@theme` in `src/index.css` — there is no `tailwind.config`) + Framer Motion. Fonts load from Google Fonts in `index.html` with `display=swap`. `vite.config.js` pins `base: '/'` because this is a *user* site served from the domain root — the usual project-site `base: '/repo-name/'` would break every asset URL.

`src/App.jsx` composes one page from `src/components/`: skip-link → Cursor (desktop accent) → Nav (sticky pill, active section via the `useActiveSection` IntersectionObserver hook) → ScrollSpine (fixed left-gutter progress rail, `xl:` and up) → Hero (staggered word reveal, rotating word, AmbientCanvas behind) → StatsBar (`useCountUp`) → About → Skills → Projects (contains **NorthstarDemo** + **RadarDemo** + **AtlasReceipt** + **ClientWork**) → Experience → Contact → ClosingFrame → Footer.

**Section ids live in three places and must agree.** Each section owns its own anchor (`<section id="about">` in `About.jsx`, `id="home"` in `Hero.jsx`, …); `Nav.jsx`'s `LINKS` array repeats those ids to build the `IDS` passed to `useActiveSection`; and `ScrollSpine.jsx`'s `NODES` array repeats them a third time for the gutter rail. Adding, renaming or reordering a section means editing all three, or the nav pill and the spine silently stop highlighting. StatsBar deliberately has **no** id — it is `<section aria-label="Career statistics">`, a band between Hero and About rather than a nav destination; don't give it one.

Shared primitives worth reusing rather than re-rolling:

- `SectionHeading` — the `◆ NN — LABEL` eyebrow plus the oversized masked h2. Every section opens with it. The `◆` marker is reserved for section openers only (see DESIGN_NOTES cycle 3); don't add it to card eyebrows.
- `MagneticButton` — cursor-leaning anchor; `variant="primary"|"secondary"`, and `caps={false}` for content that must not be uppercased (the email CTA). Prefer the prop over a `normal-case` class, which loses to Tailwind utility ordering.
- `PlaybackToggle` — the pause/play control on the two looping consoles (WCAG 2.2.2). Not rendered under reduced motion. If you touch a demo's advance effect, keep its `lastLogged` ref: the effect re-runs when `paused` flips back, and without the guard the current step's log line is appended twice under a key it already used.
- `useCountUp(target, duration = 1400, decimals = 0)` — returns `[ref, displayString]`; put the ref on the element whose viewport entry should start the count. The value is already `.toFixed(decimals)`-formatted, so fractional stats **must** pass `decimals` or they round away (the 0.64 PR-AUC in StatsBar's `STATS` renders as `1` without it). Snaps straight to the target under reduced motion.
- `.eyebrow` / `.eyebrow-marker` in `src/index.css` — the mono "chart annotation" voice.

Projects has three tiers. Up top, **three co-flagships**, stacked full-width (the demos are wide consoles and none survives half-width), each rendered by the `Flagship` component from the `FLAGSHIPS` array with prose in `BLURBS`. Order mirrors the CV, Northstar first:

- **NorthstarDemo** (`src/components/NorthstarDemo.jsx`) — a scripted walkthrough of the causal promotion analytics: an estimate axis carrying naive `+126.7%`, DiD-corrected `+96.4%` and recorded truth `+81.0%`, over a promotion grid that flips 19 loss-making promotions to 10 profitable. Pauses at a naive/causal choice with working buttons (auto-resolves to causal after 6s) before looping. **Those three percentages are three different things** — `+81.0%` is the recorded truth both estimates are scored against, *not* the corrected estimate. The 2026-09-11 CV now states all three explicitly (an earlier one compressed them in a way that read as though `+81.0%` were the correction). Keep them distinct on every surface; that rule is what stopped them collapsing before.
- **RadarDemo** (`src/components/RadarDemo.jsx`, the largest component) — a scripted state-machine walkthrough (`STEPS` array) of the Compliance Radar: pipeline pulses, network-risk score, then a pause at a human checkpoint with working Approve/Reject buttons (auto-approves after 6s) before looping.
- **AtlasReceipt** (`src/components/AtlasReceipt.jsx`) — two tabbed example runs of Atlas Analytics, one passing and one vetoed by a validation gate.

`NorthstarDemo`'s axis positions the rule, the ticks and all three marks inside one inner `absolute inset-x-5 inset-y-0` plot area. That is load-bearing: the outer box's padding gives end-of-scale labels room, and mixing the two coordinate systems misaligns the scale from its own rule — invisible at 1440px, obvious at 375px. New marks go inside the inner box.

Under the Northstar demo sits **NorthstarCaseStudy** — a native `<details>` method write-up sourced from the `northstar-causal-demand-analytics` README, whose centrepiece is that parallel trends *fails* (11 of 13 pre-treatment leads significant), so +96.4% is an upper bound rather than a point estimate. Two control-selection error figures in that README are ambiguously stated and are deliberately described qualitatively here; don't "restore" them without re-reading the repo.

Between the flagships and the paid work sits **PowerBIProof** — seven committed report
pages from the `northstar-causal-demand-analytics` and `compliance-radar` repos, plus
five verbatim measures from `powerbi/measures.dax`. Images live in `src/assets/powerbi/`
as a **two-tier pair per page**: `<name>.jpg` (760px, lazy thumbnail) and
`<name>-full.jpg` (1500px, fetched only when the `<dialog>` lightbox opens). Keep that
split — eager-loading the full-size set would quadruple the page. The dialog's `m-auto`
is load-bearing: Tailwind's preflight kills the UA `margin: auto` that centres a modal
`<dialog>`, which also silently breaks backdrop-to-close.

Below the flagships, **ClientWork** holds the two paid engagements (EGA/HCLTech, Koru Green) in their own labelled band — promoted out of the supporting grid because three unpaid flagships were out-weighting two years of real client delivery. It deliberately carries **no provenance badge**: those label the flagships' demo data, and ClientWork has none. Then a `SUPPORTING` array of two cards (RAG chatbot, F&B sales analysis) rendered by the local `Card` component. Every GitHub link in the section derives from the single `REPO` const at the top of `src/components/Projects.jsx`. The RAG and F&B cards are **repo-backed, not CV-backed** — the current CV lists neither, but both are live public repos and the owner chose to keep them; don't delete them as "unsourced".

**The three flagships carry three different provenance labels, and those distinctions are deliberate:** RadarDemo's figures are illustrative mock-UI data, tagged `SIMULATED` in amber. AtlasReceipt's are genuine output committed to the `atlas-analytics` repo, tagged `REAL RUN · COMMITTED` in teal. NorthstarDemo's are also real committed output, but measured over a 2.19M-row estate that is **synthetic by design** — generated with the true promotional effect recorded so every estimate can be scored against a known answer — so it is tagged `REAL RUN · SYNTHETIC ESTATE` in teal, with a note under the console explaining why that is a feature. Do not relabel any of them, and do not collapse the three states into two — the site's argument is that it practises the provenance it sells.

## Design system

`DESIGN_NOTES.md` holds the palette with named hexes, type scale, motion rules, and the full cycle-by-cycle critique log. Read it before making visual changes, and append new critique entries rather than rewriting history — new entries follow the existing heading shape, `## Post-launch revision N — <topic> (YYYY-MM-DD)`.

- Data-mark colours (`#0FA08D`, `#C08427`, `#6B8AEE`, `#E0506B`) were validated for CVD/contrast against the ink surface — don't introduce new mark colours casually. Display tints (`-400`) are for text-scale accents only; mark shades are the only colours allowed on data marks.
- Token names in code differ slightly from DESIGN_NOTES prose: the blue mark is `--color-plot-500` (the notes call it `--blue-500`). Trust `src/index.css`.
- **Motion**: every animation is gated by `useReducedMotion`; shared ease `[0.22, 1, 0.36, 1]`. For mask reveals, put `whileInView` on the visible mask element and animate the child via variants — an element translated out of an `overflow:hidden` parent never intersects, so observing it directly never fires (this bug shipped once; see DESIGN_NOTES cycle 2). `Cursor` and `MagneticButton` additionally gate on `window.matchMedia('(pointer: fine)')`, so the cursor ring and the magnetic lean are simply absent on touch devices — and in `--reduced` screenshots. That is by design, not a regression to chase.

## Content rules

Every band in Projects is labelled by how the work was paid for (`BandLabel`), and `StatsBar` runs deliberately two-paid / one-project / one-academic — see DESIGN_NOTES revision 5 before re-mixing it. Copy uses only CV-backed or user-supplied facts — every metric on the site must trace back to `public/Shivansh_Chauhan_CV.pdf` or to a public repo README. Do not invent metrics; illustrative numbers must be visibly marked as simulated/demo.

When the CV is replaced, re-sync the places metrics actually live: `STATS` in `StatsBar.jsx`, the timeline entries in `Experience.jsx`, `SUPPORTING` + `BLURBS` in `Projects.jsx`, the prose and `FACTS` in `About.jsx`, and the hero paragraph in `Hero.jsx` plus the meta description in `index.html`. Read the repo READMEs too, not just the CV — the CV is written to a two-page budget and the READMEs carry the fuller working (control-set comparisons, diagnostics, the Rossmann replication), which is where the demos and `NorthstarCaseStudy` get their detail. `DESIGN_NOTES.md` also carries a `### TODO: verify (illustrative / assumed values)` list to re-check at the same time.

Retiring a figure is as much a part of the re-sync as adding one. The 2026-09 CV dropped `10,000+ tickets a year` and `~20 hrs/month`, which between them appeared in the hero, About, `STATS` and a project card; leaving a number on the site that no longer traces anywhere is the exact failure the site argues against.

The CV is authored in Word; only the exported PDF is committed. When it changes, the owner exports the PDF — no converter is installed here, and a `textutil`/`cupsfilter` round-trip destroys the layout. A `.docx` dropped in `dist/` never deploys: `dist/` is gitignored build output that Vite wipes on every build.

That trap generalises to any hand-placed file. Source assets belong in `src/assets/` (imported, bundled and content-hashed — how `Hero.jsx` loads the portrait) or `public/` (copied verbatim to the site root — how the CV is served). Anything left sitting in `dist/` is **deleted by the next build**, and since `dist/` is gitignored there is no copy to recover — check for loose files there before running `npm run build`.

The Experience timeline's `Independent Projects` entry carries a `note` field disclosing that the portfolio work is unpaid and uncliented. It mirrors the CV and should stay — an unlabelled portfolio entry inside a work timeline reads as a client engagement.
