import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

const router = express.Router();

// ✅ REGISTER (Signup)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("📥 Received signup data:", req.body);

  try {
    console.log("🔍 Checking DB connection...");
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name || "User", email, hashedPassword]
    );

    console.log("✅ User registered successfully with id:", result.insertId);
    res.json({ message: "SUCCESS", user_id: result.insertId });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "SUCCESS",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
