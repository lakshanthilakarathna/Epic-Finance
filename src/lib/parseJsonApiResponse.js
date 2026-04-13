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
