import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';
import axios from 'axios';

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ line: '', city: '', state: '', pincode: '' });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });

  // clean cart values
  const cleanCart = cart.map(item => ({
    ...item,
    price: typeof item.price === 'string'
      ? Number(item.price.replace(/[^0-9.-]+/g, ''))
      : item.price
  }));

  const total = cleanCart.reduce((sum, p) => sum + p.price, 0);

  const handleAddressSubmit = () => {
    if (!address.line || !address.city || !address.state || !address.pincode) {
      setMsg('Please fill all address fields');
      return;
    }
    setStep(2);
  };

  const handlePayment = async () => {
    if (!card.number || !card.expiry || !card.cvv) {
      setMsg('Please fill all payment details');
      return;
    }

    try {
      const user_id = 3; // ✅ replace with logged-in user ID
      const address_id = 1; // temporary; can later save new address

      const res = await axios.post('http://localhost:3002/api/order/place', {
        user_id,
        total_amount: total,
        address_id,
      });

      if (res.data.success) {
        setMsg('Order placed successfully!');
        clearCart();
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMsg('Payment failed');
      }
    } catch {
      setMsg('Payment failed');
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      {cleanCart.length === 0 ? (
        <p className="empty-msg">No items to checkout.</p>
      ) : step === 1 ? (
        <div className="checkout-card">
          <h3>Shipping Address</h3>
          <input placeholder="Address Line" value={address.line} onChange={e => setAddress({ ...address, line: e.target.value })}/>
          <input placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })}/>
          <input placeholder="State" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })}/>
          <input placeholder="Pincode" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })}/>
          <button className="pay-btn" onClick={handleAddressSubmit}>Continue to Payment</button>
          {msg && <div className="checkout-msg">{msg}</div>}
        </div>
      ) : (
        <div className="checkout-card">
          <h3>Payment Details</h3>
          <input placeholder="Card Number" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })}/>
          <input placeholder="Expiry Date" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })}/>
          <input placeholder="CVV" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })}/>
          <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
          {msg && <div className="checkout-msg">{msg}</div>}
        </div>
      )}
    </div>
  );
}
