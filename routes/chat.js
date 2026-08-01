const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/auth");
const { getAIResponse } = require("../services/openrouter");
const { db } = require("../firebase/firebase_admin");
const CREDIT_COST = 5;


router.post("/", authenticateUser, async (req, res) => {
  
  console.log("Authenticated user:", req.user.uid);
  console.log("Email:", req.user.email);
  console.log("===== NEW REQUEST =====");
  console.log(req.body);

  try {

    console.log("Step 1: Entered try block");

    const { messages, mode } = req.body;

    const userRef = db.collection("users").doc(req.user.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const userData = userDoc.data();
    const credits = userData.credits ?? 0;

    console.log("Credits:", credits);

    if (credits <= 0) {
      return res.status(403).json({
        success: false,
        error: "No credits remaining",
      });
    } 

    console.log("Step 2: Messages =", messages);

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: "Messages are required",
      });
    }

    console.log("Step 3: Calling OpenRouter...");

    const reply = await getAIResponse(messages, mode);

    await userRef.update({
      credits: credits - CREDIT_COST,
    });

    console.log("Credits left:", credits - 1);

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