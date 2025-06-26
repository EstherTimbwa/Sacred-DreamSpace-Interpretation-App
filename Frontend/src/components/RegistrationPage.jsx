// src/components/RegistrationPage.jsx
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

const colors = {
  background: "#1A1F3D",      // midnight blue
  cardBg: "#2C3253",          // darker card bg
  accent: "#F4D35E",          // soft gold
  inputBg: "#3B3F72",         // input background
  text: "#F8F9FA",            // warm white
  placeholder: "#B0B7DA",
  buttonBg: "#B39CD0",        // soft lavender
  buttonHover: "#9A84C9",
};

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered: " + userCredential.user.email);
      navigate("/journal");
    } catch (error) {
      alert("Error: " + error.message);
    }
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
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: colors.cardBg,
          padding: "2rem 3rem",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          width: "350px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Sacred DreamSpace
        </h2>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Email
        </label>
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
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Password
        </label>
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
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = colors.buttonHover)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = colors.buttonBg)}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already registered?{" "}
          <a href="/login" style={{ color: colors.accent, textDecoration: "underline" }}>
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}