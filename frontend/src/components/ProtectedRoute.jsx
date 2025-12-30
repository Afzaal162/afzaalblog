// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// A wrapper for routes that require authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login if not authenticated
  }

  return children; // render the protected component
};

export default ProtectedRoute; // ✅ default export
