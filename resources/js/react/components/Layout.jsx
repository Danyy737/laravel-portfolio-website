import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAdminToken, logoutAdmin } from "../api/adminAuth";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "8px 10px",
  border: "1px solid #ddd",
  borderRadius: 10,
  color: "black",
  background: isActive ? "#f3f3f3" : "white",
});

export default function Layout({ children }) {
  const nav = useNavigate();
const authed = Boolean(getAdminToken());

  async function onLogout() {
 await logoutAdmin();
nav("/admin/login", { replace: true });
  }

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>React Portfolio</h2>

          <nav style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <NavLink to="/projects" style={linkStyle}>
              Projects
            </NavLink>

            <NavLink to="/admin/projects" style={linkStyle}>
              Admin
            </NavLink>

            {authed && (
              <button
                onClick={onLogout}
                style={{
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "white",
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
