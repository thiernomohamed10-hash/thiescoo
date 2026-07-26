import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import json

class BacktestEngine:
    def __init__(self, initial_balance=5000, stake=10):
        self.initial_balance = initial_balance
        self.balance = initial_balance
        self.stake = stake
        self.trades = []
        self.results = {}

    def run_backtest(self, prices, signals, win_rate=0.65):
        """
        Run backtest on historical data
        """
        total_trades = 0
        winning_trades = 0
        losing_trades = 0
        total_profit = 0

        for i, signal in enumerate(signals):
            if self.balance <= 0:
                break

            total_trades += 1
            
            # Simulate trade outcome based on signal confidence
            trade_result = self._simulate_trade(signal, win_rate)
            
            if trade_result['profit'] > 0:
                winning_trades += 1
            else:
                losing_trades += 1
            
            self.balance += trade_result['profit']
            total_profit += trade_result['profit']
            
            self.trades.append({
                'index': i,
                'signal': signal,
                'result': trade_result,
                'balance': self.balance
            })

        self.results = {
            'total_trades': total_trades,
            'winning_trades': winning_trades,
            'losing_trades': losing_trades,
            'win_rate': (winning_trades / total_trades * 100) if total_trades > 0 else 0,
            'total_profit': total_profit,
            'final_balance': self.balance,
            'roi': ((self.balance - self.initial_balance) / self.initial_balance * 100),
            'trades': self.trades
        }
        
        return self.results

    def _simulate_trade(self, signal, win_rate):
        """
        Simulate a single trade
        """
        # Use signal confidence to determine win probability
        signal_confidence = signal.get('confidence', 50) / 100
        adjusted_win_rate = win_rate * signal_confidence
        
        # Randomly determine if trade wins
        is_win = np.random.random() < adjusted_win_rate
        
        if is_win:
            profit = self.stake * 0.85  # 85% return on win
        else:
            profit = -self.stake  # Lose stake
        
        return {
            'win': is_win,
            'profit': profit,
            'timestamp': datetime.now().isoformat()
        }

    def get_report(self):
        """
        Get backtest report
        """
        return {
            'summary': {
                'total_trades': self.results.get('total_trades', 0),
                'win_rate': f"{self.results.get('win_rate', 0):.2f}%",
                'total_profit': f"${self.results.get('total_profit', 0):.2f}",
                'roi': f"{self.results.get('roi', 0):.2f}%",
                'final_balance': f"${self.results.get('final_balance', 0):.2f}",
            },
            'trades': self.results.get('trades', [])
        }


if __name__ == '__main__':
    # Example usage
    backtest = BacktestEngine()
    
    # Generate sample signals
    signals = [
        {'direction': 'CALL', 'confidence': 75},
        {'direction': 'PUT', 'confidence': 60},
        {'direction': 'CALL', 'confidence': 80},
    ] * 50
    
    prices = np.random.randn(100).cumsum() + 100
    
    # Run backtest
    results = backtest.run_backtest(prices, signals)
    
    # Print report
    report = backtest.get_report()
    print(json.dumps(report, indent=2))
