import { useState } from 'react'
import './App.css'

const phone = '(307) 745-0571'
const tel = 'tel:+13077450571'
const map = 'https://www.google.com/maps/search/?api=1&query=3708+E+Grand+Ave+Laramie+WY+82070'
const reviewsUrl = 'https://www.google.com/maps/place/Doe+Plumbing/@41.3064518,-105.5481902,17z/data=!4m16!1m9!3m8!1s0x876890592a9773b5:0x80baa4cc06eec5ac!2sDoe+Plumbing!8m2!3d41.3064518!4d-105.5481902!9m1!1b1!16s%2Fg%2F12616zrsg!3m5!1s0x876890592a9773b5:0x80baa4cc06eec5ac!8m2!3d41.3064518!4d-105.5481902!16s%2Fg%2F12616zrsg'

type IconName = 'phone' | 'arrow' | 'menu' | 'close' | 'drop' | 'wrench' | 'heater' | 'drain' | 'fixture' | 'building' | 'check' | 'pin' | 'clock' | 'quote'
function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    phone: <path d="M7.4 3.6 5.8 2.5a1.8 1.8 0 0 0-2.2.2L2.5 3.8c-.7.7-.9 1.7-.6 2.6 2 6.5 7.2 11.7 13.7 13.7.9.3 1.9.1 2.6-.6l1.1-1.1a1.8 1.8 0 0 0 .2-2.2l-1.1-1.6a1.8 1.8 0 0 0-2-.7l-2.2.8a15.8 15.8 0 0 1-6.9-6.9l.8-2.2a1.8 1.8 0 0 0-.7-2Z" />,
    arrow: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M5 5 19 19M19 5 5 19" />,
    drop: <path d="M12 2.5s-6.5 7.2-6.5 11.4a6.5 6.5 0 0 0 13 0C18.5 9.7 12 2.5 12 2.5Z" />,
    wrench: <path d="M20 7.5a6 6 0 0 1-7.9 5.7L5.6 19.7a2 2 0 0 1-2.8-2.8l6.5-6.5A6 6 0 0 1 16.5 3l-3.2 3.2.5 3 3 .5L20 6.5v1Z" />,
    heater: <><rect x="6" y="2.5" width="12" height="19" rx="2" /><path d="M9 6h6M9 10h6M9 16h.01M15 16h.01" /></>,
    drain: <path d="M3 5h18M5 9h14M7 13h10M9 17h6M11 21h2" />,
    fixture: <path d="M3 9h11a4 4 0 0 1 4 4v2M9 9V5m-3 0h6m6 10h2v3h-4v-3h2ZM3 13h6" />,
    building: <path d="M4 21V6l8-3 8 3v15M2 21h20M9 8v2m6-2v2m-6 4v2m6-2v2m-4 5v-3h2v3" />,
    check: <path d="m4 12 5 5L20 6" />,
    pin: <><path d="M20 10c0 5-8 11.5-8 11.5S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    quote: <path d="M9.5 8H5v5h3.5c0 2.3-1.2 3.6-3.5 4M19 8h-4.5v5H18c0 2.3-1.2 3.6-3.5 4" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
