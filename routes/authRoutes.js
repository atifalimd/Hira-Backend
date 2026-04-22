// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");

// // DEBUG: This will show us if the functions actually loaded
// console.log("DEBUG: registerUser function is ->", authController.registerUser);

// router.post("/register", authController.registerUser);
// router.post("/login", authController.loginUser);
// router.post("/google", googleAuth);

// module.exports = router;

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
