import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const port = process.env.TELEGRAM_BOT_PORT || 8080;

if (!token) {
  console.error('❌ TELEGRAM_BOT_TOKEN is not set!');
  process.exit(1);
}

console.log('\n' + '='.repeat(50));
console.log('🤖 Thiescoo Telegram Bot Starting');
console.log('='.repeat(50));
console.log(`📍 Port: ${port}`);
console.log(`🔑 Token: ${token.substring(0, 10)}...`);
console.log('='.repeat(50) + '\n');

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    bot: 'running',
    timestamp: new Date().toISOString()
  });
});

// Root
app.get('/', (req, res) => {
  res.json({ 
    message: '🤖 Thiescoo Telegram Bot',
    status: 'running'
  });
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  res.json({ ok: true });
});

// Bot Commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name || 'User';
  
  const welcomeText = `
🎉 Welcome to Thiescoo Trading Bot!

Hello ${firstName}! 👋

I'm your AI-powered trading assistant.

🔧 Available Commands:
/menu - Main menu
/trades - Your trades
/signals - Trading signals  
/portfolio - Portfolio stats
/balance - Account balance
/help - Get help
  `.trim();
  
  bot.sendMessage(chatId, welcomeText);
});

bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  const menuText = '📋 Main Menu - Choose an option:';
  
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📊 Signals', callback_data: 'signals' }],
        [{ text: '📈 Trades', callback_data: 'trades' }],
        [{ text: '📊 Portfolio', callback_data: 'portfolio' }],
        [{ text: '💰 Balance', callback_data: 'balance' }],
        [{ text: '⚙️ Settings', callback_data: 'settings' }],
        [{ text: '📚 Help', callback_data: 'help' }]
      ]
    }
  };
  
  bot.sendMessage(chatId, menuText, opts);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpText = `
📚 Help & Information

📖 Commands:
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
  `.trim();
  
  bot.sendMessage(chatId, helpText);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  
  bot.answerCallbackQuery(query.id);
  
  const responses = {
    signals: '🔔 No new signals at the moment',
    trades: '📊 You have no active trades',
    portfolio: '📈 Portfolio: No data available',
    balance: '💰 Balance: $0.00',
    settings: '⚙️ Settings: Not configured',
    help: '📚 Type /help for help'
  };
  
  bot.sendMessage(chatId, responses[data] || 'Unknown command');
});

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, '👉 Type /menu to see available commands');
  }
});

bot.on('polling_error', (error) => {
  console.error('❌ Polling error:', error.message);
});

// Start Express server
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Telegram Bot server running on port ${port}`);
  console.log(`🌐 Webhook URL: http://localhost:${port}/webhook`);
  console.log(`📍 Health check: http://localhost:${port}/health\n`);
});

console.log('✅ Telegram Bot is ready!');
