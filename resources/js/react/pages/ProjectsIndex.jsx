import React from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api/projects";

export default function ProjectsIndex() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    let alive = true;
    setError("");

    getProjects({ page, perPage: 6 })
      .then((json) => alive && setData(json))
      .catch((e) => alive && setError(e.message));

    return () => {
      alive = false;
    };
  }, [page]);

  const projects = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <h1>Projects</h1>

      {error && (
        <div style={{ padding: 12, border: "1px solid", marginTop: 12 }}>
          {error}
        </div>
      )}

      {!data && !error && <p>Loading...</p>}

      {projects.length > 0 && (
        <>
          <ul style={{ marginTop: 16 }}>
            {projects.map((p) => (
              <li key={p.id} style={{ marginBottom: 10 }}>
                <Link to={`/projects/${p.id}`}>{p.title ?? `Project #${p.id}`}</Link>
              </li>
            ))}
          </ul>

          {meta && (
            <div style={{ display: "flex", gap: 8, marginTop: 16, alignItems: "center" }}>
              <button onClick={() => setPage((x) => Math.max(1, x - 1))} disabled={page <= 1}>
                Prev
              </button>
              <span>
                Page {meta.current_page} of {meta.last_page}
              </span>
              <button
                onClick={() => setPage((x) => x + 1)}
                disabled={meta.current_page >= meta.last_page}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {data && projects.length === 0 && <p>No projects found.</p>}
    </div>
  );
}
