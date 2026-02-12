import { ArrowLeft, Trophy, Star, MapPin, Users, Info, X, Calendar, Award, TrendingUp } from 'lucide-react';
import { countriesData } from '../data/countries';
import { useState } from 'react';

interface CountryInfoProps {
  countryCode: string;
  onBack: () => void;
}

export function CountryInfo({ countryCode, onBack }: CountryInfoProps) {
  const country = countriesData[countryCode];
  const [showDetailedInfo, setShowDetailedInfo] = useState(false);

  if (!country) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-slate-900 via-black to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Country Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-12 mb-8 text-center shadow-2xl relative overflow-hidden border-2 border-purple-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300"></div>
          
          <div className="text-8xl mb-6">{country.flag}</div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">{country.name}</h1>
          <p className="text-2xl text-purple-100 mb-8 font-semibold">{country.confederation}</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-300">
              <span className="text-purple-100 font-semibold">FIFA Ranking: </span>
              <span className="text-white font-bold">#{country.fifaRanking}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-300">
              <span className="text-purple-100 font-semibold">World Cups: </span>
              <span className="text-white font-bold">{country.worldCupParticipations}</span>
            </div>
            {country.worldCupTitles > 0 && (
              <div className="bg-yellow-400 rounded-full px-6 py-3 shadow-lg border-2 border-yellow-300">
                <Trophy className="inline w-5 h-5 mr-2" />
                <span className="text-slate-900 font-black">
                  {country.worldCupTitles} {country.worldCupTitles === 1 ? 'Title' : 'Titles'}
                </span>
              </div>
            )}
          </div>

          {/* Detailed Info Button */}
          <button
            onClick={() => setShowDetailedInfo(true)}
            className="bg-white hover:bg-purple-50 text-purple-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            <Info className="w-5 h-5" />
            Ver Información Completa
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-6 shadow-lg hover-lift border border-purple-900">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center border border-purple-400">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Coach</h3>
            </div>
            <p className="text-2xl text-gray-300 font-semibold">{country.coach}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-6 shadow-lg hover-lift border border-purple-900">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center border border-purple-400">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Capital</h3>
            </div>
            <p className="text-2xl text-gray-300 font-semibold">{country.capital}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-6 shadow-lg hover-lift border border-purple-900">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center border border-purple-400">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Best Result</h3>
            </div>
            <p className="text-lg text-gray-300 font-semibold">{country.bestResult}</p>
          </div>
        </div>

        {/* Top Players */}
        <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl p-10 shadow-xl border border-purple-900">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Top Players</h2>
            <div className="h-1 w-20 bg-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {country.topPlayers.map((player, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-6 hover-lift relative overflow-hidden border border-purple-900"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                
                <div className="flex items-start justify-between mb-4 mt-2">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-purple-400">
                    {player.emoji}
                  </div>
                  {index === 0 && (
                    <div className="bg-yellow-400 rounded-full p-2 shadow-lg border-2 border-yellow-300">
                      <Star className="w-4 h-4 text-slate-900 fill-current" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-1">{player.name}</h3>
                <p className="text-lg text-purple-400 mb-1 font-bold">{player.position}</p>
                <p className="text-gray-400 mb-4 font-semibold">{player.club}</p>
                
                <div className="space-y-2 bg-slate-900 rounded-xl p-4 shadow-sm border border-purple-900">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-semibold">Age</span>
                    <span className="text-white font-bold">{player.age} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-semibold">Caps</span>
                    <span className="text-white font-bold">{player.caps}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-semibold">Goals</span>
                    <span className="text-white font-bold">{player.goals}</span>
                  </div>
                </div>

                {player.achievements && (
                  <div className="mt-4 pt-4 border-t border-purple-900">
                    <p className="text-xs text-purple-400 mb-2 font-bold uppercase">Achievements:</p>
                    <p className="text-sm text-gray-300">{player.achievements}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        {country.funFacts && country.funFacts.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-slate-900 to-black rounded-3xl p-8 border-2 border-purple-900">
            <h3 className="text-3xl font-black text-white mb-6">Did You Know?</h3>
            <ul className="space-y-4">
              {country.funFacts.map((fact, index) => (
                <li key={index} className="flex gap-4 items-start bg-slate-800 p-4 rounded-xl shadow-sm border border-purple-900">
                  <span className="text-2xl">⚽</span>
                  <span className="text-gray-300 font-semibold pt-1">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Info Modal */}
        {showDetailedInfo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500 shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 p-6 border-b border-purple-500 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{country.flag}</div>
                  <div>
                    <h2 className="text-3xl font-black text-white">{country.name}</h2>
                    <p className="text-purple-200">Información Detallada</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailedInfo(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                {/* General Information */}
                <div>
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-purple-500" />
                    Información General
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-purple-900">
                      <p className="text-purple-400 text-sm font-bold mb-1">País</p>
                      <p className="text-white text-lg font-semibold">{country.name}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-purple-900">
                      <p className="text-purple-400 text-sm font-bold mb-1">Capital</p>
                      <p className="text-white text-lg font-semibold">{country.capital}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-purple-900">
                      <p className="text-purple-400 text-sm font-bold mb-1">Confederación</p>
                      <p className="text-white text-lg font-semibold">{country.confederation}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-purple-900">
                      <p className="text-purple-400 text-sm font-bold mb-1">Entrenador</p>
                      <p className="text-white text-lg font-semibold">{country.coach}</p>
                    </div>
                  </div>
                </div>

                {/* FIFA Statistics */}
                <div>
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                    Estadísticas FIFA
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-700 text-center">
                      <div className="text-4xl font-black text-white mb-2">#{country.fifaRanking}</div>
                      <p className="text-purple-300 font-semibold">Ranking FIFA</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-700 text-center">
                      <div className="text-4xl font-black text-white mb-2">{country.worldCupParticipations}</div>
                      <p className="text-purple-300 font-semibold">Mundiales Jugados</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-700 text-center">
                      <div className="text-4xl font-black text-white mb-2">{country.worldCupTitles}</div>
                      <p className="text-purple-300 font-semibold">Títulos</p>
                    </div>
                  </div>
                </div>

                {/* World Cup History */}
                <div>
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-purple-500" />
                    Historia en Mundiales
                  </h3>
                  <div className="bg-slate-800 rounded-xl p-6 border border-purple-900">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-6 h-6 text-yellow-400" />
                      <p className="text-white font-bold text-lg">Mejor Resultado</p>
                    </div>
                    <p className="text-purple-300 text-xl font-semibold mb-4">{country.bestResult}</p>
                    
                    <div className="bg-slate-900 rounded-lg p-4 mt-4">
                      <p className="text-purple-400 text-sm font-bold mb-2">Logros Destacados:</p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span>Participaciones en Copas del Mundo: {country.worldCupParticipations}</span>
                        </li>
                        {country.worldCupTitles > 0 && (
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">🏆</span>
                            <span className="font-bold text-yellow-400">
                              Campeón del Mundo {country.worldCupTitles} {country.worldCupTitles === 1 ? 'vez' : 'veces'}
                            </span>
                          </li>
                        )}
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span>Mejor resultado histórico: {country.bestResult}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Players Summary */}
                <div>
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6 text-purple-500" />
                    Jugadores Destacados
                  </h3>
                  <div className="space-y-3">
                    {country.topPlayers.map((player, index) => (
                      <div key={index} className="bg-slate-800 rounded-xl p-5 border border-purple-900 flex items-center gap-4">
                        <div className="text-4xl">{player.emoji}</div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-lg">{player.name}</h4>
                          <p className="text-purple-400 text-sm">{player.position} - {player.club}</p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-400">
                            <span>Edad: {player.age}</span>
                            <span>Partidos: {player.caps}</span>
                            <span>Goles: {player.goals}</span>
                          </div>
                        </div>
                        {index === 0 && (
                          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowDetailedInfo(false)}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}