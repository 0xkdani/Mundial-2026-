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
