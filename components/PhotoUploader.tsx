import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface PhotoUploaderProps {
  onFileSelect: (file: File) => void;
  textSelect: string;
  textHint: string;
  isProcessing: boolean;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ 
  onFileSelect, 
  textSelect, 
  textHint,
  isProcessing 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    if (isProcessing) return;
    if (file.type.startsWith('image/')) {
      onFileSelect(file);
    } else {
      alert('Please upload an image file (JPG, PNG).');
    }
  };

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
        ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className={`
          mb-4 p-4 rounded-full transition-all duration-300
          ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500'}
        `}>
          {isProcessing ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : (
            <Upload className="w-10 h-10" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          {textSelect}
        </h3>
        <p className="text-sm text-slate-500">
          {textHint}
        </p>
      </div>
    </div>
  );
};

export default PhotoUploader;
