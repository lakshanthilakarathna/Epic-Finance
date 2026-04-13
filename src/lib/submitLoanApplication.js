import { postFormJson } from "@/src/lib/postFormJson";

/**
 * @param {{ formData: Record<string, unknown>; fileNames?: Record<string, string> }} payload
 */
export async function submitLoanApplication(payload) {
  return postFormJson("/api/loan-application", payload);
}
