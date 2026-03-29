# 💎 JewelShop - Jewellery E-Commerce Website

A full-stack e-commerce web application designed to modernize jewellery shopping by enabling users to browse products, manage profiles, store addresses, and view order history.

## 🚀 Features

- 🔐 User Authentication (Signup/Login with encrypted passwords)
- 💍 Product Browsing with images and pricing
- 📦 Order History tracking
- 📍 Address Management system
- 🔄 REST API-based communication
- 🧩 MVC Architecture implementation

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS / Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Other
- bcrypt (for password hashing)

---

## 📁 Project Structure

    jewelshop-ecommerce/
    │
    ├── backend/
    │   ├── controllers/
    │   ├── routes/
    │   ├── models/
    │   ├── middleware/
    │   └── server.js
    │
    ├── frontend/
    │   └── client/
    │       ├── src/
    │       ├── public/
    │       └── package.json
    │
    └── .gitignore

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
    git clone https://github.com/shravaniii29/jewelshop-ecommerce.git
    cd jewelshop-ecommerce

---

### 2️⃣ Backend Setup
    cd backend
    npm install

Create a `.env` file:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=jewelshop
    JWT_SECRET=your_secret_key

Run backend:
    npm start

---

### 3️⃣ Frontend Setup
    cd frontend/client
    npm install
    npm run dev

---

## 🧠 System Design

- Follows MVC Architecture  
- Uses RESTful APIs  
- Secure authentication using bcrypt  
- MySQL relational database  

---

## ⚠️ Known Issues

- Address and order history currently work correctly only for the first registered user (under improvement)

---

## 🔮 Future Enhancements

- Payment Gateway Integration (Razorpay/Stripe)  
- Admin Dashboard  
- Product Search & Filtering  
- Cloud Deployment  
- AI-based recommendations  

---
---

## 🤝 Contribution

This is a learning project. Contributions, suggestions, and improvements are welcome!

---

## 👩‍💻 Author

Shravani Bhole

---

