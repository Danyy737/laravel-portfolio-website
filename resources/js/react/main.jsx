import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import ProjectsIndex from "./pages/ProjectsIndex";
import ProjectShow from "./pages/ProjectShow";

function Layout({ children }) {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/projects">Projects</Link>
      </nav>
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route
          path="/projects"
          element={
            <Layout>
              <ProjectsIndex />
            </Layout>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <Layout>
              <ProjectShow />
            </Layout>
          }
        />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

const el = document.getElementById("react-root");
if (el) createRoot(el).render(<App />);
