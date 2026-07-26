const express = require('express');
const router = express.Router();
const IndicatorService = require('../services/indicator.service');

// Calculate RSI
router.post('/rsi', async (req, res) => {
  try {
    const { prices, period } = req.body;
    const rsi = IndicatorService.calculateRSI(prices, period || 14);
    res.json({ data: { rsi } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate MACD
router.post('/macd', async (req, res) => {
  try {
    const { prices } = req.body;
    const macd = IndicatorService.calculateMACD(prices);
    res.json({ data: macd });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate Bollinger Bands
router.post('/bollinger', async (req, res) => {
  try {
    const { prices, period, stdDev } = req.body;
    const bands = IndicatorService.calculateBollingerBands(prices, period || 20, stdDev || 2);
    res.json({ data: bands });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
