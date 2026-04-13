/** Canonical site origin (no trailing slash). Override in staging with NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://epicfinance.co.nz";
  return String(raw).trim().replace(/\/+$/, "");
}

export const SITE_NAME = "Epic Finance";
export const ORG_LEGAL_NAME = "Epic Finance Ltd";
export const ORG_EMAIL = "info@epicfinance.co.nz";

/** Path under public/; becomes absolute URL with getSiteUrl(). */
export const DEFAULT_OG_IMAGE_PATH = "/img/logo/logo-dark.png";

export function getDefaultOgImageUrl() {
  return `${getSiteUrl()}${DEFAULT_OG_IMAGE_PATH}`;
}

export const AREA_SERVED_NZ = {
  "@type": "Country",
  name: "New Zealand",
};
