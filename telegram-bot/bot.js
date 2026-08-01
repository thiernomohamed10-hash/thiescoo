import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const apiUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';

if (!token) {
  console.error('❌ TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Telegram Bot initialized');

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  
  const welcomeText = `
🎉 Welcome to Thiescoo Trading Bot!

Hello ${firstName}! 👋

I'm your AI-powered trading assistant.

Available commands:
/menu - Main menu
/trades - Your trades
/signals - Trading signals  
/portfolio - Portfolio stats
/balance - Account balance
/help - Get help
  `;
  
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📊 Menu', callback_data: 'menu' }],
        [{ text: '📚 Help', callback_data: 'help' }]
      ]
    }
  };
  
  bot.sendMessage(chatId, welcomeText, opts);
});

// Menu command
bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  const menuText = '📋 Main Menu\n\nChoose an option:';
  
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📈 Signals', callback_data: 'signals' }],
        [{ text: '💼 Trades', callback_data: 'trades' }],
        [{ text: '📊 Portfolio', callback_data: 'portfolio' }],
        [{ text: '💰 Balance', callback_data: 'balance' }],
        [{ text: '⚙️ Settings', callback_data: 'settings' }],
        [{ text: '📚 Help', callback_data: 'help' }]
      ]
    }
  };
  
  bot.sendMessage(chatId, menuText, opts);
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpText = `
📚 Help & Information

Commands:
/start - Welcome
/menu - Main menu
/trades - Your trades
/signals - Trading signals
/portfolio - Stats
/balance - Account balance
/help - This message

💡 Tips:
• Start with small amounts
• Monitor signals regularly
• Use risk management
• Never trade with money you can't afford to lose

🔗 Resources:
https://docs.thiescoo.dev
  `;
  
  bot.sendMessage(chatId, helpText);
});

// Callback handlers
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  
  bot.answerCallbackQuery(query.id);
  
  switch(data) {
    case 'menu':
      bot.sendMessage(chatId, '📋 Menu loaded');
      break;
    case 'signals':
      bot.sendMessage(chatId, '🔔 No new signals at the moment');
      break;
    case 'trades':
      bot.sendMessage(chatId, '📈 You have no active trades');
      break;
    case 'portfolio':
      bot.sendMessage(chatId, '📊 Portfolio: No data available');
      break;
    case 'balance':
      bot.sendMessage(chatId, '💰 Balance: $0.00');
      break;
    case 'settings':
      bot.sendMessage(chatId, '⚙️ Settings: Not configured');
      break;
    case 'help':
      bot.sendMessage(chatId, '📚 For help, use /help');
      break;
  }
});

// Handle text messages
bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, 'Type /menu to see available commands');
  }
});

// Webhook endpoint for Railway
const port = process.env.TELEGRAM_BOT_PORT || 8080;
const express = (await import('express')).default;
const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', bot: 'running' });
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  res.json({ ok: true });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🤖 Telegram bot server running on port ${port}`);
});

console.log('✅ Telegram Bot is running!');
