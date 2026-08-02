#!/bin/bash
set -e

echo "🤖 Starting Telegram Bot..."
echo "📍 Port: $TELEGRAM_BOT_PORT"
echo ""

# Install dependencies if not present
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start bot
node bot.js
