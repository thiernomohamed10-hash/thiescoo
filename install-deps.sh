#!/bin/bash
set -e

echo "🚀 Installing Backend Dependencies..."
cd backend
npm install --omit=dev
echo "✅ Backend dependencies installed"

echo ""
echo "🤖 Installing Telegram Bot Dependencies..."
cd ../telegram-bot
npm install --omit=dev
echo "✅ Bot dependencies installed"

echo ""
echo "✅ All dependencies installed successfully!"
