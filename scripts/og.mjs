// Renders the 1200×630 Open Graph card to public/og.png.
// Usage: node scripts/og.mjs
//
// Standalone by design — it does NOT need the dev server (unlike screenshot.mjs).
// The card restates the site's own argument in one frame: three marks on one
// axis, the same three numbers the Northstar console walks through. Palette and
// type come from src/index.css @theme; keep them in sync by hand if those change.
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const INK_950 = '#060a12'
const INK_900 = '#0b1120'
const LINE = '#22304a'
const CHALK = '#edf2f7'
const SLATE = '#93a1b7'
const TEAL_400 = '#4fd6c2'
const TEAL_600 = '#0fa08d'
const AMBER_400 = '#f2b457'
const ROSE_500 = '#e0506b'

// Axis geometry. NorthstarDemo runs 0→140, but at card size that crams all
// three marks into the right-hand third and overlaps their captions, so the card
// zooms to the region that actually carries marks: 60→140, inset to 8%..92%.
const LO = 60, HI = 140
const pct = (v) => (8 + ((v - LO) / (HI - LO)) * 84).toFixed(2)

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400..600&family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  *{ margin:0; padding:0; box-sizing:border-box; }
  body{
    width:1200px; height:630px; background:${INK_950}; color:${CHALK};
    font-family:"Space Grotesk",system-ui,sans-serif; overflow:hidden;
    display:flex; flex-direction:column; justify-content:space-between;
    padding:56px 72px 44px; position:relative;
  }
  /* the same radial vignette the hero sits on */
  body::before{
    content:""; position:absolute; inset:0;
    background:radial-gradient(ellipse at 22% 30%, rgba(15,160,141,0.16) 0%, rgba(6,10,18,0) 62%);
  }
  .row{ position:relative; }
  .eyebrow{
    font-family:"IBM Plex Mono",monospace; font-size:15px; letter-spacing:0.22em;
    text-transform:uppercase; color:${SLATE};
  }
  .eyebrow .mark{
    display:inline-block; width:7px; height:7px; background:${AMBER_400};
    transform:rotate(45deg); margin-right:12px; vertical-align:middle;
    position:relative; top:-1px;
  }
  h1{ font-size:74px; line-height:1.02; font-weight:700; letter-spacing:-0.025em; margin-top:26px; }
  h1 em{ font-family:"Fraunces",Georgia,serif; font-style:italic; font-weight:500; color:${TEAL_400}; }
  .sub{ margin-top:20px; font-size:23px; color:${SLATE}; letter-spacing:0.005em; }
  .sub strong{ color:${CHALK}; font-weight:500; }

  /* --- the axis --- */
  .plot{ position:relative; height:132px; }
  .rule{ position:absolute; left:0; right:0; top:74px; height:1px; background:${LINE}; }
  .tick{ position:absolute; top:69px; width:1px; height:11px; background:${LINE}; }
  .mark{ position:absolute; top:0; transform:translateX(-50%); text-align:center; width:190px; }
  .mark .val{ font-family:"IBM Plex Mono",monospace; font-size:27px; font-weight:500; line-height:1; }
  .mark .stem{ width:1px; height:26px; margin:9px auto 0; }
  .mark .dot{ width:11px; height:11px; border-radius:50%; margin:0 auto; }
  .mark .cap{
    font-family:"IBM Plex Mono",monospace; font-size:12px; letter-spacing:0.14em;
    text-transform:uppercase; color:${SLATE}; margin-top:22px; white-space:nowrap;
  }
  .foot{
    position:relative; display:flex; justify-content:space-between; align-items:center;
    border-top:1px solid ${LINE}; padding-top:20px; margin-top:4px;
    font-family:"IBM Plex Mono",monospace; font-size:14px; letter-spacing:0.16em;
    text-transform:uppercase; color:${SLATE};
  }
  .chip{
    border:1px solid ${TEAL_600}; color:${TEAL_400}; border-radius:999px;
    padding:7px 16px; background:${INK_900};
  }
</style></head>
<body>
  <div class="row">
    <p class="eyebrow"><span class="mark"></span>shivansh9307.github.io</p>
    <h1>I build <em>analytics</em><br>you can defend.</h1>
    <p class="sub"><strong>Shivansh Chauhan</strong> — Data &amp; BI Analyst, London UK · Power BI · SQL · Python</p>
  </div>

  <div class="plot">
    <div class="rule"></div>
    <div class="mark" style="left:${pct(126.7)}%">
      <div class="val" style="color:${ROSE_500}">+126.7%</div>
      <div class="stem" style="background:${ROSE_500}"></div>
      <div class="dot" style="background:${ROSE_500}"></div>
      <div class="cap">Naive lift</div>
    </div>
    <div class="mark" style="left:${pct(96.4)}%">
      <div class="val" style="color:${TEAL_400}">+96.4%</div>
      <div class="stem" style="background:${TEAL_400}"></div>
      <div class="dot" style="background:${TEAL_400}"></div>
      <div class="cap">Corrected (DiD)</div>
    </div>
    <div class="mark" style="left:${pct(81.0)}%">
      <div class="val" style="color:${CHALK}">+81.0%</div>
      <div class="stem" style="background:${CHALK}"></div>
      <div class="dot" style="background:${CHALK}"></div>
      <div class="cap">Recorded truth</div>
    </div>
  </div>

  <div class="foot">
    <span>Northstar · Compliance Radar · Atlas</span>
    <span class="chip">Open to UK roles · No sponsorship needed</span>
  </div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(400)
await page.screenshot({ path: resolve(root, 'public/og.png') })
await browser.close()
console.log('wrote public/og.png (1200×630)')
