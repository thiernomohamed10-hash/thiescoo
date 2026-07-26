import 'package:flutter/foundation.dart';
import 'api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService extends ChangeNotifier {
  final ApiService _apiService = ApiService();
  String? _authToken;
  bool _isAuthenticated = false;

  bool get isAuthenticated => _isAuthenticated;
  String? get authToken => _authToken;

  AuthService() {
    _loadStoredToken();
  }

  Future<void> _loadStoredToken() async {
    final prefs = await SharedPreferences.getInstance();
    _authToken = prefs.getString('auth_token');
    _isAuthenticated = _authToken != null;
    notifyListeners();
  }

  Future<void> login(String email, String password) async {
    try {
      final response = await _apiService.post('/auth/login', {
        'email': email,
        'password': password,
      });

      _authToken = response['token'];
      _isAuthenticated = true;
      _apiService.setAuthToken(_authToken!);

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', _authToken!);

      notifyListeners();
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<void> logout() async {
    try {
      await _apiService.post('/auth/logout', {});
    } catch (e) {
      // Continue logout even if API call fails
    }

    _authToken = null;
    _isAuthenticated = false;

    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');

    notifyListeners();
  }

  Future<void> register(String email, String password, String name) async {
    try {
      final response = await _apiService.post('/auth/register', {
        'email': email,
        'password': password,
        'name': name,
      });

      _authToken = response['token'];
      _isAuthenticated = true;
      _apiService.setAuthToken(_authToken!);

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', _authToken!);

      notifyListeners();
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }
}
