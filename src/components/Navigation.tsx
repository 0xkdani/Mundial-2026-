import { Trophy, Scan, Calendar, Brain, Video } from 'lucide-react';

interface NavigationProps {
  activeSection: 'home' | 'ar' | 'matches' | 'quiz' | 'videos';
  onNavigate: (section: 'home' | 'ar' | 'matches' | 'quiz' | 'videos') => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <Trophy className="w-8 h-8 text-purple-500" />
            <div>
              <div className="font-black text-xl text-white tracking-tight">FIFA WORLD CUP™</div>
              <div className="text-sm font-bold text-purple-400">2026</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeSection === 'home'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg border border-purple-500'
                  : 'text-gray-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span className="hidden md:inline">Home</span>
            </button>
            
            <button
              onClick={() => onNavigate('matches')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeSection === 'matches'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg border border-purple-500'
                  : 'text-gray-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden md:inline">Matches</span>
            </button>
            
            <button
              onClick={() => onNavigate('quiz')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeSection === 'quiz'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg border border-purple-500'
                  : 'text-gray-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Brain className="w-5 h-5" />
              <span className="hidden md:inline">Quiz</span>
            </button>
            
            <button
              onClick={() => onNavigate('videos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeSection === 'videos'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg border border-purple-500'
                  : 'text-gray-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Video className="w-5 h-5" />
              <span className="hidden md:inline">Videos</span>
            </button>
            
            <button
              onClick={() => onNavigate('ar')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeSection === 'ar'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg border border-purple-500'
                  : 'text-gray-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Scan className="w-5 h-5" />
              <span className="hidden md:inline">AR Scanner</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}