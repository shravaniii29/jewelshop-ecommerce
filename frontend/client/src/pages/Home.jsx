import React from "react";
import ProductCard from "../components/ProductCard";

export default function Home({ onAddToCart, user }) {
  const products = [
    { id: 1, name: "Gold Necklace", type: "Necklace", price: "₹12,000", image: "/images/j1.jpg" },
    { id: 2, name: "Diamond Ring", type: "Ring", price: "₹25,000", image: "/images/j2.jpg" },
    { id: 3, name: "Silver Bracelet", type: "Bracelet", price: "₹5,000", image: "/images/j3.jpg" },
    { id: 4, name: "Pearl Earrings", type: "Earrings", price: "₹8,000", image: "/images/j4.jpg" },
    { id: 5, name: "Emerald Pendant", type: "Pendant", price: "₹15,000", image: "/images/j5.jpg" },
    { id: 6, name: "Gold Bangles", type: "Bangles", price: "₹10,000", image: "/images/j6.jpg" },
    { id: 7, name: "Diamond Bracelet", type: "Bracelet", price: "₹30,000", image: "/images/j7.jpg" },
    { id: 8, name: "Ruby Necklace", type: "Necklace", price: "₹22,000", image: "/images/j8.jpg" },
    { id: 9, name: "Silver Anklet", type: "Anklet", price: "₹4,500", image: "/images/j9.jpg" },
    { id: 10, name: "Gold Earrings", type: "Earrings", price: "₹11,000", image: "/images/j10.jpg" },
    { id: 11, name: "Diamond Pendant", type: "Pendant", price: "₹18,500", image: "/images/j11.jpg" },
    { id: 12, name: "Pearl Bracelet", type: "Bracelet", price: "₹7,800", image: "/images/j12.jpg" },
  ];

  return (
    <div style={{ backgroundColor: "#f6eee2ff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Banner Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "450px",
          overflow: "hidden",
          marginBottom: "50px",
        }}
      >
        <img
          src="/images/banner.jpg"
          alt="Jewellery Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(75%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
            color: "white",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          <h1 style={{ fontSize: "3.2rem", marginBottom: "15px" }}>Welcome to JewelShop</h1>
          <p style={{ fontSize: "1.5rem", maxWidth: "500px", lineHeight: "1.4" }}>
            Where elegance meets craftsmanship — discover timeless pieces made just for you.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div
        style={{
          flex: "1",
          padding: "0 50px 80px 50px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onAdd={onAddToCart}
            user={user}
          />
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#181102ff",
          color: "white",
          textAlign: "center",
          padding: "20px",
          fontSize: "1rem",
          letterSpacing: "0.5px",
        }}
      >
        © {new Date().getFullYear()} JewelShop — Crafted with 💕 for timeless beauty.
      </footer>
    </div>
  );
}
