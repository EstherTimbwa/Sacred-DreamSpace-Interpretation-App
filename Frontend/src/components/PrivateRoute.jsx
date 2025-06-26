// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // You can show a loading spinner here if you want
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in? Redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in? Show the protected page
  return children;
}