"use client";

import { FormEvent, useState } from "react";

const LANGUAGES = ["English", "Arabic", "Bengali", "Spanish", "Urdu", "Other"];
const AGE_RANGES = ["18–24", "25–34", "35–49", "50–64", "65+"];
const YNU = ["Yes", "No", "Undecided"];
const YNN = ["Yes", "No", "Not Sure"];
const CONTACT_METHODS = ["Text", "Phone", "Email", "WhatsApp"];
const VOTING_METHODS = ["Election Day", "Early In-Person", "Absentee / Vote by Mail", "Not Sure"];
const INFO_OPTIONS = [
  "Registering to vote",
  "Absentee voting",
  "Early voting",
  "Election Day voting",
  "Finding my polling location",
];
const VOLUNTEER_ACTIVITIES = [
  "Phone banking",
  "Texting",
  "Door knocking / canvassing",
  "Mosque / community outreach",
  "Events",
  "Social media",
  "Data entry",
  "Recruiting friends and family",
  "Transportation / rides to the polls",
  "Other",
];
const ORG_TYPES = [
  "Mosque / faith community",
  "Community organization",
  "School / campus",
  "Business",
  "Neighborhood association",
  "Other",
  "None",
];

type Member = { firstName: string; lastName: string; ageRange: string; registered: string; plans: string };
const blankMember = (): Member => ({ firstName: "", lastName: "", ageRange: "", registered: "", plans: "" });

type Status = "idle" | "submitting" | "success" | "error";

