# ML Models for Thiescoo

Python-based machine learning models for price prediction, sentiment analysis, and strategy optimization.

## Installation

```bash
pip install -r requirements.txt
```

## Running the ML Server

```bash
python app.py
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
`GET /health`

### Price Prediction
`POST /predict`
```json
{
  "prices": [100.5, 101.2, 102.1, ...]
}
```

### Backtesting
`POST /backtest`
```json
{
  "prices": [100.5, 101.2, 102.1, ...],
  "signals": [{"direction": "CALL", "confidence": 75}, ...]
}
```

### Sentiment Analysis
`POST /sentiment`
```json
{
  "text": "Bitcoin is bullish today!"
}
```

### Strategy Optimization
`POST /optimize`
```json
{
  "prices": [100.5, 101.2, 102.1, ...],
  "strategies": [{"stake": 10, "win_rate": 0.60}, ...]
}
```

## Models

### prediction.py
Price prediction using Random Forest classifier and feature engineering.

### backtesting.py
Backtest trading strategies against historical data.

### sentiment.py
Analyze sentiment from text and generate trading signals.

### optimizer.py
Optimize trading strategy parameters for maximum ROI.
