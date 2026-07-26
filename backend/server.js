require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const logger = require('./src/utils/logger');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thiescoo')
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// WebSocket Connection
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('subscribe_prices', (symbol) => {
    logger.info(`Client subscribed to ${symbol}`);
    socket.join(`price_${symbol}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Routes
app.use('/api/auth', require('./src/api/auth'));
app.use('/api/trades', require('./src/api/trades'));
app.use('/api/signals', require('./src/api/signals'));
app.use('/api/portfolio', require('./src/api/portfolio'));
app.use('/api/indicators', require('./src/api/indicators'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error Handling
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = { app, io };
