#!/bin/bash
set -e

echo "🚀 Starting Thiescoo Backend..."
echo "📍 Port: $PORT"
echo "🌍 Environment: $NODE_ENV"
echo ""

# Start the server
node src/server.js
