export interface Match {
  id: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  stage: string;
  homeEquipo: {
    name: string;
    code: string;
    flag: string;
    score?: number;
  };
  awayEquipo: {
    name: string;
    code: string;
    flag: string;
    score?: number;
  };
  status: 'scheduled' | 'live' | 'finished';
  minute?: number;
}

export const matchesData: Match[] = [
  {
    id: '1',
    date: '2026-06-11',
    time: '20:00',
    stadium: 'Estadio Azteca',
    city: 'Mexico City',
    stage: 'Grupo A',
    homeEquipo: {
      name: 'Mexico',
      code: 'MEX',
      flag: '🇲🇽',
      score: 2
    },
    awayEquipo: {
      name: 'Poland',
      code: 'POL',
      flag: '🇵🇱',
      score: 1
    },
    status: 'finished'
  },
  {
    id: '2',
    date: '2026-06-11',
    time: '17:00',
    stadium: 'MetLife Estadio',
    city: 'New York/New Jersey',
    stage: 'Grupo A',
    homeEquipo: {
      name: 'USA',
      code: 'USA',
      flag: '🇺🇸',
      score: 3
    },
    awayEquipo: {
      name: 'Wales',
      code: 'WAL',
      flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
      score: 0
    },
    status: 'finished'
  },
  {
    id: '3',
    date: '2026-06-12',
    time: '14:00',
    stadium: 'SoFi Estadio',
    city: 'Los Angeles',
    stage: 'Grupo B',
    homeEquipo: {
      name: 'Argentina',
      code: 'ARG',
      flag: '🇦🇷',
      score: 1
    },
    awayEquipo: {
      name: 'Australia',
      code: 'AUS',
      flag: '🇦🇺',
      score: 1
    },
    status: 'live',
    minute: 67
  },
  {
    id: '4',
    date: '2026-06-12',
    time: '17:00',
    stadium: 'BMO Field',
    city: 'Toronto',
    stage: 'Grupo B',
    homeEquipo: {
      name: 'Canada',
      code: 'CAN',
      flag: '🇨🇦'
    },
    awayEquipo: {
      name: 'Morocco',
      code: 'MAR',
      flag: '🇲🇦'
    },
    status: 'scheduled'
  },
  {
    id: '5',
    date: '2026-06-13',
    time: '20:00',
    stadium: 'AT&T Estadio',
    city: 'Dallas',
    stage: 'Grupo C',
    homeEquipo: {
      name: 'Brazil',
      code: 'BRA',
      flag: '🇧🇷',
      score: 4
    },
    awayEquipo: {
      name: 'Japan',
      code: 'JPN',
      flag: '🇯🇵',
      score: 2
    },
    status: 'finished'
  },
  {
    id: '6',
    date: '2026-06-13',
    time: '17:00',
    stadium: 'Lumen Field',
    city: 'Seattle',
    stage: 'Grupo C',
    homeEquipo: {
      name: 'Spain',
      code: 'ESP',
      flag: '🇪🇸',
      score: 2
    },
    awayEquipo: {
      name: 'Germany',
      code: 'GER',
      flag: '🇩🇪',
      score: 2
    },
    status: 'finished'
  },
  {
    id: '7',
    date: '2026-06-14',
    time: '14:00',
    stadium: 'Hard Rock Estadio',
    city: 'Miami',
    stage: 'Grupo D',
    homeEquipo: {
      name: 'France',
      code: 'FRA',
      flag: '🇫🇷'
    },
    awayEquipo: {
      name: 'England',
      code: 'ENG',
      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
    },
    status: 'scheduled'
  },
  {
    id: '8',
    date: '2026-06-14',
    time: '20:00',
    stadium: 'NRG Estadio',
    city: 'Houston',
    stage: 'Grupo D',
    homeEquipo: {
      name: 'Netherlands',
      code: 'NED',
      flag: '🇳🇱'
    },
    awayEquipo: {
      name: 'Belgium',
      code: 'BEL',
      flag: '🇧🇪'
    },
    status: 'scheduled'
  },
  {
    id: '9',
    date: '2026-06-15',
    time: '17:00',
    stadium: 'Mercedes-Benz Estadio',
    city: 'Atlanta',
    stage: 'Grupo E',
    homeEquipo: {
      name: 'Portugal',
      code: 'POR',
      flag: '🇵🇹',
      score: 3
    },
    awayEquipo: {
      name: 'Uruguay',
      code: 'URU',
      flag: '🇺🇾',
      score: 1
    },
    status: 'finished'
  },
  {
    id: '10',
    date: '2026-06-15',
    time: '14:00',
    stadium: 'BC Place',
    city: 'Vancouver',
    stage: 'Grupo E',
    homeEquipo: {
      name: 'Italy',
      code: 'ITA',
      flag: '🇮🇹'
    },
    awayEquipo: {
      name: 'Croatia',
      code: 'CRO',
      flag: '🇭🇷'
    },
    status: 'scheduled'
  },
  {
    id: '11',
    date: '2026-06-16',
    time: '20:00',
    stadium: 'Gillette Estadio',
    city: 'Boston',
    stage: 'Grupo F',
    homeEquipo: {
      name: 'Colombia',
      code: 'COL',
      flag: '🇨🇴'
    },
    awayEquipo: {
      name: 'Senegal',
      code: 'SEN',
      flag: '🇸🇳'
    },
    status: 'scheduled'
  },
  {
    id: '12',
    date: '2026-06-16',
    time: '17:00',
    stadium: 'Arrowhead Estadio',
    city: 'Kansas City',
    stage: 'Grupo F',
    homeEquipo: {
      name: 'Corea del Sur',
      code: 'KOR',
      flag: '🇰🇷'
    },
    awayEquipo: {
      name: 'Switzerland',
      code: 'SUI',
      flag: '🇨🇭'
    },
    status: 'scheduled'
  }
];

export const groupPosiciones = {
  'Grupo A': [
    { team: 'USA', flag: '🇺🇸', played: 1, won: 1, drawn: 0, lost: 0, gf: 3, ga: 0, gd: 3, points: 3 },
    { team: 'Mexico', flag: '🇲🇽', played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, gd: 1, points: 3 },
    { team: 'Poland', flag: '🇵🇱', played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, gd: -1, points: 0 },
    { team: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 3, gd: -3, points: 0 }
  ],
  'Grupo B': [
    { team: 'Argentina', flag: '🇦🇷', played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, gd: 0, points: 1 },
    { team: 'Australia', flag: '🇦🇺', played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, gd: 0, points: 1 },
    { team: 'Canada', flag: '🇨🇦', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { team: 'Morocco', flag: '🇲🇦', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 }
  ],
  'Grupo C': [
    { team: 'Brazil', flag: '🇧🇷', played: 1, won: 1, drawn: 0, lost: 0, gf: 4, ga: 2, gd: 2, points: 3 },
    { team: 'Spain', flag: '🇪🇸', played: 1, won: 0, drawn: 1, lost: 0, gf: 2, ga: 2, gd: 0, points: 1 },
    { team: 'Germany', flag: '🇩🇪', played: 1, won: 0, drawn: 1, lost: 0, gf: 2, ga: 2, gd: 0, points: 1 },
    { team: 'Japan', flag: '🇯🇵', played: 1, won: 0, drawn: 0, lost: 1, gf: 2, ga: 4, gd: -2, points: 0 }
  ]
};

