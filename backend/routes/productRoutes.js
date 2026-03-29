import express from "express";
import { getProducts, addToCart, checkout } from "../controllers/productController.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/add", addToCart);
router.post("/checkout", checkout);

export default router;
