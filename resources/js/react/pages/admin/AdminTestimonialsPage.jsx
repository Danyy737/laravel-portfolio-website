// resources/js/react/pages/admin/AdminTestimonialsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../components/ToastProvider.jsx";

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
      await load(); // don’t depend on response body
      toast.success("Testimonial created.");
    } catch (e2) {
      setCreateError(e2?.message || "Create failed.");
      toast.error(e2?.message || "Create failed.");
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
      await load(); // don’t depend on response body
      toast.success("Testimonial updated.");
    } catch (e) {
      setEditError(e?.message || "Update failed.");
      toast.error(e?.message || "Update failed.");
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
      setItems((prev) => prev.filter((x) => x.id !== id)); // instant UI
      if (editingId === id) cancelEdit();
      toast.success("Testimonial deleted.");
    } catch (e) {
      toast.error(e?.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0 }}>Testimonials</h2>
          <p style={{ marginTop: 6, opacity: 0.8 }}>
            Project ID: <strong>{projectId}</strong>
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <Link to={`/admin/projects/${projectId}/edit`}>Edit Project</Link>
        </div>
      </div>

      <hr style={{ margin: "16px 0" }} />

      {/* Create */}
      <section style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8, marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Add testimonial</h3>

        {createError ? (
          <div style={{ padding: 10, border: "1px solid #f99", borderRadius: 8, marginBottom: 10 }}>
            {createError}
          </div>
        ) : null}

        <form onSubmit={onCreate} style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label>Author name</label>
            <input
              value={createForm.author_name}
              onChange={(e) => setCreateForm((p) => ({ ...p, author_name: e.target.value }))}
              placeholder="Jane Doe"
              disabled={creating}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label>Author role</label>
            <input
              value={createForm.author_role}
              onChange={(e) => setCreateForm((p) => ({ ...p, author_role: e.target.value }))}
              placeholder="CTO at Example Co"
              disabled={creating}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label>Quote</label>
            <textarea
              rows={4}
              value={createForm.quote}
              onChange={(e) => setCreateForm((p) => ({ ...p, quote: e.target.value }))}
              placeholder="What did they say?"
              disabled={creating}
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" disabled={creating}>
              {creating ? "Creating..." : "Create testimonial"}
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section>
        <h3 style={{ marginTop: 0 }}>Existing testimonials</h3>

        {loading ? <p>Loading…</p> : null}

        {loadError ? (
          <div style={{ padding: 10, border: "1px solid #f99", borderRadius: 8 }}>
            <div style={{ marginBottom: 8 }}>{loadError}</div>
            <button onClick={load}>Retry</button>
          </div>
        ) : null}

        {!loading && !loadError && sortedItems.length === 0 ? (
          <p style={{ opacity: 0.8 }}>No testimonials yet — add one above.</p>
        ) : null}

        {!loading && !loadError && sortedItems.length > 0 ? (
          <div style={{ display: "grid", gap: 12 }}>
            {sortedItems.map((t) => {
              const isEditing = editingId === t.id;
              const isDeleting = deletingId === t.id;

              return (
                <div key={t.id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
                  {!isEditing ? (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                        <div>
                          <strong>{t.author_name}</strong>
                          {t.author_role ? <span style={{ opacity: 0.8 }}> — {t.author_role}</span> : null}
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                          <button type="button" onClick={() => startEdit(t)} disabled={isDeleting}>
                            Edit
                          </button>

                          <button type="button" onClick={() => onDelete(t.id)} disabled={isDeleting}>
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
                        <button type="button" onClick={cancelEdit} disabled={savingEdit}>
                          Cancel
                        </button>
                      </div>

                      {editError ? (
                        <div style={{ padding: 10, border: "1px solid #f99", borderRadius: 8, margin: "10px 0" }}>
                          {editError}
                        </div>
                      ) : null}

                      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                        <div style={{ display: "grid", gap: 6 }}>
                          <label>Author name</label>
                          <input
                            value={editForm.author_name}
                            onChange={(e) => setEditForm((p) => ({ ...p, author_name: e.target.value }))}
                            disabled={savingEdit}
                          />
                        </div>

                        <div style={{ display: "grid", gap: 6 }}>
                          <label>Author role</label>
                          <input
                            value={editForm.author_role}
                            onChange={(e) => setEditForm((p) => ({ ...p, author_role: e.target.value }))}
                            disabled={savingEdit}
                          />
                        </div>

                        <div style={{ display: "grid", gap: 6 }}>
                          <label>Quote</label>
                          <textarea
                            rows={4}
                            value={editForm.quote}
                            onChange={(e) => setEditForm((p) => ({ ...p, quote: e.target.value }))}
                            disabled={savingEdit}
                          />
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                          <button type="button" onClick={onSaveEdit} disabled={savingEdit}>
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
  );
}
