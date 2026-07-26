# Thiescoo Backend

Node.js + Express backend for Thiescoo trading bot.

## Installation

```bash
npm install
```

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

### Trades
- `GET /api/trades` - Get all trades
- `GET /api/trades/:id` - Get trade by ID
- `POST /api/trades/open` - Open new trade
- `DELETE /api/trades/:id` - Close trade

### Signals
- `GET /api/signals` - Get all signals
- `GET /api/signals/:symbol` - Get signals by symbol

### Portfolio
- `GET /api/portfolio` - Get portfolio stats

### Indicators
- `POST /api/indicators/rsi` - Calculate RSI
- `POST /api/indicators/macd` - Calculate MACD
- `POST /api/indicators/bollinger` - Calculate Bollinger Bands

## Environment Variables

See `.env.example` for required variables.

## Architecture

See `docs/ARCHITECTURE.md` for detailed architecture information.
