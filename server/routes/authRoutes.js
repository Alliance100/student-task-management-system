const express = require("express");

const router = express.Router();

const {
    register,
    login,
    getProfile
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

// POST register
router.post("/register", register);

// POST login
router.post("/login", login);

// GET profile (protected)
router.get("/profile", protect, getProfile);

module.exports = router;
