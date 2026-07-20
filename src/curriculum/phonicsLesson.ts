import type { AudioAssetRef, ImageAssetRef } from '../types/asset';

export interface PhonemeSegment {
  id: string;
  grapheme: string;
  soundLabel: string;
  audio?: AudioAssetRef;
  isSilent?: boolean;
  hint?: string;
}

export interface DecodableWord {
  id: string;
  word: string;
  meaningZhTW: string;
  pattern:
    | 'CVC'
    | 'CVCV'
    | 'CVCC'
    | 'CCV'
    | 'CCVC'
    | 'CCVCC'
    | 'CVCe'
    | 'CVCCe'
    | 'CCVCe'
    | 'CVVC'
    | 'CVVCe'
    | 'CVVCC'
    | 'CCVVC'
    | 'CCVV'
    | 'compound'
    | 'two-syllable';
  segments: readonly [PhonemeSegment, PhonemeSegment, ...PhonemeSegment[]];
  image: ImageAssetRef;
  audio: AudioAssetRef;
}

export interface BlendingLesson {
  id: string;
  slug: string;
  unitId: string;
  unitLabel: string;
  order: number;
  title: string;
  subtitle: string;
  vowelGrapheme: string;
  vowelSoundLabel: string;
  practiceMode?: 'phoneme' | 'syllable';
  words: readonly DecodableWord[];
  status: 'ready';
  estimatedMinutes: number;
}
