import { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { matchesData, groupPosiciones } from '../data/matches';

export function MatchResults() {
  const [selectedTab, setSelectedTab] = useState<'matches' | 'standings'>('matches');
  const [selectedGroup, setSelectedGroup] = useState('Grupo A');

  const livePartidos = matchesData.filter(m => m.status === 'live');
  const finishedPartidos = matchesData.filter(m => m.status === 'finished');
  const scheduledPartidos = matchesData.filter(m => m.status === 'scheduled');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full font-bold text-sm uppercase mb-4 border border-purple-500">
            FIFA World Cup 2026™
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Partidos
          </h1>
          <p className="text-xl text-gray-400">
            Sigue toda la accion del torneo
          </p>
        </div>

       

        {selectedTab === 'matches' ? (
          <div className="space-y-12">
            {/* En vivo Partidos */}
            {livePartidos.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <h2 className="text-3xl font-black text-white">En vivo ahora</h2>
                </div>
                <div className="space-y-4">
                  {livePartidos.map(match => (
                    <div key={match.id} className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-6 shadow-lg hover-lift border border-purple-900">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="bg-purple-600 text-white px-3 py-1 rounded-full font-bold uppercase text-xs border border-purple-400">
                            En vivo
                          </span>
                          <span className="text-gray-400 font-semibold">{match.stage}</span>
                        </div>
                        <div className="text-purple-400 font-bold">{match.minute}'</div>
                      </div>
                      
                      <div className="grid grid-cols-[1fr,auto,1fr] gap-6 items-center mb-4">
                        {/* Inicio Equipo */}
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-xl font-bold text-white">{match.homeEquipo.name}</span>
                          <span className="text-5xl">{match.homeEquipo.flag}</span>
                        </div>
                        
                        {/* Score */}
                        <div className="text-center">
                          <div className="text-5xl font-black text-white">
                            {match.homeEquipo.score} - {match.awayEquipo.score}
                          </div>
                        </div>
                        
                        {/* Away Equipo */}
                        <div className="flex items-center gap-3">
                          <span className="text-5xl">{match.awayEquipo.flag}</span>
                          <span className="text-xl font-bold text-white">{match.awayEquipo.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6 text-sm text-gray-400 pt-4 border-t border-purple-900">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{match.stadium}, {match.city}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Finished Partidos */}
            {finishedPartidos.length > 0 && (
              <div>
                <h2 className="text-3xl font-black text-white mb-6">Resultados recientes</h2>
                <div className="space-y-4">
                  {finishedPartidos.map(match => (
                    <div key={match.id} className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-6 shadow-lg hover-lift border border-purple-900">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="bg-slate-800 text-gray-300 px-3 py-1 rounded-full font-bold uppercase text-xs border border-slate-700">
                            Finalizado
                          </span>
                          <span className="text-gray-400 font-semibold">{match.stage}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(match.date)}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-[1fr,auto,1fr] gap-6 items-center mb-4">
                        {/* Inicio Equipo */}
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-xl font-bold text-white">{match.homeEquipo.name}</span>
                          <span className="text-5xl">{match.homeEquipo.flag}</span>
                        </div>
                        
                        {/* Score */}
                        <div className="text-center">
                          <div className="text-5xl font-black text-white">
                            {match.homeEquipo.score} - {match.awayEquipo.score}
                          </div>
                        </div>
                        
                        {/* Away Equipo */}
                        <div className="flex items-center gap-3">
                          <span className="text-5xl">{match.awayEquipo.flag}</span>
                          <span className="text-xl font-bold text-white">{match.awayEquipo.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6 text-sm text-gray-400 pt-4 border-t border-purple-900">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{match.stadium}, {match.city}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scheduled Partidos */}
            {scheduledPartidos.length > 0 && (
              <div>
                <h2 className="text-3xl font-black text-white mb-6">Proximos partidos</h2>
                <div className="space-y-4">
                  {scheduledPartidos.map(match => (
                    <div key={match.id} className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-6 shadow-lg hover-lift border border-purple-900">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400 font-semibold">{match.stage}</span>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(match.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{match.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-[1fr,auto,1fr] gap-6 items-center mb-4">
                        {/* Inicio Equipo */}
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-xl font-bold text-white">{match.homeEquipo.name}</span>
                          <span className="text-5xl">{match.homeEquipo.flag}</span>
                        </div>
                        
                        {/* VS */}
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">VS</div>
                        </div>
                        
                        {/* Away Equipo */}
                        <div className="flex items-center gap-3">
                          <span className="text-5xl">{match.awayEquipo.flag}</span>
                          <span className="text-xl font-bold text-white">{match.awayEquipo.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6 text-sm text-gray-400 pt-4 border-t border-purple-900">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{match.stadium}, {match.city}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Group Selector */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {Object.keys(groupPosiciones).map(group => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${
                    selectedGroup === group
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg border border-purple-500'
                      : 'bg-slate-900 text-gray-300 hover:bg-slate-800 border border-purple-900'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Posiciones Table */}
            <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl shadow-xl overflow-hidden border border-purple-900">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 border-b border-purple-500">
                <h3 className="text-2xl font-black">{selectedGroup}</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800 border-b border-purple-900">
                    <tr>
                      <th className="text-left p-4 font-bold text-gray-300 text-sm">Pos</th>
                      <th className="text-left p-4 font-bold text-gray-300 text-sm">Equipo</th>
                      <th className="text-center p-4 font-bold text-gray-300 text-sm">P</th>
                      <th className="text-center p-4 font-bold text-gray-300 text-sm">W</th>
                      <th className="text-center p-4 font-bold text-gray-300 text-sm">D</th>
                      <th className="text-center p-4 font-bold text-gray-300 text-sm">L</th>
                      <th className="text-center p-4 font-bold text-gray-300 text-sm">GF</th>
                      <th className="text-center p-4 font-bold text-gray-300 text-sm">GA</th>
                      <th className="text-center p-4 font-bold text-gray-300 text-sm">GD</th>
                      <th className="text-center p-4 font-bold text-gray-300 text-sm">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupPosiciones[selectedGroup as keyof typeof groupPosiciones]?.map((team, index) => (
                      <tr key={team.team} className="border-t border-purple-900 hover:bg-slate-800/50">
                        <td className="p-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index < 2 ? 'bg-purple-600 text-white border border-purple-400' : 'bg-slate-800 text-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{team.flag}</span>
                            <span className="font-bold text-white">{team.team}</span>
                          </div>
                        </td>
                        <td className="text-center p-4 font-semibold text-gray-300">{team.played}</td>
                        <td className="text-center p-4 font-semibold text-gray-300">{team.won}</td>
                        <td className="text-center p-4 font-semibold text-gray-300">{team.drawn}</td>
                        <td className="text-center p-4 font-semibold text-gray-300">{team.lost}</td>
                        <td className="text-center p-4 font-semibold text-gray-300">{team.gf}</td>
                        <td className="text-center p-4 font-semibold text-gray-300">{team.ga}</td>
                        <td className={`text-center p-4 font-semibold ${
                          team.gd > 0 ? 'text-green-400' : team.gd < 0 ? 'text-red-400' : 'text-gray-300'
                        }`}>
                          {team.gd > 0 ? '+' : ''}{team.gd}
                        </td>
                        <td className="text-center p-4 font-black text-purple-400 text-lg">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-900 p-4 text-sm text-gray-400 border-t border-purple-900">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded border border-purple-400"></div>
                  <span>Clasificado a dieciseisavos</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
