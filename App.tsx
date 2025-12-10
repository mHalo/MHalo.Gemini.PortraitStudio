import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PhotoUploader from './components/PhotoUploader';
import ResultCard from './components/ResultCard';
import { generateStyledPortrait } from './services/geminiService';
import { TRANSLATIONS, STYLES } from './constants';
import { Language, GeneratedImage } from './types';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('cn');
  const [sourceImage, setSourceImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<GeneratedImage[]>([]);
  const [isProcessingGlobal, setIsProcessingGlobal] = useState(false);

  const t = TRANSLATIONS[language];

  const handleToggleLanguage = () => {
    setLanguage(prev => prev === 'cn' ? 'en' : 'cn');
  };

  const processImageGeneration = async (
    styleId: string, 
    base64: string, 
    mimeType: string,
    prompt: string
  ) => {
    try {
      const generatedBase64 = await generateStyledPortrait(base64, mimeType, prompt);
      
      setResults(prev => prev.map(item => {
        if (item.styleId === styleId) {
          return {
            ...item,
            loading: false,
            imageUrl: generatedBase64,
            error: generatedBase64 ? undefined : t.errorGeneric
          };
        }
        return item;
      }));
    } catch (e) {
      setResults(prev => prev.map(item => {
        if (item.styleId === styleId) {
          return { ...item, loading: false, error: t.errorGeneric };
        }
        return item;
      }));
    }
  };

  const handleFileSelect = useCallback(async (file: File) => {
    // Reset previous state
    setResults([]);
    setIsProcessingGlobal(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSourceImage({
        base64: result,
        mimeType: file.type
      });
      setPreviewUrl(result);

      // Initialize results with loading state
      const initialResults: GeneratedImage[] = STYLES.map(style => ({
        id: crypto.randomUUID(),
        styleId: style.id,
        imageUrl: null,
        loading: true
      }));
      setResults(initialResults);

      // Trigger generations
      // We process them in parallel. Rate limits might apply, but for a demo app
      // firing 6 requests usually works with Gemini if quota allows. 
      // If strict quota, we might need a queue.
      STYLES.forEach(style => {
        // Choose prompt language based on current setting or default to English for better model understanding?
        // Usually models understand English prompts better for specific styles, 
        // but the user provided a specific Chinese prompt. 
        // We will use the 'promptCn' as the user specifically requested the first one in Chinese.
        // For consistency, we send the prompt defined in constants.
        // The Service will handle the call.
        
        // Note: The prompt definitions in constants.ts have explicit text.
        // We'll use the prompt matching the current logic or just always use the Chinese one since the user provided it?
        // Let's use the English prompt if language is EN, Chinese if CN, OR stick to one that works best.
        // The user explicitly gave a Chinese prompt. Let's stick to Chinese prompts for now as requested by user context,
        // or prioritize the prompt field that has the data.
        const promptToUse = language === 'cn' ? style.promptCn : style.promptEn;
        
        processImageGeneration(style.id, result, file.type, promptToUse).finally(() => {
           // Check if all are done to stop global processing spinner if needed
           // (ResultCard handles individual loading states)
        });
      });
      
      setIsProcessingGlobal(false);
    };
    reader.readAsDataURL(file);
  }, [language, t.errorGeneric]);

  const handleRetry = (styleId: string) => {
    if (!sourceImage) return;
    
    // Set specific card to loading
    setResults(prev => prev.map(item => 
      item.styleId === styleId ? { ...item, loading: true, error: undefined } : item
    ));

    const style = STYLES.find(s => s.id === styleId);
    if (style) {
      const promptToUse = language === 'cn' ? style.promptCn : style.promptEn;
      processImageGeneration(styleId, sourceImage.base64, sourceImage.mimeType, promptToUse);
    }
  };

  const downloadImage = (base64Data: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header 
        language={language} 
        onToggleLanguage={handleToggleLanguage} 
        title={t.title}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Hero Section */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            {t.subtitle}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 bg-white/50 inline-flex px-4 py-2 rounded-full border border-slate-200">
             <Sparkles className="w-4 h-4 text-amber-500" />
             <span>Powered by Gemini Nano Banana</span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-xl mx-auto mb-16">
          <PhotoUploader 
            onFileSelect={handleFileSelect}
            textSelect={t.selectPhoto}
            textHint={t.uploadHint}
            isProcessing={isProcessingGlobal}
          />
        </div>

        {/* Results Grid */}
        {results.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6 px-1">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-slate-100">
                {previewUrl && (
                  <img src={previewUrl} alt="Original" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">Original Source</span>
                <span className="text-xs text-slate-500">Used as reference for identity</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => {
                const style = STYLES.find(s => s.id === result.styleId);
                if (!style) return null;

                return (
                  <ResultCard
                    key={result.id}
                    result={result}
                    style={style}
                    onDownload={downloadImage}
                    onRetry={handleRetry}
                    textDownload={t.download}
                    textRegenerate={t.regenerate}
                  />
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
