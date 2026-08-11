"use client";
import { useState } from "react";

export function DonationPanel() {
  const [amount, setAmount] = useState("25");
  const [notice, setNotice] = useState(false);
  return <div className="donation-panel"><div className="form-heading"><span>Choose an amount</span><strong>Fuel community power</strong></div><div className="amount-grid">{["10","25","50","100"].map(v => <button type="button" className={amount === v ? "active" : ""} onClick={() => { setAmount(v); setNotice(false); }} key={v}>${v}</button>)}<button type="button" className={amount === "other" ? "active" : ""} onClick={() => { setAmount("other"); setNotice(false); }}>Other</button></div>{amount === "other" && <label className="custom-amount"><span>Custom amount</span><input type="number" min="1" placeholder="$" /></label>}<label className="consent donation-consent"><input type="checkbox" /><span>Make this a monthly contribution</span></label><button className="button button-orange form-submit" type="button" onClick={() => setNotice(true)}>Continue to secure giving →</button>{notice && <p className="payment-notice" role="status">This design is ready to connect to Grassroots MI&apos;s approved donation processor before public launch.</p>}<small>No payment is collected in this design version.</small></div>;
}
