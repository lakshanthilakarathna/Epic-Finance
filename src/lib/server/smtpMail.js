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

/**
 * @returns {{ transporter: import('nodemailer').Transporter; user: string; defaultTo: string } | null}
 */
export function getSmtpContext() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return null;
  }
  const transporter = createSmtpTransport(host, port, user, pass);
  const defaultTo = process.env.CONTACT_TO || user;
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
  await ctx.transporter.sendMail({
    from: ctx.user,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });
}
