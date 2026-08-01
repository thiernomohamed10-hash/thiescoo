# 🚀 Thiescoo Railway Deployment Guide

## Quick Start

### Step 1: Prepare Your Project

```bash
bash scripts/prepare-railway.sh
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### Step 3: Deploy on Railway

1. Go to: https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `thiescoo` repository
6. Railway will automatically detect `Procfile` and deploy!

### Step 4: Configure Environment Variables

In Railway Dashboard → Your Project → Variables

Add these variables:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://thierno%20diallo:Di%40llo68@cluster0.a1b2c3d.mongodb.net/thiescoo?retryWrites=true&w=majority
JWT_SECRET=thiescoo-secret-key-2024
TELEGRAM_BOT_TOKEN=8819554133:AAFCq3n9YrtMvllH-OQGgj3XfCW76HjplNM
API_BASE_URL=https://your-railway-url.up.railway.app
TELEGRAM_BOT_PORT=8080
```

### Step 5: Monitor Deployment

1. Go to Railway Dashboard
2. Click on your project
3. Check the "Logs" tab
4. Wait for ✓ "Build successful" message

## Testing

### Test Backend

```bash
curl https://your-railway-url.up.railway.app/health
```

Expected response:
```json
{"status":"OK"}
```

### Test Telegram Bot

1. Open Telegram
2. Search for your bot
3. Send `/start`
4. You should see the welcome message

## Troubleshooting

### App won't start

1. Check logs in Railway Dashboard
2. Verify all environment variables are set
3. Ensure MongoDB URI is correct

### Bot not responding

1. Verify TELEGRAM_BOT_TOKEN is correct
2. Check bot logs in Railway
3. Ensure API_BASE_URL is set

### Port conflicts

Railway automatically handles ports. No changes needed.

## Useful Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# View logs
railway logs

# Check status
railway status
```

## File Structure

```
thiescoo/
├── backend/
│   ├── src/
│   │   └── server.js (Main entry point)
│   └── package.json
├── telegram-bot/
│   ├── bot.js (Bot entry point)
│   └── package.json
├── Procfile (Railway deployment config)
├── railway.toml (Railway build config)
├── package.json (Root package)
└── scripts/
    └── prepare-railway.sh
```

## Environment Variables Explained

- `NODE_ENV`: Set to `production` for Railway
- `PORT`: Port where backend runs (Railway sets this)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token from @BotFather
- `API_BASE_URL`: Your Railway backend URL
- `TELEGRAM_BOT_PORT`: Port for Telegram bot server

## After Deployment

✅ Your app is now live!
✅ Bot is running and responding
✅ Database is connected
✅ Ready to use!

## Support

- Railway Docs: https://docs.railway.app
- Telegram Bot API: https://core.telegram.org/bots
- Thiescoo Docs: https://docs.thiescoo.dev

---

**Deployment successful! 🎉**
