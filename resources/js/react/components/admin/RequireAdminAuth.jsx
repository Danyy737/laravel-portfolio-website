import React from "react";
import { Navigate } from "react-router-dom";
import { getAdminToken } from "../../api/adminAuth";

export default function RequireAdminAuth({ children }) {
  const token = getAdminToken();
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}
