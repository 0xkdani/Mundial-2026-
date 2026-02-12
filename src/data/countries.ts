export interface Player {
  name: string;
  position: string;
  club: string;
  age: number;
  caps: number;
  goals: number;
  emoji: string;
  achievements?: string;
}

export interface Country {
  name: string;
  flag: string;
  confederation: string;
  fifaRanking: number;
  worldCupParticipations: number;
  worldCupTitles: number;
  coach: string;
  capital: string;
  bestResult: string;
  topPlayers: Player[];
  funFacts: string[];
}

export const countriesData: Record<string, Country> = {
  ARG: {
    name: 'Argentina',
    flag: '🇦🇷',
    confederation: 'CONMEBOL',
    fifaRanking: 1,
    worldCupParticipations: 18,
    worldCupTitles: 3,
    coach: 'Lionel Scaloni',
    capital: 'Buenos Aires',
    bestResult: 'Campeón (1978, 1986, 2022)',
    topPlayers: [
      {
        name: 'Lionel Messi',
        position: 'Delantero',
        club: 'Inter Miami',
        age: 38,
        caps: 187,
        goals: 109,
        emoji: '🐐',
        achievements: '8 Balones de Oro, Campeón Mundial 2022'
      },
      {
        name: 'Ángel Di María',
        position: 'Extremo',
        club: 'Benfica',
        age: 38,
        caps: 145,
        goals: 31,
        emoji: '⚡',
        achievements: 'Gol en final del Mundial 2022'
      },
      {
        name: 'Emiliano Martínez',
        position: 'Portero',
        club: 'Aston Villa',
        age: 33,
        caps: 45,
        goals: 0,
        emoji: '🧤',
        achievements: 'Guante de Oro Mundial 2022'
      }
    ],
    funFacts: [
      'Argentina es el actual campeón del mundo (2022)',
      'Lionel Messi es el máximo goleador histórico de la selección',
      'Han ganado 15 Copas América, más que cualquier otro país'
    ]
  }
};