const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route POST /api/users
// @desc Register new user
router.post("/", async (req, res) => {
  const { name, email, contact } = req.body;

  if (!name || !email || !contact) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    let user = await User.findOne({ contact });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    user = await User.create({ name, email, contact });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route GET /api/users/identity-exist
// @desc Check if user exists by phone
router.get("/identity-exist", async (req, res) => {
  const { contact } = req.query;
  if (!contact) return res.status(400).json({ message: "Missing contact" });

  try {
    const user = await User.findOne({ contact: contact });
    res.status(200).json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/users/verify-otp
// @desc Verify fixed OTP (666666)
router.post("/verify-otp", async (req, res) => {
  const { contact, otp } = req.body;

  if (!contact || !otp) {
    return res.status(400).json({ message: "Missing contact or OTP" });
  }

  if (otp !== "666666") {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  try {
    const user = await User.findOne({ contact });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ ...user._doc, otpVerified: true });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
