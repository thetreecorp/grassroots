"use client";

import { FormEvent, useState } from "react";

const INTERESTS = [
  "Voter engagement",
  "Community organizing",
  "Youth leadership",
  "Events",
  "Outreach",
  "Social media / digital outreach",
  "Volunteer recruitment",
  "Community issues",
  "Other",
];

const REACH_OPTIONS = ["Under 10", "10–25", "26–50", "51–100", "101–250", "250+"];

const HEARD_OPTIONS = [
  "Social media",
  "A friend or family member",
  "A community event",
  "Email or newsletter",
  "A Grassroots MI organizer",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export function CaptainForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — real visitors never fill this hidden field.
    if ((data.get("company") as string)?.trim()) {
      setStatus("success");
      return;
    }

    const interests = data.getAll("interests").map(String);

    const payload = {
      firstName: (data.get("firstName") as string)?.trim() ?? "",
      lastName: (data.get("lastName") as string)?.trim() ?? "",
      email: (data.get("email") as string)?.trim() ?? "",
      phone: (data.get("phone") as string)?.trim() ?? "",
      city: (data.get("city") as string)?.trim() ?? "",
      zip: (data.get("zip") as string)?.trim() ?? "",
      preferredContact: (data.get("preferredContact") as string) ?? "",
      organizingArea: (data.get("organizingArea") as string)?.trim() ?? "",
      affiliation: (data.get("affiliation") as string)?.trim() ?? "",
      estimatedReach: (data.get("estimatedReach") as string) ?? "",
      interests,
      motivation: (data.get("motivation") as string)?.trim() ?? "",
      heardAbout: (data.get("heardAbout") as string) ?? "",
      nonpartisanAgreement: data.get("nonpartisanAgreement") === "on",
      wantsUpdates: data.get("wantsUpdates") === "on",
      website: (data.get("company") as string) ?? "",
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/captain-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "We couldn't submit your application. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn't submit your application. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="captain-success" role="status">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">Application received!</p>
        <h3>Thank you for stepping forward to lead.</h3>
        <p>A member of the Grassroots MI team will review your information and contact you soon.</p>
        <button type="button" className="text-link" onClick={() => setStatus("idle")}>Submit another application →</button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="captain-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <span>Captain application</span>
        <strong>Ready to lead?</strong>
        <p style={{ margin: 0, textTransform: "none", fontWeight: 500, letterSpacing: "normal", fontSize: ".85rem", color: "#3d423f" }}>
          Tell us a little about yourself and the community you want to organize.
        </p>
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">{errorMessage}</p>
      )}

      {/* Honeypot field — hidden from real visitors, left blank by them */}
      <label className="honeypot-field" aria-hidden="true">
        <span>Company</span>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="field-row">
        <label><span>First name *</span><input name="firstName" autoComplete="given-name" required /></label>
        <label><span>Last name *</span><input name="lastName" autoComplete="family-name" required /></label>
      </div>
      <div className="field-row">
        <label><span>Email address *</span><input type="email" name="email" autoComplete="email" required /></label>
        <label><span>Phone number *</span><input type="tel" name="phone" autoComplete="tel" required /></label>
      </div>
      <div className="field-row">
        <label><span>City *</span><input name="city" autoComplete="address-level2" required /></label>
        <label><span>ZIP code *</span><input name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}(-[0-9]{4})?" required /></label>
      </div>

      <fieldset>
        <legend>Preferred method of communication</legend>
        <div className="radio-group">
          {["Text", "Phone", "Email", "WhatsApp"].map((option) => (
            <label key={option}>
              <input type="radio" name="preferredContact" value={option} defaultChecked={option === "Text"} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label><span>What community or area would you like to organize?</span><textarea name="organizingArea" rows={3} /></label>
      <label><span>Are you affiliated with a community organization, school, faith institution, business, neighborhood association, or other group?</span><textarea name="affiliation" rows={3} /></label>

      <label><span>Approximately how many people do you believe you could reach?</span>
        <select name="estimatedReach" defaultValue="">
          <option value="" disabled>Select a range</option>
          {REACH_OPTIONS.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>

      <fieldset>
        <legend>What interests you most?</legend>
        <div className="checkbox-grid">
          {INTERESTS.map((interest) => (
            <label key={interest}>
              <input type="checkbox" name="interests" value={interest} />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label><span>Tell us why you would like to become a Grassroots MI Captain.</span><textarea name="motivation" rows={4} /></label>

      <label><span>How did you hear about Grassroots MI?</span>
        <select name="heardAbout" defaultValue="">
          <option value="" disabled>Select an option</option>
          {HEARD_OPTIONS.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>

      <label className="consent"><input type="checkbox" name="nonpartisanAgreement" required /><span>I understand that Grassroots MI is a nonpartisan organization and agree to represent its work accordingly.</span></label>
      <label className="consent"><input type="checkbox" name="wantsUpdates" /><span>I would like to receive Grassroots MI updates.</span></label>

      <button className="button button-orange form-submit" type="submit" aria-busy={submitting} disabled={submitting}>
        {submitting ? "Submitting…" : <>Apply to Become a Captain <span aria-hidden="true">→</span></>}
      </button>
      <small>Your information will only be used to review your Grassroots MI Captain application and follow up with you.</small>
    </form>
  );
}
