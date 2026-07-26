const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const User = require('../models/User');
const Trade = require('../models/Trade');
const Signal = require('../models/Signal');

class TelegramBotService {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });
    this.apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';
    this.setupHandlers();
  }

  setupHandlers() {
    // Start command
    this.bot.onText(/\/start/, (msg) => this.handleStart(msg));

    // Menu commands
    this.bot.onText(/\/menu/, (msg) => this.showMenu(msg));
    this.bot.onText(/\/trades/, (msg) => this.showTrades(msg));
    this.bot.onText(/\/signals/, (msg) => this.showSignals(msg));
    this.bot.onText(/\/portfolio/, (msg) => this.showPortfolio(msg));
    this.bot.onText(/\/balance/, (msg) => this.showBalance(msg));
    this.bot.onText(/\/settings/, (msg) => this.showSettings(msg));
    this.bot.onText(/\/help/, (msg) => this.showHelp(msg));

    // Callback handlers
    this.bot.on('callback_query', (query) => this.handleCallbackQuery(query));

    // Message handlers
    this.bot.on('message', (msg) => this.handleMessage(msg));
  }

  async handleStart(msg) {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;

    const welcomeText = `
🤖 Welcome to Thiescoo Trading Bot!

Hello @${username}! 👋

I'm your AI-powered binary options trading assistant. I'll help you:
✅ Receive trading signals
✅ Manage your trades
✅ Track your portfolio
✅ Analyze market trends

To get started, use /menu to see available commands or /help for more information.
    `;

    const keyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📊 View Menu', callback_data: 'menu' }],
          [{ text: '📚 Help', callback_data: 'help' }],
          [{ text: '⚙️ Settings', callback_data: 'settings' }],
        ],
      },
    };

    await this.bot.sendMessage(chatId, welcomeText, keyboard);
  }

  async showMenu(msg) {
    const chatId = msg.chat.id;

    const menuText = `
📋 Main Menu

Choose an option:
    `;

    const keyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📈 Active Trades', callback_data: 'active_trades' }],
          [{ text: '📡 Latest Signals', callback_data: 'latest_signals' }],
          [{ text: '💼 Portfolio Stats', callback_data: 'portfolio_stats' }],
          [{ text: '💰 Account Balance', callback_data: 'account_balance' }],
          [{ text: '🎯 Open New Trade', callback_data: 'open_trade' }],
          [{ text: '⚙️ Settings', callback_data: 'settings' }],
          [{ text: '📚 Help', callback_data: 'help' }],
        ],
      },
    };

    await this.bot.sendMessage(chatId, menuText, keyboard);
  }

  async showTrades(msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
      const response = await axios.get(`${this.apiBaseUrl}/trades`, {
        headers: { Authorization: `Bearer ${await this.getToken(userId)}` },
      });

      const trades = response.data.data;

      if (trades.length === 0) {
        await this.bot.sendMessage(chatId, '📭 No trades yet. Open your first trade!');
        return;
      }

      let tradesText = '📈 Your Recent Trades:\n\n';

      trades.slice(0, 5).forEach((trade, index) => {
        const profit = trade.profit > 0 ? `✅ +$${trade.profit}` : `❌ -$${Math.abs(trade.profit)}`;
        tradesText += `${index + 1}. ${trade.symbol} - ${trade.direction}\n`;
        tradesText += `   Status: ${trade.status}\n`;
        tradesText += `   ${profit}\n\n`;
      });

      await this.bot.sendMessage(chatId, tradesText);
    } catch (error) {
      await this.bot.sendMessage(chatId, '❌ Error fetching trades');
    }
  }

  async showSignals(msg) {
    const chatId = msg.chat.id;

    try {
      const response = await axios.get(`${this.apiBaseUrl}/signals`);
      const signals = response.data.data;

      if (signals.length === 0) {
        await this.bot.sendMessage(chatId, '📭 No signals available');
        return;
      }

      let signalsText = '📡 Latest Trading Signals:\n\n';

      signals.slice(0, 5).forEach((signal, index) => {
        const direction = signal.direction === 'CALL' ? '📈 CALL' : '📉 PUT';
        const confidence = `💪 ${signal.confidence}%`;
        signalsText += `${index + 1}. ${signal.symbol}\n`;
        signalsText += `   ${direction}\n`;
        signalsText += `   ${confidence}\n\n`;
      });

      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔄 Refresh', callback_data: 'refresh_signals' }],
            [{ text: '⬅️ Back to Menu', callback_data: 'menu' }],
          ],
        },
      };

      await this.bot.sendMessage(chatId, signalsText, keyboard);
    } catch (error) {
      await this.bot.sendMessage(chatId, '❌ Error fetching signals');
    }
  }

  async showPortfolio(msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
      const response = await axios.get(`${this.apiBaseUrl}/portfolio`, {
        headers: { Authorization: `Bearer ${await this.getToken(userId)}` },
      });

      const portfolio = response.data.data;
      const portfolioText = `
💼 Portfolio Statistics

📊 Total Trades: ${portfolio.totalTrades}
✅ Winning Trades: ${portfolio.winningTrades}
❌ Losing Trades: ${portfolio.totalTrades - portfolio.winningTrades}
📈 Win Rate: ${portfolio.winRate}%
💰 Total Profit: ${portfolio.totalProfit}
💵 Account Balance: ${portfolio.balance}
      `;

      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔄 Refresh', callback_data: 'refresh_portfolio' }],
            [{ text: '⬅️ Back to Menu', callback_data: 'menu' }],
          ],
        },
      };

      await this.bot.sendMessage(chatId, portfolioText, keyboard);
    } catch (error) {
      await this.bot.sendMessage(chatId, '❌ Error fetching portfolio');
    }
  }

  async showBalance(msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
      const response = await axios.get(`${this.apiBaseUrl}/portfolio`, {
        headers: { Authorization: `Bearer ${await this.getToken(userId)}` },
      });

      const balance = response.data.data.balance;
      const balanceText = `
💰 Account Balance

Current Balance: $${balance}
      `;

      await this.bot.sendMessage(chatId, balanceText);
    } catch (error) {
      await this.bot.sendMessage(chatId, '❌ Error fetching balance');
    }
  }

  async showSettings(msg) {
    const chatId = msg.chat.id;

    const settingsText = '⚙️ Settings';

    const keyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔔 Notifications', callback_data: 'notifications' }],
          [{ text: '⏰ Auto Trade', callback_data: 'auto_trade' }],
          [{ text: '📢 Signals Alert', callback_data: 'signals_alert' }],
          [{ text: '⬅️ Back to Menu', callback_data: 'menu' }],
        ],
      },
    };

    await this.bot.sendMessage(chatId, settingsText, keyboard);
  }

  async showHelp(msg) {
    const chatId = msg.chat.id;

    const helpText = `
📚 Help & Commands

🤖 Available Commands:
/start - Start the bot
/menu - Show main menu
/trades - View your trades
/signals - Get latest signals
/portfolio - View portfolio stats
/balance - Check account balance
/settings - Configure settings
/help - Show this help message

💡 Tips:
• Start with small stakes to test strategies
• Use risk management (2% per trade)
• Monitor signals regularly
• Backtest before trading with real money

❓ Need more help?
 Visit: https://docs.thiescoo.dev
 Email: support@thiescoo.dev
    `;

    const keyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📖 Full Documentation', url: 'https://docs.thiescoo.dev' }],
          [{ text: '⬅️ Back to Menu', callback_data: 'menu' }],
        ],
      },
    };

    await this.bot.sendMessage(chatId, helpText, keyboard);
  }

  async handleCallbackQuery(query) {
    const chatId = query.message.chat.id;
    const data = query.data;

    await this.bot.answerCallbackQuery(query.id);

    switch (data) {
      case 'menu':
        await this.showMenu(query.message);
        break;
      case 'active_trades':
        await this.showTrades(query.message);
        break;
      case 'latest_signals':
        await this.showSignals(query.message);
        break;
      case 'portfolio_stats':
        await this.showPortfolio(query.message);
        break;
      case 'account_balance':
        await this.showBalance(query.message);
        break;
      case 'settings':
        await this.showSettings(query.message);
        break;
      case 'help':
        await this.showHelp(query.message);
        break;
      case 'refresh_signals':
        await this.showSignals(query.message);
        break;
      case 'refresh_portfolio':
        await this.showPortfolio(query.message);
        break;
    }
  }

  async handleMessage(msg) {
    const chatId = msg.chat.id;

    if (!msg.text || msg.text.startsWith('/')) {
      return;
    }

    // Handle text-based commands
    const text = msg.text.toLowerCase();

    if (text.includes('trade')) {
      await this.showTrades(msg);
    } else if (text.includes('signal')) {
      await this.showSignals(msg);
    } else if (text.includes('portfolio')) {
      await this.showPortfolio(msg);
    } else if (text.includes('balance')) {
      await this.showBalance(msg);
    } else {
      const response = `
I'm Thiescoo Trading Bot! 🤖

I understand these commands:
• /menu - Main menu
• /trades - View trades
• /signals - Get signals
• /portfolio - Portfolio stats
• /balance - Account balance
• /help - Help & commands
      `;
      await this.bot.sendMessage(chatId, response);
    }
  }

  async getToken(userId) {
    // This should be retrieved from database or cache
    // For now, returning a mock token
    return 'mock-token';
  }

  async notifySignal(signal) {
    // Send signal notification to subscribed users
    const message = `
📡 New Trading Signal!

${signal.symbol}
Direction: ${signal.direction === 'CALL' ? '📈 CALL' : '📉 PUT'}
Confidence: 💪 ${signal.confidence}%
RSI: ${signal.indicators.rsi}
    `;

    // Send to all subscribed users
    // This requires storing user subscriptions
  }

  async notifyTradeClosed(trade) {
    // Send trade closed notification
    const profit = trade.profit > 0 ? `✅ +$${trade.profit}` : `❌ -$${Math.abs(trade.profit)}`;
    const message = `
🎯 Trade Closed!

${trade.symbol}
Direction: ${trade.direction}
${profit}
    `;

    // Send to relevant user
  }
}

module.exports = TelegramBotService;
