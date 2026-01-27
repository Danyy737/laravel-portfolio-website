import { apiGet } from "./client";

export function getProjects({ page = 1, perPage = 6 } = {}) {
  const qs = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  return apiGet(`/api/projects?${qs.toString()}`);
}
