// Pause/play control for the scripted demo consoles.
//
// WCAG 2.2.2 (Pause, Stop, Hide) wants a user-operable control for auto-updating
// content that runs past five seconds. Both flagship walkthroughs loop
// indefinitely while in view, and `prefers-reduced-motion` — which snaps them to
// a static end-state instead — is an OS setting, not that control. Under reduced
// motion there is no motion to pause, so the button is simply not rendered.
export default function PlaybackToggle({ paused, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[0.56rem] tracking-[0.14em] text-slate uppercase transition-colors hover:border-teal-600/70 hover:text-teal-400"
    >
      <span aria-hidden="true" className="mr-1.5">{paused ? '▶' : '❚❚'}</span>
      {paused ? 'Play' : 'Pause'}
      <span className="sr-only"> {label}</span>
    </button>
  )
}
