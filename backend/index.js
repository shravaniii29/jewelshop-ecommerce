const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3002;


app.use(cors());
app.use(bodyParser.json());


// Simple in-memory product list (frontend will fetch this)
const PRODUCTS = [
{ id: 1, name: 'Gold Stud Earrings', type: 'Earrings', price: 1200 },
{ id: 2, name: 'Pearl Necklace', type: 'Necklace', price: 2500 },
{ id: 3, name: 'Diamond Ring', type: 'Ring', price: 5500 },
{ id: 4, name: 'Silver Bracelet', type: 'Bracelet', price: 800 },
{ id: 5, name: 'Emerald Pendant', type: 'Pendant', price: 3200 }
];


// Routes
app.get('/api/products', (req, res) => {
res.json({ products: PRODUCTS });
});


// Auth simulation: register & login
app.post('/api/auth/register', (req, res) => {
// You can inspect req.body here in Dev tools; we simply respond SUCCESS
console.log('Register request', req.body);
res.json({ message: 'SUCCESS' });
});


app.post('/api/auth/login', (req, res) => {
console.log('Login request', req.body);
// Simulate a successful login and return a fake token
res.json({ message: 'SUCCESS', token: 'fake-jwt-token' });
});


// Simulate add to cart
app.post('/api/cart/add', (req, res) => {
console.log('Add to cart', req.body);
res.json({ message: 'SUCCESS' });
});


// Simulate checkout
app.post('/api/checkout', (req, res) => {
console.log('Checkout', req.body);
res.json({ message: 'SUCCESS' });
});


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});