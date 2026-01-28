// resources/js/react/reactStyles.js

export const ui = {
  page: { maxWidth: 980, margin: "0 auto", padding: 16 },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 },

  card: { border: "1px solid #ddd", borderRadius: 12, padding: 14, background: "#fff" },
  section: { marginTop: 14 },

  muted: { opacity: 0.8 },

  // Inputs
  label: { display: "grid", gap: 6 },
  input: { width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" },
  textarea: { width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" },

  // Buttons
  btnRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  btn: { padding: "8px 12px", borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer" },
  btnPrimary: { padding: "8px 12px", borderRadius: 10, border: "1px solid #111", background: "#111", color: "#fff", cursor: "pointer" },
  btnDanger: { padding: "8px 12px", borderRadius: 10, border: "1px solid #b02a37", background: "#dc3545", color: "#fff", cursor: "pointer" },

  // Feedback
  error: { padding: 12, border: "1px solid #f5c2c7", background: "#f8d7da", borderRadius: 12, marginTop: 12 },
  table: { width: "100%", marginTop: 12, borderCollapse: "collapse" },
  th: { textAlign: "left", borderBottom: "1px solid #ddd", padding: 10, fontSize: 14, opacity: 0.85 },
  td: { borderBottom: "1px solid #eee", padding: 10 },
  pillLink: { textDecoration: "none", padding: "6px 10px", borderRadius: 999, border: "1px solid #ddd" },
};
