const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Trade = require('../models/Trade');

// Get portfolio stats
router.get('/', authMiddleware, async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.userId });

    const totalTrades = trades.length;
    const winningTrades = trades.filter(t => t.profit > 0).length;
    const totalProfit = trades.reduce((sum, t) => sum + (t.profit || 0), 0);
    const winRate = totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(2) : 0;

    res.json({
      data: {
        totalTrades,
        winningTrades,
        winRate: `${winRate}%`,
        totalProfit: totalProfit.toFixed(2),
        balance: (5000 + totalProfit).toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
