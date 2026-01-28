import { apiGet } from "./client";

const TOKEN_KEY = "admin_token";

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Calls your existing endpoint: POST /api/admin/token
export async function loginAdmin(email, password) {
  const res = await fetch("/api/admin/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Login failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  // Expecting something like { token: "..." }
  if (!json?.token) throw new Error("Login response missing token.");
  setAdminToken(json.token);
  return json.token;
}

// Calls your existing endpoint: DELETE /api/admin/token
export async function logoutAdmin() {
  const token = getAdminToken();
  if (!token) return;

  const res = await fetch("/api/admin/token", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Even if revoke fails, clear locally so user can re-login
  clearAdminToken();

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Logout failed (${res.status}): ${text}`);
  }
}
