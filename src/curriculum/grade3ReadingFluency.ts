import type { AudioAssetRef, ImageAssetRef } from '../types/asset';
import type {
  DecodableSentenceLesson,
  DecodableSentenceToken,
} from './decodableSentence';

interface ReadingSeed {
  slug: string;
  title: string;
  sentence: string;
  meaningZhTW: string;
  words: readonly string[];
  imageSrc: string;
  imageAlt: string;
}

const unitId = 'grade-3-reading-fluency';
const unitLabel = '短文流暢閱讀';
const audioRoot = '/assets/audio/grade3/reading-fluency';

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

function createReadingLesson(
  seed: ReadingSeed,
  index: number,
): DecodableSentenceLesson {
  const order = index + 1;
  const id = `grade-3-reading-${seed.slug}-lesson-${String(order).padStart(2, '0')}`;
  const tokens = seed.words.map(
    (word, tokenIndex): DecodableSentenceToken => ({
      id: `${id}-token-${tokenIndex + 1}-${tokenFileName(word)}`,
      text: word,
      audio: audioAsset(
        `${id}-token-${tokenIndex + 1}-audio`,
        `${audioRoot}/words/${tokenFileName(word)}.wav`,
        word.replace(/[,.]/g, ''),
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
    subtitle: '先點字聽發音，再把整句連起來讀。',
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

const readingSeeds = [
  {
    slug: 'train-in-rain',
    title: '雨中的火車',
    sentence: 'The train waits in the rain.',
    meaningZhTW: '火車在雨中等待。',
    words: ['The', 'train', 'waits', 'in', 'the', 'rain.'],
    imageSrc: '/assets/images/grade3/vowel-teams/train.webp',
    imageAlt: '一列在雨中行駛的火車',
  },
  {
    slug: 'rabbit-by-fern',
    title: '蕨葉旁的兔子',
    sentence: 'A rabbit rests by a fern.',
    meaningZhTW: '一隻兔子在蕨葉旁休息。',
    words: ['A', 'rabbit', 'rests', 'by', 'a', 'fern.'],
    imageSrc: '/assets/images/grade3/multisyllable/rabbit.webp',
    imageAlt: '一隻可愛的小兔子',
  },
  {
    slug: 'play-by-seaside',
    title: '海邊玩耍',
    sentence: 'We play by the seaside.',
    meaningZhTW: '我們在海邊玩。',
    words: ['We', 'play', 'by', 'the', 'seaside.'],
    imageSrc: '/assets/images/grade3/multisyllable/seaside.webp',
    imageAlt: '有沙灘與海浪的海邊',
  },
  {
    slug: 'picnic-at-sunset',
    title: '夕陽下的野餐',
    sentence: 'At sunset, the king has a picnic.',
    meaningZhTW: '夕陽西下時，國王正在野餐。',
    words: ['At', 'sunset,', 'the', 'king', 'has', 'a', 'picnic.'],
    imageSrc: '/assets/images/grade3/multisyllable/sunset.webp',
    imageAlt: '天空染成金黃色的夕陽',
  },
  {
    slug: 'rainbow-over-town',
    title: '雨後的彩虹',
    sentence: 'The rain stops. A bright rainbow shines over the town.',
    meaningZhTW: '雨停了，一道明亮的彩虹照耀著小鎮。',
    words: [
      'The',
      'rain',
      'stops.',
      'A',
      'bright',
      'rainbow',
      'shines',
      'over',
      'the',
      'town.',
    ],
    imageSrc: '/assets/images/grade3/multisyllable/rainbow.webp',
    imageAlt: '一道明亮的彩虹',
  },
] as const satisfies readonly ReadingSeed[];

export const gradeThreeReadingFluencyLessons = readingSeeds.map(
  createReadingLesson,
);

const lessonsBySlug = new Map(
  gradeThreeReadingFluencyLessons.map((lesson) => [lesson.slug, lesson]),
);

const lessonsById = new Map(
  gradeThreeReadingFluencyLessons.map((lesson) => [lesson.id, lesson]),
);

export function getGradeThreeReadingLesson(slugOrId: string) {
  const normalizedId = slugOrId.toLowerCase();

  return lessonsBySlug.get(normalizedId) ?? lessonsById.get(normalizedId);
}

export function getGradeThreeReadingLessonPath(
  lesson: DecodableSentenceLesson,
) {
  return `/grade/3/read/${lesson.slug}`;
}

export function getNextGradeThreeReadingLesson(
  lesson: DecodableSentenceLesson,
) {
  const lessonIndex = gradeThreeReadingFluencyLessons.findIndex(
    (candidate) => candidate.id === lesson.id,
  );

  return lessonIndex >= 0
    ? gradeThreeReadingFluencyLessons[lessonIndex + 1]
    : undefined;
}
