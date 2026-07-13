import { useEffect, useState } from 'react'

// Tracks which section id currently dominates the viewport.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const ratios = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.intersectionRatio)
        let best = null
        let bestRatio = 0
        for (const id of ids) {
          const r = ratios.get(id) ?? 0
          if (r > bestRatio) {
            best = id
            bestRatio = r
          }
        }
        if (best) setActive(best)
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
