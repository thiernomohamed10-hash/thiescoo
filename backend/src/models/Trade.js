const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  direction: { type: String, enum: ['CALL', 'PUT'], required: true },
  stake: { type: Number, required: true },
  openPrice: Number,
  closePrice: Number,
  profit: Number,
  status: { type: String, enum: ['open', 'closed', 'canceled'], default: 'open' },
  expiry: { type: Number, default: 300 }, // seconds
  openTime: { type: Date, default: Date.now },
  closeTime: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
