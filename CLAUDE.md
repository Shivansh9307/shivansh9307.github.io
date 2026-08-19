# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Single-page portfolio site for Shivansh Chauhan (Power BI Developer / Data Analyst, London UK), aimed at UK hiring managers for governance/risk/audit-adjacent and applied-AI data roles. GitHub Pages **user site** (`shivansh9307.github.io`): `.github/workflows/deploy.yml` builds and deploys on push to `main`.

Note the nesting: the git repo is `Shivansh9307.github.io/` inside the `Portfolio Website/` folder. All npm commands run from the repo directory, not its parent.

## Commands

- `npm run dev` — Vite dev server on http://localhost:5173
- `npm run build` / `npm run preview` — production build to `dist/` and local preview
- `npm run shots` — Playwright screenshot harness (`scripts/screenshot.mjs`); flags: `--out <dir>` (default `shots/`, gitignored), `--url <url>`, `--reduced` (emulates `prefers-reduced-motion`). Captures 1440px + 375px, fold + full-page. **Requires a dev server already running** — start `npm run dev` in the background first. The script scrolls through the page before the full capture so IntersectionObserver reveals and count-ups fire; don't remove that walk. Chromium is already downloaded locally; `npx playwright install chromium` is the fix if the launch ever fails.

There are no tests and no linter. Verification is visual (screenshots) plus a clean `npm run build`. Deploy runs `npm ci` on **Node 20** — the local toolchain is newer, so check the workflow first if a build passes here and fails in CI, and keep `package-lock.json` committed and in sync with `package.json`.

## Stack & Architecture

Vite + React 18 + Tailwind CSS v4 (via `@tailwindcss/vite`; tokens live in `@theme` in `src/index.css` — there is no `tailwind.config`) + Framer Motion. Fonts load from Google Fonts in `index.html` with `display=swap`. `vite.config.js` pins `base: '/'` because this is a *user* site served from the domain root — the usual project-site `base: '/repo-name/'` would break every asset URL.

`src/App.jsx` composes one page from `src/components/`: skip-link → Cursor (desktop accent) → Nav (sticky pill, active section via the `useActiveSection` IntersectionObserver hook) → Hero (staggered word reveal, rotating word, AmbientCanvas behind) → StatsBar (`useCountUp`) → About → Skills → Projects (contains **RadarDemo** + **AtlasReceipt**) → Experience → Contact → Footer.

**Section ids live in two places and must agree.** Each section owns its own anchor (`<section id="about">` in `About.jsx`, `id="home"` in `Hero.jsx`, …), and `Nav.jsx`'s `LINKS` array repeats those ids to build the `IDS` passed to `useActiveSection`. Adding, renaming or reordering a section means editing both, or the nav pill silently stops highlighting. StatsBar deliberately has **no** id — it is `<section aria-label="Career statistics">`, a band between Hero and About rather than a nav destination; don't give it one.

Shared primitives worth reusing rather than re-rolling:

