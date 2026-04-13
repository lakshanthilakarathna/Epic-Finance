import nodemailer from "nodemailer";

function createSmtpTransport(host, port, user, pass) {
  let secure;
  if (process.env.SMTP_SECURE === "true") secure = true;
  else if (process.env.SMTP_SECURE === "false") secure = false;
  else secure = port === 465;

  const options = {
    host,
    port,
    secure,
    auth: { user, pass },
  };

  if (port === 587) {
    options.requireTLS = true;
  }

  return nodemailer.createTransport(options);
}

/** First non-empty trimmed env-style value (avoids broken auth from trailing spaces in .env). */
export function resolveMailTo(...values) {
  for (const v of values) {
    const s = String(v ?? "").trim();
    if (s) return s;
  }
  return "";
}

/**
 * @returns {{ transporter: import('nodemailer').Transporter; user: string; defaultTo: string } | null}
 */
export function getSmtpContext() {
  const host = String(process.env.SMTP_HOST ?? "").trim();
  const port = Number(process.env.SMTP_PORT || 465);
  const user = String(process.env.SMTP_USER ?? "").trim();
  const pass = String(process.env.SMTP_PASS ?? "").trim();
  if (!host || !user || !pass) {
    return null;
  }
  const transporter = createSmtpTransport(host, port, user, pass);
  const defaultTo = resolveMailTo(process.env.CONTACT_TO, user);
  return { transporter, user, defaultTo };
}

/**
 * @param {{ to: string; subject: string; text: string; replyTo?: string }} opts
 */
export async function sendTransactionalMail(opts) {
  const ctx = getSmtpContext();
  if (!ctx) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }
  try {
    const info = await ctx.transporter.sendMail({
      from: ctx.user,
      to: opts.to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
    });
    console.info("smtp: message accepted", {
      messageId: info.messageId,
      response: info.response,
    });
  } catch (e) {
    console.error("smtp: sendMail failed", {
      code: e.code,
      responseCode: e.responseCode,
      command: e.command,
      message: e.message,
    });
    throw e;
  }
}
