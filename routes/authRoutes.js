const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  googleAuth,
} = require("../controllers/authController.js");

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
