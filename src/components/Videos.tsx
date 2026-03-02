import { useState, useRef, useEffect } from 'react';
import { Play, Filter, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { videos } from '../data/videos';

type FilterType = 'none' | 'blur' | 'pixelated' | 'thermal' | 'color-adjust' | 'custom';

export function Videos() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('none');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const canvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});

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

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-black/60 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500 shadow-xl hover:shadow-2xl hover:border-purple-400 transition-all group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                {video.videoUrl ? (
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    poster={video.thumbnail}
                    style={{ filter: getFilterStyle(selectedFilter) }}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    Tu navegador no soporta la reproduccion de video.
                  </video>
                ) : useCanvasFilter ? (
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[video.id] = el;
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: getFilterStyle(selectedFilter) }}
                  />
                )}
                
                {!video.videoUrl && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-sm font-bold">
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-bold text-lg line-clamp-2">
                  {video.title}
                </h3>
                <div className="mt-2 inline-block px-3 py-1 bg-purple-900/50 rounded-full text-purple-300 text-xs font-bold uppercase">
                  {video.category}
                </div>
              </div>
            </div>
          ))}
        </div>

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
