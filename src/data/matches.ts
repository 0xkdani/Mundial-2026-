export interface Match {
  id: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  stage: string;
  homeTeam: {
    name: string;
    code: string;
    flag: string;
    score?: number;
  };
  awayTeam: {
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
    stage: 'Group A',
    homeTeam: {
      name: 'Mexico',
      code: 'MEX',
      flag: '🇲🇽',
      score: 2
    },
    awayTeam: {
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
    stadium: 'MetLife Stadium',
    city: 'New York/New Jersey',
    stage: 'Group A',
    homeTeam: {
      name: 'USA',
      code: 'USA',
      flag: '🇺🇸',
      score: 3
    },
    awayTeam: {
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
    stadium: 'SoFi Stadium',
    city: 'Los Angeles',
    stage: 'Group B',
    homeTeam: {
      name: 'Argentina',
      code: 'ARG',
      flag: '🇦🇷',
      score: 1
    },
    awayTeam: {
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
    stage: 'Group B',
    homeTeam: {
      name: 'Canada',
      code: 'CAN',
      flag: '🇨🇦'
    },
    awayTeam: {
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
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    stage: 'Group C',
    homeTeam: {
      name: 'Brazil',
      code: 'BRA',
      flag: '🇧🇷',
      score: 4
    },
    awayTeam: {
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
    stage: 'Group C',
    homeTeam: {
      name: 'Spain',
      code: 'ESP',
      flag: '🇪🇸',
      score: 2
    },
    awayTeam: {
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
    stadium: 'Hard Rock Stadium',
    city: 'Miami',
    stage: 'Group D',
    homeTeam: {
      name: 'France',
      code: 'FRA',
      flag: '🇫🇷'
    },
    awayTeam: {
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
    stadium: 'NRG Stadium',
    city: 'Houston',
    stage: 'Group D',
    homeTeam: {
      name: 'Netherlands',
      code: 'NED',
      flag: '🇳🇱'
    },
    awayTeam: {
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
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    stage: 'Group E',
    homeTeam: {
      name: 'Portugal',
      code: 'POR',
      flag: '🇵🇹',
      score: 3
    },
    awayTeam: {
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
    stage: 'Group E',
    homeTeam: {
      name: 'Italy',
      code: 'ITA',
      flag: '🇮🇹'
    },
    awayTeam: {
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
    stadium: 'Gillette Stadium',
    city: 'Boston',
    stage: 'Group F',
    homeTeam: {
      name: 'Colombia',
      code: 'COL',
      flag: '🇨🇴'
    },
    awayTeam: {
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
    stadium: 'Arrowhead Stadium',
    city: 'Kansas City',
    stage: 'Group F',
    homeTeam: {
      name: 'South Korea',
      code: 'KOR',
      flag: '🇰🇷'
    },
    awayTeam: {
      name: 'Switzerland',
      code: 'SUI',
      flag: '🇨🇭'
    },
    status: 'scheduled'
  }
];

export const groupStandings = {
  'Group A': [
    { team: 'USA', flag: '🇺🇸', played: 1, won: 1, drawn: 0, lost: 0, gf: 3, ga: 0, gd: 3, points: 3 },
    { team: 'Mexico', flag: '🇲🇽', played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, gd: 1, points: 3 },
    { team: 'Poland', flag: '🇵🇱', played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, gd: -1, points: 0 },
    { team: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 3, gd: -3, points: 0 }
  ],
  'Group B': [
    { team: 'Argentina', flag: '🇦🇷', played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, gd: 0, points: 1 },
    { team: 'Australia', flag: '🇦🇺', played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, gd: 0, points: 1 },
    { team: 'Canada', flag: '🇨🇦', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { team: 'Morocco', flag: '🇲🇦', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 }
  ],
  'Group C': [
    { team: 'Brazil', flag: '🇧🇷', played: 1, won: 1, drawn: 0, lost: 0, gf: 4, ga: 2, gd: 2, points: 3 },
    { team: 'Spain', flag: '🇪🇸', played: 1, won: 0, drawn: 1, lost: 0, gf: 2, ga: 2, gd: 0, points: 1 },
    { team: 'Germany', flag: '🇩🇪', played: 1, won: 0, drawn: 1, lost: 0, gf: 2, ga: 2, gd: 0, points: 1 },
    { team: 'Japan', flag: '🇯🇵', played: 1, won: 0, drawn: 0, lost: 1, gf: 2, ga: 4, gd: -2, points: 0 }
  ]
};
