console.log("✅ NEW openrouter.js loaded");
const getPrompt = require("../prompts");
const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

console.log("API Key exists:", !!OPENROUTER_API_KEY);
console.log("API Key prefix:", OPENROUTER_API_KEY?.substring(0, 10));

async function getAIResponse(messages, mode = "default") {
  try {
    const selectedPrompt = getPrompt(mode);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",
        messages: [
            {
                role: "system",
                content: selectedPrompt,
            },
            ...messages,
        ],
        max_tokens: 300,
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply =
        response.data?.choices?.[0]?.message?.content ??
        "Sorry, I couldn't generate a response.";

    return reply;
  } catch (error) {
        console.error("===== OPENROUTER ERROR =====");

        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }

        return "Sorry, Vash is having trouble connecting right now.";
    }
}

module.exports = { getAIResponse };