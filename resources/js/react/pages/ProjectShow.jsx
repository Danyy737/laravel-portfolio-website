import React from "react";
import { Link, useParams } from "react-router-dom";
import { apiGet } from "../api/client";

function isNotFoundError(e) {
  // apiGet throws: "GET /path failed (404): ..."
  return typeof e?.message === "string" && e.message.includes("(404)");
}

export default function ProjectShow() {
  const { id } = useParams();

  const [project, setProject] = React.useState(null);
  const [testimonials, setTestimonials] = React.useState([]);

  const [loadingProject, setLoadingProject] = React.useState(false);
  const [loadingTestimonials, setLoadingTestimonials] = React.useState(false);

  const [notFound, setNotFound] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let alive = true;

    setError("");
    setNotFound(false);

    setProject(null);
    setTestimonials([]);

    // Load project
    setLoadingProject(true);
    apiGet(`/api/projects/${id}`)
      .then((p) => {
        if (!alive) return;
        const proj = p?.data ?? p;
        setProject(proj);
      })
      .catch((e) => {
        if (!alive) return;
        if (isNotFoundError(e)) {
          setNotFound(true);
        } else {
          setError(e?.message || "Failed to load project.");
        }
      })
      .finally(() => {
        if (!alive) return;
        setLoadingProject(false);
      });

    // Load testimonials (independent)
    setLoadingTestimonials(true);
    apiGet(`/api/projects/${id}/testimonials`)
      .then((t) => {
        if (!alive) return;
        setTestimonials(t?.data ?? []);
      })
      .catch((e) => {
        if (!alive) return;
        // Don't kill the whole page if testimonials fail
        setError((prev) => prev || (e?.message || "Failed to load testimonials."));
      })
      .finally(() => {
        if (!alive) return;
        setLoadingTestimonials(false);
      });

    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <p style={{ marginTop: 0 }}>
        <Link to="/projects">← Back to projects</Link>
      </p>

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

      {loadingProject && <p>Loading project…</p>}

      {notFound && !loadingProject && (
        <div style={{ marginTop: 12 }}>
          <h1 style={{ marginBottom: 6 }}>Project not found</h1>
          <p>The project you’re trying to view doesn’t exist (or was deleted).</p>
        </div>
      )}

      {project && !notFound && (
        <>
          <h1 style={{ marginBottom: 6 }}>{project.title ?? `Project #${project.id}`}</h1>

          {project.description ? (
            <p style={{ marginTop: 8, opacity: 0.9 }}>{project.description}</p>
          ) : (
            <p style={{ marginTop: 8, opacity: 0.7 }}>No description provided.</p>
          )}

          <h2 style={{ marginTop: 24, marginBottom: 8 }}>Testimonials</h2>

          {loadingTestimonials && <p>Loading testimonials…</p>}

          {!loadingTestimonials && testimonials.length === 0 && (
            <p style={{ opacity: 0.8 }}>No testimonials yet.</p>
          )}

          {testimonials.length > 0 && (
            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              {testimonials.map((t) => (
                <div
                  key={t.id ?? `${t.author_name ?? "anon"}-${t.quote ?? ""}`}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 14,
                    padding: 14,
                    background: "white",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    {t.author_name ?? "Anonymous"}
                    {t.author_role ? <span style={{ fontWeight: 400 }}> — {t.author_role}</span> : null}
                  </div>

                  <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
                    {t.quote}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
