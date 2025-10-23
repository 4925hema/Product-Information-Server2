<<<<<<< HEAD
# Simple Product API

This small Node.js + Express API serves product data and allows adding new products.

Features:
- Express server on port 4000
- Routes in `routes/products.js`:
  - GET /products
  - POST /products
- Uses `os` to print platform and CPU core count at startup
- Uses the `http` module to log every request method and URL
- CORS and `express.json()` middleware enabled

Quick start

1. Install dependencies

```cmd
cd c:\Users\HEMANJANEYULU\Desktop\product
npm install
```

2. Start server

```cmd
npm start
```

3. Example requests

GET all products:

```cmd
curl http://localhost:4000/products
```

POST a new product:

```cmd
curl -X POST http://localhost:4000/products -H "Content-Type: application/json" -d "{\"name\":\"New Item\", \"price\":19.99}"
```
=======
# Product-Information-Server2
>>>>>>> c87952114a74af5c91f4c29cf1579070e5ccaf1b
