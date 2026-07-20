import { createBlendingLesson } from './createBlendingLesson';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

const unitId = 'grade-2-consonant-blends';
const unitLabel = '子音連音';
const generatedImage = (word: string) =>
  `/assets/images/grade2/blends/${word}.webp`;
const generatedAudio = (word: string) =>
  `/assets/audio/grade2/blends/${word}.wav`;

export const gradeTwoConsonantBlendLessons = [
  createBlendingLesson({
    id: 'grade-2-blend-fr-lesson-01',
    slug: 'blend-fr',
    unitId,
    unitLabel,
    order: 1,
    title: 'fr 連音',
    subtitle: '先聽 /f/，再聽 /r/，兩個聲音都要保留下來。',
    vowelGrapheme: 'fr',
    vowelSoundLabel: '/f/ + /r/',
    words: [
      {
        word: 'frog',
        meaningZhTW: '青蛙',
        sourceLetter: 'f',
        imageAlt: '一隻友善的綠色青蛙',
        pattern: 'CCVC',
        segments: [
          { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
          { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
          { grapheme: 'o', soundLabel: '/ɑ/', audioLetter: 'o' },
          { grapheme: 'g', soundLabel: '/g/', audioLetter: 'g' },
        ],
      },
      {
        word: 'fry',
        meaningZhTW: '煎',
        imageAlt: '平底鍋裡正在煎一顆蛋',
        imageSrc: generatedImage('fry'),
        audioSrc: generatedAudio('fry'),
        pattern: 'CCV',
        segments: [
          { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
          { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
          {
            grapheme: 'y',
            soundLabel: '/aɪ/',
            audioSrc: '/assets/audio/grade2/phonemes/long-i.wav',
          },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-blend-dr-lesson-02',
    slug: 'blend-dr',
    unitId,
    unitLabel,
    order: 2,
    title: 'dr 連音',
    subtitle: '讓 /d/ 和 /r/ 靠近一點，但兩個聲音都要聽見。',
    vowelGrapheme: 'dr',
    vowelSoundLabel: '/d/ + /r/',
    words: [
      {
        word: 'drum',
        meaningZhTW: '鼓',
        sourceLetter: 'd',
        imageAlt: '一面紅藍色的小鼓',
        pattern: 'CCVC',
        segments: [
          { grapheme: 'd', soundLabel: '/d/', audioLetter: 'd' },
          { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
          { grapheme: 'u', soundLabel: '/ʌ/', audioLetter: 'u' },
          { grapheme: 'm', soundLabel: '/m/', audioLetter: 'm' },
        ],
      },
      {
        word: 'dress',
        meaningZhTW: '洋裝',
        imageAlt: '一件有藍色口袋的黃色洋裝',
        imageSrc: generatedImage('dress'),
        audioSrc: generatedAudio('dress'),
        pattern: 'CCVCC',
        segments: [
          { grapheme: 'd', soundLabel: '/d/', audioLetter: 'd' },
          { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
          { grapheme: 'e', soundLabel: '/ɛ/', audioLetter: 'e' },
          { grapheme: 'ss', soundLabel: '/s/', audioLetter: 's' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-blend-st-lesson-03',
    slug: 'blend-st',
    unitId,
    unitLabel,
    order: 3,
    title: 'st 連音',
    subtitle: 'st 可以在單字前面，也可以躲在單字後面。',
    vowelGrapheme: 'st',
    vowelSoundLabel: '/s/ + /t/',
    words: [
      {
        word: 'nest',
        meaningZhTW: '鳥巢',
        sourceLetter: 'n',
        imageAlt: '一個放著鳥蛋的鳥巢',
        pattern: 'CVCC',
        segments: [
          { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
          { grapheme: 'e', soundLabel: '/ɛ/', audioLetter: 'e' },
          { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        ],
      },
      {
        word: 'step',
        meaningZhTW: '階梯',
        imageAlt: '一座有三階的彩色小階梯',
        imageSrc: generatedImage('step'),
        audioSrc: generatedAudio('step'),
        pattern: 'CCVC',
        segments: [
          { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
          { grapheme: 'e', soundLabel: '/ɛ/', audioLetter: 'e' },
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-blend-mp-lesson-04',
    slug: 'blend-mp',
    unitId,
    unitLabel,
    order: 4,
    title: 'mp 連音',
    subtitle: '在單字尾巴聽聽 /m/ 和 /p/ 連在一起。',
    vowelGrapheme: 'mp',
    vowelSoundLabel: '/m/ + /p/',
    words: [
      {
        word: 'lamp',
        meaningZhTW: '燈',
        sourceLetter: 'l',
        imageAlt: '一盞黃色桌燈',
        pattern: 'CVCC',
        segments: [
          { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          { grapheme: 'm', soundLabel: '/m/', audioLetter: 'm' },
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        ],
      },
      {
        word: 'jump',
        meaningZhTW: '跳',
        imageAlt: '一位開心向上跳的孩子',
        imageSrc: generatedImage('jump'),
        audioSrc: generatedAudio('jump'),
        pattern: 'CVCC',
        segments: [
          { grapheme: 'j', soundLabel: '/dʒ/', audioLetter: 'j' },
          { grapheme: 'u', soundLabel: '/ʌ/', audioLetter: 'u' },
          { grapheme: 'm', soundLabel: '/m/', audioLetter: 'm' },
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-blend-tr-lesson-05',
    slug: 'blend-tr',
    unitId,
    unitLabel,
    order: 5,
    title: 'tr 連音',
    subtitle: '先念 /t/，再接 /r/，一起讀 tree 和 truck。',
    vowelGrapheme: 'tr',
    vowelSoundLabel: '/t/ + /r/',
    words: [
      {
        word: 'tree',
        meaningZhTW: '樹',
        imageAlt: '一棵枝葉茂密的綠色大樹',
        imageSrc: generatedImage('tree'),
        audioSrc: generatedAudio('tree'),
        pattern: 'CCV',
        segments: [
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
          { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
          {
            grapheme: 'ee',
            soundLabel: '/iː/',
            audioSrc: '/assets/audio/grade2/phonemes/long-e.wav',
          },
        ],
      },
      {
        word: 'truck',
        meaningZhTW: '卡車',
        imageAlt: '一輛紅藍色玩具卡車',
        imageSrc: generatedImage('truck'),
        audioSrc: generatedAudio('truck'),
        pattern: 'CCVCC',
        segments: [
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
          { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
          { grapheme: 'u', soundLabel: '/ʌ/', audioLetter: 'u' },
          { grapheme: 'ck', soundLabel: '/k/', audioLetter: 'c' },
        ],
      },
    ],
  }),
] as const;
