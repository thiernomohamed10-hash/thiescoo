class IndicatorService {
  static calculateRSI(prices, period = 14) {
    if (prices.length < period) return null;

    let gains = 0;
    let losses = 0;

    for (let i = 1; i < period; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    for (let i = period; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains = change;
      else losses = Math.abs(change);

      avgGain = (avgGain * (period - 1) + gains) / period;
      avgLoss = (avgLoss * (period - 1) + losses) / period;
    }

    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));

    return rsi;
  }

  static calculateMACD(prices, fast = 12, slow = 26, signal = 9) {
    const ema12 = this.calculateEMA(prices, fast);
    const ema26 = this.calculateEMA(prices, slow);
    const macdLine = ema12 - ema26;
    const signalLine = this.calculateEMA([macdLine], signal);
    const histogram = macdLine - signalLine;

    return { macdLine, signalLine, histogram };
  }

  static calculateBollingerBands(prices, period = 20, stdDev = 2) {
    const sma = this.calculateSMA(prices, period);
    let squaredDiffs = 0;

    for (let i = prices.length - period; i < prices.length; i++) {
      squaredDiffs += Math.pow(prices[i] - sma, 2);
    }

    const variance = squaredDiffs / period;
    const std = Math.sqrt(variance);
    const upperBand = sma + stdDev * std;
    const lowerBand = sma - stdDev * std;

    return { upperBand, middleBand: sma, lowerBand };
  }

  static calculateSMA(prices, period) {
    let sum = 0;
    for (let i = prices.length - period; i < prices.length; i++) {
      sum += prices[i];
    }
    return sum / period;
  }

  static calculateEMA(prices, period) {
    const k = 2 / (period + 1);
    let ema = prices[0];

    for (let i = 1; i < prices.length; i++) {
      ema = prices[i] * k + ema * (1 - k);
    }

    return ema;
  }
}

module.exports = IndicatorService;
