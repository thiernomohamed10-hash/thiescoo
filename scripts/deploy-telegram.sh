#!/bin/bash

# Deploy Telegram Bot
# This script deploys the Telegram bot to your server

set -e

echo "🤖 Deploying Thiescoo Telegram Bot..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}✓${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}!${NC} $1"
}

# Check prerequisites
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose is not installed"
    exit 1
fi

# Check for bot token
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    log_error "TELEGRAM_BOT_TOKEN environment variable not set"
    exit 1
fi

log_info "Building Telegram bot image..."
docker build -t thiescoo-telegram-bot ./telegram-bot

log_info "Starting Telegram bot..."
docker-compose -f docker-compose-telegram.yml up -d telegram-bot

log_info "Waiting for bot to start..."
sleep 5

# Check if bot is running
if curl -f http://localhost:8080/health > /dev/null 2>&1; then
    log_info "Telegram bot is running and healthy"
else
    log_warn "Could not verify bot health"
fi

log_info "🤖 Telegram Bot deployment complete!"
log_info "Bot is now running. Start chatting: @thiescoo_bot"
