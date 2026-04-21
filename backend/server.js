require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

connectDB();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

const shutdown = (signal) => {
  console.log(`Received ${signal}. Graceful shutdown started.`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
