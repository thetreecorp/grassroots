# 75% Pledge → Google Sheets setup

The `/pledge` form saves every submission to a Google Sheet through a Google
Apps Script Web App. No Google credentials live in the website code or the
browser — the server (`app/api/pledge/route.ts`) calls your Web App URL with a
shared secret.

You need to do the Google-side setup (it requires your Google account), then
give the developer two values:

1. **`PLEDGE_SHEETS_ENDPOINT`** — the Web App URL (ends in `/exec`)
2. **`PLEDGE_SHEETS_SECRET`** — a secret string you invent

---

## Step 1 — Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it e.g. **Grassroots MI — 75% Pledge Database**.
   (You do not need to create the tabs or headers by hand — the script creates
   `Pledge Contacts` and `Household Members` with headers automatically.)

## Step 2 — Add the Apps Script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete any starter code and paste the entire script below.
3. Change the `SHARED_SECRET` value to a long random string of your choice, and
   remember it — this is your `PLEDGE_SHEETS_SECRET`.
4. Click **Save**.

```javascript
// ==== Grassroots MI 75% Pledge — Apps Script Web App ====
// Set this to a long random string; it must match PLEDGE_SHEETS_SECRET
// configured on the website server.
const SHARED_SECRET = "CHANGE-ME-to-a-long-random-string";

const CONTACT_HEADERS = [
  "Timestamp","Submission ID","First Name","Last Name","Email","Phone",
  "Preferred Contact Method","Street Address","City","ZIP Code",
  "Preferred Language","Other Language","Number of Eligible Voters",
  "Registered to Vote","Pledged to Vote","Planned Voting Method",
  "Voting Reminder Requested","Voting Information Requested",
  "Number of Additional People They Can Reach",
  "Additional People / Contact Information","Volunteer Interest",
  "Volunteer Activities","Organization Affiliation Type","Organization Name",
  "Captain Interest","Notes","Consent","Source Page","Possible Duplicate"
];

const MEMBER_HEADERS = [
  "Submission ID","Primary Contact First Name","Primary Contact Last Name",
  "Primary Contact Phone","Street Address","City","ZIP Code",
  "Household Member First Name","Household Member Last Name","Age Range",
  "Registered to Vote","Plans to Vote","Timestamp"
];

function getSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  } else if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

function normPhone_(v) { return String(v || "").replace(/[^\d]/g, ""); }
function normEmail_(v) { return String(v || "").trim().toLowerCase(); }

function isDuplicate_(contactsSheet, phone, email) {
  const last = contactsSheet.getLastRow();
  if (last < 2) return false;
  // Columns: Phone = 6, Email = 5 (1-indexed)
  const values = contactsSheet.getRange(2, 5, last - 1, 2).getValues(); // [email, phone]
  const np = normPhone_(phone), ne = normEmail_(email);
  for (var i = 0; i < values.length; i++) {
    var e = normEmail_(values[i][0]);
    var p = normPhone_(values[i][1]);
    if ((ne && e === ne) || (np && np.length >= 10 && p === np)) return true;
  }
  return false;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (String(body.secret || "") !== SHARED_SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }
    var c = body.contact || {};
    var members = body.members || [];

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var contacts = getSheet_(ss, "Pledge Contacts", CONTACT_HEADERS);
    var hh = getSheet_(ss, "Household Members", MEMBER_HEADERS);

    var possibleDuplicate = isDuplicate_(contacts, c.phone, c.email) ? "Yes" : "No";

    contacts.appendRow([
      c.timestamp, c.submissionId, c.firstName, c.lastName, c.email, c.phone,
      c.preferredContact, c.street, c.city, c.zip, c.preferredLanguage,
      c.otherLanguage, c.eligibleVotersCount, c.registered, c.pledged,
      c.votingMethod, c.reminder, c.infoRequested, c.additionalReach,
      c.additionalPeople, c.volunteer, c.volunteerActivities, c.orgType,
      c.orgName, c.captainInterest, c.notes, c.consent, c.sourcePage,
      possibleDuplicate
    ]);

    for (var i = 0; i < members.length; i++) {
      var m = members[i];
      hh.appendRow([
        c.submissionId, c.firstName, c.lastName, c.phone, c.street, c.city,
        c.zip, m.firstName, m.lastName, m.ageRange, m.registered, m.plans,
        c.timestamp
      ]);
    }

    return json_({ ok: true, submissionId: c.submissionId, possibleDuplicate: possibleDuplicate });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon → choose **Web app**.
3. Set:
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
4. Click **Deploy**. Approve the permission prompts (it needs access to this
   spreadsheet).
5. Copy the **Web app URL** — it ends in `/exec`. This is your
   `PLEDGE_SHEETS_ENDPOINT`.

> If you later change the script, use **Deploy → Manage deployments → Edit →
> New version** so the same URL keeps working.

## Step 4 — Give the developer the two values

- `PLEDGE_SHEETS_ENDPOINT` = the `/exec` URL from Step 3
- `PLEDGE_SHEETS_SECRET` = the `SHARED_SECRET` string you set in Step 2

These get stored as server-side environment variables only (locally in
`.dev.vars`, and in the hosting platform's secret settings for production).
They are never exposed to the browser.
