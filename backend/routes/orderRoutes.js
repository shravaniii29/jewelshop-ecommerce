import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ Create local pool here to avoid circular import issue
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// save address (optional future use)
router.post("/address", async (req, res) => {
  const { user_id, address_line, city, state, pincode } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO addresses (user_id, address_line, city, state, pincode) VALUES (?, ?, ?, ?, ?)",
      [user_id, address_line, city, state, pincode]
    );
    res.json({ success: true, address_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to save address" });
  }
});

// place order
router.post("/place", async (req, res) => {
  const { user_id, total_amount, address_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO orders (user_id, total_amount, address_id, payment_status) VALUES (?, ?, ?, ?)",
      [user_id, total_amount, address_id, "Success"]
    );
    res.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
});

export default router;
