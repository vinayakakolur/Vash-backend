const express = require("express");
const router = express.Router();

const { getAIResponse } = require("../services/openrouter");

router.post("/", async (req, res) => {

  console.log("===== NEW REQUEST =====");
  console.log(req.body);

  try {

    console.log("Step 1: Entered try block");

    const { messages, mode } = req.body;

    console.log("Step 2: Messages =", messages);

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: "Messages are required",
      });
    }

    console.log("Step 3: Calling OpenRouter...");

    const reply = await getAIResponse(messages, mode);

    console.log("Step 4: Reply =", reply);

    res.json({
      success: true,
      reply,
    });

  } catch (err) {

    console.log("Step 5: Catch block");
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;