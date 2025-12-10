import React from 'react';
import { Camera, Languages } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage, title }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 truncate">
            {title}
          </h1>
        </div>
        
        <button
          onClick={onToggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors text-sm font-medium text-slate-600 border border-transparent hover:border-slate-200"
        >
          <Languages className="w-4 h-4" />
          <span>{language === 'en' ? 'EN' : '中文'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
