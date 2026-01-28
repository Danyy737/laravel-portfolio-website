import React from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../api/projects";
import { adminDeleteProject } from "../../api/adminProjects";
import { useToast } from "../../components/ToastProvider.jsx";
import { ui } from "../../reactStyles.js";

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
    <div style={ui.page}>
      <div style={ui.headerRow}>
        <h1 style={{ margin: 0 }}>Admin Projects</h1>
        <Link to="/admin/projects/new" style={ui.pillLink}>+ New Project</Link>
      </div>

      {error && <div style={ui.error}>{error}</div>}

      {loading && <p style={{ marginTop: 12 }}>Loading…</p>}

      {!loading && projects.length === 0 && <p style={{ marginTop: 12, ...ui.muted }}>No projects found.</p>}

      {projects.length > 0 && (
        <div style={{ ...ui.card, marginTop: 12 }}>
          <table style={ui.table}>
            <thead>
              <tr>
                <th style={ui.th}>Title</th>
                <th style={ui.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td style={ui.td}>{p.title ?? `Project #${p.id}`}</td>
                  <td style={{ ...ui.td }}>
                    <div style={ui.btnRow}>
                      <Link to={`/projects/${p.id}`} style={ui.pillLink}>View</Link>
                      <Link to={`/admin/projects/${p.id}/edit`} style={ui.pillLink}>Edit</Link>
                      <button onClick={() => onDelete(p.id)} style={ui.btnDanger}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {meta && (
            <div style={{ ...ui.btnRow, justifyContent: "space-between", marginTop: 12 }}>
              <button style={ui.btn} disabled={currentPage <= 1} onClick={() => setPage((x) => Math.max(1, x - 1))}>
                Prev
              </button>
              <span style={ui.muted}>
                Page {currentPage} of {lastPage}
              </span>
              <button style={ui.btn} disabled={currentPage >= lastPage} onClick={() => setPage((x) => x + 1)}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
