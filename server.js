import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.static("frontend2"))
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.send("AI Daily Journal Server is running!");
});

app.post("/journal-prompt", async (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({
        error: "Mood is required"
      });
    }

    const prompt = `
Write a short, encouraging journal prompt for someone feeling "${mood}".

The prompt should:
- be positive
- be easy to understand
- encourage self-reflection
- be only 1 or 2 sentences
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt
    });

    res.json({
      mood: mood,
      journalPrompt: response.text
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});