# Telegram Integration for Thiescoo

## 🤖 Features

- **Real-time Trading Signals** - Receive signals instantly on Telegram
- **Trade Management** - View and manage trades from Telegram
- **Portfolio Tracking** - Monitor your account performance
- **Account Settings** - Configure bot preferences
- **Auto-Trading** - Enable automated trading directly from Telegram

## 🚀 Quick Start

### 1. Create Bot on Telegram

1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Follow the prompts
4. Copy your bot token

### 2. Deploy Bot

```bash
# Set environment variable
export TELEGRAM_BOT_TOKEN="your_bot_token_here"

# Run deployment script
bash scripts/deploy-telegram.sh
```

### 3. Start Using

1. Search for your bot on Telegram (e.g., @thiescoo_bot)
2. Send `/start`
3. Use `/menu` for main menu

## 📋 Commands

```
/start      - Start the bot
/menu       - Main menu
/trades     - View your trades
/signals    - Get trading signals
/portfolio  - Portfolio statistics
/balance    - Account balance
/settings   - Configure settings
/help       - Help & commands
```

## 🔗 Linking Your Account

1. Run the bot and get your Telegram ID from `/start`
2. Go to your Thiescoo account settings
3. Link your Telegram account
4. Start receiving notifications!

## 📊 Features in Detail

### Trading Signals
```
📡 Real-time notifications when new signals are generated
- Signal direction (CALL/PUT)
- Confidence level
- Technical indicators
- Suggested entry points
```

### Trade Management
```
📈 View active trades with:
- Trade symbol
- Entry/exit points
- Current profit/loss
- Trade status
```

### Portfolio Stats
```
💼 Comprehensive statistics:
- Total trades
- Win rate percentage
- Monthly profit
- Account balance
```

### Account Settings
```
⚙️ Customize:
- Notification preferences
- Signal alert frequency
- Auto-trade parameters
- Risk management settings
```

## 🛠 Advanced Setup

### Docker Deployment

```bash
# Start all services including Telegram bot
docker-compose -f docker-compose.yml -f docker-compose-telegram.yml up -d
```

### Production Deployment

```bash
# Set up webhook for better performance
# Update Telegram bot settings
TELEGRAM_USE_WEBHOOK=true
TELEGRAM_WEBHOOK_URL=https://yourdomain.com/telegram/webhook
```

## 🔔 Notifications

You'll receive notifications for:
- ✅ New trading signals
- ✅ Trade executed
- ✅ Trade closed with P&L
- ✅ Daily summary
- ✅ Account alerts
- ✅ Risk warnings

## 📱 Mobile Optimized

- Inline buttons for easy navigation
- Mobile-friendly formatting
- Quick action replies
- Real-time updates

## 💡 Tips

1. **Enable Notifications** - Get real-time signal alerts
2. **Link Your Account** - Sync with your trading account
3. **Set Preferences** - Customize what alerts you receive
4. **Use Auto-Trade** - Let the bot trade for you (use with caution)
5. **Monitor Regularly** - Check portfolio stats daily

## ⚠️ Important Notes

- Always start with demo trading
- Don't enable auto-trade without proper risk management
- Monitor your account regularly
- Set reasonable stop-loss limits
- Never risk more than 2% per trade

## 🆘 Troubleshooting

### Bot not responding
- Check if bot token is correct
- Verify MongoDB is running
- Check backend API is running

### Not receiving signals
- Link your Telegram account
- Enable signal notifications
- Check notification settings

### Connection issues
- Ensure internet connection
- Restart the bot
- Check firewall settings

## 📚 Resources

- [Full Documentation](https://docs.thiescoo.dev)
- [Telegram Bot API](https://core.telegram.org/bots)
- [Support](https://discord.gg/thiescoo)

## 📝 License

MIT License - See LICENSE.md
