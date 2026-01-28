import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import { ToastProvider } from "./components/ToastProvider.jsx";

// Public
import ProjectsIndex from "./pages/ProjectsIndex.jsx";
import ProjectShow from "./pages/ProjectShow.jsx";

// Admin
import RequireAdminAuth from "./components/admin/RequireAdminAuth.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminProjectsIndex from "./pages/admin/AdminProjectsIndex.jsx";
import AdminProjectForm from "./pages/admin/AdminProjectForm.jsx";
import AdminTestimonialsPage from "./pages/admin/AdminTestimonialsPage.jsx";

//styling
import "./theme.css";


function App() {
  return (
    <BrowserRouter basename="/react">
      <ToastProvider>
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
                  <Navigate to="/admin/projects" replace />
                </RequireAdminAuth>
              </Layout>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <Layout>
                <RequireAdminAuth>
                  <AdminProjectsIndex />
                </RequireAdminAuth>
              </Layout>
            }
          />

          <Route
            path="/admin/projects/new"
            element={
              <Layout>
                <RequireAdminAuth>
                  <AdminProjectForm />
                </RequireAdminAuth>
              </Layout>
            }
          />

          <Route
            path="/admin/projects/:id/edit"
            element={
              <Layout>
                <RequireAdminAuth>
                  <AdminProjectForm />
                </RequireAdminAuth>
              </Layout>
            }
          />

          <Route
            path="/admin/projects/:projectId/testimonials"
            element={
              <Layout>
                <RequireAdminAuth>
                  <AdminTestimonialsPage />
                </RequireAdminAuth>
              </Layout>
            }
          />

          <Route path="*" element={<Layout><div>Not found</div></Layout>} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

const el = document.getElementById("react-root");
if (el) createRoot(el).render(<App />);
