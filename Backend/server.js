require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { OpenAI } = require('openai'); // Ensure you have the openai package installed

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI route
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your key in an environment variable
});

app.post('/api/openai/interpret', async (req, res) => {
  const { content } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are Stephanie Ike Okafor, ..." },
        { role: "user", content: `Here is my dream: "${content}" Please interpret it in detail.` },
      ],
      temperature: 0.75,
      max_tokens: 400,
    });
    res.json({ interpretation: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Serve frontend
const frontendPath = path.join(__dirname, '../Frontend/build');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});