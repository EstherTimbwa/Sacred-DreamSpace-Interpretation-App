// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../firebase";

const colors = {
  background: "#1A1F3D",
  cardBg: "#2C3253",
  accent: "#F4D35E",
  inputBg: "#3B3F72",
  text: "#F8F9FA",
  buttonBg: "#B39CD0",
  buttonHover: "#9A84C9",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(auth.currentUser);

  // Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert(`Welcome back, ${userCredential.user.email}`);
      navigate("/journal");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert(`Welcome back, ${result.user.displayName}`);
      navigate("/journal");
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        color: colors.text,
      }}
    >
      <div
        style={{
          backgroundColor: colors.cardBg,
          padding: "2rem 3rem",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          width: "350px",
          textAlign: "center",
        }}
      >
        {!user ? (
          <>
            <h2 style={{ marginBottom: "1.5rem" }}>Sacred DreamSpace Login</h2>
            <form onSubmit={handleEmailLogin}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "none",
                  marginBottom: "1rem",
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "none",
                  marginBottom: "1.5rem",
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: colors.buttonBg,
                  color: colors.background,
                  fontWeight: "600",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  marginBottom: "1rem",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = colors.buttonHover)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = colors.buttonBg)
                }
              >
                Login
              </button>
            </form>
            <button
              onClick={handleGoogleLogin}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#4285F4",
                color: "white",
                fontWeight: "600",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#357AE8")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4285F4")}
            >
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <h3>Welcome, {user.email || user.displayName}</h3>
            <button
              onClick={handleLogout}
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                backgroundColor: colors.accent,
                color: colors.background,
                fontWeight: "600",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}