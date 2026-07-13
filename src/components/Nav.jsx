import useActiveSection from '../hooks/useActiveSection'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const IDS = LINKS.map((l) => l.id)

export default function Nav() {
  const active = useActiveSection(IDS)

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
            className={`rounded-full px-2 py-1.5 font-mono text-[0.58rem] tracking-[0.06em] uppercase transition-colors duration-200 md:px-3 md:text-[0.7rem] md:tracking-[0.12em] ${
              active === id
                ? 'bg-teal-600/20 text-teal-400'
                : 'text-slate hover:text-chalk'
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
