import type { Metadata } from "next";
import { PledgeForm } from "../pledge-form";
import { InteriorHero, PageCTA, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = { title: "Drive for 75 | Grassroots MI", description: "A nonpartisan statewide initiative to reach 75% voter turnout in underrepresented Michigan communities." };

export default function DrivePage() {
  return <main><SiteHeader />
    <InteriorHero eyebrow="Nonpartisan civic engagement" title="75% turnout. Every community." accent="Every voice." intro="Drive for 75 is a statewide Grassroots MI initiative with one ambitious goal: increase voter turnout in underrepresented communities to 75%." tone="orange" image="/media/images/p09-american-muslim-polling-place.webp?v=20260811-2" imageAlt="A woman in a head covering greeting someone while people wait at a polling place." imagePosition="44% center" />
    <section className="goal-section section"><div className="goal-number">75%</div><div><p className="eyebrow">The goal</p><h2>Participation is power.</h2><p>Too many communities have the numbers to make a difference but remain underrepresented in elections and public decision-making. Voting is about presence, representation, and having a voice in decisions that affect our families and communities.</p></div></section>
    <section className="drive-method section"><div className="section-label"><span>How we get there</span><span>Four-part strategy</span></div><div className="method-grid"><article><b>01</b><h2>Educate</h2><p>Make sure voters know when, where, and how to vote.</p></article><article><b>02</b><h2>Mobilize</h2><p>Turn local organizations, leaders, volunteers, and networks into engagement teams.</p></article><article><b>03</b><h2>Reach</h2><p>Connect through events, outreach, calls, texts, social media, and multilingual content.</p></article><article><b>04</b><h2>Remove Barriers</h2><p>Share clear registration, early-voting, voting-option, and access information.</p></article></div></section>
    <section className="pledge-section section"><div className="pledge-copy"><p className="eyebrow light">Make your commitment</p><h2>Take the<br />75% pledge.</h2><p>I pledge to vote — and help my family, friends, and community vote.</p><div className="join-points dark-points"><span>Vote</span><span>Reach others</span><span>Volunteer</span></div></div><PledgeForm /></section>
    <PageCTA eyebrow="Bring the campaign home" title="Mobilize your community." copy="Partner with Drive for 75 through a local chapter, community organization, faith institution, campus, or neighborhood network." primary="Bring Drive for 75" secondary="Find a chapter" />
    <SiteFooter />
  </main>;
}
