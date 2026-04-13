import {
  LOAN_FORM_FIELD_ORDER,
  REQUIRED_FIELDS,
} from "@/src/config/loanApplicationForm";
import {
  getSmtpContext,
  resolveMailTo,
  sendTransactionalMail,
} from "@/src/lib/server/smtpMail";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

const MAX_PAYLOAD_CHARS = 50_000;

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function validateLoanFormData(formData) {
  if (!formData || typeof formData !== "object") {
    return false;
  }
  for (const field of REQUIRED_FIELDS) {
    const value = formData[field];
    if (field === "consentMarketing" || field === "consentDataProcessing") {
      if (value !== true) {
        return false;
      }
    } else if (String(value ?? "").trim() === "") {
      return false;
    }
  }
  const email = String(formData.email ?? "").trim();
  return isValidEmail(email) && email.length <= 320;
}

function serializeLoanPayload(formData, fileNames) {
  const lines = [];
  for (const key of LOAN_FORM_FIELD_ORDER) {
    const v = formData[key];
    lines.push(`${key}: ${typeof v === "boolean" ? (v ? "yes" : "no") : String(v ?? "")}`);
  }
  lines.push(
    "",
    "Document filenames (files were NOT uploaded — applicant indicated names only; request documents separately if required):"
  );
  const names = fileNames && typeof fileNames === "object" ? fileNames : {};
  for (const key of Object.keys(names).sort()) {
    lines.push(`${key}: ${String(names[key] ?? "")}`);
  }
  return lines.join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Invalid request" });
  }

  const raw = JSON.stringify(body);
  if (raw.length > MAX_PAYLOAD_CHARS) {
    return res.status(400).json({ error: "Request too large." });
  }

  const formData = body.formData;
  const fileNames = body.fileNames;

  if (!validateLoanFormData(formData)) {
    return res.status(400).json({ error: "Please complete all required fields and try again." });
  }

  if (!getSmtpContext()) {
    console.error("loan-application api: SMTP environment variables are not configured");
    return res.status(500).json({ error: "Unable to send application. Please try again later." });
  }

  const to = resolveMailTo(
    process.env.LOAN_APPLICATION_TO,
    process.env.CONTACT_TO,
    process.env.SMTP_USER
  );

  const firstName = String(formData.firstName ?? "").trim();
  const lastName = String(formData.lastName ?? "").trim();
  const email = String(formData.email ?? "").trim();
  const text = serializeLoanPayload(formData, fileNames);

  try {
    await sendTransactionalMail({
      to,
      replyTo: email,
      subject: `Loan application from ${firstName} ${lastName}`.trim() || "Loan application",
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("loan-application api: sendMail failed", e?.message || e);
    return res.status(500).json({ error: "Unable to send application. Please try again later." });
  }
}
