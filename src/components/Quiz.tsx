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
    question: '¿En qué ciudades se jugarán más partidos del Mundial 2026 dentro de Estados Unidos?',
    options: ['Nueva York/Nueva Jersey, Dallas y Los Ángeles', 'Miami, Seattle y Houston', 'Boston, Atlanta y Filadelfia', 'San Francisco, Kansas City y Orlando'],
    correct: 0,
    trivia: 'Nueva York/Nueva Jersey, Dallas y Los Ángeles están entre las sedes con mayor carga de partidos en Estados Unidos.'
  },
  {
    id: 2,
    question: '¿Cuántas veces ha sido sede de un Mundial México antes de 2026?',
    options: ['0', '1', '2', '3'],
    correct: 2,
    trivia: 'México organizó los Mundiales de 1970 y 1986 antes de 2026.'
  },
  {
    id: 3,
    question: '¿Qué ciudades canadienses serán sede del Mundial 2026?',
    options: ['Toronto y Montreal', 'Vancouver y Calgary', 'Toronto y Vancouver', 'Ottawa y Toronto'],
    correct: 2,
    trivia: 'Las dos sedes de Canadá para 2026 son Toronto y Vancouver.'
  },
  {
    id: 4,
    question: '¿Cuál fue la mejor participación de Costa Rica en un Mundial?',
    options: ['Octavos de final en 1990', 'Cuartos de final en 2014', 'Semifinales en 2014', 'Final en 2014'],
    correct: 1,
    trivia: 'Costa Rica llegó a cuartos de final en Brasil 2014, su mejor actuación histórica.'
  },
  {
    id: 5,
    question: '¿En qué año debutó Panamá en un Mundial?',
    options: ['2010', '2014', '2018', '2022'],
    correct: 2,
    trivia: 'Panamá debutó en una Copa del Mundo en Rusia 2018.'
  },
  {
    id: 6,
    question: '¿Cómo se le conoce a la selección de Jamaica?',
    options: ['Los Leones del Caribe', 'The Reggae Boyz', 'Los Guerreros Verdes', 'The Islanders'],
    correct: 1,
    trivia: 'El apodo más conocido de Jamaica es The Reggae Boyz.'
  },
  {
    id: 7,
    question: '¿Cuántas Copas del Mundo ha ganado Brasil?',
    options: ['3', '4', '5', '6'],
    correct: 2,
    trivia: 'Brasil es la selección con más títulos mundiales: cinco.'
  },
  {
    id: 8,
    question: '¿Quién fue la figura clave de Argentina en el Mundial 2022?',
    options: ['Lautaro Martínez', 'Ángel Di María', 'Lionel Messi', 'Julián Álvarez'],
    correct: 2,
    trivia: 'Lionel Messi fue el gran líder de Argentina rumbo al título en Qatar 2022.'
  },
  {
    id: 9,
    question: '¿En qué años ganó Uruguay sus dos Mundiales?',
    options: ['1930 y 1950', '1934 y 1954', '1950 y 1970', '1928 y 1932'],
    correct: 0,
    trivia: 'Uruguay fue campeón del mundo en 1930 y 1950.'
  },
  {
    id: 10,
    question: '¿Qué jugador colombiano fue goleador del Mundial 2014?',
    options: ['Radamel Falcao', 'Carlos Bacca', 'Juan Cuadrado', 'James Rodríguez'],
    correct: 3,
    trivia: 'James Rodríguez terminó como máximo goleador en Brasil 2014 con 6 goles.'
  },
  {
    id: 11,
    question: '¿En qué año jugó Ecuador su primer Mundial?',
    options: ['1998', '2002', '2006', '2010'],
    correct: 1,
    trivia: 'Ecuador debutó en una Copa del Mundo en Corea-Japón 2002.'
  },
  {
    id: 12,
    question: '¿Qué títulos importantes ganó Chile en 2015 y 2016?',
    options: ['Dos Copas Confederaciones', 'Dos Copas América', 'Una Copa América y un Mundial Sub-20', 'Una Copa América y una Finalissima'],
    correct: 1,
    trivia: 'Chile ganó la Copa América 2015 y la Copa América Centenario 2016.'
  },
  {
    id: 13,
    question: '¿En qué años Francia ha ganado la Copa del Mundo?',
    options: ['1998 y 2018', '1994 y 2006', '2002 y 2018', '1986 y 1998'],
    correct: 0,
    trivia: 'Francia fue campeona del mundo en 1998 y 2018.'
  },
  {
    id: 14,
    question: '¿Qué estilo de juego hizo famoso a España en 2010?',
    options: ['Catenaccio', 'Tiki-taka', 'Fútbol total', 'Juego directo'],
    correct: 1,
    trivia: 'La España campeona en 2010 se asoció al estilo tiki-taka.'
  },
  {
    id: 15,
    question: '¿En qué año ganó Inglaterra su único Mundial?',
    options: ['1958', '1962', '1966', '1970'],
    correct: 2,
    trivia: 'Inglaterra levantó su único título mundial en 1966.'
  },
  {
    id: 16,
    question: '¿Cuántos Mundiales ha ganado Alemania?',
    options: ['2', '3', '4', '5'],
    correct: 2,
    trivia: 'Alemania suma cuatro títulos mundiales (1954, 1974, 1990, 2014).'
  },
  {
    id: 17,
    question: '¿Qué color representa tradicionalmente a la selección italiana?',
    options: ['Rojo', 'Verde', 'Blanco', 'Azul'],
    correct: 3,
    trivia: 'Italia es conocida como la Azzurra por su clásico color azul.'
  },
  {
    id: 18,
    question: '¿Qué jugador es el máximo referente histórico de Portugal?',
    options: ['Eusébio', 'Luis Figo', 'Cristiano Ronaldo', 'Deco'],
    correct: 2,
    trivia: 'Cristiano Ronaldo es el gran referente moderno e histórico de Portugal por récords y longevidad.'
  },
  {
    id: 19,
    question: '¿Cómo se le apoda a la selección de Países Bajos?',
    options: ['La Naranja Mecánica', 'Los Tulipanes de Oro', 'La Furia Naranja', 'El Molinillo'],
    correct: 0,
    trivia: 'Países Bajos es recordada por el apodo de la Naranja Mecánica.'
  },
  {
    id: 20,
    question: '¿Cómo se le conoce a la “generación dorada” de Bélgica?',
    options: ['Los Diablos Verdes', 'Los Diablos Rojos', 'Los Leones Rojos', 'Los Titanes Flamencos'],
    correct: 1,
    trivia: 'La selección belga es conocida como los Diablos Rojos, nombre también asociado a su generación dorada.'
  },
  {
    id: 21,
    question: '¿A qué final llegó Croacia en 2018?',
    options: ['A la final de la Eurocopa', 'A la final de la Nations League', 'A la final del Mundial', 'A la final de la Copa Confederaciones'],
    correct: 2,
    trivia: 'Croacia fue subcampeona del Mundial de Rusia 2018.'
  },
  {
    id: 22,
    question: '¿Qué logró Dinamarca en la Eurocopa de 1992?',
    options: ['Fue subcampeona', 'Ganó el torneo', 'Llegó a semifinales', 'No se clasificó'],
    correct: 1,
    trivia: 'Dinamarca sorprendió al mundo ganando la Eurocopa 1992.'
  },
  {
    id: 23,
    question: '¿Por qué es conocida Suiza en términos de neutralidad?',
    options: ['Por su neutralidad política histórica', 'Por no participar en torneos FIFA', 'Por no tener ejército', 'Por organizar todos los Mundiales'],
    correct: 0,
    trivia: 'Suiza es mundialmente conocida por su política de neutralidad histórica.'
  },
  {
    id: 24,
    question: '¿Qué delantero ha sido figura reciente de Polonia?',
    options: ['Arkadiusz Milik', 'Robert Lewandowski', 'Krzysztof Piatek', 'Piotr Zielinski'],
    correct: 1,
    trivia: 'Robert Lewandowski es el referente ofensivo reciente de Polonia.'
  },
  {
    id: 25,
    question: '¿De qué antigua nación formó parte Serbia?',
    options: ['Checoslovaquia', 'Yugoslavia', 'Unión Soviética', 'Imperio Austrohúngaro'],
    correct: 1,
    trivia: 'Serbia formó parte de la antigua Yugoslavia.'
  },
  {
    id: 26,
    question: '¿Qué jugador legendario sueco destacó en los 2000?',
    options: ['Henrik Larsson', 'Freddie Ljungberg', 'Zlatan Ibrahimovic', 'Kim Kallstrom'],
    correct: 2,
    trivia: 'Zlatan Ibrahimovic fue la gran figura sueca durante los 2000 y 2010.'
  },
  {
    id: 27,
    question: '¿En qué continente se encuentra Austria?',
    options: ['Asia', 'Europa', 'América', 'África'],
    correct: 1,
    trivia: 'Austria se encuentra en Europa central.'
  },
  {
    id: 28,
    question: '¿Entre qué dos continentes se ubica Turquía?',
    options: ['Europa y Asia', 'Asia y África', 'Europa y África', 'América y Europa'],
    correct: 0,
    trivia: 'Turquía tiene territorio en Europa y Asia.'
  },
  {
    id: 29,
    question: '¿Qué logro histórico consiguió Marruecos en Qatar 2022?',
    options: ['Llegar a octavos de final', 'Llegar a cuartos de final', 'Llegar a semifinales', 'Ser campeón mundial'],
    correct: 2,
    trivia: 'Marruecos fue la primera selección africana en alcanzar unas semifinales mundialistas.'
  },
  {
    id: 30,
    question: '¿Qué torneo ganó Senegal en 2021?',
    options: ['Mundial Sub-20', 'Copa Africana de Naciones', 'Copa Confederaciones', 'CHAN'],
    correct: 1,
    trivia: 'Senegal ganó la Copa Africana de Naciones (edición disputada en 2022, correspondiente a 2021).'
  },
  {
    id: 31,
    question: '¿Cuál es el apodo de la selección de Nigeria?',
    options: ['Las Águilas Verdes', 'Los Leones Verdes', 'Las Panteras Verdes', 'Los Halcones del Golfo'],
    correct: 0,
    trivia: 'Nigeria es conocida como las Súper Águilas (Águilas Verdes en español).'
  },
  {
    id: 32,
    question: '¿Qué ocurrió con el penal de Ghana contra Uruguay en 2010?',
    options: ['Lo anotó y Ghana clasificó', 'Lo atajó Muslera en tiempo extra', 'Lo erró Asamoah Gyan y luego Ghana cayó en penales', 'Se repitió por invasión y lo marcó en el segundo intento'],
    correct: 2,
    trivia: 'Asamoah Gyan falló el penal al final del alargue y Ghana terminó eliminada en la tanda.'
  },
  {
    id: 33,
    question: '¿Qué famoso río atraviesa Egipto?',
    options: ['Río Congo', 'Río Níger', 'Río Nilo', 'Río Jordán'],
    correct: 2,
    trivia: 'El río Nilo es esencial para la historia y la vida en Egipto.'
  },
  {
    id: 34,
    question: '¿En qué continente se ubica Argelia?',
    options: ['Europa', 'América', 'Asia', 'África'],
    correct: 3,
    trivia: 'Argelia está en el norte de África.'
  },
  {
    id: 35,
    question: '¿Qué jugador famoso fue referente de Costa de Marfil?',
    options: ['Yaya Touré', 'Didier Drogba', 'Salomon Kalou', 'Gervinho'],
    correct: 1,
    trivia: 'Didier Drogba es el símbolo más reconocido del fútbol marfileño.'
  },
  {
    id: 36,
    question: '¿Cómo se le conoce a la selección de Camerún?',
    options: ['Los Leones Azules', 'Los Tigres Indomables', 'Los Leones Indomables', 'Los Halcones Negros'],
    correct: 2,
    trivia: 'Camerún es conocido como los Leones Indomables.'
  },
  {
    id: 37,
    question: '¿En qué región del mundo está Túnez?',
    options: ['Norte de África', 'África austral', 'Oriente Medio', 'Europa mediterránea'],
    correct: 0,
    trivia: 'Túnez se ubica en el norte de África, frente al mar Mediterráneo.'
  },
  {
    id: 38,
    question: '¿Qué tecnología es famosa en Japón a nivel mundial?',
    options: ['Tecnología robótica y electrónica', 'Tecnología petrolera', 'Tecnología aeroespacial militar', 'Tecnología minera'],
    correct: 0,
    trivia: 'Japón es reconocido globalmente por su innovación en robótica y electrónica.'
  },
  {
    id: 39,
    question: '¿Qué logró Corea del Sur en el Mundial 2002?',
    options: ['Ganó el Mundial', 'Llegó a semifinales', 'Llegó a la final', 'Quedó eliminada en grupos'],
    correct: 1,
    trivia: 'Corea del Sur alcanzó las semifinales en 2002, su mejor resultado histórico.'
  },
  {
    id: 40,
    question: '¿En qué hemisferio se encuentra Australia?',
    options: ['Hemisferio norte', 'Hemisferio sur', 'Ambos hemisferios', 'No tiene hemisferio definido'],
    correct: 1,
    trivia: 'Australia se ubica principalmente en el hemisferio sur.'
  },
  {
    id: 41,
    question: '¿Cómo se llamaba antiguamente Irán?',
    options: ['Mesopotamia', 'Persia', 'Partia', 'Media'],
    correct: 1,
    trivia: 'Irán fue conocido históricamente como Persia.'
  },
  {
    id: 42,
    question: '¿Qué ciudad sagrada se encuentra en Arabia Saudita?',
    options: ['Dubái', 'Riad', 'La Meca', 'Doha'],
    correct: 2,
    trivia: 'La Meca es una de las ciudades más sagradas del islam y está en Arabia Saudita.'
  },
  {
    id: 43,
    question: '¿Qué evento deportivo importante organizó Qatar en 2022?',
    options: ['Juegos Olímpicos', 'Copa Mundial de la FIFA', 'Copa Asiática', 'Mundial de Clubes'],
    correct: 1,
    trivia: 'Qatar organizó la Copa Mundial de la FIFA 2022.'
  },
  {
    id: 44,
    question: '¿Qué ciudad famosa está en Emiratos Árabes Unidos por sus rascacielos?',
    options: ['Abu Dabi', 'Doha', 'Kuwait City', 'Dubái'],
    correct: 3,
    trivia: 'Dubái es famosa por sus rascacielos, incluido el Burj Khalifa.'
  },
  {
    id: 45,
    question: '¿En qué región geográfica se encuentra Irak?',
    options: ['Balcanes', 'Oriente Medio', 'Asia central', 'Norte de África'],
    correct: 1,
    trivia: 'Irak se encuentra en la región de Oriente Medio.'
  },
  {
    id: 46,
    question: '¿Qué deporte es el más popular en Nueva Zelanda además del fútbol?',
    options: ['Béisbol', 'Críquet', 'Rugby', 'Hockey sobre hielo'],
    correct: 2,
    trivia: 'El rugby es el deporte más emblemático de Nueva Zelanda.'
  },
  {
    id: 47,
    question: '¿Qué comida típica peruana es famosa mundialmente?',
    options: ['Lomo saltado', 'Ceviche', 'Ají de gallina', 'Anticuchos'],
    correct: 1,
    trivia: 'El ceviche es uno de los platos peruanos más reconocidos a nivel mundial.'
  },
  {
    id: 48,
    question: '¿En qué continente se encuentra Ucrania?',
    options: ['Asia', 'Europa', 'África', 'Oceanía'],
    correct: 1,
    trivia: 'Ucrania se encuentra en Europa oriental.'
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
