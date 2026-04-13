import { LOAN_FORM_FIELD_ORDER } from "@/src/config/loanApplicationForm";

const BRAND_DARK = "#121820";
const BRAND_ACCENT = "#f57c00";

/** @param {unknown} s */
export function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

/**
 * @param {{ title: string; preheader: string; bodyInner: string }} p
 */
export function wrapEmailHtml({ title, preheader, bodyInner }) {
  const pre = escapeHtml(preheader);
  const tit = escapeHtml(title);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${tit}</title>
</head>
<body style="margin:0;background:#eef0f3;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${pre}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef0f3;padding:28px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 24px rgba(18,24,32,0.08);">
<tr>
<td style="background:${BRAND_DARK};padding:22px 26px;border-bottom:3px solid ${BRAND_ACCENT};">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#ffffff;font-weight:600;letter-spacing:-0.02em;">Epic Finance</div>
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.82);margin-top:6px;line-height:1.4;">${tit}</div>
</td>
</tr>
<tr>
<td style="padding:30px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.6;color:${BRAND_DARK};">
${bodyInner}
</td>
</tr>
<tr>
<td style="padding:18px 26px 26px;border-top:1px solid #e4e7ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:#5c6570;line-height:1.5;">
Reply using your mail client&rsquo;s <strong>Reply</strong> button to reach the sender directly.
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

/**
 * @param {Array<[string, string]>} rows
 */
export function keyValueTable(rows) {
  let html = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px 0;">`;
  for (const [label, value] of rows) {
    const v = String(value ?? "").trim();
    if (!v) continue;
    html += `<tr>
<td style="padding:11px 14px;background:#f4f6f9;border:1px solid #e4e7ec;font-weight:600;color:${BRAND_DARK};width:36%;vertical-align:top;font-size:14px;">${escapeHtml(label)}</td>
<td style="padding:11px 14px;border:1px solid #e4e7ec;color:#1c2430;vertical-align:top;font-size:14px;">${escapeHtml(v).replace(/\n/g, "<br/>")}</td>
</tr>`;
  }
  html += `</table>`;
  return html;
}

/**
 * @param {string} heading
 * @param {string} text
 */
export function messageBlock(heading, text) {
  const t = String(text ?? "").trim();
  if (!t) return "";
  return `<div style="margin-top:4px;">
<div style="font-weight:700;color:${BRAND_ACCENT};margin-bottom:10px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;">${escapeHtml(heading)}</div>
<div style="background:#fafbfc;border-left:4px solid ${BRAND_ACCENT};padding:16px 18px;color:${BRAND_DARK};white-space:pre-wrap;font-size:14px;line-height:1.55;">${escapeHtml(t)}</div>
</div>`;
}

/**
 * @param {{ name: string; email: string; phone: string; source: string; marketingOptIn: boolean; message: string }} d
 */
export function buildContactEmail(d) {
  const text = [
    `Source: ${d.source}`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    `Marketing opt-in: ${d.marketingOptIn ? "yes" : "no"}`,
    "",
    d.message,
  ]
    .filter(Boolean)
    .join("\n");

  const rows = /** @type {Array<[string, string]>} */ ([
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    ["Source", d.source],
    ["Marketing opt-in", d.marketingOptIn ? "Yes" : "No"],
  ]);

  const html = wrapEmailHtml({
    title: "New website contact",
    preheader: `Message from ${d.name}`,
    bodyInner: keyValueTable(rows) + messageBlock("Message", d.message),
  });
  return { text, html };
}

/**
 * @param {{ fullName: string; email: string; phone: string; accountNumber: string; complaintType: string; preferredContactMethod: string; description: string }} d
 */
export function buildComplaintEmail(d) {
  const text = [
    "Website complaint / feedback form",
    `Full name: ${d.fullName}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    d.accountNumber ? `Account number: ${d.accountNumber}` : null,
    `Complaint type: ${d.complaintType}`,
    `Preferred contact: ${d.preferredContactMethod}`,
    "",
    d.description,
  ]
    .filter(Boolean)
    .join("\n");

  const rows = /** @type {Array<[string, string]>} */ ([
    ["Full name", d.fullName],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    ["Account number", d.accountNumber || "—"],
    ["Complaint type", d.complaintType],
    ["Preferred contact", d.preferredContactMethod],
  ]);

  const html = wrapEmailHtml({
    title: "Complaint / feedback",
    preheader: `${d.complaintType} — ${d.fullName}`,
    bodyInner: keyValueTable(rows) + messageBlock("Details", d.description),
  });
  return { text, html };
}

/**
 * @param {Record<string, unknown>} formData
 * @param {Array<{ key: string; label: string; filename: string; attached: boolean }>} documents
 */
export function buildLoanApplicationEmail(formData, documents) {
  const lines = [];
  for (const key of LOAN_FORM_FIELD_ORDER) {
    const v = formData[key];
    lines.push(
      `${key}: ${typeof v === "boolean" ? (v ? "yes" : "no") : String(v ?? "")}`
    );
  }
  lines.push("", "Documents:");
  for (const doc of documents) {
    lines.push(
      `${doc.label}: ${doc.attached ? `attached (${doc.filename})` : doc.filename || "—"}`
    );
  }
  const text = lines.join("\n");

  const rows = LOAN_FORM_FIELD_ORDER.map((key) => {
    const v = formData[key];
    const display =
      typeof v === "boolean" ? (v ? "Yes" : "No") : String(v ?? "");
    return /** @type {[string, string]} */ ([fieldLabel(key), display]);
  });

  let docsHtml = `<div style="margin-top:8px;">
<div style="font-weight:700;color:${BRAND_ACCENT};margin-bottom:12px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;">Uploaded documents</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">`;
  for (const doc of documents) {
    const status = doc.attached
      ? `<span style="color:#1a7f37;font-weight:600;">Attached</span>`
      : `<span style="color:#5c6570;">Not uploaded</span>`;
    docsHtml += `<tr>
<td style="padding:10px 12px;border:1px solid #e4e7ec;background:#f4f6f9;font-size:13px;font-weight:600;">${escapeHtml(doc.label)}</td>
<td style="padding:10px 12px;border:1px solid #e4e7ec;font-size:13px;">${escapeHtml(doc.filename || "—")}</td>
<td style="padding:10px 12px;border:1px solid #e4e7ec;font-size:13px;">${status}</td>
</tr>`;
  }
  docsHtml += `</table></div>`;

  const firstName = String(formData.firstName ?? "").trim();
  const lastName = String(formData.lastName ?? "").trim();
  const html = wrapEmailHtml({
    title: "Loan application",
    preheader: `Application from ${firstName} ${lastName}`.trim(),
    bodyInner: keyValueTable(rows) + docsHtml,
  });
  return { text, html };
}
