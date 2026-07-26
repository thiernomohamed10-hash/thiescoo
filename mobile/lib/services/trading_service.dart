import 'package:flutter/foundation.dart';
import 'api_service.dart';

class TradingService extends ChangeNotifier {
  final ApiService _apiService = ApiService();
  List<Map<String, dynamic>> _trades = [];
  List<Map<String, dynamic>> _signals = [];
  Map<String, dynamic> _portfolio = {};

  List<Map<String, dynamic>> get trades => _trades;
  List<Map<String, dynamic>> get signals => _signals;
  Map<String, dynamic> get portfolio => _portfolio;

  Future<void> fetchTrades() async {
    try {
      final response = await _apiService.get('/trades');
      _trades = List<Map<String, dynamic>>.from(response['data'] ?? []);
      notifyListeners();
    } catch (e) {
      print('Failed to fetch trades: $e');
    }
  }

  Future<void> fetchSignals() async {
    try {
      final response = await _apiService.get('/signals');
      _signals = List<Map<String, dynamic>>.from(response['data'] ?? []);
      notifyListeners();
    } catch (e) {
      print('Failed to fetch signals: $e');
    }
  }

  Future<void> fetchPortfolio() async {
    try {
      final response = await _apiService.get('/portfolio');
      _portfolio = response['data'] ?? {};
      notifyListeners();
    } catch (e) {
      print('Failed to fetch portfolio: $e');
    }
  }

  Future<void> openTrade(Map<String, dynamic> tradeData) async {
    try {
      await _apiService.post('/trades/open', tradeData);
      await fetchTrades();
    } catch (e) {
      throw Exception('Failed to open trade: $e');
    }
  }

  Future<void> closeTrade(String tradeId) async {
    try {
      await _apiService.delete('/trades/$tradeId');
      await fetchTrades();
    } catch (e) {
      throw Exception('Failed to close trade: $e');
    }
  }
}
