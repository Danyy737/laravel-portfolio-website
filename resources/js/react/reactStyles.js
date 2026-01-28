export const ui = {
  page: { maxWidth: 980, margin: "0 auto", padding: 16, color: "var(--text)" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 },

  card: { border: "1px solid var(--border)", borderRadius: 12, padding: 14, background: "var(--card)", boxShadow: "var(--shadow)" },
  section: { marginTop: 14 },

  muted: { color: "var(--muted)" },

  label: { display: "grid", gap: 6 },
  input: { width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)" },
  textarea: { width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)" },

  btnRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  btn: { padding: "8px 12px", borderRadius: 10, border: "1px solid var(--btnBorder)", background: "var(--btnBg)", color: "var(--btnText)", cursor: "pointer" },
  btnPrimary: { padding: "8px 12px", borderRadius: 10, border: "1px solid var(--primaryBorder)", background: "var(--primaryBg)", color: "var(--primaryText)", cursor: "pointer" },
  btnDanger: { padding: "8px 12px", borderRadius: 10, border: "1px solid var(--dangerBorder)", background: "var(--dangerBg)", color: "var(--dangerText)", cursor: "pointer" },

  error: { padding: 12, border: "1px solid var(--dangerBorder)", background: "rgba(220, 53, 69, 0.15)", borderRadius: 12, marginTop: 12 },

  table: { width: "100%", marginTop: 12, borderCollapse: "collapse" },
  th: { textAlign: "left", borderBottom: "1px solid var(--border)", padding: 10, fontSize: 14, color: "var(--muted)" },
  td: { borderBottom: "1px solid var(--borderSoft)", padding: 10 },

  pillLink: { textDecoration: "none", padding: "6px 10px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--btnBg)" },
};
