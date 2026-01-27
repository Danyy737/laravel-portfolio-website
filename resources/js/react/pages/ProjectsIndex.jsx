import React from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api/projects";

export default function ProjectsIndex() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let alive = true;

    setLoading(true);
    setError("");

    // Optional: clears old page results so Loading feels "real"
    setData(null);

    getProjects({ page, perPage: 6 })
      .then((json) => {
        if (!alive) return;
        setData(json);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message || "Failed to load projects.");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [page]);

  const projects = data?.data ?? [];
  const meta = data?.meta;

  const currentPage = meta?.current_page ?? page;
  const lastPage = meta?.last_page ?? currentPage; // fallback if API doesn't send last_page

  const canPrev = !loading && currentPage > 1;
  const canNext = !loading && currentPage < lastPage;

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "system-ui",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1 style={{ margin: 0 }}>Projects</h1>
        {meta && (
          <div style={{ fontSize: 14, opacity: 0.8 }}>
            {meta.total} total
          </div>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: 12,
            border: "1px solid #f5c2c7",
            background: "#f8d7da",
            marginTop: 12,
            borderRadius: 10,
          }}
        >
          {error}
        </div>
      )}

      {loading && <p style={{ marginTop: 12 }}>Loading projects…</p>}

      {!loading && !error && projects.length === 0 && (
        <p style={{ marginTop: 12 }}>No projects found.</p>
      )}

      {!error && projects.length > 0 && (
        <>
          <ul style={{ marginTop: 16, paddingLeft: 18 }}>
            {projects.map((p) => (
              <li key={p.id} style={{ marginBottom: 10 }}>
                <Link to={`/projects/${p.id}`} style={{ textDecoration: "none" }}>
                  {p.title ?? `Project #${p.id}`}
                </Link>
              </li>
            ))}
          </ul>

          {meta && (
            <div style={{ display: "flex", gap: 10, marginTop: 16, alignItems: "center" }}>
              <button onClick={() => setPage((x) => Math.max(1, x - 1))} disabled={!canPrev}>
                Prev
              </button>

              <span>
                Page {currentPage} of {lastPage}
              </span>

              <button onClick={() => setPage((x) => x + 1)} disabled={!canNext}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
