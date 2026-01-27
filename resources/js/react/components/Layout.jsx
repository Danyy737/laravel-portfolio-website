import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "8px 10px",
  border: "1px solid #ddd",
  borderRadius: 10,
  color: "black",
  background: isActive ? "#f3f3f3" : "white",
});

export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>React Portfolio</h2>
          <nav style={{ display: "flex", gap: 10 }}>
            <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
          </nav>
        </header>

        <main style={{ marginTop: 18 }}>{children}</main>
      </div>
    </div>
  );
}
