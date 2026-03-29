import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";

export default function Signup({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await register({ name, email, password });
    if (res.message === "SUCCESS") {
      setMsg("Register Successful!");
      setUser({ name, email });
      setTimeout(() => navigate("/"), 800);
    } else {
      setMsg("Register failed");
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#f6eee2ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 60px",
          borderRadius: "15px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px", color: "#1f0816ff", fontSize: "1.8rem" }}>
          Create Your Account ✨
        </h2>

        {msg && (
          <div
            style={{
              backgroundColor: msg.includes("Successful") ? "#d1f0d1" : "#f8d7da",
              color: msg.includes("Successful") ? "#155724" : "#721c24",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ fontWeight: "bold", color: "#181102ff" }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ fontWeight: "bold", color: "#181102ff" }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px", textAlign: "left" }}>
            <label style={{ fontWeight: "bold", color: "#181102ff" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginTop: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#d4a373",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              fontWeight: "bold",
              fontSize: "1rem",
              width: "100%",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
