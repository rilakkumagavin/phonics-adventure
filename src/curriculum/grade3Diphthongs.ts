import { createBlendingLesson } from './createBlendingLesson';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

const oiSoundAudio = '/assets/audio/grade3/diphthongs/oi-sound.wav';
const oySoundAudio = '/assets/audio/grade3/diphthongs/oy-sound.wav';
const ouSoundAudio = '/assets/audio/grade3/diphthongs/ou-sound.wav';
const owSoundAudio = '/assets/audio/grade3/diphthongs/ow-sound.wav';

export const gradeThreeOiLesson = createBlendingLesson({
  id: 'grade-3-oi-lesson-01',
  slug: 'oi',
  unitId: 'grade-3-diphthongs',
  unitLabel: '滑動的母音',
  order: 1,
  title: 'oi 的聲音',
  subtitle: 'o 和 i 站在一起，聲音會從 /ɔ/ 滑向 /ɪ/。把 oi 當成一個 /ɔɪ/ 聲音。',
  vowelGrapheme: 'oi',
  vowelSoundLabel: '/ɔɪ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'coin',
      meaningZhTW: '硬幣',
      imageSrc: '/assets/images/grade3/diphthongs/coin.webp',
      imageAlt: '一枚有星星圖案的金色硬幣',
      audioSrc: '/assets/audio/grade3/diphthongs/coin.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
        { grapheme: 'oi', soundLabel: '/ɔɪ/', audioSrc: oiSoundAudio },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'soil',
      meaningZhTW: '土壤',
      imageSrc: '/assets/images/grade3/diphthongs/soil.webp',
      imageAlt: '一小堆鬆軟的棕色土壤',
      audioSrc: '/assets/audio/grade3/diphthongs/soil.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        { grapheme: 'oi', soundLabel: '/ɔɪ/', audioSrc: oiSoundAudio },
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
      ],
    },
    {
      word: 'boil',
      meaningZhTW: '煮沸',
      imageSrc: '/assets/images/grade3/diphthongs/boil.webp',
      imageAlt: '一鍋正在冒泡與冒蒸氣的水',
      audioSrc: '/assets/audio/grade3/diphthongs/boil.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        { grapheme: 'oi', soundLabel: '/ɔɪ/', audioSrc: oiSoundAudio },
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
      ],
    },
  ],
});

export const gradeThreeOyLesson = createBlendingLesson({
  id: 'grade-3-oy-lesson-02',
  slug: 'oy',
  unitId: 'grade-3-diphthongs',
  unitLabel: '滑動的母音',
  order: 2,
  title: 'oy 的聲音',
  subtitle: 'oy 和 oi 都會發出 /ɔɪ/。oy 常站在單字尾巴，聽完再把整個字合起來。',
  vowelGrapheme: 'oy',
  vowelSoundLabel: '/ɔɪ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'boy',
      meaningZhTW: '男孩',
      imageSrc: '/assets/images/grade3/diphthongs/boy.webp',
      imageAlt: '一位穿綠色上衣與藍色短褲的男孩',
      audioSrc: '/assets/audio/grade3/diphthongs/boy.wav',
      pattern: 'CVC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        { grapheme: 'oy', soundLabel: '/ɔɪ/', audioSrc: oySoundAudio },
      ],
    },
    {
      word: 'toy',
      meaningZhTW: '玩具',
      imageSrc: '/assets/images/grade3/diphthongs/toy.webp',
      imageAlt: '一個紅藍色的玩具機器人',
      audioSrc: '/assets/audio/grade3/diphthongs/toy.wav',
      pattern: 'CVC',
      segments: [
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        { grapheme: 'oy', soundLabel: '/ɔɪ/', audioSrc: oySoundAudio },
      ],
    },
    {
      word: 'joy',
      meaningZhTW: '喜悅',
      imageSrc: '/assets/images/grade3/diphthongs/joy.webp',
      imageAlt: '一位開心跳起並舉起雙手的孩子',
      audioSrc: '/assets/audio/grade3/diphthongs/joy.wav',
      pattern: 'CVC',
      segments: [
        { grapheme: 'j', soundLabel: '/dʒ/', audioLetter: 'j' },
        { grapheme: 'oy', soundLabel: '/ɔɪ/', audioSrc: oySoundAudio },
      ],
    },
  ],
});

