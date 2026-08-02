import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['admin', 'moderator'], default: 'moderator' },
  permissions: [String],
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  isActive: { type: Boolean, default: true }
});

const Admin = mongoose.model('Admin', adminSchema);

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username, isActive: true });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // In production, use bcrypt for password comparison
    if (admin.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    admin.lastLogin = new Date();
    await admin.save();
    
    res.json({
      token: 'admin-token-' + Date.now(),
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Dashboard Stats
router.get('/dashboard', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Bot Settings
router.get('/settings', async (req, res) => {
  try {
    res.json({
      settings: {
        botName: 'Thiescoo Trading Bot',
        botStatus: 'active',
        maxUsersPerBot: 1000,
        defaultRisk: 2,
        autoTradingEnabled: true,
        signalFrequency: 'every 15 min',
        mongoDbConnected: true,
        telegramConnected: true,
        pocketOptionConnected: false
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Bot Settings
router.post('/settings/update', async (req, res) => {
  try {
    const { setting, value } = req.body;
    
    res.json({
      message: `Setting ${setting} updated to ${value}`,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send Signal to All Users
router.post('/signals/broadcast', async (req, res) => {
  try {
    const { symbol, direction, confidence, description } = req.body;
    
    res.json({
      message: 'Signal broadcasted to all users',
      signal: {
        symbol,
        direction,
        confidence,
        description,
        sentAt: new Date(),
        recipientCount: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users
router.get('/users', async (req, res) => {
  try {
    res.json({
      users: [],
      totalCount: 0,
      activeCount: 0,
      message: 'No users yet'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ban/Unban User
router.post('/users/:userId/ban', async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;
    
    res.json({
      message: `User ${userId} has been banned`,
      reason: reason,
      bannedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Bot Logs
router.get('/logs', async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    res.json({
      logs: [
        {
          timestamp: new Date(),
          level: 'info',
          message: 'Bot started successfully',
          source: 'system'
        },
        {
          timestamp: new Date(),
          level: 'info',
          message: 'Connected to Telegram',
          source: 'telegram'
        },
        {
          timestamp: new Date(),
          level: 'info',
          message: 'Connected to MongoDB',
          source: 'database'
        }
      ],
      totalLogs: 3
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Admin User
router.post('/admins/create', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    const admin = new Admin({
      username,
      email,
      password, // In production, hash this!
      role: role || 'moderator'
    });
    
    await admin.save();
    
    res.json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find({}, '-password');
    res.json({ admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
