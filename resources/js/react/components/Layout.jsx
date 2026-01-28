import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAdminToken, logoutAdmin } from "../api/adminAuth";

function getInitialTheme() {
  return localStorage.getItem("theme") || "dark"; // default to dark
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "8px 10px",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--text)",
  background: isActive ? "rgba(255,255,255,0.06)" : "var(--btnBg)",
});

export default function Layout({ children }) {
  const nav = useNavigate();
  const authed = Boolean(getAdminToken());

  const [theme, setTheme] = React.useState(getInitialTheme);

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  async function onLogout() {
    await logoutAdmin();
    nav("/admin/login", { replace: true });
  }

  return (
    <div style={{ fontFamily: "system-ui", background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>React Portfolio</h2>

          <nav style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <NavLink to="/projects" style={linkStyle}>
              Projects
            </NavLink>

            <NavLink to="/admin/projects" style={linkStyle}>
              Admin
            </NavLink>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--btnBg)",
                color: "var(--text)",
                cursor: "pointer",
              }}
              title="Toggle theme"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            {authed && (
              <button
                onClick={onLogout}
                style={{
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--btnBg)",
                  color: "var(--text)",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            )}
          </nav>
        </header>

        <main style={{ marginTop: 18 }}>{children}</main>
      </div>
    </div>
  );
}
