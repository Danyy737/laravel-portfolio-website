import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../../api/client";
import { adminCreateProject, adminUpdateProject } from "../../api/adminProjects";

export default function AdminProjectForm() {
  const { id } = useParams(); // undefined for "new"
  const isEdit = Boolean(id);
  const nav = useNavigate();

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
      .catch((e) => alive && setError(e?.message || "Failed to load project."))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [id, isEdit]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    // IMPORTANT: payload keys must match your Laravel Project fillable/validation
    const payload = { title, description };

    try {
      if (isEdit) {
        await adminUpdateProject(id, payload);
      } else {
        await adminCreateProject(payload);
      }
      nav("/admin/projects", { replace: true });
    } catch (e2) {
      setError(e2?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <p style={{ marginTop: 0 }}>
        <Link to="/admin/projects">← Back to admin projects</Link>
      </p>

      <h1 style={{ marginBottom: 8 }}>{isEdit ? "Edit Project" : "New Project"}</h1>

      {error && (
        <div style={{ padding: 12, border: "1px solid #f5c2c7", background: "#f8d7da", borderRadius: 10 }}>
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
          <label>
            <div style={{ fontSize: 14, opacity: 0.8 }}>Title</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: 10 }}
            />
          </label>

          <label>
            <div style={{ fontSize: 14, opacity: 0.8 }}>Description</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              style={{ width: "100%", padding: 10 }}
            />
          </label>

          <button disabled={saving} type="submit" style={{ padding: 10 }}>
            {saving ? "Saving…" : "Save"}
          </button>
        </form>
      )}
    </div>
  );
}
