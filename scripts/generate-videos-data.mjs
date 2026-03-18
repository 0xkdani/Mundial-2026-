import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const videosDir = path.join(projectRoot, 'public', 'Videos');
const outputFile = path.join(projectRoot, 'src', 'data', 'videos.ts');
const validExtensions = new Set(['.mp4', '.webm', '.ogg', '.mov', '.m4v']);
const defaultThumbnail = '/image/2026.png';

const toTitle = (filename) => {
  const basename = path.parse(filename).name;
  let normalized = basename.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Reemplazar nombres de países con sus nombres completos
  normalized = normalized.replace(/\bUSA\b/gi, 'Estados Unidos');
  normalized = normalized.replace(/\bMexico\b/gi, 'México');
  normalized = normalized.replace(/\bCanada\b/gi, 'Canadá');
  
  return normalized.length ? normalized : 'Video';
};

const escapeSingleQuotes = (text) => text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

// Función recursiva para buscar videos en todas las subcarpetas
const findAllVideos = (dir, baseDir = dir) => {
  if (!fs.existsSync(dir)) return [];
  
  let videos = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Buscar recursivamente en subdirectorios
      videos = videos.concat(findAllVideos(fullPath, baseDir));
    } else if (entry.isFile() && validExtensions.has(path.extname(entry.name).toLowerCase())) {
      // Guardar la ruta relativa desde videosDir
      const relativePath = path.relative(baseDir, fullPath);
      videos.push(relativePath);
    }
  }
  
  return videos;
};

const videoFiles = findAllVideos(videosDir).sort((a, b) => 
  a.localeCompare(b, 'es', { sensitivity: 'base' })
);

const videoItems = videoFiles.map((relativePath, index) => {
  const filename = path.basename(relativePath);
  const title = escapeSingleQuotes(toTitle(filename));
  // Usar la ruta relativa completa (incluyendo subcarpetas) y convertir backslashes a forward slashes
  const videoUrl = `/Videos/${relativePath.replace(/\\/g, '/')}`;

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
