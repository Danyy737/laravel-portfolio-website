import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../components/ToastProvider.jsx";
import { ui } from "../../reactStyles.js";

import {
  listProjectTestimonials,
  createProjectTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../api/adminTestimonials";

const emptyForm = { author_name: "", author_role: "", quote: "" };

function normalizeList(json) {
  if (Array.isArray(json)) return json;
  if (json?.data && Array.isArray(json.data)) return json.data;
  return [];
}

export default function AdminTestimonialsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [items, setItems] = useState([]);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createForm, setCreateForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const da = a.created_at ? new Date(a.created_at).getTime() : 0;
      const db = b.created_at ? new Date(b.created_at).getTime() : 0;
      return db - da;
    });
  }, [items]);

  async function load() {
    setLoading(true);
    setLoadError("");
    try {
      const json = await listProjectTestimonials(projectId);
      setItems(normalizeList(json));
    } catch (e) {
      setLoadError(e?.message || "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!projectId) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  function startEdit(t) {
    setEditError("");
    setEditingId(t.id);
    setEditForm({
      author_name: t.author_name ?? "",
      author_role: t.author_role ?? "",
      quote: t.quote ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyForm);
    setEditError("");
  }

  async function onCreate(e) {
    e.preventDefault();
    setCreateError("");

    const payload = {
      author_name: createForm.author_name.trim(),
      author_role: createForm.author_role.trim(),
      quote: createForm.quote.trim(),
    };

    if (!payload.author_name || !payload.quote) {
      setCreateError("Author name and quote are required.");
      return;
    }

    setCreating(true);
    try {
      await createProjectTestimonial(projectId, payload);
      setCreateForm(emptyForm);
      await load();
      toast.success("Testimonial created.");
    } catch (e2) {
      const msg = e2?.message || "Create failed.";
      setCreateError(msg);
      toast.error(msg);
    } finally {
      setCreating(false);
    }
  }

  async function onSaveEdit() {
    setEditError("");

    const payload = {
      author_name: editForm.author_name.trim(),
      author_role: editForm.author_role.trim(),
      quote: editForm.quote.trim(),
    };

    if (!payload.author_name || !payload.quote) {
      setEditError("Author name and quote are required.");
      return;
    }

    setSavingEdit(true);
    try {
      await updateTestimonial(editingId, payload);
      cancelEdit();
      await load();
      toast.success("Testimonial updated.");
    } catch (e) {
      const msg = e?.message || "Update failed.";
      setEditError(msg);
      toast.error(msg);
    } finally {
      setSavingEdit(false);
    }
  }

  async function onDelete(id) {
    const ok = window.confirm("Delete this testimonial? This cannot be undone.");
    if (!ok) return;

    setDeletingId(id);
    try {
      await deleteTestimonial(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
      if (editingId === id) cancelEdit();
      toast.success("Testimonial deleted.");
    } catch (e) {
      toast.error(e?.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={ui.page}>
      <div style={ui.headerRow}>
        <div>
          <h1 style={{ margin: 0 }}>Testimonials</h1>
          <p style={{ marginTop: 6, ...ui.muted }}>
            Project ID: <strong>{projectId}</strong>
          </p>
        </div>

        <div style={ui.btnRow}>
          <button type="button" onClick={() => navigate(-1)} style={ui.btn}>
            ← Back
          </button>
          <Link to={`/admin/projects/${projectId}/edit`} style={ui.pillLink}>
            Edit Project
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {/* Create */}
        <section style={ui.card}>
          <h3 style={{ marginTop: 0 }}>Add testimonial</h3>

          {createError ? <div style={ui.error}>{createError}</div> : null}

          <form onSubmit={onCreate} style={{ display: "grid", gap: 12, marginTop: 10 }}>
            <label style={ui.label}>
              <div style={{ fontSize: 14, ...ui.muted }}>Author name</div>
              <input
                value={createForm.author_name}
                onChange={(e) => setCreateForm((p) => ({ ...p, author_name: e.target.value }))}
                placeholder="Jane Doe"
                disabled={creating}
                style={ui.input}
              />
            </label>

            <label style={ui.label}>
              <div style={{ fontSize: 14, ...ui.muted }}>Author role</div>
              <input
                value={createForm.author_role}
                onChange={(e) => setCreateForm((p) => ({ ...p, author_role: e.target.value }))}
                placeholder="CTO at Example Co"
                disabled={creating}
                style={ui.input}
              />
            </label>

            <label style={ui.label}>
              <div style={{ fontSize: 14, ...ui.muted }}>Quote</div>
              <textarea
                rows={4}
                value={createForm.quote}
                onChange={(e) => setCreateForm((p) => ({ ...p, quote: e.target.value }))}
                placeholder="What did they say?"
                disabled={creating}
                style={ui.textarea}
              />
            </label>

            <div style={ui.btnRow}>
              <button type="submit" disabled={creating} style={ui.btnPrimary}>
                {creating ? "Creating..." : "Create testimonial"}
              </button>
            </div>
          </form>
        </section>

        {/* List */}
        <section style={ui.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ margin: 0 }}>Existing testimonials</h3>
            <button type="button" onClick={load} style={ui.btn} disabled={loading}>
              {loading ? "Refreshing…" : "Refresh"}
            </button>
          </div>

          {loading ? <p style={{ marginTop: 12 }}>Loading…</p> : null}

          {loadError ? (
            <div style={{ ...ui.error, marginTop: 12 }}>
              <div style={{ marginBottom: 8 }}>{loadError}</div>
              <button onClick={load} style={ui.btn}>Retry</button>
            </div>
          ) : null}

          {!loading && !loadError && sortedItems.length === 0 ? (
            <p style={{ marginTop: 12, ...ui.muted }}>No testimonials yet — add one above.</p>
          ) : null}

          {!loading && !loadError && sortedItems.length > 0 ? (
            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              {sortedItems.map((t) => {
                const isEditing = editingId === t.id;
                const isDeleting = deletingId === t.id;

                return (
                  <div key={t.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
                    {!isEditing ? (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                          <div>
                            <strong>{t.author_name}</strong>
                            {t.author_role ? <span style={{ ...ui.muted }}> — {t.author_role}</span> : null}
                          </div>

                          <div style={ui.btnRow}>
                            <button type="button" onClick={() => startEdit(t)} disabled={isDeleting} style={ui.btn}>
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => onDelete(t.id)}
                              disabled={isDeleting}
                              style={ui.btnDanger}
                            >
                              {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>

                        <p style={{ marginTop: 10, whiteSpace: "pre-wrap" }}>{t.quote}</p>
                      </>
                    ) : (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                          <strong>Edit testimonial</strong>
                          <button type="button" onClick={cancelEdit} disabled={savingEdit} style={ui.btn}>
                            Cancel
                          </button>
                        </div>

                        {editError ? <div style={{ ...ui.error, marginTop: 12 }}>{editError}</div> : null}

                        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                          <label style={ui.label}>
                            <div style={{ fontSize: 14, ...ui.muted }}>Author name</div>
                            <input
                              value={editForm.author_name}
                              onChange={(e) => setEditForm((p) => ({ ...p, author_name: e.target.value }))}
                              disabled={savingEdit}
                              style={ui.input}
                            />
                          </label>

                          <label style={ui.label}>
                            <div style={{ fontSize: 14, ...ui.muted }}>Author role</div>
                            <input
                              value={editForm.author_role}
                              onChange={(e) => setEditForm((p) => ({ ...p, author_role: e.target.value }))}
                              disabled={savingEdit}
                              style={ui.input}
                            />
                          </label>

                          <label style={ui.label}>
                            <div style={{ fontSize: 14, ...ui.muted }}>Quote</div>
                            <textarea
                              rows={4}
                              value={editForm.quote}
                              onChange={(e) => setEditForm((p) => ({ ...p, quote: e.target.value }))}
                              disabled={savingEdit}
                              style={ui.textarea}
                            />
                          </label>

                          <div style={ui.btnRow}>
                            <button type="button" onClick={onSaveEdit} disabled={savingEdit} style={ui.btnPrimary}>
                              {savingEdit ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
