export type AssetStatus = 'placeholder' | 'draft' | 'ready';

export interface ImageAssetRef {
  id: string;
  src: string;
  alt: string;
  status: AssetStatus;
  placeholder?: string;
}

export type AudioAssetKind =
  | 'letter'
  | 'phoneme'
  | 'word'
  | 'sentence'
  | 'instruction';

export interface AudioAssetRef {
  id: string;
  src: string;
  kind: AudioAssetKind;
  transcript: string;
  status: AssetStatus;
  playbackRateOptions?: number[];
}
