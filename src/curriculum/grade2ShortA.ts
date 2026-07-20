import type { AudioAssetRef, ImageAssetRef } from '../types/asset';
import type {
  BlendingLesson,
  DecodableWord,
  PhonemeSegment,
} from './phonicsLesson';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

function phonemeAudio(
  id: string,
  src: string,
  transcript: string,
): AudioAssetRef {
  return {
    id,
    src,
    kind: 'phoneme',
    transcript,
    status: 'ready',
    playbackRateOptions: [1, 0.75],
  };
}

function wordAudio(id: string, src: string, transcript: string): AudioAssetRef {
  return {
    id,
    src,
    kind: 'word',
    transcript,
    status: 'ready',
    playbackRateOptions: [1, 0.75],
  };
}

function wordImage(id: string, src: string, alt: string): ImageAssetRef {
  return {
    id,
    src,
    alt,
    status: 'ready',
  };
}

function segment(
  id: string,
  grapheme: string,
  soundLabel: string,
  audioSrc: string,
): PhonemeSegment {
  return {
    id,
    grapheme,
    soundLabel,
    audio: phonemeAudio(`${id}-audio`, audioSrc, soundLabel),
  };
}

const shortA = gradeTwoPhonemeAudio.shortA;

const words: readonly DecodableWord[] = [
  {
    id: 'grade-2-short-a-cat',
    word: 'cat',
    meaningZhTW: '貓',
    pattern: 'CVC',
    segments: [
      segment(
        'grade-2-short-a-cat-c',
        'c',
        '/k/',
        gradeTwoPhonemeAudio.hardC,
      ),
      segment('grade-2-short-a-cat-a', 'a', '/æ/', shortA),
      segment(
        'grade-2-short-a-cat-t',
        't',
        '/t/',
        gradeTwoPhonemeAudio.tSound,
      ),
    ],
    image: wordImage(
      'grade-2-short-a-cat-image',
      '/assets/images/courses/c/c-cat-core.webp',
      '一隻友善的橘色小貓',
    ),
    audio: wordAudio(
      'grade-2-short-a-cat-audio',
      '/assets/audio/courses/c/cat.wav',
      'cat',
    ),
  },
  {
    id: 'grade-2-short-a-map',
    word: 'map',
    meaningZhTW: '地圖',
    pattern: 'CVC',
    segments: [
      segment(
        'grade-2-short-a-map-m',
        'm',
        '/m/',
        gradeTwoPhonemeAudio.mSound,
      ),
      segment('grade-2-short-a-map-a', 'a', '/æ/', shortA),
      segment(
        'grade-2-short-a-map-p',
        'p',
        '/p/',
        gradeTwoPhonemeAudio.pSound,
      ),
    ],
    image: wordImage(
      'grade-2-short-a-map-image',
      '/assets/images/courses/m/m-map-core.webp',
      '一張打開的彩色地圖',
    ),
    audio: wordAudio(
      'grade-2-short-a-map-audio',
      '/assets/audio/courses/m/map.wav',
      'map',
    ),
  },
  {
    id: 'grade-2-short-a-fan',
    word: 'fan',
    meaningZhTW: '風扇',
    pattern: 'CVC',
    segments: [
      segment(
        'grade-2-short-a-fan-f',
        'f',
        '/f/',
        gradeTwoPhonemeAudio.fSound,
      ),
      segment('grade-2-short-a-fan-a', 'a', '/æ/', shortA),
      segment(
        'grade-2-short-a-fan-n',
        'n',
        '/n/',
        gradeTwoPhonemeAudio.nSound,
      ),
    ],
    image: wordImage(
      'grade-2-short-a-fan-image',
      '/assets/images/courses/f/f-fan-core.webp',
      '一台有彩色扇葉的風扇',
    ),
    audio: wordAudio(
      'grade-2-short-a-fan-audio',
      '/assets/audio/courses/f/fan.wav',
      'fan',
    ),
  },
];

export const gradeTwoShortALesson = {
  id: 'grade-2-short-a-lesson-01',
  slug: 'short-a',
  unitId: 'grade-2-short-vowels',
  unitLabel: '短母音拼讀',
  order: 1,
  title: '短母音 a',
  subtitle: '一個音、一個音，再合起來念。',
  vowelGrapheme: 'a',
  vowelSoundLabel: '/æ/',
  words,
  status: 'ready',
  estimatedMinutes: 6,
} as const satisfies BlendingLesson;
