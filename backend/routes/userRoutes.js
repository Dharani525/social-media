const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  User.create(username, email, hashedPassword, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(201).json({ message: "User registered successfully" });
  });
});

// Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: "Invalid email credentials" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({message:"login successfully", token, user });
  });
});

module.exports = router;
