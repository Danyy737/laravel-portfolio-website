import { getAdminToken, clearAdminToken } from "./adminAuth";

export async function adminFetch(path, options = {}) {
  const token = getAdminToken();
  if (!token) throw new Error("Token required. Please log in again.");

  const res = await fetch(path, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // If token is invalid/expired, force logout
if (res.status === 401) {
  clearAdminToken();
  window.location.href = "/react/admin/login";
  throw new Error("Session expired. Please log in again.");
}


  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${options.method || "GET"} ${path} failed (${res.status}): ${text}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;

  return res.json();
}
