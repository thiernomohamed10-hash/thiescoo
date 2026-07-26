const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const SignalService = require('../services/signal.service');

// Get all signals
router.get('/', authMiddleware, async (req, res) => {
  try {
    const signals = await SignalService.getSignals();
    res.json({ data: signals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get signals by symbol
router.get('/:symbol', authMiddleware, async (req, res) => {
  try {
    const signals = await SignalService.getSignalsBySymbol(req.params.symbol);
    res.json({ data: signals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
