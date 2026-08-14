import { env } from "cloudflare:workers";

// 75% Pledge intake handler.
////
// Submissions are persisted to Google Sheets via a Google Apps Script Web
// App (Option B). No Google credentials live in this codebase or the
// browser: the server reads the deployment URL + shared secret from Worker
// environment bindings and POSTs to it. The Apps Script does dedup and
// writes both the "Pledge Contacts" and "Household Members" tabs.
//
// REQUIRED ENV (set as Worker secrets / .dev.vars locally):
//   PLEDGE_SHEETS_ENDPOINT  - the Apps Script Web App /exec URL
//   PLEDGE_SHEETS_SECRET    - shared secret the Apps Script verifies
interface SheetsEnv {
  PLEDGE_SHEETS_ENDPOINT?: string;
  PLEDGE_SHEETS_SECRET?: string;
}

const SOURCE_PAGE = "/pledge";
const MAX = 4000;
const MAX_MEMBERS = 30;

interface HouseholdMember {
  firstName: string;
  lastName: string;
  ageRange: string;
  registered: string;
  plans: string;
}

interface PledgePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  preferredContact: string;
  preferredLanguage: string;
  otherLanguage: string;
  eligibleVotersCount: string;
  members: HouseholdMember[];
  registered: string;
  pledged: string;
  votingMethod: string;
  reminder: string;
  infoRequested: string[];
  additionalReach: string;
  additionalPeople: string;
  volunteer: string;
  volunteerActivities: string[];
  orgType: string;
  orgName: string;
  captainInterest: string;
  notes: string;
  consent: boolean;
  website?: string; // honeypot
}

const s = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");
const isNonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const normalizePhone = (v: string) => v.replace(/[^\d]/g, "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const zipOk = (v: string) => /^\d{5}(-\d{4})?$/.test(v);

function validate(b: Partial<PledgePayload>): string | null {
  if (!isNonEmpty(b.firstName)) return "First name is required.";
  if (!isNonEmpty(b.lastName)) return "Last name is required.";
  if (!isNonEmpty(b.email) || !emailOk(b.email.trim())) return "A valid email address is required.";
  if (!isNonEmpty(b.phone) || normalizePhone(b.phone).length < 10) return "A valid phone number is required.";
  if (!isNonEmpty(b.street)) return "Street address is required.";
  if (!isNonEmpty(b.city)) return "City is required.";
  if (!isNonEmpty(b.zip) || !zipOk(b.zip.trim())) return "A valid 5-digit ZIP code is required.";
  const count = Number(b.eligibleVotersCount);
  if (!Number.isFinite(count) || count < 0 || count > MAX_MEMBERS) return "Please enter a valid number of eligible voters.";
  if (b.consent !== true) return "Please agree to the consent statement before submitting.";
  return null;
}

export async function POST(request: Request) {
  let body: Partial<PledgePayload>;
  try {
    body = (await request.json()) as Partial<PledgePayload>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently succeed, persist nothing.
  if (isNonEmpty(body.website)) return Response.json({ ok: true, submissionId: "" });

  const validationError = validate(body);
  if (validationError) return Response.json({ error: validationError }, { status: 400 });

  // Normalize.
  const membersRaw = Array.isArray(body.members) ? body.members.slice(0, MAX_MEMBERS) : [];
  const members = membersRaw.map((m) => ({
    firstName: s(m?.firstName),
    lastName: s(m?.lastName),
    ageRange: s(m?.ageRange),
    registered: s(m?.registered),
    plans: s(m?.plans),
  }));

  const submissionId = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  const contact = {
    submissionId,
    timestamp,
    firstName: s(body.firstName),
    lastName: s(body.lastName),
    email: s(body.email).toLowerCase(),
    phone: s(body.phone),
    phoneNormalized: normalizePhone(s(body.phone)),
    preferredContact: s(body.preferredContact),
    street: s(body.street),
    city: s(body.city),
    zip: s(body.zip),
    preferredLanguage: s(body.preferredLanguage),
    otherLanguage: s(body.otherLanguage),
    eligibleVotersCount: String(Number(body.eligibleVotersCount) || 0),
    registered: s(body.registered),
    pledged: s(body.pledged),
    votingMethod: s(body.votingMethod),
    reminder: s(body.reminder),
    infoRequested: Array.isArray(body.infoRequested) ? body.infoRequested.map(String).join(", ") : "",
    additionalReach: s(body.additionalReach),
    additionalPeople: s(body.additionalPeople),
    volunteer: s(body.volunteer),
    volunteerActivities: Array.isArray(body.volunteerActivities) ? body.volunteerActivities.map(String).join(", ") : "",
    orgType: s(body.orgType),
    orgName: s(body.orgName),
    captainInterest: s(body.captainInterest),
    notes: s(body.notes),
    consent: body.consent === true ? "Yes" : "No",
    sourcePage: SOURCE_PAGE,
  };

  const { PLEDGE_SHEETS_ENDPOINT, PLEDGE_SHEETS_SECRET } = env as unknown as SheetsEnv;

  if (!PLEDGE_SHEETS_ENDPOINT) {
    // Local dev fallback: the UI flow works, but nothing is persisted.
    // Production MUST have PLEDGE_SHEETS_ENDPOINT configured.
    const isDev = (import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV === true;
    if (isDev) {
      console.warn(
        "[pledge] PLEDGE_SHEETS_ENDPOINT is not set — submission NOT saved to Google Sheets (expected in local dev only).\n" +
          JSON.stringify({ contact, members }, null, 2)
      );
      return Response.json({ ok: true, submissionId });
    }
    return Response.json(
      { error: "The pledge database is not configured yet. Please try again shortly." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(PLEDGE_SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: PLEDGE_SHEETS_SECRET ?? "", contact, members }),
    });
    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      /* non-JSON response treated as failure below */
    }
    if (!res.ok || parsed.ok !== true) {
      console.error("[pledge] Sheets endpoint error:", res.status, text.slice(0, 500));
      throw new Error(parsed.error || `Sheets endpoint returned ${res.status}`);
    }
  } catch (error) {
    console.error("[pledge] Failed to persist submission:", error);
    return Response.json(
      { error: "We couldn't save your pledge right now. Please try again in a moment." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, submissionId });
}
