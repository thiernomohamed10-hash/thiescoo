# Thiescoo Admin Panel

## 🎛️ Features

✅ **Dashboard** - Real-time statistics
✅ **Signals Management** - Create and broadcast trading signals
✅ **Trades Monitoring** - View all trades in real-time
✅ **Users Management** - Manage users and permissions
✅ **Settings** - Configure bot behavior
✅ **Pocket Option Integration** - Connect trading accounts
✅ **System Logs** - Monitor bot activity

## 🚀 How to Use

### 1. Access the Admin Panel

```
http://localhost:3000/admin
```

Or after deployment on Railway:

```
https://your-railway-url.up.railway.app/admin
```

### 2. Login

Default credentials (create these first):
```
Username: admin
Password: admin123
```

### 3. Dashboard

View real-time statistics:
- Total users
- Active trades
- Total profit
- Bot status
- Success rate
- Uptime

### 4. Create Trading Signals

1. Go to **Signals** tab
2. Fill in signal details:
   - Symbol (EUR/USD, etc.)
   - Direction (CALL or PUT)
   - Confidence level (0-100)
   - Description
3. Click **Send Signal to All Users**

✅ Signal is instantly sent to all connected users via Telegram!

### 5. Monitor Trades

- View all user trades
- See trade details (symbol, direction, amount, result)
- Monitor profit/loss

### 6. Manage Users

- View all registered users
- Ban/unban users
- Check user activity

### 7. Bot Settings

- Configure bot name
- Set max users
- Adjust risk parameters
- Set signal frequency
- Enable/disable auto-trading

### 8. Pocket Option Integration

1. Go to **Pocket Option** tab
2. Enter your Pocket Option credentials
3. Click **Connect Account**
4. Bot will now trade on your account

### 9. Monitor Logs

- View system logs
- Monitor bot activity
- Check for errors

## 📊 Dashboard Metrics

| Metric | Description |
|--------|-------------|
| Total Users | Number of registered users |
| Active Trades | Currently open trades |
| Total Profit | Total profit/loss |
| Bot Status | Online/Offline |
| Success Rate | Win percentage |
| Uptime | System availability |

## 🔐 Security

- JWT authentication
- Password hashing
- Admin roles
- Activity logging

## 🎨 Interface

- Dark theme sidebar
- Responsive design
- Real-time updates
- Interactive forms

## 📱 Mobile Support

The admin panel is fully responsive and works on:
- Desktop
- Tablet
- Mobile phones

## 🔧 Customization

Edit `admin-panel/index.html` to customize:
- Colors
- Layout
- Menu items
- Features

## 🚀 Deployment

The admin panel is deployed with your backend on Railway:

```
https://your-railway-url.up.railway.app/admin
```

## 📞 Support

For issues or questions:
- Email: support@thiescoo.dev
- Discord: https://discord.gg/thiescoo

---

**Admin Panel Ready! 🎉**
