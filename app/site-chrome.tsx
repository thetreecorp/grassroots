import Link from "next/link";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="campaign-bar">
        <span>Drive for 75</span>
        <strong>Every community. Every voice.</strong>
        <a href="/drive-for-75">Take the pledge <span aria-hidden="true">→</span></a>
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Grassroots MI home">
          <span className="brand-mark" aria-hidden="true">MI</span>
          <span className="brand-name">Grassroots <b>MI</b></span>
        </Link>
        <nav aria-label="Primary navigation">
          <a href="/about">About</a>
          <a href="/priorities">Our Priorities</a>
          <a href="/chapters">Chapters</a>
          <a href="/drive-for-75">Drive for 75</a>
          <a href="/events">Events</a>
        </nav>
        <div className="header-actions">
          <a className="donate-link" href="/donate">Donate</a>
          <a className="button button-small button-orange" href="/get-involved">Join us <span aria-hidden="true">↗</span></a>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <div>
            <a href="/about">About</a><a href="/priorities">Our Priorities</a><a href="/chapters">Chapters</a><a href="/drive-for-75">Drive for 75</a><a href="/clean-water">Clean Water</a><a href="/events">Events</a><a href="/get-involved">Get Involved</a><a href="/become-a-captain">Become a Captain</a><a href="/donate">Donate</a>
          </div>
        </details>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">MI</span>
          <span className="brand-name">Grassroots <b>MI</b></span>
        </Link>
        <p>Building youth leadership, community power, representation, and a stronger voice across Michigan.</p>
        <strong>Be seen. Be heard. Be represented.</strong>
      </div>
      <div className="footer-links">
        <div><span>Movement</span><a href="/about">About us</a><a href="/priorities">Our priorities</a><a href="/clean-water">Clean water</a></div>
        <div><span>Take action</span><a href="/chapters">Find a chapter</a><a href="/get-involved">Volunteer</a><a href="/become-a-captain">Become a Captain</a><a href="/drive-for-75">Drive for 75</a></div>
        <div><span>Connect</span><a href="/events">Events & news</a><a href="/get-involved">Contact</a><a href="/donate">Donate</a></div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Grassroots MI</span>
        <span>Nonpartisan · Youth-led · Community-powered</span>
        <span>Privacy · Accessibility</span>
      </div>
    </footer>
  );
}

export function InteriorHero({ eyebrow, title, accent, intro, tone = "dark", image, imageAlt = "", imagePosition = "center" }: { eyebrow: string; title: string; accent?: string; intro: string; tone?: "dark" | "orange" | "gold"; image?: string; imageAlt?: string; imagePosition?: string }) {
  return (
    <section className={`interior-hero interior-${tone}`} id="main-content">
      <div>
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}{accent && <> <span>{accent}</span></>}</h1>
        <p>{intro}</p>
      </div>
      <div className={`interior-art${image ? " interior-photo" : ""}`} aria-hidden={image ? undefined : "true"}>
        {image ? <img src={image} alt={imageAlt} style={{ objectPosition: imagePosition }} /> : <span>MI</span>}
        <i>{image ? "Community in action" : "Community power"}</i>
      </div>
    </section>
  );
}

export function PageCTA({ eyebrow = "Take your next step", title, copy, primary = "Get involved", primaryHref = "/get-involved", secondary = "Find a chapter", secondaryHref = "/chapters" }: { eyebrow?: string; title: string; copy: string; primary?: string; primaryHref?: string; secondary?: string; secondaryHref?: string }) {
  return (
    <section className="page-cta section">
      <div><p className="eyebrow light">{eyebrow}</p><h2>{title}</h2></div>
      <div><p>{copy}</p><div className="cta-actions"><a className="button button-gold" href={primaryHref}>{primary} →</a><a className="text-link light-link" href={secondaryHref}>{secondary} ↗</a></div></div>
    </section>
  );
}
