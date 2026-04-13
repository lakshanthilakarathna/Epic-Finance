import { parseJsonApiResponse } from "@/src/lib/parseJsonApiResponse";

/**
 * POST multipart form (payload JSON + optional document files) to /api/loan-application.
 * @param {FormData} formData
 */
export async function submitLoanApplication(formData) {
  const res = await fetch("/api/loan-application", {
    method: "POST",
    body: formData,
  });
  return parseJsonApiResponse(res);
}
