import fs from "fs";
import path from "path";
import { loadEnvConfig } from "@next/env";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

let envLoaded = false;
let smtpMissingLogged = false;

/** @type {{ transporter: import('nodemailer').Transporter; cacheKey: string } | null} */
let transportCache = null;

function smtpEnvDiagnosticsForLog() {
  const cwd = process.cwd();
  const explicit = (process.env.SMTP_ENV_FILE || "").trim();
  return {
    hasHost: Boolean(String(process.env.SMTP_HOST ?? "").trim()),
    hasUser: Boolean(String(process.env.SMTP_USER ?? "").trim()),
    hasPass: Boolean(String(process.env.SMTP_PASS ?? "").trim()),
    cwd,
    ...(explicit
      ? { smtpEnvFile: explicit, smtpEnvFileExists: fs.existsSync(explicit) }
      : {}),
    dotenvProductionExists: fs.existsSync(path.join(cwd, ".env.production")),
  };
}

function logSmtpMisconfigurationOnce() {
  if (smtpMissingLogged) return;
  smtpMissingLogged = true;
  console.error(
    "smtp: MAIL_SMTP_NOT_CONFIGURED (set SMTP_HOST, SMTP_USER, SMTP_PASS)",
    smtpEnvDiagnosticsForLog()
  );
}

function ensureProductionEnv() {
  if (envLoaded) return;
  const cwd = process.cwd();
  loadEnvConfig(cwd, false);

  for (const p of [
    path.join(cwd, ".env.production"),
    path.join(cwd, ".env.production.local"),
  ]) {
    if (fs.existsSync(p)) {
      dotenv.config({ path: p, override: true });
    }
  }

  const explicit = (process.env.SMTP_ENV_FILE || "").trim();
  if (explicit && fs.existsSync(explicit)) {
    dotenv.config({ path: explicit, override: true });
  }

  envLoaded = true;
}

function parseSmtpPort(raw) {
  const n = Number(raw);
  if (Number.isFinite(n) && n > 0 && n <= 65535) return n;
  return 465;
}

function createSmtpTransport(host, port, user, pass) {
  let secure;
  if (process.env.SMTP_SECURE === "true") secure = true;
  else if (process.env.SMTP_SECURE === "false") secure = false;
  else secure = port === 465;

  /** @type {import('nodemailer').TransportOptions} */
  const options = {
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 45_000,
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
  };

  if (port === 587) {
    options.requireTLS = true;
  }

  return nodemailer.createTransport(options);
}

function transportCacheKey(host, port, user, secure) {
  return `${host}\0${port}\0${user}\0${secure}`;
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
 * @returns {{ transporter: import('nodemailer').Transporter; from: string; user: string; defaultTo: string } | null}
 */
export function getSmtpContext() {
  ensureProductionEnv();
  const host = String(process.env.SMTP_HOST ?? "").trim();
  const port = parseSmtpPort(process.env.SMTP_PORT || 465);
  const user = String(process.env.SMTP_USER ?? "").trim();
  const pass = String(process.env.SMTP_PASS ?? "").trim();
  if (!host || !user || !pass) {
    logSmtpMisconfigurationOnce();
    return null;
  }

  let secure;
  if (process.env.SMTP_SECURE === "true") secure = true;
  else if (process.env.SMTP_SECURE === "false") secure = false;
  else secure = port === 465;

  const key = transportCacheKey(host, port, user, secure);
  if (!transportCache || transportCache.cacheKey !== key) {
    transportCache = {
      transporter: createSmtpTransport(host, port, user, pass),
      cacheKey: key,
    };
  }

  const from = resolveMailTo(process.env.SMTP_FROM, user);
  const defaultTo = resolveMailTo(process.env.CONTACT_TO, user);
  return {
    transporter: transportCache.transporter,
    from,
    user,
    defaultTo,
  };
}

/**
 * @param {{
 *   to: string;
 *   subject: string;
 *   text: string;
 *   html?: string;
 *   replyTo?: string;
 *   attachments?: import('nodemailer').Attachment[];
 * }} opts
 */
export async function sendTransactionalMail(opts) {
  const ctx = getSmtpContext();
  if (!ctx) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }
  try {
    const mail = {
      from: ctx.from,
      to: opts.to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
    };
    if (opts.html) mail.html = opts.html;
    if (opts.attachments?.length) mail.attachments = opts.attachments;
    const info = await ctx.transporter.sendMail(mail);
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
