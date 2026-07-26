const mongoose = require('mongoose');

const telegramSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  telegramUserId: Number,
  notificationsEnabled: { type: Boolean, default: true },
  signalAlerts: { type: Boolean, default: true },
  tradeAlerts: { type: Boolean, default: true },
  portfolioAlerts: { type: Boolean, default: true },
  autoTradeEnabled: { type: Boolean, default: false },
  autoTradeStake: { type: Number, default: 10 },
  autoTradeMaxDaily: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TelegramSettings', telegramSettingsSchema);
