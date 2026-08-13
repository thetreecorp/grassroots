import type { Metadata } from "next";
import { InteriorHero, PageCTA, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = { title: "About Us | Grassroots MI", description: "Meet the youth-led, community-powered movement building representation, rights, and opportunity across Michigan." };

export default function AboutPage() {
  return <main><SiteHeader />
    <InteriorHero eyebrow="About Grassroots MI" title="Represented. Empowered." accent="Unstoppable." intro="Grassroots MI is a statewide movement powered by a new generation of leaders, building power, representation, and opportunity for people and communities too often left out of the decisions that shape Michigan." image="/media/images/p20-community-discussion-bright-room.webp?v=20260813" imageAlt="Three young women wearing headscarves meeting around a laptop." imagePosition="center" />
    <section className="story-split section">
      <div><p className="eyebrow">Our purpose</p><h2>Young people deserve a seat — and a voice — at the table.</h2></div>
      <div className="prose-large"><p>We develop the next generation of leaders across cities, neighborhoods, campuses, faith communities, and communities throughout Michigan so every voice is heard and everyone&apos;s rights are protected.</p><p>From economic opportunity and civil rights to fair representation and social justice, we believe Michigan is stronger when the people most affected by public decisions have a meaningful role in making them.</p></div>
    </section>
    <section className="values-section section">
      <div className="section-label"><span>What guides us</span><span>Our values</span></div>
      <div className="value-grid">
        <article><span>01</span><h3>Representation</h3><p>Leadership and institutions should reflect the communities they serve.</p></article>
        <article><span>02</span><h3>Dignity</h3><p>Every person deserves equal rights, fair treatment, and respect.</p></article>
        <article><span>03</span><h3>Community Power</h3><p>Lasting progress begins with organized people working together locally.</p></article>
        <article><span>04</span><h3>Opportunity</h3><p>Every community should have the resources and access it needs to thrive.</p></article>
      </div>
    </section>
    <section className="belief-band section"><p className="eyebrow light">What we believe</p><h2>Our presence matters.<br />Our representation matters.<br /><span>Our rights matter.</span></h2></section>
    <section className="network-section section"><div><p className="eyebrow">One Michigan · Many communities</p><h2>Local voices.<br />Statewide strength.</h2></div><div className="network-list"><span>Youth leaders and students</span><span>Neighborhood organizers</span><span>Community leaders</span><span>Parents and families</span><span>Faith and civic partners</span><span>Mentors and intergenerational allies</span></div></section>
    <PageCTA title="Help build what comes next." copy="Whether you are joining for the first time or already organizing in your community, there is a place for you in Grassroots MI." />
    <SiteFooter />
  </main>;
}
