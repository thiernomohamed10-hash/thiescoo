import numpy as np
import pandas as pd
from datetime import datetime

class StrategyOptimizer:
    def __init__(self):
        self.optimization_results = []

    def optimize_parameters(self, prices, strategies_config):
        """
        Optimize trading strategy parameters
        """
        best_result = None
        best_roi = -float('inf')
        
        for config in strategies_config:
            result = self._test_strategy(prices, config)
            self.optimization_results.append(result)
            
            if result['roi'] > best_roi:
                best_roi = result['roi']
                best_result = result
        
        return best_result

    def _test_strategy(self, prices, config):
        """
        Test a single strategy configuration
        """
        balance = 5000
        stake = config.get('stake', 10)
        win_rate = config.get('win_rate', 0.6)
        max_trades = len(prices) - 1
        
        wins = 0
        losses = 0
        
        for i in range(max_trades):
            if balance <= stake:
                break
            
            # Simulate trade
            if np.random.random() < win_rate:
                balance += stake * 0.85
                wins += 1
            else:
                balance -= stake
                losses += 1
        
        total_trades = wins + losses
        roi = ((balance - 5000) / 5000) * 100
        
        return {
            'config': config,
            'total_trades': total_trades,
            'wins': wins,
            'losses': losses,
            'win_rate': (wins / total_trades * 100) if total_trades > 0 else 0,
            'roi': roi,
            'final_balance': balance,
            'timestamp': datetime.now().isoformat()
        }

    def get_best_configuration(self):
        """
        Get the best configuration found
        """
        if not self.optimization_results:
            return None
        
        return max(self.optimization_results, key=lambda x: x['roi'])


if __name__ == '__main__':
    # Example usage
    optimizer = StrategyOptimizer()
    
    prices = np.random.randn(1000).cumsum() + 100
    
    strategies = [
        {'stake': 10, 'win_rate': 0.60},
        {'stake': 20, 'win_rate': 0.65},
        {'stake': 15, 'win_rate': 0.62},
    ]
    
    best = optimizer.optimize_parameters(prices, strategies)
    print('Best configuration:', best)
