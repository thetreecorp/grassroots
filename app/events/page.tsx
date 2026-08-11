import type { Metadata } from "next";
import { PageCTA, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = { title: "Events & News | Grassroots MI", description: "Community events, campaign updates, civic resources, and Grassroots MI stories." };

export default function EventsPage() {
  return <main><SiteHeader />
    <section className="editorial-hero editorial-photo-hero" id="main-content"><img src="/media/images/p18-volunteers-outdoors.webp?v=20260811-2" alt="Volunteers working together outdoors." fetchPriority="high" /><div><p className="eyebrow light">Events & news</p><h1>Michigan is<br /><span>showing up.</span></h1><p>Follow community stories, campaign updates, public events, trainings, and civic resources from across the Grassroots MI network.</p></div></section>
    <section className="editorial-feature section"><div className="feature-visual feature-photo"><img src="/media/images/p03-volunteer-meeting-applause.webp?v=20260811-2" alt="A woman speaking as people around a meeting table applaud." decoding="async" /><span>UP NEXT</span><strong>Community calendar</strong></div><div><p className="eyebrow">Upcoming events</p><h2>A statewide calendar is coming.</h2><p>Once dates and locations are approved, this area will feature public meetings, volunteer trainings, chapter events, campaign actions, and civic-engagement opportunities.</p><a className="button button-dark" href="/get-involved">Get event updates →</a></div></section>
    <section className="news-section section"><div className="section-label"><span>The latest</span><span>Verified stories only</span></div><div className="news-grid"><article className="news-lead"><span>Community Stories</span><h2>Meet the people building a stronger Michigan.</h2><p>Member profiles and chapter stories will appear here when approved for publication.</p></article><article><span>Campaign Updates</span><h2>Follow the work.</h2><p>Progress from Drive for 75, clean-water organizing, and local issue campaigns.</p></article><article><span>Civic Resources</span><h2>Know how to act.</h2><p>Clear, nonpartisan guides for participation, voter access, and community advocacy.</p></article></div></section>
    <section className="newsletter section"><div><p className="eyebrow light">Stay informed</p><h2>Get Michigan community news.</h2></div><form><label><span>Email address</span><input type="email" required placeholder="you@example.com" /></label><label><span>ZIP code</span><input inputMode="numeric" required placeholder="48201" /></label><button className="button button-gold" type="submit">Sign me up →</button></form></section>
    <PageCTA title="Do more than follow the movement." copy="Join a chapter or volunteer to help create the next community story." />
    <SiteFooter />
  </main>;
}
