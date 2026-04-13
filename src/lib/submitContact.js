import { postFormJson } from "@/src/lib/postFormJson";

/**
 * POST contact form payload to /api/contact (JSON).
 * @param {{ name: string; email: string; message: string; phone?: string; source?: string; marketingOptIn?: boolean }} data
 */
export async function submitContact(data) {
  return postFormJson("/api/contact", data);
}
