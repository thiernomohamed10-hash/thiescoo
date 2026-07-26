# Architecture de Thiescoo

## Vue d'ensemble

Thiescoo est une application de trading d'options binaires utilisant une architecture microservices avec :

1. **Frontend Mobile** - Flutter (iOS & Android)
2. **Backend API** - Node.js + Express
3. **ML Models** - Python + TensorFlow
4. **Infrastructure** - MongoDB, Redis, Docker

## Diagramme d'architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Mobile App (Flutter)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Dashboard  │  │   Trading    │  │  Analytics   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │ WebSocket + REST API
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API (Node.js)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │            Express Server (Port 3000)            │   │
│  │  ┌──────────────┐  ┌──────────────┐             │   │
│  │  │   Routes     │  │ Middleware   │             │   │
│  │  └──────────────┘  └──────────────┘             │   │
│  │  ┌──────────────────────────────────────┐       │   │
│  │  │        Trading Engine                 │       │   │
│  │  │ ┌────────────┐ ┌────────────┐       │       │   │
│  │  │ │Indicators  │ │Strategies  │       │       │   │
│  │  │ └────────────┘ └────────────┘       │       │   │
│  │  └──────────────────────────────────────┘       │   │
│  └──────────────────────────────────────────────────┘   │
└────┬───────────────────────────────────────────────────┘
     │
     ├─────────────────────┬──────────────────┬────────────┐
     │                     │                  │            │
     ▼                     ▼                  ▼            ▼
┌──────────┐        ┌──────────┐       ┌──────────┐  ┌──────────┐
│ Pocket   │        │ MongoDB  │       │  Redis   │  │   ML     │
│ Option   │        │ Database │       │  Cache   │  │ Server   │
│   API    │        │          │       │          │  │(Python)  │
└──────────┘        └──────────┘       └──────────┘  └──────────┘
```

## Components détaillés

### 1. Mobile Frontend (Flutter)

**Responsabilités:**
- Interface utilisateur
- Gestion des états
- Communication WebSocket
- Stockage local (SharedPreferences, SQLite)
- Notifications push

**Stack:**
- Flutter 3.0+
- Provider/Riverpod (State Management)
- GetIt (Dependency Injection)
- WebSocket (dart:io)
- Firebase Cloud Messaging

### 2. Backend API (Node.js)

**Composants:**

#### API REST
```
GET  /api/auth/login
POST /api/auth/logout
GET  /api/trades
POST /api/trades/open
GET  /api/trades/:id
DELETE /api/trades/:id
GET  /api/signals
GET  /api/analytics
GET  /api/portfolio
```

#### WebSocket Events
```
connect
disconnect
price:update
signal:generated
trade:opened
trade:closed
strategy:updated
```

#### Services
- **AuthService** - Authentification JWT
- **TradingService** - Gestion des trades
- **SignalService** - Génération des signaux
- **IndicatorService** - Calcul des indicateurs
- **PocketOptionService** - Intégration API
- **CacheService** - Gestion du cache Redis
- **DatabaseService** - Opérations MongoDB

### 3. ML Models (Python)

**Modèles:**
- **LSTM** - Prédictions séries temporelles
- **Random Forest** - Classification signaux
- **SVM** - Support/Résistance
- **Prophet** - Tendances long terme

**Features:**
- Backtesting
- Optimisation des paramètres
- Validation croisée
- Feature engineering

## Flux de données

### 1. Trading Flow
```
User Action
    |
    v
Mobile UI
    |
    v (REST API)
Backend Validation
    |
    v
Strategy Check
    |
    v
Risk Management
    |
    v (Pocket Option API)
Order Placement
    |
    v
Database Log
    |
    v (WebSocket)
Mobile Update
```

### 2. Signal Generation
```
Price Data (1min, 5min, 15min)
    |
    v
Indicator Calculation
    |
    v
Pattern Detection
    |
    v
ML Prediction
    |
    v
Risk Assessment
    |
    v
Signal Generation
    |
    v
Notification + Trade
```

## Sécurité

### Authentication
- JWT tokens avec refresh
- Rate limiting par IP
- 2FA optionnel

### Data Protection
- Chiffrement des credentials
- SSL/TLS pour API
- CORS configuré
- Input validation

### API Security
- API keys pour services externes
- Tokens expirables
- Audit logging

## Performance

### Caching Strategy
- Price data: 1 minute
- Indicators: 5 minutes
- User data: 1 heure
- Signals: Real-time

### Database Optimization
- Indexes sur fields critiques
- Archivage des anciens trades
- Sharding possible

### API Response Times
- Get trades: <50ms
- Open trade: <200ms
- Get signals: <100ms

## Scaling

### Horizontal
- Load balancer (Nginx)
- Multiple Node.js instances
- Database replication
- Redis cluster

### Vertical
- Augmenter CPU/RAM
- Optimization des queries
- Caching agressif

## Monitoring

### Logs
- Application logs
- Trade logs
- Error logs
- Access logs

### Metrics
- Win rate
- ROI
- API response time
- Error rate
- System resources

### Alerting
- High error rate
- API down
- Database connection lost
- Unusual trading activity

## Deployment

### Development
```
docker-compose up -d
```

### Production
- Kubernetes or Docker Swarm
- CI/CD Pipeline (GitHub Actions)
- Blue-Green Deployment
- Health checks

## Tech Stack Summary

| Layer | Technology |
|-------|-------------|
| Frontend | Flutter, Dart |
| Backend | Node.js, Express, Socket.io |
| Database | MongoDB |
| Cache | Redis |
| ML | Python, TensorFlow, Scikit-learn |
| DevOps | Docker, Docker Compose |
| Auth | JWT |
| API | REST, WebSocket |
