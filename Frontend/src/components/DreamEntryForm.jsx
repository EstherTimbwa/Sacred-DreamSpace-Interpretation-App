import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function DreamEntryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!auth.currentUser) return alert("Login first to save dreams.");
    try {
      await addDoc(collection(db, 'dreams'), {
        title,
        content,
        date,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      alert('Dream saved.');
      setTitle('');
      setContent('');
      setDate('');
      setInterpretation('');
    } catch (err) {
      alert('Failed to save: ' + err.message);
    }
  };

  const handleInterpret = async () => {
    if (!content.trim()) return alert("Add your dream first.");
    setLoading(true);
    setInterpretation('');
    try {
      const res = await fetch('http://localhost:5000/api/dream-interpretation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreamText: content }),
      });
      const data = await res.json();
      setInterpretation(data.result || "Could not interpret your dream.");
    } catch (e) {
      setInterpretation("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-indigo-800 text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-indigo-900 rounded-xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">New Dream Entry</h2>
        
        <input
          type="text"
          placeholder="Dream Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-3 rounded-md bg-indigo-700 text-white placeholder-gray-300"
        />
        
        <textarea
          placeholder="Describe your dream in detail..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full mb-3 p-3 rounded-md bg-indigo-700 text-white placeholder-gray-300 resize-none"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 p-3 rounded-md bg-indigo-700 text-white"
        />

        <div className="flex gap-4 mb-4">
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-4 bg-purple-500 hover:bg-purple-400 font-semibold rounded-lg"
          >
            Save
          </button>
          <button
            onClick={handleInterpret}
            disabled={loading}
            className="flex-1 py-2 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg"
          >
            {loading ? "Interpreting..." : "Interpret"}
          </button>
        </div>

        {interpretation && (
          <div className="bg-indigo-700 p-4 rounded-lg text-sm text-white border border-indigo-400">
            <strong className="block text-yellow-300 mb-2">Interpretation:</strong>
            {interpretation}
          </div>
        )}
      </div>
    </div>
  );
};