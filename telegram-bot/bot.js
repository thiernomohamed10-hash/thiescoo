require('dotenv').config();
const TelegramBotService = require('../backend/src/services/telegram-bot.service');
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thiescoo')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Initialize Telegram Bot
const botToken = process.env.TELEGRAM_BOT_TOKEN;
if (!botToken) {
  console.error('TELEGRAM_BOT_TOKEN not set in environment variables');
  process.exit(1);
}

const telegramBot = new TelegramBotService(botToken);
console.log('✅ Telegram Bot initialized and running...');

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', bot: 'active' });
});

// Webhook endpoint (optional, for better performance)
app.post('/webhook', (req, res) => {
  // Handle webhook
  res.json({ ok: true });
});

const PORT = process.env.TELEGRAM_BOT_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Telegram bot server running on port ${PORT}`);
});

module.exports = { app, telegramBot };
