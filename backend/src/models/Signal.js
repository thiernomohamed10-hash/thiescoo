const mongoose = require('mongoose');

const signalSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  direction: { type: String, enum: ['CALL', 'PUT'] },
  strength: { type: Number, min: 0, max: 100 },
  indicators: {
    rsi: Number,
    macd: Number,
    bollinger: String,
  },
  timestamp: { type: Date, default: Date.now },
  confidence: { type: Number, default: 50 },
});

module.exports = mongoose.model('Signal', signalSchema);
