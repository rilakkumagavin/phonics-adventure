import { createBlendingLesson } from './createBlendingLesson';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

const tchSoundAudio = '/assets/audio/grade3/advanced-consonants/tch-sound.wav';
const dgeSoundAudio = '/assets/audio/grade3/advanced-consonants/dge-sound.wav';
const phSoundAudio = '/assets/audio/grade3/advanced-consonants/ph-sound.wav';
const ngSoundAudio = '/assets/audio/grade3/advanced-consonants/ng-sound.wav';

export const gradeThreeTchLesson = createBlendingLesson({
  id: 'grade-3-tch-lesson-01',
  slug: 'tch',
  unitId: 'grade-3-advanced-consonants',
  unitLabel: '進階子音組合',
  order: 1,
  title: 'tch 的聲音',
  subtitle: 't、c、h 站在一起，只發出一個 /tʃ/。先聽短母音 a，再接上字尾 tch。',
  vowelGrapheme: 'tch',
  vowelSoundLabel: '/tʃ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'catch',
      meaningZhTW: '接住',
      imageSrc: '/assets/images/grade3/advanced-consonants/catch.webp',
      imageAlt: '一位孩子用雙手接住紅色球',
      audioSrc: '/assets/audio/grade3/advanced-consonants/catch.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
        {
          grapheme: 'a',
          soundLabel: '/æ/',
          audioSrc: gradeTwoPhonemeAudio.shortA,
        },
        { grapheme: 'tch', soundLabel: '/tʃ/', audioSrc: tchSoundAudio },
      ],
    },
    {
      word: 'hatch',
      meaningZhTW: '孵化',
      imageSrc: '/assets/images/grade3/advanced-consonants/hatch.webp',
      imageAlt: '一隻黃色小雞從裂開的蛋殼孵出',
      audioSrc: '/assets/audio/grade3/advanced-consonants/hatch.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'h', soundLabel: '/h/', audioLetter: 'h' },
        {
          grapheme: 'a',
          soundLabel: '/æ/',
          audioSrc: gradeTwoPhonemeAudio.shortA,
        },
        { grapheme: 'tch', soundLabel: '/tʃ/', audioSrc: tchSoundAudio },
      ],
    },
    {
      word: 'patch',
      meaningZhTW: '補丁',
      imageSrc: '/assets/images/grade3/advanced-consonants/patch.webp',
      imageAlt: '一塊有黃色縫線的藍色布補丁',
      audioSrc: '/assets/audio/grade3/advanced-consonants/patch.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        {
          grapheme: 'a',
          soundLabel: '/æ/',
          audioSrc: gradeTwoPhonemeAudio.shortA,
        },
        { grapheme: 'tch', soundLabel: '/tʃ/', audioSrc: tchSoundAudio },
      ],
    },
  ],
});

export const gradeThreeDgeLesson = createBlendingLesson({
  id: 'grade-3-dge-lesson-02',
  slug: 'dge',
  unitId: 'grade-3-advanced-consonants',
  unitLabel: '進階子音組合',
  order: 2,
  title: 'dge 的聲音',
  subtitle: 'd、g、e 站在字尾，只發出一個 /dʒ/。換不同短母音，再接上 dge。',
  vowelGrapheme: 'dge',
  vowelSoundLabel: '/dʒ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'badge',
      meaningZhTW: '徽章',
      imageSrc: '/assets/images/grade3/advanced-consonants/badge.webp',
      imageAlt: '一枚有藍色緞帶的金色星星徽章',
      audioSrc: '/assets/audio/grade3/advanced-consonants/badge.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        {
          grapheme: 'a',
          soundLabel: '/æ/',
          audioSrc: gradeTwoPhonemeAudio.shortA,
        },
        { grapheme: 'dge', soundLabel: '/dʒ/', audioSrc: dgeSoundAudio },
      ],
    },
    {
      word: 'bridge',
      meaningZhTW: '橋',
      imageSrc: '/assets/images/grade3/advanced-consonants/bridge.webp',
      imageAlt: '一座跨越藍色小河的紅磚玩具拱橋',
      audioSrc: '/assets/audio/grade3/advanced-consonants/bridge.wav',
      pattern: 'CCVCC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
        {
          grapheme: 'i',
          soundLabel: '/ɪ/',
          audioSrc: gradeTwoPhonemeAudio.shortI,
        },
        { grapheme: 'dge', soundLabel: '/dʒ/', audioSrc: dgeSoundAudio },
      ],
    },
    {
      word: 'fudge',
      meaningZhTW: '巧克力軟糖',
      imageSrc: '/assets/images/grade3/advanced-consonants/fudge.webp',
      imageAlt: '一塊方形的巧克力軟糖',
      audioSrc: '/assets/audio/grade3/advanced-consonants/fudge.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
        {
          grapheme: 'u',
          soundLabel: '/ʌ/',
          audioSrc: gradeTwoPhonemeAudio.shortU,
        },
        { grapheme: 'dge', soundLabel: '/dʒ/', audioSrc: dgeSoundAudio },
      ],
    },
  ],
});

