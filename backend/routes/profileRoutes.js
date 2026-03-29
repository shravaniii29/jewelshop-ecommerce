import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// ✅ GET all addresses for a user
router.get("/addresses/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT id, address_line, city, state, pincode FROM addresses WHERE user_id = ?",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching addresses:", err);
    res.status(500).json({ success: false, message: "Failed to fetch addresses" });
  }
});

// ✅ GET all orders for a user
router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT o.id, o.total_amount, o.order_date AS created_at, o.payment_status, 
              a.address_line, a.city, a.state 
       FROM orders o 
       JOIN addresses a ON o.address_id = a.id 
       WHERE o.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

// ✅ POST add a new address
router.post("/address", async (req, res) => {
  console.log("📩 Received address data:", req.body);

  const { userId, address_line, city, state, pincode } = req.body;

  if (!userId || !address_line || !city || !state || !pincode) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    await pool.query(
      "INSERT INTO addresses (user_id, address_line, city, state, pincode) VALUES (?, ?, ?, ?, ?)",
      [userId, address_line, city, state, pincode]
    );
    res.json({ success: true, message: "Address saved successfully" });
  } catch (err) {
    console.error("❌ Error saving address:", err);
    res.status(500).json({ success: false, message: "Failed to save address" });
  }
});

export default router;
