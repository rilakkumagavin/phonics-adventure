import { createBlendingLesson } from './createBlendingLesson';

const shortO = { grapheme: 'o', soundLabel: '/ɑ/', audioLetter: 'o' };

export const gradeTwoShortOLesson = createBlendingLesson({
  id: 'grade-2-short-o-lesson-04',
  slug: 'short-o',
  unitId: 'grade-2-short-vowels',
  unitLabel: '短母音拼讀',
  order: 4,
  title: '短母音 o',
  subtitle: '聽見短短的 /ɑ/，再把聲音合起來。',
  vowelGrapheme: 'o',
  vowelSoundLabel: '/ɑ/',
  words: [
    {
      word: 'dog',
      meaningZhTW: '狗',
      sourceLetter: 'd',
      imageAlt: '一隻友善的棕白色小狗',
      segments: [
        { grapheme: 'd', soundLabel: '/d/', audioLetter: 'd' },
        shortO,
        { grapheme: 'g', soundLabel: '/g/', audioLetter: 'g' },
      ],
    },
    {
      word: 'fox',
      meaningZhTW: '狐狸',
      sourceLetter: 'x',
      imageAlt: '一隻友善的橘色狐狸',
      segments: [
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
        shortO,
        { grapheme: 'x', soundLabel: '/ks/', audioLetter: 'x' },
      ],
    },
    {
      word: 'top',
      meaningZhTW: '陀螺',
      sourceLetter: 't',
      imageAlt: '一個紅藍黃色的玩具陀螺',
      segments: [
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        shortO,
        { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
      ],
    },
  ],
});
