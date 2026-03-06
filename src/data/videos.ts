export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  category: 'highlights' | 'interviews' | 'training' | 'fans';
  team?: string;
  videoUrl?: string;
}

export const videos: Video[] = [
  {
    id: 1,
    title: 'México - Los recuerdos',
    thumbnail: '/image/2026.png',
    duration: '0:45',
    category: 'highlights',
    videoUrl: '/Videos/Video%20Mexico.mp4',
    // team implied by filename: México
  },
  {
    id: 2,
    title: 'México - Fase de grupos',
    thumbnail: '/image/2026.png',
    duration: '1:10',
    category: 'interviews',
    videoUrl: '/Videos/Video-Mexico-2.mp4',
  },
  {
    id: 3,
    title: 'México - Encuentros',
    thumbnail: '/image/2026.png',
    duration: '0:30',
    category: 'training',
    videoUrl: '/Videos/Video-Mexico-3.mp4',
  }
  ,
  {
    id: 4,
    title: 'Estados Unidos - Gol destacado',
    thumbnail: '/image/2026.png',
    duration: '0:50',
    category: 'highlights',
    team: 'Estados Unidos',
    videoUrl: '/Videos/Videos-USA/Video-USA-1.mp4',
  },
  {
    id: 5,
    title: 'Estados Unidos - Entrevista jugador',
    thumbnail: '/image/2026.png',
    duration: '1:05',
    category: 'interviews',
    team: 'Estados Unidos',
    videoUrl: '/Videos/Videos-USA/Video-USA-2.mp4',
  },
  {
    id: 6,
    title: 'Estados Unidos - Entrenamiento',
    thumbnail: '/image/2026.png',
    duration: '0:40',
    category: 'training',
    team: 'Estados Unidos',
    videoUrl: '/Videos/Videos-USA/Video-USA-3.mp4',
  }
  ,
  {
    id: 7,
    title: 'Canadá - Gol destacado',
    thumbnail: '/image/2026.png',
    duration: '0:55',
    category: 'highlights',
    team: 'Canadá',
    videoUrl: '/Videos/Videos-Canada/Video-Canada-1.mp4',
  },
  {
    id: 8,
    title: 'Canadá - Entrevista jugador',
    thumbnail: '/image/2026.png',
    duration: '1:00',
    category: 'interviews',
    team: 'Canadá',
    videoUrl: '/Videos/Videos-Canada/Video-Canada-2.mp4',
  },
  {
    id: 9,
    title: 'Canadá - Entrenamiento',
    thumbnail: '/image/2026.png',
    duration: '0:35',
    category: 'training',
    team: 'Canadá',
    videoUrl: '/Videos/Videos-Canada/Video-Canada-3.mp4',
  },
  {
    id: 10,
    title: 'Brasil - Gol destacado',
    thumbnail: '/image/2026.png',
    duration: '0:50',
    category: 'highlights',
    team: 'Brasil',
    videoUrl: '/Videos/Videos-Brasil/Video-Brasil-1.mp4',
  },
  {
    id: 11,
    title: 'Brasil - Entrevista jugador',
    thumbnail: '/image/2026.png',
    duration: '1:15',
    category: 'interviews',
    team: 'Brasil',
    videoUrl: '/Videos/Videos-Brasil/Video-Brasil-2.mp4',
  },
  {
    id: 12,
    title: 'Brasil - Entrenamiento',
    thumbnail: '/image/2026.png',
    duration: '0:40',
    category: 'training',
    team: 'Brasil',
    videoUrl: '/Videos/Videos-Brasil/Video-Brasil-3.mp4',
  }
  ,
  {
    id: 13,
    title: 'Alemania - Gol destacado',
    thumbnail: '/image/2026.png',
    duration: '0:48',
    category: 'highlights',
    team: 'Alemania',
    videoUrl: '/Videos/Videos-Alemania/Video-Alemania-1.mp4',
  },
  {
    id: 14,
    title: 'Alemania - Entrevista jugador',
    thumbnail: '/image/2026.png',
    duration: '1:20',
    category: 'interviews',
    team: 'Alemania',
    videoUrl: '/Videos/Videos-Alemania/Video-Alemania-2.mp4',
  },
  {
    id: 15,
    title: 'Alemania - Entrenamiento',
    thumbnail: '/image/2026.png',
    duration: '0:42',
    category: 'training',
    team: 'Alemania',
    videoUrl: '/Videos/Videos-Alemania/Video-Alemania-3.mp4',
  }
  ,
  {
    id: 16,
    title: 'Argentina - Gol destacado',
    thumbnail: '/image/2026.png',
    duration: '0:52',
    category: 'highlights',
    team: 'Argentina',
    videoUrl: '/Videos/Videos-Argentina/Video-Argentina-1.mp4',
  },
  {
    id: 17,
    title: 'Argentina - Entrevista jugador',
    thumbnail: '/image/2026.png',
    duration: '1:12',
    category: 'interviews',
    team: 'Argentina',
    videoUrl: '/Videos/Videos-Argentina/Video-Argentina-2.mp4',
  },
  {
    id: 18,
    title: 'Argentina - Entrenamiento',
    thumbnail: '/image/2026.png',
    duration: '0:39',
    category: 'training',
    team: 'Argentina',
    videoUrl: '/Videos/Videos-Argentina/Video-Argentina-3.mp4',
  }
  ,
  {
    id: 19,
    title: 'España - Gol destacado',
    thumbnail: '/image/2026.png',
    duration: '0:50',
    category: 'highlights',
    team: 'España',
    videoUrl: '/Videos/Videos-Espana/Video-Espana-1.mp4',
  },
  {
    id: 20,
    title: 'España - Entrevista jugador',
    thumbnail: '/image/2026.png',
    duration: '1:05',
    category: 'interviews',
    team: 'España',
    videoUrl: '/Videos/Videos-Espana/Video-Espana-2.mp4',
  },
  {
    id: 21,
    title: 'España - Entrenamiento',
    thumbnail: '/image/2026.png',
    duration: '0:38',
    category: 'training',
    team: 'España',
    videoUrl: '/Videos/Videos-Espana/Video-Espana-3.mp4',
  }
];
