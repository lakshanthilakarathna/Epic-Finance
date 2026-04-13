/**
 * Parse JSON from a fetch Response; throw user-facing errors like postFormJson.
 * @param {Response} res
 * @returns {Promise<Record<string, unknown>>}
 */
export async function parseJsonApiResponse(res) {
  const text = await res.text();
  let body = {};
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      // Nginx/HTML error page
    }
  }
  if (!res.ok) {
    if (res.status === 413) {
      throw new Error(
        "Upload too large for the server. Use smaller files (JPEG, PNG, or PDF under 5 MB each, 15 MB total) or email documents separately. If this persists, the site admin must raise Nginx client_max_body_size for HTTPS."
      );
    }
    const fromApi = typeof body.error === "string" && body.error.trim();
    const errCode =
      typeof body.code === "string" && body.code.trim() ? body.code.trim() : "";
    if (fromApi) {
      throw new Error(errCode ? `${fromApi} (${errCode})` : fromApi);
    }
    if (res.status >= 500) {
      const base =
        "Server error. Please try again later or email us directly.";
      throw new Error(errCode ? `${base} (${errCode})` : base);
    }
    throw new Error("Something went wrong. Please try again.");
  }
  return body;
}
