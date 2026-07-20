import { createBlendingLesson } from './createBlendingLesson';

const shortI = { grapheme: 'i', soundLabel: '/ɪ/', audioLetter: 'i' };

export const gradeTwoShortILesson = createBlendingLesson({
  id: 'grade-2-short-i-lesson-03',
  slug: 'short-i',
  unitId: 'grade-2-short-vowels',
  unitLabel: '短母音拼讀',
  order: 3,
  title: '短母音 i',
  subtitle: '聽見短短的 /ɪ/，再把聲音合起來。',
  vowelGrapheme: 'i',
  vowelSoundLabel: '/ɪ/',
  words: [
    {
      word: 'pig',
      meaningZhTW: '豬',
      sourceLetter: 'p',
      imageAlt: '一隻友善的粉紅色小豬',
      segments: [
        { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        shortI,
        { grapheme: 'g', soundLabel: '/g/', audioLetter: 'g' },
      ],
    },
    {
      word: 'gift',
      meaningZhTW: '禮物',
      sourceLetter: 'g',
      imageAlt: '一個綁著橘色蝴蝶結的綠色禮物盒',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'g', soundLabel: '/g/', audioLetter: 'g' },
        shortI,
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
      ],
    },
    {
      word: 'six',
      meaningZhTW: '六',
      sourceLetter: 'x',
      imageAlt: '六個排列清楚的彩色積木',
      segments: [
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        shortI,
        { grapheme: 'x', soundLabel: '/ks/', audioLetter: 'x' },
      ],
    },
  ],
});
