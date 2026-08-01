import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (IMPORTANT for Railway)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Thiescoo Trading Platform API',
    version: '1.0.0',
    status: 'running'
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/api/signals', (req, res) => {
  res.json({
    data: [],
    message: 'No signals available yet'
  });
});

app.get('/api/trades', (req, res) => {
  res.json({
    data: [],
    message: 'No trades yet'
  });
});

app.post('/api/auth/register', (req, res) => {
  res.json({
    message: 'Registration endpoint',
    status: 'ready'
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({
    message: 'Login endpoint',
    status: 'ready'
  });
});

// MongoDB Connection (optional)
if (process.env.MONGODB_URI) {
  console.log('Connecting to MongoDB...');
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.log('⚠️  MongoDB connection failed:', err.message));
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Start server
const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`\n✅ Thiescoo Backend running on port ${port}`);
  console.log(`📡 Health check: http://localhost:${port}/health`);
  console.log(`🌐 API URL: http://localhost:${port}/api`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});

export default app;
