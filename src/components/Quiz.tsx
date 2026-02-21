import { useState } from 'react';
import { Trophy, Check, X, RotateCcw, Star } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  trivia: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuántos países anfitriones tendrá el Mundial 2026?",
    options: ["1", "2", "3", "4"],
    correct: 2,
    trivia: "El Mundial 2026 será organizado conjuntamente por Estados Unidos, México y Canadá."
  },
  {
    id: 2,
    question: "¿Cuántos equipos participarán en el Mundial 2026?",
    options: ["32", "40", "48", "64"],
    correct: 2,
    trivia: "Por primera vez en la historia, 48 equipos competirán en el Mundial."
  },
  {
    id: 3,
    question: "¿Qué país ganó el Mundial 2022?",
    options: ["Francia", "Argentina", "Brasil", "Alemania"],
    correct: 1,
    trivia: "Argentina ganó su tercera Copa del Mundo en Qatar 2022, liderada por Lionel Messi."
  },
  {
    id: 4,
    question: "¿En qué año se jugó el primer Mundial de la FIFA?",
    options: ["1928", "1930", "1934", "1938"],
    correct: 1,
    trivia: "El primer Mundial se celebró en Uruguay en 1930 con 13 equipos participantes."
  },
  {
    id: 5,
    question: "¿Qué jugador ha marcado más goles en la historia de los Mundiales?",
    options: ["Pelé", "Ronaldo", "Miroslav Klose", "Cristiano Ronaldo"],
    correct: 2,
    trivia: "Miroslav Klose de Alemania tiene el récord con 16 goles en Copas del Mundo."
  },
  {
    id: 6,
    question: "¿Cuántas ciudades anfitrionas tendrá el Mundial 2026?",
    options: ["12", "14", "16", "18"],
    correct: 2,
    trivia: "El Mundial 2026 se jugará en 16 ciudades: 11 en Estados Unidos, 3 en México y 2 en Canadá."
  },
  {
    id: 7,
    question: "¿Qué país ha ganado más Copas del Mundo?",
    options: ["Alemania", "Argentina", "Brasil", "Italia"],
    correct: 2,
    trivia: "Brasil lidera con 5 títulos mundiales (1958, 1962, 1970, 1994, 2002)."
  },
  {
    id: 8,
    question: "¿En qué estadio se jugó la final del Mundial 2022?",
    options: ["Estadio Lusail", "Estadio Al Bayt", "Estadio 974", "Estadio Education City"],
    correct: 0,
    trivia: "El Estadio Lusail en Qatar fue la sede de la final entre Argentina y Francia."
  }
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "¡Perfecto! Eres un experto del Mundial 🏆";
    if (percentage >= 75) return "¡Excelente! Conoces muy bien el fútbol ⚽";
    if (percentage >= 50) return "¡Bien! Vas por buen camino 👍";
    return "Sigue aprendiendo sobre el Mundial 📚";
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-purple-500 shadow-2xl">
            <div className="text-center">
              <Trophy className="w-24 h-24 text-purple-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl font-black text-white mb-4">¡Quiz Completado!</h2>
              <p className="text-purple-300 text-xl mb-8">{getScoreMessage()}</p>
              
              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl p-8 mb-8">
                <div className="text-6xl font-black text-white mb-2">
                  {score} / {questions.length}
                </div>
                <div className="text-purple-300 text-lg">Respuestas Correctas</div>
                <div className="flex justify-center gap-1 mt-4">
                  {Array.from({ length: questions.length }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Jugar de Nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Quiz Mundial 2026
          </h1>
          <p className="text-purple-300 text-lg">Demuestra tu conocimiento sobre el fútbol</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-300 font-bold">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-purple-300 font-bold">
              Puntos: {score}
            </span>
          </div>
          <div className="w-full bg-purple-950/50 rounded-full h-3 overflow-hidden border border-purple-800">
            <div
              className="bg-gradient-to-r from-purple-600 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-purple-500 shadow-2xl mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-5 rounded-xl font-bold text-left transition-all border-2 flex items-center justify-between ${
                    showCorrect
                      ? 'bg-green-600 border-green-500 text-white'
                      : showIncorrect
                      ? 'bg-red-600 border-red-500 text-white'
                      : selectedAnswer === null
                      ? 'bg-purple-950/50 border-purple-800 text-white hover:bg-purple-900/50 hover:border-purple-600'
                      : 'bg-gray-900 border-gray-800 text-gray-500'
                  }`}
                >
                  <span className="text-lg">{option}</span>
                  {showCorrect && <Check className="w-6 h-6" />}
                  {showIncorrect && <X className="w-6 h-6" />}
                </button>
              );
            })}
          </div>

          {/* Trivia */}
          {showResult && (
            <div className="mt-6 p-4 bg-purple-900/30 border border-purple-700 rounded-lg">
              <p className="text-purple-200 text-sm">
                <span className="font-bold text-purple-400">💡 Sabías que:</span> {question.trivia}
              </p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {showResult && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
            >
              {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
