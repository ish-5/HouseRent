const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET, requireAuth } = require("../middleware/auth");

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      granted: user.granted,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Admin accounts must never be self-registered through the public API —
    // only "renter" and "owner" can sign up here. Admins are created via
    // server/seed.js (or promoted by an existing admin) with real DB access.
    if (!["renter", "owner"].includes(userType)) {
      return res.status(403).json({ message: "Only Renter and Owner accounts can be registered" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      // Same email is already registered. Only let this through if the
      // password matches too — that's the same person adding a second role
      // (e.g. an existing owner signing up as a renter). Different password
      // means someone else owns that email, so it's a real conflict.
      const passwordMatches = await bcrypt.compare(password, existing.password);
      if (!passwordMatches) {
        return res.status(409).json({ message: "An account with this email already exists" });
      }

      const existingRoles = existing.roles && existing.roles.length ? existing.roles : [existing.userType];
      if (existingRoles.includes(userType)) {
        return res.status(409).json({ message: "An account with this email already exists" });
      }

      existing.roles = [...existingRoles, userType];
      existing.userType = userType; // log them in as the role they just added
      await existing.save();

      const token = signToken(existing);
      return res.status(201).json({
        token,
        user: {
          id: existing._id,
          name: existing.name,
          email: existing.email,
          userType: existing.userType,
          roles: existing.roles,
          granted: existing.granted,
        },
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      userType,
      roles: [userType],
    });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        roles: user.roles,
        granted: user.granted,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password, loginAs } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const roles = user.roles && user.roles.length ? user.roles : [user.userType];

    // Account has more than one role (e.g. owner + renter) — the client
    // needs to say which one to log in as before we issue a token.
    if (roles.length > 1) {
      if (!loginAs) {
        return res.status(200).json({ needsRoleSelection: true, roles });
      }
      if (!roles.includes(loginAs)) {
        return res.status(400).json({ message: "Invalid role for this account" });
      }
      if (user.userType !== loginAs) {
        user.userType = loginAs;
        await user.save();
      }
    }

    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        roles,
        granted: user.granted,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
});

module.exports = router;
