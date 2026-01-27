import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>React is live ✅</h1>
      <p>Next: fetch /api/projects and render your Projects page.</p>
    </div>
  );
}

const el = document.getElementById("react-root");

if (el) {
  createRoot(el).render(<App />);
}
