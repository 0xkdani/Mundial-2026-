export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  category: 'highlights' | 'interviews' | 'training' | 'fans';
  videoUrl?: string;
}

export const videos: Video[] = [
  {
    id: 1,
    title: 'Video Mexico',
    thumbnail: 'https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    duration: 'Local',
    category: 'highlights',
    videoUrl: '/Videos/Video%20Mexico.mp4',
  }
];
