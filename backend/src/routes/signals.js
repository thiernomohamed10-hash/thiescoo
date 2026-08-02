import express from 'express';
const router = express.Router();

// Get All Signals
router.get('/', async (req, res) => {
  try {
    res.json({
      signals: [
        {
          id: 1,
          symbol: 'EUR/USD',
          direction: 'CALL',
          confidence: 75,
          timestamp: new Date(),
          status: 'active'
        },
        {
          id: 2,
          symbol: 'GBP/USD',
          direction: 'PUT',
          confidence: 68,
          timestamp: new Date(),
          status: 'active'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Signal
router.post('/', async (req, res) => {
  try {
    const { symbol, direction, confidence, description, expiry } = req.body;
    
    const signal = {
      symbol,
      direction,
      confidence,
      description,
      expiry,
      createdAt: new Date(),
      status: 'active'
    };
    
    res.json({
      message: 'Signal created successfully',
      signal
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Signal by ID
router.get('/:id', async (req, res) => {
  try {
    res.json({
      signal: {
        id: req.params.id,
        symbol: 'EUR/USD',
        direction: 'CALL',
        confidence: 75,
        createdAt: new Date(),
        status: 'active'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Signal
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    res.json({
      message: `Signal ${req.params.id} updated`,
      signal: {
        id: req.params.id,
        status: status
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Signal
router.delete('/:id', async (req, res) => {
  try {
    res.json({
      message: `Signal ${req.params.id} deleted`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
