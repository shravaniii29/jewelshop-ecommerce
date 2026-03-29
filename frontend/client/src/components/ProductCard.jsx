import React from 'react';

export default function ProductCard({ product, onAdd, user }) {
  function handleAddClick() {
    if (!user) {
      alert('Please log in to add items to your cart 🛍️');
      return;
    }
    onAdd(product);
  }

  return (
    <div
      style={{
        borderRadius: "15px",
        padding: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
      <h3 style={{ margin: "15px 0 5px 0", fontSize: "1.3rem", color: "#333" }}>{product.name}</h3>
      <p style={{ color: "#7f1010ff", margin: "0" }}>{product.type}</p>
      <p style={{ fontWeight: "bold", margin: "8px 0", fontSize: "1.1rem" }}>{product.price}</p>
      <button
        onClick={handleAddClick}
        style={{
          backgroundColor: "#181102ff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 15px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "100%",
          marginTop: "10px",
          color: "white",
        }}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}
