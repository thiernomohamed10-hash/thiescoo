import numpy as np
from datetime import datetime
import json

class SentimentAnalyzer:
    def __init__(self):
        self.sentiment_keywords = {
            'positive': ['buy', 'bullish', 'up', 'surge', 'gain', 'strength', 'rally', 'moon'],
            'negative': ['sell', 'bearish', 'down', 'crash', 'loss', 'weakness', 'drop', 'dump']
        }

    def analyze_sentiment(self, text):
        """
        Analyze sentiment from text
        """
        text_lower = text.lower()
        
        positive_count = sum(1 for word in self.sentiment_keywords['positive'] if word in text_lower)
        negative_count = sum(1 for word in self.sentiment_keywords['negative'] if word in text_lower)
        
        total = positive_count + negative_count
        
        if total == 0:
            sentiment_score = 0.5  # Neutral
        else:
            sentiment_score = positive_count / total
        
        return {
            'sentiment': 'positive' if sentiment_score > 0.6 else 'negative' if sentiment_score < 0.4 else 'neutral',
            'score': sentiment_score,
            'positive_words': positive_count,
            'negative_words': negative_count,
            'timestamp': datetime.now().isoformat()
        }

    def generate_signal_from_sentiment(self, sentiment_data):
        """
        Generate trading signal based on sentiment
        """
        sentiment_score = sentiment_data['score']
        
        if sentiment_score > 0.7:
            return {'direction': 'CALL', 'confidence': sentiment_score * 100}
        elif sentiment_score < 0.3:
            return {'direction': 'PUT', 'confidence': (1 - sentiment_score) * 100}
        else:
            return {'direction': 'HOLD', 'confidence': 50}


if __name__ == '__main__':
    # Example usage
    analyzer = SentimentAnalyzer()
    
    text = "Bitcoin is bullish today! Strong surge in the market!"
    sentiment = analyzer.analyze_sentiment(text)
    print('Sentiment:', sentiment)
    
    signal = analyzer.generate_signal_from_sentiment(sentiment)
    print('Signal:', signal)
