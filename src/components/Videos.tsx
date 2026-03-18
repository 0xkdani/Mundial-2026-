import { useState, useRef, useEffect } from 'react';
import { Play, Filter, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { videos } from '../data/videos';
import { teams } from '../data/teams';

type FilterType = 'none' | 'blur' | 'pixelated' | 'thermal' | 'color-adjust' | 'custom';

export function Videos() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('none');
  
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const canvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const wrapperRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  // Apply pixelated or thermal filters using canvas
  useEffect(() => {
    if (selectedFilter === 'pixelated' || selectedFilter === 'thermal') {
      Object.entries(canvasRefs.current).forEach(([id, canvas]) => {
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.crossOrigin = 'anonymous';
          const video = videos.find(v => v.id === Number(id));
          
          if (video && ctx) {
            img.src = video.thumbnail;
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              setRatios((p) => ({ ...p, [video.id]: img.width / img.height }));
              
              if (selectedFilter === 'pixelated') {
                // Draw small then scale up for pixelated effect
                const pixelSize = 10;
                const w = canvas.width / pixelSize;
                const h = canvas.height / pixelSize;
                
                ctx.drawImage(img, 0, 0, w, h);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
              } else if (selectedFilter === 'thermal') {
                // Draw original image
                ctx.drawImage(img, 0, 0);
                
                // Get image data and apply thermal effect
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                
                for (let i = 0; i < data.length; i += 4) {
                  const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                  
                  // Thermal camera color mapping
                  if (avg < 64) {
                    data[i] = 0;
                    data[i + 1] = 0;
                    data[i + 2] = avg * 4;
                  } else if (avg < 128) {
                    data[i] = (avg - 64) * 4;
                    data[i + 1] = 0;
                    data[i + 2] = 255;
                  } else if (avg < 192) {
                    data[i] = 255;
                    data[i + 1] = (avg - 128) * 4;
                    data[i + 2] = 255 - (avg - 128) * 4;
                  } else {
                    data[i] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = (255 - avg) * 4;
                  }
                }
                
                ctx.putImageData(imageData, 0, 0);
              }
            };
          }
        }
      });
    }
  }, [selectedFilter]);

  // Pause and reset video when exiting fullscreen
  useEffect(() => {
    const onFsChange = () => {
      const isFs = Boolean(document.fullscreenElement);
      if (!isFs && activeVideoId !== null) {
        const vid = videoRefs.current[activeVideoId];
        if (vid) {
          try {
            vid.pause();
            vid.currentTime = 0;
          } catch (e) {}
        }
        setActiveVideoId(null);
      }
    };

    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, [activeVideoId]);

  const getFilterStyle = (filter: FilterType): string => {
    switch (filter) {
      case 'blur':
        return 'blur(4px)';
      case 'color-adjust':
        return 'brightness(1.2) contrast(1.3) saturate(1.5)';
      case 'custom':
        return 'blur(1px) saturate(1.8) contrast(1.1) brightness(1.1) hue-rotate(10deg)';
      default:
        return 'none';
    }
  };

  const filters: { name: string; value: FilterType; description: string }[] = [
    { name: 'Sin Filtro', value: 'none', description: 'Original' },
    { name: 'Desenfoque', value: 'blur', description: 'Efecto borroso' },
    { name: 'Pixelados', value: 'pixelated', description: 'Estilo retro' },
    { name: 'Cámara Térmica', value: 'thermal', description: 'Visión de calor' },
    { name: 'Ajuste de Color', value: 'color-adjust', description: 'Mejora colores' },
    { name: 'Personalizado', value: 'custom', description: 'Suavizado + colores' }
  ];

  const useCanvasFilter = selectedFilter === 'pixelated' || selectedFilter === 'thermal';

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Videos Mundial 2026
          </h1>
          <p className="text-purple-300 text-lg">Revive los mejores momentos del fútbol</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Visual Filters */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
            >
              <Filter className="w-5 h-5" />
              Filtros Visuales
              {selectedFilter !== 'none' && (
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                  {filters.find(f => f.value === selectedFilter)?.name}
                </span>
              )}
            </button>
          </div>

          {/* (Filtros por país eliminados) */}

          {/* Filter Menu */}
          {showFilterMenu && (
            <div className="bg-black/80 backdrop-blur-lg border border-purple-500 rounded-xl p-6 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-xl">Selecciona un Filtro</h3>
                <button
                  onClick={() => setShowFilterMenu(false)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setSelectedFilter(filter.value);
                      setShowFilterMenu(false);
                    }}
                    className={`px-4 py-4 rounded-lg font-bold transition-all text-left ${
                      selectedFilter === filter.value
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-950/50 text-purple-300 hover:bg-purple-900/50 border border-purple-800'
                    }`}
                  >
                    <div className="font-bold mb-1">{filter.name}</div>
                    <div className="text-xs opacity-80">{filter.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Videos por equipo (agrupados) */}
        {(() => {
          // Agrupar por team a partir de los videos existentes
          const groupKey = (v: typeof videos[number]) => {
            if ((v as any).team) return (v as any).team;
            const src = v.videoUrl ?? v.title ?? '';
            if (/mexico/i.test(src) || /méxico/i.test(src)) return 'México';
            // Mapeo especial para USA
            if (/usa/i.test(src) || /estados unidos/i.test(src)) return 'Estados Unidos';
            // Mapeo especial para Canadá
            if (/canada/i.test(src) || /canadá/i.test(src)) return 'Canadá';
            // intentar matchear con cualquier team del listado
            for (const t of teams) {
              const re = new RegExp(t.replace(/[-/\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
              if (re.test(src)) return t;
            }
            return 'General';
          };

          const map = new Map<string, typeof videos[number][]>();
          videos.forEach((v) => {
            const k = groupKey(v);
            if (!map.has(k)) map.set(k, []);
            map.get(k)!.push(v);
          });

          const renderTeamSection = (teamName: string, teamVideos: typeof videos[number][]) => (
            <section key={teamName} className="mb-10">
              <h2 className="text-3xl font-extrabold text-white mb-4">{teamName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamVideos.slice(0, 3).map((video) => (
                  <div
                    key={video.id}
                    className="bg-black/60 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500 shadow-xl hover:shadow-2xl hover:border-purple-400 transition-all group cursor-pointer"
                  >
                    {(() => {
                      const ratio = ratios[video.id];
                      const paddingTop = ratio ? `${(1 / ratio) * 100}%` : undefined;
                      const wrapperClass = `relative overflow-hidden bg-black ${!ratio ? 'aspect-video' : ''}`;

                      return (
                        <div ref={(el) => (wrapperRefs.current[video.id] = el)} className={wrapperClass} style={ratio ? { paddingTop } : undefined}>
                          {video.videoUrl ? (
                            // Renderizamos solo la miniatura/preview; el <video> se monta al pulsar (lazy-load)
                            activeVideoId === video.id ? (
                              <video
                                ref={(el) => (videoRefs.current[video.id] = el)}
                                controls
                                autoPlay
                                preload="none"
                                className="absolute inset-0 w-full h-full object-contain"
                                poster={video.thumbnail}
                                style={{ filter: getFilterStyle(selectedFilter) }}
                                onLoadedMetadata={(e) => {
                                  const el = e.currentTarget as HTMLVideoElement;
                                  if (el.videoWidth && el.videoHeight) {
                                    setRatios((p) => ({ ...p, [video.id]: el.videoWidth / el.videoHeight }));
                                  }
                                }}
                              >
                                <source src={video.videoUrl} type="video/mp4" />
                                Tu navegador no soporta la reproduccion de video.
                              </video>
                            ) : (
                              <ImageWithFallback
                                src={video.thumbnail}
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                                style={{ filter: getFilterStyle(selectedFilter) }}
                                onLoad={({ currentTarget }: any) => {
                                  if (currentTarget && currentTarget.naturalWidth && currentTarget.naturalHeight) {
                                    setRatios((p) => ({ ...p, [video.id]: currentTarget.naturalWidth / currentTarget.naturalHeight }));
                                  }
                                }}
                                onClick={() => {
                                  // Montar el video y reproducir en fullscreen
                                  setActiveVideoId(video.id);
                                  // pequeña espera para que el elemento <video> se monte
                                  setTimeout(() => {
                                    const wrap = wrapperRefs.current[video.id];
                                    const vid = videoRefs.current[video.id];
                                    if (wrap && (wrap as any).requestFullscreen) {
                                      (wrap as any).requestFullscreen().catch(() => {});
                                    }
                                    if (vid) vid.play().catch(() => {});
                                  }, 80);
                                }}
                              />
                            )
                          ) : useCanvasFilter ? (
                            <canvas
                              ref={(el) => {
                                canvasRefs.current[video.id] = el;
                              }}
                              className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <ImageWithFallback
                              src={video.thumbnail}
                              alt={video.title}
                              className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                              style={{ filter: getFilterStyle(selectedFilter) }}
                              onLoad={({ currentTarget }: any) => {
                                if (currentTarget && currentTarget.naturalWidth && currentTarget.naturalHeight) {
                                  setRatios((p) => ({ ...p, [video.id]: currentTarget.naturalWidth / currentTarget.naturalHeight }));
                                }
                              }}
                            />
                          )}

                          {!video.videoUrl && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <Play className="w-8 h-8 text-white ml-1" fill="white" />
                              </div>
                            </div>
                          )}

                          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-sm font-bold">
                            {video.duration}
                          </div>
                        </div>
                      );
                    })()}
                  

                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg line-clamp-2">{video.title}</h3>
                      <div className="mt-2 inline-block px-3 py-1 bg-purple-900/50 rounded-full text-purple-300 text-xs font-bold uppercase">
                        {video.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );

          // Mostrar todas las selecciones del listado `teams` (incluso si no tienen videos)
          return teams.map((teamName) => {
            const teamVideos = map.get(teamName) ?? [];
            return teamVideos.length > 0 ? (
              renderTeamSection(teamName, teamVideos)
            ) : (
              <section key={teamName} className="mb-10">
                <h2 className="text-3xl font-extrabold text-white mb-4">{teamName}</h2>
                <div className="p-8 bg-black/50 rounded-xl border border-purple-800 text-purple-300">No hay videos para esta selección aún.</div>
              </section>
            );
          });
        })()}

        {/* No Results */}
        {videos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-purple-300 text-xl">No se encontraron videos</p>
          </div>
        )}
      </div>
    </div>
  );
}

