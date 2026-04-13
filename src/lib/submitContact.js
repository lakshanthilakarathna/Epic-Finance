/**
 * POST contact form payload to /api/contact (JSON).
 * @param {{ name: string; email: string; message: string; phone?: string; source?: string; marketingOptIn?: boolean }} data
 */
export async function submitContact(data) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let body = {};
  try {
    body = await res.json();
  } catch {
    // ignore
  }
  if (!res.ok) {
    throw new Error(body.error || "Something went wrong. Please try again.");
  }
  return body;
}
