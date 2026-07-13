// Screenshot harness for the design loop.
// Usage: node scripts/screenshot.mjs [--url http://localhost:5173] [--out shots] [--reduced]
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const args = process.argv.slice(2)
const get = (flag, dflt) => {
  const i = args.indexOf(flag)
  return i === -1 ? dflt : args[i + 1]
}
const url = get('--url', 'http://localhost:5173')
const out = get('--out', 'shots')
const reduced = args.includes('--reduced')

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'mobile-375', width: 375, height: 812 },
]

mkdirSync(out, { recursive: true })
const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500) // let entrance animations settle

  const suffix = reduced ? '-reduced' : ''
  // above-the-fold
  await page.screenshot({ path: `${out}/${vp.name}${suffix}-fold.png` })

  // walk the page so IntersectionObserver reveals + counters fire
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 220))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(1200)

  // full page
  await page.screenshot({ path: `${out}/${vp.name}${suffix}-full.png`, fullPage: true })
  await ctx.close()
}

await browser.close()
console.log(`Screenshots written to ${out}/`)
