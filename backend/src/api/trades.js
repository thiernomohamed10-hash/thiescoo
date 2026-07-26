const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');
const { authMiddleware } = require('../middleware/auth');
const TradingService = require('../services/trading.service');

// Get all trades
router.get('/', authMiddleware, async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ data: trades });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trade by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const trade = await Trade.findOne({ _id: req.params.id, userId: req.userId });
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    res.json({ data: trade });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Open new trade
router.post('/open', authMiddleware, async (req, res) => {
  try {
    const { symbol, direction, stake, expiry } = req.body;

    if (!symbol || !direction || !stake) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const trade = new Trade({
      userId: req.userId,
      symbol,
      direction,
      stake,
      expiry: expiry || 300, // 5 minutes default
      status: 'open',
      openPrice: Math.random() * 100, // Mock price
      openTime: new Date(),
    });

    await trade.save();

    // Emit to Pocket Option API
    await TradingService.placeTrade(trade);

    res.json({ message: 'Trade opened', data: trade });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Close trade
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const trade = await Trade.findOne({ _id: req.params.id, userId: req.userId });
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    trade.status = 'closed';
    trade.closeTime = new Date();
    trade.closePrice = Math.random() * 100; // Mock price
    trade.profit = (trade.closePrice - trade.openPrice) * trade.stake;

    await trade.save();

    res.json({ message: 'Trade closed', data: trade });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
