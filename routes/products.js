const express = require('express');
const router = express.Router();

// In-memory products store
const products = [
  { id: 1, name: 'Sample Product', price: 9.99 }
];

// GET /products - return all products
router.get('/', (req, res) => {
  res.json(products);
});

// POST /products - add a new product from JSON body
router.post('/', (req, res) => {
  const { name, price } = req.body || {};
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid product. "name" (string) and "price" (number) are required.' });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
