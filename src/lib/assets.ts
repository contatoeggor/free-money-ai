export type AssetCategory = 'forex' | 'otc' | 'crypto' | 'commodities' | 'stocks';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  is24h: boolean;
  openTime?: string;
  closeTime?: string;
  openDays?: number[];
}

export const FOREX_ASSETS: Asset[] = [
  { id: 'AUDCAD', name: 'AUDCAD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'AUDCHF', name: 'AUDCHF', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'AUDJPY', name: 'AUDJPY', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'AUDUSD', name: 'AUDUSD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'EURAUD', name: 'EURAUD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'EURCAD', name: 'EURCAD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'EURGBP', name: 'EURGBP', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'EURJPY', name: 'EURJPY', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'EURUSD', name: 'EURUSD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'GBPAUD', name: 'GBPAUD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'GBPCAD', name: 'GBPCAD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'GBPCHF', name: 'GBPCHF', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'GBPJPY', name: 'GBPJPY', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'GBPUSD', name: 'GBPUSD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'USDCAD', name: 'USDCAD', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'USDCHF', name: 'USDCHF', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
  { id: 'USDJPY', name: 'USDJPY', category: 'forex', is24h: false, openTime: '01:00', closeTime: '17:00', openDays: [1, 2, 3, 4, 5] },
];

export const OTC_ASSETS: Asset[] = [
  { id: 'AUDCHF_OTC', name: 'AUDCHF (OTC)', category: 'otc', is24h: true },
  { id: 'AUDJPY_OTC', name: 'AUDJPY (OTC)', category: 'otc', is24h: true },
  { id: 'AUDUSD_OTC', name: 'AUDUSD (OTC)', category: 'otc', is24h: true },
  { id: 'EURAUD_OTC', name: 'EURAUD (OTC)', category: 'otc', is24h: true },
  { id: 'EURCAD_OTC', name: 'EURCAD (OTC)', category: 'otc', is24h: true },
  { id: 'EURGBP_OTC', name: 'EURGBP (OTC)', category: 'otc', is24h: true },
  { id: 'EURJPY_OTC', name: 'EURJPY (OTC)', category: 'otc', is24h: true },
  { id: 'EURUSD_OTC', name: 'EURUSD (OTC)', category: 'otc', is24h: true },
  { id: 'GBPAUD_OTC', name: 'GBPAUD (OTC)', category: 'otc', is24h: true },
  { id: 'GBPCAD_OTC', name: 'GBPCAD (OTC)', category: 'otc', is24h: true },
  { id: 'GBPCHF_OTC', name: 'GBPCHF (OTC)', category: 'otc', is24h: true },
  { id: 'GBPUSD_OTC', name: 'GBPUSD (OTC)', category: 'otc', is24h: true },
  { id: 'USDBDT_OTC', name: 'USDBDT (OTC)', category: 'otc', is24h: true },
  { id: 'USDBRL_OTC', name: 'USDBRL (OTC)', category: 'otc', is24h: true },
  { id: 'USDCAD_OTC', name: 'USDCAD (OTC)', category: 'otc', is24h: true },
  { id: 'USDCHF_OTC', name: 'USDCHF (OTC)', category: 'otc', is24h: true },
];

export const CRYPTO_ASSETS: Asset[] = [
  { id: 'BCH_OTC', name: 'Bitcoin Cash (OTC)', category: 'crypto', is24h: true },
  { id: 'BNB_OTC', name: 'BNB (OTC)', category: 'crypto', is24h: true },
  { id: 'BTC_OTC', name: 'Bitcoin (OTC)', category: 'crypto', is24h: true },
  { id: 'DOT_OTC', name: 'Polkadot (OTC)', category: 'crypto', is24h: true },
  { id: 'ETH_OTC', name: 'Ethereum (OTC)', category: 'crypto', is24h: true },
  { id: 'NEAR_OTC', name: 'NEAR Protocol (OTC)', category: 'crypto', is24h: true },
  { id: 'SOL_OTC', name: 'Solana (OTC)', category: 'crypto', is24h: true },
  { id: 'TON_OTC', name: 'Toncoin (OTC)', category: 'crypto', is24h: true },
  { id: 'WIF_OTC', name: 'dogwifhat (OTC)', category: 'crypto', is24h: true },
];

export const COMMODITIES_ASSETS: Asset[] = [
  { id: 'SILVER_OTC', name: 'Silver (OTC)', category: 'commodities', is24h: true },
  { id: 'GOLD_OTC', name: 'Gold (OTC)', category: 'commodities', is24h: true },
  { id: 'BRENT_OTC', name: 'Brent Oil (OTC)', category: 'commodities', is24h: true },
  { id: 'NATGAS_OTC', name: 'Natural Gas (OTC)', category: 'commodities', is24h: true },
  { id: 'PALLADIUM_OTC', name: 'Palladium spot (OTC)', category: 'commodities', is24h: true },
  { id: 'PLATINUM_OTC', name: 'Platinum spot (OTC)', category: 'commodities', is24h: true },
  { id: 'WTI_OTC', name: 'WTI Crude Oil (OTC)', category: 'commodities', is24h: true },
];

export const STOCKS_ASSETS: Asset[] = [
  { id: 'AUS200_OTC', name: 'AUS 200 (OTC)', category: 'stocks', is24h: true },
  { id: 'FR40_OTC', name: 'FR 40 (OTC)', category: 'stocks', is24h: true },
  { id: 'GER30_OTC', name: 'GER 30 (OTC)', category: 'stocks', is24h: true },
  { id: 'HK33_OTC', name: 'HK 33 (OTC)', category: 'stocks', is24h: true },
  { id: 'JP225_OTC', name: 'JP 225 (OTC)', category: 'stocks', is24h: true },
  { id: 'SP35_OTC', name: 'SP 35 (OTC)', category: 'stocks', is24h: true },
  { id: 'UK100_OTC', name: 'UK 100 (OTC)', category: 'stocks', is24h: true },
  { id: 'US100_OTC', name: 'US 100 (OTC)', category: 'stocks', is24h: true },
  { id: 'US2000_OTC', name: 'US 2000 (OTC)', category: 'stocks', is24h: true },
  { id: 'US500_OTC', name: 'US 500 (OTC)', category: 'stocks', is24h: true },
  { id: 'USDX_OTC', name: 'USDX (OTC)', category: 'stocks', is24h: true },
];

export const ALL_ASSETS = [
  ...FOREX_ASSETS,
  ...OTC_ASSETS,
  ...CRYPTO_ASSETS,
  ...COMMODITIES_ASSETS,
  ...STOCKS_ASSETS,
];

export const CHART_TIMEFRAMES = [
  { value: '5s', label: '5 segundos' },
  { value: '10s', label: '10 segundos' },
  { value: '15s', label: '15 segundos' },
  { value: '30s', label: '30 segundos' },
  { value: '1m', label: '1 minuto' },
  { value: '2m', label: '2 minutos' },
  { value: '3m', label: '3 minutos' },
  { value: '5m', label: '5 minutos' },
  { value: '10m', label: '10 minutos' },
  { value: '15m', label: '15 minutos' },
  { value: '30m', label: '30 minutos' },
  { value: '1h', label: '1 hora' },
  { value: '5h', label: '5 horas' },
  { value: '1d', label: '1 dia' },
];

export const TRADING_STRATEGIES = [
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

export function isAssetOpen(asset: Asset): boolean {
  if (asset.is24h) return true;

  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  if (!asset.openDays?.includes(currentDay)) return false;

  if (asset.openTime && asset.closeTime) {
    const [openHour, openMin] = asset.openTime.split(':').map(Number);
    const [closeHour, closeMin] = asset.closeTime.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    return currentTime >= openTime && currentTime <= closeTime;
  }

  return true;
}

export function getAssetStatus(asset: Asset): string {
  if (asset.is24h) return 'Aberto 24h';

  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  if (!asset.openDays?.includes(currentDay)) {
    // Calcular próximo dia útil
    let daysUntilOpen = 1;
    let nextDay = (currentDay + 1) % 7;
    while (!asset.openDays?.includes(nextDay)) {
      daysUntilOpen++;
      nextDay = (nextDay + 1) % 7;
    }
    
    if (daysUntilOpen === 1) {
      return `Fechado (abre amanhã às ${asset.openTime})`;
    }
    return `Fechado (abre em ${daysUntilOpen} dias)`;
  }

  if (asset.openTime && asset.closeTime) {
    const [openHour, openMin] = asset.openTime.split(':').map(Number);
    const [closeHour, closeMin] = asset.closeTime.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    if (currentTime >= openTime && currentTime <= closeTime) {
      return `Aberto até ${asset.closeTime}`;
    }

    if (currentTime < openTime) {
      const hoursUntilOpen = Math.floor((openTime - currentTime) / 60);
      const minutesUntilOpen = (openTime - currentTime) % 60;
      
      if (hoursUntilOpen > 0) {
        return `Fechado (abre em ${hoursUntilOpen}h${minutesUntilOpen > 0 ? minutesUntilOpen + 'min' : ''})`;
      }
      return `Fechado (abre em ${minutesUntilOpen}min)`;
    }

    // Fechado até próximo dia útil
    return `Fechado (abre amanhã às ${asset.openTime})`;
  }

  return 'Aberto';
}
