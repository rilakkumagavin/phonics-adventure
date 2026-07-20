import type { AudioAssetRef, ImageAssetRef } from '../types/asset';

export interface DecodableSentenceToken {
  id: string;
  text: string;
  audio: AudioAssetRef;
}

export interface DecodableSentenceLesson {
  id: string;
  slug: string;
  unitId: 'grade-2-decodable-sentences' | 'grade-3-reading-fluency';
  unitLabel: string;
  order: number;
  title: string;
  subtitle: string;
  sentence: string;
  meaningZhTW: string;
  practiceWordId: string;
  tokens: readonly DecodableSentenceToken[];
  image: ImageAssetRef;
  audio: AudioAssetRef;
  status: 'ready';
  estimatedMinutes: number;
}
