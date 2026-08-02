import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../admin-panel')));

// Health Check (TRÈS IMPORTANT pour Railway)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: '🤖 Thiescoo Trading Platform API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      admin: '/admin',
      api: '/api'
    }
  });
});

// Admin Panel Route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin-panel/index.html'));
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/signals', (req, res) => {
  res.json({
    data: [],
    message: 'No signals available yet',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/trades', (req, res) => {
  res.json({
    data: [],
    message: 'No trades yet',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  res.json({
    message: 'Registration successful',
    user: { name, email },
    token: 'token-' + Date.now()
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  
  res.json({
    message: 'Login successful',
    token: 'token-' + Date.now()
  });
});

// Admin Routes
app.get('/api/admin/dashboard', (req, res) => {
  res.json({
    stats: {
      totalUsers: 0,
      activeTraders: 0,
      totalTrades: 0,
      totalProfit: 0,
      successRate: 0,
      botStatus: 'online',
      uptime: '99.9%',
      lastUpdate: new Date()
    }
  });
});

app.post('/api/admin/signals/broadcast', (req, res) => {
  const { symbol, direction, confidence } = req.body;
  
  if (!symbol || !direction) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  res.json({
    message: 'Signal broadcasted to all users',
    signal: {
      symbol,
      direction,
      confidence: confidence || 0,
      sentAt: new Date(),
      recipientCount: 0
    }
  });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Credentials de test
  if (username === 'admin' && password === 'admin123') {
    res.json({
      token: 'admin-token-' + Date.now(),
      admin: {
        id: '1',
        username: 'admin',
        email: 'admin@thiescoo.dev',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Pocket Option Routes
app.post('/api/pocketoption/connect', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }
  
  res.json({
    message: 'Connected to Pocket Option',
    status: 'connected',
    account: {
      email,
      balance: 1000,
      currency: 'USD'
    }
  });
});

app.get('/api/pocketoption/account', (req, res) => {
  res.json({
    account: {
      email: 'user@example.com',
      balance: 1000,
      profit: 0,
      currency: 'USD',
      status: 'active'
    }
  });
});

app.get('/api/pocketoption/assets', (req, res) => {
  res.json({
    assets: [
      { symbol: 'EUR/USD', available: true },
      { symbol: 'GBP/USD', available: true },
      { symbol: 'USD/JPY', available: true },
      { symbol: 'APPLE', available: true },
      { symbol: 'GOOGLE', available: true },
      { symbol: 'BITCOIN', available: true }
    ]
  });
});

// Telegram Webhook (for later)
app.post('/webhook/telegram', (req, res) => {
  res.json({ ok: true });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: [
      'GET /health',
      'GET /api/signals',
      'GET /api/trades',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /admin'
    ]
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Server error',
    timestamp: new Date().toISOString()
  });
});

// Start Server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`\n${'='*50}`);
  console.log('🚀 Thiescoo Backend Server Started');
  console.log(`${'='*50}`);
  console.log(`📍 Port: ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Time: ${new Date().toISOString()}`);
  console.log(`${'='*50}`);
  console.log('\n📋 Available Endpoints:');
  console.log(`  ✅ GET  /health                  - Health check`);
  console.log(`  ✅ GET  /                        - API Info`);
  console.log(`  ✅ GET  /admin                   - Admin Panel`);
  console.log(`  ✅ GET  /api/signals             - Get signals`);
  console.log(`  ✅ GET  /api/trades              - Get trades`);
  console.log(`  ✅ POST /api/auth/register       - Register`);
  console.log(`  ✅ POST /api/auth/login          - Login`);
  console.log(`  ✅ POST /api/admin/login         - Admin login`);
  console.log(`  ✅ POST /api/admin/signals/broadcast - Send signal`);
  console.log(`\n🔗 Access at: http://localhost:${port}\n`);
});

// Handle Errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('\n📛 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n📛 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export default app;
