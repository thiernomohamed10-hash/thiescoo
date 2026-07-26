import os
import sys
from flask import Flask, request, jsonify
from models.prediction import PricePredictor
from models.backtesting import BacktestEngine
from models.sentiment import SentimentAnalyzer
from models.optimizer import StrategyOptimizer
import numpy as np

app = Flask(__name__)

# Initialize models
predictor = PricePredictor()
analyzer = SentimentAnalyzer()
optimizer = StrategyOptimizer()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        prices = data.get('prices', [])
        
        if not prices or len(prices) < 20:
            return jsonify({'error': 'Insufficient price data'}), 400
        
        prediction = predictor.predict(np.array(prices))
        return jsonify(prediction)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/backtest', methods=['POST'])
def backtest():
    try:
        data = request.json
        prices = data.get('prices', [])
        signals = data.get('signals', [])
        
        backtest_engine = BacktestEngine()
        results = backtest_engine.run_backtest(np.array(prices), signals)
        
        return jsonify(backtest_engine.get_report())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/sentiment', methods=['POST'])
def analyze_sentiment():
    try:
        data = request.json
        text = data.get('text', '')
        
        sentiment = analyzer.analyze_sentiment(text)
        signal = analyzer.generate_signal_from_sentiment(sentiment)
        
        return jsonify({'sentiment': sentiment, 'signal': signal})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/optimize', methods=['POST'])
def optimize():
    try:
        data = request.json
        prices = data.get('prices', [])
        strategies = data.get('strategies', [])
        
        best = optimizer.optimize_parameters(np.array(prices), strategies)
        
        return jsonify({'best_configuration': best})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
