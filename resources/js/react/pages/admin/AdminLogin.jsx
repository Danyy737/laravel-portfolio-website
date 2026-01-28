import React from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin, getAdminToken } from "../../api/adminAuth";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // If already logged in, go to admin home
    if (getAdminToken()) nav("/admin", { replace: true });
  }, [nav]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin(email, password);
      nav("/admin", { replace: true });
    } catch (e2) {
      setError(e2?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Admin Login</h1>

      {error && (
        <div style={{ padding: 12, border: "1px solid #f5c2c7", background: "#f8d7da", borderRadius: 10 }}>
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <label>
          <div style={{ fontSize: 14, opacity: 0.8 }}>Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            style={{ width: "100%", padding: 10 }}
          />
        </label>

        <label>
          <div style={{ fontSize: 14, opacity: 0.8 }}>Password</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            style={{ width: "100%", padding: 10 }}
          />
        </label>

        <button disabled={loading} type="submit" style={{ padding: 10 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
