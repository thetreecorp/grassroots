import type { Metadata } from "next";
import { InteriorHero, PageCTA, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = { title: "Our Priorities | Grassroots MI", description: "The representation, rights, opportunity, and democracy priorities of Grassroots MI." };

const issues = [
  { n: "01", title: "Representation That Reflects Michigan", problem: "Too many communities are affected by public decisions without meaningful representation in the rooms where those decisions are made.", focus: ["Inclusive public leadership", "Representative boards and commissions", "Community voices in decision-making"] },
  { n: "02", title: "Equal Rights & Protection", problem: "No one should face discrimination because of race, ethnicity, faith, national origin, or background.", focus: ["Strong civil-rights protections", "Equal treatment and access", "Accountability when rights are violated"] },
  { n: "03", title: "Economic Opportunity & Equity", problem: "Historically underserved communities continue to face barriers to jobs, education, entrepreneurship, housing, and generational stability.", focus: ["Good jobs and education", "Entrepreneurship and local investment", "Fair access to housing and opportunity"] },
  { n: "04", title: "A Voice in Our Democracy", problem: "Communities should not simply be spoken about — they should be heard, engaged, and represented.", focus: ["Voter education and participation", "Civic leadership development", "Community organizing and advocacy"] },
];

export default function PrioritiesPage() {
  return <main><SiteHeader />
    <InteriorHero eyebrow="What we're fighting for" title="A Michigan that works for" accent="everyone." intro="Our priorities are rooted in dignity, fairness, representation, and the belief that every community should have an equal opportunity to thrive." tone="orange" image="/media/images/p03-volunteer-meeting-applause.webp?v=20260811-2" imageAlt="A woman speaking as people around a meeting table applaud." />
    <section className="issue-stack section">
      {issues.map((issue) => <article className="issue-detail" key={issue.n}><div className="issue-title"><span>{issue.n}</span><h2>{issue.title}</h2></div><div><p>{issue.problem}</p><h3>What we organize for</h3><ul>{issue.focus.map((item) => <li key={item}>{item}</li>)}</ul><a className="text-link" href="/get-involved">Take action →</a></div></article>)}
    </section>
    <section className="campaign-callout section"><div><p className="eyebrow">Independent issue campaign</p><h2>Clean Water &<br />Healthy Communities</h2></div><div><p>Our Flint-rooted campaign focuses on safe drinking water, infrastructure accountability, and healthy neighborhoods across Michigan.</p><a className="button button-dark" href="/clean-water">Explore the campaign →</a></div></section>
    <PageCTA title="Turn priorities into progress." copy="Choose the issue that matters to you and connect with a local chapter or statewide campaign." />
    <SiteFooter />
  </main>;
}
