const express = require('express');
const http = require('http');
const os = require('os');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// HTTP module request logging
// Create a simple server that logs method and URL for every incoming request, then passes to Express
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  app(req, res);
});

// Serve static files from /public
app.use(express.static('public'));

// Mount API routes
app.use('/products', productsRouter);

// Start the server and print OS info
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Platform: ${os.platform()}`);
  console.log(`CPU cores: ${os.cpus().length}`);
  console.log(`Total Memory: ${Math.round(os.totalmem() / (1024 * 1024))} MB`);
});

module.exports = server;
