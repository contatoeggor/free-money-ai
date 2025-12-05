export interface AnalysisResult {
  asset: string;
  timeframe: string;
  expiration: string;
  direction: 'buy' | 'sell';
  strategy: string;
  accuracy: number;
  timestamp: Date;
}

export interface TradeResult {
  result: 'gain' | 'loss';
  amount?: number;
}

export function generateAnalysis(
  asset: string,
  timeframe: string,
  expiration: string
): AnalysisResult {
  const strategies = [
    'RSI Divergence',
    'MACD Cross',
    'Bollinger Bands',
    'EMA 9/21',
    'Stochastic',
    'Ichimoku Cloud',
    'Fibonacci Retracement',
    'Support & Resistance',
    'VWAP',
    'ADX Trend',
    'Parabolic SAR',
    'Williams %R',
    'CCI',
    'ATR Volatility',
    'On Balance Volume',
    'Money Flow Index',
    'Keltner Channels',
    'Donchian Channels',
    'Pivot Points',
    'Harmonic Patterns',
    'Elliott Wave',
    'Wyckoff Method',
  ];

  const randomStrategy = strategies[Math.floor(Math.random() * strategies.length)];
  const randomDirection = Math.random() > 0.5 ? 'buy' : 'sell';
  const randomAccuracy = Math.floor(Math.random() * 15) + 75; // 75-90%

  return {
    asset,
    timeframe,
    expiration,
    direction: randomDirection,
    strategy: randomStrategy,
    accuracy: randomAccuracy,
    timestamp: new Date(),
  };
}

export function formatExpiration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function parseExpiration(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}
