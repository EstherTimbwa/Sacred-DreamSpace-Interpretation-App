// src/components/MultiStepProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const steps = [
  {
    question: "What belief system most aligns with you?",
    key: "beliefSystem",
    type: "single",
    options: ["Christian", "Muslim", "Jewish", "Astrological", "Mystic", "Scientific", "Atheist"],
  },
  {
    question: "How do you typically experience dreams?",
    key: "dreamerType",
    type: "multi",
    options: ["Vivid", "Fragmented", "Symbolic", "Prophetic", "Lucid", "Rarely dream"],
  },
  {
    question: "What do you seek from dream interpretation?",
    key: "purpose",
    type: "multi",
    options: ["Insight", "Healing", "Divine messages", "Creativity", "Clarity", "Shadow work"],
  },
  {
    question: "Do you practice or attempt lucid dreaming?",
    key: "lucidDreaming",
    type: "single",
    options: ["Yes", "Sometimes", "No"],
  },
  {
    question: "How often do you remember your dreams?",
    key: "recallRate",
    type: "single",
    options: ["Every morning", "Weekly", "Rarely"],
  },
  {
    question: "What tone do you prefer in interpretations?",
    key: "tonePreference",
    type: "multi",
    options: ["Spiritual", "Scientific", "Artistic", "Encouraging", "Direct", "Story-like"],
  },
  {
    question: "What are your dream goals?",
    key: "dreamGoals",
    type: "multi",
    options: ["Better recall", "Clarity", "Shadow work", "Direction", "Prophetic insight", "Visions"],
  },
];

export default function MultiStepProfile() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const profileRef = doc(db, "users", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists() && profileSnap.data().profile) {
          navigate("/JournalPage");
        }
      } else {
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleSelect = (key, option, isMulti) => {
    setAnswers((prev) => {
      if (isMulti) {
        const current = prev[key] || [];
        const updated = current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option];
        return { ...prev, [key]: updated };
      } else {
        return { ...prev, [key]: option };
      }
    });
  };

  const handleNext = async () => {
    if (step === steps.length - 1 && userId) {
      try {
        await setDoc(doc(db, "users", userId), {
          profile: { ...answers, createdAt: new Date().toISOString() },
        });
        navigate("/JournalPage");
      } catch (err) {
        alert("Error saving profile: " + err.message);
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  const current = steps[step];
  const selected = answers[current.key] || (current.type === "multi" ? [] : "");
  return (
  <div style={{ background: "#1A1F3D", minHeight: "100vh", color: "#F8F9FA", padding: "2rem" }}>
   <div style={{
        backgroundColor: "#2C3253",
        borderRadius: "8px",
        padding: "2rem",
        maxWidth: "32rem",
        width: "100%",
        margin: "0 auto"
      }}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">{current.question}</h2>
        <div className="space-y-3">
          {current.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(current.key, opt, current.type === "multi")}
              className={`block w-full px-4 py-2 rounded text-left transition-all border
                ${
                  current.type === "multi"
                    ? selected.includes(opt)
                      ? "bg-purple-700 border-purple-400 text-white"
                      : "bg-[#6366f1] border-[#6366f1] text-white"
                    : selected === opt
                    ? "bg-purple-700 border-purple-400 text-white"
                    : "bg-[#6366f1] border-[#6366f1] text-white"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-6 w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition"
        >
          {step === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}