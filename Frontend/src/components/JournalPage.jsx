// src/components/JournalPage.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import DreamEntryForm from "./DreamEntryForm";

const colors = {
  background: "#1A1F3D",
  cardBg: "#2C3253",
  text: "#F8F9FA",
  buttonBg: "#B39CD0",
  buttonHover: "#9A84C9",
};

export default function JournalPage() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return; // safety check

    const q = query(
      collection(db, "dreams"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userDreams = [];
      querySnapshot.forEach((doc) => {
        userDreams.push({ id: doc.id, ...doc.data() });
      });
      setDreams(userDreams);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "2rem", background: colors.background, minHeight: "100vh", color: colors.text }}>
      <h1>Your Dream Journal</h1>
      <DreamEntryForm />
      <div style={{ marginTop: "2rem" }}>
        <h2>Past Dreams</h2>
        {dreams.length === 0 ? (
          <p>No dreams saved yet.</p>
        ) : (
          dreams.map((dream) => (
            <div
              key={dream.id}
              style={{
                backgroundColor: colors.cardBg,
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h3>{dream.title || "(No Title)"}</h3>
              <small>{dream.date || "No date provided"}</small>
              <p>{dream.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}