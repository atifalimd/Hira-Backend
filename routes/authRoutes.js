const express = require("express");
const router = express.Router();
// 1. Destructure all functions from your controller
const {
  registerUser,
  loginUser,
  googleAuth,
} = require("../controllers/authController");

console.log("DEBUG: Functions loaded:", {
  register: !!registerUser,
  login: !!loginUser,
  google: !!googleAuth,
});

// 2. Map the endpoints to the functions
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);

module.exports = router;
