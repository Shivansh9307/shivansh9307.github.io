import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import MagneticButton from './MagneticButton'

const EASE = [0.22, 1, 0.36, 1]

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chauhan-shivansh', external: true },
  { label: 'GitHub', href: 'https://github.com/Shivansh9307', external: true },
  { label: 'Download CV', href: '/Shivansh_Chauhan_CV.pdf', download: 'Shivansh_Chauhan_CV.pdf' },
]

export default function Contact() {
  const reduced = useReducedMotion()
  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-28">
      <SectionHeading number="05" eyebrow="Contact">
        Let&rsquo;s talk data.
      </SectionHeading>

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-start">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="max-w-xl text-lg leading-relaxed text-slate">
            Hiring for a <strong className="font-medium text-chalk">Power BI, data analyst or analytics engineering</strong> role —
            or want a second pair of eyes on a{' '}
            <em className="font-serif italic text-teal-400">governance-heavy data problem</em>? My inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="mailto:shivansh369.chauhan@gmail.com" variant="primary" caps={false}>
              shivansh369.chauhan@gmail.com
            </MagneticButton>
          </div>
        </motion.div>

        <motion.ul
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="flex flex-col divide-y divide-line/50 border-y border-line/50"
        >
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                download={l.download}
                {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex items-center justify-between py-4 font-mono text-[0.78rem] tracking-[0.14em] text-slate uppercase transition-colors hover:text-teal-400"
              >
                {l.label}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
