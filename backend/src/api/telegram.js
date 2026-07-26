const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

// Link Telegram account
router.post('/link', authMiddleware, async (req, res) => {
  try {
    const { telegramUserId } = req.body;

    if (!telegramUserId) {
      return res.status(400).json({ error: 'Telegram user ID required' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { telegramUserId },
      { new: true }
    );

    res.json({
      message: 'Telegram account linked successfully',
      user: { id: user._id, telegramUserId: user.telegramUserId },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get linked Telegram account
router.get('/account', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.json({
      data: {
        linked: !!user.telegramUserId,
        telegramUserId: user.telegramUserId || null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unlink Telegram account
router.post('/unlink', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { telegramUserId: null },
      { new: true }
    );

    res.json({ message: 'Telegram account unlinked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
