#!/bin/bash
set -e

echo "🚀 Thiescoo Backend Server Starting..."
echo "📍 Port: $PORT"
echo "🌍 Environment: $NODE_ENV"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start the server
echo "✅ Starting server..."
node src/server.js
