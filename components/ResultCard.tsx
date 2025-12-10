import React from 'react';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';
import { GeneratedImage, StyleDefinition } from '../types';

interface ResultCardProps {
  result: GeneratedImage;
  style: StyleDefinition;
  onDownload: (data: string, filename: string) => void;
  onRetry: (styleId: string) => void;
  textDownload: string;
  textRegenerate: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  result, 
  style, 
  onDownload, 
  onRetry,
  textDownload,
  textRegenerate
}) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (result.imageUrl) {
      onDownload(result.imageUrl, `portrait-${style.id}.png`);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
      {/* Image Aspect Ratio Container 3:4 */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        {result.loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
            <span className="text-xs font-medium animate-pulse">AI Processing...</span>
          </div>
        ) : result.error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-xs text-slate-500 mb-3">{result.error}</p>
            <button 
              onClick={() => onRetry(style.id)}
              className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              {textRegenerate}
            </button>
          </div>
        ) : result.imageUrl ? (
          <>
            <img 
              src={`data:image/png;base64,${result.imageUrl}`} 
              alt={style.nameEn}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100">
              <button 
                onClick={handleDownload}
                className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium text-sm shadow-lg flex items-center gap-2 hover:bg-blue-50 transition-transform transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                {textDownload}
              </button>
            </div>
          </>
        ) : null}
      </div>

      {/* Info Footer */}
      <div className="p-3 border-t border-slate-100">
        <h4 className="font-semibold text-slate-800 text-sm truncate flex items-center gap-2">
           {/* Simple Icon Mapping or just text */}
           <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase tracking-wider">
            {style.id}
           </span>
           <span className="flex-1 truncate">
             {style.nameCn} / {style.nameEn}
           </span>
        </h4>
      </div>
    </div>
  );
};

export default ResultCard;
