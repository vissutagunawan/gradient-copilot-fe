import { MaterialRecommendation } from '@/types';
import { ExternalLink, BookOpen } from 'lucide-react';

interface MaterialRecommendationsProps {
  materials: MaterialRecommendation[];
}

export default function MaterialRecommendations({ materials }: MaterialRecommendationsProps) {
  if (!materials.length) return null;

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-blue-800">Rekomendasi Materi Pembelajaran</h3>
      </div>
      
      <div className="space-y-3">
        {materials.map((material, index) => (
          <div 
            key={index} 
            className="bg-white rounded-md p-3 border border-blue-100 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  {material.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {material.description}
                </p>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {material.source}
                </span>
              </div>
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors p-1"
                title="Buka materi"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}