# Telegram Bot for Thiescoo

Integrate Thiescoo trading bot with Telegram for easy access to trading signals and account management.

## Setup

### 1. Create Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the prompts to create a new bot
4. Copy the bot token

### 2. Configure Environment

```bash
cp .env.example .env
```

Update `.env` with:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
MONGODB_URI=mongodb://localhost:27017/thiescoo
API_BASE_URL=http://localhost:3000/api
TELEGRAM_BOT_PORT=8080
```

### 3. Start the Bot

```bash
npm install
npm start
```

## Available Commands

### User Commands
- `/start` - Start the bot and see welcome message
- `/menu` - Show main menu
- `/trades` - View your active trades
- `/signals` - Get latest trading signals
- `/portfolio` - View portfolio statistics
- `/balance` - Check account balance
- `/settings` - Configure bot settings
- `/help` - Show help and commands

### Features

✅ **Real-time Signals**
- Receive trading signals instantly
- View signal strength and confidence
- See technical indicators

✅ **Trade Management**
- View active trades
- See trade history
- Monitor P&L in real-time

✅ **Portfolio Tracking**
- Total trades count
- Win rate percentage
- Profit/loss statistics
- Account balance

✅ **Account Settings**
- Enable/disable notifications
- Configure alerts
- Set auto-trade parameters
- Manage preferences

## Linking Telegram Account

### Step 1: Get Your Telegram User ID

Send `/start` to the bot and it will show your information.

### Step 2: Link in Web App

1. Go to account settings
2. Click "Link Telegram"
3. Enter your Telegram user ID
4. Confirm linkage

### Step 3: Receive Notifications

Once linked, you'll receive:
- Trading signals
- Trade execution alerts
- Portfolio updates
- Account notifications

## Notification Types

### Signal Notifications
```
📡 New Trading Signal!

EUR/USD
Direction: 📈 CALL
Confidence: 💪 75%
RSI: 28.5
```

### Trade Closed
```
🎯 Trade Closed!

EUR/USD
Direction: CALL
✅ +$8.50
```

### Portfolio Update
```
📊 Daily Summary

Total Trades: 15
Win Rate: 73%
Daily Profit: $125.50
Account Balance: $5,125.50
```

## Settings

### Notification Settings
- Enable/Disable all notifications
- Signal alerts only
- Trade alerts only
- Portfolio updates

### Auto Trade Settings
- Enable/Disable auto trading
- Set stake amount
- Max daily loss limit
- Risk percentage

## API Integration

The Telegram bot communicates with the backend API:

```javascript
GET /api/trades - Fetch user trades
GET /api/signals - Get trading signals
GET /api/portfolio - Get portfolio stats
POST /api/telegram/link - Link Telegram account
GET /api/telegram/account - Check linked account
POST /api/telegram/unlink - Unlink Telegram
```

## Inline Buttons

Easy navigation with inline buttons:

```
[📈 Active Trades] [📡 Latest Signals]
[💼 Portfolio Stats] [💰 Account Balance]
[⚙️ Settings] [📚 Help]
```

## Error Handling

The bot handles:
- Connection timeouts
- API errors
- Invalid user data
- Missing permissions

## Advanced Features

### 1. Auto-trading
```
⚙️ Settings → Auto Trade
- Enable auto trading
- Set auto-trade stake
- Set max daily loss
```

### 2. Custom Alerts
```
⚙️ Settings → Notifications
- Signal alerts
- Trade alerts
- Portfolio alerts
```

### 3. Quick Stats
```
/portfolio - Full portfolio stats
/balance - Quick balance check
/trades - Recent trades
```

## Troubleshooting

### Bot not responding
1. Check bot token in `.env`
2. Verify MongoDB connection
3. Restart bot: `npm start`

### Not receiving notifications
1. Check notification settings in bot
2. Verify Telegram account is linked
3. Check API connection

### Connection errors
1. Ensure backend is running
2. Check `API_BASE_URL` in `.env`
3. Verify MongoDB is accessible

## Security

- Bot uses JWT tokens from backend
- Telegram user ID verification
- Encrypted sensitive data
- Rate limiting on commands
- Input validation

## Performance

- Polling mode (default): For testing
- Webhook mode: For production (recommended)
- Message queuing for high load
- Caching for frequently accessed data

## Docker

```bash
# Build image
docker build -t thiescoo-telegram-bot .

# Run container
docker run -d \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -e MONGODB_URI=mongodb://mongo:27017/thiescoo \
  -e API_BASE_URL=http://backend:3000/api \
  --name thiescoo-telegram \
  thiescoo-telegram-bot
```

## Support

- Documentation: https://docs.thiescoo.dev/telegram
- Issues: https://github.com/thiernomohamed10-hash/thiescoo/issues
- Discord: https://discord.gg/thiescoo
