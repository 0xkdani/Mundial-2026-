import { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';

export function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de Ayuda */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center sm:gap-2 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-transform border border-purple-500"
        title="Ayuda"
      >
        <HelpCircle className="w-5 h-5 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Ayuda</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-slate-900 border border-purple-700 rounded-xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-purple-900 to-purple-800 px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-700">
              <h2 className="text-lg sm:text-2xl font-black text-white">Instrucciones</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition flex-shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-gray-100">
              <div>
                <h3 className="text-base sm:text-xl font-bold text-purple-400 mb-1 sm:mb-2">🏆 Página Principal</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Explora información sobre el Mundial 2026, equipos participantes y datos generales del torneo.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-xl font-bold text-purple-400 mb-1 sm:mb-2">📅 Partidos</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Visualiza todos los partidos del torneo, resultados y calendario de competencia.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-xl font-bold text-purple-400 mb-1 sm:mb-2">🧠 Quiz</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Responde preguntas sobre el fútbol y el Mundial 2026. Acumula puntos y compite con tu conocimiento.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-xl font-bold text-purple-400 mb-1 sm:mb-2">🎥 Videos</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Mira resúmenes, highlights y contenido relacionado con los equipos del torneo.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-xl font-bold text-purple-400 mb-1 sm:mb-2">📱 Escáner AR</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Activa tu cámara y apunta a los escudos de los equipos. Verás la Copa del Mundo en 3D flotando en realidad aumentada.
                </p>
              </div>

              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-400">
                  💡 <strong>Consejo:</strong> Abre esta ventana en cualquier momento desde el botón de ayuda en la esquina superior derecha.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-purple-700 bg-slate-800/50 px-4 sm:px-6 py-3 sm:py-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
