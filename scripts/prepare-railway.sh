#!/bin/bash

# Railway Deployment Helper
# Prepare your project for Railway deployment

set -e

echo "🚂 Preparing Thiescoo for Railway Deployment..."

echo ""
echo "✓ Step 1: Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "✓ Step 2: Installing telegram bot dependencies..."
cd telegram-bot
npm install
cd ..

echo ""
echo "✓ Step 3: Creating necessary directories..."
mkdir -p logs
mkdir -p data

echo ""
echo "✓ Step 4: Generating build files..."
cd backend
npm run build 2>/dev/null || echo "⚠️  Build script not found (optional)"
cd ..

echo ""
echo "✅ Railway Preparation Complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Go to https://railway.app"
echo "2. Create a new project"
echo "3. Select 'Deploy from GitHub'"
echo "4. Choose your thiescoo repository"
echo "5. Railway will auto-detect the Procfile and deploy!"
echo ""
echo "📝 Make sure you set these environment variables in Railway:"
echo "   - NODE_ENV: production"
echo "   - MONGODB_URI: [your MongoDB connection string]"
echo "   - JWT_SECRET: thiescoo-secret-key-2024"
echo "   - TELEGRAM_BOT_TOKEN: [your bot token]"
echo ""
