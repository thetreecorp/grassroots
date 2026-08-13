import type { Metadata } from "next";
import { CaptainForm } from "./captain-form";
import { PageCTA, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Become a Captain | Grassroots MI",
  description: "Grassroots MI Captains are local volunteer leaders who bring people together, build relationships, and turn community energy into action.",
};

const responsibilities = [
  { n: "01", title: "Build Your Network", copy: "Identify and connect with friends, family, neighbors, students, community members, and local leaders." },
  { n: "02", title: "Mobilize Your Community", copy: "Encourage people to participate in civic activities, community events, voter education, and Grassroots MI initiatives." },
  { n: "03", title: "Share Information", copy: "Help distribute accurate information, digital content, event announcements, and campaign materials." },
  { n: "04", title: "Organize Locally", copy: "Help organize meetings, community events, volunteer activities, canvassing, phone banking, or other grassroots efforts when appropriate." },
  { n: "05", title: "Recruit Volunteers", copy: "Bring new people into the movement and identify others who may be ready to lead." },
  { n: "06", title: "Listen & Report Back", copy: "Tell Grassroots MI what people in your community care about, what barriers they face, and what support they need." },
];

const provided = [
  "Training and organizing resources",
  "Digital and printed materials",
  "Grassroots MI messaging and updates",
  "Volunteer recruitment support",
  "Access to statewide organizers",
  "Opportunities to participate in leadership meetings",
  "Tools to help organize your community",
  "A statewide network of other Grassroots MI Captains",
];

const qualities = [
  "Reliable",
  "Connected to their community",
  "Comfortable talking with people",
  "Willing to recruit others",
  "Able to communicate by phone, text, WhatsApp, email, or social media",
  "Committed to nonpartisan civic engagement",
  "Ready to help build long-term community power",
];

export default function BecomeACaptainPage() {
  return (
    <main>
      <SiteHeader />

      <section className="interior-hero interior-dark interior-photo" id="main-content">
        <div>
          <p className="eyebrow light">Grassroots MI · Local Leadership</p>
          <h1>Become a <span>Captain.</span></h1>
          <p className="lede">Lead your community. Build your team. Make sure every voice is heard.</p>
          <p>Grassroots MI Captains are local volunteer leaders who bring people together, build relationships, and help turn community energy into action. You don&apos;t need political experience — you need a commitment to your community and a willingness to lead.</p>
          <div className="hero-actions">
            <a className="button button-orange" href="#apply">Apply to Become a Captain <span aria-hidden="true">→</span></a>
            <a className="text-link light-link" href="#what-captains-do">What Captains Do <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="interior-art interior-photo">
          <img src="/media/images/p10-women-meeting-city.webp?v=20260812-1" alt="Community leaders meeting together to organize locally." />
          <i>Local leadership in action</i>
        </div>
      </section>

      <section className="network-section section" id="what-is-a-captain">
        <div>
          <p className="eyebrow">What is a Captain?</p>
          <h2>Local leadership starts<br />with <em>you.</em></h2>
        </div>
        <div className="prose-large">
          <p>A Grassroots MI Captain serves as a point person in their neighborhood, community, school, campus, mosque, church, organization, or social network.</p>
          <p>Captains help us reach people where they already are — through trusted relationships.</p>
          <p>Whether you can organize 10 people or 1,000, your role is to help your community stay informed, connected, represented, and engaged.</p>
        </div>
      </section>

      <section className="ways-section section" id="what-captains-do">
        <div className="section-label"><span>Captain responsibilities</span><span>What Captains do</span></div>
        <div className="ways-grid">
          {responsibilities.map((item) => (
            <article key={item.n}>
              <span>{item.n}</span>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="network-section section">
        <div>
          <p className="eyebrow">You lead. We support you.</p>
          <h2>You lead.<br />We support<br /><em>you.</em></h2>
        </div>
        <div className="network-list">
          {provided.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="story-split section">
        <div>
          <p className="eyebrow">Who should apply?</p>
          <h2>You don&apos;t need a title to be a leader.</h2>
        </div>
        <div className="prose-large">
          <p>We&apos;re looking for people who care about their communities and are willing to bring others together.</p>
          <div className="join-points">
            {qualities.map((quality) => <span key={quality}>{quality}</span>)}
          </div>
          <p style={{ marginTop: "1.6rem" }}>All generations are welcome. No previous organizing or political experience is required.</p>
        </div>
      </section>

      <section className="editorial-feature section">
        <div className="feature-visual">
          <i aria-hidden="true">MI</i>
          <span>Flexible by design</span>
          <strong>Built for real life.</strong>
        </div>
        <div>
          <p className="eyebrow">Time commitment</p>
          <h2>Built for<br />real life.</h2>
          <p>Captain roles are flexible. Some Captains may lead an entire city or organization, while others may organize a neighborhood, campus, congregation, or personal network.</p>
          <p>Even a few hours each month can make a difference, with greater activity around major community initiatives and elections.</p>
        </div>
      </section>

      <section className="join section" id="apply">
        <div className="join-copy">
          <p className="eyebrow">Application</p>
          <h2>Ready to<br /><em>lead?</em></h2>
          <p>Tell us a little about yourself and the community you want to organize.</p>
          <div className="join-points">
            <span>Youth-led</span>
            <span>All generations welcome</span>
            <span>No experience required</span>
          </div>
        </div>
        <CaptainForm />
      </section>

      <PageCTA
        eyebrow="Not ready to apply yet?"
        title="Every kind of involvement helps."
        copy="Volunteer, attend an event, or join your local chapter — there are many ways to build community power with Grassroots MI."
        primary="Get involved"
        primaryHref="/get-involved"
        secondary="Find a chapter"
        secondaryHref="/chapters"
      />

      <SiteFooter />
    </main>
  );
}
