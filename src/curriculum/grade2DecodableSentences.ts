import type { AudioAssetRef, ImageAssetRef } from '../types/asset';
import type {
  DecodableSentenceLesson,
  DecodableSentenceToken,
} from './decodableSentence';

interface SentenceSeed {
  slug: string;
  title: string;
  sentence: string;
  meaningZhTW: string;
  words: readonly string[];
  imageSrc: string;
  imageAlt: string;
}

const unitId = 'grade-2-decodable-sentences';
const unitLabel = '一句一句讀';
const audioRoot = '/assets/audio/grade2/sentences';

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

function tokenFileName(word: string) {
  return word.toLowerCase().replace(/[^a-z]/g, '');
}

function createSentenceLesson(
  seed: SentenceSeed,
  index: number,
): DecodableSentenceLesson {
  const order = index + 1;
  const id = `grade-2-sentence-${seed.slug}-lesson-${String(order).padStart(2, '0')}`;
  const tokens = seed.words.map(
    (word, tokenIndex): DecodableSentenceToken => ({
      id: `${id}-token-${tokenIndex + 1}-${tokenFileName(word)}`,
      text: word,
      audio: audioAsset(
        `${id}-token-${tokenIndex + 1}-audio`,
        `${audioRoot}/words/${tokenFileName(word)}.wav`,
        word,
        'word',
      ),
    }),
  );

  return {
    id,
    slug: seed.slug,
    unitId,
    unitLabel,
    order,
    title: seed.title,
    subtitle: '先一個字一個字聽，再把整句連起來讀。',
    sentence: seed.sentence,
    meaningZhTW: seed.meaningZhTW,
    practiceWordId: `${id}-sentence`,
    tokens,
    image: imageAsset(`${id}-image`, seed.imageSrc, seed.imageAlt),
    audio: audioAsset(
      `${id}-audio`,
      `${audioRoot}/${seed.slug}.wav`,
      seed.sentence,
      'sentence',
    ),
    status: 'ready',
    estimatedMinutes: 5,
  };
}

const sentenceSeeds = [
  {
    slug: 'cat-on-mat',
    title: '小貓在墊子上',
    sentence: 'A cat is on a mat.',
    meaningZhTW: '一隻貓在墊子上。',
    words: ['A', 'cat', 'is', 'on', 'a', 'mat'],
    imageSrc: '/assets/images/courses/c/c-cat-core.webp',
    imageAlt: '一隻橘色小貓',
  },
  {
    slug: 'fish-can-swim',
    title: '魚會游泳',
    sentence: 'The fish can swim.',
    meaningZhTW: '魚會游泳。',
    words: ['The', 'fish', 'can', 'swim'],
    imageSrc: '/assets/images/courses/f/f-fish-core.webp',
    imageAlt: '一條在水中游泳的魚',
  },
  {
    slug: 'frog-can-jump',
    title: '青蛙會跳',
    sentence: 'The frog can jump.',
    meaningZhTW: '青蛙會跳。',
    words: ['The', 'frog', 'can', 'jump'],
    imageSrc: '/assets/images/courses/f/f-frog-core.webp',
    imageAlt: '一隻準備跳躍的綠色青蛙',
  },
  {
    slug: 'ride-a-bike',
    title: '騎腳踏車',
    sentence: 'I ride a bike.',
    meaningZhTW: '我騎腳踏車。',
    words: ['I', 'ride', 'a', 'bike'],
    imageSrc: '/assets/images/grade2/magic-e/bike.webp',
    imageAlt: '一輛紅藍色兒童腳踏車',
  },
  {
    slug: 'rose-in-vase',
    title: '花瓶裡的玫瑰',
    sentence: 'The rose is in a vase.',
    meaningZhTW: '玫瑰在花瓶裡。',
    words: ['The', 'rose', 'is', 'in', 'a', 'vase'],
    imageSrc: '/assets/images/grade2/magic-e/rose.webp',
    imageAlt: '一朵紅色玫瑰花',
  },
] as const satisfies readonly SentenceSeed[];

export const gradeTwoDecodableSentenceLessons = sentenceSeeds.map(
  createSentenceLesson,
);
