import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProjectsIndex from "./pages/ProjectsIndex";
import ProjectShow from "./pages/ProjectShow";

function App() {
  return (
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<Layout><ProjectsIndex /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectShow /></Layout>} />
        <Route path="*" element={<Layout><div>Not found</div></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

const el = document.getElementById("react-root");
if (el) createRoot(el).render(<App />);
