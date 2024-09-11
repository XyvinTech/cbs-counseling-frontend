import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedRoles }) => {
  const isAuth = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    switch (userType) {
      case "admin":
        return <Navigate to="/dashboard" />;
      case "counsellor":
        return <Navigate to="/counselor/session" />;
      case "student":
        return <Navigate to="/student/bookappoinment" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
};
