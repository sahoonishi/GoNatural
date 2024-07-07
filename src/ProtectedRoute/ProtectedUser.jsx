import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("users"));
  if (user?.role === "user" || user?.role === "admin") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedUser;
