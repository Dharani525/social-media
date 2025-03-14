const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  let token = req.header("Authorization");

  // console.log("Token received at backend:", token); // Log received token

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length); // Remove "Bearer " prefix
    }

    // console.log("Token after processing:", token); // Log token after stripping "Bearer "

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded user:", decoded); // Log decoded user info

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
