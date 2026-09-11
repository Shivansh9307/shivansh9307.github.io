// Single source of truth for the page's sections.
//
// These ids used to live in three places that had to agree by hand — each
// section's own `id`, Nav's LINKS, and ScrollSpine's NODES — which is exactly
// how the nav silently stops highlighting. Now they live here; each section
// still owns its own `id` attribute, so that is the one pairing to keep in sync.
//
// `nav` is membership of the top pill, NOT of active-section tracking. Home is
// tracked but not rendered: the nav pill has no room for a seventh item at
// 375px, and tracking it is what stops "About" lighting up while the visitor is
// still looking at the hero. ScrollSpine renders every entry — it is a vertical
// desktop rail with no width pressure, so it keeps the scroll-to-top the nav
// gives up.
export const SECTIONS = [
  { id: 'home', label: 'Home', nav: false },
  { id: 'about', label: 'About', nav: true },
  { id: 'skills', label: 'Skills', nav: true },
  { id: 'projects', label: 'Projects', nav: true },
  { id: 'experience', label: 'Experience', nav: true },
  { id: 'education', label: 'Education', nav: true },
  { id: 'contact', label: 'Contact', nav: true },
]

// Every section, in page order — what useActiveSection observes.
export const SECTION_IDS = SECTIONS.map((s) => s.id)
