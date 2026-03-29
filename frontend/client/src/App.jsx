import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'
import { addToCart } from './api'
import Profile from './pages/Profile' // ✅ added

export default function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // ✅ Save user to localStorage when logged in
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  async function handleAddToCart(product) {
    if (!user) {
      alert('Please log in to add items to your cart!')
      navigate('/login')
      return
    }

    try {
      await addToCart({ userId: user.id, productId: product.id })
    } catch (err) {
      console.error('Error adding to cart:', err)
    }

    setCart(prev => [...prev, product])
    alert(`${product.name} successfully added to cart!`)
  }

  function handleClearCart() {
    setCart([])
  }

  function handleRemoveFromCart(index) {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <Navbar cartCount={cart.length} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={handleRemoveFromCart} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={handleClearCart} />}
        />
        {/* ✅ Profile page will now receive user properly */}
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </div>
  )
}
