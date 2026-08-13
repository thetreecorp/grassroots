// Captain application handler.
//
// Applications are emailed to the Grassroots MI inbox via FormSubmit
// (https://formsubmit.co) — a form-to-email relay that needs no API keys
// and no account. Because there are no secrets, nothing sensitive is ever
// exposed to the browser: the recipient address and the relay call both
// live here on the server.
//
// ONE-TIME SETUP: the first time this endpoint runs, FormSubmit sends a
// confirmation email to the address below. Click the "Activate" link in
// that email once, and every application afterwards is delivered
// automatically.

const NOTIFICATION_RECIPIENT = "aghanim101@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${NOTIFICATION_RECIPIENT}`;
const MAX_FIELD_LENGTH = 4000;

interface CaptainApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  preferredContact: string;
  organizingArea: string;
  affiliation: string;
  estimatedReach: string;
  interests: string[];
  motivation: string;
  heardAbout: string;
  nonpartisanAgreement: boolean;
  wantsUpdates: boolean;
  website?: string; // honeypot
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function clamp(value: string) {
  return value.slice(0, MAX_FIELD_LENGTH);
}

function validate(payload: Partial<CaptainApplicationPayload>): string | null {
  if (!isNonEmptyString(payload.firstName)) return "First name is required.";
  if (!isNonEmptyString(payload.lastName)) return "Last name is required.";
  if (!isNonEmptyString(payload.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "A valid email address is required.";
  }
  if (!isNonEmptyString(payload.phone)) return "Phone number is required.";
  if (!isNonEmptyString(payload.city)) return "City is required.";
  if (!isNonEmptyString(payload.zip)) return "ZIP code is required.";
  if (payload.nonpartisanAgreement !== true) {
    return "You must agree to represent Grassroots MI's nonpartisan work.";
  }
  return null;
}

// Build the labeled fields FormSubmit turns into a readable email table.
// FormSubmit renders fields in insertion order and uses the special
// `_subject`, `_template`, `_captcha`, and `_replyto` keys for formatting.
function buildFormSubmitBody(payload: CaptainApplicationPayload) {
  return {
    _subject: `New Grassroots MI Captain Application — ${payload.firstName} ${payload.lastName} — ${payload.city}`,
    _template: "table",
    _captcha: "false",
    _replyto: payload.email,
    Name: `${payload.firstName} ${payload.lastName}`,
    Email: payload.email,
    Phone: payload.phone,
    City: payload.city,
    "ZIP code": payload.zip,
    "Preferred contact method": payload.preferredContact || "—",
    "Community / area to organize": payload.organizingArea || "—",
    "Affiliated organization": payload.affiliation || "—",
    "Estimated reach": payload.estimatedReach || "—",
    Interests: payload.interests.length ? payload.interests.join(", ") : "—",
    "Why they want to be a Captain": payload.motivation || "—",
    "How they heard about Grassroots MI": payload.heardAbout || "—",
    "Agreed to nonpartisan representation": payload.nonpartisanAgreement ? "Yes" : "No",
    "Wants Grassroots MI updates": payload.wantsUpdates ? "Yes" : "No",
    Submitted: new Date().toISOString(),
  };
}

async function sendNotificationEmail(payload: CaptainApplicationPayload) {
  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildFormSubmitBody(payload)),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Email relay rejected the notification (${response.status}): ${detail}`);
  }
}

export async function POST(request: Request) {
  let body: Partial<CaptainApplicationPayload>;

  try {
    body = (await request.json()) as Partial<CaptainApplicationPayload>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots that fill in this hidden field get a fake success so
  // they don't learn the check exists, but nothing is emailed.
  if (isNonEmptyString(body.website)) {
    return Response.json({ ok: true });
  }

  const validationError = validate(body);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const payload: CaptainApplicationPayload = {
    firstName: clamp(String(body.firstName)),
    lastName: clamp(String(body.lastName)),
    email: clamp(String(body.email)),
    phone: clamp(String(body.phone)),
    city: clamp(String(body.city)),
    zip: clamp(String(body.zip)),
    preferredContact: clamp(String(body.preferredContact ?? "")),
    organizingArea: clamp(String(body.organizingArea ?? "")),
    affiliation: clamp(String(body.affiliation ?? "")),
    estimatedReach: clamp(String(body.estimatedReach ?? "")),
    interests: Array.isArray(body.interests) ? body.interests.map(String).slice(0, 20) : [],
    motivation: clamp(String(body.motivation ?? "")),
    heardAbout: clamp(String(body.heardAbout ?? "")),
    nonpartisanAgreement: body.nonpartisanAgreement === true,
    wantsUpdates: body.wantsUpdates === true,
  };

  try {
    await sendNotificationEmail(payload);
  } catch (error) {
    console.error("[captain-application] Failed to send notification email:", error);
    return Response.json(
      { error: "We couldn't submit your application right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
