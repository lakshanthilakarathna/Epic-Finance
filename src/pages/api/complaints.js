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

const LIMITS = {
  fullName: 200,
  email: 320,
  phone: 50,
  accountNumber: 100,
  complaintType: 200,
  description: 10000,
  preferredContactMethod: 80,
};

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
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

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const accountNumber = String(body.accountNumber ?? "").trim();
  const complaintType = String(body.complaintType ?? "").trim();
  const description = String(body.description ?? "").trim();
  const preferredContactMethod = String(
    body.preferredContactMethod ?? "Email"
  ).trim();

  if (!fullName || fullName.length > LIMITS.fullName) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (!email || email.length > LIMITS.email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (!complaintType || complaintType.length > LIMITS.complaintType) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (!description || description.length > LIMITS.description) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (phone.length > LIMITS.phone) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (accountNumber.length > LIMITS.accountNumber) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (preferredContactMethod.length > LIMITS.preferredContactMethod) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }

  if (!getSmtpContext()) {
    console.error("complaints api: SMTP environment variables are not configured");
    return res.status(500).json({
      error: "Unable to send message. Please try again later.",
      code: "MAIL_SMTP_NOT_CONFIGURED",
    });
  }

  const to = resolveMailTo(
    process.env.COMPLAINTS_TO,
    process.env.CONTACT_TO,
    process.env.SMTP_USER
  );

  const text = [
    "Website complaint / feedback form",
    `Full name: ${fullName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    accountNumber ? `Account number: ${accountNumber}` : null,
    `Complaint type: ${complaintType}`,
    `Preferred contact: ${preferredContactMethod}`,
    "",
    description,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendTransactionalMail({
      to,
      replyTo: email,
      subject: `Website complaint from ${fullName}`,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("complaints api: sendMail failed", e?.message || e);
    return res.status(500).json({
      error: "Unable to send message. Please try again later.",
      code: "MAIL_SEND_FAILED",
    });
  }
}
