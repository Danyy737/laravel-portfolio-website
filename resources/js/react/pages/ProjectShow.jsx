import React from "react";
import { Link, useParams } from "react-router-dom";
import { apiGet } from "../api/client";

export default function ProjectShow() {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [testimonials, setTestimonials] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let alive = true;
    setError("");

    Promise.all([
      apiGet(`/api/projects/${id}`),
      apiGet(`/api/projects/${id}/testimonials`),
    ])
      .then(([p, t]) => {
        if (!alive) return;
        setProject(p?.data ?? p);
        setTestimonials(t?.data ?? []);
      })
      .catch((e) => alive && setError(e.message));

    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <p>
        <Link to="/projects">← Back to projects</Link>
      </p>

      {error && (
        <div style={{ padding: 12, border: "1px solid", marginTop: 12 }}>
          {error}
        </div>
      )}

      {!project && !error && <p>Loading...</p>}

      {project && (
        <>
          <h1>{project.title ?? `Project #${project.id}`}</h1>
          {project.description && <p style={{ marginTop: 8 }}>{project.description}</p>}

          <h2 style={{ marginTop: 24 }}>Testimonials</h2>
          {testimonials.length === 0 && <p>No testimonials yet.</p>}

          <ul style={{ marginTop: 12 }}>
            {testimonials.map((t) => (
              <li key={t.id ?? `${t.author_name}-${t.quote?.slice(0, 10)}`} style={{ marginBottom: 12 }}>
                <div><strong>{t.author_name}</strong>{t.author_role ? ` — ${t.author_role}` : ""}</div>
                <div>{t.quote}</div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
