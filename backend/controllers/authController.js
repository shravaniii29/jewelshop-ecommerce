import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/User.js";

// 🔹 Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if all fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    await createUser(name, email, hashedPassword);

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// 🔹 Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
