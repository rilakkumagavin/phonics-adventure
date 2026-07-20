import type { AudioAssetRef, ImageAssetRef } from '../types/asset';
import type { BlendingLesson, DecodableWord, PhonemeSegment } from './phonicsLesson';
import { getGradeTwoLetterSoundAudio } from './gradeTwoPhonemeAudio';

interface SegmentSeed {
  grapheme: string;
  soundLabel: string;
  audioLetter?: string;
  audioSrc?: string;
  isSilent?: boolean;
  hint?: string;
}

interface WordSeed {
  word: string;
  meaningZhTW: string;
  sourceLetter?: string;
  imageAlt: string;
  imageSrc?: string;
  audioSrc?: string;
  pattern?: DecodableWord['pattern'];
  segments: readonly [SegmentSeed, SegmentSeed, ...SegmentSeed[]];
}

interface BlendingLessonSeed {
  id: string;
  slug: string;
  unitId: string;
  unitLabel: string;
  order: number;
  title: string;
  subtitle: string;
  vowelGrapheme: string;
  vowelSoundLabel: string;
  practiceMode?: BlendingLesson['practiceMode'];
  words: readonly WordSeed[];
  estimatedMinutes?: number;
}

function audioAsset(
  id: string,
  src: string,
  transcript: string,
  kind: AudioAssetRef['kind'],
): AudioAssetRef {
  return {
    id,
    src,
    kind,
    transcript,
    status: 'ready',
    playbackRateOptions: [1, 0.75],
  };
}

function imageAsset(id: string, src: string, alt: string): ImageAssetRef {
  return {
    id,
    src,
    alt,
    status: 'ready',
  };
}

function createSegment(
  lessonId: string,
  word: string,
  index: number,
  seed: SegmentSeed,
): PhonemeSegment {
  const id = `${lessonId}-${word}-${index + 1}-${seed.grapheme}`;
  const segment = {
    id,
    grapheme: seed.grapheme,
    soundLabel: seed.soundLabel,
    ...(seed.hint ? { hint: seed.hint } : {}),
  };

  if (seed.isSilent) {
    return {
      ...segment,
      isSilent: true,
    };
  }

  const src =
    seed.audioSrc ??
    (seed.audioLetter
      ? getGradeTwoLetterSoundAudio(seed.audioLetter, seed.soundLabel)
      : undefined);

  if (!src) {
    throw new Error(`Missing audio source for ${id}.`);
  }

  return {
    ...segment,
    audio: audioAsset(`${id}-audio`, src, seed.soundLabel, 'phoneme'),
  };
}

function createWord(lessonId: string, seed: WordSeed): DecodableWord {
  const id = `${lessonId}-${seed.word}`;
  const sourceLetter = seed.sourceLetter ?? seed.word[0];
  const segments = seed.segments.map((segment, index) =>
    createSegment(lessonId, seed.word, index, segment),
  ) as unknown as DecodableWord['segments'];

  return {
    id,
    word: seed.word,
    meaningZhTW: seed.meaningZhTW,
    pattern: seed.pattern ?? 'CVC',
    segments,
    image: imageAsset(
      `${id}-image`,
      seed.imageSrc ??
        `/assets/images/courses/${sourceLetter}/${sourceLetter}-${seed.word}-core.webp`,
      seed.imageAlt,
    ),
    audio: audioAsset(
      `${id}-audio`,
      seed.audioSrc ?? `/assets/audio/courses/${sourceLetter}/${seed.word}.wav`,
      seed.word,
      'word',
    ),
  };
}

export function createBlendingLesson(seed: BlendingLessonSeed): BlendingLesson {
  return {
    id: seed.id,
    slug: seed.slug,
    unitId: seed.unitId,
    unitLabel: seed.unitLabel,
    order: seed.order,
    title: seed.title,
    subtitle: seed.subtitle,
    vowelGrapheme: seed.vowelGrapheme,
    vowelSoundLabel: seed.vowelSoundLabel,
    practiceMode: seed.practiceMode ?? 'phoneme',
    words: seed.words.map((word) => createWord(seed.id, word)),
    status: 'ready',
    estimatedMinutes: seed.estimatedMinutes ?? 6,
  };
}
