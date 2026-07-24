# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Single-page portfolio site for Shivansh Chauhan (Power BI Developer / Data Analyst, Birmingham UK), aimed at UK hiring managers for governance/risk/audit-adjacent and applied-AI data roles. GitHub Pages **user site** (`shivansh9307.github.io`): `.github/workflows/deploy.yml` builds and deploys on push to `main`.

## Commands

- `npm run dev` — Vite dev server on http://localhost:5173
- `npm run build` / `npm run preview` — production build to `dist/` and local preview
- `npm run shots` — Playwright screenshot harness (`scripts/screenshot.mjs`); flags: `--out <dir>`, `--url <url>`, `--reduced` (emulates `prefers-reduced-motion`). Captures 1440px + 375px, fold + full-page. The script scrolls through the page before the full capture so IntersectionObserver reveals fire — don't remove that walk.

There are no tests; verification is visual (screenshots) plus `npm run build`.

## Stack & Architecture

Vite + React 18 + Tailwind CSS v4 (via `@tailwindcss/vite`; tokens live in `@theme` in `src/index.css` — no tailwind.config) + Framer Motion.

`src/App.jsx` composes one page from `src/components/`: Nav (sticky pill, active section via `useActiveSection` IntersectionObserver hook) → Hero (staggered word reveal, rotating word, AmbientCanvas behind) → StatsBar (`useCountUp`) → About → Skills → Projects (contains **RadarDemo**) → Experience → Contact → Footer, plus a desktop-only Cursor accent.

- **RadarDemo** is the interactive centrepiece: a scripted state-machine walkthrough (STEPS array) of the Compliance Radar — pipeline pulses, network-risk score, then pauses at a human checkpoint with working Approve/Reject buttons (auto-approves after 6s) and loops. Its figures are illustrative mock-UI data, labelled "Simulated" in the UI — keep that label.
- **Design system**: documented in `DESIGN_NOTES.md` (palette with named hexes, type scale, motion rules, and the full cycle-by-cycle critique log). Read it before making visual changes; append new critique entries rather than rewriting history. Data-mark colours (`#0FA08D`, `#C08427`, `#6B8AEE`, `#E0506B`) were validated for CVD/contrast against the ink surface — don't introduce new mark colours casually.
- **Motion conventions**: every animation is gated by `useReducedMotion`; shared ease `[0.22, 1, 0.36, 1]`. For mask reveals, put `whileInView` on the visible mask element and animate the child via variants — an element translated out of an `overflow:hidden` parent never intersects, so observing it directly never fires (this bug shipped once; see DESIGN_NOTES cycle 2).

## Content rules

Copy uses only CV-backed or user-supplied facts — every metric on the site must trace back to `public/Shivansh_Chauhan_CV.pdf`. Do not invent metrics; illustrative numbers must be visibly marked as simulated/demo. Re-check StatsBar/Experience/Projects/About against the CV any time that file is replaced.
