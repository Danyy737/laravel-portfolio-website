import { adminFetch } from "./adminClient";

export function adminCreateProject(payload) {
  return adminFetch("/api/admin/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function adminUpdateProject(id, payload) {
  return adminFetch(`/api/admin/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function adminDeleteProject(id) {
  return adminFetch(`/api/admin/projects/${id}`, {
    method: "DELETE",
  });
}
