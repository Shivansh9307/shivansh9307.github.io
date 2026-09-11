import useActiveSection from '../hooks/useActiveSection'
import { SECTIONS, SECTION_IDS } from '../sections'

// Rendered links are a SUBSET of tracked ids — they are not the same list and must
// not be derived from each other. Home is tracked but not rendered: there is no
// room for a seventh pill at 375px, and tracking it is what keeps "About" from
// lighting up while the visitor is still on the hero. At the top nothing is active,
// which is correct — you are not in any of these sections yet.
const LINKS = SECTIONS.filter((s) => s.nav)

export default function Nav() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="flex items-center gap-0 rounded-full border border-line/70 bg-ink-900/80 px-1.5 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md md:gap-1 md:px-2 md:py-1.5"
      >
        {LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? 'true' : undefined}
            // px-1.5 at base buys back the width the sixth item costs; measured
            // 361.6px, inside 375/390/430. It does not fit 320px — but neither did
            // the previous nav, and at 320 the hero badge and both demo consoles
            // overflow too, so that is a separate job, not a nav tweak. py-2.5 is
            // load-bearing — it lifts the tap target off the WCAG 2.5.8 24px floor
            // (25px -> 37px). Recover width horizontally or from tracking, never height.
            className={`rounded-full px-1.5 py-2.5 font-mono text-[0.58rem] tracking-[0.06em] uppercase transition-colors duration-200 md:px-3 md:text-[0.7rem] md:tracking-[0.12em] ${
              active === id ? 'bg-teal-600/20 text-teal-400' : 'text-slate hover:text-chalk'
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
