import { MapPin } from 'lucide-react';

interface City {
  name: string;
  country: string;
  stadium: string;
  image: string;
  flag: string;
}

const cities: City[] = [
  { name: 'Mexico City', country: 'Mexico', stadium: 'Estadio Azteca', image: 'https://images.unsplash.com/photo-1541636999427-b8eb37a3a251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY28lMjBjaXR5JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDUyNzMxNnww&ixlib=rb-4.1.0&q=80&w=1080', flag: '🇲🇽' },
  { name: 'Guadalajara', country: 'Mexico', stadium: 'Estadio Akron', image: 'https://images.unsplash.com/photo-1541636999427-b8eb37a3a251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY28lMjBjaXR5JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDUyNzMxNnww&ixlib=rb-4.1.0&q=80&w=1080', flag: '🇲🇽' },
  { name: 'Monterrey', country: 'Mexico', stadium: 'Estadio BBVA', image: 'https://images.unsplash.com/photo-1541636999427-b8eb37a3a251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY28lMjBjaXR5JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDUyNzMxNnww&ixlib=rb-4.1.0&q=80&w=1080', flag: '🇲🇽' }
];

export function InfoSection() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Ciudades Anfitrionas México
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            3 ciudades mexicanas recibirán el Mundial de Fútbol 2026
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-2xl p-6 shadow-lg text-center hover-lift border border-purple-700">
            <div className="text-5xl font-black text-purple-400 mb-2">3</div>
            <div className="text-gray-300 font-semibold">Ciudades</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-2xl p-6 shadow-lg text-center hover-lift border border-purple-700">
            <div className="text-5xl font-black text-purple-400 mb-2">3</div>
            <div className="text-gray-300 font-semibold">Estadios</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-2xl p-6 shadow-lg text-center hover-lift border border-purple-700">
            <div className="text-5xl font-black text-purple-400 mb-2">🇲🇽</div>
            <div className="text-gray-300 font-semibold">México</div>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cities.map((city, index) => (
            <div
              key={city.name}
              className="group bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover-lift cursor-pointer border border-purple-900"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-3xl mb-1">{city.flag}</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                <p className="text-sm text-purple-300 mb-3">{city.country}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{city.stadium}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-12 text-white text-center shadow-2xl border-2 border-purple-500">
          <h3 className="text-4xl font-black mb-4">México en el Mundial 2026</h3>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            México será sede del Mundial por tercera vez en su historia, después de 1970 y 1986. El icónico Estadio Azteca será el primer estadio en albergar tres Copas del Mundo.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-300">
              <span className="font-bold">Junio 2026</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-300">
              <span className="font-bold">3 Ciudades</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-300">
              <span className="font-bold">Estadio Azteca</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
