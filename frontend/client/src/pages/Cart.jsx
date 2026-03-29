import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();

  // Calculate total properly
  const total = cart.reduce((sum, item) => {
    const numericPrice = Number(item.price.replace(/[^\d]/g, ""));
    return sum + (isNaN(numericPrice) ? 0 : numericPrice);
  }, 0);

  if (cart.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#f6eee2ff",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "#181102ff" }}>Your Cart is Empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            backgroundColor: "#181102ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f6eee2ff",
        minHeight: "90vh",
        padding: "50px 80px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#181102ff",
          marginBottom: "40px",
        }}
      >
        Your Cart
      </h2>

      {/* Product Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "230px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h3 style={{ fontSize: "1.3rem", marginBottom: "8px", color: "#333" }}>
                {item.name}
              </h3>
              <p style={{ color: "#7f1010ff", margin: "4px 0" }}>{item.type}</p>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem", margin: "10px 0" }}>
                {item.price}
              </p>
              <button
                onClick={() => removeFromCart(index)}
                style={{
                  backgroundColor: "#7f1010ff",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "8px",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "1.8rem",
            marginBottom: "25px",
            color: "#181102ff",
          }}
        >
          Total: <span style={{ fontWeight: "bold" }}>₹{total.toLocaleString()}</span>
        </h3>

        <button
          onClick={() => navigate("/checkout")}
          style={{
            backgroundColor: "#181102ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 30px",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