export const gradeThreePhLesson = createBlendingLesson({
  id: 'grade-3-ph-lesson-03',
  slug: 'ph',
  unitId: 'grade-3-advanced-consonants',
  unitLabel: '進階子音組合',
  order: 3,
  title: 'ph 的聲音',
  subtitle: 'p 和 h 站在一起，會發出 /f/。在字首或字尾看見 ph，都把它當成一個聲音。',
  vowelGrapheme: 'ph',
  vowelSoundLabel: '/f/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'phone',
      meaningZhTW: '電話',
      imageSrc: '/assets/images/grade3/advanced-consonants/phone.webp',
      imageAlt: '一支有藍色圓角外殼的玩具手機',
      audioSrc: '/assets/audio/grade3/advanced-consonants/phone.wav',
      pattern: 'CCVCe',
      segments: [
        { grapheme: 'ph', soundLabel: '/f/', audioSrc: phSoundAudio },
        {
          grapheme: 'o',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        { grapheme: 'e', soundLabel: 'silent', isSilent: true },
      ],
    },
    {
      word: 'graph',
      meaningZhTW: '圖表',
      imageSrc: '/assets/images/grade3/advanced-consonants/graph.webp',
      imageAlt: '三根由矮到高排列的彩色圖表柱',
      audioSrc: '/assets/audio/grade3/advanced-consonants/graph.wav',
      pattern: 'CCVCC',
      segments: [
        { grapheme: 'g', soundLabel: '/g/', audioLetter: 'g' },
        { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
        {
          grapheme: 'a',
          soundLabel: '/æ/',
          audioSrc: gradeTwoPhonemeAudio.shortA,
        },
        { grapheme: 'ph', soundLabel: '/f/', audioSrc: phSoundAudio },
      ],
    },
    {
      word: 'photo',
      meaningZhTW: '照片',
      imageSrc: '/assets/images/grade3/advanced-consonants/photo.webp',
      imageAlt: '一張有藍天、綠地與太陽的拍立得照片',
      audioSrc: '/assets/audio/grade3/advanced-consonants/photo.wav',
      pattern: 'CVCV',
      segments: [
        { grapheme: 'ph', soundLabel: '/f/', audioSrc: phSoundAudio },
        {
          grapheme: 'o',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        {
          grapheme: 'o',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
      ],
    },
  ],
});

export const gradeThreeNgLesson = createBlendingLesson({
  id: 'grade-3-ng-lesson-04',
  slug: 'ng',
  unitId: 'grade-3-advanced-consonants',
  unitLabel: '進階子音組合',
  order: 4,
  title: 'ng 的聲音',
  subtitle:
    'n 和 g 在字尾合起來，會發出鼻音 /ŋ/。用 ring、king、wing 練習聽出相同的字尾聲音。',
  vowelGrapheme: 'ng',
  vowelSoundLabel: '/ŋ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'ring',
      meaningZhTW: '戒指',
      imageSrc: '/assets/images/grade3/advanced-consonants/ring.webp',
      imageAlt: '一只鑲著藍色寶石的金色戒指',
      audioSrc: '/assets/audio/grade3/advanced-consonants/ring.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
        {
          grapheme: 'i',
          soundLabel: '/ɪ/',
          audioSrc: gradeTwoPhonemeAudio.shortI,
        },
        { grapheme: 'ng', soundLabel: '/ŋ/', audioSrc: ngSoundAudio },
      ],
    },
    {
      word: 'king',
      meaningZhTW: '國王',
      imageSrc: '/assets/images/grade3/advanced-consonants/king.webp',
      imageAlt: '一位戴著皇冠並微笑揮手的小國王',
      audioSrc: '/assets/audio/grade3/advanced-consonants/king.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'k', soundLabel: '/k/', audioLetter: 'k' },
        {
          grapheme: 'i',
          soundLabel: '/ɪ/',
          audioSrc: gradeTwoPhonemeAudio.shortI,
        },
        { grapheme: 'ng', soundLabel: '/ŋ/', audioSrc: ngSoundAudio },
      ],
    },
    {
      word: 'wing',
      meaningZhTW: '翅膀',
      imageSrc: '/assets/images/grade3/advanced-consonants/wing.webp',
      imageAlt: '一片展開的藍色鳥翅膀',
      audioSrc: '/assets/audio/grade3/advanced-consonants/wing.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'w', soundLabel: '/w/', audioLetter: 'w' },
        {
          grapheme: 'i',
          soundLabel: '/ɪ/',
          audioSrc: gradeTwoPhonemeAudio.shortI,
        },
        { grapheme: 'ng', soundLabel: '/ŋ/', audioSrc: ngSoundAudio },
      ],
    },
  ],
});

export const gradeThreeAdvancedConsonantLessons = [
  gradeThreeTchLesson,
  gradeThreeDgeLesson,
  gradeThreePhLesson,
  gradeThreeNgLesson,
] as const;
