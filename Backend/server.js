// server.js
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔑 Load OpenAI API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🧠 Dream Interpretation Endpoint
app.post("/api/dream-interpretation", async (req, res) => {
  const { dreamText } = req.body;

  const prompt = `
You are a prophetic dream interpreter with deep spiritual wisdom.
Reflect on this dream using biblical, symbolic, and emotional insight:

"${dreamText}"

Respond with a thoughtful, comforting interpretation in 1–2 paragraphs.
Avoid clinical language. Sound nurturing and spiritually insightful.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [
        { role: "system", content: "You are a spiritual and symbolic dream interpreter." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 400,
    });

    const interpretation = response.choices[0].message.content.trim();
    res.json({ result: interpretation });
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    res.status(500).json({ error: "Failed to interpret dream." });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🧠 DreamSpace backend running on http://localhost:${PORT}`);
});