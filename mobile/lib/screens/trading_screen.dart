import 'package:flutter/material.dart';

class TradingScreen extends StatefulWidget {
  const TradingScreen({Key? key}) : super(key: key);

  @override
  State<TradingScreen> createState() => _TradingScreenState();
}

class _TradingScreenState extends State<TradingScreen> {
  String _selectedSymbol = 'EUR/USD';
  String _selectedTimeframe = '5m';
  String _selectedDirection = 'CALL';
  double _stake = 10.0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Open Trade'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Chart placeholder
            Container(
              height: 250,
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Text('Chart coming soon'),
              ),
            ),
            const SizedBox(height: 24),
            // Symbol Selection
            Text('Symbol', style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 8),
            DropdownButton<String>(
              value: _selectedSymbol,
              isExpanded: true,
              items: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD']
                  .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                  .toList(),
              onChanged: (value) => setState(() => _selectedSymbol = value!),
            ),
            const SizedBox(height: 16),
            // Timeframe
            Text('Timeframe', style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 8),
            DropdownButton<String>(
              value: _selectedTimeframe,
              isExpanded: true,
              items: ['1m', '5m', '15m', '1h']
                  .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                  .toList(),
              onChanged: (value) => setState(() => _selectedTimeframe = value!),
            ),
            const SizedBox(height: 24),
            // Direction
            Text('Direction', style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => setState(() => _selectedDirection = 'CALL'),
                    icon: const Icon(Icons.arrow_upward),
                    label: const Text('CALL'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _selectedDirection == 'CALL' ? Colors.green : Colors.grey,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => setState(() => _selectedDirection = 'PUT'),
                    icon: const Icon(Icons.arrow_downward),
                    label: const Text('PUT'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _selectedDirection == 'PUT' ? Colors.red : Colors.grey,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            // Stake
            Text('Stake (\$)', style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 8),
            Slider(
              value: _stake,
              min: 1,
              max: 500,
              onChanged: (value) => setState(() => _stake = value),
            ),
            Text('\$${_stake.toStringAsFixed(2)}'),
            const SizedBox(height: 32),
            // Open Trade Button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Trade opened!')),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'Open Trade',
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
