import { parseJsonApiResponse } from "@/src/lib/parseJsonApiResponse";

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
  return parseJsonApiResponse(res);
}
