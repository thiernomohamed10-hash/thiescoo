import express from 'express';
const router = express.Router();

// Get All Trades
router.get('/', async (req, res) => {
  try {
    res.json({
      trades: [],
      total: 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Trade
router.post('/', async (req, res) => {
  try {
    const { symbol, direction, amount, expiry } = req.body;
    
    res.json({
      message: 'Trade created',
      trade: {
        id: Math.random().toString(36).substr(2, 9),
        symbol,
        direction,
        amount,
        expiry,
        status: 'pending',
        createdAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Close Trade
router.post('/:id/close', async (req, res) => {
  try {
    res.json({
      message: `Trade ${req.params.id} closed`,
      result: 'win'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
