import type { Metadata } from "next";
import { DonationPanel } from "../donation-panel";
import { InteriorHero, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = { title: "Donate | Grassroots MI", description: "Support community organizing and civic participation across Michigan." };

export default function DonatePage() {
  return <main><SiteHeader />
    <InteriorHero eyebrow="Fuel the movement" title="Small donations. Big" accent="community power." intro="Grassroots MI runs on people who believe every community deserves representation, rights, and the opportunity to thrive." tone="orange" video="/media/video/donate-wheat-sunset.mp4?v=20260814" poster="/media/video/posters/donate-wheat-sunset-poster.webp?v=20260814" imageAlt="A field of wheat glowing in the evening sun." />
    <section className="donate-section section"><div className="donate-copy"><p className="eyebrow">What your support makes possible</p><h2>Invest in organized communities.</h2><p>Contributions can help local chapters reach residents, host events, train volunteers, create multilingual civic resources, and sustain issue campaigns across Michigan.</p><div className="donate-use"><span>Local organizing</span><span>Civic education</span><span>Volunteer training</span><span>Community events</span></div><p className="fine-print">Final legal disclosure, tax status, payment processor, and contribution language must be confirmed by Grassroots MI before public fundraising begins.</p></div><div className="donate-methods"><DonationPanel /><div className="zelle-card"><div className="zelle-head"><span className="zelle-badge">Zelle</span><strong>Donate via Zelle</strong></div><p>Send to <b>@AMLCMI</b> in your bank&apos;s Zelle, or scan the code below.</p><img className="zelle-qr" src="/media/images/zelle-amlc-qr.png?v=20260814" alt="Zelle QR code to donate to American Muslim Leadership Council at handle @AMLCMI" width={240} height={240} decoding="async" /><small>American Muslim Leadership Council · @AMLCMI</small></div></div></section>
    <section className="belief-band section"><p className="eyebrow light">People-powered</p><h2>Build power.<br />Build representation.<br /><span>Build Michigan.</span></h2></section>
    <SiteFooter />
  </main>;
}
