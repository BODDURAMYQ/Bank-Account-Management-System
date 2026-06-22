import React from "react";
import { Navigate } from "react-router-dom";

const normalizeRole = (role) => (role === "customer" ? "user" : role);

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");

  // Try to read role from explicit key first, fall back to stored user object
  let userRole = normalizeRole(localStorage.getItem("role"));
  if (!userRole) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      userRole = normalizeRole(user && (user.role || user.data?.role || user.user?.role));
    } catch (e) {
      userRole = null;
    }
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
