"use client";
import { useState } from "react";
import { ZEFFY_DONATE_URL } from "./links";

export function DonationPanel() {
  const [amount, setAmount] = useState("25");
  return <div className="donation-panel"><div className="form-heading"><span>Choose an amount</span><strong>Fuel community power</strong></div><div className="amount-grid">{["10","25","50","100"].map(v => <button type="button" className={amount === v ? "active" : ""} onClick={() => setAmount(v)} key={v}>${v}</button>)}<button type="button" className={amount === "other" ? "active" : ""} onClick={() => setAmount("other")}>Other</button></div>{amount === "other" && <label className="custom-amount"><span>Custom amount</span><input type="number" min="1" placeholder="$" /></label>}<label className="consent donation-consent"><input type="checkbox" /><span>Make this a monthly contribution</span></label><a className="button button-orange form-submit" href={ZEFFY_DONATE_URL} target="_blank" rel="noopener noreferrer">Donate securely on Zeffy <span aria-hidden="true">↗</span></a><small>You&apos;ll choose your amount and complete your donation securely on Zeffy, our donation partner.</small></div>;
}
