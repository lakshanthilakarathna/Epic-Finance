import { getSmtpContext, sendTransactionalMail } from "@/src/lib/server/smtpMail";

const LIMITS = { name: 200, email: 320, phone: 50, message: 10000 };

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

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  const sourceRaw = String(body.source ?? "").trim();
  const source =
    sourceRaw === "about" || sourceRaw === "home" || sourceRaw === "contact-page"
      ? sourceRaw
      : "unknown";
  const marketingOptIn = Boolean(body.marketingOptIn);

  if (!name || name.length > LIMITS.name) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (!email || email.length > LIMITS.email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (!message || message.length > LIMITS.message) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }
  if (phone.length > LIMITS.phone) {
    return res.status(400).json({ error: "Please check your details and try again." });
  }

  const smtpCtx = getSmtpContext();
  if (!smtpCtx) {
    console.error("contact api: SMTP environment variables are not configured");
    return res.status(500).json({ error: "Unable to send message. Please try again later." });
  }

  const to = smtpCtx.defaultTo;

  const text = [
    `Source: ${source}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Marketing opt-in: ${marketingOptIn ? "yes" : "no"}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendTransactionalMail({
      to,
      replyTo: email,
      subject: `Website contact from ${name}`,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("contact api: sendMail failed", e?.message || e);
    return res.status(500).json({ error: "Unable to send message. Please try again later." });
  }
}
