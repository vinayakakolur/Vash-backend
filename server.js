const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/chat", chatRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Vash Backend is running",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});