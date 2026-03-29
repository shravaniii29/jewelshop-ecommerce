import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount, user, setUser }) {
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user"); // ✅ clear stored user if any
  }

  const username =
    user && (user.name || user.email)
      ? (user.name || user.email).split("@")[0]
      : null;

  return (
    <nav
      style={{
        padding: 12,
        borderBottom: "1px solid #181102ff",
        marginBottom: 12,
        backgroundColor: "#181102ff",
        color: "white",
      }}
    >
      <Link to="/" style={{ marginRight: 12, color: "white", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/cart" style={{ marginRight: 12, color: "white", textDecoration: "none" }}>
        Cart ({cartCount})
      </Link>

      {!user && (
        <>
          <Link to="/login" style={{ marginRight: 12, color: "white", textDecoration: "none" }}>
            Login
          </Link>
          <Link to="/signup" style={{ marginRight: 12, color: "white", textDecoration: "none" }}>
            Signup
          </Link>
        </>
      )}

      {user && (
        <>
          {/* ✅ New Profile link */}
          <Link
            to="/profile"
            style={{ marginRight: 12, color: "white", textDecoration: "none" }}
          >
            Profile
          </Link>

          <span style={{ marginLeft: 12, marginRight: 12 }}>
            Hello, {username}
          </span>

          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "1px solid white",
              borderRadius: 4,
              color: "white",
              cursor: "pointer",
              padding: "2px 6px",
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
