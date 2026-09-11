import { useEffect, useState } from 'react'

// Tracks which section currently dominates the viewport.
//
// RANKS BY SHARE OF THE VIEWPORT, not by IntersectionObserver's
// `intersectionRatio`. That ratio is visible-area ÷ the *section's own* height, which
// answers "how much of this section is on screen" when the question is "which section
// is on screen" — and it is structurally biased against tall sections. Measured at a
// 900px viewport, Projects (6251px) could never score above 0.144 even filling the
// whole screen, while Skills (1302px) hit 0.691 on a sliver of its tail and won. The
// nav highlighted "Skills" while you were looking at Projects. Do not revert to ratio.
//
// The same ratio also governed the observer's thresholds, so every threshold above 0
// was unreachable for Projects and the observer never fired across 6251px of scrolling.
// IntersectionObserver cannot express viewport-share cleanly for that reason: tracking
// a section that tall needs a dense threshold array and still quantises to roughly one
// update per 445px. Seven getBoundingClientRect reads coalesced into one animation
// frame are exact, continuous and cheap.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = null

    const measure = () => {
      frame = null
      const vh = window.innerHeight
      if (!vh) return
      let best = null
      let bestCoverage = 0
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        const visible = Math.min(bottom, vh) - Math.max(top, 0)
        const coverage = Math.max(0, visible) / vh
        if (coverage > bestCoverage) {
          best = id
          bestCoverage = coverage
        }
      }
      // No winner means every tracked section is off-screen — at the page bottom the
      // untracked ClosingFrame and Footer fill the view. Hold the last one rather than
      // clearing, so the nav does not blank out under the reader.
      if (best) setActive(best)
    }

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return active
}
