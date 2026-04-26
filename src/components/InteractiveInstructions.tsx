import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

type Step = {
  id: number;
  title: string;
  body: string;
};

export function InteractiveInstructions() {
  const steps: Step[] = [
    { id: 1, title: 'Página Principal', body: 'Explora el resumen del torneo, equipos y accesos directos.' },
    { id: 2, title: 'Partidos', body: 'Consulta el calendario, resultados y detalles por jornada.' },
    { id: 3, title: 'Quiz', body: 'Responde preguntas y acumula puntos. Usa el botón "Iniciar" para empezar.' },
    { id: 4, title: 'Videos', body: 'Toca la miniatura para reproducir el video dentro de la tarjeta. Usa filtros desde "Filtros Visuales".' },
    { id: 5, title: 'Escáner AR', body: 'Activa la cámara y apunta a un escudo para ver la copa en AR.' },
  ];

  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  const step = steps[index];

  const next = () => {
    setCompleted((p) => ({ ...p, [step.id]: true }));
    setIndex((i) => Math.min(steps.length - 1, i + 1));
  };

  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <div className="p-4 sm:p-6">
      <div className="flex gap-4">
        <div className="w-32 hidden sm:block">
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li key={s.id} className={`p-2 rounded-lg cursor-pointer transition ${i === index ? 'bg-purple-800 text-white' : 'bg-purple-900/20 text-purple-200'}`} onClick={() => setIndex(i)}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">{s.title}</div>
                  {completed[s.id] && <Check className="w-4 h-4 text-green-400" />}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex-1 bg-slate-900 border border-purple-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-black text-white">{step.title}</h3>
            <div className="text-sm text-purple-300">Paso {index + 1} / {steps.length}</div>
          </div>

          <p className="text-sm text-gray-300 mb-4">{step.body}</p>

          <div className="flex items-center gap-3">
            <button onClick={prev} disabled={index === 0} className="px-3 py-2 bg-purple-900/20 text-purple-200 rounded-lg disabled:opacity-50">
              <ArrowLeft className="w-4 h-4 inline" /> Anterior
            </button>

            <button onClick={next} disabled={index === steps.length - 1} className="ml-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2">
              Siguiente <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveInstructions;
