import { MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onStartAR: () => void;
}

export function Hero({ onStartAR }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1705593813682-033ee2991df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBzdGFkaXVtJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzA0NjcyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Estadio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/50 to-black"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 py-20">
        {/* Logo FIFA Style */}
        <div className="mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 backdrop-blur-sm px-8 py-4 rounded-lg shadow-2xl border-2 border-purple-400">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              FIFA WORLD CUP™
            </h1>
          </div>
        </div>
        
        <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400 mb-6 tracking-tight drop-shadow-2xl">
          2026
        </div>
        
        {/* Host Countries */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-purple-400">
            <span className="text-white font-bold text-lg">🇲🇽 Mexico</span>
          </div>
        </div>

        {/* Key Info */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          <div className="flex items-center gap-2 text-white bg-purple-900/40 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500">
            <Calendar className="w-5 h-5" />
            <span className="font-semibold">Jun - Jul 2026</span>
          </div>
          <div className="flex items-center gap-2 text-white bg-purple-900/40 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">16 ciudades sede</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartAR}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl border-2 border-purple-400"
        >
          <span className="text-2xl">📱</span>
          Explorar con AR
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-400 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}

