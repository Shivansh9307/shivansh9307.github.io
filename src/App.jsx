import Nav from './components/Nav'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'

export default function App() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:bg-teal-400 focus:px-3 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
