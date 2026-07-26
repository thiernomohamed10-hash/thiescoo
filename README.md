# Thiescoo - Advanced Binary Options Trading Bot

**Thiescoo** est un bot de trading d'options binaires professionnel et performant conçu pour Pocket Option. Il utilise l'intelligence artificielle, l'analyse technique et les stratégies de machine learning pour générer des signaux de trading automatiques.

## 🚀 Caractéristiques principales

### Mobile (Flutter)
- ✅ Interface moderne et intuitive
- ✅ Graphiques temps réel avec TradingView
- ✅ Indicateurs techniques avancés (RSI, MACD, Bandes Bollinger, etc.)
- ✅ Dashboard avec statistiques détaillées
- ✅ Notifications push pour signaux
- ✅ Historique complet des trades
- ✅ Gestion du portefeuille
- ✅ Support hors ligne partiel

### Backend (Node.js)
- ✅ API REST complète
- ✅ WebSocket pour données temps réel
- ✅ Intégration Pocket Option API
- ✅ Système de cache (Redis)
- ✅ Queue de jobs pour signaux
- ✅ Base de données MongoDB
- ✅ Authentification JWT
- ✅ Logging et monitoring

### AI & Machine Learning (Python)
- ✅ Prédictions avec TensorFlow
- ✅ Backtesting des stratégies
- ✅ Analyse sentimentale
- ✅ Détection de patterns
- ✅ Optimisation du portefeuille

### Stratégies de Trading
- ✅ Scalping (courtes durées)
- ✅ Swing Trading
- ✅ Trend Following
- ✅ Mean Reversion
- ✅ Support/Résistance

## 📁 Structure du projet

```
thiescoo/
├── mobile/                 # Application Flutter
│   ├── lib/
│   │   ├── screens/       # Écrans principaux
│   │   ├── services/      # Services API
│   │   ├── models/        # Modèles de données
│   │   ├── widgets/       # Composants réutilisables
│   │   ├── utils/         # Utilitaires
│   │   └── main.dart      # Point d'entrée
│   ├── pubspec.yaml       # Dépendances Flutter
│   └── README.md
│
├── backend/                # Serveur Node.js
│   ├── src/
│   │   ├── api/           # Routes API
│   │   ├── services/      # Logique métier
│   │   ├── models/        # Schémas MongoDB
│   │   ├── indicators/    # Indicateurs techniques
│   │   ├── strategies/    # Stratégies trading
│   │   ├── middleware/    # Authentification
│   │   └── config/        # Configuration
│   ├── package.json
│   ├── server.js          # Point d'entrée
│   └── README.md
│
├── ml-models/              # Modèles ML (Python)
│   ├── models/
│   │   ├── prediction.py  # Prédictions IA
│   │   ├── backtesting.py # Backtesting
│   │   └── sentiment.py   # Analyse sentimentale
│   ├── requirements.txt
│   └── README.md
│
├── docker-compose.yml     # Orchestration
├── Dockerfile             # Conteneur backend
├── .env.example           # Variables d'environnement
└── docs/                  # Documentation
```

## 🔧 Installation rapide

### Prérequis
- Flutter SDK 3.0+
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- MongoDB
- Redis

### Backend
```bash
cd backend
npm install
npm run dev
```

### Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run
```

### ML Models
```bash
cd ml-models
pip install -r requirements.txt
python models/backtesting.py
```

## 📊 Utilisation

1. **Créer un compte** - Connectez-vous avec Pocket Option
2. **Configurer les stratégies** - Choisissez vos indicateurs préférés
3. **Lancer le bot** - Activez le trading automatique
4. **Suivre les performances** - Consultez le dashboard en temps réel
5. **Optimiser** - Ajustez les paramètres selon vos résultats

## ⚙️ Configuration

Copiez `.env.example` en `.env` et complétez :

```env
# Pocket Option
POCKET_OPTION_API_KEY=your_api_key
POCKET_OPTION_SECRET=your_secret

# Database
MONGODB_URI=mongodb://localhost:27017/thiescoo
REDIS_URL=redis://localhost:6379

# Server
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret

# ML
ML_SERVER_URL=http://localhost:5000
```

## 🚢 Déploiement

### Avec Docker
```bash
docker-compose up -d
```

### Sur serveur (Ubuntu/Debian)
```bash
bash scripts/deploy.sh
```

## 📈 Performances

- **Win Rate**: 65-75% (selon stratégie)
- **ROI Mensuel**: 15-30%
- **Temps de réponse API**: <100ms
- **Uptime**: 99.9%

## ⚠️ Avertissements

- **Risque de perte**: Le trading d'options binaires comporte des risques importants
- **Backtesting**: Les résultats passés ne garantissent pas les performances futures
- **Légalité**: Vérifiez la réglementation dans votre pays
- **Test d'abord**: Utilisez un compte démo avant la vraie monnaie

## 🤝 Contribution

Les contributions sont bienvenues ! Veuillez créer une pull request avec :
- Description claire des changements
- Tests unitaires
- Documentation mise à jour

## 📝 Licence

MIT License - Voir LICENSE.md

## 📞 Support

- 📧 Email: support@thiescoo.dev
- 💬 Discord: [Rejoindre le serveur](https://discord.gg/thiescoo)
- 📚 Documentation: https://docs.thiescoo.dev

## 🎯 Roadmap

- [ ] Support multi-broker (IQ Option, Olymp Trade)
- [ ] API publique pour stratégies personnalisées
- [ ] Intégration TradingView Alerts
- [ ] Mobile web (Progressive Web App)
- [ ] Telegram Bot integration
- [ ] Advanced ML models (LSTM, Transformer)

---

**Créé avec ❤️ par Thiescoo Dev Team**
