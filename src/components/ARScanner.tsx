import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Scan, Info, Cpu, Target } from 'lucide-react';

interface ARScannerProps {
  onBack: () => void;
}

export function ARScanner({ onBack }: ARScannerProps) {
  const [arActive, setArActive] = useState(false);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'AR_BACK') setArActive(false);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full font-bold text-sm uppercase mb-4 border border-purple-500 tracking-widest">
            Realidad aumentada
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
            Escaner de escudos
          </h2>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            Apunta la camara al escudo de un equipo y aparecera la Copa del Mundial en 3D sobre el.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl p-8 shadow-xl mb-6 border border-purple-900 text-center">
          {!arActive ? (
            <>
              <div className="text-4xl mb-4 select-none font-black text-purple-300" aria-hidden>AR</div>
              <h3 className="text-2xl font-bold text-white mb-2">Copa 3D sobre tu escudo</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                Usa tu camara para detectar escudos de equipos participantes en el Mundial 2026 y ve la copa animada en realidad aumentada.
              </p>
              <button
                onClick={() => setArActive(true)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg border-2 border-purple-500"
              >
                <Camera className="w-5 h-5" />
                Iniciar escaner AR
              </button>
            </>
          ) : (
            <div className="text-left">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="text-white font-semibold">Escaner AR activo</p>
                <button
                  onClick={() => setArActive(false)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Cerrar escaner
                </button>
              </div>
              <div className="w-full overflow-hidden rounded-2xl border border-purple-800 bg-black" style={{ aspectRatio: '16/9' }}>
                <iframe
                  src="/ar.html?autostart=1"
                  title="Escaner AR"
                  className="h-full w-full border-0"
                  allow="camera *; fullscreen *; accelerometer *; gyroscope *"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-8 shadow-lg border border-purple-900 mb-6">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Info className="w-5 h-5 text-purple-400" />
            Como funciona
          </h3>
          <ol className="space-y-4 text-gray-300">
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-500">1</span>
              <span className="pt-1">Pulsa <strong className="text-white">Iniciar escaner AR</strong> y acepta el permiso de camara.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-500">2</span>
              <span className="pt-1">Apunta la camara a un <strong className="text-white">escudo de equipo</strong> de futbol soccer.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-500">3</span>
              <span className="pt-1">La <strong className="text-white">Copa del Mundial en 3D</strong> aparecera sobre el escudo y girara automaticamente.</span>
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Scan className="w-6 h-6" />, title: 'MindAR', desc: 'Reconocimiento de imagenes en tiempo real' },
            { icon: <Cpu className="w-6 h-6" />, title: 'A-Frame', desc: 'Renderizado 3D en el navegador sin instalar nada' },
            { icon: <Target className="w-6 h-6" />, title: 'GLTF/GLB', desc: 'Modelo copa.glb cargado desde el proyecto' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-slate-900/80 border border-purple-900/50 rounded-xl p-5 flex flex-col items-center text-center gap-2">
              <div className="text-purple-400">{icon}</div>
              <p className="text-white font-bold text-sm">{title}</p>
              <p className="text-gray-400 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
