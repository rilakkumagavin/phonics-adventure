import { createBlendingLesson } from './createBlendingLesson';

const shortU = { grapheme: 'u', soundLabel: '/ʌ/', audioLetter: 'u' };

export const gradeTwoShortULesson = createBlendingLesson({
  id: 'grade-2-short-u-lesson-05',
  slug: 'short-u',
  unitId: 'grade-2-short-vowels',
  unitLabel: '短母音拼讀',
  order: 5,
  title: '短母音 u',
  subtitle: '聽見短短的 /ʌ/，再把聲音合起來。',
  vowelGrapheme: 'u',
  vowelSoundLabel: '/ʌ/',
  words: [
    {
      word: 'sun',
      meaningZhTW: '太陽',
      sourceLetter: 's',
      imageAlt: '一個有清楚光芒的黃色太陽',
      segments: [
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        shortU,
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'cup',
      meaningZhTW: '杯子',
      sourceLetter: 'c',
      imageAlt: '一個有把手的藍色杯子',
      segments: [
        { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
        shortU,
        { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
      ],
    },
    {
      word: 'bus',
      meaningZhTW: '公車',
      sourceLetter: 'b',
      imageAlt: '一輛黃色的小公車',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        shortU,
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
      ],
    },
  ],
});
