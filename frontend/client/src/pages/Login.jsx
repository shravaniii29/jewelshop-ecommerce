import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await login({ email, password })

    if (res.message === 'SUCCESS') {
      setMsg('Login Successful!')
      setUser(res.user)
      setTimeout(() => navigate('/'), 800) // ✅ same behavior as before
    } else {
      setMsg(res.message || 'Login failed')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f3ed',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px 60px',
          borderRadius: '20px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '380px',
        }}
      >
        <h2
          style={{
            marginBottom: '25px',
            fontSize: '26px',
            color: '#1a1307',
            fontWeight: 'bold',
          }}
        >
          Welcome Back 💎
        </h2>

        {msg && (
          <p
            style={{
              color: msg === 'Login Successful!' ? 'green' : 'red',
              marginBottom: '15px',
              fontSize: '14px',
            }}
          >
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#3b2f1c',
                marginBottom: '5px',
              }}
            >
              Email
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ marginBottom: '25px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#3b2f1c',
                marginBottom: '5px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#d29f6d',
              color: 'white',
              border: 'none',
              padding: '12px 0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => (e.target.style.backgroundColor = '#b57f4d')}
            onMouseOut={e => (e.target.style.backgroundColor = '#d29f6d')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
