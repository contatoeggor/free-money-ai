'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Clock,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import {
  ALL_ASSETS,
  FOREX_ASSETS,
  OTC_ASSETS,
  CRYPTO_ASSETS,
  COMMODITIES_ASSETS,
  STOCKS_ASSETS,
  CHART_TIMEFRAMES,
  isAssetOpen,
  getAssetStatus,
  type Asset,
  type AssetCategory,
} from '@/lib/assets';
import { generateAnalysis, formatExpiration, type AnalysisResult, type TradeResult } from '@/lib/trading';

type TabType = 'forex' | 'otc' | 'crypto' | 'commodities' | 'stocks';

// Imagens dos gráficos para alternar no fundo
const CHART_BACKGROUNDS = [
  'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/16c1987d-24d0-4ba2-9bc6-f6ae48ff6916.png',
  'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/182ec1d4-7bc1-4388-8419-bde1c4967ed9.png',
  'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/96d0d7ef-9f69-473c-9dad-8471385f2a17.png',
];

export default function PlatformPage() {
  const [activeTab, setActiveTab] = useState<TabType>('forex');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1m');
  const [expirationSeconds, setExpirationSeconds] = useState(60);
  const [showTimeframeSelector, setShowTimeframeSelector] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [tradeHistory, setTradeHistory] = useState<(AnalysisResult & TradeResult)[]>([]);
  const [currentChartBg, setCurrentChartBg] = useState(0);
  const [showMobileChart, setShowMobileChart] = useState(false);

  const getAssetsByTab = (tab: TabType): Asset[] => {
    switch (tab) {
      case 'forex':
        return FOREX_ASSETS;
      case 'otc':
        return OTC_ASSETS;
      case 'crypto':
        return CRYPTO_ASSETS;
      case 'commodities':
        return COMMODITIES_ASSETS;
      case 'stocks':
        return STOCKS_ASSETS;
      default:
        return [];
    }
  };

  const handleAssetSelect = (asset: Asset) => {
    if (isAssetOpen(asset)) {
      setSelectedAsset(asset);
      setAnalysis(null);
      setShowFeedback(false);
      // Trocar imagem de fundo ao selecionar novo ativo
      setCurrentChartBg((prev) => (prev + 1) % CHART_BACKGROUNDS.length);
      // No mobile, abrir em nova janela
      if (window.innerWidth < 1024) {
        setShowMobileChart(true);
      }
    }
  };

  const handleAnalyze = () => {
    if (!selectedAsset) return;

    setAnalyzing(true);
    setTimeout(() => {
      const result = generateAnalysis(
        selectedAsset.name,
        selectedTimeframe,
        formatExpiration(expirationSeconds)
      );
      setAnalysis(result);
      setAnalyzing(false);
    }, 2000);
  };

  const handleTradeResult = (result: 'gain' | 'loss') => {
    if (!analysis) return;

    const tradeRecord = {
      ...analysis,
      result,
    };

    setTradeHistory([tradeRecord, ...tradeHistory]);
    
    // Redirecionar automaticamente para nova análise
    setShowFeedback(false);
    setAnalysis(null);
  };

  const calculateAccuracy = () => {
    if (tradeHistory.length === 0) return 0;
    const gains = tradeHistory.filter((t) => t.result === 'gain').length;
    return Math.round((gains / tradeHistory.length) * 100);
  };

  const incrementExpiration = () => {
    if (expirationSeconds < 86399) {
      setExpirationSeconds(expirationSeconds + 60);
    }
  };

  const decrementExpiration = () => {
    if (expirationSeconds > 60) {
      setExpirationSeconds(expirationSeconds - 60);
    }
  };

  // Componente de gráfico (reutilizável para desktop e mobile)
  const ChartArea = () => (
    <div className="space-y-4">
      {/* Controls */}
      {selectedAsset && (
        <div className="bg-[#0A0E27] rounded-xl border border-[#1E293B] p-4">
          <div className="space-y-4">
            {/* Asset Name */}
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00D9FF]" />
              <span className="font-semibold text-lg">{selectedAsset.name}</span>
            </div>

            {/* Timeframe and Expiration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Timeframe Selector */}
              <div className="relative z-50">
                <label className="text-xs text-gray-400 block mb-2">Tempo gráfico</label>
                <button
                  onClick={() => setShowTimeframeSelector(!showTimeframeSelector)}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-[#1E293B] hover:bg-[#334155] rounded-lg transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  <span className="flex-1 text-left">{CHART_TIMEFRAMES.find((t) => t.value === selectedTimeframe)?.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showTimeframeSelector && (
                  <div className="absolute top-full left-0 mt-2 bg-[#1E293B] border border-[#334155] rounded-xl p-2 grid grid-cols-2 gap-2 z-50 min-w-full">
                    {CHART_TIMEFRAMES.map((tf) => (
                      <button
                        key={tf.value}
                        onClick={() => {
                          setSelectedTimeframe(tf.value);
                          setShowTimeframeSelector(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedTimeframe === tf.value
                            ? 'bg-[#00D9FF] text-black'
                            : 'bg-[#334155] hover:bg-[#475569] text-gray-300'
                        }`}
                      >
                        {tf.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Expiration Timer */}
              <div>
                <label className="text-xs text-gray-400 block mb-2">Tempo de expiração</label>
                <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg px-4 py-3">
                  <span className="font-mono text-lg font-semibold flex-1 text-center">
                    {formatExpiration(expirationSeconds)}
                  </span>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={incrementExpiration}
                      className="p-1 bg-[#334155] hover:bg-[#475569] rounded transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={decrementExpiration}
                      className="p-1 bg-[#334155] hover:bg-[#475569] rounded transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart Display */}
      <div className="bg-[#0A0E27] rounded-xl border border-[#1E293B] p-6 lg:min-h-[500px] min-h-[400px] flex items-center justify-center relative overflow-y-auto">
        {/* Background com gráfico desfocado */}
        {selectedAsset && (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-20 rounded-xl"
            style={{
              backgroundImage: `url(${CHART_BACKGROUNDS[currentChartBg]})`,
              filter: 'blur(8px)',
              zIndex: 0,
            }}
          />
        )}

        {!selectedAsset ? (
          <div className="text-center text-gray-500 relative z-10">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Selecione um ativo para começar</p>
          </div>
        ) : !analysis ? (
          <div className="text-center space-y-6 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold mb-3">Analisar gráfico e gerar entrada automática</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Nossa IA irá analisar o mercado em tempo real e identificar a melhor oportunidade de entrada
            </p>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-8 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] hover:from-[#00B8E6] hover:to-[#0052CC] rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00D9FF]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
            >
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analisar com IA
                </>
              )}
            </button>
          </div>
        ) : !showFeedback ? (
          <div className="w-full max-w-2xl space-y-6 relative z-10">
            <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Análise Concluída</h3>
                  <p className="text-sm text-gray-400">Entrada identificada com sucesso</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0A0E27]/50 rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Ativo</p>
                  <p className="text-lg font-semibold">{analysis.asset}</p>
                </div>
                <div className="bg-[#0A0E27]/50 rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Tempo Gráfico</p>
                  <p className="text-lg font-semibold">
                    {CHART_TIMEFRAMES.find((t) => t.value === analysis.timeframe)?.label}
                  </p>
                </div>
                <div className="bg-[#0A0E27]/50 rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Expiração</p>
                  <p className="text-lg font-semibold font-mono">{analysis.expiration}</p>
                </div>
                <div className="bg-[#0A0E27]/50 rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Assertividade</p>
                  <p className="text-lg font-semibold text-[#00FF88]">{analysis.accuracy}%</p>
                </div>
              </div>

              <div className="bg-[#0A0E27]/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-400 mb-1">Estratégia Identificada</p>
                <p className="text-lg font-semibold text-[#00D9FF]">{analysis.strategy}</p>
              </div>

              <div
                className={`rounded-xl p-6 ${
                  analysis.direction === 'buy'
                    ? 'bg-gradient-to-r from-[#00FF88]/20 to-[#00CC6A]/20 border border-[#00FF88]/50'
                    : 'bg-gradient-to-r from-[#FF0055]/20 to-[#CC0044]/20 border border-[#FF0055]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Recomendação</p>
                    <p className="text-2xl font-bold flex items-center gap-2">
                      {analysis.direction === 'buy' ? (
                        <>
                          <ArrowUp className="w-6 h-6" />
                          Faça uma COMPRA
                        </>
                      ) : (
                        <>
                          <ArrowDown className="w-6 h-6" />
                          Faça uma VENDA
                        </>
                      )}
                    </p>
                  </div>
                  <div
                    className={`text-6xl font-bold ${
                      analysis.direction === 'buy' ? 'text-[#00FF88]' : 'text-[#FF0055]'
                    }`}
                  >
                    {analysis.direction === 'buy' ? '↑' : '↓'}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-xl">
                <p className="text-sm text-[#00D9FF] font-medium">
                  <span className="font-bold">Entrada</span>
                  <br />
                  Entrar imediatamente, pois as próximas velas serão de {analysis.direction === 'buy' ? 'alta' : 'baixa'}.
                </p>
              </div>

              <button
                onClick={() => setShowFeedback(true)}
                className={`w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-colors ${
                  analysis.direction === 'buy'
                    ? 'bg-[#00FF88] hover:bg-[#00CC6A] text-black'
                    : 'bg-[#FF0055] hover:bg-[#CC0044] text-white'
                }`}
              >
                Gerar nova análise
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-6 relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Como foi o resultado?</h3>
              <p className="text-gray-400">Registre o resultado para calcular a assertividade</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTradeResult('gain')}
                className="p-8 bg-gradient-to-br from-[#00FF88]/20 to-[#00CC6A]/20 hover:from-[#00FF88]/30 hover:to-[#00CC6A]/30 border border-[#00FF88]/50 rounded-2xl transition-all hover:scale-105"
              >
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-[#00FF88]" />
                <p className="text-xl font-bold text-[#00FF88]">GAIN</p>
                <p className="text-sm text-gray-400 mt-1">Lucro / Acerto</p>
              </button>

              <button
                onClick={() => handleTradeResult('loss')}
                className="p-8 bg-gradient-to-br from-[#FF0055]/20 to-[#CC0044]/20 hover:from-[#FF0055]/30 hover:to-[#CC0044]/30 border border-[#FF0055]/50 rounded-2xl transition-all hover:scale-105"
              >
                <XCircle className="w-12 h-12 mx-auto mb-3 text-[#FF0055]" />
                <p className="text-xl font-bold text-[#FF0055]">LOSS</p>
                <p className="text-sm text-gray-400 mt-1">Perda / Erro</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Mobile: Renderizar em janela separada
  if (showMobileChart && window.innerWidth < 1024) {
    return (
      <div className="min-h-screen bg-[#0A0E27] text-white">
        <header className="border-b border-[#1E293B] bg-[#0A0E27]/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <button
              onClick={() => setShowMobileChart(false)}
              className="p-2 hover:bg-[#1E293B] rounded-lg transition-colors mb-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src="/icon.svg" 
                  alt="Free-Money.AI Logo" 
                  className="w-10 h-10"
                />
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#0066FF] bg-clip-text text-transparent">
                  Free-Money.AI
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ffbf511f-e57f-4471-a959-7e058442ba04.png" 
                  alt="Binolla" 
                  className="h-10 w-auto rounded-lg"
                />
                <span className="text-base font-semibold">Binolla</span>
              </div>
              
              <a
                href="https://eggor.site/binolla"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] hover:from-[#00B8E6] hover:to-[#0052CC] rounded-lg font-semibold text-sm transition-all"
              >
                Ir para Binolla
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <ChartArea />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white">
      {/* Header */}
      <header className="border-b border-[#1E293B] bg-[#0A0E27]/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src="/icon.svg" 
                  alt="Free-Money.AI Logo" 
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#0066FF] bg-clip-text text-transparent">
                  Free-Money.AI
                </h1>
              </div>
              
              {/* Binolla Logo + Button - Desktop: Below Free-Money.AI */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img 
                    src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ffbf511f-e57f-4471-a959-7e058442ba04.png" 
                    alt="Binolla" 
                    className="h-8 w-auto rounded-lg"
                  />
                  <span className="text-lg font-semibold">Binolla</span>
                </div>
                
                <a
                  href="https://eggor.site/binolla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] hover:from-[#00B8E6] hover:to-[#0052CC] rounded-lg font-semibold text-sm transition-all"
                >
                  Ir para Binolla
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-400">Assertividade:</span>{' '}
              <span className="text-[#00FF88] font-semibold">{calculateAccuracy()}%</span>
              <span className="text-gray-500 ml-2">({tradeHistory.length} operações)</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Sidebar - Asset Selection */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="bg-[#0A0E27] rounded-xl border border-[#1E293B] overflow-hidden">
              <button
                onClick={() => setActiveTab('forex')}
                className={`w-full px-4 py-3 text-left font-medium transition-colors border-b border-[#1E293B] ${
                  activeTab === 'forex' ? 'bg-[#00D9FF]/10 text-[#00D9FF]' : 'text-gray-400 hover:bg-[#1E293B]'
                }`}
              >
                Currency Pairs
              </button>
              <button
                onClick={() => setActiveTab('otc')}
                className={`w-full px-4 py-3 text-left font-medium transition-colors border-b border-[#1E293B] ${
                  activeTab === 'otc' ? 'bg-[#00D9FF]/10 text-[#00D9FF]' : 'text-gray-400 hover:bg-[#1E293B]'
                }`}
              >
                Currency Pairs OTC
              </button>
              <button
                onClick={() => setActiveTab('crypto')}
                className={`w-full px-4 py-3 text-left font-medium transition-colors border-b border-[#1E293B] ${
                  activeTab === 'crypto' ? 'bg-[#00D9FF]/10 text-[#00D9FF]' : 'text-gray-400 hover:bg-[#1E293B]'
                }`}
              >
                Crypto
              </button>
              <button
                onClick={() => setActiveTab('commodities')}
                className={`w-full px-4 py-3 text-left font-medium transition-colors border-b border-[#1E293B] ${
                  activeTab === 'commodities' ? 'bg-[#00D9FF]/10 text-[#00D9FF]' : 'text-gray-400 hover:bg-[#1E293B]'
                }`}
              >
                Commodities
              </button>
              <button
                onClick={() => setActiveTab('stocks')}
                className={`w-full px-4 py-3 text-left font-medium transition-colors ${
                  activeTab === 'stocks' ? 'bg-[#00D9FF]/10 text-[#00D9FF]' : 'text-gray-400 hover:bg-[#1E293B]'
                }`}
              >
                Stocks
              </button>
            </div>

            {/* Assets List */}
            <div className="bg-[#0A0E27] rounded-xl border border-[#1E293B] p-4 max-h-[600px] overflow-y-auto">
              <div className="space-y-2">
                {getAssetsByTab(activeTab).map((asset) => {
                  const isOpen = isAssetOpen(asset);
                  const status = getAssetStatus(asset);
                  return (
                    <button
                      key={asset.id}
                      onClick={() => handleAssetSelect(asset)}
                      disabled={!isOpen}
                      className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                        selectedAsset?.id === asset.id
                          ? 'bg-[#00D9FF]/20 border border-[#00D9FF]/50 text-[#00D9FF]'
                          : isOpen
                          ? 'bg-[#1E293B] hover:bg-[#334155] text-white'
                          : 'bg-[#1E293B]/50 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium truncate">{asset.name}</span>
                        <span className={`text-xs px-2 py-1 rounded whitespace-nowrap flex-shrink-0 ${
                          isOpen 
                            ? 'bg-[#00FF88]/20 text-[#00FF88]' 
                            : 'bg-[#FF0055]/20 text-[#FF0055]'
                        }`}>
                          {status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Chart Area - Desktop */}
          <div className="hidden lg:block">
            <ChartArea />
          </div>

          {/* Mobile: Mostrar apenas lista de ativos */}
          {!showMobileChart && (
            <div className="lg:hidden">
              <div className="bg-[#0A0E27] rounded-xl border border-[#1E293B] p-6 text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50 text-gray-500" />
                <p className="text-gray-400">Selecione um ativo para visualizar o gráfico</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
