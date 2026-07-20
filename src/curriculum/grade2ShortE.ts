import { createBlendingLesson } from './createBlendingLesson';

const shortE = { grapheme: 'e', soundLabel: '/ɛ/', audioLetter: 'e' };

export const gradeTwoShortELesson = createBlendingLesson({
  id: 'grade-2-short-e-lesson-02',
  slug: 'short-e',
  unitId: 'grade-2-short-vowels',
  unitLabel: '短母音拼讀',
  order: 2,
  title: '短母音 e',
  subtitle: '聽見短短的 /ɛ/，再把聲音合起來。',
  vowelGrapheme: 'e',
  vowelSoundLabel: '/ɛ/',
  words: [
    {
      word: 'hen',
      meaningZhTW: '母雞',
      sourceLetter: 'h',
      imageAlt: '一隻友善的紅色小母雞',
      segments: [
        { grapheme: 'h', soundLabel: '/h/', audioLetter: 'h' },
        shortE,
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'net',
      meaningZhTW: '網子',
      sourceLetter: 'n',
      imageAlt: '一張展開的藍色網子',
      segments: [
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        shortE,
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
      ],
    },
    {
      word: 'pen',
      meaningZhTW: '筆',
      sourceLetter: 'p',
      imageAlt: '一枝藍色的筆',
      segments: [
        { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        shortE,
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
  ],
});
