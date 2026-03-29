import { products } from "../utils/fakeData.js";

export const getProducts = (req, res) => {
  res.json(products);
};

export const addToCart = (req, res) => {
  console.log("Item added to cart:", req.body);
  res.json({ message: "Added to cart SUCCESS" });
};

export const checkout = (req, res) => {
  res.json({ message: "Checkout SUCCESS" });
};
