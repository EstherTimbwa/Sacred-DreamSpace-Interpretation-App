// src/components/DreamEntryForm.jsx
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const colors = {
  background: "#1A1F3D",
  cardBg: "#2C3253",
  text: "#F8F9FA",
  inputBg: "#3B3F72",
  buttonBg: "#B39CD0",
  buttonHover: "#9A84C9",
};

export default function DreamEntryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to save dreams.");
      return;
    }

    try {
      await addDoc(collection(db, "dreams"), {
        title,
        content,
        date,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      alert("Dream saved!");
      setTitle("");
      setContent("");
      setDate("");
      setInterpretation("");
    } catch (err) {
      alert("Error saving dream: " + err.message);
    }
  };

  const handleInterpret = async () => {
    if (!content.trim()) {
      alert("Please enter your dream content to interpret.");
      return;
    }
    setLoading(true);
    setInterpretation("");

      try {
    const response = await fetch("/api/openai/interpret", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
     const aiMessage = data.interpretation || "No interpretation received.";
    // Check if AI returned a generic fallback
    if (
        aiMessage.toLowerCase().includes("sorry") ||
        aiMessage.toLowerCase().includes("couldn't interpret") ||
        aiMessage.toLowerCase().includes("try adding more")
      ) {
        setInterpretation(
          "I couldn't get a detailed interpretation this time. But every dream has meaning — try adding more details or emotions next time!"
        );
      } else {
        setInterpretation(aiMessage);
      }
    } catch (error) {
      setInterpretation("Error getting interpretation: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        background: colors.background,
        color: colors.text,
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: colors.cardBg,
          padding: "2rem",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2>New Dream Entry</h2>
        <input
          type="text"
          placeholder="Dream Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            margin: "1rem 0",
            padding: "0.75rem",
            background: colors.inputBg,
            color: colors.text,
            border: "none",
            borderRadius: "8px",
          }}
        />
        <textarea
          placeholder="Describe your dream..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: colors.inputBg,
            color: colors.text,
            border: "none",
            borderRadius: "8px",
            resize: "vertical",
          }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            margin: "1rem 0",
            padding: "0.75rem",
            background: colors.inputBg,
            color: colors.text,
            border: "none",
            borderRadius: "8px",
          }}
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "0.75rem",
              flex: 1,
              backgroundColor: colors.buttonBg,
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              color: colors.background,
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = colors.buttonHover)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = colors.buttonBg)}
            disabled={loading}
          >
            Save
          </button>
          <button
            onClick={handleInterpret}
            style={{
              padding: "0.75rem",
              flex: 1,
              backgroundColor: "#F4D35E",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              color: "#1A1F3D",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? "Interpreting..." : "Interpret"}
          </button>
        </div>
        {interpretation && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#444971",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              fontStyle: "italic",
            }}
          >
            {interpretation}
          </div>
        )}
      </div>
    </div>
  );
}