const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // 3. Decode the token using your secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user and attach to the request (minus password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move to the controller
    } catch (error) {
      console.error("Token Error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
