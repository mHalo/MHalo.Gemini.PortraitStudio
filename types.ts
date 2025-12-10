export interface StyleDefinition {
  id: string;
  nameEn: string;
  nameCn: string;
  promptEn: string;
  promptCn: string; // Used for display or logic
  icon: string;
}

export interface GeneratedImage {
  id: string;
  styleId: string;
  imageUrl: string | null;
  loading: boolean;
  error?: string;
}

export type Language = 'en' | 'cn';

export interface Translation {
  title: string;
  subtitle: string;
  uploadButton: string;
  uploadHint: string;
  processing: string;
  regenerate: string;
  download: string;
  errorGeneric: string;
  selectPhoto: string;
  styles: {
    professional: string;
    cyberpunk: string;
    vintage: string;
    bw: string;
    nature: string;
    oil: string;
  }
}