const admin = require("../firebase/firebase_admin");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Missing authentication token",
      });
    }

    const token = authHeader.split("Bearer ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);

    return res.status(401).json({
      error: "Invalid authentication token",
    });
  }
};

module.exports = authenticateUser;