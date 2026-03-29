import React, { useEffect, useState } from "react";
import "../styles/Profile.css";

const API_BASE = "http://localhost:3002";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newAddress, setNewAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;
    setUser(storedUser);

    fetchAddresses(storedUser.id);
    fetchOrders(storedUser.id);
  }, []);

  const fetchAddresses = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/api/profile/addresses/${userId}`);
      const data = await res.json();

      if (Array.isArray(data)) setAddresses(data);
      else if (data.addresses) setAddresses(data.addresses);
      else setAddresses([]);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/api/profile/orders/${userId}`);
      const data = await res.json();

      if (Array.isArray(data)) setOrders(data);
      else if (data.orders) setOrders(data.orders);
      else setOrders([]);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // ✅ FIXED: send correct fields & match backend naming
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch(`${API_BASE}/api/profile/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id, // ✅ backend expects `userId`
          address_line: newAddress.address_line,
          city: newAddress.city,
          state: newAddress.state,
          pincode: newAddress.pincode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Address added successfully!");
        setNewAddress({ address_line: "", city: "", state: "", pincode: "" });
        fetchAddresses(user.id);
      } else {
        alert("Failed to add address");
      }
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <section className="profile-section">
        <h2>Personal Info</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>

      <section className="profile-section">
        <h2>Saved Addresses</h2>
        {addresses.length > 0 ? (
          <ul>
            {addresses.map((a) => (
              <li key={a.id}>
                {(a.address_line || a.address)}, {a.city}, {a.state} - {a.pincode}
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved addresses yet.</p>
        )}

        <form onSubmit={handleAddAddress} className="address-form">
          <h3>Add New Address</h3>
          <input
            type="text"
            name="address_line"
            placeholder="Address Line"
            value={newAddress.address_line}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newAddress.city}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={newAddress.state}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={newAddress.pincode}
            onChange={handleAddressChange}
            required
          />
          <button type="submit">Save Address</button>
        </form>
      </section>

      <section className="profile-section">
        <h2>Past Orders</h2>
        {orders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>₹{o.total_amount}</td>
                  <td>{o.payment_status}</td>
                  <td>{new Date(o.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders yet.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