export function PledgeIntakeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // About you
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [preferredContact, setPreferredContact] = useState("Text");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [otherLanguage, setOtherLanguage] = useState("");

  // Household
  const [eligibleCount, setEligibleCount] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  // Voting plan
  const [registered, setRegistered] = useState("");
  const [pledged, setPledged] = useState("");
  const [votingMethod, setVotingMethod] = useState("");
  const [reminder, setReminder] = useState("");
  const [infoRequested, setInfoRequested] = useState<string[]>([]);

  // Reach community
  const [additionalReach, setAdditionalReach] = useState("");
  const [additionalPeople, setAdditionalPeople] = useState("");

  // Get involved
  const [volunteer, setVolunteer] = useState("");
  const [volunteerActivities, setVolunteerActivities] = useState<string[]>([]);
  const [orgType, setOrgType] = useState("");
  const [orgName, setOrgName] = useState("");
  const [captainInterest, setCaptainInterest] = useState("");

  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  function syncCount(next: string) {
    const n = Math.max(0, Math.min(30, Math.floor(Number(next) || 0)));
    setEligibleCount(next === "" ? "" : String(n));
    setMembers((prev) => {
      if (n > prev.length) return [...prev, ...Array.from({ length: n - prev.length }, blankMember)];
      if (n < prev.length) return prev.slice(0, n);
      return prev;
    });
  }

  function addMember() {
    setMembers((prev) => {
      const next = [...prev, blankMember()];
      setEligibleCount(String(next.length));
      return next;
    });
  }

  function removeMember(index: number) {
    setMembers((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setEligibleCount(String(next.length));
      return next;
    });
  }

  function updateMember(index: number, field: keyof Member, value: string) {
    setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
  }

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function validateClient(): string | null {
    if (!firstName.trim()) return "Please enter your first name.";
    if (!lastName.trim()) return "Please enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Please enter a valid email address.";
    if (phone.replace(/[^\d]/g, "").length < 10) return "Please enter a valid phone number.";
    if (!street.trim()) return "Please enter your street address.";
    if (!city.trim()) return "Please enter your city.";
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) return "Please enter a valid 5-digit ZIP code.";
    if (eligibleCount === "" || Number(eligibleCount) < 0) return "Please enter the number of eligible voters in your household.";
    if (Number(eligibleCount) !== members.length) {
      return `You entered ${eligibleCount} eligible voters but added ${members.length}. Please review the household section so they match.`;
    }
    if (!consent) return "Please agree to the consent statement before submitting.";
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    if (website.trim()) {
      setStatus("success");
      return;
    }

    const clientError = validateClient();
    if (clientError) {
      setStatus("error");
      setErrorMessage(clientError);
      window.scrollTo({ top: document.querySelector(".pledge-intake")?.getBoundingClientRect().top ? window.scrollY : 0 });
      return;
    }

    const payload = {
      firstName, lastName, email, phone, street, city, zip,
      preferredContact, preferredLanguage,
      otherLanguage: preferredLanguage === "Other" ? otherLanguage : "",
      eligibleVotersCount: eligibleCount, members,
      registered, pledged, votingMethod, reminder, infoRequested,
      additionalReach, additionalPeople,
      volunteer,
      volunteerActivities: volunteer === "Yes" || volunteer === "Maybe" ? volunteerActivities : [],
      orgType, orgName: orgType && orgType !== "None" ? orgName : "",
      captainInterest, notes, consent, website,
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/pledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const b = await res.json().catch(() => null);
        throw new Error(b?.error ?? "We couldn't save your pledge. Please try again.");
      }
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "We couldn't save your pledge. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="pledge-success-full" role="status">
        <span aria-hidden="true">75%</span>
        <h3>Thank you for taking the 75% Pledge.</h3>
        <p>Together, we can help our communities vote, participate, and be heard.</p>
      </div>
    );
  }

  const submitting = status === "submitting";
  const showVolunteerOptions = volunteer === "Yes" || volunteer === "Maybe";
  const showOrgName = Boolean(orgType) && orgType !== "None";

  return (
    <form className="captain-form pledge-intake" onSubmit={handleSubmit} noValidate>
      {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}

      <label className="honeypot-field" aria-hidden="true">
        <span>Company</span>
        <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>

      {/* 1. About You */}
      <fieldset className="form-section">
        <legend className="form-section-head"><b>1</b> About You</legend>
        <div className="field-row">
          <label><span>First name *</span><input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" required /></label>
          <label><span>Last name *</span><input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" required /></label>
        </div>
        <div className="field-row">
          <label><span>Email address *</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></label>
          <label><span>Phone number *</span><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" required /></label>
        </div>
        <label><span>Street address *</span><input value={street} onChange={(e) => setStreet(e.target.value)} autoComplete="street-address" required /></label>
        <div className="field-row">
          <label><span>City *</span><input value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" required /></label>
          <label><span>ZIP code *</span><input value={zip} onChange={(e) => setZip(e.target.value)} inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}(-[0-9]{4})?" required /></label>
        </div>
        <fieldset>
          <legend>Preferred contact method</legend>
          <div className="radio-group">
            {CONTACT_METHODS.map((m) => (
              <label key={m}><input type="radio" name="preferredContact" value={m} checked={preferredContact === m} onChange={() => setPreferredContact(m)} /><span>{m}</span></label>
            ))}
          </div>
        </fieldset>
        <label><span>Preferred language</span>
          <select value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)}>
            {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
        {preferredLanguage === "Other" && (
          <label><span>Other language</span><input value={otherLanguage} onChange={(e) => setOtherLanguage(e.target.value)} /></label>
        )}
      </fieldset>

      {/* 2. Your Household */}
      <fieldset className="form-section">
        <legend className="form-section-head"><b>2</b> Your Household</legend>
        <label><span>Number of eligible voters in your household *</span>
          <input type="number" min="0" max="30" inputMode="numeric" value={eligibleCount} onChange={(e) => syncCount(e.target.value)} required />
        </label>
        <p className="field-hint">Add each eligible voter below so we can help your whole household participate.</p>
        {members.map((m, i) => (
          <div className="hh-member" key={i}>
            <div className="hh-member-head"><span>Eligible voter {i + 1}</span><button type="button" className="hh-remove" onClick={() => removeMember(i)}>Remove</button></div>
            <div className="field-row">
              <label><span>First name</span><input value={m.firstName} onChange={(e) => updateMember(i, "firstName", e.target.value)} /></label>
              <label><span>Last name</span><input value={m.lastName} onChange={(e) => updateMember(i, "lastName", e.target.value)} /></label>
            </div>
            <label><span>Age range</span>
              <select value={m.ageRange} onChange={(e) => updateMember(i, "ageRange", e.target.value)}>
                <option value="">Select</option>
                {AGE_RANGES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </label>
            <div className="field-row">
              <label><span>Registered to vote?</span>
                <select value={m.registered} onChange={(e) => updateMember(i, "registered", e.target.value)}>
                  <option value="">Select</option>{YNN.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label><span>Plans to vote?</span>
                <select value={m.plans} onChange={(e) => updateMember(i, "plans", e.target.value)}>
                  <option value="">Select</option>{YNU.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
          </div>
        ))}
        <button type="button" className="hh-add" onClick={addMember}>+ Add eligible voter</button>
      </fieldset>

      {/* 3. Your Voting Plan */}
      <fieldset className="form-section">
        <legend className="form-section-head"><b>3</b> Your Voting Plan</legend>
        <fieldset><legend>Are you registered to vote?</legend>
          <div className="radio-group">{YNN.map((o) => <label key={o}><input type="radio" name="registered" checked={registered === o} onChange={() => setRegistered(o)} /><span>{o}</span></label>)}</div>
        </fieldset>
        <fieldset><legend>Do you pledge to vote in the upcoming election?</legend>
          <div className="radio-group">{YNU.map((o) => <label key={o}><input type="radio" name="pledged" checked={pledged === o} onChange={() => setPledged(o)} /><span>{o}</span></label>)}</div>
        </fieldset>
        <fieldset><legend>How do you plan to vote?</legend>
          <div className="radio-group">{VOTING_METHODS.map((o) => <label key={o}><input type="radio" name="votingMethod" checked={votingMethod === o} onChange={() => setVotingMethod(o)} /><span>{o}</span></label>)}</div>
        </fieldset>
        <fieldset><legend>Would you like a reminder before voting begins?</legend>
          <div className="radio-group">{["Yes", "No"].map((o) => <label key={o}><input type="radio" name="reminder" checked={reminder === o} onChange={() => setReminder(o)} /><span>{o}</span></label>)}</div>
        </fieldset>
        <fieldset><legend>Would you like information about:</legend>
          <div className="checkbox-grid">{INFO_OPTIONS.map((o) => <label key={o}><input type="checkbox" checked={infoRequested.includes(o)} onChange={() => toggle(infoRequested, o, setInfoRequested)} /><span>{o}</span></label>)}</div>
        </fieldset>
      </fieldset>

      {/* 4. Reach Your Community */}
      <fieldset className="form-section">
        <legend className="form-section-head"><b>4</b> Reach Your Community</legend>
        <label><span>Approximately how many additional people outside your household can you encourage to vote?</span>
          <input type="number" min="0" inputMode="numeric" value={additionalReach} onChange={(e) => setAdditionalReach(e.target.value.replace(/[^\d]/g, ""))} />
        </label>
        <label><span>Names or contact information for people you may be able to encourage to vote <em>(optional)</em></span>
          <textarea rows={3} value={additionalPeople} onChange={(e) => setAdditionalPeople(e.target.value)} />
        </label>
      </fieldset>

      {/* 5. Get Involved */}
      <fieldset className="form-section">
        <legend className="form-section-head"><b>5</b> Get Involved</legend>
        <fieldset><legend>Would you like to volunteer with Drive for 75?</legend>
          <div className="radio-group">{["Yes", "No", "Maybe"].map((o) => <label key={o}><input type="radio" name="volunteer" checked={volunteer === o} onChange={() => setVolunteer(o)} /><span>{o}</span></label>)}</div>
        </fieldset>
        {showVolunteerOptions && (
          <fieldset><legend>How would you like to help?</legend>
            <div className="checkbox-grid">{VOLUNTEER_ACTIVITIES.map((o) => <label key={o}><input type="checkbox" checked={volunteerActivities.includes(o)} onChange={() => toggle(volunteerActivities, o, setVolunteerActivities)} /><span>{o}</span></label>)}</div>
          </fieldset>
        )}
        <label><span>Are you affiliated with a community organization?</span>
          <select value={orgType} onChange={(e) => setOrgType(e.target.value)}>
            <option value="">Select</option>{ORG_TYPES.map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
        {showOrgName && (
          <label><span>Organization / mosque / community name</span><input value={orgName} onChange={(e) => setOrgName(e.target.value)} /></label>
        )}
        <fieldset><legend>Would you be interested in becoming a Grassroots MI Captain?</legend>
          <div className="radio-group">{["Yes", "No", "Maybe"].map((o) => <label key={o}><input type="radio" name="captainInterest" checked={captainInterest === o} onChange={() => setCaptainInterest(o)} /><span>{o}</span></label>)}</div>
        </fieldset>
      </fieldset>

      {/* Notes + consent */}
      <fieldset className="form-section">
        <legend className="form-section-head"><b>6</b> Anything Else</legend>
        <label><span>Anything else you would like us to know? <em>(optional)</em></span><textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
        <label className="consent"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required /><span>I am voluntarily providing my information and agree that Grassroots MI may contact me about the 75% Pledge, civic engagement, voting information and reminders, volunteer opportunities, and related Grassroots MI activities.</span></label>
      </fieldset>

      <button className="button button-orange form-submit" type="submit" aria-busy={submitting} disabled={submitting}>
        {submitting ? "Saving your pledge…" : <>Take the 75% Pledge <span aria-hidden="true">→</span></>}
      </button>
      <small>Nonpartisan civic engagement. Your information is used only for Grassroots MI outreach and organizing.</small>
    </form>
  );
}
