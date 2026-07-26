const Signal = require('../models/Signal');
const IndicatorService = require('./indicator.service');

class SignalService {
  static async generateSignal(symbol, prices) {
    try {
      const rsi = IndicatorService.calculateRSI(prices);
      const macd = IndicatorService.calculateMACD(prices);
      const bollinger = IndicatorService.calculateBollingerBands(prices);

      let direction = 'NEUTRAL';
      let strength = 50;

      // Simple signal logic
      if (rsi < 30 && macd.macdLine > macd.signalLine) {
        direction = 'CALL';
        strength = Math.min(rsi * -1, 100);
      } else if (rsi > 70 && macd.macdLine < macd.signalLine) {
        direction = 'PUT';
        strength = Math.min(rsi - 50, 100);
      }

      const signal = new Signal({
        symbol,
        direction,
        strength,
        indicators: {
          rsi: rsi.toFixed(2),
          macd: macd.macdLine.toFixed(2),
          bollinger: `${bollinger.lowerBand.toFixed(2)}-${bollinger.upperBand.toFixed(2)}`,
        },
        confidence: strength,
      });

      await signal.save();
      return signal;
    } catch (error) {
      console.error('Signal generation error:', error);
      return null;
    }
  }

  static async getSignals() {
    return await Signal.find().sort({ timestamp: -1 }).limit(50);
  }

  static async getSignalsBySymbol(symbol) {
    return await Signal.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  }
}

module.exports = SignalService;