function Logo({ light = false }: { light?: boolean }) {
  return <a className={'brand' + (light ? ' brand-light' : '')} href="#top" aria-label="D.O.E. Plumbing, back to top"><span className="brand-mark"><img src="/images/doe-mascot.png" alt="" width="400" height="351" /></span><span className="brand-words"><strong>D.O.E.</strong><span>PLUMBING</span></span></a>
}
const services: { icon: IconName; title: string; description: string }[] = [
  { icon: 'drop', title: 'Leaks & pipe repair', description: 'From a persistent drip to a pipe that needs attention, get help finding the source and making the right repair.' },
  { icon: 'fixture', title: 'Faucets & fixtures', description: 'Repair or replace faucets, sinks, toilets, and the fixtures you use every day.' },
  { icon: 'heater', title: 'Water heaters', description: 'Trouble with hot water? Call about water heater repairs and replacement.' },
  { icon: 'drain', title: 'Drains & sewer', description: 'Get help with slow or blocked drains and discuss sewer line concerns with a local plumber.' },
  { icon: 'wrench', title: 'General plumbing', description: 'Practical plumbing help for repairs, updates, and the jobs on your to-do list.' },
  { icon: 'building', title: 'Commercial plumbing', description: 'Plumbing service for local businesses and commercial properties.' },
]
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <div id="top" className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="utility-bar"><div className="container utility-content"><span><Icon name="pin" size={15} /> Proudly serving Laramie, Wyoming</span><a href={tel}><Icon name="phone" size={15} /> Call {phone}</a></div></div>
    <header className="site-header"><div className="container header-inner">
      <Logo />
      <nav id="primary-navigation" className={'site-nav' + (menuOpen ? ' is-open' : '')} aria-label="Main navigation">
        <a href="#services" onClick={closeMenu}>Services</a><a href="#about" onClick={closeMenu}>About</a><a href="#reviews" onClick={closeMenu}>Reviews</a><a className="nav-contact" href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
      <a className="header-call" href={tel}><Icon name="phone" size={18} /><span>{phone}</span></a>
      <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={25} /></button>
    </div></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title"><div className="container hero-grid">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> THOSE WHO KNOW CALL D.O.E.</div><h1 id="hero-title">Plumbing help you can <em>count on.</em></h1><p className="hero-lede">From everyday fixes to bigger plumbing needs, D.O.E. Plumbing helps Laramie homes and businesses get back to what matters.</p><div className="hero-actions"><a className="button button-primary" href={tel}><Icon name="phone" size={18} /> Call {phone}</a><a className="text-link" href="#services">Explore our services <Icon name="arrow" size={18} /></a></div><div className="hero-note"><span className="note-check"><Icon name="check" size={15} /></span> Residential & commercial plumbing in Laramie, WY</div></div>
        <div className="hero-visual"><img src="/images/faucet-work.jpg" alt="Kitchen faucet running into a stainless steel sink" width="1536" height="1024" fetchPriority="high" /><div className="hero-badge"><img className="badge-mascot" src="/images/doe-mascot.png" alt="" width="400" height="351" /><span><strong>The D.O.E. name</strong><small>Local plumbing in Laramie</small></span></div></div>
      </div></section>
      <section className="promise-strip" aria-label="Why call D.O.E. Plumbing"><div className="container promise-grid"><div><span className="promise-icon"><Icon name="pin" /></span><span><strong>Right here in Laramie</strong><small>Local service, local know-how</small></span></div><div><span className="promise-icon"><Icon name="wrench" /></span><span><strong>Everyday plumbing help</strong><small>Small fixes to larger projects</small></span></div><div><span className="promise-icon"><Icon name="building" /></span><span><strong>Home & business</strong><small>Residential and commercial</small></span></div></div></section>
      <section id="services" className="section services-section"><div className="container"><div className="section-heading services-heading"><div><span className="kicker">WHAT WE CAN HELP WITH</span><h2>Plumbing services for the way you live.</h2></div><p>Whatever is happening with your plumbing, the first step is simple: tell us what you need and we’ll help you find the next step.</p></div><div className="services-grid">{services.map((service) => <article className="service-card" key={service.title}><div className="service-icon"><Icon name={service.icon} size={29} /></div><h3>{service.title}</h3><p>{service.description}</p></article>)}</div><p className="services-footnote">Don’t see your issue here? <a href={tel}>Give us a call</a> and tell us about it.</p></div></section>
      <section id="about" className="section about-section"><div className="container about-grid"><div className="about-visual"><div className="about-photo"><img src="/images/plumbing-repair.jpg" alt="Plumber hand-tightening the P-trap beneath a bathroom sink" width="1536" height="1024" loading="lazy" /><div className="about-image-label"><Icon name="pin" size={16} /> LARAMIE, WYOMING</div></div><div className="brand-artwork"><img src="/images/doe-brand-artwork.png" alt="Original D.O.E. Plumbing artwork with the company mascot and Those who know call D.O.E. tagline" width="971" height="517" loading="lazy" /></div></div><div className="about-copy"><span className="kicker">A NAME LARAMIE KNOWS</span><h2>Good neighbors. Good plumbing.</h2><p>When something in your home or business is not working, you want a real person on the other end of the phone and a straightforward path forward.</p><p>D.O.E. Plumbing serves Laramie with residential and commercial plumbing help, from faucets and drains to water heaters and general repairs. Tell us what is going on. We are here to help you work through it.</p><div className="about-callout"><Icon name="quote" size={27} /><span>“Give us a call — no job too small.”<small>A longtime D.O.E. Plumbing message to Laramie</small></span></div><a className="button button-outline" href={tel}>Talk with D.O.E. Plumbing <Icon name="arrow" size={18} /></a></div></div></section>
      <section id="reviews" className="section reviews-section"><div className="container">
        <div className="section-heading centered"><span className="kicker">GOOGLE MAPS REVIEWS</span><h2>Hear it from our neighbors.</h2><p>In their own words, from public five-star Google reviews of D.O.E. Plumbing.</p></div>
        <div className="review-grid">
          <article className="review-card"><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote>“Fast, reliable, and great customer service.”</blockquote><div className="review-byline"><strong>Ashley Montalvo</strong><span>Google review</span></div><a href={reviewsUrl} target="_blank" rel="noopener noreferrer">Read on Google Maps <Icon name="arrow" size={16} /></a></article>
          <article className="review-card"><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote>“Great guys fixed my water heater”</blockquote><div className="review-byline"><strong>Wesley dunn</strong><span>Google review</span></div><a href={reviewsUrl} target="_blank" rel="noopener noreferrer">Read on Google Maps <Icon name="arrow" size={16} /></a></article>
          <article className="review-card"><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote>“Had a great experience working with Brian.”</blockquote><div className="review-byline"><strong>Katie Kern</strong><span>Google review</span></div><a href={reviewsUrl} target="_blank" rel="noopener noreferrer">Read on Google Maps <Icon name="arrow" size={16} /></a></article>
        </div>
        <p className="reviews-footnote">Reviews are short excerpts. <a href={reviewsUrl} target="_blank" rel="noopener noreferrer">See all Google Maps reviews <Icon name="arrow" size={16} /></a></p>
      </div></section>
      <section id="contact" className="contact-section"><div className="container contact-grid"><div className="contact-copy"><span className="kicker">GET IN TOUCH</span><h2>We’re just a call away.</h2><p>Whether you have a quick question or a plumbing project to plan, call D.O.E. Plumbing and tell us what you need.</p><a className="contact-number" href={tel}><Icon name="phone" size={26} /> {phone}</a><span className="contact-hint">Tap to call from your phone</span></div><div className="contact-card"><h3>Find D.O.E. Plumbing</h3><div className="contact-detail"><span><Icon name="pin" size={23} /></span><div><strong>Our Laramie location</strong><p>3708 E Grand Ave<br />Laramie, WY 82070</p><a href={map} target="_blank" rel="noopener noreferrer">Get directions <Icon name="arrow" size={16} /></a></div></div><div className="contact-detail"><span><Icon name="clock" size={23} /></span><div><strong>Planning a visit?</strong><p>Public listings show weekday business hours. Please call to confirm today’s hours and service availability.</p></div></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-main"><div><Logo light /><p>Practical plumbing help for Laramie homes and businesses.</p></div><div className="footer-links"><strong>Explore</strong><a href="#services">Services</a><a href="#about">About</a><a href="#reviews">Reviews</a></div><div className="footer-links"><strong>Reach us</strong><a href={tel}>{phone}</a><a href={map} target="_blank" rel="noopener noreferrer">3708 E Grand Ave<br />Laramie, WY 82070</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} D.O.E. Plumbing. Laramie, Wyoming.</span><a href="#top">Back to top ↑</a></div></footer>
  </div>
}
export default App
