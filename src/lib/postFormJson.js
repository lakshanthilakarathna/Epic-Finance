/**
 * POST JSON to a Next API route; parse JSON or HTML error bodies safely.
 * @param {string} url
 * @param {Record<string, unknown>} payload
 */
export async function postFormJson(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
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
    if (fromApi) {
      throw new Error(fromApi);
    }
    if (res.status >= 500) {
      throw new Error(
        "Server error. Please try again later or email us directly."
      );
    }
    throw new Error("Something went wrong. Please try again.");
  }
  return body;
}
