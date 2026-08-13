"use client";

import { FormEvent, useState } from "react";

export function JoinForm({ cities }: { cities: string[] }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="join-success" role="status">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">Thank you for stepping up</p>
        <h3>You&apos;re part of the movement.</h3>
        <p>A Grassroots MI organizer will contact you about the next step in your community.</p>
        <button type="button" className="text-link" onClick={() => setSubmitted(false)}>Submit another response →</button>
      </div>
    );
  }

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>Quick sign-up</span>
        <strong>Get involved in your community</strong>
      </div>
      <div className="field-row">
        <label><span>First name</span><input name="firstName" autoComplete="given-name" required /></label>
        <label><span>Last name</span><input name="lastName" autoComplete="family-name" required /></label>
      </div>
      <label><span>Email address</span><input type="email" name="email" autoComplete="email" required /></label>
      <div className="field-row">
        <label><span>City</span><select name="city" defaultValue="" required><option value="" disabled>Select your city</option>{cities.map((city) => <option key={city}>{city}</option>)}<option>Another community</option></select></label>
        <label><span>ZIP code</span><input name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}(-[0-9]{4})?" required /></label>
      </div>
      <label><span>I&apos;d like to</span><select name="interest" defaultValue="Join my local chapter" required><option>Join my local chapter</option><option>Volunteer</option><option>Attend events</option><option>Take the 75% pledge</option><option>Start a chapter</option></select></label>
      <label className="consent"><input type="checkbox" required /><span>I agree to receive updates from Grassroots MI. I can unsubscribe at any time.</span></label>
      <button className="button button-orange form-submit" type="submit">Count me in <span aria-hidden="true">→</span></button>
      <small>Your information will only be used to connect you with Grassroots MI organizing opportunities.</small>
    </form>
  );
}
