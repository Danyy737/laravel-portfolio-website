import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../../api/client";
import { adminCreateProject, adminUpdateProject } from "../../api/adminProjects";
import { useToast } from "../../components/ToastProvider.jsx";
import { ui } from "../../reactStyles.js";

export default function AdminProjectForm() {
  const { id } = useParams(); // undefined for "new"
  const isEdit = Boolean(id);
  const nav = useNavigate();
  const toast = useToast();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  // Load existing project for edit (read via public API)
  React.useEffect(() => {
    let alive = true;
    if (!isEdit) return;

    setLoading(true);
    setError("");

    apiGet(`/api/projects/${id}`)
      .then((json) => {
        if (!alive) return;
        const p = json?.data ?? json;
        setTitle(p?.title ?? "");
        setDescription(p?.description ?? "");
      })
      .catch((e) => {
        if (!alive) return;
        const msg = e?.message || "Failed to load project.";
        setError(msg);
        toast.error(msg);
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [id, isEdit, toast]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = { title, description };

    try {
      if (isEdit) {
        await adminUpdateProject(id, payload);
        toast.success("Project updated.");
      } else {
        await adminCreateProject(payload);
        toast.success("Project created.");
      }
      nav("/admin/projects", { replace: true });
    } catch (e2) {
      const msg = e2?.message || "Save failed.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={ui.page}>
      <div style={ui.headerRow}>
        <div>
          <h1 style={{ margin: 0 }}>{isEdit ? "Edit Project" : "New Project"}</h1>
          <p style={{ marginTop: 6, ...ui.muted }}>
            {isEdit ? "Update your project details." : "Create a new project."}
          </p>
        </div>

        <div style={ui.btnRow}>
          <Link to="/admin/projects" style={ui.pillLink}>← Back</Link>
          {isEdit && (
            <Link to={`/admin/projects/${id}/testimonials`} style={ui.pillLink}>
              Manage Testimonials →
            </Link>
          )}
        </div>
      </div>

      {error && <div style={ui.error}>{error}</div>}

      <div style={{ ...ui.card, marginTop: 12 }}>
        {loading ? (
          <p style={{ margin: 0 }}>Loading…</p>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
            <label style={ui.label}>
              <div style={{ fontSize: 14, ...ui.muted }}>Title</div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={ui.input}
                disabled={saving}
              />
            </label>

            <label style={ui.label}>
              <div style={{ fontSize: 14, ...ui.muted }}>Description</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                style={ui.textarea}
                disabled={saving}
              />
            </label>

            <div style={ui.btnRow}>
              <button type="submit" disabled={saving} style={ui.btnPrimary}>
                {saving ? "Saving…" : "Save"}
              </button>
              <Link to="/admin/projects" style={ui.pillLink}>
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
