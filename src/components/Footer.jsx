export default function Footer() {
  return (
    <footer className="border-t border-line/50">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-8 md:px-10">
        <p className="font-mono text-[0.65rem] tracking-[0.16em] text-slate/80 uppercase">
          <span className="eyebrow-marker" aria-hidden="true">◆</span> Shivansh Chauhan · Birmingham, UK
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.16em] text-slate/60 uppercase">
          Designed &amp; built with React · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
