import { createBlendingLesson } from './createBlendingLesson';

const unitId = 'grade-2-magic-e';
const unitLabel = 'Magic E 長母音';
const generatedImage = (word: string) =>
  `/assets/images/grade2/magic-e/${word}.webp`;
const generatedAudio = (word: string) =>
  `/assets/audio/grade2/magic-e/${word}.wav`;
const silentE = {
  grapheme: 'e',
  soundLabel: '不發音',
  isSilent: true,
};

export const gradeTwoMagicELessons = [
  createBlendingLesson({
    id: 'grade-2-magic-e-a-lesson-01',
    slug: 'magic-e-a',
    unitId,
    unitLabel,
    order: 1,
    title: 'a_e 長母音',
    subtitle: '字尾 e 不發音，讓 a 念出自己的名字 /eɪ/。',
    vowelGrapheme: 'a_e',
    vowelSoundLabel: '/eɪ/',
    words: [
      {
        word: 'cake',
        meaningZhTW: '蛋糕',
        imageAlt: '一個有彩色糖粒的小蛋糕',
        imageSrc: generatedImage('cake'),
        audioSrc: generatedAudio('cake'),
        pattern: 'CVCe',
        segments: [
          { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
          {
            grapheme: 'a',
            soundLabel: '/eɪ/',
            audioSrc: '/assets/audio/grade2/phonemes/long-a.wav',
          },
          { grapheme: 'k', soundLabel: '/k/', audioLetter: 'k' },
          silentE,
        ],
      },
      {
        word: 'vase',
        meaningZhTW: '花瓶',
        sourceLetter: 'v',
        imageAlt: '一個裝著花朵的藍色花瓶',
        pattern: 'CVCe',
        segments: [
          { grapheme: 'v', soundLabel: '/v/', audioLetter: 'v' },
          {
            grapheme: 'a',
            soundLabel: '/eɪ/',
            audioSrc: '/assets/audio/grade2/phonemes/long-a.wav',
          },
          { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
          silentE,
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-magic-e-i-lesson-02',
    slug: 'magic-e-i',
    unitId,
    unitLabel,
    order: 2,
    title: 'i_e 長母音',
    subtitle: '字尾 e 不發音，讓 i 念出自己的名字 /aɪ/。',
    vowelGrapheme: 'i_e',
    vowelSoundLabel: '/aɪ/',
    words: [
      {
        word: 'kite',
        meaningZhTW: '風箏',
        sourceLetter: 'k',
        imageAlt: '一個有彩色尾巴的風箏',
        pattern: 'CVCe',
        segments: [
          { grapheme: 'k', soundLabel: '/k/', audioLetter: 'k' },
          {
            grapheme: 'i',
            soundLabel: '/aɪ/',
            audioSrc: '/assets/audio/grade2/phonemes/long-i.wav',
          },
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
          silentE,
        ],
      },
      {
        word: 'bike',
        meaningZhTW: '腳踏車',
        imageAlt: '一輛紅藍色兒童腳踏車',
        imageSrc: generatedImage('bike'),
        audioSrc: generatedAudio('bike'),
        pattern: 'CVCe',
        segments: [
          { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
          {
            grapheme: 'i',
            soundLabel: '/aɪ/',
            audioSrc: '/assets/audio/grade2/phonemes/long-i.wav',
          },
          { grapheme: 'k', soundLabel: '/k/', audioLetter: 'k' },
          silentE,
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-magic-e-o-lesson-03',
    slug: 'magic-e-o',
    unitId,
    unitLabel,
    order: 3,
    title: 'o_e 長母音',
    subtitle: '字尾 e 不發音，讓 o 念出自己的名字 /oʊ/。',
    vowelGrapheme: 'o_e',
    vowelSoundLabel: '/oʊ/',
    words: [
      {
        word: 'nose',
        meaningZhTW: '鼻子',
        sourceLetter: 'n',
        imageAlt: '一個友善角色的鼻子',
        pattern: 'CVCe',
        segments: [
          { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
          {
            grapheme: 'o',
            soundLabel: '/oʊ/',
            audioSrc: '/assets/audio/grade2/phonemes/long-o.wav',
          },
          { grapheme: 's', soundLabel: '/z/', audioLetter: 'z' },
          silentE,
        ],
      },
      {
        word: 'rose',
        meaningZhTW: '玫瑰',
        imageAlt: '一朵紅色玫瑰花',
        imageSrc: generatedImage('rose'),
        audioSrc: generatedAudio('rose'),
        pattern: 'CVCe',
        segments: [
          { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
          {
            grapheme: 'o',
            soundLabel: '/oʊ/',
            audioSrc: '/assets/audio/grade2/phonemes/long-o.wav',
          },
          { grapheme: 's', soundLabel: '/z/', audioLetter: 'z' },
          silentE,
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-magic-e-u-lesson-04',
    slug: 'magic-e-u',
    unitId,
    unitLabel,
    order: 4,
    title: 'u_e 長母音',
    subtitle: '字尾 e 不發音，讓 u 念出 /juː/。',
    vowelGrapheme: 'u_e',
    vowelSoundLabel: '/juː/',
    words: [
      {
        word: 'cube',
        meaningZhTW: '立方體',
        imageAlt: '一個藍色立方體積木',
        imageSrc: generatedImage('cube'),
        audioSrc: generatedAudio('cube'),
        pattern: 'CVCe',
        segments: [
          { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
          {
            grapheme: 'u',
            soundLabel: '/juː/',
            audioSrc: '/assets/audio/grade2/phonemes/long-u.wav',
          },
          { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
          silentE,
        ],
      },
      {
        word: 'tube',
        meaningZhTW: '管子',
        imageAlt: '一根中空的紅色管子',
        imageSrc: generatedImage('tube'),
        audioSrc: generatedAudio('tube'),
        pattern: 'CVCe',
        segments: [
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
          {
            grapheme: 'u',
            soundLabel: '/juː/',
            audioSrc: '/assets/audio/grade2/phonemes/long-u.wav',
          },
          { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
          silentE,
        ],
      },
    ],
  }),
] as const;
