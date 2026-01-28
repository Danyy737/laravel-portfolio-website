// resources/js/react/api/adminTestimonials.js
import { apiGet } from "./client";
import { adminFetch } from "./adminClient";

// READ (public)
export function listProjectTestimonials(projectId) {
  return apiGet(`/api/projects/${projectId}/testimonials`);
}

// CREATE (admin)
export function createProjectTestimonial(projectId, payload) {
  return adminFetch(`/api/admin/projects/${projectId}/testimonials`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// UPDATE (admin) - try PUT; if backend only supports PATCH, fallback
export async function updateTestimonial(testimonialId, payload) {
  try {
    return await adminFetch(`/api/admin/testimonials/${testimonialId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // If your route is PATCH-only, this makes it still work
    const msg = String(e?.message || "");
    const looksLikeMethodIssue =
      msg.includes("405") || msg.toLowerCase().includes("method not allowed");

    if (!looksLikeMethodIssue) throw e;

    return adminFetch(`/api/admin/testimonials/${testimonialId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }
}

// DELETE (admin)
export function deleteTestimonial(testimonialId) {
  return adminFetch(`/api/admin/testimonials/${testimonialId}`, {
    method: "DELETE",
  });
}
