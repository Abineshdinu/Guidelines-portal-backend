const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../Controllers/authController");
const { authenticateUser, checkRole } = require("../Middleware/auth");

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Logout user
router.get("/logout", authenticateUser, logoutUser);

// Example of protecting a route based on role
router.get("/admin", authenticateUser, checkRole(['admin']), (req, res) => {
  // Only accessible to users with 'admin' role
  res.json({ message: 'Admin route' });
});


module.exports = router;
