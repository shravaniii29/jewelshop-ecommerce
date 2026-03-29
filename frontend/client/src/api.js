// ==========================================
// 🪙 Jewellery E-commerce API Utility File
// Handles all frontend <-> backend communication
// ==========================================

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";

// 🛍️ Fetch all products
export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  return res.json();
}

// 👤 Register new user
export async function register(data) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔐 Login existing user
export async function login(data) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🛒 Add to cart (placeholder)
export async function addToCart(data) {
  const res = await fetch(`${API_BASE}/api/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 💳 Checkout
export async function checkout(data) {
  const res = await fetch(`${API_BASE}/api/order/place`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 📍 Addresses
export async function getAddresses(userId) {
  const res = await fetch(`${API_BASE}/api/profile/addresses/${userId}`);
  return res.json();
}

export async function addAddress(data) {
  const res = await fetch(`${API_BASE}/api/profile/address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🧾 Orders
export async function getOrders(userId) {
  const res = await fetch(`${API_BASE}/api/profile/orders/${userId}`);
  return res.json();
}
