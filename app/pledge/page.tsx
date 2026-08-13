import type { Metadata } from "next";
import { PledgeIntakeForm } from "./pledge-intake-form";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "75% Pledge | Grassroots MI",
  description:
    "Take the 75% Pledge — a nonpartisan Grassroots MI civic-engagement initiative to increase voter participation across Michigan.",
};

export default function PledgePage() {
  return (
    <main>
      <SiteHeader />

      <section className="pledge-hero section" id="main-content">
        <div className="pledge-hero-copy">
          <p className="eyebrow light">Make your commitment</p>
          <h1>Take the<br /><span>75% Pledge.</span></h1>
          <p className="pledge-hero-lede">I pledge to vote — and help my family, friends, and community vote.</p>
          <p className="pledge-hero-intro">
            The 75% Pledge is a nonpartisan Grassroots MI civic-engagement initiative working to increase voter
            participation by activating families, neighborhoods, faith communities, campuses, and communities across
            Michigan.
          </p>
          <div className="hero-actions">
            <a className="button button-orange" href="#pledge-form">Take the pledge <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="pledge-hero-mark" aria-hidden="true">75<i>%</i></div>
      </section>

      <section className="pledge-form-section section" id="pledge-form">
        <div className="pledge-form-intro">
          <p className="eyebrow">The pledge</p>
          <h2>I will vote — and help my community vote.</h2>
          <p>Start with yourself. Reach your household. Then help others in your community participate.</p>
        </div>
        <PledgeIntakeForm />
      </section>

      <SiteFooter />
    </main>
  );
}
