'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, Sparkles, Shield, CheckCircle } from 'lucide-react';

export default function Home() {
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);

  const handleRegister = () => {
    window.open('https://eggor.site/binolla', '_blank');
    setRedirecting(true);
  };

  useEffect(() => {
    if (redirecting && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (redirecting && countdown === 0) {
      window.location.href = '/platform';
    }
  }, [redirecting, countdown]);

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Twinkling Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="border-b border-[#1E293B] bg-[#0A0E27]/95 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/icon.svg" 
              alt="Free-Money.AI Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#0066FF] bg-clip-text text-transparent">
              Free-Money.AI
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Desktop: Binolla ABOVE Badge */}
          <div className="hidden md:block space-y-4">
            {/* Binolla Integration Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#1E293B] border border-[#00FF88]/30 rounded-xl">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ffbf511f-e57f-4471-a959-7e058442ba04.png" 
                alt="Binolla" 
                className="h-8 w-auto rounded-lg"
              />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00FF88]" />
                <span className="text-sm font-medium">
                  Integrado com <span className="text-[#00FF88] font-bold">Binolla</span>
                </span>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-full text-[#00D9FF] text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Análise de Trading com Inteligência Artificial</span>
            </div>
          </div>

          {/* Mobile: Badge ABOVE Binolla */}
          <div className="md:hidden space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-full text-[#00D9FF] text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Análise de Trading com Inteligência Artificial</span>
            </div>

            {/* Binolla Integration Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#1E293B] border border-[#00FF88]/30 rounded-xl">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ffbf511f-e57f-4471-a959-7e058442ba04.png" 
                alt="Binolla" 
                className="h-8 w-auto rounded-lg"
              />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00FF88]" />
                <span className="text-sm font-medium">
                  Integrado com <span className="text-[#00FF88] font-bold">Binolla</span>
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Transforme suas operações com{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#00FF88] to-[#0066FF] bg-clip-text text-transparent">
              análise inteligente
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Plataforma avançada de análise de mercado com IA. Receba entradas precisas, estratégias validadas e maximize seus resultados no trading.
          </p>

          {/* CTA Button */}
          {!redirecting ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={handleRegister}
                className="group px-8 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] hover:from-[#00B8E6] hover:to-[#0052CC] rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00D9FF]/50 flex items-center gap-2"
              >
                Criar Cadastro Gratuito
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="pt-8 space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl text-[#00FF88]">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Redirecionando para a plataforma em {countdown}s...</span>
              </div>
              <p className="text-sm text-gray-500">
                Complete seu cadastro na nova aba que foi aberta
              </p>
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <div className="p-6 bg-[#1E293B]/50 border border-[#334155] rounded-2xl hover:border-[#00D9FF]/50 transition-colors">
              <div className="w-12 h-12 bg-[#00D9FF]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-[#00D9FF]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Análise em Tempo Real</h3>
              <p className="text-gray-400 text-sm">
                Entradas precisas baseadas em 22+ estratégias de trading validadas
              </p>
            </div>

            <div className="p-6 bg-[#1E293B]/50 border border-[#334155] rounded-2xl hover:border-[#00FF88]/50 transition-colors">
              <div className="w-12 h-12 bg-[#00FF88]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-[#00FF88]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">IA Avançada</h3>
              <p className="text-gray-400 text-sm">
                Algoritmos de machine learning para identificar as melhores oportunidades
              </p>
            </div>

            <div className="p-6 bg-[#1E293B]/50 border border-[#334155] rounded-2xl hover:border-[#0066FF]/50 transition-colors">
              <div className="w-12 h-12 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Taxa de Acerto</h3>
              <p className="text-gray-400 text-sm">
                Acompanhe a assertividade das análises e otimize suas estratégias
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] mt-16 relative z-10">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>© 2024 Free-Money.AI - Plataforma de Análise de Trading com IA</p>
          <p className="mt-2">Aviso: Trading envolve riscos. Opere com responsabilidade.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        
        .animate-shooting-star {
          animation: shooting-star 3s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
