# shivansh9307.github.io

Portfolio site for **Shivansh Chauhan** — Data & BI Analyst, London UK.
Live at **<https://shivansh9307.github.io>**.

Power BI, SQL and Python, with causal inference and validation underneath — built
around one argument: *every figure on the page traces back to a source, and the
demos are labelled with the provenance of their own data.*

## What's on it

| | |
|---|---|
| **Northstar** | Causal demand & promotion analytics. Naive lift says +126.7%, difference-in-differences says +96.4%, the recorded truth is +81.0% — the correction removes 64% of the bias, and turns 19 loss-making promotions into 10 profitable ones on the same budget. Python · DuckDB · Power BI (TMDL, 45 DAX measures). |
| **UK Corporate Compliance Radar** | 10,000 Companies House records into a ranked watchlist. A definitional fix cut a director-risk rule's false alarms from 60 to 4; hand-verification took an LLM screening layer from 18-in-20 false positives to 3-in-20, holding at 9.2% across 239 unseen companies. PostgreSQL · Power BI · LLM extraction. |
| **Atlas** | A multi-agent analytics pipeline that stops a result reaching a stakeholder unless it can be independently re-derived. 18 specialist agents, 380 automated tests; its validator vetoed a model at chance-level accuracy (AUC 0.4954). |

Each demo on the site is labelled with the provenance of its data — `SIMULATED`,
`REAL RUN · COMMITTED`, or `REAL RUN · SYNTHETIC ESTATE`. Those distinctions are
deliberate and documented in `CLAUDE.md`.

## Stack

Vite · React 18 · Tailwind CSS v4 · Framer Motion. Deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the build locally
```

Two supporting scripts:

```bash
npm run shots      # Playwright screenshots at 1440 + 375 (needs `npm run dev` running)
npm run shots -- --reduced   # the same, emulating prefers-reduced-motion
npm run og         # regenerate public/og.png, the 1200×630 social card
```

## Repo docs

- `CLAUDE.md` — architecture, cross-file invariants, and the content rules that
  keep every published figure traceable.
- `DESIGN_NOTES.md` — palette, type scale, motion rules, and the cycle-by-cycle
  design critique log.

## Contact

[LinkedIn](https://www.linkedin.com/in/chauhan-shivansh) ·
[GitHub](https://github.com/Shivansh9307) ·
shivansh369.chauhan@gmail.com
