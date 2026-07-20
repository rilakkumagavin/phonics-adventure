import { createBlendingLesson } from './createBlendingLesson';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

const unitId = 'grade-2-word-families';
const unitLabel = '字族小隊';

export const gradeTwoWordFamilyLessons = [
  createBlendingLesson({
    id: 'grade-2-word-family-at-lesson-01',
    slug: 'family-at',
    unitId,
    unitLabel,
    order: 1,
    title: '-at 字族',
    subtitle: '保留 at，換掉第一個聲音，讀出新的單字。',
    vowelGrapheme: '-at',
    vowelSoundLabel: '/æt/',
    words: [
      {
        word: 'cat',
        meaningZhTW: '貓',
        sourceLetter: 'c',
        imageAlt: '一隻橘色的小貓',
        segments: [
          { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        ],
      },
      {
        word: 'bat',
        meaningZhTW: '球棒',
        sourceLetter: 'b',
        imageAlt: '一支木製球棒',
        segments: [
          { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        ],
      },
      {
        word: 'hat',
        meaningZhTW: '帽子',
        sourceLetter: 'h',
        imageAlt: '一頂有彩色帽帶的帽子',
        segments: [
          { grapheme: 'h', soundLabel: '/h/', audioLetter: 'h' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-word-family-an-lesson-02',
    slug: 'family-an',
    unitId,
    unitLabel,
    order: 2,
    title: '-an 字族',
    subtitle: '聽聽 fan 和 van，相同的 an 藏在哪裡。',
    vowelGrapheme: '-an',
    vowelSoundLabel: '/æn/',
    words: [
      {
        word: 'fan',
        meaningZhTW: '風扇',
        sourceLetter: 'f',
        imageAlt: '一台有彩色扇葉的風扇',
        segments: [
          { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        ],
      },
      {
        word: 'van',
        meaningZhTW: '廂型車',
        sourceLetter: 'v',
        imageAlt: '一輛藍色廂型車',
        segments: [
          { grapheme: 'v', soundLabel: '/v/', audioLetter: 'v' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-word-family-ap-lesson-03',
    slug: 'family-ap',
    unitId,
    unitLabel,
    order: 3,
    title: '-ap 字族',
    subtitle: '保留 ap，換掉開頭，讀讀 cap 和 map。',
    vowelGrapheme: '-ap',
    vowelSoundLabel: '/æp/',
    words: [
      {
        word: 'cap',
        meaningZhTW: '鴨舌帽',
        sourceLetter: 'c',
        imageAlt: '一頂紅色鴨舌帽',
        segments: [
          { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        ],
      },
      {
        word: 'map',
        meaningZhTW: '地圖',
        sourceLetter: 'm',
        imageAlt: '一張彩色摺疊地圖',
        segments: [
          { grapheme: 'm', soundLabel: '/m/', audioLetter: 'm' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-word-family-ox-lesson-04',
    slug: 'family-ox',
    unitId,
    unitLabel,
    order: 4,
    title: '-ox 字族',
    subtitle: 'x 會帶來 /ks/，把 fox 和 box 合起來念。',
    vowelGrapheme: '-ox',
    vowelSoundLabel: '/ɑks/',
    words: [
      {
        word: 'fox',
        meaningZhTW: '狐狸',
        sourceLetter: 'x',
        imageAlt: '一隻友善的橘色狐狸',
        segments: [
          { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
          { grapheme: 'o', soundLabel: '/ɑ/', audioLetter: 'o' },
          { grapheme: 'x', soundLabel: '/ks/', audioLetter: 'x' },
        ],
      },
      {
        word: 'box',
        meaningZhTW: '盒子',
        sourceLetter: 'x',
        imageAlt: '一個打開的紙盒',
        segments: [
          { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
          { grapheme: 'o', soundLabel: '/ɑ/', audioLetter: 'o' },
          { grapheme: 'x', soundLabel: '/ks/', audioLetter: 'x' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-word-family-en-lesson-05',
    slug: 'family-en',
    unitId,
    unitLabel,
    order: 5,
    title: '-en 字族',
    subtitle: '保留 en，換掉開頭，讀讀 hen 和 pen。',
    vowelGrapheme: '-en',
    vowelSoundLabel: '/ɛn/',
    words: [
      {
        word: 'hen',
        meaningZhTW: '母雞',
        sourceLetter: 'h',
        imageAlt: '一隻友善的小母雞',
        segments: [
          { grapheme: 'h', soundLabel: '/h/', audioLetter: 'h' },
          { grapheme: 'e', soundLabel: '/ɛ/', audioLetter: 'e' },
          { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        ],
      },
      {
        word: 'pen',
        meaningZhTW: '筆',
        sourceLetter: 'p',
        imageAlt: '一枝藍色的筆',
        segments: [
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
          { grapheme: 'e', soundLabel: '/ɛ/', audioLetter: 'e' },
          { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        ],
      },
    ],
  }),
] as const;