export const gradeThreeOuLesson = createBlendingLesson({
  id: 'grade-3-ou-lesson-03',
  slug: 'ou',
  unitId: 'grade-3-diphthongs',
  unitLabel: '滑動的母音',
  order: 3,
  title: 'ou 的聲音',
  subtitle: 'o 和 u 站在一起，聲音會從 /a/ 滑向 /ʊ/。把 ou 當成一個 /aʊ/ 聲音。',
  vowelGrapheme: 'ou',
  vowelSoundLabel: '/aʊ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'cloud',
      meaningZhTW: '雲',
      imageSrc: '/assets/images/grade3/diphthongs/cloud.webp',
      imageAlt: '一朵柔軟蓬鬆的白雲',
      audioSrc: '/assets/audio/grade3/diphthongs/cloud.wav',
      pattern: 'CCVVC',
      segments: [
        { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
        { grapheme: 'ou', soundLabel: '/aʊ/', audioSrc: ouSoundAudio },
        { grapheme: 'd', soundLabel: '/d/', audioLetter: 'd' },
      ],
    },
    {
      word: 'house',
      meaningZhTW: '房子',
      imageSrc: '/assets/images/grade3/diphthongs/house.webp',
      imageAlt: '一棟紅色屋頂與藍色門的白色玩具房子',
      audioSrc: '/assets/audio/grade3/diphthongs/house.wav',
      pattern: 'CVVCe',
      segments: [
        { grapheme: 'h', soundLabel: '/h/', audioLetter: 'h' },
        { grapheme: 'ou', soundLabel: '/aʊ/', audioSrc: ouSoundAudio },
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        {
          grapheme: 'e',
          soundLabel: 'silent',
          isSilent: true,
          hint: '字尾 e 不發音，它不會另外發出聲音。',
        },
      ],
    },
    {
      word: 'mouth',
      meaningZhTW: '嘴巴',
      imageSrc: '/assets/images/grade3/diphthongs/mouth.webp',
      imageAlt: '一個粉紅色嘴唇的嘴巴模型',
      audioSrc: '/assets/audio/grade3/diphthongs/mouth.wav',
      pattern: 'CVVCC',
      segments: [
        { grapheme: 'm', soundLabel: '/m/', audioLetter: 'm' },
        { grapheme: 'ou', soundLabel: '/aʊ/', audioSrc: ouSoundAudio },
        {
          grapheme: 'th',
          soundLabel: '/θ/',
          audioSrc: gradeTwoPhonemeAudio.thSound,
        },
      ],
    },
  ],
});

export const gradeThreeOwLesson = createBlendingLesson({
  id: 'grade-3-ow-lesson-04',
  slug: 'ow-diphthong',
  unitId: 'grade-3-diphthongs',
  unitLabel: '滑動的母音',
  order: 4,
  title: 'ow 的聲音',
  subtitle: 'ow 在這些字裡也會發出 /aʊ/。聽見滑動的聲音，再把前後音段接起來。',
  vowelGrapheme: 'ow',
  vowelSoundLabel: '/aʊ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'cow',
      meaningZhTW: '母牛',
      imageSrc: '/assets/images/grade3/diphthongs/cow.webp',
      imageAlt: '一隻黑白花紋的玩具母牛',
      audioSrc: '/assets/audio/grade3/diphthongs/cow.wav',
      pattern: 'CVC',
      segments: [
        { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
        { grapheme: 'ow', soundLabel: '/aʊ/', audioSrc: owSoundAudio },
      ],
    },
    {
      word: 'clown',
      meaningZhTW: '小丑',
      imageSrc: '/assets/images/grade3/diphthongs/clown.webp',
      imageAlt: '一位穿紅藍色服裝的友善小丑',
      audioSrc: '/assets/audio/grade3/diphthongs/clown.wav',
      pattern: 'CCVVC',
      segments: [
        { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
        { grapheme: 'ow', soundLabel: '/aʊ/', audioSrc: owSoundAudio },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'town',
      meaningZhTW: '小鎮',
      imageSrc: '/assets/images/grade3/diphthongs/town.webp',
      imageAlt: '有三棟彩色房子與彎路的玩具小鎮',
      audioSrc: '/assets/audio/grade3/diphthongs/town.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        { grapheme: 'ow', soundLabel: '/aʊ/', audioSrc: owSoundAudio },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
  ],
});

export const gradeThreeDiphthongLessons = [
  gradeThreeOiLesson,
  gradeThreeOyLesson,
  gradeThreeOuLesson,
  gradeThreeOwLesson,
] as const;
