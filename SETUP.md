# Thiescoo - Binary Options Trading Bot
## Complete Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Flutter 3.0+
- Python 3.9+

### 1. Clone Repository
```bash
git clone https://github.com/thiernomohamed10-hash/thiescoo.git
cd thiescoo
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env with your Pocket Option credentials
```

### 3. Start Services with Docker
```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Redis on port 6379
- Backend API on port 3000
- ML Server on port 5000

### 4. Run Mobile App
```bash
cd mobile
flutter pub get
flutter run
```

## 📚 Development

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### ML Model Development
```bash
cd ml-models
pip install -r requirements.txt
python app.py
```

### Mobile Development
```bash
cd mobile
flutter pub get
flutter run -d chrome  # For web testing
```

## 🧪 Testing

### Run Tests
```bash
cd backend
npm test
```

### Test API Endpoints
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Get Trades
curl http://localhost:3000/api/trades \
  -H "Authorization: Bearer <token>"
```

## 📊 Monitoring

### Check Services
```bash
# Check backend health
curl http://localhost:3000/health

# Check ML server health
curl http://localhost:5000/health
```

### View Logs
```bash
# Backend logs
docker logs thiescoo-backend

# ML server logs
docker logs thiescoo-ml

# MongoDB logs
docker logs thiescoo-mongodb
```

## 🔧 Configuration

### Pocket Option Integration
Add your API credentials to `.env`:
```env
POCKET_OPTION_API_KEY=your_key
POCKET_OPTION_SECRET=your_secret
```

### Trading Parameters
Configure in backend `src/config/trading.js`:
```javascript
const TRADING_CONFIG = {
  maxDailyLoss: 100,
  riskPercentage: 2,
  defaultStake: 10,
  timeFrames: ['1m', '5m', '15m', '1h']
};
```

## 🚀 Deployment

### Deploy to Production
```bash
# Build images
docker-compose -f docker-compose.yml build

# Push to registry
docker tag thiescoo-backend:latest your-registry/thiescoo-backend:latest
docker push your-registry/thiescoo-backend:latest

# Deploy to server
ssh user@server
cd /app/thiescoo
docker-compose pull
docker-compose up -d
```

### Scale with Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## 📱 Mobile App Build

### Build APK (Android)
```bash
cd mobile
flutter build apk --release
```

APK will be at: `mobile/build/app/outputs/flutter-apk/app-release.apk`

### Build IPA (iOS)
```bash
cd mobile
flutter build ios --release
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB is running
docker exec thiescoo-mongodb mongosh -u admin -p password123
```

### API Port Already in Use
```bash
# Change port in .env
PORT=3001
```

### Python Dependencies Issue
```bash
pip install --upgrade pip
pip install -r ml-models/requirements.txt
```

## 📞 Support

- 📧 Email: support@thiescoo.dev
- 💬 Discord: [Join our community](https://discord.gg/thiescoo)
- 📖 Docs: https://docs.thiescoo.dev

## ⚠️ Disclaimer

Trading binary options involves significant risk. This bot is for educational purposes.
Always start with a demo account and use risk management strategies.

## 📄 License

MIT License - See LICENSE.md
