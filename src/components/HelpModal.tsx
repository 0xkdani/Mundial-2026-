import { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import InteractiveInstructions from './InteractiveInstructions';

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

            {/* Content: interactive instructions component */}
            <InteractiveInstructions />

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
