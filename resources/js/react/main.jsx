import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import ProjectsIndex from "./pages/ProjectsIndex.jsx";
import ProjectShow from "./pages/ProjectShow.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import RequireAdminAuth from "./components/admin/RequireAdminAuth.jsx";

function App() {
  return (
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />

        <Route path="/projects" element={<Layout><ProjectsIndex /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectShow /></Layout>} />

        <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />
        <Route
          path="/admin"
          element={
            <Layout>
              <RequireAdminAuth>
                <AdminHome />
              </RequireAdminAuth>
            </Layout>
          }
        />

        <Route path="*" element={<Layout><div>Not found</div></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

const el = document.getElementById("react-root");
if (el) createRoot(el).render(<App />);
