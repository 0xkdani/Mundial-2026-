import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const videosDir = path.join(projectRoot, 'public', 'Videos');
const outputFile = path.join(projectRoot, 'src', 'data', 'videos.ts');
const validExtensions = new Set(['.mp4', '.webm', '.ogg', '.mov', '.m4v']);
const defaultThumbnail =
  'https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const toTitle = (filename) => {
  const basename = path.parse(filename).name;
  const normalized = basename.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return normalized.length ? normalized : 'Video';
};

const escapeSingleQuotes = (text) => text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const videoFiles = fs.existsSync(videosDir)
  ? fs
      .readdirSync(videosDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && validExtensions.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
  : [];

const videoItems = videoFiles.map((filename, index) => {
  const title = escapeSingleQuotes(toTitle(filename));
  const videoUrl = `/Videos/${encodeURIComponent(filename)}`;

  return `  {\n    id: ${index + 1},\n    title: '${title}',\n    thumbnail: '${defaultThumbnail}',\n    duration: 'Local',\n    category: 'highlights',\n    videoUrl: '${videoUrl}',\n  }`;
});

const fileContent = `export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  category: 'highlights' | 'interviews' | 'training' | 'fans';
  videoUrl?: string;
}

export const videos: Video[] = [
${videoItems.join(',\n')}
];
`;

fs.writeFileSync(outputFile, fileContent, 'utf8');
console.log(`Generated ${path.relative(projectRoot, outputFile)} with ${videoItems.length} video(s).`);
