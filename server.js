// server.js: wrapper entrypoint that starts the already-created http server
// It imports `index.js` to start the server, prints a friendly message, and handles graceful shutdown signals.

const server = require('./index');

console.log(`Application started. PID: ${process.pid}`);

function shutdown(signal){
  console.log(`Received ${signal}. Shutting down...`);
  // index.js exports the server instance so we can close it
  if (server && server.close) {
    server.close(() => {
      console.log('HTTP server closed. Exiting.');
      process.exit(0);
    });
    // Force exit after 5s
    setTimeout(() => process.exit(1), 5000).unref();
  } else {
    process.exit(0);
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
