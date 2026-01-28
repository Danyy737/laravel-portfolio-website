import React from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../api/projects";
import { adminDeleteProject } from "../../api/adminProjects";
import { useToast } from "../../components/ToastProvider.jsx";

export default function AdminProjectsIndex() {
  const toast = useToast();

  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const json = await getProjects({ page, perPage: 10 });
      setData(json);
    } catch (e) {
      const msg = e?.message || "Failed to load projects.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const projects = data?.data ?? [];
  const meta = data?.meta;
  const currentPage = meta?.current_page ?? page;
  const lastPage = meta?.last_page ?? currentPage;

  async function onDelete(id) {
    const ok = window.confirm("Delete this project? This cannot be undone.");
    if (!ok) return;

    setError("");
    try {
      await adminDeleteProject(id);
      toast.success("Project deleted.");
      await load();
    } catch (e) {
      const msg = e?.message || "Delete failed.";
      setError(msg);
      toast.error(msg);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1 style={{ margin: 0 }}>Admin Projects</h1>
        <Link to="/admin/projects/new">+ New Project</Link>
      </div>

      {error && (
        <div
          style={{
            padding: 12,
            border: "1px solid #f5c2c7",
            background: "#f8d7da",
            borderRadius: 10,
            marginTop: 12,
          }}
        >
          {error}
        </div>
      )}

      {loading && <p style={{ marginTop: 12 }}>Loading…</p>}

      {!loading && projects.length === 0 && <p style={{ marginTop: 12 }}>No projects found.</p>}

      {projects.length > 0 && (
        <table style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Title</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{p.title ?? `Project #${p.id}`}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: 8, display: "flex", gap: 10 }}>
                  <Link to={`/projects/${p.id}`}>View</Link>
                  <Link to={`/admin/projects/${p.id}/edit`}>Edit</Link>
                  <button onClick={() => onDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {meta && (
        <div style={{ display: "flex", gap: 10, marginTop: 14, alignItems: "center" }}>
          <button disabled={currentPage <= 1} onClick={() => setPage((x) => Math.max(1, x - 1))}>
            Prev
          </button>
          <span>
            Page {currentPage} of {lastPage}
          </span>
          <button disabled={currentPage >= lastPage} onClick={() => setPage((x) => x + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
