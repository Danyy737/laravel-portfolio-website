import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../api/adminAuth";

export default function AdminHome() {
  const nav = useNavigate();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function onLogout() {
    setError("");
    setLoading(true);
    try {
      await logoutAdmin();
      nav("/admin/login", { replace: true });
    } catch (e) {
      setError(e?.message || "Logout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Admin</h1>

      {error && (
        <div style={{ padding: 12, border: "1px solid #f5c2c7", background: "#f8d7da", borderRadius: 10 }}>
          {error}
        </div>
      )}

      <p>You’re logged in via token auth.</p>

      <button onClick={onLogout} disabled={loading} style={{ padding: 10 }}>
        {loading ? "Logging out…" : "Log out"}
      </button>
    </div>
  );
}