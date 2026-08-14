import type { Metadata } from "next";
import { JoinForm } from "../join-form";
import { InteriorHero, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = { title: "Get Involved | Grassroots MI", description: "Join, volunteer, attend, advocate, or start a Grassroots MI chapter." };
const cities = ["Detroit", "Dearborn", "Flint", "Lansing", "Grand Rapids", "Ann Arbor", "Kalamazoo", "Pontiac", "Saginaw", "Marquette", "Traverse City"];
const ways = [{ n:"01", t:"Join a Chapter", c:"Connect with organizers and neighbors already building power in your community." },{ n:"02", t:"Volunteer", c:"Support outreach, events, communications, voter engagement, or campaign work." },{ n:"03", t:"Attend Events", c:"Meet the movement through public meetings, trainings, community events, and actions." },{ n:"04", t:"Advocate", c:"Help communities speak for themselves on representation, rights, equity, and democracy." },{ n:"05", t:"Start a Chapter", c:"Build a local organizing home in a community not yet served by Grassroots MI." },{ n:"06", t:"Lead", c:"Develop your skills and help coordinate people, partnerships, and community action." }];

export default function GetInvolvedPage() {
  return <main><SiteHeader />
    <InteriorHero eyebrow="We are the answer" title="There is a place for" accent="you here." intro="You do not need organizing experience to make a difference. Start with the kind of participation that fits your time, interests, and community." tone="gold" video="/media/video/get-involved-invite.mp4?v=20260814" poster="/media/video/posters/get-involved-invite-poster.webp?v=20260814" imageAlt="A man in a suit gesturing to invite you closer." imagePosition="center" />
    <section className="ways-section section"><div className="section-label"><span>Ways to participate</span><span>Choose your next step</span></div><div className="ways-grid">{ways.map((way) => <article key={way.n}><span>{way.n}</span><h2>{way.t}</h2><p>{way.c}</p><a href="#get-involved-form">I&apos;m interested →</a></article>)}</div></section>
    <section className="join section" id="get-involved-form"><div className="join-copy"><p className="eyebrow">Quick sign-up</p><h2>Step into the<br /><em>movement.</em></h2><p>Share a few details and the Grassroots MI team will connect you with a relevant chapter, campaign, event, or leadership opportunity.</p><div className="join-points"><span>Youth-led</span><span>All generations welcome</span><span>Statewide network</span></div></div><JoinForm cities={cities} /></section>
    <SiteFooter />
  </main>;
}
