import { postFormJson } from "@/src/lib/postFormJson";

/**
 * @param {Record<string, string | boolean>} data — complaints-feedback form fields
 */
export async function submitComplaint(data) {
  return postFormJson("/api/complaints", data);
}