- `SectionHeading` — the `◆ NN — LABEL` eyebrow plus the oversized masked h2. Every section opens with it. The `◆` marker is reserved for section openers only (see DESIGN_NOTES cycle 3); don't add it to card eyebrows.
- `MagneticButton` — cursor-leaning anchor; `variant="primary"|"secondary"`, and `caps={false}` for content that must not be uppercased (the email CTA). Prefer the prop over a `normal-case` class, which loses to Tailwind utility ordering.
- `useCountUp(target, duration = 1400, decimals = 0)` — returns `[ref, displayString]`; put the ref on the element whose viewport entry should start the count. The value is already `.toFixed(decimals)`-formatted, so fractional stats **must** pass `decimals` or they round away (the 0.64 PR-AUC in StatsBar's `STATS` renders as `1` without it). Snaps straight to the target under reduced motion.
- `.eyebrow` / `.eyebrow-marker` in `src/index.css` — the mono "chart annotation" voice.

Projects has three tiers. Up top, **two co-flagships**, stacked full-width (both demos are wide consoles and neither survives half-width), each rendered by the `Flagship` component from the `FLAGSHIPS` array with prose in `BLURBS`:

- **RadarDemo** (`src/components/RadarDemo.jsx`, the largest component) — a scripted state-machine walkthrough (`STEPS` array) of the Compliance Radar: pipeline pulses, network-risk score, then a pause at a human checkpoint with working Approve/Reject buttons (auto-approves after 6s) before looping.
- **AtlasReceipt** (`src/components/AtlasReceipt.jsx`) — two tabbed example runs of Atlas Analytics, one passing and one vetoed by a validation gate.

Below them, a `SUPPORTING` array of three cards in a 3-up grid (EGA SLA reporting, RAG chatbot, F&B sales analysis) rendered by the local `Card` component. Every GitHub link in the section derives from the single `REPO` const at the top of `src/components/Projects.jsx`.

**The two flagships carry opposite provenance labels, and that asymmetry is deliberate:** RadarDemo's figures are illustrative mock-UI data, tagged `SIMULATED` in amber. AtlasReceipt's are genuine output committed to the `atlas-analytics` repo, tagged `REAL RUN · COMMITTED` in teal. Do not relabel either one in either direction — the site's argument is that it practises the provenance it sells.

## Design system

`DESIGN_NOTES.md` holds the palette with named hexes, type scale, motion rules, and the full cycle-by-cycle critique log. Read it before making visual changes, and append new critique entries rather than rewriting history — new entries follow the existing heading shape, `## Post-launch revision N — <topic> (YYYY-MM-DD)`.

- Data-mark colours (`#0FA08D`, `#C08427`, `#6B8AEE`, `#E0506B`) were validated for CVD/contrast against the ink surface — don't introduce new mark colours casually. Display tints (`-400`) are for text-scale accents only; mark shades are the only colours allowed on data marks.
- Token names in code differ slightly from DESIGN_NOTES prose: the blue mark is `--color-plot-500` (the notes call it `--blue-500`). Trust `src/index.css`.
- **Motion**: every animation is gated by `useReducedMotion`; shared ease `[0.22, 1, 0.36, 1]`. For mask reveals, put `whileInView` on the visible mask element and animate the child via variants — an element translated out of an `overflow:hidden` parent never intersects, so observing it directly never fires (this bug shipped once; see DESIGN_NOTES cycle 2).

## Content rules

Copy uses only CV-backed or user-supplied facts — every metric on the site must trace back to `public/Shivansh_Chauhan_CV.pdf` or to a public repo README. Do not invent metrics; illustrative numbers must be visibly marked as simulated/demo.

When the CV is replaced, re-sync the four places metrics actually live: `STATS` in `StatsBar.jsx`, the timeline entries in `Experience.jsx`, `SUPPORTING` + `BLURBS` in `Projects.jsx`, and the prose in `About.jsx`. `DESIGN_NOTES.md` also carries a `### TODO: verify (illustrative / assumed values)` list to re-check at the same time.

The CV is authored in Word; only the exported PDF is committed. When it changes, the owner exports the PDF — no converter is installed here, and a `textutil`/`cupsfilter` round-trip destroys the layout. A `.docx` dropped in `dist/` never deploys: `dist/` is gitignored build output that Vite wipes on every build.

That trap generalises to any hand-placed file. Source assets belong in `src/assets/` (imported, bundled and content-hashed — how `Hero.jsx` loads the portrait) or `public/` (copied verbatim to the site root — how the CV is served). Anything left sitting in `dist/` is **deleted by the next build**, and since `dist/` is gitignored there is no copy to recover — check for loose files there before running `npm run build`.

The Experience timeline's `Independent Projects` entry carries a `note` field disclosing that the portfolio work is unpaid and uncliented. It mirrors the CV and should stay — an unlabelled portfolio entry inside a work timeline reads as a client engagement.
