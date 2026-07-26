import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/status.dart' as status;

class WebSocketService {
  static const String _url = 'ws://localhost:3000';
  late WebSocketChannel _channel;
  bool _isConnected = false;

  bool get isConnected => _isConnected;

  Future<void> connect() async {
    try {
      _channel = WebSocketChannel.connect(Uri.parse(_url));
      _isConnected = true;
    } catch (e) {
      throw Exception('Failed to connect WebSocket: $e');
    }
  }

  void disconnect() {
    _channel.sink.close(status.goingAway);
    _isConnected = false;
  }

  void send(Map<String, dynamic> message) {
    if (_isConnected) {
      _channel.sink.add(message.toString());
    }
  }

  Stream<dynamic> get messages => _channel.stream;
}
