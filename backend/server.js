import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js"; // ✅ use shared pool
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import orderRoutes from "./routes/orderRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test DB connection on startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log(`✅ Connected to MySQL Database: ${process.env.DB_NAME}`);
    conn.release();
  } catch (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
    process.exit(1);
  }
})();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/profile", profileRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("💍 Jewellery E-Commerce API is running ✨");
});

// ✅ 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Centralized error handler
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

// --------------------
// Order Placement Route
// --------------------
app.post("/api/order/place", async (req, res) => {
  try {
    console.log("✅ Order received:", req.body);
    res.json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    console.error("❌ Order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
