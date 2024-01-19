const express = require("express");
const openaiApi = require("openai");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(cors());

const openai = new openaiApi({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 256,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const reply = response.choices[0].message.content;

    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/test", async (req, res) => {
  const { message } = req.body;

  res.send(message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
