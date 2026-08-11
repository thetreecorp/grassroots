import { JoinForm } from "./join-form";
import { MediaStory } from "./media-story";
import { SiteFooter, SiteHeader } from "./site-chrome";

const priorities = [
  {
    number: "01",
    title: "Representation That Reflects Michigan",
    copy: "Our institutions and leadership should reflect the communities they serve — with a real voice in the decisions that shape our lives.",
  },
  {
    number: "02",
    title: "Equal Rights & Protection",
    copy: "We advocate for strong civil-rights protections, equal treatment, and accountability — regardless of race, ethnicity, faith, origin, or background.",
  },
  {
    number: "03",
    title: "Economic Opportunity & Equity",
    copy: "Good jobs, education, entrepreneurship, housing, and opportunity should be within reach for every Michigan community.",
  },
  {
    number: "04",
    title: "A Voice in Our Democracy",
    copy: "Communities should not simply be spoken about. They should be heard, engaged, and represented wherever decisions are made.",
  },
];

const cities = [
  "Detroit",
  "Dearborn",
  "Flint",
  "Lansing",
  "Grand Rapids",
  "Ann Arbor",
  "Kalamazoo",
  "Pontiac",
  "Saginaw",
  "Marquette",
  "Traverse City",
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-grid" id="main-content">
          <div className="hero-copy">
            <p className="eyebrow light">Youth-led · Community-powered · Michigan-wide</p>
            <h1>
              Represented.<br />
              <span>Empowered.</span><br />
              Unstoppable.
            </h1>
            <p className="hero-intro">
              Grassroots MI is a youth-led movement building community power, representation, and opportunity across Michigan — with every generation invited to take part.
            </p>
            <div className="hero-actions">
              <a className="button button-orange" href="#join">Count me in <span aria-hidden="true">→</span></a>
              <a className="text-link light-link" href="#chapters">Find my local chapter <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="hero-art hero-photo-art">
            <picture>
              <source media="(max-width: 760px)" srcSet="/media/images/p17-hero-alternative-mobile.webp?v=20260811-2" />
              <img src="/media/images/p17-hero-alternative-desktop.webp?v=20260811-2" alt="People of several ages sitting together and smiling in a sunny park." fetchPriority="high" />
            </picture>
            <div className="hero-photo-shade" aria-hidden="true" />
            <div className="hero-stamp">
              <span>Youth-led</span>
              <strong>Michigan</strong>
              <strong>Rising</strong>
            </div>
            <p className="hero-note">Young people lead. Every generation belongs. Every community has a voice.</p>
          </div>
        </div>
        <div className="city-ticker" aria-label="Communities across Michigan">
          <span>Detroit</span><i>✦</i><span>Dearborn</span><i>✦</i><span>Flint</span><i>✦</i><span>Lansing</span><i>✦</i><span>Grand Rapids</span><i>✦</i><span>Ann Arbor</span><i>✦</i><span>Your Community</span>
        </div>
      </section>

      <section className="manifesto section" id="about">
        <div className="section-label">
          <span>About Grassroots MI</span>
          <span>Statewide · Youth-led · Intergenerational</span>
        </div>
        <div className="manifesto-grid">
          <h2>We are the<br /><em>people&apos;s</em><br />movement.</h2>
          <div className="manifesto-copy">
            <figure className="manifesto-photo"><img src="/media/images/p20-community-discussion-bright-room.webp?v=20260811-2" alt="Four adults seated in a circle during a discussion in a bright room." decoding="async" /><figcaption>Listen locally. Organize together. Lead forward.</figcaption></figure>
            <p className="lead">We equip young people to organize across cities and communities so every voice is heard, every community is represented, and everyone&apos;s rights are protected.</p>
            <p>From economic opportunity and civil rights to fair representation and social justice, Michigan is stronger when communities that have too often been left out have a seat at the table.</p>
            <a className="text-link" href="/about">Meet the movement <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="statement-band">
          <span>Our presence matters.</span>
          <span>Our representation matters.</span>
          <span>Our rights matter.</span>
        </div>
      </section>

      <section className="video-story section" id="video">
        <div className="video-heading">
          <div><p className="eyebrow light">Grassroots MI in motion</p><h2>See the energy.<br /><em>Join the future.</em></h2></div>
          <p>A youth-first movement grows through friendship, collaboration, service, and civic action. Explore a few moments that reflect the kind of welcoming community we are building across Michigan.</p>
        </div>
        <MediaStory />
      </section>

      <section className="priorities section" id="priorities">
        <div className="section-label">
          <span>What we&apos;re fighting for</span>
          <span>Our demands</span>
        </div>
        <div className="section-heading-row">
          <h2>A Michigan that<br />works for <em>everyone.</em></h2>
          <p>Bold, practical priorities rooted in dignity, fairness, representation, and opportunity.</p>
        </div>
        <div className="priority-list">
          {priorities.map((priority) => (
            <article className="priority-card" key={priority.number}>
              <span className="priority-number">{priority.number}</span>
              <h3>{priority.title}</h3>
              <p>{priority.copy}</p>
              <a href="/priorities" aria-label={`Explore ${priority.title}`}>Explore <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="water-campaign section" id="clean-water">
        <div className="water-mark" aria-hidden="true">WATER</div>
        <div className="water-copy">
          <p className="eyebrow">Independent campaign · Flint and beyond</p>
          <h2>Clean Water.<br />Healthy Communities.</h2>
          <p>No community should have to fight for safe drinking water. This independent Grassroots MI campaign connects Flint&apos;s continuing story to infrastructure, accountability, and public health across the state.</p>
          <div className="campaign-actions">
            <a className="button button-dark" href="/clean-water">Stand with Flint <span aria-hidden="true">→</span></a>
            <span>Explore the campaign</span>
          </div>
        </div>
        <div className="water-facts" aria-label="Campaign focus areas">
          <img className="water-photo" src="/media/images/p15-environmental-engineer-water-testing.webp?v=20260811-2" alt="A worker in safety equipment examining a water sample beside a river." decoding="async" />
          <span>01 <strong>Safe water</strong></span>
          <span>02 <strong>Accountability</strong></span>
          <span>03 <strong>Healthy neighborhoods</strong></span>
        </div>
      </section>

      <section className="chapters section" id="chapters">
        <div className="chapters-intro">
          <p className="eyebrow light">Statewide organizing</p>
          <h2>Change starts<br />where you live.</h2>
          <p>Find your community and connect with people organizing locally. Don&apos;t see your city? We&apos;ll help you start a chapter.</p>
          <a className="button button-gold" href="#join">Start a chapter <span aria-hidden="true">→</span></a>
        </div>
        <div className="chapter-map chapter-photo">
          <img src="/media/images/p02-neighborhood-meeting-community-center.webp?v=20260811-2" alt="Adults of several ages seated together at a community-center presentation." decoding="async" />
          <p className="map-label">Find your place in the movement</p>
        </div>
        <div className="city-list" aria-label="Local chapter cities">
          {cities.map((city, index) => (
            <a href="#join" key={city}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{city}</strong>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
          <a className="your-city" href="#join">
            <span>+</span><strong>Your City</strong><i aria-hidden="true">→</i>
          </a>
        </div>
      </section>

      <section className="drive section" id="drive-75">
        <img className="drive-photo" src="/media/images/p09-american-muslim-polling-place.webp?v=20260811-2" alt="A woman in a head covering greeting someone while people wait at a polling place." decoding="async" />
        <div className="drive-number" aria-hidden="true">75</div>
        <div className="drive-content">
          <p className="eyebrow light">Nonpartisan civic engagement</p>
          <h2><span>75%</span> turnout.<br />Every community.<br />Every voice.</h2>
          <p>Drive for 75 is a statewide initiative to educate, mobilize, reach voters, and remove barriers to participation in underrepresented communities.</p>
          <div className="drive-actions">
            <a className="button button-cream" href="/drive-for-75">Take the 75% pledge <span aria-hidden="true">→</span></a>
            <a className="text-link light-link" href="/drive-for-75">Bring it to my community <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="drive-steps">
          <span><b>01</b> Educate</span>
          <span><b>02</b> Mobilize</span>
          <span><b>03</b> Reach</span>
          <span><b>04</b> Remove barriers</span>
        </div>
      </section>

      <section className="join section" id="join">
        <div className="join-copy">
          <p className="eyebrow">We are the answer</p>
          <h2>There&apos;s a place<br />for <em>you</em> here.</h2>
          <p>Join a chapter, volunteer, attend an event, support a campaign, or help organize your community. Tell us where you&apos;d like to begin.</p>
          <div className="join-points">
            <span>Youth-led</span>
            <span>All generations welcome</span>
            <span>Statewide network</span>
            <span>Many ways to help</span>
          </div>
        </div>
        <JoinForm cities={cities} />
      </section>

      <SiteFooter />
    </main>
  );
}
