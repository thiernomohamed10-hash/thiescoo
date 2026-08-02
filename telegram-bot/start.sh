#!/bin/bash
set -e

echo "🤖 Thiescoo Telegram Bot Starting..."
echo "📍 Port: $TELEGRAM_BOT_PORT"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Check for token
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
  echo "❌ TELEGRAM_BOT_TOKEN is not set!"
  echo "Please set TELEGRAM_BOT_TOKEN in Railway dashboard"
  exit 1
fi

echo "✅ Starting bot..."
node bot.js
