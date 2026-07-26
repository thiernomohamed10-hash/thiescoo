import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib
import json
from datetime import datetime

class PricePredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False

    def extract_features(self, prices, volumes=None):
        """
        Extract features from price data
        """
        features = []
        
        # Basic price features
        for i in range(len(prices) - 20):
            window = prices[i:i+20]
            
            # Trend features
            sma_5 = np.mean(window[-5:])
            sma_10 = np.mean(window[-10:])
            sma_20 = np.mean(window)
            
            # Volatility
            volatility = np.std(window)
            
            # Momentum
            momentum = window[-1] - window[0]
            
            # Rate of change
            roc = (window[-1] - window[-5]) / window[-5] * 100
            
            features.append([
                sma_5, sma_10, sma_20,
                volatility, momentum, roc,
                window[-1],  # current price
            ])
        
        return np.array(features)

    def extract_labels(self, prices, threshold=0.01):
        """
        Generate labels based on future price movement
        """
        labels = []
        
        for i in range(len(prices) - 20):
            future_price = prices[i + 25] if i + 25 < len(prices) else prices[-1]
            current_price = prices[i + 20]
            
            # 1 if price goes up (CALL), 0 if price goes down (PUT)
            label = 1 if future_price > current_price * (1 + threshold) else 0
            labels.append(label)
        
        return np.array(labels)

    def train(self, prices, volumes=None):
        """
        Train the price prediction model
        """
        X = self.extract_features(prices, volumes)
        y = self.extract_labels(prices)
        
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        self.is_trained = True
        
        return {
            'status': 'trained',
            'accuracy': self.model.score(X_scaled, y),
            'timestamp': datetime.now().isoformat()
        }

    def predict(self, prices):
        """
        Predict next price direction
        """
        if not self.is_trained:
            raise Exception('Model not trained')
        
        X = self.extract_features(prices)
        if len(X) == 0:
            return None
        
        X_scaled = self.scaler.transform(X)
        predictions = self.model.predict(X_scaled)
        probabilities = self.model.predict_proba(X_scaled)
        
        return {
            'direction': 'CALL' if predictions[-1] == 1 else 'PUT',
            'confidence': float(max(probabilities[-1])) * 100,
            'timestamp': datetime.now().isoformat()
        }

    def save(self, filepath):
        """
        Save model to file
        """
        joblib.dump(self.model, f'{filepath}_model.pkl')
        joblib.dump(self.scaler, f'{filepath}_scaler.pkl')

    def load(self, filepath):
        """
        Load model from file
        """
        self.model = joblib.load(f'{filepath}_model.pkl')
        self.scaler = joblib.load(f'{filepath}_scaler.pkl')
        self.is_trained = True


if __name__ == '__main__':
    # Example usage
    predictor = PricePredictor()
    
    # Generate sample data
    prices = np.random.randn(100).cumsum() + 100
    
    # Train
    result = predictor.train(prices)
    print('Training result:', result)
    
    # Predict
    prediction = predictor.predict(prices)
    print('Prediction:', prediction)
    
    # Save
    predictor.save('models/price_predictor')
