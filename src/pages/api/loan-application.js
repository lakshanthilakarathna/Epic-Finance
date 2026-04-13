import fs from "fs";
import {
  REQUIRED_FIELDS,
} from "@/src/config/loanApplicationForm";
import { buildLoanApplicationEmail } from "@/src/lib/server/mailLayout";
import {
  getSmtpContext,
  resolveMailTo,
  sendTransactionalMail,
} from "@/src/lib/server/smtpMail";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const FILE_FIELD_KEYS = ["driverFront", "driverBack", "visaCopy", "passportCopy"];
const DOC_LABELS = {
  driverFront: "Driver licence (front)",
  driverBack: "Driver licence (back)",
  visaCopy: "Visa copy",
  passportCopy: "Passport copy",
};
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const EXT_OK = new Set(["jpg", "jpeg", "png", "webp", "pdf"]);
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024;

/** @param {unknown} v */
function fieldVal(v) {
  if (Array.isArray(v)) return v[0];
  return v;
}

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

/** @param {import('formidable').File | undefined} raw */
function getSingleFile(raw) {
  if (!raw) return null;
  return Array.isArray(raw) ? raw[0] : raw;
}

/** @param {import('formidable').Files} files */
function collectTempPaths(files) {
  const paths = [];
  for (const key of FILE_FIELD_KEYS) {
    const f = getSingleFile(files[key]);
    if (f?.filepath) paths.push(f.filepath);
  }
  return paths;
}

function cleanupPaths(paths) {
  for (const p of paths) {
    try {
      if (p && fs.existsSync(p)) fs.unlinkSync(p);
    } catch {
      /* ignore */
    }
  }
}

function extFromName(name) {
  const parts = String(name || "").split(".");
  const ext = parts.length > 1 ? parts.pop() : "";
  return ext ? ext.toLowerCase() : "";
}

/** @param {import('formidable').File} file */
function isAllowedFile(file) {
  const mime = String(file.mimetype || "")
    .toLowerCase()
    .split(";")[0]
    .trim();
  if (ALLOWED_MIME.has(mime)) return true;
  return EXT_OK.has(extFromName(file.originalFilename));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let tempPaths = [];

  try {
    const form = formidable({
      maxFileSize: MAX_FILE_BYTES,
      keepExtensions: true,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, f, fl) => {
        if (err) reject(err);
        else resolve([f, fl]);
      });
    });

    tempPaths = collectTempPaths(files);

    const payloadRaw = fieldVal(fields.payload);
    if (typeof payloadRaw !== "string") {
      cleanupPaths(tempPaths);
      return res.status(400).json({ error: "Invalid request: missing form data." });
    }

    let formData;
    try {
      formData = JSON.parse(payloadRaw);
    } catch {
      cleanupPaths(tempPaths);
      return res.status(400).json({ error: "Invalid request: form data is not valid JSON." });
    }

    if (!validateLoanFormData(formData)) {
      cleanupPaths(tempPaths);
      return res.status(400).json({ error: "Please complete all required fields and try again." });
    }

    const attachments = [];
    let totalSize = 0;

    for (const key of FILE_FIELD_KEYS) {
      const file = getSingleFile(files[key]);
      if (!file?.filepath) continue;

      const size = Number(file.size) || 0;
      if (size < 1) continue;

      if (size > MAX_FILE_BYTES) {
        cleanupPaths(tempPaths);
        return res.status(400).json({
          error: `Each file must be ${MAX_FILE_BYTES / (1024 * 1024)} MB or smaller.`,
        });
      }

      if (!isAllowedFile(file)) {
        cleanupPaths(tempPaths);
        return res.status(400).json({
          error: "Only JPEG, PNG, WebP, and PDF files are allowed.",
        });
      }

      totalSize += size;
      if (totalSize > MAX_TOTAL_BYTES) {
        cleanupPaths(tempPaths);
        return res.status(400).json({
          error: `Total upload size must not exceed ${MAX_TOTAL_BYTES / (1024 * 1024)} MB.`,
        });
      }

      const buf = fs.readFileSync(file.filepath);
      attachments.push({
        filename: file.originalFilename || `${key}.bin`,
        content: buf,
        contentType: file.mimetype || undefined,
      });
    }

    if (!getSmtpContext()) {
      cleanupPaths(tempPaths);
      console.error("loan-application api: MAIL_SMTP_NOT_CONFIGURED");
      return res.status(500).json({
        error: "Unable to send application. Please try again later.",
        code: "MAIL_SMTP_NOT_CONFIGURED",
      });
    }

    const to = resolveMailTo(
      process.env.LOAN_APPLICATION_TO,
      process.env.CONTACT_TO,
      process.env.SMTP_USER
    );

    const firstName = String(formData.firstName ?? "").trim();
    const lastName = String(formData.lastName ?? "").trim();
    const email = String(formData.email ?? "").trim();

    const documents = FILE_FIELD_KEYS.map((key) => {
      const f = getSingleFile(files[key]);
      const size = Number(f?.size) || 0;
      const attached = Boolean(f?.filepath && size > 0);
      return {
        key,
        label: DOC_LABELS[key] || key,
        filename: attached
          ? String(f.originalFilename || "document")
          : "No file chosen",
        attached,
      };
    });

    const { text, html } = buildLoanApplicationEmail(formData, documents);

    await sendTransactionalMail({
      to,
      replyTo: email,
      subject: `Loan application from ${firstName} ${lastName}`.trim() || "Loan application",
      text,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    cleanupPaths(tempPaths);
    return res.status(200).json({ ok: true });
  } catch (e) {
    cleanupPaths(tempPaths);
    if (e?.code === 1009) {
      return res.status(400).json({
        error: `Each file must be ${MAX_FILE_BYTES / (1024 * 1024)} MB or smaller.`,
      });
    }
    console.error("loan-application api: error", e?.message || e);
    return res.status(500).json({
      error: "Unable to send application. Please try again later.",
      code: "MAIL_SEND_FAILED",
    });
  }
}
