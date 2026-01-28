import { getAdminToken } from "./adminAuth";

export async function adminFetch(path, options = {}) {
  const token = getAdminToken();
  if (!token) throw new Error("Not authenticated.");

  const res = await fetch(path, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${options.method || "GET"} ${path} failed (${res.status}): ${text}`);
  }

  // Some DELETE endpoints return empty body; handle both
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;

  return res.json();
}
