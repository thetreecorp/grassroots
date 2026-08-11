import type { Metadata } from "next";
import { JoinForm } from "../join-form";
import { InteriorHero, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = { title: "Local Chapters | Grassroots MI", description: "Find or start a Grassroots MI chapter in your Michigan community." };
const cities = ["Detroit", "Dearborn", "Flint", "Lansing", "Grand Rapids", "Ann Arbor", "Kalamazoo", "Pontiac", "Saginaw", "Marquette", "Traverse City"];

export default function ChaptersPage() {
  return <main><SiteHeader />
    <InteriorHero eyebrow="Statewide organizing" title="Change starts where" accent="you live." intro="Find your community and connect with a local organizing network. If Grassroots MI is not active near you yet, we will help you take the first step." image="/media/images/p02-neighborhood-meeting-community-center.webp?v=20260811-2" imageAlt="Adults of several ages seated together at a community-center presentation." />
    <section className="chapter-directory section">
      <div className="directory-intro"><p className="eyebrow">Find your local chapter</p><h2>One state.<br />Many communities.</h2><p>Choose your city to start the same local chapter form with your community in mind.</p></div>
      <div className="directory-map"><span aria-hidden="true">MI</span><p>Community power across Michigan</p></div>
      <div className="directory-list">{cities.map((city, i) => <a key={city} href="#chapter-form"><span>{String(i + 1).padStart(2,"0")}</span><strong>{city}</strong><i>Join ↗</i></a>)}<a className="directory-new" href="#chapter-form"><span>+</span><strong>Your community</strong><i>Start ↗</i></a></div>
    </section>
    <section className="chapter-options section"><div className="section-label"><span>Two ways to begin</span><span>Choose your path</span></div><div className="option-grid"><article><span>01</span><h2>Join a local chapter</h2><p>Meet people in your area, attend events, volunteer, and support the issues your community cares about.</p><a className="text-link" href="#chapter-form">Join near me →</a></article><article><span>02</span><h2>Start a chapter</h2><p>Bring Grassroots MI to your city and help create a stronger voice for underrepresented communities.</p><a className="text-link" href="/get-involved">Start organizing →</a></article></div></section>
    <section className="join section" id="chapter-form"><div className="join-copy"><p className="eyebrow">Local chapter form</p><h2>Get involved in<br /><em>your community.</em></h2><p>Tell us where you live and how you would like to participate. Our team will connect you with the right local next step.</p><div className="join-points"><span>Youth-led</span><span>All generations welcome</span><span>No experience required</span></div></div><JoinForm cities={cities} /></section>
    <SiteFooter />
  </main>;
}
